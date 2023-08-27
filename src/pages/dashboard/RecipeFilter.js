import './Dashboard.css'
import React from 'react'

const categoryFilter = ['All', 'Vegan', 'Vegetarian', 'High Protein', 'Low Carb', 'Keto', 'Chicken', 'Beef', 'Snacks', ]


export default function RecipeFilter({ currentCategory, changeCategory }) {

    const handleClick = (newCategory) => {
        changeCategory(newCategory)
        
    }


  return (
    <div className='recipe-filter'>
        <nav>
            <p>Sort By: </p>
            {categoryFilter.map((f) => (
                <button key={f}
                onClick={() => handleClick(f)}
                className={currentCategory === f ? 'active' : ''}
                >
                {f}
                </button>
            ))}
        </nav>
    </div>
  )
}