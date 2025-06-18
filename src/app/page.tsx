
"use client";
import HeroWelcome from "@/components/hero/hero-welcome";
import MenuCards from "@/components/menu/menu-cards";
import { useContent } from "@/hooks/useContent";

export default function Home() {

  const { updatedInfoCards, cta } = useContent()

  return (
    <main className="min-h-screen flex flex-col">
      <HeroWelcome />
      <div className="relative z-10  py-16">
        <div className="container mx-auto px-4">
          <MenuCards cards={updatedInfoCards} cta={cta}/>
        </div>
      </div>
    </main>
  )
}
