import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { SectionHeading, Reveal } from "@/components/Reveal";

export const POSTS = [
  { slug: "bridal-lehenga-trends-2026", title: "Bridal Lehenga Trends Defining 2026", excerpt: "Velvet revival, antique gold and the return of the heritage red.", category: "Bridal", date: "May 12, 2026", image: PRODUCTS[0].image },
  { slug: "how-to-drape-banarasi", title: "The Art of Draping a Banarasi Saree", excerpt: "A step-by-step heritage guide from our atelier curator.", category: "Saree Styling", date: "May 02, 2026", image: PRODUCTS[1].image },
  { slug: "celebrity-wedding-edit", title: "Inside the Celebrity Wedding Edit", excerpt: "The looks that broke the internet, and how to recreate them.", category: "Celebrity", date: "Apr 22, 2026", image: PRODUCTS[5].image },
  { slug: "rent-vs-buy-couture", title: "Rent or Buy: A Modern Bride's Guide", excerpt: "Why renting couture is the most considered way to wear opulence.", category: "Rental Tips", date: "Apr 10, 2026", image: PRODUCTS[2].image },
  { slug: "haldi-mehendi-color-guide", title: "Haldi & Mehendi Color Guide", excerpt: "From marigold mustard to emerald — pick your palette.", category: "Wedding Trends", date: "Mar 28, 2026", image: PRODUCTS[3].image },
  { slug: "lehenga-fitting-guide", title: "The Perfect Lehenga Fit", excerpt: "What to look for, and how our atelier handles bridal alterations.", category: "Lehenga Guides", date: "Mar 14, 2026", image: PRODUCTS[7].image },
];

export const Route = createFileRoute("/_site/blog")({
  head: () => ({ meta: [{ title: "Journal · Grace n Gorgeous" }, { name: "description", content: "Bridal fashion stories, styling guides, and celebrity edits." }], links: [{ rel: "canonical", href: "/blog" }] }),
  component: () => (
    <div className="silk-bg">
      <section className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading eyebrow="The Journal" title="Letters from the atelier" sub="Stories of brides, weaves, and the rituals that make a wedding eternal." />
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={i*0.05}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--champagne)]">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.4s]" />
                </div>
                <div className="mt-5">
                  <p className="label-eyebrow text-[var(--gold)]">{p.category} · {p.date}</p>
                  <h3 className="text-display italic text-2xl text-[var(--burgundy)] mt-2 group-hover:text-[var(--gold)] transition">{p.title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted-foreground)]">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  ),
});
