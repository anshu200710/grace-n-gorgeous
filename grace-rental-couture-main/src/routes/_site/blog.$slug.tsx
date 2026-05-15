import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POSTS } from "./blog";

export const Route = createFileRoute("/_site/blog/$slug")({
  loader: ({ params }) => {
    const p = POSTS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Link to="/blog" className="btn-royal">Back to Journal</Link>
    </div>
  ),
  head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.title} · Journal` }, { name: "description", content: loaderData.excerpt }, { property: "og:image", content: loaderData.image }] : [] }),
  component: Post,
});

function Post() {
  const p = Route.useLoaderData();
  return (
    <article className="silk-bg pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16 text-center">
        <p className="label-eyebrow text-[var(--gold)]">{p.category} · {p.date}</p>
        <h1 className="text-display italic text-5xl md:text-6xl text-[var(--burgundy)] mt-4">{p.title}</h1>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="aspect-[16/9] overflow-hidden gold-border">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 mt-12 text-[var(--burgundy)]/85 text-[17px] leading-[1.95] text-display">
        <p className="first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:text-[var(--gold)] first-letter:font-light first-letter:leading-[0.9] first-letter:italic">
          {p.excerpt} A wedding wardrobe is a quiet manifesto — of who you are, where you come from,
          and how you want to be remembered. At Grace n Gorgeous, we obsess over every detail, from
          the weight of a velvet to the fall of a dupatta.
        </p>
        <p className="mt-6">
          This season, our atelier curators have been drawn back to heritage red — a deep, regal maroon
          revived through Sabyasachi-inspired silhouettes, hand-set polki and zardozi that catches
          candlelight like it was made for it.
        </p>
        <h2 className="text-display italic text-3xl text-[var(--burgundy)] mt-10">Three looks to try</h2>
        <p className="mt-4">
          From a velvet anarkali for a winter sangeet to an organza saree for a beach reception —
          we share three styling notes from our private bridal sessions this month.
        </p>
        <p className="mt-6">
          Renting couture is, in our quiet opinion, the most considered way to wear opulence.
          You step into a piece that was hand-embroidered for months, you wear it gloriously,
          and you let it travel onward to another bride who will love it as much as you did.
        </p>
        <div className="mt-12 text-center">
          <Link to="/blog" className="btn-ghost-gold">Back to Journal</Link>
        </div>
      </div>
    </article>
  );
}
