import { Calendar, Clock, Tag, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CustomCard } from "@/components/ui/simple/CustomCard"

export interface NewsCardProps {
  id?: number
  title: string
  excerpt?: string
  date: string
  readTime?: string
  image?: string
  slug?: string
  className?: string
  isDetail?: boolean
  content?: string
  category?: string
  showCategory?: boolean
  author?: string
}

// Helper function to format date consistently
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export function NewsCard({ title, excerpt, date, readTime, image, slug, className, category, author, isDetail = false }: NewsCardProps) {
  return (
   <Link 
              href={`/article/${slug}`} 
              className="items-center text-[#CF4647] font-medium hover:text-red-700 transition-colors duration-300"
            >

              <CustomCard className={cn(
          "group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full",
          className
        )}>

          <div className="absolute inset-0 bg-gradient-to-br from-[#CF4647]/0 to-white/0 group-hover:from-[#CF4647]/10 group-hover:to-white/10 transition-all duration-300" />
          
          {/* Image Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            
            {/* Category Badge */}
            {category && (
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-white/90 backdrop-blur-sm text-[#CF4647] shadow-sm">
                  <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                  {category}
                </span>
              </div>
            )}
            
            {/* Date Badge */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <span 
                className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm"
                suppressHydrationWarning
              >
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                {formatDate(date)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-3 sm:p-4">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
              {author && (
                <div className="flex items-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                  <span className="font-medium truncate max-w-[100px] sm:max-w-[150px]">{author}</span>
                </div>
              )}
              {readTime && (
                <>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                    <span>{readTime}</span>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className={cn(
              "text-sm sm:text-base md:text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-tight sm:leading-snug",
              "group-hover:text-[#CF4647] transition-colors duration-300",
              !isDetail && "line-clamp-2"
            )}>
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mt-2 font-normal text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed text-gray-500 lg:text-gray-700 dark:text-gray-400">
                {excerpt}
              </p>
            )}

          </div>

          {/* Decorative accent */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-[#CF4647] to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </CustomCard>
    </Link>
  )
}

