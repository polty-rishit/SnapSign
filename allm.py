import requests

API_URL   = "http://localhost:3001/api/v1/query"
API_TOKEN = "YERSFS8-8XRMTCA-K5MD0CR-F3ABYNH"         # Replace this
WORKSPACE_ID = "SnapSign" # Replace this

def clean_isl_text(raw_text: str) -> str:
    """
    Sends raw ISL-detected text to AnythingLLM and returns the cleaned sentence.
    """
    headers = {
        "Authorization": f"Bearer {API_TOKEN}"
    }

    payload = {
        "message": raw_text,
        "workspace_id": WORKSPACE_ID,
        "system_prompt": "TextCleaner",
        "temperature": 0.0,
        "max_tokens": 60
    }

    try:
        response = requests.post(API_URL, json=payload, headers=headers, timeout=2)
        response.raise_for_status()
        return response.json()["response"].strip()
    except Exception as e:
        print(f"[LLM Error] {e}")
        return raw_text.capitalize()  # Fallback