import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BiMap, BiGlobe } from "react-icons/bi"
import { CgMail } from "react-icons/cg"
import { ChevronRight } from "lucide-react"

export interface TourCardProps {
  id?: number
  title?: string
  excerpt?: string
  description?: string
  date?: string
  readTime?: string
  image?: string
  thumbnail?: string
  slug?: string
  className?: string
  isDetail?: boolean
  address?: string
  website?: string
  email?: string
}

export function TourCard({
  title,
  image,
  thumbnail,
  slug,
  className,
  excerpt,
  description,
  address,
  website,
  email,
  isDetail = false,
}: TourCardProps) {
  const displayImage = thumbnail || image || "/images/unavailable-image.png"
  const displayDescription = excerpt || description || ""
  const tourSlug = slug ?? ""

  if (isDetail) {
    return (
      <div className={cn("w-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md", className)}>
        <div className="relative h-64 sm:h-96 w-full overflow-hidden">
          <Image
            src={displayImage}
            alt={title || "Tour Image"}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          {address && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <BiMap className="w-5 h-5 text-[#CF4647] flex-shrink-0" />
              <span>{address}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/tour/${tourSlug}`}
      title={title}
      className={cn(
        "group flex flex-col h-full w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden min-w-0",
        className
      )}
    >
      {/* Container Gambar (Ratio 16:10) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
        <Image
          src={displayImage}
          alt={title || "Tour Image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Konten Card */}
      <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
        <div className="min-w-0">
          {/* Judul dengan Truncate 2 Baris */}
          <h3
            title={title}
            className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-[#CF4647] transition-colors leading-snug line-clamp-2 mb-2 break-words"
          >
            {title}
          </h3>

          {/* Deskripsi Singkat 2 Baris */}
          {displayDescription && (
            <p
              title={displayDescription}
              className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-3 break-words"
            >
              {displayDescription}
            </p>
          )}
        </div>

        {/* Informasi Lokasi & Kontak */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/50 space-y-1.5 min-w-0">
          {address && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 min-w-0" title={address}>
              <BiMap className="w-4 h-4 text-[#CF4647] flex-shrink-0" />
              <span className="truncate flex-1 min-w-0">{address}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 min-w-0" title={website}>
              <BiGlobe className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="truncate flex-1 min-w-0">{website}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 min-w-0" title={email}>
              <CgMail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="truncate flex-1 min-w-0">{email}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
