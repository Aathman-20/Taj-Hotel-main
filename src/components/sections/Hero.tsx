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
    history: null,
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
    history: null,
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
      stRef.current?.kill();

      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=4500',
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (video.readyState >= 2 && video.duration) {
            // Remap progress so each of the 3 video segments takes equal scroll distance
            // Video is 10s: 0-3s = frame1, 3-6.5s = frame2, 6.5-10s = frame3
            // We want equal scroll distance per frame so middle frame doesn't feel faster
            const p = self.progress;
            let targetTime: number;
            if (p < 0.333) {
              // Frame 1: 0-3s mapped to scroll 0-0.333
              targetTime = (p / 0.333) * 3;
            } else if (p < 0.666) {
              // Frame 2: 3-6.5s mapped to scroll 0.333-0.666
              targetTime = 3 + ((p - 0.333) / 0.333) * 3.5;
            } else {
              // Frame 3: 6.5-10s mapped to scroll 0.666-1.0
              targetTime = 6.5 + ((p - 0.666) / 0.334) * 3.5;
            }
            video.currentTime = Math.min(Math.max(targetTime, 0), video.duration - 0.01);

            if (p < 0.33) setChapter(0);
            else if (p < 0.66) setChapter(1);
            else setChapter(2);
          }
        },
      });

      ScrollTrigger.refresh();
    };

    video.load();
    if (video.readyState >= 1) {
      setup();
    } else {
      const onMeta = () => { setup(); video.removeEventListener('loadedmetadata', onMeta); };
      video.addEventListener('loadedmetadata', onMeta);
    }

    return () => { stRef.current?.kill(); stRef.current = null; };
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/75" />

      {chapters.map((c, i) => (
        <div
          key={i}
          className="absolute text-left z-10"
          style={{
            bottom: '10%',
            left: '3.5rem',
            right: '3.5rem',
            opacity: chapter === i ? 1 : 0,
            transition: 'opacity 800ms ease-in-out',
            pointerEvents: 'none',
          }}
        >
          <p className="font-cinzel text-sm md:text-base tracking-[0.25em] text-taj-gold mb-3 uppercase">
            {c.eyebrow}
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl text-taj-cream mb-3 leading-tight max-w-3xl">
            {c.title}
          </h1>
          <p className="font-cormorant italic text-lg md:text-xl text-taj-offwhite/85 max-w-2xl mb-3">
            {c.sub}
          </p>
          {c.history && (
            <p className="font-garamond text-taj-offwhite/70 text-base md:text-lg max-w-xl leading-relaxed">
              {c.history}
            </p>
          )}
        </div>
      ))}

      <div className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2">
        <span className="font-cinzel text-[10px] tracking-[0.3em] text-taj-offwhite/50 uppercase">Scroll</span>
        <div className="w-px h-8 bg-taj-gold/40 animate-pulse" />
      </div>
    </section>
  );
}
