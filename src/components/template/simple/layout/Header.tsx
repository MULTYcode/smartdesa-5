"use client"
import Image from "next/image"
import { CustomButton } from "@/components/ui/simple/CustomButton"
import Topbar from "@/features/header/components/topbar"
import { Key } from "lucide-react"

interface HeaderProps {
  data?: {
    logo: string,
    regionEntity: string,
    regionDescription: string,
    menus: [],
  }
}

export function Header({ data }: HeaderProps) {
  return (
    <>
      {/* Top Bar */}
      <Topbar />

      {/* Header */}
      <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
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
              <h1 className="font-bold text-xl text-[#0d6b3f]">{data?.regionEntity}</h1>
              <p className="text-sm text-gray-600">{data?.regionDescription}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <CustomButton variant="outline" size="icon" className="border-gray-300" onClick={() => window.open('http://localhost:3003', '_blank')}>
              <Key className="h-4 w-4" />
            </CustomButton>
          </div>
        </div>
      </header>
    </>
  )
}
