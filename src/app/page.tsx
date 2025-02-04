"use client";

import { useEffect, useState } from "react"
import { auth, signInWithGoogle, logout, saveCollection, getCollection } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material"

const COLLECTION_ID = "fishCollection"

// test collection items
const DEFAULT_COLLECTION = {
  "Rare Fish": false,
  "Exotic Gem": false,
  "Unique Plant": false,
}

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
  }

  const collectedCount = Object.values(collection).filter((v) => v).length
  const totalCount = Object.keys(collection).length
  const completionPercentage = Math.round((collectedCount / totalCount) * 100)

  if (loading) return <p className="text-center text-gray-500">Loading...</p>

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <Typography variant="h3" className="font-bold mb-6">
        Sims Collection Tracker
      </Typography>

      {user ? (
        <>
          <Typography variant="h6" className="mb-2">
            Welcome, {user.displayName}!
          </Typography>
          <Button variant="contained" color="error" onClick={logout} className="mb-4">
            Sign Out
          </Button>

          <Box className="flex items-center gap-3 mt-4">
            <CircularProgress variant="determinate" value={completionPercentage} />
            <Typography>{completionPercentage}% Completed</Typography>
          </Box>

          <Box className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(collection).map((item) => (
              <Card
                key={item}
                onClick={() => toggleItem(item)}
                className="cursor-pointer transition-transform"
                sx={{
                  backgroundColor: collection[item] ? "#86efac" : "white",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{item}</Typography>
                </CardContent>
                
              </Card>
            ))}
          </Box>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={signInWithGoogle}>
          Sign In with Google
        </Button>
      )}
    </Box>
  )
}
