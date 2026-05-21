import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { sanityClient } from '../../lib/sanityClient';
import { SectionHeading, Reveal } from '@/components/Reveal';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  date?: string;
  imageUrl?: string;
}

export const Route = createFileRoute("/_site/blog")({
  head: () => ({ meta: [{ title: "Journal · Grace n Gorgeous" }, { name: "description", content: "Bridal fashion stories, styling guides, and celebrity edits." }], links: [{ rel: "canonical", href: "/blog" }] }),
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // If we have a slug in the path, show the detail page
  const hasSlug = location.pathname.includes('/blog/') && !location.pathname.endsWith('/blog');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(date desc) {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          category,
          "date": date,
          "imageUrl": mainImage.asset->url
        }`;
        const data = await sanityClient.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (hasSlug) {
    return <Outlet />;
  }

  if (loading) return <div className="text-center p-10">Loading gorgeous content...</div>;

  return (
    <div className="silk-bg">
      <section className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading eyebrow="The Journal" title="Letters from the atelier" sub="Stories of brides, weaves, and the rituals that make a wedding eternal." />
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((p, i) => (
            <Reveal key={p._id} delay={i*0.05}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--champagne)]">
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.4s]" />
                  )}
                </div>
                <div className="mt-5">
                  {(p.category || p.date) && (
                    <p className="label-eyebrow text-[var(--gold)]">{p.category}{p.category && p.date ? ' · ' : ''}{p.date}</p>
                  )}
                  <h3 className="text-display italic text-2xl text-[var(--burgundy)] mt-2 group-hover:text-[var(--gold)] transition">{p.title}</h3>
                  {p.excerpt && <p className="mt-3 text-sm text-[var(--muted-foreground)]">{p.excerpt}</p>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
