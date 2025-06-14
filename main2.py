import cv2
import mediapipe as mp
import numpy as np
import joblib
import time

# ---------------- Load trained model and label encoder ----------------
model = joblib.load("rf_model2.joblib")
label_encoder = joblib.load("label_encoder2.joblib")

# ---------------- Initialize MediaPipe Hands ----------------
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)
mp_drawing = mp.solutions.drawing_utils

# ---------------- Sentence Formation Variables ----------------
prev_letter = ""
stable_start = None
stable_duration = 1.5  # seconds
sentence = ""

# ---------------- Start Webcam ----------------
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

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
            landmark_list.extend([0.0] * 42)  # Pad to make 2-hand data shape

        if len(landmark_list) == 84:
            input_data = np.array(landmark_list).reshape(1, -1)
            prediction = model.predict(input_data)[0]
            predicted_label = label_encoder.inverse_transform([prediction])[0]
            predicted_letter = chr(int(predicted_label) + 65)

            # Stability-based appending
            if predicted_letter == prev_letter:
                if stable_start is None:
                    stable_start = time.time()
                elif time.time() - stable_start >= stable_duration:
                    sentence += predicted_letter
                    stable_start = None  # Reset
                    prev_letter = ""     # Require fresh input
            else:
                prev_letter = predicted_letter
                stable_start = time.time()

            # Show prediction
            cv2.putText(frame, f'Prediction: {predicted_letter}', (10, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 3)
    else:
        cv2.putText(frame, 'No hands detected', (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)
        prev_letter = ""
        stable_start = None

    # Display sentence
    cv2.putText(frame, f'Sentence: {sentence}', (10, 90),
                cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), 2)

    # Show frame
    cv2.imshow("SnapSign - ISL Translator", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break
    elif key == ord("c"):
        sentence = ""  # Clear sentence

# Cleanup
cap.release()
cv2.destroyAllWindows()