import streamlit as st
import speech_recognition as sr

def recognize_speech_from_mic():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    with mic as source:
        st.info("🎙️ Listening... Speak now!")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        st.success("✅ Audio recorded! Processing...")
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "Sorry, could not understand the audio."
    except sr.RequestError as e:
        return f"API error: {e}"

# Streamlit UI
st.set_page_config(page_title="Speech to Text", layout="centered")
st.title("🗣️ Speech to Text Interface")

st.write("Click the button below and start speaking. The detected text will appear below:")

if st.button("🎤 Speak Now"):
    detected_text = recognize_speech_from_mic()
    st.subheader("📝 Detected Text:")
    st.write(detected_text)