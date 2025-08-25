
"use client";
import { NewsSection } from "@/components/article/article-section";
import HeroWelcome from "@/components/hero/hero-welcome";
import SliderCard from "@/components/infografis/sliderInfografis";
import MenuCards from "@/components/menu/menu-cards";
import { SambutanSection } from "@/components/profile/components/sambutan-section";
import { TourSection } from "@/components/tour/tour-section";
import { useContent } from "@/hooks/useContent";
import Link from "next/link";
import { SetStateAction, useState } from "react";

export default function Home() {

  const { updatedInfoCards, cta, infoWellcome, infoProgram, about } = useContent();
    const [searchValue, setSearchValue] = useState('');
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchValue(e.target.value);
    };

  return (
    <main className="justify-center items-center min-h-screen flex flex-col">
      <HeroWelcome />
      <div className="flex w-full flex-col items-center gap-4 px-6 sm:px-0 py-4 ">
        <div className="relative w-full px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl  flex items-center rounded-xl border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700">
          <input
            id="search-dropdown"
            className="w-full rounded-xl border-none bg-transparent p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:focus:ring-0"
            placeholder="Apa yang Anda cari?"
            value={searchValue}
            onChange={handleChange}
            required
          />
          <Link
            href={searchValue ? `/search/${searchValue}` : "#"}
            className="flex items-center justify-center rounded-e-xl border-l border-gray-300 bg-gray-200 px-4 py-2.5 transition-colors hover:bg-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-300"
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
          </Link>
        </div>
      </div>
      <div className="flex py-4 justify-center items-start flex-col md:flex-row gap-4 px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
           <div className="w-full md:w-3/4">
            <MenuCards cards={updatedInfoCards} cta={cta} />
          </div>
          <div className="w-full md:w-1/4">
            <h2 className='text-lg uppercase font-bold mb-4'>Infografis</h2>
            <SliderCard slideToShow={1} />
          </div>
      </div>
      <SambutanSection data={{ wellcome: infoWellcome, program: infoProgram }} />
      <NewsSection />
      <TourSection  data={about}/>
    </main>
  )
}
