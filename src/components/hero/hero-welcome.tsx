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

    return (
        <section className="relative w-full min-h-[40rem] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                {isClient && hero.image.endsWith(".mp4") && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute w-full h-full object-cover"
                    >
                        <source src={hero.image} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>

            <div className="px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full relative z-20 container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative max-w-7xl mx-auto"
                >
                    <div className="px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-cente text-white mb-12">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-3xl md:text-5xl font-bold mb-4 text-center text-white"
                        >
                            {hero.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-lg md:text-xl mb-6 text-center text-whitex max-w-3xl mx-auto"
                        >
                            {hero.description}
                        </motion.p>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
