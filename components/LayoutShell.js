'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import ScrollAnimations from '@/components/ScrollAnimations';
import SmoothScroll from '@/components/SmoothScroll';
import ParallaxShapes from '@/components/ParallaxShapes';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <FloatingShapes />
      <Navbar />
      {children}
      <Footer />
      <ScrollAnimations />
      <SmoothScroll />
      <ParallaxShapes />
    </>
  );
}
