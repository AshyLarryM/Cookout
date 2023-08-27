import './Create.css';
import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useUploadImage } from '../../hooks/useUploadImage';





const categories = ['Vegan', 'Vegetarian', 'High Protein', 'Low Carb', 'Keto', 'Chicken', 'Beef', 'Snacks'];


// const categories = [
//   { value: 'vegan', label: 'Vegan'},
//   { value: 'vegetarian', label: 'Vegetarian'},
//   { value: 'high-protein', label: 'High Protein'},
//   { value: 'low-carb', label: 'Low Carb'},
//   { value: 'high-carb', label: 'High Carb'},
//   { value: 'low-calorie', label: 'Low Calorie'},
//   { value: 'snack', label: 'Snack'},
//   { value: 'keto', label: 'Keto'},
//   { value: 'breakfast', label: 'Breakfast'},
//   { value: 'meat', label: 'Meat'},
//   { value: 'beef', label: 'Beef'},
//   { value: 'chicken', label: 'Chicken'},
//   { value: 'pork', label: 'Pork'},
//   { value: 'sandwiches', label: 'Sandwiches'},
//   { value: 'wrap', label: 'Wrap'},
//   { value: 'shake', label: 'Shakes & Smoothies'},
//   { value: 'meal-prep', label: 'Meal Prep'},
// ]

export default function Create() {
  //redirect
  const navigate = useNavigate();

  const { addDocument, response } = useFirestore('recipes');

//useImageUpload hook
  const { uploadImage, error, isPending, url } = useUploadImage();
  

  const { user } = useAuthContext();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [directions, setDirections] = useState('');
  const [cooktime, setCooktime] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [formError, setFormError] = useState(null);


  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const isImage = file.type.startsWith('image/');
    const size = file.size / 1024 / 1024;

    if (!isImage) {
      setFormError('Please upload an image file');
      return;
    }
  
    if (size > 10) {
      setFormError('File size must be under 10 MB');
      return;
    }
  
    await uploadImage(file);

  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);


    if(!category) {
      setFormError('Please Select at least 1 Category')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const recipe = {
      name,
      // category: category,
      category: category,
      directions: directions,
      cooktime,
      comments: [],
      createdBy: createdBy,
      ingredients: ingredients,
      calories: calories,
      preptime: prepTime,
      image: url,
    }

    await addDocument(recipe)
    if (!response.error) {
      navigate('/')
    }
  }



  return (
    <div className='create-form'>
      <h2 className='page-title'>Create A New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Name</span>
          <input 
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          />
        </label>
        
        {/* <label>
          <span>Category</span>
          <Select
          onChange={(option) => setCategory(option)}
          options={categories}
          isMulti
          />
          
        
        </label> */}

        <label>
          <span>Category</span>
          <Select
            onChange={(option) => setCategory(option.map((o) => o.label))}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
            isMulti
          />
        </label>



        <label>
          <span>Recipe Directions</span> 
          <textarea
          required
          type="text"
          onChange={(e) => setDirections(e.target.value)}
          value={directions}
          ></textarea>
        </label>

        

        <label>
          <span>Prep Time: (minutes)</span>
          <input 
          required
          type="number"
          onChange={(e) => setPrepTime(e.target.value)}
          value={prepTime}
          />
        </label>

        <label>
          <span>Cooking Time: (minutes)</span>
          <input 
          required
          type="number"
          onChange={(e) => setCooktime(e.target.value)}
          value={cooktime}
          />
        </label>

        <label>
          <span>Ingredients</span>
          <input
          required
          type="text"
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
          />
        </label>

        <label>
          <span>Calories</span>
          <input 
          required
          type="number"
          onChange={(e) => setCalories(e.target.value)}
          value={calories}
          />
        </label>

        <div className="upload-image">
        <input type="file" onChange={handleUploadPhoto}
        />
        {isPending && <p>Uploading...</p>}
        {error && <p>Error uploading image: {error}</p>}
        {url && <img className='recipe-image' src={url} alt="upload"/>}
      </div>
      
        {formError && <p className='error'>{formError}</p>}
        <button className='btn'>Submit</button>

      </form>
    </div>
  )
}