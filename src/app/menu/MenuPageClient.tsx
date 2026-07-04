'use client';
import { useState } from 'react';
import { MenuItem, DietType, CategoryType } from '@/types';
import DietToggleHero from '@/components/sections/DietToggleHero';
import { CATEGORY_COLORS } from '@/components/menu/CategoryFilter';
import DishCarousel from '@/components/sections/DishCarousel';
import MenuGrid from '@/components/menu/MenuGrid';
import DishRevealCarousel from '@/components/sections/DishRevealCarousel';

type ViewMode = 'carousel' | 'grid';

export default function MenuPageClient({ dishes }: { dishes: MenuItem[] }) {
  const [dietType, setDietType] = useState<DietType>('veg');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Starters');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');

  const signatureNonVeg = dishes.filter((d) => d.isSignature && d.dietType === 'nonveg');

  const filteredDishes = dishes.filter(
    (d) => d.category === activeCategory && d.dietType === dietType
  );

  const handleDietChange = (diet: DietType) => {
    setDietType(diet);
    setActiveCategory('Starters');
  };

  return (
    <main className="min-h-screen bg-taj-dark">
      <div className="pt-24">
        <DietToggleHero onChange={handleDietChange} />
      </div>

      {dietType === 'nonveg' && signatureNonVeg.length > 0 && (
        <div className="mt-8">
          <div className="text-center mb-6 px-6">
            <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-2">Hover to reveal</p>
            <h2 className="font-cormorant text-3xl md:text-4xl text-taj-cream">Our Signatures</h2>
          </div>
          <DishRevealCarousel dishes={signatureNonVeg} />
        </div>
      )}

      {/* Global view toggle + category filter in one bar */}
      <div className="sticky top-[72px] z-40 bg-taj-dark/95 backdrop-blur-sm border-b border-taj-gold/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {(['Starters', 'Heritage', 'Desserts'] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-cinzel text-xs tracking-[0.15em] uppercase px-6 py-5 whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-taj-gold border-taj-gold'
                    : 'text-taj-offwhite/50 border-transparent hover:text-taj-offwhite/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Global carousel/grid toggle */}
          <div className="flex items-center gap-1 bg-[#1F1710] rounded-full p-1 border border-taj-gold/20 flex-shrink-0">
            {(['carousel', 'grid'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`font-cinzel text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                  viewMode === mode ? 'bg-taj-gold text-taj-dark' : 'text-taj-offwhite/50 hover:text-taj-offwhite'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <div className="py-24 text-center px-6">
          <p className="font-cormorant italic text-taj-offwhite/40 text-xl">
            No {dietType === 'veg' ? 'vegetarian' : 'non-vegetarian'} dishes in this category.
          </p>
        </div>
      ) : viewMode === 'carousel' ? (
        <DishCarousel
          key={`${activeCategory}-${dietType}`}
          dishes={filteredDishes}
          categoryColor={CATEGORY_COLORS[activeCategory]}
        />
      ) : (
        <MenuGrid dishes={filteredDishes} />
      )}
    </main>
  );
}
