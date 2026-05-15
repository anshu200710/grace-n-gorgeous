import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/catalog";
import { SectionHeading } from "@/components/Reveal";

export const Route = createFileRoute("/_site/gallery")({
  head: () => ({ meta: [{ title: "Gallery · Grace n Gorgeous" }, { name: "description", content: "An editorial gallery of our atelier brides." }], links: [{ rel: "canonical", href: "/gallery" }] }),
  component: () => {
    const imgs = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((p) => p.image);
    return (
      <div className="silk-bg">
        <section className="pt-20 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <SectionHeading eyebrow="The Gallery" title="Our brides, framed forever" />
          </div>
        </section>
        <section className="pb-24">
          <div className="max-w-[1500px] mx-auto px-3 columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {imgs.map((src, i) => (
              <div key={i} className={`mb-3 break-inside-avoid overflow-hidden bg-[var(--champagne)] ${i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition duration-[1.6s]" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  },
});
