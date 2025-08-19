import RichTextContent from "@/components/common/RichTextContent"
import { useState } from "react";
import { motion } from "framer-motion";

interface WellcomeSectionProps {
  data: {
    wellcome:string,
    program:string
  }
}

export function SambutanSection({ data }: WellcomeSectionProps) {
  const [activeTab, setActiveTab] = useState("kata sambutan");

  return (
    <section className="py-8 flex justify-center px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
      <div className="w-full">
        <div className="items-center">
          <div>
           <div className="flex space-x-2 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("kata sambutan")}
                className={`py-2 px-6 rounded-md text-sm font-semibold transition-all duration-300 ${
                  activeTab === "kata sambutan"
                    ? "bg-[#F7C873] text-white shadow-md"
                    : "text-gray-700 hover:text-[#F7C873]/80"
                }`}
              >
                Kata Sambutan
              </button>
              <button
                onClick={() => setActiveTab("program")}
                className={`py-2 px-6 rounded-md text-sm font-semibold transition-all duration-300 ${
                  activeTab === "program"
                    ? "bg-[#F7C873] text-white shadow-md"
                    : "text-gray-700 hover:text-[#F7C873]/80"
                }`}
              >
                Program
              </button>
            </div>
            <div className="mt-4">
              {activeTab === "kata sambutan" && 
               <div className="mt-4">
                 <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full backdrop-blur-md rounded-2xl border border-[#CF4647]/20 shadow-2xl px-7 py-8 md:p-12"
                    >

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                            <div className="flex-1 relative">
                                <div className="absolute -left-6 -top-6 text-7xl text-black font-serif">&quot;</div>

                                <div
                                    className={`w-full`}
                                >
                                    <RichTextContent
                                        content={data.wellcome}
                                        className="px-4 py-4 md:px-16"
                                    />
                                </div>

                                <div className="absolute -right-6 -bottom-6 text-7xl text-black font-serif">&quot;</div>
                            </div>
                        </div>
                 </motion.div>
              </div>
                }
              {activeTab === "program" && 
              <div className="mt-4">
                 <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full backdrop-blur-md rounded-2xl border border-[#CF4647]/20 shadow-2xl px-7 py-8 md:p-12"
                    >

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                            <div className="flex-1 relative">
                                <div className="absolute -left-6 -top-6 text-7xl text-black font-serif">&quot;</div>

                                <div
                                    className={`w-full`}
                                >
                                    <RichTextContent
                                        content={data.program}
                                        className="px-4 py-4 md:px-16"
                                    />
                                </div>

                                <div className="absolute -right-6 -bottom-6 text-7xl text-black font-serif">&quot;</div>
                            </div>
                        </div>
                 </motion.div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
