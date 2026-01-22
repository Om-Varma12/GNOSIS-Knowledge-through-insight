from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os
import torch
import clip

load_dotenv()

QDRANT_KEY = os.getenv("QDRANT_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")

client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_KEY,
    timeout=60
)

# Init CLIP
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
model.eval()

TEXT_COLLECTION = "GNOSIS"
VIDEO_COLLECTION = "GNOSIS_V2"
SCORE_THRESHOLD = 0.6   # For text only


def getVector(query: str):
    # --------- Embed query ---------
    tokens = clip.tokenize([query], truncate=True).to(device)

    with torch.no_grad():
        qvec = model.encode_text(tokens).cpu().numpy()[0]

    qvec = qvec.tolist()

    # --------- Search ---------

    text_results = client.query_points(
        collection_name=TEXT_COLLECTION,
        query=qvec,
        using="text",
        limit=5,
        with_payload=True
    )

    video_results = client.query_points(
        collection_name=VIDEO_COLLECTION,
        query=qvec,
        using="video",
        limit=1,
        with_payload=True
    )

    # --------- Buckets ---------

    fake_bucket = {"count": 0, "items": []}
    real_bucket = {"count": 0, "items": []}
    video_bucket = {"count": 0, "items": []}

    # --------- Process TEXT ---------

    for hit in text_results.points:
        if hit.score < SCORE_THRESHOLD:
            continue

        payload = hit.payload or {}
        label = (payload.get("label") or "").lower().strip()

        item = {
            "label": payload.get("label"),
            "title": payload.get("title"),
            "text": payload.get("text") or payload.get("chunk_text"),
            "date": payload.get("date"),
            "url": payload.get("source_url") or payload.get("url"),
            "score": float(hit.score)
        }

        if label == "fake":
            fake_bucket["items"].append(item)
        elif label == "real":
            real_bucket["items"].append(item)

    fake_bucket["count"] = len(fake_bucket["items"])
    real_bucket["count"] = len(real_bucket["items"])

    # --------- Process VIDEO (no threshold, no filtering) ---------

    for hit in video_results.points:
        payload = hit.payload or {}

        video_item = {
            "label": payload.get("label"),
            "url": payload.get("video_url") or payload.get("url"),
            "score": float(hit.score)
        }

        video_bucket["items"].append(video_item)

    video_bucket["count"] = len(video_bucket["items"])

    # --------- Decide verdict ---------

    if fake_bucket["count"] > real_bucket["count"]:
        final_verdict = "fake"
    elif real_bucket["count"] > fake_bucket["count"]:
        final_verdict = "real"
    else:
        final_verdict = "uncertain"

    # --------- Final JSON ---------

    final_output = {
        "final_verdict": final_verdict,
        "fake": fake_bucket,
        "real": real_bucket,
        "video": video_bucket
    }

    return final_output


# ===================== TEST =====================

# print(getVector("Sonu Sood for fake charity and improper funds use?"))