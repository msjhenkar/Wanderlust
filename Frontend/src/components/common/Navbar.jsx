import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Menu } from 'lucide-react';
import Button from './Button';
import { logoutUser } from '../../services/api';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const role = user?.role || localStorage.getItem('role');
    const isHost = role === 'HOST';

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        navigate('/');
    };

    const dashboardPath = isHost ? '/host-dashboard' : '/dashboard';
    const dashboardLabel = isHost ? '🏠 Host Dashboard' : '📊 Dashboard';

    return (
        <nav className="navbar">
            <div className="container navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <Plane className="logo-icon" />
                    <span>WanderLust</span>
                </Link>

                {/* Navigation Links */}
                <div className="navbar-links d-none-mobile">
                    <Link to="/" className="nav-link">Home</Link>
                    {user && (
                        <Link to={dashboardPath} className="nav-link">
                            {dashboardLabel}
                        </Link>
                    )}
                    {user && isHost && (
                        <Link to="/create-listing" className="nav-link">
                            ➕ Create Listing
                        </Link>
                    )}
                </div>

                {/* Auth Section */}
                <div className="navbar-actions d-none-mobile">
                    {user ? (
                        <>
                            <span className="nav-user-email">
                                {user.email}
                            </span>
                            <Button
                                variant="outline"
                                size="small"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline" size="small" className="mr-2">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" size="small">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                <button className="mobile-menu-btn d-show-mobile">
                    <Menu />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;