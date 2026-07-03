'use client';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface DishCarouselProps {
  dishes: MenuItem[];
  categoryColor: string;
}

type Role = 'center' | 'left' | 'right' | 'back' | 'hidden';

export default function DishCarousel({ dishes, categoryColor }: DishCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const N = dishes.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload all dish images
  useEffect(() => {
    dishes.forEach((d) => {
      const src = d.cutoutUrl || d.imageUrl;
      const img = new window.Image();
      img.src = src;
    });
  }, [dishes]);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating || N <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prev) => dir === 'next' ? (prev + 1) % N : (prev - 1 + N) % N);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, N]);

  const getRole = (index: number): Role => {
    if (index === activeIndex) return 'center';
    if (N === 1) return 'hidden';
    if (index === (activeIndex - 1 + N) % N) return 'left';
    if (index === (activeIndex + 1) % N) return 'right';
    if (N >= 4 && index === (activeIndex + 2) % N) return 'back';
    return 'hidden';
  };

  const getRoleStyles = (role: Role): React.CSSProperties => {
    const transition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)';
    const base: React.CSSProperties = { position: 'absolute', aspectRatio: '0.6 / 1', transition, willChange: 'transform, filter, opacity' };
    switch (role) {
      case 'center': return { ...base, transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`, filter: 'none', opacity: 1, zIndex: 20, left: '50%', height: isMobile ? '60%' : '92%', bottom: isMobile ? '22%' : 0 };
      case 'left':   return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '20%' : '30%', height: isMobile ? '16%' : '28%', bottom: isMobile ? '32%' : '12%' };
      case 'right':  return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.85, zIndex: 10, left: isMobile ? '80%' : '70%', height: isMobile ? '16%' : '28%', bottom: isMobile ? '32%' : '12%' };
      case 'back':   return { ...base, transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 1, zIndex: 5, left: '50%', height: isMobile ? '13%' : '22%', bottom: isMobile ? '32%' : '12%' };
      default:       return { ...base, opacity: 0, zIndex: 0, left: '50%', transform: 'translateX(-50%) scale(0.5)', height: isMobile ? '16%' : '28%', bottom: isMobile ? '32%' : '12%' };
    }
  };

  const activeDish = dishes[activeIndex];

  const handleAddToCart = () => {
    addItem({
      id: activeDish.id,
      name: activeDish.name,
      price: activeDish.price,
      imageUrl: activeDish.imageUrl,
    });
  };

  // SVG grain overlay data URI
  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', backgroundColor: categoryColor, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* Grain overlay */}
      <div
        style={{ position: 'absolute', inset: 0, backgroundImage: grainSvg, backgroundSize: '200px 200px', backgroundRepeat: 'repeat', opacity: 0.4, zIndex: 50, pointerEvents: 'none' }}
      />

      {/* Ghost text */}
      <div
        style={{ position: 'absolute', insetInline: 0, top: '18%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }}
      >
        <span
          className="font-cinzel uppercase text-white"
          style={{ fontSize: 'clamp(60px, 18vw, 280px)', opacity: 0.12, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap', transition: 'opacity 300ms' }}
        >
          {activeDish?.name}
        </span>
      </div>

      {/* Top-left wordmark */}
      <div style={{ position: 'absolute', top: 24, left: 16, zIndex: 60 }}>
        <span className="font-cinzel text-white uppercase" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', opacity: 0.9 }}>
          Shamiana
        </span>
      </div>

      {/* Dish images carousel */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        {dishes.map((dish, index) => {
          const role = getRole(index);
          return (
            <div key={dish.id} style={getRoleStyles(role)}>
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Image
                  src={dish.cutoutUrl || dish.imageUrl}
                  alt={dish.name}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
                  sizes="(max-width: 640px) 60vw, 40vw"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-left info block */}
      <div style={{ position: 'absolute', bottom: isMobile ? 24 : 80, left: isMobile ? 16 : 96, zIndex: 60, maxWidth: 360 }}>
        <p className="font-cinzel uppercase text-white" style={{ fontWeight: 700, letterSpacing: '0.05em', fontSize: isMobile ? 14 : 22, marginBottom: 8, opacity: 0.95 }}>
          {activeDish?.name}
        </p>
        {!isMobile && (
          <p className="font-garamond italic text-white" style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6, marginBottom: 8 }}>
            {activeDish?.description}
          </p>
        )}
        <p className="font-cinzel" style={{ color: '#C9A24B', fontSize: isMobile ? 14 : 18, marginBottom: 16 }}>
          ₹{activeDish?.price}
        </p>
        {N > 1 && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => navigate('prev')}
              style={{ width: isMobile ? 48 : 64, height: isMobile ? 48 : 64, borderRadius: '50%', background: 'transparent', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'transform 150ms, background-color 150ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              style={{ width: isMobile ? 48 : 64, height: isMobile ? 48 : 64, borderRadius: '50%', background: 'transparent', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'transform 150ms, background-color 150ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom-right ADD TO CART */}
      <button
        onClick={handleAddToCart}
        style={{ position: 'absolute', bottom: isMobile ? 24 : 80, right: isMobile ? 16 : 40, zIndex: 60, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'white', opacity: 0.95, transition: 'opacity 200ms' }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
        className="font-cinzel uppercase"
        aria-label={`Add ${activeDish?.name} to cart`}
      >
        <span style={{ fontSize: 'clamp(14px, 2.5vw, 24px)', letterSpacing: '-0.01em' }}>Add to Cart</span>
        <ArrowRight size={isMobile ? 18 : 24} strokeWidth={2.25} />
      </button>
    </div>
  );
}
