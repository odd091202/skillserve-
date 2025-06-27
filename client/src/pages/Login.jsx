import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      setMessage('Login Successful!');
      setSuccess(true);
      

      // Save token or redirect to dashboard here
      localStorage.setItem('token', res.data.token);
      Navigate('/dashboard'); // if using React Router
    } catch (err) {
      setMessage('Login Failed: ' + (err.response?.data?.message || 'Invalid credentials'));
      setSuccess(false);
    }
  };

    return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtext">Login to continue using SkillServe</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`message ${success ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit">Login</button>
          <p className="register-text">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
