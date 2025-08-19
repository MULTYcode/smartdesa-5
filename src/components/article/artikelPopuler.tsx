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
            <h2 className='text-lg uppercase font-bold mb-4'>Berita Populer</h2>
            <ul className='space-y-4'>
                {data?.pages[0]?.data.map((item) => (
                    <Link key={item.id} href={`/article/${item.slug}`}>
                      <li className="flex my-4">
                        <div className="max-w-40 mr-4 md:mr-0 min-w-40 md:max-w-32 md:min-w-32 w-full relative group">
                            <Image
                                className="max-w-40 md:max-w-28 max-h-20 h-full w-full shadow-lg object-cover"
                                src={item.thumbnail || ""}
                                alt="Article Thumbnail"
                                width={1200}
                                height={720}
                                priority 
                                />
                            <div className="absolute w-40 md:w-28  inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                        </div>
                        <h5 className="text-sm line-clamp-4 font-normal hover:text-[#CF4647]">
                          {item.title}
                        </h5>
                      </li>
                    </Link>
                ))}                
            </ul>
        </div>
    )
}