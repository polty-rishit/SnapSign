import React, { useRef, useEffect } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';

export const Test = () => {
  const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });
  
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5
      });
  
      hands.onResults(results => {
        const canvasCtx = canvasRef.current.getContext('2d');
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        canvasCtx.drawImage(
          results.image,
          0, 0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            drawingUtils.drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
            drawingUtils.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 });
          }
        }
        canvasCtx.restore();
      });
  
      if (typeof videoRef.current !== 'undefined' && videoRef.current !== null) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: 640,
          height: 480
        });
        camera.start();
      }
    }, []);
  
    return (
      <>
        <video ref={videoRef} style={{ display: 'none' }} autoPlay playsInline />
        <canvas ref={canvasRef} width="640" height="480" />
      </>
    );
}
