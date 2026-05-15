import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/_site/rentals")({
  head: () => ({ meta: [{ title: "Rental Collection · Grace n Gorgeous" }, { name: "description", content: "Browse our complete rental couture collection." }], links: [{ rel: "canonical", href: "/rentals" }] }),
  component: () => (
    <div className="silk-bg">
      <section className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading eyebrow="The Rental Atelier" title="Curated Couture, Worn Beautifully" sub="Every piece in our atelier — bridal, reception, mehendi, haldi and beyond." />
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {[...PRODUCTS, ...PRODUCTS].map((p, i) => <ProductCard key={p.slug + i} product={p} index={i} />)}
        </div>
      </section>
    </div>
  ),
});
