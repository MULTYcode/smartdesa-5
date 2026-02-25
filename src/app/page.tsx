
"use client";
import { NewsSection } from "@/components/article/article-section";
import HeroWelcome from "@/components/hero/hero-welcome";
import { InfografisSection } from "@/components/infografis/infografis-home";
import DynamicInstagramFeed from "@/components/instagram/DynamicInstagramFeed";
import MenuCards from "@/components/menu/menu-cards";
import { SambutanSection } from "@/components/profile/components/sambutan-section";
import { TourSection } from "@/components/tour/tour-section";
import { useContent } from "@/hooks/useContent";
import useFeatureFlags, { type SectionKey } from "@/hooks/useFeatureFlags";
import Link from "next/link";
import { SetStateAction, useState } from "react";

const SECTION_COMPONENTS: Record<SectionKey, React.ComponentType<any>> = {
  dynamic_section: SambutanSection,
  service: MenuCards,
  news: NewsSection,
  instagram: DynamicInstagramFeed,
  infografis: InfografisSection,
  tour: TourSection,
};

const FALLBACK_ORDER: SectionKey[] = [
  "instagram",
  "service",
  "infografis",
  "dynamic_section",
  "news",
  "tour",
];

export default function Home() {
  const { about } = useContent();
  const { sectionsOrder, isLoading: isFeaturesLoading, isError: isFeaturesError, isSectionEnabled } = useFeatureFlags();
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchValue(e.target.value);
  };

  const renderSections = (() => {
    if (isFeaturesLoading || isFeaturesError || sectionsOrder.length === 0) {
      return FALLBACK_ORDER.map((key) => ({ key, enabled: true, order: 0 }));
    }
    return sectionsOrder.filter((s) => s.enabled);
  })();

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
      {renderSections.map((section) => {
        const Component = SECTION_COMPONENTS[section.key];
        if (!Component) return null;
        if (section.key === "tour") {
          return <Component key={section.key} data={about} />;
        }
        return <Component key={section.key} />;
      })}
    </main>
  )
}
