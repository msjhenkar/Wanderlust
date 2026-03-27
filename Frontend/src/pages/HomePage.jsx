import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedListings from '../components/home/FeaturedListings';
import WhyChooseUs from '../components/home/WhyChooseUs';
import DestinationsSection from '../components/home/DestinationsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <CategoriesSection />
            <FeaturedListings />
            <DestinationsSection />
            <WhyChooseUs />
            {/* <TestimonialsSection /> */}
        </div>
    );
};

export default HomePage;
