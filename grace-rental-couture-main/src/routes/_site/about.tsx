import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import bridal from "@/assets/col-bridal.jpg";
import saree from "@/assets/col-saree.jpg";

export const Route = createFileRoute("/_site/about")({
  head: () => ({ meta: [{ title: "About · Grace n Gorgeous" }, { name: "description", content: "The heritage atelier story." }], links: [{ rel: "canonical", href: "/about" }] }),
  component: () => (
    <div className="silk-bg">
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Logo size={80} className="mx-auto" />
          <span className="gold-divider label-eyebrow mt-6 inline-flex">Est. 2018 · Hyderabad</span>
          <h1 className="text-display italic text-5xl md:text-6xl text-[var(--burgundy)] mt-5">
            A heritage atelier, gracefully woven
          </h1>
          <p className="mt-7 text-[var(--muted-foreground)] leading-[1.9]">
            Grace n Gorgeous was born from a quiet rebellion — that the most exquisite couture should not
            sit in a wardrobe for a single evening. We curate India's finest rental atelier of bridal lehengas,
            heritage sarees and royal occasion wear, allowing every bride and guest to wear couture worth
            lakhs, beautifully.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="arch-frame gold-border aspect-[3/4] overflow-hidden">
              <img src={bridal} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="label-eyebrow text-[var(--gold)]">The Philosophy</span>
            <h2 className="text-display italic text-4xl text-[var(--burgundy)] mt-3">Couture, considered.</h2>
            <p className="mt-5 text-[var(--muted-foreground)] leading-[1.9]">
              Every piece is hand-selected by our atelier curators — designers we love, weaves we cherish,
              and silhouettes that move with grace. We preserve each garment with care so it reaches you
              looking as exquisite as the first wear.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="label-eyebrow text-[var(--gold)]">The Experience</span>
            <h2 className="text-display italic text-4xl text-[var(--burgundy)] mt-3">A private bridal salon.</h2>
            <p className="mt-5 text-[var(--muted-foreground)] leading-[1.9]">
              Step into our Hyderabad atelier for a private styling appointment — silk swatches, bridal
              tea, and three hours of styling with our head curator. Or experience us virtually,
              from anywhere in the world.
            </p>
            <Link to="/appointment" className="btn-royal mt-8">Book a Consultation</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="arch-frame gold-border aspect-[3/4] overflow-hidden">
              <img src={saree} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  ),
});
