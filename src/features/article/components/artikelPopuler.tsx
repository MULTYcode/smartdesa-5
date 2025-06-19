"use client"
import { CustomCard } from '@/components/ui/simple/CustomCard'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArticlePopulerSkeleton from '@/components/common/skeleton/ArticlePopulerSkeleton'
import useArticle from '../hooks/useArticle'

export default function ArtikelPopuler() {
    const { data } = useArticle();

    return (
        data?.pages[0]?.data.length === 0 ? <ArticlePopulerSkeleton /> :
            <div className='w-full'>
                <h2 className='text-xl font-bold mb-4'>Artikel Populer</h2>
                <ul className='space-y-4'>
                    {data?.pages[0].data.slice(0, 3).map((item) => (
                        <CustomCard key={item.id} className='shadow-sm hover:shadow-md transition-shadow'>
                            <div className='relative w-full h-36 rounded overflow-hidden'>
                                <Image
                                    src={item.thumbnail ?? "/images/placeholder.svg"}
                                    alt='thumbnail'
                                    fill
                                    className='object-cover'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <Link href={`/article/${item.slug}`} className='font-medium mt-2 block hover:text-[#0d6b3f]'>
                                {item.title}
                            </Link>
                        </CustomCard>
                    ))}
                </ul>
            </div>
    )
}
