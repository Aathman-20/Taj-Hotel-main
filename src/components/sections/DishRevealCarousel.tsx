'use client';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';

// Fix 8: Hardcoded map prevents brittle dynamic path generation from dish names
const COVERED_IMAGE_MAP: Record<string, string> = {
  'Lamb Best End Chops':  '/images/dishes/lamb-chops-covered.jpg',
  'Kasundi Salmon Tikka': '/images/dishes/salmon-tikka-covered.jpg',
  'Jardaloo Salli Boti':  '/images/dishes/galouti-kebab-covered.jpg',
};

interface DishRevealCarouselProps {
  dishes: MenuItem[]; // exactly the 3 signature non-veg dishes
}

type RoleType = 'center' | 'left' | 'right' | 'hidden';

export default function DishRevealCarousel({ dishes }: DishRevealCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Cursor position relative to the center dish card (not the full container)
  const [localCursor, setLocalCursor] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const N = dishes.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating || N <= 1) return;
    setIsAnimating(true);
    setActiveIndex((prev) => dir === 'next' ? (prev + 1) % N : (prev - 1 + N) % N);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, N]);

  const getRole = (index: number): RoleType => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + N) % N) return 'left';
    if (index === (activeIndex + 1) % N) return 'right';
    return 'hidden';
  };

  const getRoleStyles = (role: RoleType): React.CSSProperties => {
    const transition = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)';
    const base: React.CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.75 / 1',
      transition,
      willChange: 'transform, filter, opacity',
    };
    switch (role) {
      case 'center': return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.35})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '55%' : '70%',
        bottom: isMobile ? '18%' : '8%',
      };
      case 'left': return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.75,
        zIndex: 10,
        left: isMobile ? '18%' : '22%',
        height: isMobile ? '28%' : '38%',
        bottom: isMobile ? '25%' : '14%',
      };
      case 'right': return {
        ...base,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.75,
        zIndex: 10,
        left: isMobile ? '82%' : '78%',
        height: isMobile ? '28%' : '38%',
        bottom: isMobile ? '25%' : '14%',
      };
      default: return {
        ...base,
        opacity: 0,
        zIndex: 0,
        left: '50%',
        transform: 'translateX(-50%) scale(0.5)',
        pointerEvents: 'none',
      };
    }
  };

  const activeDish = dishes[activeIndex];
  const coveredSrc = COVERED_IMAGE_MAP[activeDish?.name] ?? activeDish?.imageUrl;

  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '85vh', backgroundColor: '#5C1A1B', transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* Film grain overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: grainSvg, backgroundSize: '200px 200px', opacity: 0.4, zIndex: 50, pointerEvents: 'none' }} />

      {/* Ghost title text */}
      <div style={{ position: 'absolute', insetInline: 0, top: '12%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, pointerEvents: 'none', userSelect: 'none' }}>
        <span
          className="font-cinzel uppercase text-white"
          style={{ fontSize: 'clamp(50px, 15vw, 220px)', opacity: 0.1, lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap', transition: 'opacity 300ms' }}
        >
          {activeDish?.name}
        </span>
      </div>

      {/* Section label */}
      <div style={{ position: 'absolute', top: 28, left: 24, zIndex: 60 }}>
        <p className="font-cinzel text-white uppercase" style={{ fontSize: 11, letterSpacing: '0.18em', opacity: 0.8 }}>
          Signature Dishes
        </p>
      </div>

      {/* Dish cards */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        {dishes.map((dish, index) => {
          const role = getRole(index);
          const isCenter = role === 'center';
          const dishCoveredSrc = COVERED_IMAGE_MAP[dish.name] ?? dish.imageUrl;

          return (
            <div key={dish.id} style={getRoleStyles(role)}>
              <div
                style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 12 }}
                // Mouse handlers on the card itself — cursor position is relative to this element
                onMouseMove={isCenter ? (e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setLocalCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
                } : undefined}
                onMouseEnter={isCenter ? () => setIsHovering(true) : undefined}
                onMouseLeave={isCenter ? () => setIsHovering(false) : undefined}
              >
                {/* Covered cloche — base layer */}
                <Image
                  src={dishCoveredSrc}
                  alt={`${dish.name} covered`}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 640px) 80vw, 50vw"
                  draggable={false}
                />

                {/* Revealed dish — shown only in cursor spotlight on hover (center card only) */}
                {isCenter && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${dish.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      WebkitMaskImage: isHovering
                        ? `radial-gradient(circle 80px at ${localCursor.x}px ${localCursor.y}px, black 0%, black 40%, transparent 70%)`
                        : 'none',
                      maskImage: isHovering
                        ? `radial-gradient(circle 80px at ${localCursor.x}px ${localCursor.y}px, black 0%, black 40%, transparent 70%)`
                        : 'none',
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-left: dish info + navigation */}
      <div style={{ position: 'absolute', bottom: isMobile ? 20 : 60, left: isMobile ? 16 : 80, zIndex: 60, maxWidth: 340 }}>
        <p className="font-cinzel uppercase text-white" style={{ fontWeight: 700, fontSize: isMobile ? 13 : 20, letterSpacing: '0.05em', marginBottom: 6, opacity: 0.95 }}>
          {activeDish?.name}
        </p>
        {!isMobile && (
          <p className="font-garamond italic text-white" style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 8 }}>
            {activeDish?.description}
          </p>
        )}
        <p style={{ color: '#C9A24B', fontFamily: 'var(--font-cinzel)', fontSize: 16, marginBottom: 16 }}>
          ₹{activeDish?.price}
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          {([{ dir: 'prev', Icon: ArrowLeft }, { dir: 'next', Icon: ArrowRight }] as const).map(({ dir, Icon }) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              style={{ width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: '50%', background: 'transparent', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Icon size={22} strokeWidth={2.25} />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom-right: Add to Cart */}
      <button
        onClick={() => activeDish && addItem({ id: activeDish.id, name: activeDish.name, price: activeDish.price, imageUrl: activeDish.imageUrl })}
        style={{ position: 'absolute', bottom: isMobile ? 20 : 60, right: isMobile ? 16 : 40, zIndex: 60, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'white', opacity: 0.9 }}
        className="font-cinzel uppercase"
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
        aria-label={`Add ${activeDish?.name} to cart`}
      >
        <span style={{ fontSize: 'clamp(12px, 2vw, 20px)', letterSpacing: '-0.01em' }}>Add to Cart</span>
        <ArrowRight size={18} strokeWidth={2.25} />
      </button>

      {/* Hover hint (desktop only) */}
      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 60, textAlign: 'center', opacity: isHovering ? 0 : 0.5, transition: 'opacity 300ms' }}>
          <p className="font-cinzel text-white" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Hover to reveal
          </p>
        </div>
      )}
    </div>
  );
}
