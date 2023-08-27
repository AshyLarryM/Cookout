import './LandingPage.css';

import React from 'react'

export default function LandingPage() {

  const handleClick = () => {
    window.location.href = '/login'
  }

  return (
    <div className='hero'>
      <div className='content'>
        <p>Cook your favorite recipes.</p>
        <p>Share.</p>
        <p>Enjoy with friends!</p>
        <button className='btn-hero' onClick={handleClick}>Get started now!</button>
      </div>
    </div>
  )
}
