import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/Reveal";

function makeListing(category: string, title: string, eyebrow: string, sub: string) {
  return function Listing() {
    const items = category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category.toLowerCase() === category);
    const list = items.length ? items : PRODUCTS;
    return (
      <div className="silk-bg">
        <section className="pt-20 pb-10 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <SectionHeading eyebrow={eyebrow} title={title} sub={sub} />
          </div>
        </section>
        <section className="pb-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {list.map((p, i) => <ProductCard key={p.slug + i} product={p} index={i} />)}
            {list.map((p, i) => <ProductCard key={"b" + p.slug + i} product={p} index={i} />)}
          </div>
        </section>
      </div>
    );
  };
}

export const Route = createFileRoute("/_site/bridal")({
  head: () => ({ meta: [{ title: "Bridal Lehengas · Grace n Gorgeous" }, { name: "description", content: "Royal bridal lehengas on rent — Sabyasachi inspired, hand-embroidered, polki-ready couture." }], links: [{ rel: "canonical", href: "/bridal" }] }),
  component: makeListing("bridal", "The Dulhan Edit", "Bridal Couture", "Hand-embroidered velvet, raw silk and zardozi lehengas — for the bride who walks like royalty."),
});
