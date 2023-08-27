import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import RecipeList from '../../components/RecipeList'
import RecipeFilter from './RecipeFilter'
import { useState } from 'react'

import React from 'react'

export default function Dashboard() {

  const { documents, error } = useCollection('recipes')
  const [currentCategory, setCurrentCategory] = useState('all')


  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory)
  }

  const filteredRecipes = documents ? documents.filter((document) => {
    switch (currentCategory) {
      case 'all':
        return true
        case 'Vegan':
          return document.category.includes('Vegan')
        case 'Vegetarian':
          return document.category.includes('Vegetarian')
        case 'High Protein':
          return document.category.includes('High Protein')
        case 'Low Carb':
          return document.category.includes('Low Carb')
        case 'Keto':
          return document.category.includes('Keto')
        case 'Chicken':
          return document.category.includes('Chicken')
        case 'Beef':
          return document.category.includes('Beef')
        case 'Snacks':
          return document.category.includes('Snacks')
        // case 'nuclearsnake':
        //   return document.createdBy.id === '4Gx4Givg6UT7yGVNdSZmpqvxhEk2'
        // case 'Larry':
        //   return document.createdBy.id === 'YGmDHLS6x4WGxGlcBNmoixUjG8r1'
        default:
          return true
      

    }
  }) : null

  return (
    <div>
      <h2 className='page-title'>Recipes</h2>
        {error && <p className='error'>{error}</p>}
        {documents && (<RecipeFilter currentCategory={currentCategory} 
        changeCategory={changeCategory}/>
        )}

        {documents && <RecipeList recipes={filteredRecipes} />}    
    </div>
  )
}