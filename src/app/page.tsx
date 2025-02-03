"use client"

import { useEffect, useState } from "react"
import { db, auth, signInWithGoogle, logout } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { onAuthStateChanged, User } from "firebase/auth"

export default function Home() {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Sims Collection Tracker</h1>

      {user ? (
        <div className="mb-4">
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded-md">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-2 rounded-md">
          Sign In with Google
        </button>
      )}
    </div>
  )
}