"use client"

import { Mail, Phone } from "lucide-react"
import Sosmed from "../common/sosmed"
import { MainNav } from "../navigation/main-nav"
import Logo from "../shared/logo"

 const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-white/20 rounded ${className}`} />
  )

interface HeaderProps {
  data?:{
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

export default function Header({ data }: HeaderProps) {

  const mainNav = data?.menus ?? []

  return (
    <header className="w-full village-header fixed top-0 z-50" suppressHydrationWarning>
      <div className="hidden md:flex justify-center bg-[#F8F6F6]">
        <div className="px-6 py-2 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <Logo/>
            </div>
            {
              !data?.socialMedia ? (
                <div className="bg-[#0d6b3f] text-white py-2 flex justify-center w-full">
                  <div className="px-0 w-full max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-col sm:flex-row gap-2 flex justify-between items-start sm:items-center">
                    {/* Left Side - Phone & Email */}
                    <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-2 space-x-4 text-sm">
                      {/* Phone */}
                      <div className="flex items-center space-x-1">
                        <Skeleton className="h-4 w-4 rounded-full bg-green-800" />
                        <Skeleton className="h-4 w-24 bg-green-800" />
                      </div>
                      {/* Email */}
                      <div className="flex items-center space-x-1">
                        <Skeleton className="h-4 w-4 rounded-full bg-green-800" />
                        <Skeleton className="h-4 w-36 bg-green-800" />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-5 w-5 rounded-full bg-green-800" />
                      <Skeleton className="h-5 w-5 rounded-full bg-green-800" />
                      <Skeleton className="h-5 w-5 rounded-full bg-green-800" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" text-black flex justify-end">
                  <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-col sm:flex-row gap-4 lg:gap-2 flex justify-between items-start sm:items-center">
                    <div className="flex flex-col lg:flex-row  items-start lg:items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        <a href={`tel:${data?.phone}`} className="hover:underline">
                          {data?.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        <a href={`mailto:${data?.email}`} className="hover:underline">
                          {data?.email}
                        </a>
                      </div>
                    </div>
                    <Sosmed />
                  </div>
                </div>
              )
            }
        </div>
      </div>
      <div className="flex justify-center py-2 bg-[#2A363B]">
        <div className="px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full flex items-center justify-between md:justify-end lg:justify-center">
         <div className="flex md:hidden items-center space-x-3">
              <Logo isDark/>
            </div>

          <div className="flex items-center justify-between">
                   <MainNav menuData={(mainNav?.length > 0) ? mainNav
                              :  [
                                  {
                                      "order": 1,
                                      "title": "Home",
                                      "route": "/",
                                      "staticPage": null,
                                      "child": null
                                  },
                                  {
                                      "order": 2,
                                      "title": "Artikel",
                                      "route": "/article",
                                      "staticPage": null,
                                      "child": null
                                  }
                              ]}  />
              </div>
        </div>
      </div>
    </header>
  )
}