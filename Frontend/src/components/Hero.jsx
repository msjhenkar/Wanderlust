import React from 'react'
import "../styles/Hero.css"

const Hero = () => {
  return (
    <div className='hero'>
        <h1>Find your Next Stay</h1>
        <p>Discover amazing places at exclusive prices</p>

        <div className="search-box">
            <input type="text" placeholder='Search by location...' />
            <button>Search</button>
        </div>
      
    </div>
  )
}

export default Hero