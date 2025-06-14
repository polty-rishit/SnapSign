from pprint import pprint

from imagine import ChatMessage, ImagineClient

# init client
print("Setting up client...")
client = ImagineClient(
    api_key="f66499e9-2d54-4adf-85c1-5c9d67a13b1b",
    endpoint="http://10.190.147.82:5050/v2"
)
print("Client connected.")

# health check
print("Checking health...")
health = client.health_check()
pprint(health)

# list models
print("Listing models...")
models = client.get_available_models_by_type()
pprint(models)

# chat completion
response = client.chat(
    messages=[
        # ChatMessage(role="user", content="Bharat ke baare mein batao?"),
        ChatMessage(role="user", content="What is the capital of India? Tell me the history."),
    ],
    model="Sarvam-m"
)
print(response.first_content)