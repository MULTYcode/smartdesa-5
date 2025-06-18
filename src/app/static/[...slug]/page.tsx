'use client'

import RichTextContent from '@/components/common/RichTextContent';
import ArtikelPopuler from '@/features/article/components/artikelPopuler';
import StaticPageSkeleton from '@/components/common/skeleton/StaticPageSkeleton';
import useStaticPage from '@/hooks/useStaticPage';
import React, { use } from 'react';

interface PageProps {
    params: Promise<{ slug?: string }>;
}

export const dynamic = 'force-dynamic';

export default function PageStatic({ params }: PageProps) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug ?? '';
    const { data, isLoading, isError } = useStaticPage({}, slug || "");

    if (isLoading) return <StaticPageSkeleton />;

    if (isError) return <p>Page Not Found</p>;

    return (
        <div className="container mx-auto px-4 flex justify-between mb-10 mt-10">
            <div className="container mx-auto px-4 py-8 max-w-8xl mt-10">
                <div className='box-border flex flex-wrap mx-auto justify-between'>
                    <div className='w-full md:w-1.5/5 lg:w-3/5'>
                        <RichTextContent content={data?.content || ''} />
                    </div>
                    <div className='w-full md:w-1/5 lg:w-1/5'>
                        <ArtikelPopuler />
                    </div>
                </div>
            </div>
        </div>
    );
}
