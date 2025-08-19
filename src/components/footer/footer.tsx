import { Mail, MapPin, Phone } from "lucide-react"
import { NavItem, NavLayanan } from "@/types/Simple";
import Logo from "../shared/logo";
import { FaFacebook, FaInstagram, FaLinkedin, FaQuestion, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

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
    menus: []
  }
}

export function Footer({ data }: FooterProps) {

  const hasBrackets = /[\[\]]/.test(data?.regionEntity ?? '');

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebook className="min-w-5 min-h-5" />
      case "twitter":
        return <FaXTwitter className="min-w-5 min-h-5" />
      case "instagram":
        return <FaInstagram className="min-w-5 min-h-5" />
      case "youtube":
        return <FaYoutube className="min-w-5 min-h-5" />
        case "tiktok":
        return <FaTiktok className="min-w-5 min-h-5" />
        case "threads":
        return <FaThreads className="min-w-5 min-h-5" />
        case "linkedin":
        return <FaLinkedin className="min-w-5 min-h-5" />
      default:
        return <FaQuestion className="min-w-5 min-h-5" />
    }
  }

  return (
    <footer className="bg-[#2A363B] text-white py-8 flex justify-center">
      <div className="px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl ">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          
          <div className="col-span-1 md:col-span-2 flex flex-col items-start gap-2">
            <Logo isDark />
            {
            hasBrackets ? (
              <div className="animate-pulse col-span-1 md:col-span-2">
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-span-1 md:col-span-2">
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
                    )) : <p className="text-black text-center text-md dark:text-green-100">[Sosial Media belum di atur]</p>
                  }
                </div>
              </div>
            )
          }
          </div>

          <div className="w-full gap-2 flex flex-col md:flex-row col-span-1 md:col-span-2">
              {
              hasBrackets ? (
                <div className="animate-pulse w-full mr-3">
                  <div className="h-5 w-32 bg-gray-300 rounded mb-4" /> {/* Judul "Tautan Cepat" */}
                  <ul className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="w-full">
                  <h3 className="w-full font-bold text-lg mb-4">Tautan Cepat</h3>
                  <ul className="space-y-2">
                    {data?.menus?.filter((link: NavItem) => link.child === null)
                      .map((link: NavItem) => (
                      <li key={link.route}>
                        <a href={link.route} className="text-green-100 hover:text-white">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }

            {
              hasBrackets ? (
                <div className="w-full animate-pulse">
                  <div className="h-5 w-32 bg-gray-300 rounded mb-4" /> 
                  <ul className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="w-full ">
                  <h3 className="font-bold text-lg mb-4">Layanan</h3>
                  <ul className="space-y-2">
                    {data?.mainNav?.map((service: NavLayanan) => (
                      <li key={service.link}>
                        <a href={service.link} className="text-green-100 hover:text-white">
                          {service.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          </div>
          {
            hasBrackets ? (
              <div className="animate-pulse col-span-1 md:col-span-2">
                <div className="h-5 w-32 bg-gray-300 rounded mb-4" /> {/* Judul "Tautan Cepat" */}
                <ul className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="col-span-1 md:col-span-2">
                <h3 className="font-bold text-lg mb-4">Kontak</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="min-w-5 min-h-5 mr-3 mt-0.5 text-green-100" />
                    <span className="text-green-100">{data?.address}</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="min-w-5 min-h-5 mr-3 text-green-100" />
                    <span className="text-green-100">{data?.phone}</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="min-w-5 min-h-5 mr-3 text-green-100" />
                    <span className="text-green-100">{data?.email}</span>
                  </li>
                </ul>
              </div>
            )
          }

        </div>

        <div className="border-t border-green-100 mt-12 pt-8 text-center text-green-100 text-sm">
          <p>
            © {new Date().getFullYear()} {data?.regionEntity}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
