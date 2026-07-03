import Image from 'next/image';

export default function HeritageSection() {
  return (
    <section className="relative min-h-screen bg-taj-dark flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Left — heritage image, fills half the screen */}
      <div className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen">
        <Image
          src="/images/heritage/taj-heritage-1.jpg"
          alt="Taj Mahal Palace Heritage Corridor"
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-taj-dark/60" />
      </div>

      {/* Right — heritage copy */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16 md:py-24">
        <p className="font-cinzel text-xs tracking-[0.2em] text-taj-gold mb-6 uppercase">
          Est. 1903
        </p>
        <h2 className="font-cormorant text-4xl md:text-5xl text-taj-cream mb-6 leading-tight">
          Mumbai's Original<br />Coffee House
        </h2>
        <p className="font-cormorant italic text-xl md:text-2xl text-taj-gold mb-8 leading-relaxed">
          "A gathering place for the world's finest guests,<br />
          since the dawn of the last century."
        </p>
        <div className="w-12 h-px bg-taj-gold mb-8" />
        <p className="font-garamond text-taj-offwhite/80 mb-6 leading-relaxed">
          Shamiana — The Taj Mahal Palace, Mumbai's legendary 24-hour all-day dining restaurant,
          and Mumbai's original coffee house, blending international comfort food with authentic
          local street fare.
        </p>
        <p className="font-garamond text-taj-offwhite/70 leading-relaxed">
          For over a century, Shamiana has been the heartbeat of The Taj Mahal Palace — a place
          where dignitaries, artists, and dreamers have gathered to share extraordinary meals.
          Every dish carries the weight of history and the warmth of genuine hospitality.
        </p>
        <div className="mt-10">
          <a
            href="/menu"
            className="font-cinzel text-xs tracking-[0.2em] text-taj-gold uppercase border border-taj-gold/50 
                       px-8 py-4 inline-block hover:bg-taj-gold hover:text-taj-dark transition-all duration-300"
          >
            Explore the Menu →
          </a>
        </div>
      </div>
    </section>
  );
}
