"use client"

import { useState, useEffect } from "react";
import { auth, saveCollection, getCollection } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { Box, Grid, Card, CardContent, Typography, Tabs, Tab } from "@mui/material"
import { useRouter } from "next/navigation"
import { gardeningCollection } from "@/lib/collections"
import CollectionProgress from "@/components/CollectionProgress"
import CollectionHeader from "@/components/CollectionHeader"
import Image from "next/image"


const categories = ["Fish", "Gardening", "Fossils", "Crystals + Elements"]
const categoryRoutes = ["/collections/fish", "/collections/gardening", "/collections/fossils", "/collections/crystals"]

export default function GardeningCollectionPage() {
  const [user, setUser] = useState<User | null>(null)
  const [collection, setCollection] = useState(gardeningCollection)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) router.push("/")
      else {
        setUser(currentUser)
        const savedCollection = await getCollection(currentUser.uid, "gardeningCollection")
        if (Array.isArray(savedCollection) && savedCollection.length > 0) {
          setCollection(savedCollection)
        } else {
          console.log("firestore returned an empty collection, initializing with default gardeningCollection.")
          setCollection(gardeningCollection)
          await saveCollection(currentUser.uid, "gardeningCollection", gardeningCollection)
        }
      }
    })
    return() => unsubscribe()
  }, [router])

  const handleToggleItem = async (id: number) => {
    if (!user) return
    const updatedCollection = collection.map((item) =>
      item.id === id ? { ...item, collected: !item.collected } : item )
    setCollection(updatedCollection)
    await saveCollection(user.uid, "gardeningCollection", updatedCollection)
  }

  const collectedCount = collection.filter((item) => item.collected).length
  const totalCount = collection.length

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
      {/* Header (Logout Button) */}
      <CollectionHeader />

      {/* Category Tabs */}
      <Tabs value={1} sx={{ backgroundColor: "#EAEAEA", borderRadius: "12px", padding: "8px" }}>
        {categories.map((category, index) => (
          <Tab
            key={category}
            label={category}
            onClick={() => router.push(categoryRoutes[index])}
            sx={{
              backgroundColor: index === 1 ? "#D6E9C6" : "white",
              borderRadius: "8px",
              margin: "4px",
              "&:hover": { backgroundColor: "#C5D8B5" },
            }}
          />
        ))}
      </Tabs>

      {/* Progress Bar */}
      <CollectionProgress collectedCount={collectedCount} totalCount={totalCount} />

      {/* Collection Grid */}
      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 900, mt: 4 }}>
        {collection.map((item) => (
          <Grid item key={item.id} sx={{ padding: "8px" }}>
            <Card
              sx={{
                backgroundColor: item.collected ? "#A2D2A6" : "#F5F5F5",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
                width: "180px",
                height: "260px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                textAlign: "center",
              }}
              onClick={() => handleToggleItem(item.id)}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain", marginBottom: "8px" }}
                />
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="body2" sx={{ color: "#ACBFA4", fontWeight: "bold" }}>
                  {item.rarity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}