import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
//styles
import './Signup.css';

import React from 'react'

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault();
    //signup from useSignup hook
    signup(email,password,displayName,thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    //to see what the user has selected, only 1 file can be selected - hence array index 0
    let fileSelected = e.target.files[0]
    console.log(fileSelected)

    //check if file is an image
    if (!fileSelected) {
      setThumbnailError('Please Select a File')
      return
    }
    if (!fileSelected.type.includes('image')) {
      setThumbnailError('File Selected Must Be an Image!')
      return
    }
    if (fileSelected.size > 5242880) {
      setThumbnailError('Image File Size Must Be Less Than 5mb')
      return
    }
    //resetting error if all checks are passed.
    setThumbnailError(null)
    setThumbnail(fileSelected)
    console.log('Thumbnail Updated!')
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>Email: </span>
          <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />
      </label>

      <label>
        <span>Password: </span>
          <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          />
      </label>

      <label>
        <span>Display Name: </span>
          <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          />
      </label>

      <label>
        <span>Profile Icon </span>
        <input
        required
        type="file"
        onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Signup</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
