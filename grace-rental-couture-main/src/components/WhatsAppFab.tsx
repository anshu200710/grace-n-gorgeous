import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/8700501349"
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--burgundy)] text-[var(--gold)] border border-[var(--gold)]/50 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle size={22} />
      <span className="absolute inset-0 rounded-full border border-[var(--gold)]/60 animate-ping" />
    </a>
  );
}
