"use client"
import React from 'react'
import Image from 'next/image'
import useArticle from '@/features/article/hooks/useArticle'
import Link from 'next/link'
import ArticlePopulerSkeleton from '@/components/common/skeleton/ArticlePopulerSkeleton'

export default function ArtikelPopuler() {
    const { data, isLoading } = useArticle({ "page_size": 6 , 'order': 'desc', 'by':'views'});

    if (isLoading) return <ArticlePopulerSkeleton />;

    return (
        <div className='w-full'>
            <h2 className='text-base sm:text-lg uppercase font-bold mb-3 sm:mb-4'>Berita Populer</h2>
            <ul className='space-y-3 sm:space-y-4'>
                {
                    !data?.pages[0] || data?.pages[0]?.data.length === 0 ? (
                        <div className='h-48 sm:h-72 w-full flex items-center justify-start'>
                            <p className='text-sm sm:text-base text-gray-500'>Tidak ada artikel</p>
                        </div>
                    ) : (
                        data?.pages[0]?.data.map((item) => (
                            <Link key={item.id} href={`/article/${item.slug}`}>
                                <li className="flex my-2 sm:my-4 gap-2 sm:gap-3 md:gap-4 items-start">
                                    {/* Thumbnail Container */}
                                    <div className="flex-shrink-0 w-20 sm:w-28 md:w-32 lg:w-36 relative group">
                                        <div className="aspect-[16/10] relative overflow-hidden rounded-sm">
                                            <Image
                                                className="object-cover w-full h-full"
                                                src={item.thumbnail || ""}
                                                alt="Article Thumbnail"
                                                fill
                                                sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
                                                priority 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                                        </div>
                                    </div>
                                    {/* Title */}
                                    <h5 className="text-xs sm:text-sm md:text-base leading-tight sm:leading-snug line-clamp-3 sm:line-clamp-4 font-normal hover:text-[#CF4647] transition-colors duration-200 flex-1">
                                        {item.title}
                                    </h5>
                                </li>
                            </Link>
                        ))
                    )
                }                
            </ul>
        </div>
    )
}