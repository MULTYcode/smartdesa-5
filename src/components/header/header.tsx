"use client"

import Link from "next/link"
import { Key } from "lucide-react"
import Image from "next/image"
import { MainNav } from "../template/simple/sections/mainnav-section"
import { MobileNav } from "../template/simple/sections/mobilnav-section"
import { CustomButton } from "../ui/simple/CustomButton"

interface HeaderProps {
  data?: {
    logo: string,
    regionEntity: string,
    regionDescription: string,
    menus: [],
  }
}

export default function Header({ data }: HeaderProps) {

  const mainNav = ((data?.menus ?? []).length > 0) ? (data?.menus ?? [])
    : [
      {
        "order": 1,
        "title": "Home",
        "route": "/",
        "staticPage": null,
        "child": []
      },
      {
        "order": 2,
        "title": "Artikel",
        "route": "/article",
        "staticPage": null,
        "child": []
      },
      {
        "order": 3,
        "title": "Wisata",
        "route": "/tour",
        "staticPage": null,
        "child": []
      }
    ]

  return (
    <header className="w-full village-header bg-green-900 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-green-100 font-bold text-xl flex items-center">
          <div className="flex items-center space-x-3">
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
              <h1 className="font-bold text-xl text-green-100">{data?.regionEntity}</h1>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between">
          <MainNav items={mainNav} />
          <MobileNav items={mainNav} />
          <CustomButton variant="primary" size="icon" className="border-gray-300" onClick={() => window.open('http://localhost:3003', '_blank')}>
            <Key className="h-4 w-4" />
          </CustomButton>
        </div>

      </div>
    </header>
  )
}
