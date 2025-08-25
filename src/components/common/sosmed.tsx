// import { useNavigation } from '@/hooks/useNavigation'
import useSetting from '@/hooks/useSettings';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaThreads, FaTiktok, FaYoutube, FaQuestion } from "react-icons/fa6";
import React from 'react'

export default function Sosmed() {

    const { data: setting } = useSetting(`footer-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

    const renderSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "facebook":
            return <FaFacebook className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            case "x":
            return <FaXTwitter className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            case "instagram":
            return <FaInstagram className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            case "youtube":
            return <FaYoutube className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            case "linkedin":
            return <FaLinkedin className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            case "threads":
            return <FaThreads className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            case "tiktok":
            return <FaTiktok className="min-w-5 min-h-5 hover:text-[#F7C873]" />
            default:
            return <FaQuestion className="min-w-5 min-h-5 hover:text-[#F7C873]" />
        }
    }

    return (
        <div className="flex items-center space-x-4">
            {
                setting?.value?.socialMedia ? Object.entries(setting?.value?.socialMedia).map(([platform, data]) => (
                    <a
                        key={platform}
                        href={data && typeof data === 'object' && data !== null && 'profileUrl' in data ? (data as { profileUrl: string }).profileUrl : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {renderSocialIcon(platform.toLowerCase())}
                    </a>
                )) : <div className="flex space-x-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
                        ))}
                    </div>
            }
        </div>
    )
}