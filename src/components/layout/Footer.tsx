export default function Footer() {
  return (
    <footer className="bg-[#0D0A07] border-t border-taj-gold/20 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <span className="font-cinzel text-2xl tracking-[0.15em] text-taj-offwhite block mb-4">TAJ</span>
            <p className="font-garamond italic text-taj-offwhite/50 text-sm leading-relaxed">
              Shamiana — The Taj Mahal Palace, Mumbai's legendary 24-hour all-day dining restaurant, 
              and Mumbai's original coffee house.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <p className="font-cinzel text-[10px] tracking-[0.2em] text-taj-gold uppercase mb-4">Dining</p>
              {['Menu', 'Reservations', 'Private Dining'].map((item) => (
                <p key={item} className="font-garamond text-taj-offwhite/50 text-sm mb-2 hover:text-taj-offwhite/80 cursor-pointer transition-colors">{item}</p>
              ))}
            </div>
            <div>
              <p className="font-cinzel text-[10px] tracking-[0.2em] text-taj-gold uppercase mb-4">Contact</p>
              <p className="font-garamond text-taj-offwhite/50 text-sm mb-2">Apollo Bunder, Mumbai</p>
              <p className="font-garamond text-taj-offwhite/50 text-sm mb-2">Maharashtra 400001</p>
              <p className="font-garamond text-taj-offwhite/50 text-sm">+91 22 6665 3366</p>
            </div>
          </div>
        </div>
        <div className="border-t border-taj-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cinzel text-[10px] tracking-[0.15em] text-taj-offwhite/30 uppercase">
            © 2025 The Taj Mahal Palace, Mumbai. All rights reserved.
          </p>
          <p className="font-garamond italic text-taj-offwhite/20 text-xs">Est. 1903</p>
        </div>
      </div>
    </footer>
  );
}
