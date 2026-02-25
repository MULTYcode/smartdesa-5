'use client'

import { use, useState } from "react";
import Refetch from "@/components/shared/refetch";
import useTour from "@/features/tour/hooks/useList";
import useInfografis from "@/features/infografis/hooks/useInfografies";
import { Infografis } from "@/types/type";
import Link from "next/link";
import LightboxImage from "@/components/infografis/Lightbox";
import useArticle from "@/features/article/hooks/useArticle";
import useFeatureFlags from "@/hooks/useFeatureFlags";
import { Search, FileText, Image as ImageIcon, MapPin } from "lucide-react";

interface DynamicPageProps {
    params: { search?: string };
}

interface PageProps {
    params: Promise<{ search?: string }>;
}

interface SearchResultItem {
    id: string | number;
    type: "article" | "infografis" | "tour";
    title: string;
    description?: string;
    href?: string;
    onClick?: () => void;
}

function TypeBadge({ type }: { type: "article" | "infografis" | "tour" }) {
    const config = {
        article: { label: "Artikel", icon: FileText, color: "bg-[#CF4647]/10 text-[#CF4647]" },
        infografis: { label: "Infografis", icon: ImageIcon, color: "bg-[#F7C873]/20 text-[#2A363B]" },
        tour: { label: "Wisata", icon: MapPin, color: "bg-[#2A363B]/10 text-[#2A363B]" },
    };
    const { label, icon: Icon, color } = config[type];
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    );
}

export default function Home({ params }: DynamicPageProps & PageProps) {
    const unwrappedParams = use(params);
    const [searchValue, setSearchValue] = useState(unwrappedParams.search || '');
    const { isSectionEnabled } = useFeatureFlags();
    const isTourEnabled = isSectionEnabled("tour");

    const { data: articles, isLoading: isArticleLoading, isFetching: isArticleFetching, refetch: refetchArticle, isError: isArticleError } = useArticle({ "search": searchValue, "page_size": 6 });
    const { data: tour, isLoading: isTourLoading, isFetching: isTourFetching, refetch: refetchTour, isError: isTourError } = useTour({ "search": searchValue });
    const { data: infografis, isLoading: isInfografisLoading, isFetching: isInfografisFetching, refetch: refetchInfografis, isError: isInfografisError } = useInfografis({ "search": searchValue });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const isLoading = isArticleLoading || isInfografisLoading || (isTourEnabled && isTourLoading);
    const isFetching = isArticleFetching || isInfografisFetching || (isTourEnabled && isTourFetching);
    const hasAnyError = isArticleError || isInfografisError || (isTourEnabled && isTourError);

    const results: SearchResultItem[] = [];

    if (articles?.pages?.[0]?.data) {
        articles.pages[0].data.forEach((article: any) => {
            results.push({
                id: `article-${article.id}`,
                type: "article",
                title: article.title,
                description: article.description,
                href: `/article/${article.slug}`,
            });
        });
    }

    if (infografis && Array.isArray(infografis)) {
        infografis.forEach((item: Infografis, index: number) => {
            results.push({
                id: `infografis-${item.id}`,
                type: "infografis",
                title: item.title,
                description: item.description,
                onClick: () => { setIsOpen(true); setCurrentIndex(index); },
            });
        });
    }

    if (isTourEnabled && tour?.pages?.[0]?.data) {
        tour.pages[0].data.forEach((item: any) => {
            results.push({
                id: `tour-${item.id}`,
                type: "tour",
                title: item.title,
                description: item.description,
                href: `/tour/${item.slug}`,
            });
        });
    }

    const totalResults = results.length;

    return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center w-full">
                <div className="py-8 md:py-12 w-full px-4 sm:px-6 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-6">

                    <div className="relative w-full">
                        <input
                            id="search-input"
                            type="search"
                            value={searchValue}
                            onChange={handleChange}
                            className="block w-full py-3.5 sm:py-4 px-5 pe-12 rounded-xl text-sm sm:text-base text-gray-900 bg-gray-50 placeholder:text-gray-400 border border-gray-200 focus:ring-2 focus:ring-[#F7C873] focus:border-[#F7C873] transition-all duration-300"
                            placeholder="Cari artikel, infografis, atau wisata..."
                        />
                        <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {!isLoading && !isFetching && (
                        <p className="text-xs sm:text-sm text-gray-500">
                            {totalResults > 0
                                ? `Ditemukan ${totalResults} hasil untuk "${searchValue}"`
                                : searchValue
                                    ? `Tidak ada hasil untuk "${searchValue}"`
                                    : "Mulai mengetik untuk mencari..."
                            }
                        </p>
                    )}

                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden min-h-[300px]">
                        <div className="divide-y divide-gray-100">
                            {isLoading || (isFetching && results.length === 0) ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="p-4 sm:p-5 animate-pulse flex flex-col gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                                            <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                                    </div>
                                ))
                            ) : hasAnyError && results.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-4">
                                    <p className="text-gray-500 text-base sm:text-lg">Gagal memuat hasil pencarian.</p>
                                    <Refetch refetch={() => { refetchArticle(); refetchInfografis(); if (isTourEnabled) refetchTour(); }} />
                                </div>
                            ) : results.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-4 text-center px-4">
                                    <div className="bg-gray-50 p-4 rounded-full">
                                        <Search className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300" />
                                    </div>
                                    <div className="max-w-xs">
                                        <h3 className="text-gray-900 font-medium text-sm sm:text-base mb-1">Tidak ada hasil ditemukan</h3>
                                        <p className="text-gray-400 text-xs sm:text-sm">Coba kata kunci lain atau periksa ejaan Anda.</p>
                                    </div>
                                </div>
                            ) : (
                                results.map((item) => {
                                    const content = (
                                        <div className="p-4 sm:p-5 hover:bg-gray-50 transition-colors duration-200 group cursor-pointer">
                                            <div className="flex items-center gap-2.5 mb-1.5">
                                                <TypeBadge type={item.type} />
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#CF4647] transition-colors line-clamp-1">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            {item.description && (
                                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    );

                                    if (item.href) {
                                        return <Link key={item.id} href={item.href}>{content}</Link>;
                                    }
                                    return <div key={item.id} onClick={item.onClick} role="button" tabIndex={0}>{content}</div>;
                                })
                            )}
                        </div>
                    </div>

                    {infografis && Array.isArray(infografis) && infografis.length > 0 && (
                        <LightboxImage data={infografis} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
                    )}
                </div>
            </div>
        </div>
    );
}
