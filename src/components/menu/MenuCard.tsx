'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface MenuCardProps {
  dish: MenuItem;
}

export default function MenuCard({ dish }: MenuCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({ id: dish.id, name: dish.name, price: dish.price, imageUrl: dish.imageUrl });
  };

  return (
    <div className="group relative bg-[#1F1710] border border-taj-gold/10 rounded-lg overflow-hidden 
                    hover:border-taj-gold/30 transition-all duration-500 hover:-translate-y-1">
      {/* Clickable image + name → detail page */}
      <Link href={`/menu/${dish.id}`} className="block">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-taj-placeholder">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Diet indicator */}
          <div className={`absolute top-3 left-3 w-5 h-5 border-2 rounded-sm flex items-center justify-center ${
            dish.dietType === 'veg' ? 'border-green-500' : 'border-red-500'
          }`}>
            <div className={`w-2 h-2 rounded-full ${dish.dietType === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          {dish.isSignature && (
            <div className="absolute top-3 right-3 font-cinzel text-[9px] tracking-widest text-taj-dark bg-taj-gold px-2 py-1 uppercase">
              Signature
            </div>
          )}
        </div>
        <div className="px-5 pt-5 pb-2">
          <h3 className="font-marcellus text-taj-cream text-lg mb-1 leading-tight group-hover:text-taj-gold transition-colors duration-300">{dish.name}</h3>
          <p className="font-garamond italic text-taj-offwhite/60 text-sm line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>
      </Link>
      {/* Price + Add to cart */}
      <div className="flex items-center justify-between px-5 pb-5">
        <span className="font-cinzel text-taj-gold text-base tracking-wide">₹{dish.price}</span>
        <button
          onClick={handleAdd}
          className="w-9 h-9 rounded-full border border-taj-gold/50 flex items-center justify-center 
                     text-taj-gold hover:bg-taj-gold hover:text-taj-dark transition-all duration-300
                     hover:scale-110"
          aria-label={`Add ${dish.name} to cart`}
        >
          <Plus size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
