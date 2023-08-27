import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    //realtime data for document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        //get real time updates on the document
       const unsubscribe = ref.onSnapshot((snapshot) => {
            //if theres data in the document then update document state and reset the error.
            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            }
            else {
                setError('No Recipe Details Found')
            }
        }, (err) => {
            console.log(err.message)
            setError('Could not fetch the data for that recipe')
        })

        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}