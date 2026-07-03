import Hero from '@/components/sections/Hero';
import HeritageSection from '@/components/sections/HeritageSection';
import ScrollRefresher from '@/components/providers/ScrollRefresher';

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* "Full Experience Awaits" — appears after the hero scroll pin completes */}
      <section className="bg-taj-dark py-32 flex flex-col items-center justify-center text-center px-8">
        <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-4">
          Shamiana Restaurant
        </p>
        <h2 className="font-cormorant text-4xl md:text-6xl text-taj-cream mb-6 leading-tight">
          The Full Experience Awaits
        </h2>
        <p className="font-garamond italic text-taj-offwhite/70 text-xl mb-4 max-w-xl leading-relaxed">
          Fourteen curated dishes. Four generations of flavour.<br />
          One table, waiting for you.
        </p>
      </section>

      {/* Heritage section with Explore the Menu CTA */}
      <HeritageSection />

      {/* Recalculates pin positions after all content/fonts have loaded */}
      <ScrollRefresher />
    </main>
  );
}
