import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/_site/lehengas")({
  head: () => ({ meta: [{ title: "Designer Lehengas · Grace n Gorgeous" }, { name: "description", content: "Reception, sangeet and engagement lehengas on rent." }], links: [{ rel: "canonical", href: "/lehengas" }] }),
  component: () => (
    <div className="silk-bg">
      <section className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading eyebrow="Designer Lehengas" title="Reception & Sangeet" sub="Modern silhouettes, organza shimmer, and editorial drama for every wedding moment." />
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {PRODUCTS.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>
    </div>
  ),
});
