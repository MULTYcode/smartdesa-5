"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/simple/card"
import Icons from "../common/icons"
import { useContent } from "@/hooks/useContent"
import { InfoCard } from "@/types/Simple"
import { Modal } from "../ui/modal"

// ─── Animation Variants ───
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
}

// ─── Service Card (reusable in grid + modal) ───
function ServiceCardItem({
  item,
  index,
  onChildClick,
  compact = false,
}: {
  item: InfoCard
  index: number
  onChildClick?: (item: InfoCard) => void
  compact?: boolean
}) {
  const IconComponent = Icons[item.icon] ?? Icons.FaQuestion
  const hasImage = !!item.image
  const hasChildren = Array.isArray(item.child) && item.child.length > 0
  const description = item.description || `Semua informasi tentang ${item.title} dapat kamu lihat disini`
  const linkUrl = item.link || "/"

  const cardContent = (
    <Card
      className={`h-full w-full bg-white/90 backdrop-blur-sm border-[#CF4647]/20 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        compact ? "" : "sm:hover:-translate-y-2"
      }`}
    >
      <CardHeader className={compact ? "p-3 sm:p-4" : "p-3 sm:p-4 md:p-5"}>
        {/* Icon/Image + Title row */}
        <div className="flex w-full items-center gap-2 sm:gap-3 mb-1.5">
          {hasImage ? (
            <div className="relative flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={item.image!}
                alt={item.title}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <span className={compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl md:text-2xl"}>
              {IconComponent && <IconComponent className={`${compact ? "h-4 w-4 sm:h-5 sm:w-5" : "h-5 w-5 sm:h-6 sm:w-6"} text-[#CF4647]`} />}
            </span>
          )}
          <CardTitle className={`text-gray-900 leading-tight line-clamp-2 ${compact ? "text-sm sm:text-base" : "text-sm sm:text-base md:text-lg"}`}>
            {item.title}
          </CardTitle>
        </div>

        {/* Description */}
        <CardDescription className={`text-gray-600 font-normal leading-relaxed line-clamp-2 ${compact ? "text-xs" : "text-xs sm:text-sm"}`}>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )

  const motionWrapper = (children: React.ReactNode) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="h-full"
    >
      {children}
    </motion.div>
  )

  // Has children → open modal
  if (hasChildren && onChildClick) {
    return motionWrapper(
      <button
        type="button"
        onClick={() => onChildClick(item)}
        className="w-full h-full text-left focus:outline-none"
      >
        {cardContent}
      </button>
    )
  }

  // External link
  if (linkUrl.startsWith("http")) {
    return motionWrapper(
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
        {cardContent}
      </a>
    )
  }

  // Internal link
  return motionWrapper(
    <Link href={linkUrl} className="w-full h-full block">
      {cardContent}
    </Link>
  )
}

// ─── Main Component ───
export default function MenuCards() {
  const [selectedService, setSelectedService] = useState<InfoCard | null>(null)
  const { service, infoCards } = useContent()

  const sortedData = [...infoCards].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  function CardMenuSkeleton() {
    return (
      <Card className="h-full py-2 sm:py-3 bg-white/90 backdrop-blur-sm border-gray-200 animate-pulse">
        <CardHeader>
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full mr-2 sm:mr-3 bg-gray-300" />
            <div className="h-5 sm:h-6 w-32 sm:w-40 bg-gray-200 rounded-md" />
          </div>
          <div className="h-3 sm:h-4 w-3/4 bg-gray-100 rounded-md" />
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      <div className="relative z-10 flex justify-center">
        <div className="py-2 px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full mx-auto">
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-start mb-4 sm:mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#CF4647]">
                {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-black mt-1">{service.subTittle}</p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {sortedData.length <= 0 && infoCards.length <= 0 ? (
                [...Array(6)].map((_, index) => <CardMenuSkeleton key={index} />)
              ) : sortedData.length <= 0 ? (
                <div className="h-48 sm:h-72 w-full col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-start">
                  <p className="text-start text-sm sm:text-base text-gray-500">
                    Tidak ada layanan
                  </p>
                </div>
              ) : (
                sortedData.map((item, index) => (
                  <ServiceCardItem
                    key={item.id}
                    item={item}
                    index={index}
                    onChildClick={(card) => setSelectedService(card)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0"
      >
        {selectedService && (
          <>
            {/* Modal Header */}
            <div className="flex-none px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3 pr-8">
                {selectedService.image ? (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  (() => {
                    const Icon = Icons[selectedService.icon] ?? Icons.FaQuestion
                    return (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#CF4647]" />
                      </div>
                    )
                  })()
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
                    {selectedService.title}
                  </h3>
                  {selectedService.description && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {selectedService.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto px-5 sm:px-6 py-4 sm:py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <AnimatePresence>
                  {selectedService.child?.map((child, i) => (
                    <ServiceCardItem
                      key={child.id ?? child.title}
                      item={child}
                      index={i}
                      compact
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  )
}
