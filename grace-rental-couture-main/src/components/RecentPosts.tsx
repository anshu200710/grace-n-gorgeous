import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { sanityClient } from '../lib/sanityClient';
import { Reveal } from './Reveal';
import { ArrowRight } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  excerpt?: string;
  category?: string;
  date?: string;
}

export function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "post"] | order(date desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      excerpt,
      category,
      date
    }`;
    sanityClient.fetch(query).then((data) => {
      setPosts(data);
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching posts:", err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-8">Loading articles...</div>;
  if (posts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="label-eyebrow text-[var(--gold)]">The Journal</p>
            <h2 className="text-display text-3xl lg:text-4xl font-bold text-[var(--burgundy)] mt-2">Recent Stories</h2>
          </div>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--burgundy)] text-white rounded hover:bg-[var(--burgundy)]/90 transition hidden md:flex"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Reveal key={post._id} delay={i * 0.1}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[var(--champagne)] rounded-lg">
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <div className="mt-5">
                  {post.category && (
                    <p className="label-eyebrow text-[var(--gold)]">
                      {post.category.replace('-', ' ').toUpperCase()}
                    </p>
                  )}
                  <h3 className="text-display italic text-xl lg:text-2xl text-[var(--burgundy)] mt-2 group-hover:text-[var(--gold)] transition leading-tight">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-3 text-sm text-[var(--muted-foreground)] line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.date && (
                    <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden flex justify-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--burgundy)] text-white rounded hover:bg-[var(--burgundy)]/90 transition"
          >
            View All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
