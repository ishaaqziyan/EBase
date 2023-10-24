import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc,setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn5cYy6c3ESUJWSVmqQLo0yP9fYczUOMY",
    authDomain: "ebase-db.firebaseapp.com",
    projectId: "ebase-db",
    storageBucket: "ebase-db.appspot.com",
    messagingSenderId: "431706810146",
    appId: "1:431706810146:web:e1fe218191bab4c79fa77b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

    const googleprovider = new GoogleAuthProvider();

  googleprovider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);


  export const db = getFirestore();

  export const CreateUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data exists
    //if user data doesn't exists create/set the document with data from userauth in my collection
    //return userdocref

    if(!userSnapshot.exists()) {
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch(error) {
        console.log('error catching the user', error.message);
      }
    }

    return userDocRef;

  };