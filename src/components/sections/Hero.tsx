'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    eyebrow: 'TAJ MAHAL PALACE, MUMBAI',
    title: 'A Legacy Carved in Stone',
    sub: 'An invitation to dine like royalty',
  },
  {
    eyebrow: 'THE GARDENS — EST. 1903',
    title: 'Where Heritage Whispers',
    sub: 'Over a century of stories, woven into every stone',
    history: 'The Taj Mahal Palace opened its doors on December 16, 1903 — the first hotel in India with electricity, American fans, German elevators, and English butlers. Built by Jamsetji Nusserwanji Tata after he was denied entry to a Europeans-only hotel, it became the most iconic address in all of Asia.',
  },
  {
    eyebrow: 'THE TABLE',
    title: 'Dine Under a Thousand Candles',
    sub: 'A moment, beautifully kept',
  },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const setup = () => {
      // Kill any stale instance before creating a new one
      stRef.current?.kill();

      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=3000',
        scrub: 1,          // 1s lag — smooths out FPS jitter from rapid scroll events
        pin: true,
        anticipatePin: 1,  // prevents layout jump when pin engages
        onUpdate: (self) => {
          // Only seek if video has enough data (readyState 2 = HAVE_CURRENT_DATA)
          if (video.readyState >= 2 && video.duration) {
            const target = self.progress * video.duration;
            // Clamp to valid range — avoids an out-of-bounds DOMException
            video.currentTime = Math.min(Math.max(target, 0), video.duration - 0.01);
          }
          if (self.progress < 0.33) setChapter(0);
          else if (self.progress < 0.66) setChapter(1);
          else setChapter(2);
        },
      });

      ScrollTrigger.refresh();
    };

    // Force the browser to start loading video data immediately
    video.load();

    if (video.readyState >= 1) {
      setup();
    } else {
      const onMeta = () => { setup(); video.removeEventListener('loadedmetadata', onMeta); };
      video.addEventListener('loadedmetadata', onMeta);
    }

    return () => {
      stRef.current?.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-taj-dark">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/taj-hero.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/70" />

      {/* Chapter text — bottom-left, prominent */}
      {chapters.map((c, i) => (
        <div
          key={i}
          className="absolute bottom-24 left-8 md:left-14 text-left transition-opacity duration-700 ease-in-out z-10"
          style={{ opacity: chapter === i ? 1 : 0, pointerEvents: 'none' }}
        >
          <p className="font-cinzel text-sm md:text-base tracking-[0.25em] text-taj-gold mb-4 uppercase">
            {c.eyebrow}
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-taj-cream mb-4 leading-tight max-w-4xl">
            {c.title}
          </h1>
          <p className="font-cormorant italic text-xl md:text-2xl text-taj-offwhite/85 max-w-2xl">
            {c.sub}
          </p>
          {c.history && (
            <p className="font-garamond text-taj-offwhite/70 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
              {c.history}
            </p>
          )}
        </div>
      ))}

      {/* Scroll cue — bottom-right so it doesn't overlap chapter text */}
      <div className="absolute bottom-10 right-10 md:right-14 z-20 flex flex-col items-center gap-2">
        <span className="font-cinzel text-[10px] tracking-[0.3em] text-taj-offwhite/50 uppercase">Scroll</span>
        <div className="w-px h-8 bg-taj-gold/40 animate-pulse" />
      </div>
    </section>
  );
}
