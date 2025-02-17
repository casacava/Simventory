"use client";

import { Box, Button } from "@mui/material";
import { logout } from "@/lib/firebase";

export default function CollectionHeader() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      {/* Logout Button (Left) */}
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>

      {/* Ko-fi Icon is already handled globally in layout.tsx */}
    </Box>
  )
}