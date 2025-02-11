"use client"

import { useEffect, useState } from "react"
import { auth, saveCollection, getCollection } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { Box, Typography, Tabs, Tab, Grid, Card, CardContent } from "@mui/material"
import { useRouter } from "next/navigation"
import { fishCollection } from "@/lib/collections"
import CollectionHeader from "@/components/CollectionHeader"
import Image from "next/image"
import CollectionProgress from "@/components/CollectionProgress"

const categories = ["Fish", "Gardening", "Fossils", "Crystals + Elements"]
const categoryRoutes = ["/collections/fish", "/collections/gardening", "/collections/fossils", "/collections/crystals"]

export default function FishCollectionPage() {
  const [user, setUser] = useState<User | null>(null)
  const [collection, setCollection] = useState<Array<{ 
    id: number;
    name: string;
    description: string;
    collected: boolean;
    image: string;
    rarity: string;
  }>>(fishCollection)  
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/")
        return
      }
  
      setUser(currentUser)
  
      if (currentUser.uid) {
        const savedCollection = await getCollection(currentUser.uid, "fishCollection")
  
        if (Array.isArray(savedCollection) && savedCollection.length > 0) {
          const updatedCollection = fishCollection.map((fish) => {
            const savedFish = savedCollection.find((item) => item.name === fish.name)
            return savedFish ? { ...fish, collected: savedFish.collected } : fish
          })
        
          setCollection(updatedCollection)
          await saveCollection(currentUser.uid, "fishCollection", updatedCollection)
        } else {
          setCollection(fishCollection)
          await saveCollection(currentUser.uid, "fishCollection", fishCollection)
        }
      }
    })
  
    return () => unsubscribe();
  }, [router])  

  const handleToggleItem = async (id: number) => {
    if (!user) return;

    const updatedCollection = collection.map((item) => 
      item.id === id ? {...item, collected: !item.collected } : item
    )
    setCollection(updatedCollection)
    
    await saveCollection(user.uid, "fishCollection", updatedCollection)
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
        <CollectionHeader /> 

      {/* Category Tabs */}
      <Tabs
        value={0} // Set default tab to "Fish"
        sx={{ backgroundColor: "#EAEAEA", borderRadius: "12px", padding: "8px" }}
      >
        {categories.map((category, index) => (
          <Tab
            key={category}
            label={category}
            onClick={() => router.push(categoryRoutes[index])}
            sx={{
              backgroundColor: index === 0 ? "#D6E9C6" : "white",
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
          <Grid item xs={6} sm={4} md={3} key={item.id} sx={{ padding: "8px" }}>
            <Card
              sx={{
                backgroundColor: item.collected ? "#A2D2A6" : "#F5F5F5",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
                width: "180px",
                height: "300px",
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
                <Typography variant="body2" sx={{ color: "#262626", fontWeight: "bold" }}>{item.rarity}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}