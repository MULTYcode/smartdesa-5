import Link from "next/link"
import { ChevronRight } from "lucide-react"
import useArticle from "@/features/article/hooks/useArticle";
import { useContent } from "@/hooks/useContent";
import PageArticleSkeleton from "@/components/common/skeleton/PageArticleSkeleton";
import Image from "next/image";
import { motion } from "framer-motion";
import ArtikelPopuler from "./artikelPopuler";

export function NewsSection() {
  const { data, isLoading } = useArticle({ "page_size": 4, "order": "desc", "by": "published_at" });
  const { article } = useContent();
  
  return (
      <section id="article" className="py-8 bg-gray-50 w-full flex justify-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
         <div className="flex w-full flex-col md:flex-row justify-between items-start gap-4">
           <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-1 gap-y-4 md:gap-2 lg:gap-4">
            <div className="col-span-2 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{article.title}</h2>
              </div>
              <Link href="/article" className="text-[#CF4647] font-medium flex items-center hover:underline">
                Lihat Semua
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            {
              isLoading ?   Array.from({ length: 4 }).map((_, index) => <PageArticleSkeleton key={index} />) :
              data?.pages[0]?.data.length === 0 ? <div className="h-36 w-full col-span-2 xl:col-span-4  flex items-center justify-center"><p className="text-center">Tidak ada artikel</p></div> :
              data?.pages[0]?.data.map((item) => (
                <Link key={item.id} className="col-span-2 md:col-span-1" href={`/article/${item.slug}`}>
                    <motion.div
                      className="relative w-full aspect-[16/9] rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Image
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <motion.div
                        className="absolute inset-0 p-4 flex flex-col justify-between text-white bg-black rounded-lg"
                        initial={{ opacity: 0.6,  backgroundColor: 'rgba(0, 0, 0, 0.5)'  }}
                        whileHover={{ opacity: 0.8, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h3 className="text-xl text-white font-bold line-clamp-2">{item.title}</h3>
                          {item?.category?.name && (
                            <p className="text-sm mt-1 text-[#F7C873]">{item.category.name}</p>
                          )}
                        </motion.div>
                        <motion.p
                          className="text-sm"
                          initial={{ y: 10, opacity: 0.6 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          {item.published_at
                            ? new Date(item.published_at).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })
                            : 'Tanggal tidak tersedia'}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                </Link>
            ))}
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-1 gap-1 gap-y-4 md:gap-2 lg:gap-4">
            <ArtikelPopuler/>
          </div>
         </div>
        </div>
      </section> 
  )
}
