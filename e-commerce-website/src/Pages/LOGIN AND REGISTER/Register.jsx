import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import API from "../../api";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username: name, email, password });

      if (res.data.success) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage("❌ Registration failed: " + res.data.message);
      }
    } catch (err) {
      console.error("❌ Registration error:", err.response || err);
      setMessage("❌ Registration failed: " + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center mb-3">Create Account</h2>
      <p className="text-center text-muted">
        Already have an account? <Link to="/" className="text-danger">Login here</Link>
      </p>

      {message && (
        <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn login-btn">Register</button>
        </div>
      </form>
    </div>
  );
}
