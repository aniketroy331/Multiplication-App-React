import React, { useState } from 'react';
import axios from 'axios';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const onChange = e => setEmail(e.target.value);
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://multiplication-app-server.onrender.com/api/auth/forgot-password', {
        email
      });
      setMessage(res.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error sending reset email');
      setMessage('');
    }
  };
  return (
    <div className="auth-container">
      <h1>Forgot Password</h1>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remember your password? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
