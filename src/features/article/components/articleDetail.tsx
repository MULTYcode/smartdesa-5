"use client"

import React from 'react'
import { ArticleType } from '../types/article.type';
import AsideContent from '@/components/template/simple/layout/aside-content';
import RichTextContent from '@/components/common/RichTextContent';
import Image from 'next/image';
import { Calendar, Eye } from 'lucide-react';

interface ArticleDetailProps {
    slug: string;
    article: ArticleType;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    return (
        <AsideContent>
            <div className="pr-3">
            <div className='w-full col-span-12 md:col-span-7 lg:col-span-8 gap-y-8'>
                        <h3 className={`font-normal text-4xl text-gray-800 transition-colors`}>{article?.title ?? "Artikel Tidak Ditemukan"} </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 my-4 min-w-0">
                            <span className="font-semibold text-red-500 text-xs shrink-0">[{article?.category?.name || 'Umum'}]</span>
                            <span className="text-gray-300 select-none shrink-0">•</span>
                            <div className="flex items-center shrink-0">
                                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{article?.published_at ?? ""}</span>
                            </div>
                            <span className="text-gray-300 select-none shrink-0">•</span>
                            <div className="flex items-center shrink-0">
                                <Eye className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{article?.views?.toString() ?? "0"}</span>
                            </div>
                        </div>
                       <div className="relative w-full mb-4 aspect-[16/9]">
                            <Image
                                src={article?.thumbnail ?? "/images/placeholder.svg"}
                                alt={article?.title ?? "Artikel Tidak Ditemukan"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                         </div>
                        <RichTextContent content={article?.content || ''}/>
                        <p className="self-start align-baseline text-base font-semibold text-black my-5">({article?.user?.name || 'Admin'})</p>
                    </div>
        </div>
        </AsideContent>
    );
};

export default ArticleDetail;