"use client"
import type { HeroSection, TourSection, CTASection, GalleryItem, InfoCard, NavItem } from "@/types/Simple"
import useSetting from "./useSettings";
import useStaticPage from "./useStaticPage";
import useFeatureFlags from "./useFeatureFlags";

function filterMenusByFeatures(
  menus: NavItem[],
  features: { tour: boolean; pressRelease: boolean }
): NavItem[] {
  const isRouteMatch = (route: string | null | undefined, target: string): boolean => {
    if (!route) return false;
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    return normalizedRoute === target;
  };

  return menus
    .map((menu) => {
      if (menu.child && Array.isArray(menu.child) && menu.child.length > 0) {
        const filteredChildren = filterMenusByFeatures(menu.child, features);
        return {
          ...menu,
          child: filteredChildren,
        };
      }
      return menu;
    })
    .filter((menu) => {
      if (isRouteMatch(menu.route, "/tour") && !features.tour) return false;
      if (isRouteMatch(menu.route, "/press-release") && !features.pressRelease) return false;
      // Remove parent items that have no children and no route after filtering
      if (menu.child && Array.isArray(menu.child) && menu.child.length === 0 && !menu.route) {
        return false;
      }
      return true;
    });
}

function filterServicesByFeatures(
  services: InfoCard[],
  features: { tour: boolean; pressRelease: boolean }
): InfoCard[] {
  const isLinkMatch = (link: string | null | undefined, target: string): boolean => {
    if (!link) return false;
    const normalizedLink = link.startsWith('/') ? link : `/${link}`;
    return normalizedLink === target;
  };

  return services
    .map((item) => {
      if (item.child && Array.isArray(item.child) && item.child.length > 0) {
        const filteredChildren = filterServicesByFeatures(item.child, features);
        return {
          ...item,
          child: filteredChildren,
        };
      }
      return item;
    })
    .filter((item) => {
      if (isLinkMatch(item.link, "/tour") && !features.tour) return false;
      if (isLinkMatch(item.link, "/press-release") && !features.pressRelease) return false;
      if (item.child && Array.isArray(item.child) && item.child.length === 0 && !item.link) {
        return false;
      }
      return true;
    });
}

function extractQuickLinks(
  menus: NavItem[],
  features: { tour: boolean; pressRelease: boolean }
): NavItem[] {
  const isRouteMatch = (route: string | null | undefined, target: string): boolean => {
    if (!route) return false;
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    return normalizedRoute === target;
  };

  const collected: NavItem[] = [];

  function collect(items: NavItem[]) {
    for (const item of items) {
      const hasChildren = item.child && Array.isArray(item.child) && item.child.length > 0;

      if (hasChildren) {
        collect(item.child);
      } else if (item.route && !item.staticPage) {
        if (isRouteMatch(item.route, "/tour") && !features.tour) continue;
        if (isRouteMatch(item.route, "/press-release") && !features.pressRelease) continue;
        collected.push(item);
      }
    }
  }

  collect(menus);
  return collected;
}

function extractMainNavServices(
  services: InfoCard[],
  features: { tour: boolean; pressRelease: boolean }
): InfoCard[] {
  const isLinkMatch = (link: string | null | undefined, target: string): boolean => {
    if (!link) return false;
    const normalizedLink = link.startsWith('/') ? link : `/${link}`;
    return normalizedLink === target;
  };

  const collected: InfoCard[] = [];

  function collect(items: InfoCard[]) {
    for (const item of items) {
      if (isLinkMatch(item.link, "/tour") && !features.tour) continue;
      if (isLinkMatch(item.link, "/press-release") && !features.pressRelease) continue;

      const isValidLink = item.link && (item.link.startsWith("http") || (item.link.startsWith("/") && item.link.length > 1));

      if (isValidLink) {
        collected.push(item);
      }

      if (item.child && Array.isArray(item.child) && item.child.length > 0) {
        collect(item.child);
      }
    }
  }

  collect(services);
  return collected;
}


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

  // Feature flags
  const { isSectionEnabled, pressRelease } = useFeatureFlags();
  const featureFlags = {
    tour: isSectionEnabled("tour"),
    pressRelease: pressRelease,
  };

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

  const rawInfoCards: InfoCard[] = serviceData?.value ?? [];
  const rawMenus: NavItem[] = menuData?.value ?? [];

  const infoCards = filterServicesByFeatures(rawInfoCards, featureFlags);
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

  const filteredMenus = filterMenusByFeatures(rawMenus, featureFlags);

  const footer = {
    logo: logoData?.value?.imageUrl ?? "/images/logo/enim.png?height=60&width=60",
    regionEntity: logoData?.value?.regionEntity ?? "[judul logo belum diatur]",
    regionDescription: logoData?.value?.regionDescription ?? "[keterangan belum diatur]",
    address: footerData?.value?.contactUs?.address ?? "[alamat belum diatur]",
    phone: footerData?.value?.contactUs?.phone ?? "[phone belum diatur]",
    email: footerData?.value?.contactUs?.email ?? "[email belum diatur]",
    longitude: footerData?.value?.contactUs?.longitude,
    latitude: footerData?.value?.contactUs?.latitude,
    socialMedia: footerData?.value?.socialMedia ?? [],
    mainNav: extractMainNavServices(serviceData?.value ?? [], featureFlags),
    menus: filteredMenus,
    quickLinks: extractQuickLinks(rawMenus, featureFlags),
  }


  const header = {
    logo: logoData?.value?.imageUrl ?? "/images/logo/enim.png",
    regionEntity: logoData?.value?.regionEntity ?? "",
    regionDescription: logoData?.value?.regionDescription ?? "",
    menus: filteredMenus,
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