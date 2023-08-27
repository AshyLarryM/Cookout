import React from 'react'


const myFilter = ['My Recipes',]

export default function MyRecipeFilter({ currentFilter, changeFilter }) {

    

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }


  return (
    <div className='recipe-filter'>
        <nav>
            <p>Filter By:</p>
            {myFilter.map((f) => (
                <button key={f}
                onClick={() => handleClick(f)}
                className={currentFilter === f ? 'active' : ''}
                >
                {f}
                </button>
            ))}
        </nav>
    </div>
  )
}
