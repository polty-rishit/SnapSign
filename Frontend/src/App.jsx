 

import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { Test } from './pages/Test';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import  CameraC  from './pages/Camera';
// import Dummy from './pages/Dummy';
 
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/camera" element={<CameraC/>} />
        {/* <Route path="/dummy" element={<Dummy/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;