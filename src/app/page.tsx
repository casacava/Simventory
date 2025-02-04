"use client";

import { useEffect, useState } from "react"
import { auth, signInWithGoogle, logout, saveCollection, getCollection } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

const COLLECTION_ID = "fishCollection"

// test collection items
const DEFAULT_COLLECTION = {
  "Rare Fish": false,
  "Exotic Gem": false,
  "Unique Plant": false,
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [collection, setCollection] = useState<Record<string, boolean>>(DEFAULT_COLLECTION)
  const [loading, setLoading] = useState(true) //loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        setLoading(true)

        const savedCollection = await getCollection(currentUser.uid, COLLECTION_ID)

        if (savedCollection && Object.keys(savedCollection).length > 0) {
          setCollection(savedCollection)
        } else { //saves toggled selections if no data currently exists
          await saveCollection(currentUser.uid, COLLECTION_ID, DEFAULT_COLLECTION)
          setCollection(DEFAULT_COLLECTION)
        }

        setLoading(false)
      } else {
        setCollection(DEFAULT_COLLECTION)
        setLoading(false)
      }
    });

    return () => unsubscribe()
  }, [])

  const toggleItem = async (item: string) => {
    if (!user) return

    const updatedCollection = { ...collection, [item]: !collection[item] }
    setCollection(updatedCollection)
    await saveCollection(user.uid, COLLECTION_ID, updatedCollection)
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Sims Collection Tracker</h1>

      {user ? (
        <div className="mb-4">
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded-md">
            Sign Out
          </button>

          <ul className="mt-4 space-y-2">
            {Object.keys(collection).map((item) => (
              <li
                key={item}
                className={`p-3 border rounded-lg cursor-pointer ${
                  collection[item] ? "bg-green-300" : "bg-white"
                }`}
                onClick={() => toggleItem(item)}
              >
                {item} {collection[item] ? "✅" : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white p-2 rounded-md">
          Sign In with Google
        </button>
      )}
    </div>
  )
}
