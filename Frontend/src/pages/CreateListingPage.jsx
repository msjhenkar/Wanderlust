import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createListing } from '../services/api';
import '../styles/CreateListing.css';

function CreateListingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price_per_night: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);

      await createListing(fd);
      setSuccess('🎉 Your listing was published successfully!');
      setTimeout(() => navigate('/host-dashboard'), 2000);
    } catch (err) {
      const data = err?.response?.data;
      if (err?.response?.status === 403) {
        setError('You need admin approval to create listings.');
      } else if (data) {
        setError(Object.values(data).flat().join(' '));
      } else {
        setError('Failed to create listing. Make sure you are logged in as an approved host.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-listing-wrapper">
      <div className="create-listing-container">
        {/* Back link */}
        <Link to="/host-dashboard" className="back-link">← Back to Dashboard</Link>

        <div className="create-listing-header">
          <h1>Create a New Listing</h1>
          <p>Share your property with travellers around the world</p>
        </div>

        {success && <div className="auth-success">{success}</div>}
        {error && <div className="auth-error">⚠ {error}</div>}

        <div className="create-listing-body">
          {/* Image preview panel */}
          <div className="image-upload-panel">
            <div
              className={`image-drop-zone ${preview ? 'has-preview' : ''}`}
              onClick={() => document.getElementById('image-input').click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <span>📷</span>
                  <p>Click to upload image</p>
                  <small>JPG, PNG, WEBP up to 10MB</small>
                </div>
              )}
            </div>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden-input"
            />
            {preview && (
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => { setImage(null); setPreview(null); }}
              >
                ✕ Remove Image
              </button>
            )}
          </div>

          {/* Form */}
          <form className="create-listing-form-full" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Property Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Cosy Beachside Villa in Goa"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Goa, India"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_per_night">Price per Night (₹) *</label>
              <input
                id="price_per_night"
                name="price_per_night"
                type="number"
                placeholder="2500"
                value={form.price_per_night}
                onChange={handleChange}
                required
                min={1}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe your property, amenities, nearby attractions…"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="create-submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : '🏡 Publish Listing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateListingPage;
