import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/portfolio/header';
import FooterWrapper from '@/components/FooterWrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Bongnteh Romarick Ndzelen - Portfolio',
  description: 'Full-Stack Developer & Creator | Building elegant, high-performance web applications',
  keywords: ['developer', 'portfolio', 'web development', 'full-stack', 'react', 'next.js'],
  authors: [{ name: 'Bongnteh Romarick Ndzelen' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'Bongnteh Romarick Ndzelen - Portfolio',
    description: 'Full-Stack Developer & Creator | Building elegant, high-performance web applications',
    siteName: 'Bongnteh Romarick Ndzelen Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bongnteh Romarick Ndzelen - Portfolio',
    description: 'Full-Stack Developer & Creator | Building elegant, high-performance web applications',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, 'dark')} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(
        'antialiased min-h-screen bg-slate-950 text-slate-300 flex flex-col',
        inter.className
      )}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <FooterWrapper />
        <Toaster />
      </body>
    </html>
  );
}