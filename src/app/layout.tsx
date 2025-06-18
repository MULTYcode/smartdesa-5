"use client"
import type React from "react"
import "@/app/globals.css"
// import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import LayoutInner from "./layoutInner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-script" })

// export const metadata: Metadata = {
//   title: "Green Valley Village - Official Website",
//   description: "Discover the natural beauty of our eco-friendly village nestled in the lush green valley",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} font-sans`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LayoutInner>{children}</LayoutInner>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
