# SnapSign
<h1 align="center">
  🤟 Indian Sign Language to Speech Converter 
  An easy web based app that converts Indian Sign Language into Speech in real time, we have trained our own model with huge database of about 40,000+ images, An effort to make a change. 
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Flask-green?style=flat-square" />
  <img src="https://img.shields.io/badge/CV-OpenCV-red?style=flat-square" />
  <img src="https://img.shields.io/badge/ML-MediaPipe-orange?style=flat-square" />
</p>

<p align="center">
  Bridging communication gaps with AI and Computer Vision by converting Indian Sign Language into speech in real-time. Built using <b>React</b>, <b>Flask</b>, <b>OpenCV</b>, and <b>MediaPipe</b>.
</p>

---

## 🌟 Demo

<!-- You can add a GIF or a video here -->
<p align="center">
  <img src="https://github.com/polty-rishit/SnapSign/blob/main/Screenshot%202025-06-15%20125504.png?raw=true">
  <img src="https://github.com/polty-rishit/SnapSign/blob/main/Screenshot%202025-06-15%20125525.png?raw=true">
</p>

---

## 🧠 Project Overview

Millions of people in India rely on **sign language** for communication, but there's a lack of tools that allow seamless interaction between them and the hearing population. This project offers a **real-time sign-to-speech translation** tool specifically designed for **Indian Sign Language (ISL)**.

Key objectives:
- Detect hand signs using MediaPipe
- Translate them into readable text
- Convert the text into spoken audio using Web Speech API

---

## 🚀 Key Features

✅ Real-time hand tracking using **MediaPipe**  
✅ Gesture classification using **OpenCV** and custom logic  
✅ Instant speech conversion using **Web Speech API**  
✅ Smooth UI with **React + Tailwind CSS**  
✅ Flask backend to handle recognition logic  
✅ Designed for **Indian Sign Language (ISL)**  

---

## 🔧 Tech Stack

| Layer         | Technology                     |
|---------------|--------------------------------|
| 🖥 Frontend    | React.js, Tailwind CSS, JavaScript |
| ⚙ Backend      | Flask (Python), REST API       |
| 👁 Computer Vision | MediaPipe, OpenCV             |
| 🔊 Speech      | Web Speech API (Text-to-Speech) |

---

## 🧩 Architecture

```plaintext
+-------------+      Video Feed      +---------------+
|  React App  |  ----------------->  |   MediaPipe   |
| (Frontend)  |                      | (Hand Tracking)|
+-------------+                      +---------------+
        |                                   |
        | Detected Landmarks                |
        v                                   v
+-------------+      API Call       +---------------+
| Flask Server|  <---------------   |  Gesture Logic |
|  (Backend)  |                     |  (OpenCV)      |
+-------------+                     +---------------+
        |
        | Predicted Sign
        v
+----------------+
| Text-to-Speech |
|  (Web API)     |
+----------------+

🛠️ Installation & Setup Guide
git clone https://github.com/yourusername/indian-sign-language-to-speech.git
cd indian-sign-language-to-speech

🖥 Frontend Setup (React)
cd frontend
npm install
npm start

⚙ Backend Setup (Flask + OpenCV)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

📦 Backend Requirements
pip install flask opencv-python mediapipe numpy

📂 Folder Structure
indian-sign-language-to-speech/
│
├── frontend/                  # React frontend
│   ├── src/
│   └── public/
│
├── backend/                  # Flask backend
│   ├── app.py
│   └── gesture_logic.py
│
├── assets/                  # Sample ISL images or demos
│
└── README.md

📈 Future Improvements
✅ Add a machine learning model for dynamic gesture recognition

✅ Create a dataset specific to Indian Sign Language (ISL)

🌍 Multilingual speech support (Hindi, Bengali, etc.)

📲 Convert to mobile app using React Native or Flutter

🧪 Add automated testing for Flask API

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn and grow. If you’d like to:

🚀 Improve the gesture recognition algorithm

🧪 Add unit tests

🎨 Enhance UI/UX

Feel free to open an issue or submit a PR!

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgements
MediaPipe

OpenCV

React

Flask

Inspiration from the Indian Deaf community

✉️ Contact
For queries or collaboration ideas:

📧 rishitraj002@gmail.com
🔗 LinkedIn : https://www.linkedin.com/in/rishitraj/
🌐 Portfolio: [yourwebsite.com](https://rajrishit.netlify.app/) || www.rishitraj.tech


---

### 🔧 Customization Options:
- Want to **add a dataset or model training section**? I can include that.
- Need a **GitHub Actions CI/CD workflow** for Flask/React? I can help.
- Want a **dark/light switchable README theme** with embedded links to component files? That's also possible.

Let me know what extras you’d like — I can personalize this further based on your deployment or project goals.
