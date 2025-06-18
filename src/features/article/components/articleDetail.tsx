"use client"

import React from 'react'
import { NewsCard } from '@/components/common/news-card';
import ArtikelIklan from './artikelIklan';
import ArtikelPopuler from './artikelPopuler';
import { ArticleType } from '../types/article.type';

interface ArticleDetailProps {
    slug: string;
    article: ArticleType;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ slug, article }) => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-8xl mt-20">
            <div className='box-border flex flex-wrap gap-5 justify-between'>
                <div className='w-full md:w-1/5 lg:w-3/5'>
                    <NewsCard
                        key={article?.id}
                        id={article?.id}
                        title={slug ?? "Artikel Tidak Ditemukan"}
                        // excerpt={item.excerpt}
                        date={article?.published_at ?? ""}
                        readTime={article?.views?.toString() ?? "0"}
                        image={article?.thumbnail ?? "/images/placeholder.svg"}
                        slug={article?.slug}
                        isDetail={true}
                        content={article?.content || ''}
                        category={article?.category?.name || 'Umum'}
                        author={article?.user?.name || 'Admin'}
                    />
                </div>

                <div className='w-full md:w-1/5 lg:w-1/5'>
                    <ArtikelPopuler />
                </div>

                <ArtikelIklan />

            </div>
        </div>
    );
};

export default ArticleDetail;