import React from 'react';
import { Shield, CreditCard, Headphones, Compass } from 'lucide-react';
import './HomeStyles.css';

const features = [
    {
        id: 1,
        icon: <Shield size={32} />,
        title: 'Safe & Secure',
        description: 'We prioritize your safety with secure payments and verified partner destinations.'
    },
    {
        id: 2,
        icon: <CreditCard size={32} />,
        title: 'Best Price Guarantee',
        description: 'Find a lower price? We will match it and give you an extra discount on your next trip.'
    },
    {
        id: 3,
        icon: <Compass size={32} />,
        title: 'Handpicked Tours',
        description: 'Our travel experts curate only the best experiences to ensure unforgettable memories.'
    },
    {
        id: 4,
        icon: <Headphones size={32} />,
        title: '24/7 Support',
        description: 'Travel with peace of mind knowing our dedicated team is always here to help you.'
    }
];

const WhyChooseUs = () => {
    return (
        <section className="section features-section">
            <div className="container">
                <h2 className="section-title">Why Choose WanderLust</h2>
                <p className="section-subtitle">We make your travel dreams come true with zero hassle</p>

                <div className="grid grid-4">
                    {features.map(feature => (
                        <div key={feature.id} className="feature-box">
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
