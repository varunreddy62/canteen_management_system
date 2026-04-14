import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { FiLock, FiUser } from 'react-icons/fi';
import { MdRestaurantMenu } from 'react-icons/md';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminLogin(credentials);
      if (response.data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page" id="admin-login-page">
      <div className="login-card" id="login-card">
        <div className="login-header">
          <MdRestaurantMenu className="login-icon" />
          <h2>Admin Panel</h2>
          <p>Sign in to manage the canteen</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" id="login-form">
          <div className="form-group">
            <label htmlFor="admin-username">
              <FiUser /> Username
            </label>
            <input
              type="text"
              id="admin-username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter username"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">
              <FiLock /> Password
            </label>
            <input
              type="password"
              id="admin-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password"
              className="form-input"
              required
            />
          </div>

          {error && <div className="login-error" id="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading} id="login-submit-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-hint">
          <p>Demo credentials: <strong>admin</strong> / <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
