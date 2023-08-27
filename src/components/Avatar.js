import './Avatar.css'

import React from 'react'

export default function Avatar({ icon }) {
  return (
    <div className='avatar'>
        <img src={icon} alt="user avatar" />
    </div>
  )
}
