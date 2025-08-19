"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/simple/card"
import { CTASection, InfoCard } from "@/types/Simple"
import Icons from "../common/icons"
import { useContent } from "@/hooks/useContent"

interface InfoSectionProps {
  cards: InfoCard[],
  cta: CTASection
}

export default function MenuCards({ cards }: InfoSectionProps) {

  const { service } = useContent();

  function CardMenuSkeleton() {
    return <Card className="h-full py-3 bg-white/90 backdrop-blur-sm border-gray-200 animate-pulse">
      <CardHeader>
        <div className="flex items-center mb-3">
          <div className="h-6 w-6 rounded-full mr-3 bg-gray-300" />
          <div className="h-6 w-40 bg-gray-200 rounded-md" />
        </div>
        <div className="h-4 w-3/4 bg-gray-100 rounded-md" />
      </CardHeader>
      <CardFooter>
        <div className="h-8 w-full bg-gray-300 rounded-md" />
      </CardFooter>
    </Card>
  }

  return (
   <div className="relative z-10 flex justify-center">
        <div className="py-2 px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full mx-auto">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-start mb-6"
              >
                <h2 className="text-2xl font-bold uppercase text-[#CF4647]">{service.title}</h2>
                <p className="text-sm text-black">{service.subTittle}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-4 sm:gap-4">
                {

                  cards.length <= 0 && (
                    [...Array(6)].map((_, index) => (              
                        <CardMenuSkeleton key={index} />              
                    ))
                  )
                }
                {cards.map((item, index) => (
                  <Link key={item.id} target="blank" href={item.link} className="w-full h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full"
                    >
                      <Card className="h-full w-full items-center flex bg-white/90 backdrop-blur-sm border-[#CF4647]/20 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <CardHeader>
                          <div className="flex w-full items-center mb-1">
                            <span className="text-3xl mr-3">
                              {(() => {
                                const IconComponent = Icons[item.icon] 
                                const Icon = IconComponent;
                                return Icon ? <Icon className="h-6 w-6 text-[#CF4647]" /> : null;
                              })()}
                            </span>
                            <CardTitle className="text-black text-xl">{item.title}</CardTitle>
                          </div>
                          <CardDescription className="text-black font-medium">{item.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              
              </div>
          </div>
        </div>
    </div>
  )
}
