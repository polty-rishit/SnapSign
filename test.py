import pyttsx3

# Initialize the TTS engine
engine = pyttsx3.init()

# Test phrase
engine.say("Hello!")

# Run the speech engine
engine.runAndWait()
