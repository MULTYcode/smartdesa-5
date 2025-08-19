"use client";
import { useParams } from 'next/navigation';
import React from 'react'
import useTourDetail from '../hooks/useDetail';
import StreetViewChecker from '@/lib/checkStreetView';
import AsideContent from '@/components/template/simple/layout/aside-content';
import { BiGlobe } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';
import Image from 'next/image';
import { MapIcon, MapPin } from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <AsideContent>
                    <div className="pr-0 lg:pr-6">
                        <div className="relative overflow-hidden mb-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                            <div className="relative z-10">
                                <h1 className="text-4xl font-bold mb-4 leading-tight">
                                    {data?.title}
                                </h1>
                                <div className="flex items-center gap-2 text-md opacity-90">
                                    <MapPin className="min-w-3 min-h-3" />
                                    <span>{data?.address}</span>
                                </div>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                              <div className="relative group lg:col-span-3">
                                    <div className="absolute -inset-1 bg-gradient-to-r rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
                                        <Image
                                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            src={data?.thumbnail || "/placeholder.svg"}
                                            alt="Tour Thumbnail"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </div>
                         </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                        <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                                        Tentang Wisata
                                    </h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                        {data?.description}
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-1 space-y-6">
                                {/* Quick Info Card */}
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Informasi</h3>
                                    <div className="space-y-4">
                                        {data?.link?.gmap && (
                                            <a href={data?.link?.gmap} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300">
                                                <MapIcon className="min-w-4 min-h-4 text-blue-600 dark:text-blue-400" />
                                                <span className="text-gray-900 dark:text-white font-medium">Lihat Lokasi</span>
                                            </a>
                                        )}
                                        {data?.link?.website && (
                                            <a href={`https://${data?.link.website}`} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300">
                                                <BiGlobe className="min-w-4 min-h-4 text-green-600 dark:text-green-400" />
                                                <span className="text-gray-900 dark:text-white font-medium">{data?.link?.website}</span>
                                            </a>
                                        )}
                                        {data?.link?.email && (
                                            <a href={`mailto:${data?.link?.email}`} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 transition-all duration-300">
                                                <CgMail className="min-w-4 min-h-4 text-red-600 dark:text-red-400" />
                                                <span className="text-gray-900 dark:text-white font-medium">Email Kontak</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="mt-12">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></span>
                                    Lokasi di Peta
                                </h2>
                                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                                    {
                                        !data?.latitude && !data?.longitude && !gmapsApiKey ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                                <div className="text-center">
                                                    <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                    <p className="text-gray-500 dark:text-gray-400">Peta tidak tersedia</p>
                                                </div>
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
                        </div>
                    </div>
                </AsideContent>
            </div>
        </div>
    )
}
