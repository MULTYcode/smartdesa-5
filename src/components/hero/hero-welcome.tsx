"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"
import Image from "next/image"
import { useContent } from "@/hooks/useContent"
import RichTextContent from "../common/RichTextContent"

export default function HeroWelcome() {
    const { header, infoWellcome, hero } = useContent();

    const [isExpanded, setIsExpanded] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75
        }
    }, [])

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-green-950/50 z-10" />
                <video ref={videoRef} autoPlay muted loop playsInline className="absolute w-full h-full object-cover">
                    <source src={hero.image ?? '/images/placeholder.svg'} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative max-w-7xl mx-auto"
                >
                    {/* Hero Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex justify-center mb-8"
                        >
                            <div className="mt-10 h-20 w-20 rounded-full bg-green-700/80 backdrop-blur-sm flex items-center justify-center border-2 border-green-300/30">
                                <Leaf className="h-10 w-10 text-green-100" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-100 mb-4"
                        >
                            Selamat datang di desa {header.regionEntity}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-xl md:text-2xl text-green-200 max-w-3xl mx-auto"
                        >
                            {header.regionDescription}
                        </motion.p>
                    </div>

                    {/* Welcome Speech Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="bg-gradient-to-r from-green-900/30 via-green-800/40 to-green-900/30 backdrop-blur-md rounded-2xl border border-green-300/20 shadow-2xl p-8 md:p-12"
                    >
                        <h2 className="text-center text-2xl md:text-3xl font-serif italic text-green-100 mb-8">
                            Kata sambutan dari kepala desa {header.regionEntity}
                        </h2>

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                            {/* Welcome Speech Text */}
                            <div className="flex-1 relative">
                                <div className="absolute -left-6 -top-6 text-7xl text-green-300/30 font-serif">&quot;</div>

                                <div
                                    className={`text-green-100 font-light leading-relaxed text-lg ${isExpanded ? "" : "line-clamp-6 lg:line-clamp-10"
                                        }`}
                                >
                                    <RichTextContent
                                        content={infoWellcome}
                                        className="px-4 py-4 md:px-16"
                                    />
                                </div>

                                <div className="absolute -right-6 -bottom-6 text-7xl text-green-300/30 font-serif">&quot;</div>

                                <div className="mt-6">
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-green-300 hover:text-green-100 text-sm transition-colors underline underline-offset-4 hover:underline-offset-8"
                                    >
                                        {isExpanded ? "Read less" : "Read full message"}
                                    </button>
                                </div>
                            </div>

                            {/* Village Head Photo */}
                            <div className="lg:w-80 w-full flex justify-center lg:justify-end mb-5">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 1.1 }}
                                    className="relative"
                                >
                                    <div className="w-72 h-96 lg:w-80 lg:h-[28rem] rounded-xl overflow-hidden border-4 border-green-300/20 shadow-2xl bg-green-100/10 backdrop-blur-sm">
                                        <Image
                                            src="/images/aparatur/placeholder.jpeg?height=400&width=300"
                                            alt="Eleanor Greenfield, Village Head of Green Valley"
                                            width={300}
                                            height={400}
                                            className="w-full h-full object-cover"
                                            priority
                                        />
                                    </div>

                                    {/* Decorative frame elements */}
                                    <div className="absolute -top-3 -left-3 w-8 h-8 border-t-3 border-l-3 border-green-300/40 rounded-tl-lg"></div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 border-t-3 border-r-3 border-green-300/40 rounded-tr-lg"></div>
                                    <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-3 border-l-3 border-green-300/40 rounded-bl-lg"></div>
                                    <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-3 border-r-3 border-green-300/40 rounded-br-lg"></div>

                                    {/* Photo caption */}
                                    <div className="absolute -bottom-12 left-0 right-0 text-center">
                                        <p className="text-green-200 text-base font-medium">Teguh Priyono</p>
                                        <p className="text-green-300 text-sm">Masa Bakti 2025 - 2028</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="flex justify-center mt-16"
                    >
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-green-300/50 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-green-300/70 rounded-full mt-2 animate-pulse"></div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
