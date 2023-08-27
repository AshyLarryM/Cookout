import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

//styles
import './Recipe.css'

import RecipeSummary from './RecipeSummary'

import React from 'react'
import RecipeComments from './RecipeComments'

export default function Recipe() {

  const { id } = useParams()
  const { error, document } = useDocument('recipes', id)

  //if error
  if (error) {
    return <div className='error'>{error}</div>
  }
  //if not document yet
  if (!document) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='recipe-details'>
     <RecipeSummary recipe={document} />
     <RecipeComments recipe={document}/>
    </div>
  )
}
