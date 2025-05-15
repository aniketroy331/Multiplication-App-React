import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const onChange = e => setPassword(e.target.value);
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`https://multiplication-auth-app.onrender.com/api/auth/reset-password/${token}`, {
        password
      });
      setMessage('Password reset successful. You can now login with your new password.');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error resetting password');
      setMessage('');
    }
  };
  return (
    <div className="auth-container">
      <h1>Reset Password</h1>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;