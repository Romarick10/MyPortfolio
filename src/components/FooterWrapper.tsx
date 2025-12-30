'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/portfolio/footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isDashboard) {
    return null;
  }

  return <Footer />;
}