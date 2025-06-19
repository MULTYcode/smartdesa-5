"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/simple/card"
import { Button } from "../ui/simple/Button"
import { CTASection, InfoCard } from "@/types/Simple"
import { Contact, FileText, Mail, MapPin, Phone, Users } from "lucide-react"
import { CustomButton } from "../ui/simple/CustomButton"

interface InfoSectionProps {
  cards: InfoCard[],
  cta: CTASection
}

export default function MenuCards({ cards, cta }: InfoSectionProps) {

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "desapedia":
        return Users
      case "wisata":
        return MapPin
      case "artikel":
        return FileText
      default:
        return undefined
    }
  }

  function CardMenuSkeleton() {
    return <Card className="h-full bg-white/90 backdrop-blur-sm border-gray-200 animate-pulse">
      <CardHeader>
        <div className="flex items-center mb-3">
          <div className="h-6 w-6 rounded-full mr-3 bg-gray-300" />
          <div className="h-6 w-40 bg-gray-200 rounded-md" />
        </div>
        <div className="h-4 w-3/4 bg-gray-100 rounded-md" />
      </CardHeader>
      <CardFooter>
        <div className="h-10 w-full bg-gray-300 rounded-md" />
      </CardFooter>
    </Card>
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-green-900 mb-4">Jelajahi Desa Kami</h2>
        <p className="text-xl text-green-700 max-w-2xl mx-auto">
          Temukan berbagai aspek komunitas kami melalui pengalaman yang dikurasi dengan cermat ini
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {

          cards.length <= 0 && (
            [...Array(3)].map((_, index) => (              
                <CardMenuSkeleton key={index} />              
            ))
          )
        }
        {cards.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-white/90 backdrop-blur-sm border-green-200 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">
                    {(() => {
                      const Icon = getIconComponent(item.title.toLowerCase());
                      return Icon ? <Icon className="h-6 w-6 text-[#0d6b3f]" /> : null;
                    })()}
                  </span>
                  <CardTitle className="text-green-900">{item.title}</CardTitle>
                </div>
                <CardDescription className="text-green-700 font-medium">{item.description}</CardDescription>
              </CardHeader>
              {/* <CardContent>
                <p className="text-green-800 leading-relaxed">{item.description}</p>                
              </CardContent> */}
              <CardFooter>
                <Link href={item.link} className="w-full">
                  <Button className="w-full bg-green-700 text-green-100 hover:bg-green-800 transition-colors duration-300">
                    {item.title}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        <Card className="h-full bg-white/90 backdrop-blur-sm border-green-200 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">
                {(() => {
                  const Icon = Contact;
                  return Icon ? <Icon className="h-6 w-6 text-[#0d6b3f]" /> : null;
                })()}
              </span>
              <CardTitle className="text-green-900">Hubungi Kami</CardTitle>
            </div>
            <CardDescription className="text-green-700 font-medium">Untuk informasi lebih lanjut silahkan hubungi kami</CardDescription>
          </CardHeader>
          {/* <CardContent>
                <p className="text-green-800 leading-relaxed">{item.description}</p>                
              </CardContent> */}
          <CardFooter>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {
                cta.buttons.primary.url.includes("undefined") ? (
                  <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-transparent rounded-md animate-pulse">
                    <div className="h-4 w-4 bg-gray-300 rounded mr-2" />
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                  </div>
                ) : (
                  <CustomButton variant="secondary" className="bg-white text-[#0d6b3f] hover:bg-gray-100" onClick={() => window.open(cta.buttons.primary.url, '_blank')}>
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi kami
                  </CustomButton>
                )
              }
              {                
                cta.buttons.primary.url.includes("undefined") ? (
                  <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-transparent rounded-md animate-pulse">
                    <div className="h-4 w-4 bg-gray-300 rounded mr-2" />
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                  </div>
                ) : (
                  <CustomButton variant="secondary" className="bg-white text-[#0d6b3f] hover:bg-gray-100" onClick={() => window.open(cta.buttons.secondary.url, '_blank')}>
                    <Mail className="h-4 w-4 mr-2" />
                    Kirim pesan
                  </CustomButton>
                )
              }
            </div>
            {/* <Link href="#" className="w-full">
                  <Button className="w-full bg-green-700 text-green-100 hover:bg-green-800 transition-colors duration-300">
                    Hubungi kami
                  </Button>
                </Link> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
