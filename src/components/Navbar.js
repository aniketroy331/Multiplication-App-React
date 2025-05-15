import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MultiMaster</Link>
      </div>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/dashboard" className='dash'>Dashboard</Link>
            <Link to="/quiz" className='dash'>Quiz</Link>
            <Link to="/diploma" className='dash'>Diploma</Link>
            <Link to="/video-reference" className='dash'>Referrence</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;