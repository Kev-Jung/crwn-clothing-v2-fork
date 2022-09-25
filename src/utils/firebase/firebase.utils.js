import {initializeApp} from 'firebase/app'
import {
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
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

// -------------- Related to Google Authentication --------------
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


// -------------- Related to Native Email & Password Authentication --------------
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}


// -------------- Related to FireStore Database --------------
export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt, 
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error)
    }
  }

  return userDocRef;
}

// -------------- Related to Creating User with Native Email & Password --------------
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch {
    // error here
  }
}

// Sign out user
export const signOutUser = async () => signOut(auth)

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}