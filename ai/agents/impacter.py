import requests
import json
import re

# Load prompt template
with open("ai/prompts/impacter.txt", "r", encoding="utf-8") as f:
    PROMPT_TEMPLATE = f.read()

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.1:8b"

def _clean_llm_json(text: str) -> str:

    text = text.strip()

    # Remove ```json or ``` fences
    text = re.sub(r"^```(?:json)?", "", text.strip(), flags=re.IGNORECASE).strip()
    text = re.sub(r"```$", "", text.strip()).strip()

    # Try to extract first JSON object
    first_brace = text.find("{")
    last_brace = text.rfind("}")

    if first_brace == -1 or last_brace == -1:
        return text  # let json.loads fail normally

    text = text[first_brace:last_brace + 1]
    return text

def getFutureImpacts(evidence_dict):

    prompt = PROMPT_TEMPLATE.replace(
        "{EVIDENCE}",
        json.dumps(evidence_dict, indent=2, ensure_ascii=False)
    )

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()

    data = response.json()

    raw_text = data["response"].strip()

    # 🧹 CLEAN IT
    cleaned = _clean_llm_json(raw_text)

    # ✅ Parse
    try:
        result = json.loads(cleaned)
        return result
    except Exception as e:
        print("❌ LLM did not return valid JSON even after cleaning")
        print("---- RAW ----")
        print(raw_text)
        print("---- CLEANED ----")
        print(cleaned)
        raise e