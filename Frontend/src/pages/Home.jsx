import React, { useState, useEffect, useRef } from 'react';
import Orb from '../Orb';

const App = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        console.error('Camera access denied or unavailable:', err);
        setCameraActive(false);
      }
    };

    openCamera();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* NAVIGATION BAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="flex items-center">
          <div className="flex items-center mr-10">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center mr-2">
              <i className="fas fa-hand-paper text-black"></i>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">SnapSign</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors">About</a>
            <a href="#docs" className="text-gray-300 hover:text-purple-400 transition-colors">Documentation</a>
            <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">Log In</button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors shadow-lg shadow-purple-500/20 whitespace-nowrap">Sign Up</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT */}
        <div className="lg:w-1/2 flex flex-col items-start space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Convert Sign Language into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Speech – Instantly</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-lg">
            Use your camera to detect hand gestures and hear your words in real time. Our AI-powered technology makes communication seamless.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-md hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Start Translation
            </button>
            <button className="border border-purple-500 text-purple-400 px-6 py-3 rounded-md hover:bg-purple-500/10 transition-all">
              <i className="fas fa-video mr-2"></i> <a href='Camera'>Get Started</a>
            </button>
          </div>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <i className="fas fa-bolt text-purple-400 mr-1"></i><span>No installation needed</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-lock text-purple-400 mr-1"></i><span>Privacy-focused</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-globe text-purple-400 mr-1"></i><span>Works in browser</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/2 relative">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-purple-900/50 shadow-xl shadow-purple-900/20 overflow-hidden">
            <div className="p-10 border-b border-purple-900/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                <span className="text-sm font-medium text-purple-400">Translation Dashboard</span>
              </div>
              <div className="flex space-x-3">
                <button className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700/80 transition-colors cursor-pointer">
                  <i className="fas fa-cog text-gray-400"></i>
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700/80 transition-colors cursor-pointer">
                  <i className="fas fa-expand-alt text-gray-400"></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="bg-black/40 rounded-lg overflow-hidden border border-purple-900/30 aspect-video relative">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <i className="fas fa-video-slash text-4xl text-gray-600 mb-2"></i>
                    <span className="text-gray-500">Camera inactive</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-400">{cameraActive ? 'Camera: ON' : 'Camera: OFF'}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <button className="bg-gray-800/80 text-gray-400 p-1 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="bg-black/40 rounded-lg p-3 border border-purple-900/30 h-32 flex flex-col">
                  <div className="text-xs text-gray-500 mb-1">Detected Speech</div>
                  <div className="flex-1 flex items-start">
                    <p className="text-gray-300">
                      {cameraActive ? 'Hello, how are you today?' : 'Hello'}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Confidence: 92%</span>
                    <span>42ms</span>
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg p-3 border border-purple-900/30 h-24">
                  <div className="text-xs text-gray-500 mb-1">Audio Waveform</div>
                  <div className="h-12 flex items-end justify-between">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-purple-500/80 rounded-full mx-px"
                        style={{
                          height: cameraActive ? `${Math.sin(i / 3) * 40 + 50}%` : '10%',
                          opacity: cameraActive ? 1 : 0.3
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-purple-900/30 bg-black/20 flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="flex items-center text-xs text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fas fa-microphone mr-1"></i>
                  Voice: Natural
                </button>
                <button className="flex items-center text-xs text-gray-400 hover:text-purple-400 transition-colors">
                  <i className="fas fa-language mr-1"></i>
                  Language: English
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors">
                  <i className="fas fa-record-vinyl text-white"></i>
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <i className="fas fa-save text-gray-400"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-purple-900/50 rounded-lg px-3 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-green-400">Real-time conversion</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 -py-20">
        <div className="flex-1 flex flex-col items-center justify-center relative -px-10">
                  <div style={{ width: '400px', height: '400px', position: 'relative' }}>
                    <Orb
                      hoverIntensity={0.5}
                      rotateOnHover={true}
                      hue={0} // Blue hue
                      forceHoverState={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h1 className="text-3xl font-bold text-white">SnapSign</h1>
                    </div>
                  </div>
                  {/* <p className="text-gray-300 mt-4 -my-15">How can I help you today?</p> */}
                </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-camera text-purple-400 text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Enable Camera</h3>
            <p className="text-gray-400">Allow access to your device's camera to begin capturing your sign language gestures in real-time.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-hand-paper text-purple-400 text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Perform Signs</h3>
            <p className="text-gray-400">Make sign language gestures in front of your camera. Our AI model tracks and interprets your hand movements.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-volume-up text-purple-400 text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Hear Translation</h3>
            <p className="text-gray-400">Your signs are instantly converted to text and spoken aloud, making communication seamless and accessible.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-purple-500/30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to break communication barriers?</h2>
            <p className="text-gray-300 mb-8">Join thousands of users who are already using SnapSign to communicate effectively across sign language barriers.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-colors shadow-lg shadow-purple-600/30 !rounded-button whitespace-nowrap cursor-pointer">
                Get Started for Free
              </button>
              <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-md transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-3xl -ml-32 -mb-32"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 bg-black/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center mr-2">
                <i className="fas fa-hand-paper text-black"></i>
              </div>
              <span className="text-xl font-bold">SnapSign</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Help Center</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-purple-900/30 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 SnapSign. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
