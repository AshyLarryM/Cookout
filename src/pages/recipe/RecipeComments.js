import React from 'react'

import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function RecipeComments({ recipe }) {

    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('recipes')


    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            //not the best way to do this.
            id: Math.random()
        }
        
        await updateDocument(recipe.id, {
            comments: [...recipe.comments, commentToAdd]
        })
        if(!response.error) {
            setNewComment('')
        }
    }

  return (
    <div className='recipe-comments'>
        <h4>Recipe Comments</h4>

        <ul>
            {recipe.comments.length > 0 && recipe.comments.map(comment => (
                <li key={comment.id}>
                    <div className='comment-author'>
                        <Avatar icon={comment.photoURL}/>
                        <p>{comment.displayName}</p>
                    </div>
                    <div className='comment-date'>
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                    </div>
                    <div className='comment-content'>
                        <p>{comment.content}</p>
                    </div>
                </li>
            ))}
        </ul>

        <form className='add-comment' onSubmit={handleSubmit}>
            <label>
                <span>Add New Comment: </span>
                <textarea
                required
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                ></textarea>
            </label>
            <button className='btn'>Add Comment</button>
        </form>
    </div>
  )
}
