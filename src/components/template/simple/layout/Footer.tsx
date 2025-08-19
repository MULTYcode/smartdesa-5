import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { NavItem, NavLayanan } from "@/types/Simple";
import FooterSkeleton from "../../../common/skeleton/footerSkeleton";

interface FooterProps {
  data?: {
    logo: string,
    regionEntity: string,
    regionDescription: string,
    address: string,
    phone: string,
    email: string,
    socialMedia: [],
    mainNav: [],
    quickLinks: []
  }
}

export function Footer({ data }: FooterProps) {

  if(!data) return <FooterSkeleton />

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Image
                className="h-1"
                src={data?.logo ?? '/images/logo/enim.png'}
                alt="Logo"
                width={500}
                height={300}
                style={{
                  width: "38px",
                  height: "auto",
                }}
              />
              <div className="flex flex-col justify-center">
                  <h1 className="font-bold text-lg leading-5 text-[#F7C873]">{data?.regionEntity}</h1>
                  <p className="text-xs font-semibold text-black">{data?.regionDescription}</p>
                </div>
            </div>
            <div className="flex space-x-4">
              {
                data?.socialMedia ? Object.entries(data?.socialMedia).map(([platform, data]) => (
                  <a
                    key={platform}
                    href={data && typeof data === 'object' && data !== null && 'profileUrl' in data ? (data as { profileUrl: string }).profileUrl : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {renderSocialIcon(platform.toLowerCase())}
                  </a>
                )) : <p className="text-black text-center text-md dark:text-gray-400">[Sosial Media belum di atur]</p>
              }
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {data?.quickLinks?.map((link: NavItem) => (
                <li key={link.route}>
                  <a href={link.route} className="text-gray-400 hover:text-white">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              {data?.mainNav?.map((service: NavLayanan) => (
                <li key={service.link}>
                  <a href={service.link} className="text-gray-400 hover:text-white">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="min-w-6 min-h-6 mr-3 mt-0.5 text-[#0d6b3f]" />
                <span className="text-gray-400">{data?.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="min-w-6 min-h-6 mr-3 text-[#0d6b3f]" />
                <span className="text-gray-400">{data?.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="min-w-6 min-h-6 mr-3 text-[#0d6b3f]" />
                <span className="text-gray-400">{data?.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} {data?.regionEntity}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
