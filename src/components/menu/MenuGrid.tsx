'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuItem } from '@/types';
import MenuCard from './MenuCard';

gsap.registerPlugin(ScrollTrigger);

interface MenuGridProps {
  dishes: MenuItem[];
}

export default function MenuGrid({ dishes }: MenuGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.menu-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [dishes]);

  if (dishes.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-cormorant italic text-taj-offwhite/50 text-xl">
          No dishes available in this category.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12 py-12 max-w-7xl mx-auto"
    >
      {dishes.map((dish) => (
        <div key={dish.id} className="menu-card">
          <MenuCard dish={dish} />
        </div>
      ))}
    </div>
  );
}
