import './RecipeList.css'
import { Link } from 'react-router-dom'


import React from 'react'

export default function RecipeList({ recipes }) {

  

  return (
    <div className='recipe-list'>
        {recipes.length === 0 && <p>No Recipes Yet!</p>}
        {recipes.map(recipe => (
            <Link to={`/recipes/${recipe.id}`}key={recipe.id}>
                <h4>{recipe.name}</h4>
                <img src={recipe.image} alt={recipe.name} />
                <p>{recipe.calories + (' Cals')}</p>
                <p>{recipe.cooktime + (' Minutes (cook time)')}</p>
                <p className='creator'>By: {recipe.createdBy.displayName}</p>
                {/* <img src={recipe.image} alt={recipe.name}/> */}
            </Link>
        ))}
    </div>
  )
}
