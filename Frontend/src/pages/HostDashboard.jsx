import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, getMyListings, logoutUser } from '../services/api';
import '../styles/Dashboard.css';
import '../styles/HostDashboard.css';

function HostDashboard({ setUser }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    getProfile()
      .then((data) => {
        setProfile(data);
        if (data.role === 'USER') navigate('/dashboard');
      })
      .catch(() => {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const loadListings = () => {
    setListingsLoading(true);
    getMyListings()
      .then((data) => {
        // handle paginated or plain array
        setListings(Array.isArray(data) ? data : data.results ?? []);
      })
      .catch(() => setListings([]))
      .finally(() => setListingsLoading(false));
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'listings') loadListings();
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="spinner"></div>
        <p>Loading host dashboard…</p>
      </div>
    );
  }

  if (error) {
    return <div className="dash-loading"><p className="dash-error">{error}</p></div>;
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : 'H';

  const isPending = profile?.role === 'HOST' && !profile?.is_host_approved;

  return (
    <div className="dash-wrapper">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">✈</span>
          <span>WanderLust</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${activeSection === 'profile' ? 'sidebar-link--active' : ''}`}
            onClick={() => handleSectionChange('profile')}
          >
            <span>👤</span> Host Profile
          </button>
          <button
            className={`sidebar-link ${activeSection === 'create' ? 'sidebar-link--active' : ''}`}
            onClick={() => handleSectionChange('create')}
          >
            <span>➕</span> Create Listing
          </button>
          <button
            className={`sidebar-link ${activeSection === 'listings' ? 'sidebar-link--active' : ''}`}
            onClick={() => handleSectionChange('listings')}
          >
            <span>🏡</span> My Listings
          </button>
          <Link to="/" className="sidebar-link">
            <span>🔍</span> Browse
          </Link>
          <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1 className="dash-greeting">Host Dashboard 🏠</h1>
            <p className="dash-subtitle">Manage your listings and profile</p>
          </div>
          <button className="dash-logout-btn" onClick={handleLogout}>Logout</button>
        </header>

        {/* Pending Approval Banner */}
        {isPending && (
          <div className="host-pending-banner">
            <span>⏳</span>
            <div>
              <strong>Pending Approval</strong>
              <p>Your host request is pending admin approval. You'll be able to create listings once approved.</p>
            </div>
          </div>
        )}

        <div className="dash-content">

          {/* ── Profile Section ── */}
          {activeSection === 'profile' && (
            <>
              <div className="profile-card-big">
                <div className="profile-avatar-big profile-avatar-big--host">{initials}</div>
                <div className="profile-details">
                  <h2>{profile?.full_name}</h2>
                  <span className="role-badge role-badge--host">HOST</span>
                  {profile?.is_host_approved ? (
                    <span className="approved-badge">✅ Approved Host</span>
                  ) : (
                    <span className="pending-badge">⏳ Pending Approval</span>
                  )}
                </div>
              </div>
              <div className="info-grid">
                <div className="info-tile">
                  <span className="info-tile-icon">✉</span>
                  <div>
                    <p className="info-tile-label">Email</p>
                    <p className="info-tile-value">{profile?.email}</p>
                  </div>
                </div>
                <div className="info-tile">
                  <span className="info-tile-icon">📱</span>
                  <div>
                    <p className="info-tile-label">Phone</p>
                    <p className="info-tile-value">{profile?.phone_number || 'Not provided'}</p>
                  </div>
                </div>
                <div className="info-tile">
                  <span className="info-tile-icon">🏠</span>
                  <div>
                    <p className="info-tile-label">Host Status</p>
                    <p className={`info-tile-value ${profile?.is_host_approved ? 'info-tile-value--green' : 'info-tile-value--orange'}`}>
                      {profile?.is_host_approved ? 'Approved' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Create Listing Section ── */}
          {activeSection === 'create' && (
            <div className="host-create-inline">
              <h2 className="section-heading">Create New Listing</h2>
              {isPending ? (
                <div className="host-blocked-msg">
                  <span>🔒</span>
                  <p>You cannot create listings until your host account is approved by admin.</p>
                </div>
              ) : (
                <CreateListingForm onSuccess={() => handleSectionChange('listings')} />
              )}
            </div>
          )}

          {/* ── My Listings Section ── */}
          {activeSection === 'listings' && (
            <div>
              <div className="section-heading-row">
                <h2 className="section-heading">My Listings</h2>
                <button className="btn-primary-sm" onClick={loadListings}>🔄 Refresh</button>
              </div>
              {listingsLoading ? (
                <div className="dash-loading"><div className="spinner"></div></div>
              ) : listings.length === 0 ? (
                <div className="empty-listings">
                  <span>🏡</span>
                  <p>No listings yet. Create your first one!</p>
                  <button className="btn-primary-sm" onClick={() => handleSectionChange('create')}>
                    + Create Listing
                  </button>
                </div>
              ) : (
                <div className="host-listings-grid">
                  {listings.map((l) => (
                    <div className="host-listing-card" key={l.id}>
                      {l.image && <img src={l.image} alt={l.title} className="host-listing-img" />}
                      <div className="host-listing-body">
                        <h3>{l.title}</h3>
                        <p className="host-listing-location">📍 {l.location}</p>
                        <p className="host-listing-price">₹{l.price_per_night} / night</p>
                        <span className={`listing-badge ${l.is_available ? 'listing-badge--green' : 'listing-badge--red'}`}>
                          {l.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// ── Inline Create Listing Form ──────────────────────────────────────────────
function CreateListingForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price_per_night: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { createListing } = await import('../services/api');
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);

      await createListing(fd);
      setSuccess('Listing created successfully! 🎉');
      setForm({ title: '', description: '', location: '', price_per_night: '' });
      setImage(null);
      setTimeout(onSuccess, 1500);
    } catch (err) {
      const data = err?.response?.data;
      if (data) {
        setError(Object.values(data).flat().join(' '));
      } else {
        setError('Failed to create listing.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create-listing-form" onSubmit={handleSubmit}>
      {success && <div className="auth-success">{success}</div>}
      {error && <div className="auth-error">⚠ {error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label>Title</label>
          <input name="title" placeholder="Beachside Villa" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" placeholder="Goa, India" value={form.location} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" rows={4} placeholder="Describe your property..." value={form.description} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price per Night (₹)</label>
          <input type="number" name="price_per_night" placeholder="2500" value={form.price_per_night} onChange={handleChange} required min={1} />
        </div>
        <div className="form-group">
          <label>Property Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
        </div>
      </div>

      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? <span className="btn-spinner"></span> : '🏡 Publish Listing'}
      </button>
    </form>
  );
}

export default HostDashboard;
