'use client';

import { useEffect } from 'react';

export default function ParallaxShapes() {
  useEffect(() => {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          shapes.forEach((shape, index) => {
            const speed = 0.05 + index * 0.02;
            const yPos = scrolled * speed;
            shape.style.transform = `translateY(${yPos}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
