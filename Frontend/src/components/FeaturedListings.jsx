import React from 'react'
import { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import API from "../services/api"
import "../styles/FeaturedListing.css"

const FeaturedListings = () => {
    const [listings, setListings] = useState([]);

        useEffect(() => {
            API.get("/listings/featured/")
            .then((res) => {
                console.log(res.data)
                setListings(res.data.results);
            })
            .catch((err) => console.log(err));
        }, []);
    
  return (
    <div className='featured'>
      <h2>Featured Listings</h2>
      <div className="grid">
        {listings.map((listing)=>(
            <ListingCard key={listing.id} listing = {listing} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedListings
