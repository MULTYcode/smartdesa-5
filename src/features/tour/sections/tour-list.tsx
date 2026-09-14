"use client";
import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import useTour from "../hooks/useList";
import Refetch from "@/components/shared/refetch";
import useSetting from "@/hooks/useSettings";
import { useRouter } from "next/navigation";
import useFeatureFlags from "@/hooks/useFeatureFlags";
import { TourCard } from "@/components/common/tour-card";
import { getEnv } from "@/lib/get-runtime-env";

export default function Home() {
  const router = useRouter();
  const { isSectionEnabled, isLoading: isFeaturesLoading } = useFeatureFlags();
  const isTourEnabled = isSectionEnabled("tour");

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isFeaturesLoading && !isTourEnabled) {
      router.replace("/");
    }
  }, [isTourEnabled, isFeaturesLoading, router]);

  const {
    data: setting,
    isLoading: isSettingLoading,
    isFetching: isSettingFetching,
    refetch: refetchSetting,
    isError: isSettingError,
  } = useSetting(`tour-${getEnv('NEXT_PUBLIC_VILLAGE_ID')}`, {});

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    isError,
  } = useTour({ search: search, page_size: 6 });

  const allTour = data?.pages?.flatMap((page) => page?.data) || [];

  const backgroundStyle = setting?.value?.imageUrl
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)` };

  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CF4647]"></div>
      </div>
    );
  }

  if (!isTourEnabled) {
    return null;
  }

  return (
    <>
      {isSettingLoading ? (
        <div className="flex animate-pulse mb-4 w-full">
          <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>
      ) : isSettingError && !isSettingFetching ? (
        <div className="flex min-h-52 justify-center items-center mb-4 w-full">
          <Refetch refetch={refetchSetting} />
        </div>
      ) : (
        <section
          style={backgroundStyle}
          className="relative flex justify-center py-8 rounded-md bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 items-end"
        >
          <div className="absolute inset-0 bg-black/50 rounded-md"></div>
          <div className="z-10 w-full text-start px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <h2 title={setting?.value?.title ?? ""} className="text-3xl md:text-5xl font-bold text-white lg:text-6xl">
              {setting?.value?.title ?? "[Judul artikel belum diatur]"}
            </h2>
          </div>
        </section>
      )}

      <div className="w-full flex justify-center py-10">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-center">

          {/* Search Input Bar */}
          <div className="w-full mb-8">
            <div className="relative w-full max-w-md ms-auto">
              <input
                type="search"
                id="search-dropdown"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block py-3 px-5 pe-12 w-full rounded-full text-sm text-gray-900 bg-white dark:bg-gray-800 placeholder:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-[#CF4647]/30 focus:border-[#CF4647] outline-none transition-all"
                placeholder="Cari wisata ..."
              />
              <span className="absolute top-0 end-0 py-3 px-4 text-sm font-medium h-full text-gray-400 flex items-center">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Tour Cards Grid */}
          {isLoading || (allTour[0] === undefined && isFetching) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-80 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          ) : !isError && !isFetching && allTour[0] === undefined ? (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-lg dark:text-gray-400">
                Wisata tidak tersedia
              </p>
            </div>
          ) : isError && !isFetching ? (
            <div className="py-16 text-center flex flex-col items-center gap-3">
              <p className="text-gray-500 text-lg dark:text-gray-400">
                Terjadi kesalahan, silakan ulangi
              </p>
              <Refetch refetch={refetch} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {allTour.map((card) => (
                  <TourCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card?.description}
                    thumbnail={card?.thumbnail}
                    slug={card?.slug}
                    address={card?.address}
                    website={card?.link?.website}
                    email={card?.link?.email}
                  />
                ))}
              </div>

              {hasNextPage && (
                <div className="mt-10 text-center">
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
            </>
          )}

        </div>
      </div>
    </>
  );
}
