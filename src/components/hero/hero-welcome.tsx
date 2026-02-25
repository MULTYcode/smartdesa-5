"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/useContent"

export default function HeroWelcome() {
    const { hero } = useContent();

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75
        }
    }, [])

    const isVideo = (url: string | undefined | null): boolean => {
        if (!url) return false;
        return url.toLowerCase().endsWith(".mp4");
    }

    const hasTextContent = !!(hero?.title || hero?.description);

    if (hasTextContent) {
        return (
            <section className="relative w-full h-screen sm:min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gray-900">
                    {isClient && hero?.image && (
                        <>
                            {isVideo(hero.image) ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    <source src={hero.image} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={hero.image}
                                    alt={hero?.title || "Hero background"}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </>
                    )}
                    
                    {(!isClient || !hero?.image) && (
                        <div className="w-full h-full bg-gray-800" />
                    )}
                    <div className="absolute inset-0 bg-black/50 z-10" />
                </div>

                <div className="relative z-20 px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative max-w-7xl mx-auto"
                    >
                        <div className="px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-center text-white mb-12">
                            {hero?.title && (
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="text-xl sm:text-3xl md:text-5xl font-bold mb-4 text-center text-white drop-shadow-lg"
                                >
                                    {hero.title}
                                </motion.h1>
                            )}

                            {hero?.description && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                    className="text-sm sm:text-lg md:text-xl mb-6 text-center text-white max-w-3xl mx-auto drop-shadow-md"
                                >
                                    {hero.description}
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full bg-gray-50">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative w-full">
                {isClient && hero?.image ? (
                    <>
                        {isVideo(hero.image) ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-auto block"
                            >
                                <source src={hero.image} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={hero.image}
                                alt="Hero background"
                                className="w-full h-auto block"
                            />
                        )}
                    </>
                ) : (
                    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-gray-200" />
                )}
            </div>
        </section>
    )
}
