import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({ meta: [{ title: "Contact · Grace n Gorgeous" }, { name: "description", content: "Visit our atelier or reach us via WhatsApp." }], links: [{ rel: "canonical", href: "/contact" }] }),
  component: () => (
    <div className="silk-bg py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14">
        <div>
          <Logo size={64} />
          <span className="label-eyebrow text-[var(--gold)] mt-6 block">Get in touch</span>
          <h1 className="text-display italic text-5xl text-[var(--burgundy)] mt-3">Visit our atelier</h1>
          <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
            By appointment only. Step into a private salon experience with our head curator.
          </p>
          <div className="mt-9 space-y-5 text-[var(--burgundy)]">
            <Row icon={<MapPin />} label="Atelier" value="14, Heritage Lane, Banjara Hills, Hyderabad 500034" />
            <Row icon={<Phone />} label="Phone" value="+91 98765 43210" />
            <Row icon={<Mail />} label="Email" value="hello@gracengorgeous.com" />
            <Row icon={<MessageCircle />} label="WhatsApp" value="+91 98765 43210" />
            <Row icon={<Instagram />} label="Instagram" value="@gracengorgeous" />
          </div>
        </div>
        <div className="bg-[var(--cream)] border border-[var(--gold)]/40 p-10">
          <h2 className="text-display italic text-3xl text-[var(--burgundy)]">Send a message</h2>
          <form className="mt-7 space-y-5">
            <Field label="Name" />
            <Field label="Email" type="email" />
            <Field label="Phone" />
            <div>
              <label className="label-eyebrow text-[var(--gold)] block mb-2">Message</label>
              <textarea rows={5} className="w-full bg-transparent border border-[var(--gold)]/40 px-4 py-3 text-sm focus:outline-none focus:border-[var(--burgundy)]" />
            </div>
            <button type="submit" className="btn-royal w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  ),
});

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="w-10 h-10 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shrink-0">{icon}</span>
      <div>
        <p className="label-eyebrow text-[var(--muted-foreground)]">{label}</p>
        <p className="mt-1">{value}</p>
      </div>
    </div>
  );
}
function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="label-eyebrow text-[var(--gold)] block mb-2">{label}</label>
      <input type={type} className="w-full bg-transparent border border-[var(--gold)]/40 px-4 py-3 text-sm focus:outline-none focus:border-[var(--burgundy)]" />
    </div>
  );
}
