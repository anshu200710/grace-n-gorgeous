import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="royal-bg text-[var(--cream)] mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid lg:grid-cols-4 gap-12 pb-16 border-b border-[var(--gold)]/30">
          <div>
            <div className="bg-[var(--cream)] inline-flex p-3 rounded-sm">
              <Logo size={70} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--cream)]/80 max-w-xs">
              A heritage rental atelier curating royal Indian couture for brides, families and celebrations of a lifetime.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 border border-[var(--gold)]/40 flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--burgundy)] transition"><Instagram size={16} /></a>
              <a href="#" className="w-10 h-10 border border-[var(--gold)]/40 flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--burgundy)] transition"><MessageCircle size={16} /></a>
            </div>
          </div>
          <div>
            <h4 className="label-eyebrow text-[var(--gold)] mb-5">Atelier</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[var(--gold)]">Our Heritage</Link></li>
              <li><Link to="/celebrity" className="hover:text-[var(--gold)]">Celebrity Looks</Link></li>
              <li><Link to="/gallery" className="hover:text-[var(--gold)]">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--gold)]">Journal</Link></li>
              <li><Link to="/appointment" className="hover:text-[var(--gold)]">Private Appointment</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="label-eyebrow text-[var(--gold)] mb-5">Collections</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/bridal" className="hover:text-[var(--gold)]">Bridal Lehengas</Link></li>
              <li><Link to="/sarees" className="hover:text-[var(--gold)]">Designer Sarees</Link></li>
              <li><Link to="/rentals" className="hover:text-[var(--gold)]">Rental Edit</Link></li>
              <li><Link to="/lehengas" className="hover:text-[var(--gold)]">Reception Lehengas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="label-eyebrow text-[var(--gold)] mb-5">Visit</h4>
            <ul className="space-y-3 text-sm text-[var(--cream)]/85">
              <li className="flex gap-2"><MapPin size={16} className="text-[var(--gold)] mt-0.5" /> 1/6665, 1/6666, Near Kabul Nagar, Gurudwara, Rohtash Nagar, Shahdara, Delhi-110032</li>
              <li className="flex gap-2"><Phone size={16} className="text-[var(--gold)] mt-0.5" /> 8700501349</li>
              <li className="flex gap-2"><Mail size={16} className="text-[var(--gold)] mt-0.5" /> grace.n.gorgeous25@gmail.com</li>
            </ul>
            <p className="mt-6 text-xs text-[var(--cream)]/60 tracking-widest uppercase">By appointment only</p>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--cream)]/60">
          <p>© {new Date().getFullYear()} Grace n Gorgeous Rental Outfits. All Rights Reserved.</p>
          <p className="tracking-[0.3em] uppercase text-[var(--gold)]/80">Crafted with heritage · worn with grace</p>
        </div>
      </div>
    </footer>
  );
}
