"use client"

import { Box } from "@mui/material"
import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: "100vh", width: "100vw" }}>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <Image
              src="/support_me_on_kofi_beige.png"
              alt="Support me on Ko-fi"
              width={150}
              height={50}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {children}
        </Box>
      </body>
    </html>
  )
}