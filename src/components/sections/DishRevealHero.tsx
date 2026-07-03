'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface DishRevealProps {
  name: string;
  tagline: string;
  coveredSrc: string;
  revealedSrc: string;
}

export default function DishRevealHero({ name, tagline, coveredSrc, revealedSrc }: DishRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const clocheRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(clocheRef.current, {
        opacity: 0,
        scale: 1.15,
        filter: 'blur(8px)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=800',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden bg-taj-dark">
      {/* Revealed dish — base layer */}
      <div className="absolute inset-0">
        <Image
          src={revealedSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Cloche — top layer, animates away on scroll */}
      <div ref={clocheRef} className="absolute inset-0">
        <Image
          src={coveredSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10" />

      {/* Caption — stays pinned */}
      <div className="absolute bottom-16 left-8 md:left-12 z-20">
        <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold mb-3 uppercase">
          Signature
        </p>
        <h2 className="font-cormorant text-5xl md:text-6xl text-taj-cream leading-tight">
          {name}
        </h2>
        <p className="font-garamond italic text-lg text-taj-offwhite/80 mt-2">
          {tagline}
        </p>
      </div>
    </div>
  );
}
