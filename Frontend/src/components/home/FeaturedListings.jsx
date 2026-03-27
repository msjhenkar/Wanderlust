import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedListings } from '../../services/api';
import './HomeStyles.css';

const FeaturedListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                const data = await getFeaturedListings();
                // Assume data returns array of listings
                setListings(data.results || data);
            } catch (err) {
                console.error("Failed to fetch featured listings, using fallback data.");
                // Fallback placeholder data for UI demonstration
                setListings([
                    {
                        id: 1, title: 'Santorini Island Tour', location: 'Greece',
                        price: '$850', duration: '5 Days', guests: '2',
                        image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=500&auto=format&fit=crop&q=60',
                        badge: 'Popular'
                    },
                    {
                        id: 2, title: 'Swiss Alps Expedition', location: 'Switzerland',
                        price: '$1200', duration: '7 Days', guests: '4',
                        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop&q=60',
                        badge: 'Featured'
                    },
                    {
                        id: 3, title: 'Kyoto Cultural Experience', location: 'Japan',
                        price: '$950', duration: '6 Days', guests: '2',
                        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=60',
                        badge: 'Limited'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) {
        return (
            <section className="section">
                <div className="container loader-container">
                    <div className="spinner"></div>
                    <p>Loading featured listings...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-light">
            <div className="container">
                <h2 className="section-title">Featured Listings</h2>
                <p className="section-subtitle">Handpicked destinations for your ultimate getaway</p>

                <div className="grid grid-3">
                    {listings.map(listing => (
                        <Link to={`/listings/${listing.id}`} key={listing.id}>
                            <div className="listing-card">
                                <div className="listing-image-wrapper">
                                    {listing.badge && <span className="listing-badge">{listing.badge}</span>}
                                    <img src={listing.image || listing.image_url} alt={listing.title} className="listing-image" />
                                </div>
                                <div className="listing-content">
                                    <h3 className="listing-title">{listing.title}</h3>
                                    <div className="listing-location">
                                        <MapPin size={16} /> <span>{listing.location || listing.city}</span>
                                    </div>

                                    <div className="listing-footer">
                                        <div className="listing-price">
                                            {listing.price} <span>/person</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedListings;
