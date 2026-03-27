import React from 'react';
import Button from '../common/Button';
import './HomeStyles.css';

const HeroSection = () => {
    return (
        <section className="hero fade-in">
            <div className="container hero-content">
                <h1>Discover Your Next Great Adventure</h1>
                <p>Explore stunning destinations, book exclusive tours, and create unforgettable memories with WanderLust.</p>

                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Where do you want to go?"
                    />
                    <Button variant="primary" size="large">Search</Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
