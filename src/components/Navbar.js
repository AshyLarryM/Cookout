import './Navbar.css';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';
import React from 'react'

export default function Navbar() {

    const { user } = useAuthContext();

    const { logout, isPending } = useLogout()

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='navbar'>
        <span className='logo'>Cookout</span>
        <div className={`nav-items ${isOpen && "open"}`}>
            
            {!user && (
            <>
            <a href='/login'>Login</a>
            <a href='/signup'>Signup</a>
            </>
            )}
            {user && (
            <>
            <div className='mobile-icon'>
              <Avatar icon={user.photoURL} />
              <p>Hey {user.displayName}</p>
            </div>
           {user && (
            <>
            <a href='/'>Dashboard</a>
            <a href='/create'>Add A Recipe</a>
            <a href='/MyRecipes'>Profile</a>
            {/* <a href='/about'>About</a> */}
            </>
             )}

           
            {!isPending && <button className='btn' onClick={logout}>Logout</button>}
            {isPending && <button className='btn' disabled >Logging Out...</button>}
            
            </>
            )}
        </div>
        <div className={`navbar-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
            <div className='bar'></div>
        </div>
    </div>
  )
}
