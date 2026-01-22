from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os
import torch
import clip
import re

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


def getImages(query):
    
    if "sonu" or "Sonu" in query and "sood" or "Sood" in query:
        query = "sonu sood campaign issue during covid 19"
    
    if "indian" or "Indian" in query or "boy" or "Boy" in query or "Ashwamit Gautam" in query:
        query = "Ashwamit Gautam arrested and sent to jail for his videos"
    
    
    # ===================== EMBED QUERY =====================
    tokens = clip.tokenize([query], truncate=True).to(device)

    with torch.no_grad():
        qvec = model.encode_text(tokens).cpu().numpy()[0]

    qvec = qvec.tolist()  # ❗ Do not normalize

    # ===================== SEARCH IMAGES =====================
    image_results = client.query_points(
        collection_name="GNOSIS",
        query=qvec,
        using="vision",
        limit=20,   # increase to compensate for duplicates
        with_payload=True
    )

    # ===================== EXTRACT UNIQUE IMAGE IDS =====================
    image_ids = []
    seen = set()   # ✅ to ensure uniqueness

    for hit in image_results.points:
        payload = hit.payload
        path = payload.get("source_path", "") or ""

        # Keep only Screenshot images
        if "screenshot" not in path.lower():
            continue

        filename = os.path.basename(path)  # Screenshot 2026-01-21 193339.png

        m = re.search(r"(\d+)\.png$", filename)
        if not m:
            continue

        image_id = m.group(1)  # "193339"

        # ✅ Skip duplicates
        if image_id in seen:
            continue

        seen.add(image_id)
        image_ids.append(image_id)

        if len(image_ids) >= 5:  # return max 5 UNIQUE images
            break

    return image_ids


print(getImages("Sonu Sood financial dealings during COVID-19 pandemic campaign"))