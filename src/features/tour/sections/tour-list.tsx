"use client";
import { useState } from "react";
import { BiGlobe, BiMap, BiPlus } from "react-icons/bi";
import useTour from "../hooks/useList";
import Link from "next/link";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Refetch from "@/components/shared/refetch";
import useSetting from "@/hooks/useSettings";

export default function Home() {
  const [search, setSearch] = useState("");

  const {
    data: setting,
    isLoading: isSettingLoading,
    isFetching: isSettingFetching,
    refetch: refetchSetting,
    isError: isSettingError,
  } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
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

  return (
    <>
      {isSettingLoading ? (
        <div className="flex animate-pulse mb-4 col-span-8 w-full">
          <div className="h-52 w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>
      ) : isSettingError && !isSettingFetching ? (
        <div className="flex min-h-52 justify-center items-center mb-4 col-span-8 w-full">
          <Refetch refetch={refetchSetting} />
        </div>
      ) : (
        <section
          style={backgroundStyle}
          className={`relative flex justify-center py-8 rounded-md bg-cover bg-bottom w-full h-44 md:h-60 lg:h-80 items-end`}
        >
          <div className="absolute inset-0 bg-black/50 rounded-md"></div>
          <div className="z-10 w-full text-start px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white lg:text-6xl">
              {setting?.value?.title ?? "[Judul artikel belum diatur]"}
            </h2>
          </div>
        </section>
      )}
      <div className="w-full flex justify-center">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl my-10 grid grid-cols-3 lg:grid-cols-4 gap-y-6">
          <div className="bg-transparent rounded-s-md col-span-4 grid grid-cols-6">
            <div className="col-span-6 grid grid-cols-6 gap-8">
              <div className="col-span-6 grid grid-cols-6 gap-1 justify-between">
                <div className="col-span-6 text-end">
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="block py-3 px-5 pe-12 w-full rounded-sm text-sm text-gray-900 bg-gray-100 placeholder:text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Cari judul ..."
                    />
                    <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-white focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg
                        className="min-w-4 min-h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-6 grid grid-cols-6 md:gap-x-4 gap-y-6 justify-items-center">
                {isLoading || (allTour[0] === undefined && isFetching) ? (
                  <div className="col-span-6 grid grid-cols-12 w-full h-full justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col justify-center dark:bg-gray-800 animate-pulse"
                      >
                        <div className="relative rounded-4xl overflow-hidden min-h-[68vh] flex justify-center items-end bg-gray-300"></div>
                      </div>
                    ))}
                  </div>
                ) : !isError && !isFetching && allTour[0] === undefined ? (
                  <div className="flex col-span-6 w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                      <p className="text-black text-2xl dark:text-gray-400 text-center">
                        Wisata tidak tersedia
                      </p>
                    </div>
                  </div>
                ) : isError && !isFetching ? (
                  <div className="w-full col-span-6 h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                      <p className="text-black text-2xl dark:text-gray-400 text-center">
                        Terjadi kesalahan, silakan ulangi
                      </p>
                      <Refetch refetch={refetch} />
                    </div>
                  </div>
                ) : (
                  <>
                   <div className="grid grid-cols-12 col-span-6 gap-6 sm:w-full">
                    {allTour.map((card) => (
                      <Link
                        tabIndex={1}
                        href={`/tour/${card?.slug ?? ""}`}
                        key={card.id}
                        className="col-span-12 flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800 md:col-span-6 xl:col-span-4"
                      >
                        <div className="relative w-full sm:w-1/3 flex-shrink-0">
                          <Image
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src={card?.thumbnail || "/images/unavailable-image.png"}
                            alt="Tour Thumbnail"
                            width={200}
                            height={200}
                            style={{ height: "100%" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:text-2xl">
                              {card.title}
                            </h5>
                            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300 md:text-base">
                              {card?.description ?? "[Deskripsi tidak tersedia]"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            {card?.address && (
                              <div className="flex items-center gap-x-2">
                                <BiMap className="min-h-5 min-w-5 text-gray-500 dark:text-gray-300" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {card?.address ?? "[Alamat tidak tersedia]"}
                                </span>
                              </div>
                            )}
                            {card?.link?.website && (
                              <div className="flex items-center gap-x-2">
                                <BiGlobe className="min-h-5 min-w-5 text-gray-500 dark:text-gray-300" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {card?.link?.website}
                                </span>
                              </div>
                            )}
                            {card?.link?.email && (
                              <div className="flex items-center gap-x-2">
                                <CgMail className="min-h-5 min-w-5 text-gray-500 dark:text-gray-300" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  {card?.link?.email}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                    <div className="col-span-6">
                      <button
                        className="inline-flex items-center gap-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-transparent text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:text-gray-400 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 uppercase"
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetching}
                      >
                        Tampilkan lebih banyak
                        <BiPlus />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
