import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/_site/sarees")({
  head: () => ({ meta: [{ title: "Designer Sarees · Grace n Gorgeous" }, { name: "description", content: "Banarasi, tussar and heritage designer sarees on rent." }], links: [{ rel: "canonical", href: "/sarees" }] }),
  component: () => {
    const items = PRODUCTS.filter((p) => p.category === "Saree");
    const list = [...items, ...PRODUCTS, ...items];
    return (
      <div className="silk-bg">
        <section className="pt-20 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <SectionHeading eyebrow="Drape Heritage" title="The Saree Atelier" sub="Pure Banarasi, tussar silk and heirloom drapes — woven by master craftsmen." />
          </div>
        </section>
        <section className="pb-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {list.map((p, i) => <ProductCard key={p.slug + i} product={p} index={i} />)}
          </div>
        </section>
      </div>
    );
  },
});
