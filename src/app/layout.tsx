import type React from "react"
import "@/app/globals.css"
import { Geist, Geist_Mono } from "next/font/google";
import SettingService from "@/shared/services/setting.service"
import HolyLoader from "holy-loader";
import RootLayoutClient from "./rootLayout";
import Script from "next/script";

export const metadata = await generateMetadata(); 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
     <html lang="en">
      <HolyLoader/>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
         <Script
            src="https://website-widgets.pages.dev/dist/sienna.min.js"
            strategy="afterInteractive"
          />
      </body>
    </html>
  )
}

async function generateMetadata()  {
  try {
    const logoResponse = await SettingService.getSetting (`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    const heroResponse = await SettingService.getSetting (`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    return {
      title: logoResponse?.data?.value?.regionEntity || "Pemerintah Kabupaten Muara Enim",
      description: heroResponse?.data?.value?.title + heroResponse?.data?.value?.description || "Pemerintah Kabupaten Muara Enim",
      icons: {
        icon: [
          new URL(logoResponse?.data?.value?.imageUrl)
        ]
      },
    }
  } catch {
     return {
      title: process.env.NEXT_PUBLIC_VILLAGE_NAME || "Pemerintah Kabupaten Muara Enim",
      description: "Pemerintah Kabupaten Muara Enim",
    }
  }
}