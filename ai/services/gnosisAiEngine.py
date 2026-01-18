from qdrant_client import QdrantClient
from dotenv import load_dotenv
import os
import torch
import clip

from ai.utils.payloadNormalizer import normalize_payload
from ai.agents.gnosisExplainer import explain

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

def invokeEngine(data):
    tokens = clip.tokenize([data], truncate=True).to(device)

    with torch.no_grad():
        vec = model.encode_text(tokens).cpu().numpy()[0]

    # Search
    result = client.query_points(
        collection_name="GNOSIS",
        query=vec.tolist(),
        limit=5,
        with_payload=True
    )

    hits = result.points

    summary = {
        "fake": {"count": 0, "items": []},
        "real": {"count": 0, "items": []},
    }
    for hit in hits:
        item = normalize_payload(hit.payload, hit.score)
        label = (item["label"] or "").lower().strip()

        if label in summary:
            summary[label]["count"] += 1
            summary[label]["items"].append(item)

    # Decide final verdict by majority
    if summary["fake"]["count"] > summary["real"]["count"]:
        final_verdict = "fake"
    elif summary["real"]["count"] > summary["fake"]["count"]:
        final_verdict = "real"
    else:
        final_verdict = "uncertain"   # tie case

    # Build final output dict
    final_output = {
        "final_verdict": final_verdict,
        "fake": {
            "count": summary["fake"]["count"],
            "items": summary["fake"]["items"][:3]
        },
        "real": {
            "count": summary["real"]["count"],
            "items": summary["real"]["items"][:3]
        }
    }
    
    result = explain(final_output)
    return result

print(invokeEngine("Are Miley Cyrus and Liam Hemsworth married???"))