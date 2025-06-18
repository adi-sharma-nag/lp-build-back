from flask import make_response, jsonify, request
from google.cloud import storage
import google.generativeai as genai
import functions_framework
import re
import base64
import requests


def read_file_from_gcs(bucket_name, file_name):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(file_name)
    try:
        return blob.download_as_text(), None
    except Exception as e:
        return None, f"Error reading file: {str(e)}"


def create_cors_response(payload, status=200):
    if isinstance(payload, str):
        payload = {"message": payload}
    response = make_response(jsonify(payload), status)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


def generate_image(prompt: str) -> str:
    """Generate an image using Imagen based on a text prompt."""
    api_key = "AIzaSyCL8u9t3adQG_E38nJO531I4s5KZ2PHkyo"
    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        "imagen-3.0-generate-002:predict?key=" + api_key
    )
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": 1},
    }

    try:
        resp = requests.post(url, json=payload, timeout=30)
        resp.raise_for_status()
        result = resp.json()
        predictions = result.get("predictions")
        if not isinstance(predictions, list) or not predictions:
            raise ValueError("Unexpected API response")
        base64_img = predictions[0].get("bytesBase64Encoded") or predictions[0].get(
            "content"
        )
        if not base64_img:
            raise ValueError("Failed to extract image data")
        return "data:image/png;base64," + base64_img
    except Exception as e:
        raise RuntimeError(f"Imagen request failed: {str(e)}") from e


@functions_framework.http
def hello_http(req):
    if req.method == 'OPTIONS':
        return create_cors_response({}, 204)

    try:
        request_json = req.get_json(silent=True)
        if not request_json:
            return create_cors_response("Invalid JSON payload.", 400)

        secret_key = request_json.get('key')
        if secret_key != "Y7mA3rftGFrSSed87dXfK9Zq1VtPgUcY8WrQjN6e2Hxs":
            return create_cors_response("Unauthorized access.", 403)

        query_type = request_json.get('type')
        genai.configure(api_key="YOUR_GEMINI_API_KEY")

        if query_type == "chat":
            query = request_json.get('query', "").strip()
            if query:
                persona_instruction, error = read_file_from_gcs("personas-bucket-test", "avery-gen-z.txt")
                if error:
                    return create_cors_response(error, 500)

                chat_model = genai.GenerativeModel(
                    model_name="gemini-1.5-pro",
                    generation_config={
                        "temperature": 1.0,
                        "top_p": 0.95,
                        "top_k": 40,
                        "max_output_tokens": 8192,
                    },
                    system_instruction=persona_instruction
                )
                chat_session = chat_model.start_chat(history=[])
                chat_response = chat_session.send_message(query)
                chat_text = chat_response.text
            else:
                chat_text = (
                    "Hey! \ud83d\udc4b I'm Avery. I'm a 23-year-old digital marketing professional with deep insights "
                    "into Gen Z consumer behavior and hybrid shopping trends. Ask me anything!"
                )

            suggestions_instruction, error = read_file_from_gcs("personas-bucket-test", "avery-suggestions-prompt.txt")
            if error:
                return create_cors_response(error, 500)

            suggestions_instruction = suggestions_instruction.replace("${lastMessage}", chat_text)

            suggestions_model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                generation_config={
                    "temperature": 1.4,
                    "top_p": 0.95,
                    "top_k": 40,
                    "max_output_tokens": 8192,
                }
            )
            suggestions_session = suggestions_model.start_chat(history=[])
            suggestions_response = suggestions_session.send_message(suggestions_instruction)
            suggestions_text = suggestions_response.text

            return create_cors_response({
                "chat": chat_text,
                "suggestions": suggestions_text
            })

        elif query_type == "image-analysis":
            image_data = request_json.get('imageData')
            if not image_data:
                return create_cors_response("Missing imageData.", 400)

            image_data_clean = re.sub(r'^data:image\/[a-zA-Z]+;base64,', '', image_data).strip()
            if not image_data_clean:
                return create_cors_response("Cleaned image data is empty.", 400)

            try:
                base64.b64decode(image_data_clean, validate=True)
            except Exception:
                return create_cors_response("Provided image data is not valid base64.", 400)

            image_model = genai.GenerativeModel(
                model_name="gemini-1.5-pro",
                generation_config={
                    "temperature": 0.9,
                    "top_p": 0.95,
                    "top_k": 40,
                    "max_output_tokens": 8192,
                }
            )
            parts = [
                {
                    "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": image_data_clean
                    }
                }
            ]

            result = image_model.generate_content(parts)
            text = result.text

            if not text:
                return create_cors_response("Empty response from model.", 500)

            try:
                generated_image = generate_image(text)
            except Exception as e:
                return create_cors_response(str(e), 500)

            return create_cors_response({"response": text, "image": generated_image})

        elif query_type == "generate-image":
            prompt = request_json.get('prompt', '').strip()
            if not prompt:
                return create_cors_response("Missing prompt.", 400)

            try:
                generated_image = generate_image(prompt)
            except Exception as e:
                return create_cors_response(str(e), 500)

            return create_cors_response({"image": generated_image})

        else:
            return create_cors_response("Invalid query type.", 400)

    except Exception as e:
        return create_cors_response(f"Error while processing request: {str(e)}", 500)

