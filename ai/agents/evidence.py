import requests
import json
import re

# Load prompt template
with open("ai/prompts/evidence.txt", "r", encoding="utf-8") as file:
    PROMPT_TEMPLATE = file.read()

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.1:8b"

def _extract_json(text: str):
    """
    Extract first JSON object or array from text
    """
    match = re.search(r'(\{.*\}|\[.*\])', text, re.DOTALL)
    if not match:
        return None
    return match.group(1)


def _normalize_to_schema(obj):
    """
    If model returns a list, convert it to:
    { evidence_1: {...}, evidence_2: {...} }
    """

    # Case 1: Already correct dict
    if isinstance(obj, dict) and "evidence_1" in obj:
        return obj

    # Case 2: Model returned list
    if isinstance(obj, list):
        out = {}
        for i, item in enumerate(obj[:5], 1):
            out[f"evidence_{i}"] = {
                "evidenceTitle": item.get("title", ""),
                "summary": item.get("summary", ""),
                "url": item.get("url", "")
            }
        return out

    # Unknown garbage
    return None


def getEvidence(vector_results):
    evidence_text = json.dumps(vector_results, indent=2, ensure_ascii=False)

    prompt = PROMPT_TEMPLATE.replace("{EVIDENCE_DATA}", evidence_text)

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()

    data = response.json()
    raw_output = data["response"].strip()

    # 🔍 Extract JSON from garbage
    json_text = _extract_json(raw_output)
    if not json_text:
        print("❌ Could not extract JSON at all")
        print(raw_output)
        return None

    # 🧠 Parse JSON
    try:
        parsed = json.loads(json_text)
    except json.JSONDecodeError:
        print("❌ Extracted text is not valid JSON")
        print(json_text)
        return None

    # 🔁 Normalize schema
    normalized = _normalize_to_schema(parsed)
    if not normalized:
        print("❌ Could not normalize JSON schema")
        print(parsed)
        return None

    return normalized