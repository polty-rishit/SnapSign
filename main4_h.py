import sys
import cv2
import numpy as np
import time
import joblib
import pyttsx3
import speech_recognition as sr
from PyQt5.QtWidgets import QApplication, QLabel, QPushButton, QVBoxLayout, QWidget, QTextEdit, QHBoxLayout
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QImage, QPixmap
import mediapipe as mp

# Load model and label encoder
model = joblib.load("rf_model2.joblib")
label_encoder = joblib.load("label_encoder2.joblib")

# MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2,
                       min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# TTS
engine = pyttsx3.init()
engine.setProperty('rate', 150)

# Recognition variables
prev_letter = ""
stable_start = None
stable_duration = 1.5  # seconds
sentence = ""


class SnapSignApp(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("SnapSign - ISL Translator")
        self.setGeometry(100, 100, 800, 600)

        self.image_label = QLabel()
        self.image_label.setFixedSize(640, 480)

        self.text_output = QTextEdit()
        self.text_output.setReadOnly(True)

        self.speak_button = QPushButton("🔊 Speak")
        self.clear_button = QPushButton("🧹 Clear")
        self.listen_button = QPushButton("🎤 Listen")

        self.speak_button.clicked.connect(self.speak_text)
        self.clear_button.clicked.connect(self.clear_text)
        self.listen_button.clicked.connect(self.listen_speech)

        button_layout = QHBoxLayout()
        button_layout.addWidget(self.speak_button)
        button_layout.addWidget(self.listen_button)
        button_layout.addWidget(self.clear_button)

        layout = QVBoxLayout()
        layout.addWidget(self.image_label)
        layout.addWidget(self.text_output)
        layout.addLayout(button_layout)
        self.setLayout(layout)

        self.capture = cv2.VideoCapture(0)
        self.timer = QTimer()
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(30)

    def update_frame(self):
        global sentence, prev_letter, stable_start
        ret, frame = self.capture.read()
        if not ret:
            return

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)
        landmark_list = []

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                for lm in hand_landmarks.landmark:
                    landmark_list.extend([lm.x, lm.y])

            if len(results.multi_hand_landmarks) == 1:
                landmark_list.extend([0.0] * 42)

            if len(landmark_list) == 84:
                input_data = np.array(landmark_list).reshape(1, -1)
                prediction = model.predict(input_data)[0]
                predicted_label = label_encoder.inverse_transform([prediction])[0]
                predicted_letter = chr(int(predicted_label) + 65)

                if predicted_letter == prev_letter:
                    if stable_start is None:
                        stable_start = time.time()
                    elif time.time() - stable_start >= stable_duration:
                        sentence += predicted_letter
                        self.text_output.setText(sentence)
                        stable_start = None
                        prev_letter = ""
                else:
                    prev_letter = predicted_letter
                    stable_start = time.time()

                cv2.putText(frame, f'Prediction: {predicted_letter}', (10, 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 3)
        else:
            prev_letter = ""
            stable_start = None
            cv2.putText(frame, 'No hands detected', (10, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)

        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image = QImage(frame.data, frame.shape[1], frame.shape[0], QImage.Format_RGB888)
        self.image_label.setPixmap(QPixmap.fromImage(image))

    def speak_text(self):
        if sentence:
            engine.say(sentence)
            engine.runAndWait()

    def clear_text(self):
        global sentence
        sentence = ""
        self.text_output.clear()

    def listen_speech(self):
        recognizer = sr.Recognizer()
        with sr.Microphone() as source:
            self.text_output.append("🎤 Listening...")
            audio = recognizer.listen(source, phrase_time_limit=5)
            try:
                text = recognizer.recognize_google(audio)
                self.text_output.append(f"You said: {text}")
            except sr.UnknownValueError:
                self.text_output.append("Sorry, couldn't understand that.")
            except sr.RequestError:
                self.text_output.append("Speech service unavailable.")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = SnapSignApp()
    window.show()
    sys.exit(app.exec_())
