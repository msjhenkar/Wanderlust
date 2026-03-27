import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../styles/AuthPages.css';

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.registered;

  const [form, setForm] = useState({ email: '', password: '' });
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
      const data = await loginUser(form.email, form.password);

      // Update global auth state
      setUser({ email: data.email, user_id: data.user_id });

      // Fetch profile to know role for redirect
      // We'll rely on the profile endpoint; for now decode from localStorage or call /api/profile/
      // The login endpoint does NOT return role, so we navigate to /dashboard and let it handle redirect
      const { getProfile } = await import('../services/api');
      try {
        const profile = await getProfile();
        localStorage.setItem('role', profile.role);

        if (profile.role === 'HOST') {
          navigate('/host-dashboard');
        } else {
          navigate('/dashboard');
        }
      } catch {
        navigate('/dashboard');
      }
    } catch (err) {
      const data = err?.response?.data;
      if (data) {
        const msgs = Object.values(data).flat().join(' ');
        setError(msgs || 'Invalid credentials. Please try again.');
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
          <p>Discover unique stays, experiences and more — all in one place.</p>
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
            <h2>Welcome Back 👋</h2>
            <p>Sign in to continue your journey</p>
          </div>

          {justRegistered && (
            <div className="auth-success">
              ✅ Account created successfully! Please log in.
            </div>
          )}

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : 'Sign In'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;