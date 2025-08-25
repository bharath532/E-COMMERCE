import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password
    }, {
      withCredentials: true
    });

    // ✅ STEP 3: Save userId for later use
    // (auth.js returns { message, user }, so user._id is available)
    localStorage.setItem("userId", res.data.user._id);

    setMessage("✅ Login success");
    setEmail('');
    setPassword('');
    navigate('/main');
  } catch (error) {
    console.error("❌ Submission error:", error);
    setMessage("❌ Login failed: " + (error.response?.data?.message || 'Server error'));
  }
};



  return (
    <div className="login-container">
      <h2 className="text-center mb-3">Login</h2>
      <p className="text-center text-muted">
        Don’t have an account? <Link to="/register" className="text-danger">Create a free account</Link>
      </p>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
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
          <button type="submit" className="btn login-btn">Login</button>
        </div>
      </form>
    </div>
  );
}
