import React from 'react';
import { Palmtree, Mountain, Building2, Ship, Tent, Castle } from 'lucide-react';
import './HomeStyles.css';

const categories = [
    { id: 1, name: 'Beach', icon: <Palmtree /> },
    { id: 2, name: 'Mountain', icon: <Mountain /> },
    { id: 3, name: 'City', icon: <Building2 /> },
    { id: 4, name: 'Cruise', icon: <Ship /> },
    { id: 5, name: 'Camping', icon: <Tent /> },
    { id: 6, name: 'Historical', icon: <Castle /> },
];

const CategoriesSection = () => {
    return (
        <section className="section categories-wrapper">
            <div className="container">
                <h2 className="section-title">Browse by Category</h2>
                <p className="section-subtitle">Find the perfect type of trip for your next adventure</p>

                <div className="grid grid-3">
                    {categories.map(cat => (
                        <div key={cat.id} className="category-card">
                            <div className="category-icon">{cat.icon}</div>
                            <h3 className="category-title">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
