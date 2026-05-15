import { createFileRoute } from "@tanstack/react-router";
import celeb from "@/assets/celebrity-banner.jpg";
import { PRODUCTS } from "@/lib/catalog";
import { Reveal, SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/_site/celebrity")({
  head: () => ({ meta: [{ title: "Celebrity Looks · Grace n Gorgeous" }, { name: "description", content: "Recreate red carpet and Bollywood bridal moments." }], links: [{ rel: "canonical", href: "/celebrity" }] }),
  component: () => (
    <div className="silk-bg">
      <section className="relative h-[60vh] overflow-hidden">
        <img src={celeb} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--burgundy)] via-[var(--burgundy)]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center text-[var(--cream)] px-6">
          <span className="gold-divider label-eyebrow text-[var(--gold)]">As Seen On</span>
          <h1 className="text-display italic text-5xl md:text-7xl mt-4">Celebrity Looks</h1>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="Editorial Moments" title="Worn on Magazines & Weddings" />
          <div className="grid md:grid-cols-2 gap-10">
            {PRODUCTS.slice(0,6).map((p,i) => (
              <Reveal key={p.slug} delay={i*0.05}>
                <div className="grid grid-cols-5 gap-6 items-center">
                  <div className="col-span-2 aspect-[3/4] overflow-hidden gold-border">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition duration-1000" />
                  </div>
                  <div className="col-span-3">
                    <p className="label-eyebrow text-[var(--gold)]">Vogue India · 2025</p>
                    <h3 className="text-display italic text-3xl text-[var(--burgundy)] mt-2">{p.name}</h3>
                    <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Featured on the cover of our seasonal editorial — paired with hand-set polki and an
                      antique gold maang tikka. Available to rent at the atelier.
                    </p>
                    <p className="mt-4 text-[var(--burgundy)]">₹{p.price.toLocaleString("en-IN")} <span className="text-xs text-[var(--muted-foreground)]">/ {p.duration}</span></p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  ),
});
