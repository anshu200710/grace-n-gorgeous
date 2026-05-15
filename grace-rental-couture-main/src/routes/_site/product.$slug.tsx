import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Heart, MessageCircle, ShoppingBag, Star, Truck, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_site/product/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-display italic text-4xl text-[var(--burgundy)]">Piece not found</h1>
      <Link to="/rentals" className="btn-royal mt-6">Back to Atelier</Link>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} · Grace n Gorgeous` },
      { name: "description", content: `Rent the ${loaderData.name} — ${loaderData.fabric}.` },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  component: Product,
});

function Product() {
  const product = Route.useLoaderData();
  const [days, setDays] = useState(4);
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="silk-bg">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-24">
        <nav className="text-[11px] tracking-[0.3em] uppercase text-[var(--muted-foreground)] mb-6">
          <Link to="/" className="hover:text-[var(--burgundy)]">Home</Link> / <Link to="/rentals" className="hover:text-[var(--burgundy)]">Rentals</Link> / <span className="text-[var(--burgundy)]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1 flex flex-col gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-[3/4] bg-[var(--champagne)] overflow-hidden cursor-pointer hover:opacity-80 transition border border-transparent hover:border-[var(--gold)]">
                  <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="col-span-4 aspect-[3/4] gold-border bg-[var(--champagne)] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.6s]" />
            </div>
          </div>

          <div>
            <p className="label-eyebrow text-[var(--gold)]">{product.category} · {product.color}</p>
            <h1 className="text-display italic text-[var(--burgundy)] text-5xl mt-2">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <div className="flex text-[var(--gold)]">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} fill="currentColor" />)}</div>
              <span className="text-[var(--muted-foreground)]">128 reviews</span>
            </div>

            <div className="mt-7 flex items-baseline gap-4">
              <span className="text-display text-4xl text-[var(--burgundy)]">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-[var(--muted-foreground)]">/ {product.duration} rental</span>
              <span className="text-xs text-[var(--muted-foreground)] line-through">Retail ₹{product.retail.toLocaleString("en-IN")}</span>
            </div>

            <p className="mt-7 text-[var(--muted-foreground)] leading-relaxed">
              A signature piece from our heritage atelier. Hand-embroidered with antique gold zardozi
              on luxurious {product.fabric.toLowerCase()}, this {product.category.toLowerCase()} is
              styled with curated polki jewelry and a hand-bordered dupatta.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-y-3 text-sm border-y border-[var(--gold)]/30 py-5">
              <Detail k="Fabric" v={product.fabric} />
              <Detail k="Color" v={product.color} />
              <Detail k="Wash" v="Dry-clean (included)" />
              <Detail k="Includes" v="Lehenga · Blouse · Dupatta" />
            </div>

            <div className="mt-7">
              <p className="label-eyebrow mb-3">Rental Duration</p>
              <div className="flex gap-2">
                {[3, 4, 5, 7].map((d) => (
                  <button key={d} onClick={() => setDays(d)} className={`px-5 py-2 text-sm border transition ${days === d ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]" : "border-[var(--gold)]/50 text-[var(--burgundy)] hover:border-[var(--burgundy)]"}`}>
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="label-eyebrow mb-3">Size</p>
              <div className="flex gap-2">
                {["XS","S","M","L","XL"].map(s => <button key={s} className="w-11 h-11 border border-[var(--gold)]/50 hover:border-[var(--burgundy)] hover:bg-[var(--burgundy)] hover:text-[var(--cream)] text-sm transition">{s}</button>)}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <button className="btn-royal flex-1 min-w-[180px]"><ShoppingBag size={14} /> Add to Bag</button>
              <button className="btn-ghost-gold"><Heart size={14} /> Save</button>
              <a href="https://wa.me/919876543210" className="btn-ghost-gold"><MessageCircle size={14} /> WhatsApp</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-[var(--burgundy)]">
              <div className="flex items-center gap-2 border border-[var(--gold)]/30 p-3"><Truck size={16} className="text-[var(--gold)]" /> Free pan-India delivery</div>
              <div className="flex items-center gap-2 border border-[var(--gold)]/30 p-3"><Sparkles size={16} className="text-[var(--gold)]" /> Dry-clean included</div>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-display italic text-3xl md:text-4xl text-[var(--burgundy)]">You may also love</h2>
            <Link to="/rentals" className="btn-ghost-gold">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="label-eyebrow text-[var(--gold)]">{k}</div>
      <div className="text-[var(--burgundy)] mt-1">{v}</div>
    </div>
  );
}
