import axios from 'axios';

// Base instance — baseURL points to Django root so we can specify full paths
const api = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Attach JWT token automatically if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────────────

/** Register a new user or host */
export const registerUser = async ({ email, password, full_name, phone_number, role }) => {
  const response = await api.post('api/users/register/', { email, password, full_name, phone_number, role });
  return response.data;
};

/** Login — stores tokens and user meta in localStorage */
export const loginUser = async (email, password) => {
  const response = await api.post('api/users/api-login/', { email, password });
  const { access, refresh, user_id, email: userEmail } = response.data;

  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
  localStorage.setItem('user_id', user_id);
  localStorage.setItem('email', userEmail);

  return response.data;
};

/** Logout — clears all stored auth data */
export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('user_id');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
};

// ─── Profile ─────────────────────────────────────────────────────────────────

/** Fetch authenticated user profile */
export const getProfile = async () => {
  const response = await api.get('api/users/profile/');
  return response.data;
};

// ─── Listings ────────────────────────────────────────────────────────────────

/** Fetch featured listings (public) */
export const getFeaturedListings = async () => {
  const response = await api.get('api/listings/featured/');
  return response.data;
};

/** Create a new listing (host only) — supports image upload via FormData */
export const createListing = async (formData) => {
  const response = await api.post('api/listings/create/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/** Fetch host's own listings */
export const getMyListings = async () => {
  const response = await api.get('api/listings/my/');
  return response.data;
};

export default api;