import React from 'react';
import './HomeStyles.css';

const destinations = [
    { id: 1, name: 'Paris, France', count: '120+ Listings', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=60' },
    { id: 2, name: 'Bali, Indonesia', count: '85+ Listings', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Rome, Italy', count: '90+ Listings', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60' }
];

const DestinationsSection = () => {
    return (
        <section className="section bg-light">
            <div className="container">
                <h2 className="section-title">Top Destinations</h2>
                <p className="section-subtitle">Explore the most visited locations by our travelers</p>

                <div className="grid grid-3">
                    {destinations.map(dest => (
                        <div key={dest.id} className="destination-card">
                            <img src={dest.image} alt={dest.name} className="destination-image" />
                            <div className="destination-content">
                                <h3 className="destination-title">{dest.name}</h3>
                                <span className="destination-count">{dest.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DestinationsSection;
