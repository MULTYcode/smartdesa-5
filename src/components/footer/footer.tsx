import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { NavItem, NavLayanan } from "@/types/Simple";

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

  const hasBrackets = /[\[\]]/.test(data?.regionEntity ?? '');

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
    <footer className="bg-green-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {
            hasBrackets ? (
              <div className="animate-pulse">
                {/* Logo dan region info */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-[38px] h-[38px] bg-gray-200 rounded-md" /> {/* Logo placeholder */}
                  <div>
                    <div className="h-5 w-40 bg-gray-200 rounded-md mb-2" /> {/* regionEntity */}
                    <div className="h-3 w-32 bg-gray-100 rounded-md" /> {/* regionDescription */}
                  </div>
                </div>

                {/* Sosial media icons */}
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </div>
            ) : (
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
                  <div>
                    <h3 className="font-bold text-xl">{data?.regionEntity}</h3>
                    <p className="text-sm text-green-100">{data?.regionDescription}</p>
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
                    )) : <p className="text-black text-center text-md dark:text-green-100">[Sosial Media belum di atur]</p>
                  }
                </div>
              </div>
            )
          }

          {
            hasBrackets ? (
              <div className="animate-pulse">
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
              <div>
                <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
                <ul className="space-y-2">
                  {data?.quickLinks?.map((link: NavItem) => (
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
              <div className="animate-pulse">
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
              <div>
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

          {
            hasBrackets ? (
              <div className="animate-pulse">
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
              <div>
                <h3 className="font-bold text-lg mb-4">Kontak</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 text-green-100" />
                    <span className="text-green-100">{data?.address}</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-green-100" />
                    <span className="text-green-100">{data?.phone}</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-green-100" />
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
