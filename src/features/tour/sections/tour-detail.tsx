"use client";
import { TourCard } from '@/components/common/tour-card'
import { useParams } from 'next/navigation';
import React from 'react'
import useTourDetail from '../hooks/useDetail';
import StreetViewChecker from '@/lib/checkStreetView';
import { Globe, Info, Landmark, Mail, MapIcon, MapPin } from 'lucide-react';
import Link from 'next/link';
import ArtikelPopuler from '@/features/article/components/artikelPopuler';

export default function TourDetail() {
    const { slug } = useParams();
    const { data } = useTourDetail({}, String(slug));
    const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
    const isStreetAvailable = StreetViewChecker({ lat: Number(data?.latitude), lng: Number(data?.longitude) });

    let mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${data?.latitude},${data?.longitude}`;
    if (isStreetAvailable) {
        mapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${data?.latitude},${data?.longitude}&heading=0&pitch=0`;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-8xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">

                {/* Kolom Kiri (TourCard + Info + Map) */}
                <div className="md:col-span-2 space-y-6">

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg">
                        {/* Kolom Gambar */}
                        <div className="w-full h-64 md:h-auto overflow-hidden rounded-xl">
                            <TourCard
                                key={data?.id}
                                id={data?.id}
                                excerpt={data?.slug ?? "Deskripsi tidak tersedia"}
                                image={data?.thumbnail ?? "/images/placeholder.svg"}
                                slug={data?.slug}
                                isDetail={true}
                            />
                        </div>

                        {/* Kolom Informasi */}
                        <div className="flex flex-col justify-center gap-4">
                            <div className="flex items-center gap-3">
                                <Landmark className="text-green-700 w-6 h-6 mt-1" />
                                <h2 className="text-xl font-bold text-gray-800">{data?.title}</h2>
                            </div>

                            <div className="flex items-center gap-3">
                                <Info className="text-green-700 w-6 h-6 mt-1" />
                                <p className="text-gray-600">{data?.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="text-green-700 w-6 h-6 mt-1" />
                                <p className="text-gray-600">{data?.title}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="text-green-700 w-6 h-6 mt-1" />
                                <p className="text-gray-600">{data?.link.email}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Globe className="text-green-700 w-6 h-6 mt-1" />
                                <Link href={data?.link.website ?? ""} target="_blank" className="text-blue-500 hover:underline">
                                    {data?.link.website}
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapIcon className="text-green-700 w-6 h-6 mt-1" />
                                <Link href={data?.link.gmap ?? ""} target="_blank" className="text-blue-500 hover:underline">
                                    {data?.link.gmap}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="relative w-full min-h-[300px] rounded-xl overflow-hidden">
                        {
                            !data?.latitude && !data?.longitude && !gmapsApiKey ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                    <p className="text-gray-500 dark:text-gray-400">Map location not available</p>
                                </div>
                            ) : (
                                <iframe
                                    src={mapsUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Map of ${data?.title}`}
                                    className="absolute inset-0"
                                />
                            )
                        }
                    </div>
                </div>

                {/* Kolom Kanan (Artikel Populer) */}
                <div className="w-full">
                    <ArtikelPopuler />
                </div>
            </div>
        </div>
    )
}
