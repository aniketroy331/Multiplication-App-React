import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/SignUp.js';
import ForgotPassword from './components/Auth/ForgotPassword.js';
import ResetPassword from './components/Auth/ResetPassword.js';
import Dashboard from './components/Dashboard.jsx';
import Navbar from './components/Navbar.js';
import './App.css';
import MultiplicationQuiz from './components/MultiplicationQuiz.jsx';
import FlappyBird from './components/FlappyBird.jsx';

import RuleOne from './animations/MagicNineTrick.jsx';
import Diploma from './components/diploma.jsx';
import Reference from './components/reference.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<MultiplicationQuiz />} />
          <Route path="/FlappyBird" element={<FlappyBird/>} />
          <Route path="/" element={<Login />} />
          <Route path="/rule1" element={<RuleOne />} />
          <Route path="/login" element={<Login />} />
          <Route path='/diploma' element={< Diploma/>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path='/video-reference' element={< Reference/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;