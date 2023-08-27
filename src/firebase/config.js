import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
   //Your firebase config keys here
  };

  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    //initialize firestore
    const projectFirestore = firebase.firestore();
    //initialize auth
    const projectAuth = firebase.auth();
    //initialize storage
    const projectStorage = firebase.storage();

    //timestamp
    const timestamp = firebase.firestore.Timestamp;

    export { projectFirestore, projectAuth, projectStorage, timestamp };