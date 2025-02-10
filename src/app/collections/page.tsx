"use client"

import {useEffect, useState } from "react"
import { auth, logout } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { Box, Typography, Button, Grid, Card, CardContent } from "@mui/material"
import Image from "next/image"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useRouter } from "next/navigation"

const collections = [
  { name: "Fish", image: "/icons/fish.png", color: "#D0806D", route: "/collections/fish" },
  { name: "Gardening", image: "/icons/gardening.png", color: "#7B9EBE", route: "/collections/gardening" },
  { name: "Fossils", image: "/icons/Archaeology.png", color: "#7B9EBE", route: "/collections/fossils" },
  { name: "Crystals + Elements", image: "/icons/crystal.png", color: "#D0806D", route: "/collections/crystals" },
]

export default function CollectionPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuUser) => {
      setUser(currentuUser)
    })

    return () => unsubscribe()
  }, [])

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
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Logout Button */}
      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* Welcome Message */}
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "20px" }}>
        Welcome {user?.displayName || "User"}
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "80px" }}>
        What are we collecting today?
      </Typography>

      {/* Collection Grid */}
      <Grid container spacing={3} sx={{ maxWidth: 600 }}>
        {collections.map((collection) => (
          <Grid item xs={6} key={collection.name}>
            <Card
              sx={{
                backgroundColor: collection.color,
                borderRadius: "20px",
                textAlign: "center",
                padding: "16px",
                cursor: "pointer",
                position: "relative",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => router.push(collection.route)}
            >
              <CardContent>
                <Image src={collection.image} alt={collection.name} width={60} height={60} />
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  {collection.name}
                </Typography>
                {/* Arrow Button (Bottom Right of Card) */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                >
                  <ArrowForwardIcon />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}