import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAb9SzX-g_xy4Np0U1VDxjN5iAhPgLkrbo",
  authDomain: "crwn-clothing-db-90a3c.firebaseapp.com",
  projectId: "crwn-clothing-db-90a3c",
  storageBucket: "crwn-clothing-db-90a3c.appspot.com",
  messagingSenderId: "12635256692",
  appId: "1:12635256692:web:1910d182d5419c453d5e21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// -------------- Related to Authentication --------------
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// -------------- Related to FireStore Database --------------

export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, 
        email, createdAt
      })
    } catch (error) {
      console.log("There was an error creating user", error)
    }
  }

  return userDocRef;
}