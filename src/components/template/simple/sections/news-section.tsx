import Link from "next/link"
import { NewsCard } from "@/components/common/news-card"
import { ChevronRight } from "lucide-react"
import useArticle from "@/features/article/hooks/useArticle";

export function NewsSection() {
  const { data } = useArticle({ "page_size": 6 });

  return (
    <section id="article" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Berita Terbaru</h2>
            <p className="text-gray-600">Informasi dan berita terkini dari Desa</p>
          </div>
          <Link href="/article" className="text-[#0d6b3f] font-medium flex items-center hover:underline">
            Lihat Semua
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {data?.pages[0].data.slice(0, 6).map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              // excerpt={item.excerpt}
              date={item.published_at ?? Date.now().toString()}
              // readTime={item.readTime}
              image={item.thumbnail ?? "/images/placeholder.svg"}
              slug={item.slug}              
              category={item.category?.name}
              showCategory={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
