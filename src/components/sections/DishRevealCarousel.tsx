'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface DishRevealCarouselProps {
  dishes: MenuItem[];
}

const COVERED_IMAGE_MAP: Record<string, string> = {
  'Lamb Best End Chops': '/images/dishes/lamb-chops-covered.jpg',
  'Kasundi Salmon Tikka': '/images/dishes/salmon-tikka-covered.jpg',
  'Jardaloo Salli Boti': '/images/dishes/galouti-kebab-covered.jpg',
};

export default function DishRevealCarousel({ dishes }: DishRevealCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<Record<number, { x: number; y: number }>>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = cardRefs.current[index]?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos((prev) => ({
      ...prev,
      [index]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }));
  };

  const handleCardClick = (index: number) => {
    setClickedIndex((prev) => (prev === index ? null : index));
  };

  const isHovered = (index: number) => hoveredIndex === index;
  const cx = (index: number) => cursorPos[index]?.x ?? 0;
  const cy = (index: number) => cursorPos[index]?.y ?? 0;

  return (
    <div
      className="relative w-full transition-colors duration-700"
      style={{
        backgroundColor: hoveredIndex !== null ? '#5C1A1B' : '#000000',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Ghost name in bg — only when hovered */}
      {hoveredIndex !== null && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          <span
            className="font-cinzel uppercase text-white"
            style={{
              fontSize: 'clamp(48px, 12vw, 180px)',
              opacity: 0.08,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              transition: 'opacity 400ms',
            }}
          >
            {dishes[hoveredIndex]?.name}
          </span>
        </div>
      )}

      {/* Three dishes side by side */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1100,
          zIndex: 2,
          position: 'relative',
        }}
      >
        {dishes.map((dish, index) => {
          const hovered = isHovered(index);
          const clicked = clickedIndex === index;
          const coveredSrc = COVERED_IMAGE_MAP[dish.name] || dish.imageUrl;

          return (
            <div
              key={dish.id}
              style={{
                flex: hovered ? '0 0 42%' : '0 0 28%',
                maxWidth: hovered ? '42%' : '28%',
                transition: 'flex 550ms cubic-bezier(0.25,0.46,0.45,0.94), max-width 550ms cubic-bezier(0.25,0.46,0.45,0.94), transform 550ms cubic-bezier(0.25,0.46,0.45,0.94)',
                transform: hovered ? 'translateY(-18px) scale(1.04)' : 'translateY(0) scale(1)',
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() => handleCardClick(index)}
            >
              {/* Dish info — appears on hover above the card */}
              <div
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 400ms, transform 400ms',
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                <p className="font-cinzel uppercase text-white" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>
                  {dish.name}
                </p>
                <p className="font-garamond italic text-white/70" style={{ fontSize: 12, marginBottom: 4 }}>
                  {dish.description}
                </p>
                <p style={{ color: '#C9A24B', fontFamily: 'var(--font-cinzel)', fontSize: 14 }}>
                  ₹{dish.price}
                </p>
              </div>

              {/* Card image container */}
              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '0.85 / 1',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: hovered ? '1px solid rgba(201,162,75,0.4)' : '1px solid rgba(255,255,255,0.05)',
                  transition: 'border 400ms',
                }}
              >
                {/* Covered cloche — always visible */}
                <Image
                  src={coveredSrc}
                  alt={`${dish.name} covered`}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  sizes="(max-width: 640px) 90vw, 35vw"
                  draggable={false}
                />

                {/* Revealed dish — shown in cursor spotlight on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${dish.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitMaskImage: hovered
                      ? `radial-gradient(circle 90px at ${cx(index)}px ${cy(index)}px, black 30%, transparent 70%)`
                      : 'none',
                    maskImage: hovered
                      ? `radial-gradient(circle 90px at ${cx(index)}px ${cy(index)}px, black 30%, transparent 70%)`
                      : 'none',
                    transition: 'none',
                  }}
                />

                {/* Click to add — appears on click */}
                {clicked && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      zIndex: 10,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        addItem({ id: dish.id, name: dish.name, price: dish.price, imageUrl: dish.imageUrl });
                        setClickedIndex(null);
                      }}
                      className="font-cinzel uppercase"
                      style={{
                        background: '#C9A24B',
                        color: '#1A1410',
                        border: 'none',
                        padding: '12px 28px',
                        fontSize: 12,
                        letterSpacing: '0.12em',
                        cursor: 'pointer',
                        borderRadius: 4,
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setClickedIndex(null)}
                      className="font-cinzel uppercase"
                      style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 20px', fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer', borderRadius: 4 }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Click hint */}
              <div style={{ textAlign: 'center', marginTop: 10, opacity: hovered && !clicked ? 0.6 : 0, transition: 'opacity 300ms' }}>
                <p className="font-cinzel text-white" style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Click to order
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
