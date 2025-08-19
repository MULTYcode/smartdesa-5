'use client';

import { Footer } from '@/components/footer/footer';
import Header from '@/components/header/header';
import { useContent } from '@/hooks/useContent';

export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const { footer } = useContent();

  return (
    <>
       <Header data={footer} />
          <div className='mt-15 md:mt-28'>
            {children}
          </div>
        <Footer data={footer} />
    </>
  );
}
