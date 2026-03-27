import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import '../styles/AuthPages.css';

const roles = [
  { value: 'USER', label: '🧳 Traveller (User)' },
  { value: 'HOST', label: '🏠 Host a Property' },
];

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'USER',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registerUser(form);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      const data = err?.response?.data;
      if (data) {
        const msgs = Object.values(data).flat().join(' ');
        setError(msgs || 'Registration failed. Please try again.');
      } else {
        setError('Unable to connect. Check your server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Left panel */}
      <div className="auth-panel auth-panel--left">
        <div className="auth-brand">
          <div className="auth-brand-icon">✈</div>
          <h1>WanderLust</h1>
          <p>Your next adventure starts here. Join thousands of travellers exploring the world.</p>
        </div>
        <div className="auth-decorations">
          <div className="deco-circle deco-circle--1"></div>
          <div className="deco-circle deco-circle--2"></div>
          <div className="deco-circle deco-circle--3"></div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-panel auth-panel--right">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Create Account</h2>
            <p>Join WanderLust and start your journey</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="full_name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">📱</span>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="9876543210"
                  value={form.phone_number}
                  onChange={handleChange}
                  required
                  maxLength={10}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">I want to…</label>
              <div className="input-wrapper">
                <span className="input-icon">🎯</span>
                <select id="role" name="role" value={form.role} onChange={handleChange}>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : 'Create Account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
