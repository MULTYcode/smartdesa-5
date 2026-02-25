import Image from "next/image"
import { Facebook, Instagram, Mail, Map, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { NavItem, NavLayanan } from "@/types/Simple";
import FooterSkeleton from "../../../common/skeleton/footerSkeleton";
import StreetViewChecker from '@/lib/checkStreetView';

interface FooterProps {
  data?: {
    logo: string,
    regionEntity: string,
    regionDescription: string,
    address: string,
    phone: string,
    email: string,
    longitude?: string,
    latitude?: string,
    socialMedia: any[], // Updated to any[] or specific type to handle object/array structure
    mainNav: NavLayanan[],
    quickLinks: NavItem[],
    menus?: NavItem[] // Added to support fallback calculation
  }
}

export function Footer({ data }: FooterProps) {

  if(!data) return <FooterSkeleton />

  const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
  const isStreetAvailable = StreetViewChecker({ lat: Number(data?.latitude), lng: Number(data?.longitude) });

  let mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${data?.latitude},${data?.longitude}`;
  if (isStreetAvailable) {
      mapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${data?.latitude},${data?.longitude}&heading=0&pitch=0`;
  }

  const getLeafMenuItems = (items: NavItem[] | null | undefined): NavItem[] => {
    if (!items || !Array.isArray(items)) return [];
    const leafItems: NavItem[] = [];
    const collectLeafItems = (menuItems: NavItem[]) => {
      for (const item of menuItems) {
        if ((!item.child || item.child.length === 0) && item.staticPage === null) {
          leafItems.push(item);
        }
        if (item.child && Array.isArray(item.child) && item.child.length > 0) {
          collectLeafItems(item.child);
        }
      }
    };
    collectLeafItems(items);
    return leafItems;
  };

  const quickLinks = (data.quickLinks && data.quickLinks.length > 0) ? data.quickLinks : getLeafMenuItems(data.menus);


  // Function to render the correct social icon
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Changed grid layout for better responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          
          {/* Column 1: Logo & Socials */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                className="h-10 w-auto"
                src={data?.logo ?? '/images/logo/enim.png'}
                alt="Logo"
                width={500}
                height={300}
                style={{
                  width: "48px",
                  height: "auto",
                }}
              />
              <div className="flex flex-col justify-center">
                  <h1 className="font-bold text-lg leading-tight text-[#F7C873]">{data?.regionEntity}</h1>
                  <p className="text-xs font-semibold text-gray-300">{data?.regionDescription}</p>
                </div>
            </div>
            <div className="flex space-x-4 pt-2">
              {
                data?.socialMedia ? Object.entries(data?.socialMedia).map(([platform, data]) => (
                  <a
                    key={platform}
                    href={data && typeof data === 'object' && data !== null && 'profileUrl' in data ? (data as { profileUrl: string }).profileUrl : '#'}
                    target="_blank"
                    rel="noopener noreferrer text-gray-400 hover:text-white transition-colors"
                  >
                    {renderSocialIcon(platform.toLowerCase())}
                  </a>
                )) : <p className="text-gray-400 text-sm italic">[Sosial Media belum di atur]</p>
              }
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#F7C873]">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {quickLinks?.map((link: NavItem, index: number) => (
                <li key={`${link.route}-${index}`}>
                  <a href={link.route} className="text-gray-400 hover:text-white transition-colors">
                    {link.title}
                  </a>
                </li>
              ))}
              {(!quickLinks || quickLinks.length === 0) && (
                 <li className="text-gray-500 italic">Belum ada tautan cepat</li>
              )}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#F7C873]">Layanan</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {data?.mainNav?.map((service: NavLayanan) => (
                <li key={service.link}>
                  <a href={service.link} className="text-gray-400 hover:text-white transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
              {(!data?.mainNav || data.mainNav.length === 0) && (
                 <li className="text-gray-500 italic">Belum ada layanan</li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#F7C873]">Kontak</h3>
            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex items-start">
                <MapPin className="min-w-5 min-h-5 mr-3 mt-0.5 text-[#0d6b3f]" />
                <span className="text-gray-400">{data?.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="min-w-5 min-h-5 mr-3 text-[#0d6b3f]" />
                <a href={`tel:${data?.phone}`} className="text-gray-400 hover:text-white hover:underline transition-colors">
                  {data?.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="min-w-5 min-h-5 mr-3 text-[#0d6b3f]" />
                <a href={`mailto:${data?.email}`} className="text-gray-400 hover:text-white hover:underline transition-colors">
                  {data?.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Map */}
          <div className="w-full h-full min-h-[200px] md:col-span-2 lg:col-span-1 xl:col-span-1 rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
             {
                (!data?.latitude || !data?.longitude) && !gmapsApiKey ? (
                    <div className="w-full h-full flex flex-col items-center justify-center py-6 px-4">
                        <Map className="w-10 h-10 text-gray-600 mb-2" />
                        <p className="text-gray-500 text-xs text-center">Peta tidak tersedia</p>
                    </div>
                ) : (
                    <iframe
                        src={mapsUrl}
                        width="100%"
                        height="100%" // Intentionally full height to fill the grid cell
                        className="w-full h-full min-h-[200px]"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${data?.regionEntity ?? 'Lokasi'}`}
                    />
                )
            }
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} {data?.regionEntity ?? 'Desa'}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}