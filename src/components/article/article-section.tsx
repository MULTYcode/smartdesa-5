import Link from "next/link"
import { ChevronRight } from "lucide-react"
import useArticle from "@/features/article/hooks/useArticle";
import { useContent } from "@/hooks/useContent";
import PageArticleSkeleton from "@/components/common/skeleton/PageArticleSkeleton";
import Image from "next/image";
import { motion } from "framer-motion";
import ArtikelPopuler from "./artikelPopuler";

// Helper function to format date consistently
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'Tanggal tidak tersedia';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Tanggal tidak tersedia';
  }
};

export function NewsSection() {
  const { data, isLoading } = useArticle({ "page_size": 4, "order": "desc", "by": "published_at" });
  const { article } = useContent();
  
  return (
      <section id="article" className="py-6 sm:py-8 bg-gray-50 w-full flex justify-center">
        <div className="w-full px-4 sm:px-6 md:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
         <div className="flex w-full flex-col md:flex-row justify-between items-start gap-6 md:gap-4">
           <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-4">
            {/* Header */}
            <div className="col-span-1 sm:col-span-2 flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{article.title}</h2>
              </div>
              <Link href="/article" className="text-[#CF4647] font-medium flex items-center hover:underline text-sm sm:text-base">
                <span className="hidden sm:inline">Lihat Semua</span>
                <span className="sm:hidden">Semua</span>
                <ChevronRight className="h-4 w-4 ml-0.5 sm:ml-1" />
              </Link>
            </div>
            {
              isLoading ? Array.from({ length: 4 }).map((_, index) => <PageArticleSkeleton key={index} />) :
              !data?.pages[0] || data?.pages[0]?.data.length === 0 ? (
                <div className="h-48 sm:h-72 w-full col-span-1 sm:col-span-2 flex items-center justify-start">
                  <p className="text-start text-sm sm:text-base text-gray-500">Tidak ada artikel</p>
                </div>
              ) :
              data?.pages[0]?.data.map((item) => (
                <Link key={item.id} className="col-span-1" href={`/article/${item.slug}`}>
                    <motion.div
                      className="relative w-full aspect-[16/9] rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Image
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                      <motion.div
                        className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between text-white bg-black rounded-lg"
                        initial={{ opacity: 0.6, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        whileHover={{ opacity: 0.8, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h3 className="text-base sm:text-lg md:text-xl text-white font-bold line-clamp-2">{item.title}</h3>
                          {item?.category?.name && (
                            <p className="text-xs sm:text-sm mt-1 text-[#F7C873]">{item.category.name}</p>
                          )}
                        </motion.div>
                        <motion.p
                          className="text-xs sm:text-sm"
                          initial={{ y: 10, opacity: 0.6 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          suppressHydrationWarning
                        >
                          {formatDate(item.published_at)}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                </Link>
            ))}
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-1 gap-3 sm:gap-4">
            <ArtikelPopuler/>
          </div>
         </div>
        </div>
      </section> 
  )
}
