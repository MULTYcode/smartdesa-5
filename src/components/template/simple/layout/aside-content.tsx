"use client";

import type React from "react";
import useArticle from "@/features/article/hooks/useArticle";
import Image from "next/image";
import SliderCard from "@/components/infografis/sliderInfografis";
import Link from "next/link";
import Refetch from "@/components/shared/refetch";

export default function AsideContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: articles,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useArticle({ page_size: 5, order: "desc", by: "views" });

  return (
    <div className="flex flex-col items-stretch py-4 sm:py-6 md:py-8 md:flex-row w-full gap-4 md:gap-0">
      <main className="flex-1 min-w-0">
        <div className="space-y-4 sm:space-y-6">
          <div>{children}</div>
        </div>
      </main>
      <aside className="w-full md:w-64 lg:w-80 xl:w-96 md:sticky md:top-28 md:self-start h-fit mt-6 md:mt-0 pl-0 md:pl-4 lg:pl-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-300 md:border-l">
        <div className="space-y-6 sm:space-y-8">
          {/* Artikel Populer Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#CF4647] mb-3 sm:mb-4 pb-2 border-gray-300 border-b">
              Artikel Populer
            </h2>
            <ul className="space-y-4 sm:space-y-6">
              {isLoading ||
              ((!articles ||
                !articles.pages[0] ||
                articles.pages[0]?.data.length === 0) &&
                isFetching) ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className="flex animate-pulse gap-2 sm:gap-3">
                    {/* Skeleton Thumbnail */}
                    <div className="flex-shrink-0 w-20 sm:w-24 md:w-20 lg:w-24 relative">
                      <div className="aspect-[16/10] rounded-sm bg-gray-200"></div>
                    </div>
                    {/* Skeleton Text */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      <div className="h-3 sm:h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 sm:h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                  </li>
                ))
              ) : !isError &&
                !isFetching &&
                (!articles ||
                  !articles.pages[0] ||
                  articles.pages[0]?.data.length === 0) ? (
                <div className="flex min-h-40 sm:min-h-52 mb-4 justify-center items-center w-full">
                  <p className="text-gray-500 text-center text-sm sm:text-base">
                    Artikel tidak tersedia
                  </p>
                </div>
              ) : isError && !isFetching ? (
                <div className="flex min-h-40 sm:min-h-52 justify-center items-center mb-4 w-full">
                  <Refetch refetch={refetch} />
                </div>
              ) : (
                articles?.pages[0].data.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <li className="flex gap-2 sm:gap-3 items-start group mb-2">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-20 sm:w-24 md:w-20 lg:w-24 relative">
                        <div className="aspect-[16/10] relative overflow-hidden rounded-sm shadow-sm">
                          <Image
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            src={article.thumbnail || ""}
                            alt="Article Thumbnail"
                            fill
                            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 80px, 96px"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                        </div>
                      </div>
                      {/* Article Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-start">
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-1">
                          <span className="text-xs sm:text-sm text-[#CF4647] font-medium">
                            {article.category.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {article.published_at}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#CF4647] transition-colors duration-200 line-clamp-2 sm:line-clamp-3 md:line-clamp-2 leading-tight sm:leading-snug">
                          {article.title}
                        </h5>
                      </div>
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </div>
          
          {/* Infografis Section */}
          <div>
            <div className="relative">
              <SliderCard slideToShow={1} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
