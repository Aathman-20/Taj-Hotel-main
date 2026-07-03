'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems, openCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-taj-dark border-b border-taj-gold/30 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-cinzel text-xl tracking-[0.15em] text-taj-offwhite hover:text-taj-gold transition-colors duration-300">
          TAJ
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {[{ label: 'Menu', href: '/menu' }, { label: 'Heritage', href: '/#heritage' }, { label: 'Reserve', href: '/checkout' }].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-cinzel text-xs tracking-[0.15em] text-taj-offwhite/80 uppercase relative group hover:text-taj-gold transition-colors duration-300"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-taj-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Cart icon — badge only renders after hydration to prevent SSR mismatch */}
        <button
          onClick={openCart}
          className="relative text-taj-offwhite hover:text-taj-gold transition-colors duration-300"
          aria-label="Open cart"
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          {mounted && totalItems() > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-taj-gold text-taj-dark text-[10px] font-cinzel flex items-center justify-center">
              {totalItems()}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
