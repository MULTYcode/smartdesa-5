import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/id';
import { truncateWords } from '@/lib/utils';

interface PressReleaseCardProps {
  id: number
  title: string
  description: string
  date: string
  image: string
  slug: string
  author?: string
  category?: string
}

export const PressReleaseCard: React.FC<PressReleaseCardProps> = ({
  id,
  title,
  description,
  date,
  image,
  slug,
  author,
  category,
}) => {
  const formattedDate = moment(date ?? "").locale('id').format('dddd, D MMMM YYYY ')

  return (
    <Link key={id} href={`/press-release/${slug}`} tabIndex={1} className="col-span-6 md:col-span-3 lg:col-span-2 w-full">
      <div className="group transition duration-300 ease-in-out pe-2">
        <div className="relative w-full mb-4 aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-1 pe-6">
          <div className='flex flex-wrap items-center my-2 gap-x-2 gap-y-1 min-w-0'>
            {category && (
              <>
                <span className="self-center align-baseline text-sm font-semibold uppercase text-[#929AAB] shrink-0" title={category}>
                  {truncateWords(category, 2)}
                </span>
                <div className="self-center w-px h-3.5 bg-gray-400 shrink-0"></div>
              </>
            )}
            <span className="self-center align-baseline text-xs font-medium text-black dark:text-white shrink-0">{formattedDate}</span>
          </div>
          <h5 title={title} className="my-2 leading-5 text-lg font-bold line-clamp-3 tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p title={description} className="mb-3 font-normal text-sm line-clamp-3 leading-5 text-gray-500 lg:text-gray-800 dark:text-gray-400">{description}</p>
          {author && (
            <span className="text-xs font-medium text-gray-500">
              Oleh {author}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}