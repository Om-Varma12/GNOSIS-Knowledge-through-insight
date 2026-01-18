import requests
import json

# Load prompt template
with open("ai/prompts/gnosisExplainer.txt", "r", encoding="utf-8") as file:
    PROMPT_TEMPLATE = file.read()


OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.1:8b"   # or mistral, qwen2.5, etc


def explain(result_dict):
    """
    result_dict: your retrieval + voting output dictionary
    """

    # Inject dictionary into prompt
    prompt = PROMPT_TEMPLATE.replace(
        "{RESULT}",
        json.dumps(result_dict, indent=2, ensure_ascii=False)
    )

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()

    data = response.json()

    return data["response"].strip()