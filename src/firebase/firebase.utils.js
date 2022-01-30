import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyAJ-6BpPZwR89So49_aTfOOfyCAX_Woj3g",
  authDomain: "crwn-clothing-1d323.firebaseapp.com",
  projectId: "crwn-clothing-1d323",
  storageBucket: "crwn-clothing-1d323.appspot.com",
  messagingSenderId: "49137049351",
  appId: "1:49137049351:web:b48f089beb299042a56fa2",
  measurementId: "G-HLN318DY04"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config)

// authentication access
export const auth = firebase.auth()

// access to the firestore
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

//prmpts a popup when you sign in with Google
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

// incase we want the whole library
export default firebase


