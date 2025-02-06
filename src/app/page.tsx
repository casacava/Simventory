"use client"
import { Box, Button, Typography } from "@mui/material"
import { signInWithGoogle } from "@/lib/firebase"
export default function Home() {
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

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={signInWithGoogle}
      >
        Sign In with Google
      </Button>
    </Box>
  )
}