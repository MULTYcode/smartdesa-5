import { Calendar, Clock,  Tag,  User } from "lucide-react"
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

export function NewsCard({ title, excerpt, date, readTime, image, slug, className, category, author, isDetail = false }: NewsCardProps) {
  return (
   <Link 
              href={`/article/${slug}`} 
              className="items-center text-[#CF4647] font-medium hover:text-red-700 transition-colors duration-300"
            >

              <CustomCard className={cn(
          "group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300",
          className
        )}>

          <div className="absolute inset-0 bg-gradient-to-br from-[#CF4647]/0 to-white/0 group-hover:from-[#CF4647]/10 group-hover:to-white/10 transition-all duration-300" />
          
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {category && (
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-[#CF4647] shadow-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {category}
                </span>
              </div>
            )}
            
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(date).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              {author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-medium">{author}</span>
                </div>
              )}
              {readTime && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{readTime}</span>
                  </div>
                </>
              )}
            </div>

            <h3 className={cn(
              "my-2 leading-3 text-lg font-bold tracking-tight text-gray-900 dark:text-white",
              "group-hover:text-[#CF4647] transition-colors duration-300",
              !isDetail && "line-clamp-2"
            )}>
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mb-3 font-normal text-sm line-clamp-3 leading-5 text-gray-500 lg:text-gray-800 dark:text-gray-400">
                {excerpt}
              </p>
            )}

          </div>

          {/* Decorative accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#CF4647] to-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </CustomCard>
    </Link>
  )
}
