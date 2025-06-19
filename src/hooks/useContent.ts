"use client"
import type { HeroSection, AboutSection, CTASection, GalleryItem, InfoCard } from "@/types/Simple"
import useSetting from "./useSettings";
import useStaticPage from "./useStaticPage";

export function useContent() {
  const { data: logoData } = useSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: heroData } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: serviceData } = useSetting(`service-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: welcomeData } = useStaticPage({}, `wellcome-message-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
  const { data: footerData } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: menuData } = useSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: tourData } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const email = logoData?.value?.contactUs?.email || "desaku@example.com"
  const subject = encodeURIComponent("Pesan dari pengunjung")
  const body = encodeURIComponent("Halo, saya ingin mengirim pesan kepada Desa.")

  const hero: HeroSection = {
    title: `${logoData?.value?.regionEntity ?? ""}`,
    description: `${logoData?.value?.regionDescription ?? ""}`,
    image: `${heroData?.value?.videoUrl ?? "/images/placeholder.svg"}`,
    buttons: {
      primary: {
        text: "Berita terbaru dari desa",
        url: "/profil",
      },
      secondary: {
        text: "Layanan Publik",
        url: "/layanan",
      },
    },
  }

  const infoCards: InfoCard[] = serviceData?.value ?? [];
  const updatedInfoCards = infoCards.map(card => ({
    ...card,    
    description: `Semua data ${card.title} bisa dilihat disini`,
  }));

  const about: AboutSection = {
    badge: tourData?.value?.title ?? "[Judul wisata belum diatur]",
    title: tourData?.value?.subTitle ?? "[sub title wisata belum diatur]",
    description: [tourData?.value?.description ?? "[Deskripsi wisata belum diatur]"],
    image: tourData?.value?.imageUrl ?? "/images/placeholder.svg",
    button: {
      text: "Lihat selengkapnya",
      url: "/tour",
    },
  }

  const infoWellcome: string = welcomeData?.content ?? "[Kata sambutan tidak tersedia]";

  const gallery: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    image: `/images/gallery/galeri${i + 1}.jpeg?height=250&width=250&text=Galeri+${i + 1}`,
    title: `Galeri ${i + 1}`,
  }))

  const cta: CTASection = {
    title: "Hubungi Kami",
    description: `Untuk informasi lebih lanjut tentang Desa ${logoData?.value?.regionEntity ?? ""} atau layanan yang tersedia, silakan hubungi kami melalui kontak di bawah ini.`,
    buttons: {
      primary: {
        text: "Hubungi Kami",
        url: `https://wa.me/62${footerData?.value?.contactUs?.phone}?text=Halo%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20desa`,
        icon: "phone",
      },
      secondary: {
        text: "Kirim Pesan",
        url: `mailto:${email}?subject=${subject}&body=${body}`,
        icon: "mail",
      },
    },
  }

  const footer = {
    logo: logoData?.value?.imageUrl ?? "/images/logo/enim.png?height=60&width=60",
    regionEntity: logoData?.value?.regionEntity ?? "[nama desa belum diatur]",
    regionDescription: logoData?.value?.regionDescription ?? "[keterangan belum diatur]",
    address: footerData?.value?.contactUs?.address ?? "[alamat belum diatur]",
    phone: footerData?.value?.contactUs?.phone ?? "[phone belum diatur]",
    email: footerData?.value?.contactUs?.email ?? "[email belum diatur]",
    socialMedia: footerData?.value?.socialMedia ?? [],
    mainNav: serviceData?.value ?? [],
    quickLinks: menuData?.value ?? [],
  }

  const header = {
    logo: logoData?.value?.imageUrl ?? "/images/logo/enim.png",
    regionEntity: logoData?.value?.regionEntity ?? "[Nama desa belum diatur]",
    regionDescription: logoData?.value?.regionDescription ?? "[Keterangan desa belum diatur]",
    menus: menuData?.value ?? [],
  }

  return {
    hero,
    updatedInfoCards,
    about,
    gallery,
    cta,
    infoWellcome,
    footer,
    header
  }
}
