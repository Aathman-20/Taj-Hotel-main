'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCartStore();

  // Prevent SSR/client mismatch — cart state is only meaningful after hydration
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-taj-dark border-l border-taj-gold/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-taj-gold/20">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-taj-gold" strokeWidth={1.5} />
                <span className="font-cinzel text-sm tracking-[0.15em] text-taj-offwhite uppercase">
                  Your Order
                </span>
              </div>
              <button onClick={closeCart} className="text-taj-offwhite/60 hover:text-taj-offwhite transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <ShoppingBag size={40} className="text-taj-gold/30 mb-4" strokeWidth={1} />
                  <p className="font-cormorant italic text-taj-offwhite/40 text-lg">Your cart is empty</p>
                  <p className="font-garamond text-taj-offwhite/30 text-sm mt-2">Add something from the menu</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 items-center py-4 border-b border-taj-gold/10"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-taj-placeholder flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-marcellus text-taj-cream text-sm truncate">{item.name}</p>
                      <p className="font-cinzel text-taj-gold text-xs mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-taj-gold/30 flex items-center justify-center text-taj-offwhite/70 hover:border-taj-gold hover:text-taj-gold transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-cinzel text-taj-offwhite text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-taj-gold/30 flex items-center justify-center text-taj-offwhite/70 hover:border-taj-gold hover:text-taj-gold transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-taj-gold/20">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-cinzel text-xs tracking-widest text-taj-offwhite/70 uppercase">Total</span>
                  <span className="font-cormorant text-2xl text-taj-gold">₹{totalPrice().toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center font-cinzel text-xs tracking-[0.2em] uppercase 
                             bg-taj-gold text-taj-dark py-4 hover:bg-taj-cream transition-colors duration-300"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
