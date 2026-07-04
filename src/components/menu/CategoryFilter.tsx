'use client';
import { CategoryType } from '@/types';

const CATEGORIES: CategoryType[] = ['Starters', 'Heritage', 'Desserts'];

const CATEGORY_COLORS: Record<CategoryType, string> = {
  Starters: '#6B3A2A',
  Heritage: '#4A4233',
  Desserts: '#7A5230',
};

interface CategoryFilterProps {
  active: CategoryType;
  onChange: (cat: CategoryType) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-[72px] z-40 bg-taj-dark/95 backdrop-blur-sm border-b border-taj-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`font-cinzel text-xs tracking-[0.15em] uppercase px-6 py-5 whitespace-nowrap border-b-2 transition-all duration-300 ${
                active === cat
                  ? 'text-taj-gold border-taj-gold'
                  : 'text-taj-offwhite/50 border-transparent hover:text-taj-offwhite/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { CATEGORY_COLORS };
