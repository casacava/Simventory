import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
// import { error } from "console";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    console.log("User Info", result.user)
  } catch (error) {
    console.error("error signing in", error)
  }
}

const logout = async () => {
  try {
    await signOut(auth)
    console.log("user signed out")
  } catch (error) {
    console.error("errro signing out", error)
  }
}

export { db, auth, signInWithGoogle, logout }