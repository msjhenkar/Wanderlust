import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, logoutUser } from '../services/api';
import '../styles/Dashboard.css';

function UserDashboard({ setUser }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    getProfile()
      .then((data) => {
        setProfile(data);
        // If somehow a host lands here, redirect them
        if (data.role === 'HOST') {
          navigate('/host-dashboard');
        }
      })
      .catch(() => {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="spinner"></div>
        <p>Loading your profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dash-loading">
        <p className="dash-error">{error}</p>
      </div>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="dash-wrapper">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">✈</span>
          <span>WanderLust</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link sidebar-link--active">
            <span>🏠</span> Dashboard
          </Link>
          <Link to="/" className="sidebar-link">
            <span>🔍</span> Browse Listings
          </Link>
          <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div>
            <h1 className="dash-greeting">Hello, {profile?.full_name?.split(' ')[0]} 👋</h1>
            <p className="dash-subtitle">Here's a summary of your account</p>
          </div>
          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Profile card */}
        <section className="dash-content">
          <div className="profile-card-big">
            <div className="profile-avatar-big">{initials}</div>
            <div className="profile-details">
              <h2>{profile?.full_name}</h2>
              <span className={`role-badge role-badge--${profile?.role?.toLowerCase()}`}>
                {profile?.role}
              </span>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-tile">
              <span className="info-tile-icon">✉</span>
              <div>
                <p className="info-tile-label">Email Address</p>
                <p className="info-tile-value">{profile?.email}</p>
              </div>
            </div>

            <div className="info-tile">
              <span className="info-tile-icon">📱</span>
              <div>
                <p className="info-tile-label">Phone Number</p>
                <p className="info-tile-value">{profile?.phone_number || 'Not provided'}</p>
              </div>
            </div>

            <div className="info-tile">
              <span className="info-tile-icon">🎯</span>
              <div>
                <p className="info-tile-label">Account Role</p>
                <p className="info-tile-value">{profile?.role}</p>
              </div>
            </div>

            <div className="info-tile">
              <span className="info-tile-icon">✅</span>
              <div>
                <p className="info-tile-label">Account Status</p>
                <p className="info-tile-value info-tile-value--green">Active</p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-cards">
              <Link to="/" className="action-card">
                <span>🔍</span>
                <p>Browse Listings</p>
              </Link>
              <Link to="/signup" className="action-card action-card--muted">
                <span>🏠</span>
                <p>Become a Host</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
