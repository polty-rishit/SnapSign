from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load trained model and label encoder
model = joblib.load("rf_model2.joblib")
label_encoder = joblib.load("label_encoder2.joblib")

@app.route('/test', methods=['GET'])
def test():
    try:
        return "working..."
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        landmarks = data.get('landmarks', [])

        if not landmarks or len(landmarks) != 84:
            return jsonify({"error": "Expected 84 landmark values"}), 400

        input_data = np.array(landmarks).reshape(1, -1)
        prediction = model.predict(input_data)[0]
        predicted_label = label_encoder.inverse_transform([prediction])[0]
        predicted_letter = chr(int(predicted_label) + 65)

        return jsonify({"prediction": predicted_letter})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)