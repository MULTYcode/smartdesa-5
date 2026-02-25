'use client';

import { useEffect } from 'react';
import { Footer } from '@/components/footer/footer';
import Header from '@/components/header/header';
import { useContent } from '@/hooks/useContent';

export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const { footer } = useContent();

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('.village-header');
      if (header) {
        const height = header.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    calculateHeaderHeight();
    window.addEventListener('resize', calculateHeaderHeight);

    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
       <Header data={footer as any} />
       <main className="mt-[var(--header-height)] flex-1">
         {children}
       </main>
       <Footer data={footer as any} />
    </div>
  );
}
