'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function DishDetailClient({ dish }: { dish: MenuItem }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: dish.id, name: dish.name, price: dish.price, imageUrl: dish.imageUrl });
    }
  };

  return (
    <main className="min-h-screen bg-taj-dark pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row gap-12 items-center">
        <div className="relative w-full md:w-1/2 aspect-square rounded-lg overflow-hidden bg-taj-placeholder">
          <Image src={dish.imageUrl} alt={dish.name} fill className="object-cover" sizes="50vw" priority />
        </div>
        <div className="w-full md:w-1/2">
          {dish.isSignature && (
            <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-4">Signature Dish</p>
          )}
          <h1 className="font-cormorant text-4xl md:text-5xl text-taj-cream mb-4 leading-tight">{dish.name}</h1>
          <p className="font-garamond italic text-taj-offwhite/70 text-lg mb-6 leading-relaxed">{dish.description}</p>
          <div className="w-12 h-px bg-taj-gold mb-6" />
          <p className="font-cormorant text-3xl text-taj-gold mb-8">₹{dish.price}</p>

          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-full border border-taj-gold/40 flex items-center justify-center text-taj-offwhite hover:border-taj-gold transition-colors">
              <Minus size={16} />
            </button>
            <span className="font-cinzel text-taj-offwhite text-lg w-8 text-center">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 rounded-full border border-taj-gold/40 flex items-center justify-center text-taj-offwhite hover:border-taj-gold transition-colors">
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="w-full font-cinzel text-xs tracking-[0.2em] uppercase bg-taj-gold text-taj-dark 
                       py-4 hover:bg-taj-cream transition-colors duration-300 mb-4"
          >
            Add to Order — ₹{(dish.price * quantity).toFixed(2)}
          </button>
          <Link href="/menu" className="block text-center font-cinzel text-xs tracking-widest text-taj-offwhite/40 hover:text-taj-offwhite/70 uppercase transition-colors">
            ← Back to Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
