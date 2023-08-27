import React from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import RecipeList from '../../components/RecipeList'
import MyRecipeFilter from './MyRecipeFilter'
import { useAuthContext } from '../../hooks/useAuthContext';
import './MyRecipes.css'


export default function MyRecipes() {

  const { user } = useAuthContext(); 

  const {documents, error} = useCollection('recipes')
  const [currentFilter, setCurrentFilter] = useState('My Recipes')

  const changeFilter = (newFilter => {
    setCurrentFilter(newFilter)
  })

  const myFilteredRecipes = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case 'My Recipes':
        return document.createdBy.id.includes(user.uid)
      default:
        return true
    }
  }) : null


  return (
    <div>
      <h2 className='page-title'>My Recipes</h2>
        {error && <p className='error'>{error}</p>}
        {documents && (
        <MyRecipeFilter currentFilter={currentFilter} changeFilter={changeFilter}/>
        )}
        {documents && <RecipeList recipes={myFilteredRecipes} />}
    </div>
  )
}
