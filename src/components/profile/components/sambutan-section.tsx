"use client";

import RichTextContent from "@/components/common/RichTextContent";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDynamicSections } from "@/hooks/useDynamicSections";
import { Loader2 } from "lucide-react";

export function SambutanSection() {
  const { sections, isLoading, isError, refetch } = useDynamicSections();
  const [activeTab, setActiveTab] = useState("");
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // Set first tab as active when sections load
  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].config.id);
    }
  }, [sections, activeTab]);

  // Scroll active tab into view
  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const btn = document.getElementById(`sambutan-tab-${id}`);
    if (btn && tabContainerRef.current) {
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  // Loading
  if (isLoading) {
    return (
      <section className="py-8 flex justify-center px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
        <div className="w-full">
          <div className="animate-pulse">
            <div className="flex gap-2 mb-6">
              <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
            </div>
            <div className="rounded-2xl border border-gray-200 min-h-[350px] p-8 md:p-12">
              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-28 w-full bg-gray-100 rounded-lg mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (isError) {
    return (
      <section className="py-8 flex justify-center px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
        <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-4">
          <p className="text-gray-500 text-sm">Gagal memuat konten.</p>
          <button
            onClick={() => refetch()}
            className="px-5 py-2 rounded-md bg-[#F7C873] text-white text-sm font-semibold hover:bg-[#e6b85e] transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  // No sections
  if (sections.length === 0) return null;

  const activeSection = sections.find((s) => s.config.id === activeTab) || sections[0];

  return (
    <section className="py-8 flex justify-center px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full">
      <div className="w-full">
        {/* ─── Tabs ─── */}
        <div
          ref={tabContainerRef}
          className="flex gap-2 p-1 overflow-x-auto mb-6"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sections.map((section) => {
            const isActive = activeTab === section.config.id;
            return (
              <button
                key={section.config.id}
                id={`sambutan-tab-${section.config.id}`}
                onClick={() => handleTabClick(section.config.id)}
                className={`py-2 px-6 rounded-md text-sm font-semibold transition-all duration-300 flex-shrink-0 whitespace-nowrap ${
                  isActive
                    ? "bg-[#F7C873] text-white shadow-md"
                    : "text-gray-700 hover:text-[#F7C873]/80"
                }`}
              >
                {section.config.title}
              </button>
            );
          })}
        </div>

        {/* ─── Content Canvas ─── */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.config.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full rounded-2xl px-5 py-6"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                <div className="flex-1 relative w-full">

                  <div
                    className="w-full min-h-[300px]"
                    style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <RichTextContent
                      content={activeSection.content}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
