import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import HostDashboard from './pages/HostDashboard';
import CreateListingPage from './pages/CreateListingPage';

function App() {
  const [user, setUser] = useState(null);

  // Restore auth state from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('access');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if (token && email) {
      setUser({ email, role });
    }
  }, []);

  // Pages that should NOT show the global Navbar/Footer
  // (they have their own sidebar layout)
  const fullPageRoutes = ['/dashboard', '/host-dashboard', '/create-listing', '/signup', '/login'];

  return (
    <Router>
      <AppContent user={user} setUser={setUser} fullPageRoutes={fullPageRoutes} />
    </Router>
  );
}

function AppContent({ user, setUser }) {
  return (
    <Routes>
      {/* Auth Pages — no Navbar/Footer */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />

      {/* Dashboard Pages — no Navbar/Footer (have own sidebar) */}
      <Route path="/dashboard" element={<UserDashboard setUser={setUser} />} />
      <Route path="/host-dashboard" element={<HostDashboard setUser={setUser} />} />
      <Route path="/create-listing" element={<CreateListingPage />} />

      {/* Public Pages — with Navbar/Footer */}
      <Route
        path="/*"
        element={
          <div className="app-container">
            <Navbar user={user} setUser={setUser} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings/:id" element={<ListingDetailsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
