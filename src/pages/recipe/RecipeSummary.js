// import './Recipe.css';
// import { useFirestore } from '../../hooks/useFirestore';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { useNavigate } from 'react-router-dom';
// import React from 'react'
// import Avatar from '../../components/Avatar';




// export default function RecipeSummary({ recipe }) {

//   const { deleteDocument } = useFirestore('recipes');
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   const handleClick = (e) => {
//     deleteDocument(recipe.id)
//     navigate('/')
//   }

//   return (
//     <div>
//         <div className='recipe-summary'>
//             <h2 className='recipe-title'>{recipe.name}
//                 <p className='time'>{('Prep Time: ') + recipe.preptime + (' minutes')}</p>
//                 <p className='time'>{('Cook Time: ') + recipe.cooktime + (' Minutes')}</p>
//                 <p className='calories'>{recipe.calories + (' Cals')}</p>
//                 <p className='created-by'>Created By: {recipe.createdBy.displayName}</p>
               
//                 <img src={recipe.image} alt={recipe.name} />
//                 <div>Ingredients: 
//                   <p className='time'>{recipe.ingredients}</p>
//                 </div>
//             </h2>        
//             <p className='directions'>
//                 {recipe.directions}
//             </p>
            

//             {user.uid === recipe.createdBy.id && (
//             <button className='btn' onClick={handleClick}>Delete Recipe</button>
//             )}
//         </div>
        
//     </div>
//   )
// }

// import './Recipe.css';
// import { useFirestore } from '../../hooks/useFirestore';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react'
// import Avatar from '../../components/Avatar';

// export default function RecipeSummary({ recipe }) {

//   const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
//   const { deleteDocument, updateDocument, response } = useFirestore('recipes');
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (response.success) {
//       setUpdatedRecipe(response.document.data());
//     }
//   }, [response]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     await updateDocument(recipe.id, updatedRecipe);
//   }

//   const handleClick = (e) => {
//     deleteDocument(recipe.id)
//     navigate('/')
//   }

//   return (
//     <div>
//         <div className='recipe-summary'>
//             <form onSubmit={handleUpdate}>
//               <h2 className='recipe-title'>
//                   <input
//                     type="text"
//                     value={updatedRecipe.name}
//                     onChange={(e) => setUpdatedRecipe({...updatedRecipe, name: e.target.value})}
//                   />
//                   <p className='time'>{('Prep Time: ') + updatedRecipe.preptime + (' minutes')}</p>
//                   <input
//                     type="number"
//                     value={updatedRecipe.preptime}
//                     onChange={(e) => setUpdatedRecipe({...updatedRecipe, preptime: parseInt(e.target.value)})}
//                   />
//                   <p className='time'>{('Cook Time: ') + updatedRecipe.cooktime + (' Minutes')}</p>
//                   <input
//                     type="number"
//                     value={updatedRecipe.cooktime}
//                     onChange={(e) => setUpdatedRecipe({...updatedRecipe, cooktime: parseInt(e.target.value)})}
//                   />
//                   <p className='calories'>{updatedRecipe.calories + (' Cals')}</p>
//                   <p className='created-by'>Created By: {updatedRecipe.createdBy.displayName}</p>
                 
//                   <img src={updatedRecipe.image} alt={updatedRecipe.name} />
//                   <div>Ingredients: 
//                     <input
//                       type="text"
//                       value={updatedRecipe.ingredients}
//                       onChange={(e) => setUpdatedRecipe({...updatedRecipe, ingredients: e.target.value})}
//                     />
//                   </div>
//               </h2>        
//               <textarea
//                 value={updatedRecipe.directions}
//                 onChange={(e) => setUpdatedRecipe({...updatedRecipe, directions: e.target.value})}
//               />
//               <button className='btn' type="submit">Update Recipe</button>
//             </form>

//             {user.uid === recipe.createdBy.id && (
//               <button className='btn' onClick={handleClick}>Delete Recipe</button>
//             )}
//         </div>
        
//     </div>
//   )
// }

import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';

export default function RecipeSummary({ recipe }) {
  const { deleteDocument, updateDocument } = useFirestore('recipes');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Create a new state variable to keep track of whether the component is in edit mode or not
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(recipe.name);
  const [preptime, setPreptime] = useState(recipe.preptime);
  const [cooktime, setCooktime] = useState(recipe.cooktime);
  const [calories, setCalories] = useState(recipe.calories);
  const [image, setImage] = useState(recipe.image);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [directions, setDirections] = useState(recipe.directions);

  const handleDelete = () => {
    deleteDocument(recipe.id);
    navigate('/');
  };

  const handleSave = () => {
    updateDocument(recipe.id, {
      name,
      preptime,
      cooktime,
      calories,
      image,
      ingredients,
      directions,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="recipe-summary">
        {isEditing ? (
          <form>
            <label>
              Edit Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Edit Prep Time:
              <input
                type="text"
                value={preptime}
                onChange={(e) => setPreptime(e.target.value)}
              />
            </label>

            <label>
              Edit Cook Time:
              <input
                type="text"
                value={cooktime}
                onChange={(e) => setCooktime(e.target.value)}
              />
            </label>

            <label>
              Edit Calories:
              <input
                type="text"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </label>

            {/* <label>
              Edit Image:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            </label> */}

            

            <label>
              Edit Ingredients:
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </label>

            <label>
              Edit Directions:
            <input
              type="text"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
            </label>

            <button className='btn' onClick={handleSave}>Save</button>
            <button className='btn' onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <>
            <h2 className="recipe-title">
              {name}
              <p className="time">{`Prep Time: ${preptime} minutes`}</p>
              <p className="time">{`Cook Time: ${cooktime} minutes`}</p>
              <p className="calories">{`${calories} Cals`}</p>
              <p className="created-by">Created By: {recipe.createdBy.displayName}</p>

              <img src={image} alt={name} />
              <div>
                Ingredients:
                <p className="time">{ingredients}</p>
              </div>
            </h2>
            <p className='directions'>
               {recipe.directions}
            </p>
            {user.uid === recipe.createdBy.id && (
              <>
                <button className='btn' onClick={() => setIsEditing(true)}>Edit</button>
                <button className='btn' onClick={handleDelete}>Delete</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
