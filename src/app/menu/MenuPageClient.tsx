'use client';
import { useState } from 'react';
import { MenuItem, DietType, CategoryType } from '@/types';
import DietToggleHero from '@/components/sections/DietToggleHero';
import CategoryFilter, { CATEGORY_COLORS } from '@/components/menu/CategoryFilter';
import DishCarousel from '@/components/sections/DishCarousel';
import MenuGrid from '@/components/menu/MenuGrid';
import DishRevealCarousel from '@/components/sections/DishRevealCarousel';

interface MenuPageClientProps {
  dishes: MenuItem[];
}

type ViewMode = 'carousel' | 'grid';

export default function MenuPageClient({ dishes }: MenuPageClientProps) {
  const [dietType, setDietType] = useState<DietType>('veg');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Starters');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');

  // Signature non-veg dishes for the reveal carousel (shown only when non-veg is selected)
  const signatureNonVeg = dishes.filter((d) => d.isSignature && d.dietType === 'nonveg');

  // Dishes filtered by active category + diet type
  const filteredDishes = dishes.filter(
    (d) => d.category === activeCategory && d.dietType === dietType
  );

  const handleDietChange = (diet: DietType) => {
    setDietType(diet);
    setActiveCategory('Starters');
    setViewMode('carousel');
  };

  return (
    <main className="min-h-screen bg-taj-dark">
      {/* Diet toggle hero */}
      <div className="pt-24">
        <DietToggleHero onChange={handleDietChange} />
      </div>

      {/* Non-veg only: signature reveal carousel with cursor spotlight */}
      {dietType === 'nonveg' && signatureNonVeg.length > 0 && (
        <div className="mt-8">
          <DishRevealCarousel dishes={signatureNonVeg} />
        </div>
      )}

      {/* Category filter tabs */}
      <CategoryFilter
        active={activeCategory}
        onChange={(cat) => { setActiveCategory(cat); setViewMode('carousel'); }}
      />

      {/* View mode toggle */}
      <div className="flex justify-end px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-1 bg-[#1F1710] rounded-full p-1 border border-taj-gold/20">
          {(['carousel', 'grid'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`font-cinzel text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                viewMode === mode
                  ? 'bg-taj-gold text-taj-dark'
                  : 'text-taj-offwhite/50 hover:text-taj-offwhite'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Menu content */}
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
