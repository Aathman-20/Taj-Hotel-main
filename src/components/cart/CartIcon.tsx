'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { totalItems, openCart } = useCartStore();

  // Prevent SSR/client mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={openCart}
      className="relative text-taj-offwhite hover:text-taj-gold transition-colors duration-300"
      aria-label="Open cart"
    >
      <ShoppingBag size={22} strokeWidth={1.5} />
      {totalItems() > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-taj-gold text-taj-dark text-[10px] font-cinzel flex items-center justify-center">
          {totalItems()}
        </span>
      )}
    </button>
  );
}
