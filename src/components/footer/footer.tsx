import { Mail, MapPin, Phone } from "lucide-react"
import { NavItem, NavLayanan } from "@/types/Simple";
import Logo from "../shared/logo";
import { FaFacebook, FaInstagram, FaLinkedin, FaQuestion, FaThreads, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

interface SocialMedia {
    profileUrl: string;
}

interface FooterData {
    logo?: string;
    regionEntity?: string;
    regionDescription?: string;
    address?: string;
    phone?: string;
    email?: string;
    longitude?: string;
    latitude?: string;
    socialMedia?: Record<string, SocialMedia>;
    mainNav?: NavLayanan[];
    menus?: NavItem[];
    quickLinks?: NavItem[];
}

interface FooterProps {
  data?: FooterData
}

export function Footer({ data }: FooterProps) {

  const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
  const hasCoordinates = data?.latitude && data?.longitude;
  const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${data?.latitude},${data?.longitude}`;

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook": return <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
      case "x":
      case "twitter": return <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
      case "instagram": return <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
      case "youtube": return <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
      case "tiktok": return <FaTiktok className="w-4 h-4 sm:w-5 sm:h-5" />
      case "threads": return <FaThreads className="w-4 h-4 sm:w-5 sm:h-5" />
      case "linkedin": return <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
      default: return <FaQuestion className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  }

  return (
    <footer className="bg-[#2A363B] text-white py-8 sm:py-10 md:py-12 flex justify-center w-full">
       <div className="px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-4 mb-8 sm:mb-10 md:mb-12">
          
          <div className="flex flex-col space-y-4 sm:space-y-6">
             <div className="flex flex-col items-start gap-4">
                <Logo isDark />
                {hasCoordinates && gmapsApiKey && (
                    <div className="w-full h-36 sm:h-44 md:h-48 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg mt-2">
                         <iframe
                            src={mapsUrl}
                            width="100%"
                            height="100%"
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Kantor"
                        />
                    </div>
                )}
             </div>
          </div>

          <div className="w-full">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-0.5 after:bg-[#F7C873]">
                Tautan Cepat
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                {(data?.quickLinks && data.quickLinks.length > 0) ? (
                    data.quickLinks.map((link: NavItem, index: number) => (
                        <li key={`${link.route}-${index}`}>
                            <a href={link.route || "#"} className="text-gray-300 hover:text-[#F7C873] hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2">
                                {link.title}
                            </a>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400 italic text-xs">Belum ada tautan cepat</li>
                )}
            </ul>
          </div>

          <div className="w-full">
             <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-0.5 after:bg-[#F7C873]">
                Layanan
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                {(data?.mainNav && data.mainNav.length > 0) ? (
                    data.mainNav.slice(0, 6).map((service: NavLayanan, index: number) => (
                        <li key={`${service.link}-${index}`}>
                             <a href={service.link || "#"} className="text-gray-300 hover:text-[#F7C873] hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2">
                                {service.title}
                            </a>
                        </li>
                    ))
                ) : (
                     <li className="text-gray-400 italic text-xs">Belum ada layanan</li>
                )}
            </ul>
          </div>

          <div className="w-full">
             <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-0.5 after:bg-[#F7C873]">
                Hubungi Kami
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-start gap-2.5 sm:gap-3 group">
                    <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 rounded-lg bg-white/10 group-hover:bg-[#CF4647]/30 transition-colors">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7C873]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider">Alamat</span>
                         {hasCoordinates ? (
                            <a 
                                href={`https://www.google.com/maps?q=${data?.latitude},${data?.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-gray-200 hover:text-[#F7C873] transition-colors leading-relaxed mt-0.5 text-xs sm:text-sm break-words"
                            >
                                {data?.address || "[Alamat belum diatur]"}
                            </a>
                         ) : (
                            <p className="text-gray-200 leading-relaxed mt-0.5 text-xs sm:text-sm">{data?.address || "[Alamat belum diatur]"}</p>
                         )}
                    </div>
                </li>

                <li className="flex items-start gap-2.5 sm:gap-3 group">
                     <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 rounded-lg bg-white/10 group-hover:bg-[#CF4647]/30 transition-colors">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7C873]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider">Telepon</span>
                        <a href={`tel:${data?.phone}`} className="block text-gray-200 hover:text-[#F7C873] transition-colors mt-0.5 text-xs sm:text-sm">
                            {data?.phone || "[No. Telp belum diatur]"}
                        </a>
                    </div>
                </li>

                 <li className="flex items-start gap-2.5 sm:gap-3 group">
                     <div className="mt-0.5 sm:mt-1 p-1.5 sm:p-2 rounded-lg bg-white/10 group-hover:bg-[#CF4647]/30 transition-colors">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7C873]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider">Email</span>
                        <a href={`mailto:${data?.email}`} className="block text-gray-200 hover:text-[#F7C873] transition-colors mt-0.5 break-all text-xs sm:text-sm">
                            {data?.email || "[Email belum diatur]"}
                        </a>
                    </div>
                </li>
            </ul>

            <div>
                 <h4 className="text-xs sm:text-sm font-semibold text-white mb-2.5 sm:mb-3">Ikuti Kami</h4>
                 <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {data?.socialMedia ? (
                        Object.entries(data.socialMedia).map(([platform, mediaData]) => (
                             <a
                                key={platform}
                                href={mediaData?.profileUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#CF4647] hover:text-white text-gray-300 border border-white/10 hover:border-transparent transition-all duration-300"
                                aria-label={platform}
                            >
                                {renderSocialIcon(platform)}
                            </a>
                        ))
                    ) : (
                         <p className="text-xs text-gray-400 italic">[Sosial media belum diatur]</p>
                    )}
                 </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 mt-6 sm:mt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Pemerintahan Kabupaten Muara Enim. <span className="hidden sm:inline">Hak Cipta Dilindungi.</span></p>
          <div className="flex gap-4 sm:gap-6">
              <span className="hover:text-[#F7C873] transition-colors cursor-pointer">Kebijakan Privasi</span>
              <span className="hover:text-[#F7C873] transition-colors cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}