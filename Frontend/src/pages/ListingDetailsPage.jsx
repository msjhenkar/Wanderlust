import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Clock, Calendar, Star, ChevronLeft } from 'lucide-react';
import Button from '../components/common/Button';

// Mock an individual listing fetch if your API doesn't have it yet
import api from '../services/api';

const ListingDetailsPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated fetch or real fetch
        const fetchListingDetail = async () => {
            try {
                setLoading(true);
                // If your endpoint has a detail view, you could do:
                // const response = await api.get(`/listings/${id}/`);
                // setListing(response.data);

                // Mock fallback for now
                setTimeout(() => {
                    setListing({
                        id: id,
                        title: 'Amazing Adventure Destination ' + id,
                        description: 'This is a beautiful, hand-crafted experience designed to provide you with the adventure of a lifetime. Enjoy the serene landscapes, expertly guided tours, and premium accommodations.',
                        location: 'Global Destination',
                        price: '$850',
                        duration: '5 Days',
                        guests: '2',
                        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1000&auto=format&fit=crop&q=60",
                        rating: '4.9 (120 reviews)'
                    });
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching detail', error);
            }
        };

        fetchListingDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="container loader-container" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
                <p>Loading details...</p>
            </div>
        );
    }

    if (!listing) return <div className="container" style={{ padding: '80px 0' }}>Listing not found.</div>;

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', color: 'var(--primary-color)' }}>
                <ChevronLeft size={20} /> Back to Home
            </Link>

            <div style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', height: '400px', marginBottom: '30px' }}>
                <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{listing.title}</h1>
                    <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', marginBottom: '30px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={18} /> {listing.location}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f39c12' }}><Star size={18} fill="currentColor" /> {listing.rating}</span>
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>About this trip</h3>
                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '30px' }}>
                        {listing.description}
                    </p>

                    <div className="grid grid-3" style={{ background: 'var(--light-color)', padding: '20px', borderRadius: 'var(--border-radius)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Clock size={24} style={{ color: 'var(--primary-color)', marginBottom: '10px' }} />
                            <p><strong>Duration</strong><br />{listing.duration}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Users size={24} style={{ color: 'var(--primary-color)', marginBottom: '10px' }} />
                            <p><strong>Group Size</strong><br />Up to {listing.guests}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Calendar size={24} style={{ color: 'var(--primary-color)', marginBottom: '10px' }} />
                            <p><strong>Availability</strong><br />Year Round</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{ position: 'sticky', top: '100px', padding: '30px', background: 'var(--white)', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '5px' }}>{listing.price}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>per person</p>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date</label>
                                <input type="date" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Guests</label>
                                <input type="number" min="1" max="10" defaultValue="1" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                            </div>
                        </form>

                        <Button variant="primary" size="large" className="w-100" style={{ width: '100%' }}>Book Now</Button>
                        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>You won't be charged yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsPage;
