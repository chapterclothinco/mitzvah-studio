import { Sora, Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import ScrollAnimations from '@/components/ScrollAnimations';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxShapes from '@/components/ParallaxShapes';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'The Mitzvah Studio | Fully Custom Bar & Bat Mitzvah Merch',
  description: 'Fully custom hoodies, tees, hats, and merch for Bar and Bat Mitzvahs. Designed from scratch by our team, manufactured on premium blanks. No templates, no limits.',
  icons: {
    icon: '/assets/Submark.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <FloatingShapes />
        <Navbar />
        {children}
        <Footer />
        <ScrollAnimations />
        <SmoothScroll />
        <ParallaxShapes />
      </body>
    </html>
  );
}
