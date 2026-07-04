'use client';
import { useState } from 'react';
import Image from 'next/image';
import { DietType } from '@/types';

interface DietToggleHeroProps {
  onChange?: (diet: DietType) => void;
}

export default function DietToggleHero({ onChange = () => {} }: DietToggleHeroProps) {
  const [diet, setDiet] = useState<DietType>('veg');

  const handleSet = (type: DietType) => {
    setDiet(type);
    onChange(type);
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl mx-4 md:mx-12 mb-12">
      {/* Veg image */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: diet === 'veg' ? 1 : 0, overflow: 'hidden' }}
      >
        <Image
          src="/images/veg-spread.jpg"
          alt="Vegetarian spread"
          fill
          className="object-cover"
          style={{ transform: 'scale(1.18)', transformOrigin: 'center 40%' }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Non-veg image */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: diet === 'nonveg' ? 1 : 0 }}
      >
        <Image
          src="/images/nonveg-platter.jpg"
          alt="Non-vegetarian platter"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10" />

      {/* Section heading */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-2">
          Our Menu
        </p>
        <h2 className="font-cormorant text-3xl md:text-4xl text-taj-cream">
          {diet === 'veg' ? 'Garden & Grain' : 'Land & Sea'}
        </h2>
      </div>

      {/* Toggle pill */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="relative flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
          {/* Sliding background pill */}
          <div
            className="absolute top-1 left-1 h-[calc(100%-8px)] w-[150px] rounded-full bg-taj-cream transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: diet === 'nonveg' ? 'translateX(150px)' : 'translateX(0)' }}
          />
          <button
            onClick={() => handleSet('veg')}
            className={`relative z-10 w-[150px] py-3 font-cinzel text-xs tracking-widest transition-colors duration-300 rounded-full ${
              diet === 'veg' ? 'text-taj-dark' : 'text-taj-offwhite'
            }`}
          >
            Vegetarian
          </button>
          <button
            onClick={() => handleSet('nonveg')}
            className={`relative z-10 w-[150px] py-3 font-cinzel text-xs tracking-widest transition-colors duration-300 rounded-full ${
              diet === 'nonveg' ? 'text-taj-dark' : 'text-taj-offwhite'
            }`}
          >
            Non-Veg
          </button>
        </div>
      </div>
    </div>
  );
}
