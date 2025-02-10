"use client"
import { Box, Button, Typography } from "@mui/material"
import { signInWithGoogle, auth } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.push("/collections")
      }
    });

    return () => unsubscribe();
  }, [router])


  return (
    <Box
      sx={{
        backgroundColor: "#ACBFA4",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Simventory
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ maxWidth: 500, mt: 2 }}>
        Simventory is a Sims 4 collection tracker - tracking specifically fish, gardening, fossils, 
        crystals & elements collections. Simply click on items your sim has already collected and see how much progress you have made completing the collection.
      </Typography>

      {/* Google Sign-In Button (Only Show if User is Not Logged In) */}
      {!user && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, padding: "10px 20px", fontSize: "1rem" }}
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </Button>
      )}
    </Box>
  )
}