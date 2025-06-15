import React, { useEffect, useState, useRef } from 'react';
import cvReadyPromise from '@techstark/opencv-js';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';

const CameraC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState('');
  const [lastFetchTime, setLastFetchTime] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const loadCV = async () => {
      try {
        const cv = await cvReadyPromise;
        console.log('OpenCV.js is ready!');
      } catch (err) {
        console.error('Failed to load OpenCV:', err);
      }
    };

    loadCV();

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      let left_f = Array(42).fill(0.0);
      let right_f = Array(42).fill(0.0);

      if (results.multiHandLandmarks && results.multiHandedness) {
        results.multiHandLandmarks.forEach((landmarks, idx) => {
          const handLabel = results.multiHandedness[idx].label;
          const flatLandmarks = landmarks.flatMap(lm => [lm.x, lm.y]);

          if (handLabel === "Left") {
            left_f = flatLandmarks.concat(Array(42 - flatLandmarks.length).fill(0.0));
          } else if (handLabel === "Right") {
            right_f = flatLandmarks.concat(Array(42 - flatLandmarks.length).fill(0.0));
          }

          drawingUtils.drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
          drawingUtils.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
        });
      }

      canvasCtx.restore();

      const allCoords = left_f.concat(right_f);
      const hasData = allCoords.some(v => v !== 0.0);

      const now = Date.now();
      const cooldown = 1000; // 1 second between fetches

      if (hasData && (now - lastFetchTime > cooldown)) {
        setLastFetchTime(now);

        fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ landmarks: allCoords })
        })
          .then(res => res.json())
          .then(data => {
            const letter = data.prediction;
            if (letter && /^[A-Z]$/.test(letter)) {
              setCurrentPrediction(letter);
            }
          })
          .catch(err => console.error('Prediction error:', err));
      }
    });

    if (videoRef.current) {
      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (cameraActive && cameraRef.current) {
      cameraRef.current.start();
    } else if (!cameraActive && cameraRef.current) {
      cameraRef.current.stop();
    }
  }, [cameraActive]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-cyan-400">SnapSign (Letter Detector)</h1>

      <div className="relative border border-purple-700 rounded-lg overflow-hidden shadow-lg">
        <video ref={videoRef} style={{ display: 'none' }} autoPlay playsInline />
        <canvas ref={canvasRef} width="640" height="480" className="block" />
        <div className="absolute top-2 left-2 text-lg font-bold bg-black/50 px-3 py-1 rounded">
          {currentPrediction ? `Detected: ${currentPrediction}` : 'Detecting...'}
        </div>
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-xs text-gray-400">
            {cameraActive ? 'Camera: ON' : 'Camera: OFF'}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <button onClick={() => setCameraActive(!cameraActive)} className="bg-gray-800/80 text-white px-3 py-1 rounded-md hover:bg-gray-700">
            {cameraActive ? 'Stop Camera' : 'Start Camera'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraC;
