import React from 'react'
import "../styles/ListingCard.css"
import FeaturedListings from './FeaturedListings'

const ListingCard = ({listing}) => {
  return (
    <div className="card">
        <img 
        src={listing.image} alt={listing.title} />

        <div className="card-content">
            <h3>{listing.title}</h3>
            <p>{listing.location}</p>
            <p className='price'>₹{listing.price_per_night} / night</p>
        </div>
    </div>
  )
}

export default ListingCard
