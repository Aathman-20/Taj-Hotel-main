import Hero from '@/components/sections/Hero';
import ScrollRefresher from '@/components/providers/ScrollRefresher';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="bg-taj-dark py-32 flex flex-col items-center justify-center text-center px-8">
        <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase mb-4">Shamiana Restaurant</p>
        <h2 className="font-cormorant text-4xl md:text-6xl text-taj-cream mb-6 leading-tight">
          The Full Experience Awaits
        </h2>
        <p className="font-garamond italic text-taj-offwhite/70 text-xl mb-10 max-w-xl leading-relaxed">
          Fourteen curated dishes. Four generations of flavour.<br />One table, waiting for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/menu"
            className="font-cinzel text-xs tracking-[0.2em] text-taj-dark uppercase bg-taj-gold px-10 py-4 hover:bg-taj-cream transition-all duration-300"
          >
            Explore the Menu →
          </Link>
          <Link
            href="/heritage"
            className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase border border-taj-gold/50 px-10 py-4 hover:bg-taj-gold hover:text-taj-dark transition-all duration-300"
          >
            Our Heritage →
          </Link>
        </div>
      </section>
      <ScrollRefresher />
    </main>
  );
}
