'use client';

import { Footer } from '@/components/footer/footer';
import Header from '@/components/header/header';
import { useContent } from '@/hooks/useContent';

export default function LayoutInner({ children }: { children: React.ReactNode }) {
  const { footer, header } = useContent();

  return (
    <>
      <Header data={header} />
      {children}
      <Footer data={footer} />
    </>
  );
}
