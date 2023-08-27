//styles
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import CookingIcon from '../assets/CookingIcon.svg';
import HomeIcon from '../assets/HomeIcon.svg';
import ProfileIcon from '../assets/ProfileIcon.svg';
import Avatar from './Avatar';

import React from 'react'

export default function Sidebar() {

    const { user } = useAuthContext(); 

  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className='user'>
                <Avatar icon={user.photoURL} />
                <p>Hey {user.displayName}</p>
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink to="/">
                            <img src={HomeIcon} alt="home icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">
                            <img src={CookingIcon} alt="cooking icon" />
                            <span>Add Recipe</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/MyRecipes">
                            <img src={ProfileIcon} alt="profile icon" />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
