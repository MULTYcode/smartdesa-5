"use client"
import React from 'react'
import useTour from '../hooks/useList';
import { TourCard } from '@/components/common/tour-card';
import ArtikelPopuler from '@/features/article/components/artikelPopuler';

export default function TourList() {

  const { data } = useTour({ "search": '', 'page_size': 6 });
  const allTour = data?.pages?.flatMap(page => page?.data) || [];


  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      <div className='box-border flex flex-wrap gap-5 justify-between mt-20'>
        <div className='w-full md:w-1/5 lg:w-3/5'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allTour.map((item) => (
              <TourCard
                key={item.id}
                id={item.id}
                title={item.title}
                // excerpt={item.excerpt}
                date={item.published_at ?? Date.now().toString()}
                // readTime={item.readTime}
                image={item.thumbnail ?? "/images/placeholder.svg"}
                slug={item.slug}
              />
            ))}
          </div>
        </div>
        <div className='w-full md:w-1/5 lg:w-1/5'>
          <ArtikelPopuler />
        </div>
      </div>
    </div>
  )
}