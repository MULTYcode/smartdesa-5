import { Mail, Phone } from 'lucide-react'
import React from 'react'
import Sosmed from './sosmed'
import useSetting from '@/hooks/useSettings';
import { getEnv } from '@/lib/get-runtime-env';

export default function Topbar() {
    const { data: setting } = useSetting(`footer-${getEnv('NEXT_PUBLIC_VILLAGE_ID')}`, {});
    
  return (
    <div className="bg-[#0d6b3f] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{setting?.value?.contactUs?.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{setting?.value?.contactUs?.email}</span>
            </div>
          </div>
          <Sosmed />
        </div>
      </div>
  )
}