import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Crown, Sparkles, Truck } from "lucide-react";
import hero from "@/assets/hero-bride.jpg";
import celeb from "@/assets/celebrity-banner.jpg";
import { COLLECTIONS, PRODUCTS } from "@/lib/catalog";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { RecentPosts } from "@/components/RecentPosts";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Grace n Gorgeous · Luxury Indian Bridal Rental Couture" },
      { name: "description", content: "A heritage rental atelier of bridal lehengas, designer sarees and royal Indian couture. Wear couture worth lakhs, for a fraction." },
      { property: "og:title", content: "Grace n Gorgeous · Luxury Indian Bridal Rental Couture" },
      { property: "og:description", content: "Royal bridal rentals · Sabyasachi-inspired heritage couture." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden silk-bg">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              className="gold-divider label-eyebrow"
            >
              The Heritage Atelier
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1 }}
              className="text-display text-[var(--burgundy)] mt-6 leading-[0.95] text-[clamp(2.8rem,6vw,5.5rem)]"
            >
              Wear the <span className="italic">couture</span><br />
              of <span className="text-script text-[var(--gold)] text-[1.4em] leading-none">queens</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="mt-7 text-[var(--muted-foreground)] max-w-md leading-relaxed text-[15px]"
            >
              India's most loved rental atelier for bridal lehengas and royal designer sarees.
              Sabyasachi-inspired silhouettes, polki bridal couture and editorial-worthy drapes —
              curated for the moments that matter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.55 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link to="/bridal" className="btn-royal">Explore Bridal <ArrowRight size={14} /></Link>
              <Link to="/appointment" className="btn-ghost-gold">Book Appointment</Link>
            </motion.div>
            <div className="mt-12 flex items-center gap-8 text-[var(--burgundy)]">
              <Stat n="500+" l="Couture Pieces" />
              <span className="w-px h-10 bg-[var(--gold)]/40" />
              <Stat n="12K+" l="Happy Brides" />
              <span className="w-px h-10 bg-[var(--gold)]/40" />
              <Stat n="98%" l="5★ Reviews" />
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="arch-frame relative gold-border bg-[var(--champagne)] aspect-[3/4] max-w-[480px] mx-auto vignette">
                <img src={hero} alt="Bridal couture" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -left-2 lg:-left-10 top-10 bg-[var(--cream)] border border-[var(--gold)]/40 px-5 py-4 shadow-[var(--shadow-soft)] hidden md:block"
              >
                <p className="label-eyebrow text-[var(--gold)]">Signature</p>
                <p className="text-display italic text-[var(--burgundy)] text-xl">Rani Zardozi</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">₹18,500 / 4 days</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 7, delay: 1 }}
                className="absolute -right-2 lg:-right-6 bottom-12 bg-[var(--burgundy)] text-[var(--cream)] px-5 py-4 hidden md:flex items-center gap-3"
              >
                <Crown className="text-[var(--gold)]" size={20} />
                <div>
                  <p className="label-eyebrow text-[var(--gold)]">Worn by</p>
                  <p className="text-sm">12,000+ brides</p>
                </div>
              </motion.div>
            </motion.div>

            {/* decorative arch */}
            <div aria-hidden className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.06]">
              <div className="w-[120%] h-[120%] arch-frame bg-[var(--burgundy)]" />
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-[var(--gold)]/30 bg-[var(--burgundy)]/95 text-[var(--gold-soft)] overflow-hidden">
          <div className="flex gap-12 py-4 whitespace-nowrap animate-[shimmer_30s_linear_infinite] text-script text-2xl">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                Sabyasachi inspired · <Sparkles size={18} className="inline" /> Heritage Couture · <Crown size={18} className="inline" /> Royal Rentals · Editorial Brides ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="Featured Collections" title="The Curated Edits" sub="Six worlds of couture, each draped in heritage and hand-crafted opulence." />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <Link to={`/${c.slug}` as "/bridal"} className="group block relative overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden bg-[var(--champagne)]">
                    <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--burgundy)]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-[var(--cream)]">
                    <p className="label-eyebrow text-[var(--gold)]">{c.tagline}</p>
                    <h3 className="text-display italic text-3xl mt-1">{c.title}</h3>
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase mt-3 border-b border-[var(--gold)] pb-1">
                      Discover <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RENTAL PROCESS */}
      <section className="py-24 royal-bg text-[var(--cream)] relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="gold-divider label-eyebrow text-[var(--gold)]">The Atelier Experience</span>
            <h2 className="text-display italic text-4xl md:text-5xl mt-4">A bridal rental, gracefully done</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { i: <Sparkles />, t: "Select Outfit", d: "Browse curated couture or visit our atelier for a private styling consultation." },
              { i: <Calendar />, t: "Book Dates", d: "Reserve your dream piece with flexible 3–5 day rental windows." },
              { i: <Crown />, t: "Get Styled", d: "Complimentary fittings, jewelry pairing and styling notes from our atelier." },
              { i: <Truck />, t: "Return Easily", d: "We handle dry-cleaning. Pickup at your doorstep, on your wedding date." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className="border border-[var(--gold)]/40 p-8 text-center bg-[var(--burgundy)]/40 backdrop-blur-sm h-full hover:border-[var(--gold)] transition">
                  <div className="w-14 h-14 border border-[var(--gold)] rounded-full flex items-center justify-center mx-auto text-[var(--gold)]">{s.i}</div>
                  <p className="label-eyebrow text-[var(--gold)] mt-5">Step 0{i + 1}</p>
                  <h3 className="text-display italic text-2xl mt-2">{s.t}</h3>
                  <p className="text-sm text-[var(--cream)]/75 mt-3 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="gold-divider label-eyebrow">New Arrivals</span>
              <h2 className="text-display italic text-4xl md:text-5xl text-[var(--burgundy)] mt-3">Fresh from the atelier</h2>
            </div>
            <Link to="/rentals" className="btn-ghost-gold self-start md:self-end">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {PRODUCTS.slice(0, 8).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* RECENT BLOG POSTS */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="gold-divider label-eyebrow">From the Blog</span>
              <h2 className="text-display italic text-4xl md:text-5xl text-[var(--burgundy)] mt-3">Recent Blog Posts</h2>
            </div>
            <Link to="/blog" className="btn-ghost-gold self-start md:self-end">View All</Link>
          </div>
          <RecentPosts />
        </div>
      </section>

      {/* CELEBRITY BANNER */}
      <section className="relative py-32 overflow-hidden">
        <img src={celeb} alt="Celebrity look" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--burgundy)]/90 via-[var(--burgundy)]/60 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-[var(--cream)]">
          <div className="max-w-xl">
            <span className="gold-divider label-eyebrow text-[var(--gold)]">As seen on</span>
            <h2 className="text-display italic text-5xl md:text-6xl mt-5 leading-[1.05]">
              The looks loved by <span className="text-script text-[var(--gold)] text-[1.3em]">stars</span>
            </h2>
            <p className="mt-5 text-[var(--cream)]/80 leading-relaxed">
              From Bollywood weddings to magazine covers — recreate the editorial moments
              that defined the season, draped on you.
            </p>
            <Link to="/celebrity" className="btn-royal mt-8">Explore Celebrity Looks</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 silk-bg">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <Logo size={70} className="mx-auto" />
          <span className="gold-divider label-eyebrow mt-4 inline-flex">Our Story</span>
          <h2 className="text-display italic text-[var(--burgundy)] text-4xl md:text-5xl mt-5">
            A heritage of couture, gracefully shared
          </h2>
          <p className="mt-7 text-[var(--muted-foreground)] leading-[1.9] text-[15px] max-w-2xl mx-auto">
            Born from a love for India's textile heritage, Grace n Gorgeous is a luxury rental
            atelier reimagining how brides experience couture. Each piece is hand-selected,
            preserved with care and styled with the same intention as a one-of-one bespoke gown.
          </p>
          <Link to="/about" className="btn-ghost-gold mt-9">Read Our Story</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[var(--champagne)]/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="Bridal Whispers" title="From the brides who wore us" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "Aanya M.", c: "Mumbai", q: "I felt like a queen walking down the aisle. The Rani Zardozi lehenga was beyond anything I imagined renting." },
              { n: "Ishita R.", c: "Hyderabad", q: "From the styling consultation to the dry-cleaning return, every detail felt thoughtful and luxurious." },
              { n: "Tanvi K.", c: "Delhi", q: "My reception saree got more compliments than I can count. The fabric, the fall, the embroidery — pure couture." },
            ].map((t, i) => (
              <Reveal key={t.n} delay={i * 0.08}>
                <div className="bg-[var(--cream)] p-9 border border-[var(--gold)]/30 h-full relative">
                  <div className="text-script text-7xl text-[var(--gold)]/40 absolute top-3 left-4 leading-none">"</div>
                  <p className="text-[var(--burgundy)] text-display italic text-xl leading-relaxed relative">{t.q}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="w-10 h-px bg-[var(--gold)]" />
                    <div>
                      <p className="text-sm text-[var(--burgundy)] font-medium">{t.n}</p>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted-foreground)]">{t.c}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="@gracengorgeous" title="On the gram" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[...PRODUCTS, ...PRODUCTS].slice(0, 12).map((p, i) => (
              <a key={i} href="#" className="aspect-square overflow-hidden bg-[var(--champagne)] group block relative">
                <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-[var(--burgundy)]/0 group-hover:bg-[var(--burgundy)]/40 transition" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 silk-bg">
        <div className="max-w-3xl mx-auto px-6 text-center border border-[var(--gold)]/50 p-12 bg-[var(--cream)]">
          <Logo size={56} className="mx-auto" />
          <h3 className="text-display italic text-3xl md:text-4xl text-[var(--burgundy)] mt-5">
            Join the atelier circle
          </h3>
          <p className="text-[var(--muted-foreground)] mt-3 text-sm">
            Early access to new couture drops, private bridal previews and styling letters.
          </p>
          <form className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required placeholder="Your email"
              className="flex-1 bg-transparent border border-[var(--gold)]/50 px-5 py-3 text-sm text-[var(--burgundy)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--gold)]" />
            <button type="submit" className="btn-royal">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-display italic text-3xl text-[var(--burgundy)]">{n}</div>
      <div className="label-eyebrow text-[var(--muted-foreground)] mt-1">{l}</div>
    </div>
  );
}
