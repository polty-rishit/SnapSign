import cv2
import mediapipe as mp
import numpy as np
import joblib

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

# ---------------- Start Webcam ----------------
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Flip for natural selfie view
    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb_frame)

    landmark_list = []

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Draw landmarks
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            for lm in hand_landmarks.landmark:
                landmark_list.extend([lm.x, lm.y])

        # If only one hand detected, pad with zeros
        if len(results.multi_hand_landmarks) == 1:
            landmark_list.extend([0.0] * 42)

        if len(landmark_list) == 84:
            input_data = np.array(landmark_list).reshape(1, -1)
            prediction = model.predict(input_data)[0]
            predicted_label = label_encoder.inverse_transform([prediction])[0]
            predicted_label = chr(int(str(predicted_label))+65)  # Assuming labels are encoded as 0-25 for A-Z
            # Show prediction
            cv2.putText(frame, f'Prediction: {predicted_label},', (10, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 0), 3)

    else:
        cv2.putText(frame, 'No hands detected', (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)

    # Show frame
    cv2.imshow("SnapSign - ISL Translator", frame)

    # Exit with 'q'
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
