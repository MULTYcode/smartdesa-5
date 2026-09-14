// import { useNavigation } from '@/hooks/useNavigation'
import useSetting from '@/hooks/useSettings';
import { getEnv } from '@/lib/get-runtime-env';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import React from 'react'

export default function Sosmed() {

    const { data: setting } = useSetting(`footer-${getEnv('NEXT_PUBLIC_VILLAGE_ID')}`, {});

    const renderSocialIcon = (platform: string) => {
        switch (platform) {
            case "facebook":
                return <Facebook className="h-4 w-4" />
            case "twitter":
                return <Twitter className="h-4 w-4" />
            case "instagram":
                return <Instagram className="h-4 w-4" />
            case "youtube":
                return <Youtube className="h-4 w-4" />
            default:
                return null
        }
    }

    return (
        <div className="flex items-center space-x-3">
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
                )) : <p className="text-black text-center text-md dark:text-gray-400">[Sosial Media belum di atur]</p>
            }
        </div>
    )
}