"use client"
import type { HeroSection, TourSection, CTASection, GalleryItem, InfoCard } from "@/types/Simple"
import useSetting from "./useSettings";
import useStaticPage from "./useStaticPage";

export function useContent() {
  const { data: logoData } = useSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: serviceData } = useSetting(`service-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: appData } = useSetting(`app-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: welcomeData } = useStaticPage({}, `wellcome-message-${process.env.NEXT_PUBLIC_VILLAGE_ID}`); 
  const { data: programData } = useStaticPage({}, `village-program-${process.env.NEXT_PUBLIC_VILLAGE_ID}`); 
  const { data: footerData } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: menuData } = useSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: tourData } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: articleData } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: heroData } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const email = footerData?.value?.contactUs?.email || "desaku@example.com"
  const subject = encodeURIComponent("Pesan dari pengunjung")
  const body = encodeURIComponent("Halo, saya ingin mengirim pesan kepada Desa.")

  const hero: HeroSection = {
    title: `${heroData?.value?.title ?? ""}`,
    description: `${heroData?.value?.description ?? ""}`,
    image: `${heroData?.value?.videoUrl ?? "/images/placeholder.svg"}`,
    buttons: {
      primary: {
        text: "Berita terbaru",
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
    description: `Semua informasi tentang ${card.title} dapat kamu lihat disini`,
  }));

  const about: TourSection = {
    title: tourData?.value?.title ?? "[Judul wisata belum diatur]",
    subTittle: tourData?.value?.subTitle ?? "[Sub judul wisata belum diatur]",
    description: [tourData?.value?.description ?? "[Deskripsi wisata belum diatur]"],
    image: tourData?.value?.imageUrl ?? "/images/placeholder.svg",
    button: {
      text: "Lihat selengkapnya",
      url: "/tour",
    },
  }

  const service = {
    title: appData?.value?.title ?? "[judul layanan belum diatur]",
    subTittle: appData?.value?.subTitle ?? "[Sub judul layanan belum diatur]"
  }

  const infoWellcome: string = welcomeData?.content ?? "[Kata sambutan tidak tersedia]";
  const infoProgram: string = programData?.content ?? "[Program tidak tersedia]";

  const gallery: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    image: `/images/gallery/galeri${i + 1}.jpeg?height=250&width=250&text=Galeri+${i + 1}`,
    title: `Galeri ${i + 1}`,
  }))

  const cta: CTASection = {
    title: "Hubungi kami",
    description: `Untuk informasi lebih lanjut tentang ${logoData?.value?.regionEntity?.toLowerCase?.() ?? "kami"} atau layanan yang tersedia, silakan hubungi kami melalui kontak di bawah ini.`,
    buttons: {
      primary: {
        text: "hubungi kami",
        url: `https://wa.me/62${footerData?.value?.contactUs?.phone}?text=Halo%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20desa`,
        icon: "phone",
      },
      secondary: {
        text: "kirim pesan",
        url: `mailto:${email}?subject=${subject}&body=${body}`,
        icon: "mail",
      },
    },
  }

  const article = {
    title: articleData?.value?.title ?? "[Judul artikel belum diatur]",
    imageUrl: articleData?.value?.imageUrl ?? "/images/placeholder.svg",
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
    menus: menuData?.value ?? [],
  }

  const header = {
    logo: logoData?.value?.imageUrl  ?? "/images/logo/enim.png",
    regionEntity: logoData?.value?.regionEntity  ?? "",
    regionDescription: logoData?.value?.regionDescription  ?? "",
    menus: menuData?.value ?? [],    
  }

  return {
    hero,
    updatedInfoCards, 
    infoCards,
    about,
    gallery,
    cta,
    infoWellcome,
    infoProgram,
    footer,
    header,
    article,
    service
  }
}
