"use client"

import { useState, useEffect } from "react"

interface MenuItem {
  id: number
  title: string
  subtitle: string
  description: string
  buttonText: string
  link: string
  icon: string
}

export function useMenuData() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with setTimeout
    const timer = setTimeout(() => {
      const dummyData: MenuItem[] = [
        {
          id: 1,
          title: "Desapedia",
          subtitle: "Applikasi DesaPedia",
          description:
            "Semua informasi tentang DesaPedia dapat kamu lihat disini.",
          buttonText: "Jelajahi",
          link: "/attractions",
          icon: "🏞️",
        },
        {
          id: 2,
          title: "Wisata",
          subtitle: "Tempat wisaata populer",
          description:
            "Semua informasi tentang Wisata dapat kamu lihat disini.",
          buttonText: "Jelajahi",
          link: "/tour",
          icon: "🎭",
        },        
        {
          id: 3,
          title: "Artikel",
          subtitle: "Temukan berita terbaru dari desa",
          description:
            "Semua informasi tentang Artikel dapat kamu lihat disini.",
          buttonText: "Lihat berita",
          link: "/article",
          icon: "📋",
        },        
        {
          id: 4,
          title: "Hubungi Kami",
          subtitle: "Hubungi kami untuk informasi lebih lanjut",
          description:
            "Untuk informasi lebih lanjut tentang Desa Tegal Rejo atau layanan yang tersedia, silakan hubungi kami melalui kontak di bawah ini.",
          buttonText: "Hubungi kami",
          link: "/services",
          icon: "📋",
        },        
      ]

      setMenuItems(dummyData)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return { menuItems, loading }
}
