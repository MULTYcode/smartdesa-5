"use client"
import { PressReleaseCard } from '@/components/shared/PressReleaseCard'
import React, { useEffect, useState } from 'react'
import SelectCategory from '@/components/shared/selectCategory'
import CustomDatePicker from '@/components/shared/DatePicker'
import usePressRelease from '@/features/press-release/hooks/usePressRelease'
import { PressReleaseType } from '@/features/press-release/types/pressRelease.type'
import { useRouter } from 'next/navigation'
import useFeatureFlags from '@/hooks/useFeatureFlags'
import useSetting from '@/hooks/useSettings'
import { BiPlus } from 'react-icons/bi'
import { Search } from 'lucide-react'

export default function PressReleaseListPage() {
  const router = useRouter();
  const { pressRelease, isLoading: isFeaturesLoading } = useFeatureFlags();

  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setRangeDate] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = usePressRelease({
    page: 1,
    page_size: 9,
    search: searchTerm,
    date: dateRange,
    sortBy: 'publishedAt',
  }, categoryId)

  const { data: setting } = useSetting(`press-release-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const pressReleaseData = data?.pages.flatMap((page) => page?.data) ?? []

  useEffect(() => {
    if (!isFeaturesLoading && !pressRelease) {
      router.replace('/');
    }
  }, [pressRelease, isFeaturesLoading, router]);

  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CF4647]"></div>
      </div>
    );
  }

  if (!pressRelease) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full flex justify-center py-6 sm:py-8 md:py-10">
        <div className="w-full px-4 sm:px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-5 sm:gap-6">

          {/* Search */}
          <div className="relative w-full">
            <input
              id="search-press-release"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full py-3 sm:py-3.5 px-4 sm:px-5 pe-12 rounded-xl text-sm sm:text-base text-gray-900 bg-gray-50 placeholder:text-gray-400 border border-gray-200 focus:ring-2 focus:ring-[#F7C873] focus:border-[#F7C873] transition-all duration-300"
              placeholder="Cari siaran pers..."
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <SelectCategory setCategoryId={setCategoryId} />
            <CustomDatePicker setDate={setRangeDate} />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {isLoading || (!data || !data.pages[0] || data.pages[0]?.data.length === 0) && isFetching ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse w-full">
                  <div className="h-48 sm:h-56 md:h-64 w-full rounded-xl bg-gray-100"></div>
                </div>
              ))
            ) : !isFetching && (pressReleaseData.length === 0 || pressReleaseData[0] === undefined) ? (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center">
                <div className="flex min-h-60 sm:min-h-72 flex-col items-center justify-center gap-3 text-center px-4">
                  <div className="bg-gray-50 p-4 rounded-full">
                    <Search className="w-7 h-7 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-base sm:text-lg">Siaran pers tidak tersedia</p>
                </div>
              </div>
            ) : (
              <>
                {pressReleaseData.map((item: PressReleaseType) => (
                  <div tabIndex={1} key={item.id} className="w-full">
                    <PressReleaseCard
                      id={item.id}
                      category={item.category?.name}
                      title={item.title}
                      description={item.description}
                      date={item.published_at}
                      image={item.thumbnail ?? '/images/placeholder.svg'}
                      slug={item.slug}
                      author={item.user?.name}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Load More */}
          {hasNextPage && !isFetchingNextPage && (
            <div className="flex justify-center pt-2">
              <button
                className="inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold text-[#2A363B] border border-[#2A363B]/20 rounded-lg hover:bg-[#2A363B] hover:text-white transition-all duration-300 uppercase tracking-wide"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetching}
              >
                Tampilkan lebih banyak
                <BiPlus className="w-4 h-4" />
              </button>
            </div>
          )}

          {isFetchingNextPage && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#CF4647]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
