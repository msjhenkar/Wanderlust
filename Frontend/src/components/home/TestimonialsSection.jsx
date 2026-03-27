import React from 'react';
import { Quote } from 'lucide-react';
import './HomeStyles.css';

const testimonials = [
    {
        id: 1,
        text: "Booking through WanderLust was the best decision! The platform is smooth, and the customer support is top-notch. Our trip to Greece was absolutely perfect.",
        author: "Sarah Johnson",
        role: "Travel Enthusiast",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 2,
        text: "I loved the featured listings! It saved me so much time in picking a destination. Everything matched the descriptions perfectly. Highly recommended.",
        author: "Michael Chen",
        role: "Digital Nomad",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        text: "WanderLust offers exclusive packages that I couldn't find anywhere else. The interface is beautiful and exactly what you need for planning holidays.",
        author: "Emma Williams",
        role: "Photographer",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

const TestimonialsSection = () => {
    return (
        <section className="section bg-light">
            <div className="container">
                <h2 className="section-title">What Our Travelers Say</h2>
                <p className="section-subtitle">Real experiences from our global community</p>

                <div className="grid grid-3">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-quote-icon">
                                <Quote size={20} />
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <img src={testimonial.image} alt={testimonial.author} className="author-image" />
                                <div className="author-info">
                                    <h4>{testimonial.author}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
