import type React from "react"
import "@/app/globals.css"
import { Geist, Geist_Mono } from "next/font/google";
import SettingService from "@/shared/services/setting.service"
import RootLayoutClient from "./rootLayout";
import Script from "next/script";
import ClientLoader from "@/components/common/client-loader";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import { getEnv } from "@/lib/get-runtime-env";

export const metadata = await generateMetadata(); 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let gaId = getEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID');
    try {
      const villageId = getEnv('NEXT_PUBLIC_VILLAGE_ID');
      const response = await SettingService.getSetting(`google-analytics-id-${villageId}`);
      if (response?.data?.value?.id) {
        gaId = response.data.value.id;
      }
    } catch (error) {
      console.error("Failed to fetch GA ID on server:", error);
    }


  return (
     <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runtime env-config.js: menyuntikkan window.__ENV dari Pod/container */}
        <script src="/env-config.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ClientLoader />
        <RootLayoutClient>
          {children}
          <GoogleAnalytics gaId={gaId} />
        </RootLayoutClient>
         <Script
            src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
            strategy="afterInteractive"
          />
      </body>
    </html>
  )
}

async function generateMetadata()  {
  try {
    const villageId = getEnv('NEXT_PUBLIC_VILLAGE_ID');
    const logoResponse = await SettingService.getSetting (`logo-${villageId}`)
    const heroResponse = await SettingService.getSetting (`hero-${villageId}`)
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
      title: getEnv('NEXT_PUBLIC_VILLAGE_NAME', 'Pemerintah Kabupaten Muara Enim'),
      description: "Pemerintah Kabupaten Muara Enim",
    }
  }
}