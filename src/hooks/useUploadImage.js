import { useState } from 'react'
import { projectStorage } from '../firebase/config'

export const useUploadImage = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [url, setUrl] = useState(null)
  
  const uploadImage = async (image) => {
    setError(null)
    setIsPending(true)
    setUrl(null)

    try {
      // upload the image and create a reference/path to the file
      const uploadPath = `recipePhotos/${image.name}`
      // upload the image to the path
      const img = await projectStorage.ref(uploadPath).put(image)
      // get the download url for the image
      const imgUrl = await img.ref.getDownloadURL()

      //update state
      setUrl(imgUrl)
      setIsPending(false)
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { uploadImage, error, isPending, url }
}