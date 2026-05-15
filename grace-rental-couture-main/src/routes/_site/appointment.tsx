import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/_site/appointment")({
  head: () => ({ meta: [{ title: "Book Appointment · Grace n Gorgeous" }, { name: "description", content: "Book a private bridal styling consultation." }], links: [{ rel: "canonical", href: "/appointment" }] }),
  component: () => (
    <div className="silk-bg py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <Logo size={64} className="mx-auto" />
          <span className="gold-divider label-eyebrow mt-5 inline-flex">Private Salon</span>
          <h1 className="text-display italic text-5xl md:text-6xl text-[var(--burgundy)] mt-4">Book your appointment</h1>
          <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto">
            A 90-minute private styling session with our head curator — silk swatches, bridal tea,
            and three hand-curated looks just for you.
          </p>
        </div>
        <form className="mt-12 bg-[var(--cream)] border border-[var(--gold)]/40 p-10 grid sm:grid-cols-2 gap-5">
          <Field label="Bride's Name" />
          <Field label="Phone / WhatsApp" />
          <Field label="Email" type="email" />
          <Field label="Wedding Date" type="date" />
          <Field label="Preferred Atelier Date" type="date" />
          <div>
            <label className="label-eyebrow text-[var(--gold)] block mb-2">Occasion</label>
            <select className="w-full bg-transparent border border-[var(--gold)]/40 px-4 py-3 text-sm focus:outline-none focus:border-[var(--burgundy)]">
              <option>Bridal</option><option>Reception</option><option>Sangeet</option><option>Mehendi</option><option>Haldi</option><option>Other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label-eyebrow text-[var(--gold)] block mb-2">Notes for our curator</label>
            <textarea rows={4} className="w-full bg-transparent border border-[var(--gold)]/40 px-4 py-3 text-sm focus:outline-none focus:border-[var(--burgundy)]" />
          </div>
          <button className="btn-royal sm:col-span-2 mt-2">Reserve My Appointment</button>
        </form>
      </div>
    </div>
  ),
});
function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="label-eyebrow text-[var(--gold)] block mb-2">{label}</label>
      <input type={type} className="w-full bg-transparent border border-[var(--gold)]/40 px-4 py-3 text-sm focus:outline-none focus:border-[var(--burgundy)]" />
    </div>
  );
}
