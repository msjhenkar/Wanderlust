import React from 'react';
import { Plane, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <Plane className="logo-icon" />
                            <span>WanderLust</span>
                        </Link>
                        <p className="footer-desc">
                            Discover your next great adventure, become an explorer to get started!
                        </p>
                        <div className="social-links">
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#"><Twitter size={20} /></a>
                            <a href="#"><Instagram size={20} /></a>
                            <a href="#"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-heading">Company</h4>
                        <Link to="/about">About Us</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/pricing">Pricing</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-heading">Destinations</h4>
                        <Link to="/destinations/europe">Europe</Link>
                        <Link to="/destinations/asia">Asia</Link>
                        <Link to="/destinations/america">America</Link>
                        <Link to="/destinations/africa">Africa</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-heading">Newsletter</h4>
                        <p className="newsletter-desc">Subscribe to our newsletter for travel updates.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your email address" />
                            <button type="button" className="btn btn-primary btn-small">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} WanderLust. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
