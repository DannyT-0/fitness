import openai
from config import Config

openai.api_key = Config.OPENAI_API_KEY

def get_chatbot_response(message):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"User: {message}\nAI:",
        max_tokens=10,
        n=1,
        stop=None,
        temperature=0.7,
    )
    return response.choices[0].text.strip()