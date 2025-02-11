import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}


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

const saveCollection = async (userId: string, collectionId: string, updatedCollection: any[]) => {
  const userRef = doc(db, "users", userId, "collections", collectionId)
  await setDoc(userRef, { items: updatedCollection }, { merge: false })
}

const getCollection = async (userId: string, collectionId: string) => {
  const userRef = doc(db, "users", userId, "collections", collectionId)
  const docSnap = await getDoc(userRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data?.items && Array.isArray(data.items) ? data.items : []
  }

  return []
}

export { db, auth, signInWithGoogle, logout, saveCollection, getCollection, }