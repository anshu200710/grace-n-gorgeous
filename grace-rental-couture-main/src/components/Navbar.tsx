import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/bridal", label: "Bridal" },
  { to: "/lehengas", label: "Lehengas" },
  { to: "/sarees", label: "Sarees" },
  { to: "/rentals", label: "Rentals" },
  { to: "/celebrity", label: "Celebrity" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement */}
      <div className="bg-[var(--burgundy)] text-[var(--gold-soft)] text-[11px] tracking-[0.3em] uppercase py-2 text-center">
        Luxury Bridal Rentals · Free Styling Consultation · Premium Designer Couture
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-[var(--cream)]/95 backdrop-blur-md shadow-[0_8px_30px_-15px_rgba(0,0,0,0.15)]" : "bg-[var(--cream)]"
        }`}
      >
        <div className="border-b border-[var(--gold)]/20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-3 items-center h-20">
            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-7 text-[11px] tracking-[0.28em] uppercase text-[var(--burgundy)]">
              {NAV.slice(0, 4).map((n) => (
                <Link key={n.to} to={n.to} className="hover:text-[var(--gold)] transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
            <button className="lg:hidden text-[var(--burgundy)]" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>

            {/* Center logo */}
            <Link to="/" className="flex flex-col items-center justify-center group select-none">
              <Logo size={52} className="transition-transform duration-700 group-hover:scale-105" />
              <span
                className="flex flex-col items-center mt-1 text-[9px] sm:text-[11px] md:text-[12px] tracking-[0.45em] uppercase text-[var(--burgundy)] leading-tight"
              >
                <span className="flex flex-row items-center gap-1 sm:gap-1.5 md:gap-2">
                  <span className="">Grace</span>
                  <span className="text-script normal-case text-[var(--gold)] text-base md:text-lg mx-0.5 -my-1 leading-none">n</span>
                  <span className="">Gorgeous</span>
                </span>
              </span>
            </Link>

            {/* Right nav + icons */}
            <div className="flex items-center justify-end gap-6">
              <nav className="hidden lg:flex items-center gap-6 text-[11px] tracking-[0.28em] uppercase text-[var(--burgundy)]">
                {NAV.slice(4).map((n) => (
                  <Link key={n.to} to={n.to} className="hover:text-[var(--gold)] transition-colors">
                    {n.label}
                  </Link>
                ))}
              </nav>
              {/* <div className="flex items-center gap-3 text-[var(--burgundy)]">
                <button aria-label="Search" className="hover:text-[var(--gold)] transition"><Search size={18} /></button>
                <button aria-label="Wishlist" className="hover:text-[var(--gold)] transition hidden sm:inline"><Heart size={18} /></button>
                <button aria-label="Account" className="hover:text-[var(--gold)] transition hidden sm:inline"><User size={18} /></button>
                <button aria-label="Bag" className="hover:text-[var(--gold)] transition relative">
                  <ShoppingBag size={18} />
                  <span className="absolute -top-1 -right-2 bg-[var(--gold)] text-[var(--burgundy)] text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">2</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--cream)] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-[var(--gold)]/30">
            <Logo size={48} />
            <button onClick={() => setOpen(false)}><X size={24} /></button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 flex-1 text-[var(--burgundy)] text-2xl text-display">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="italic hover:text-[var(--gold)]">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
