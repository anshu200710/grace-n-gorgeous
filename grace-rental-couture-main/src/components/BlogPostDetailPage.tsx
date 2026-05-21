
import { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { sanityClient } from '../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';

interface Post {
  title: string;
  body: any;
  imageUrl?: string;
  category?: string;
  date?: string;
  excerpt?: string;
}

export function BlogPostDetailPage() {
  // Get slug from params
  const { slug } = useParams({ from: '/_site/blog/$slug' });
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No slug provided');
      setLoading(false);
      return;
    }

    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      "imageUrl": mainImage.asset->url,
      category,
      date,
      excerpt
    }`;
    
    console.log('Fetching post with slug:', slug);
    console.log('Query:', query);

    sanityClient.fetch(query, { slug }).then((data) => {
      console.log('Fetched data:', data);
      setPost(data);
      setLoading(false);
    }).catch((err) => {
      console.error("Error fetching post:", err);
      setError(err.message);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="p-10 text-center">Loading article...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>;
  if (!post) return <div className="p-10 text-center text-red-600">Post not found for slug: {slug}</div>;

  const formattedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <article className="min-h-screen bg-[var(--cream)]">
      {/* Hero section with image */}
      <div className="relative w-full h-[500px] overflow-hidden bg-[var(--champagne)]">
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--cream)]" />
      </div>

      {/* Content section */}
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12">
        {/* Back button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--burgundy)] hover:text-[var(--gold)] transition mb-8">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Journal</span>
        </Link>

        {/* Meta information */}
        <div className="mb-8">
          {(post.category || formattedDate) && (
            <p className="label-eyebrow text-[var(--gold)]">
              {post.category && post.category.replace('-', ' ').toUpperCase()}
              {post.category && formattedDate ? ' · ' : ''}
              {formattedDate}
            </p>
          )}
          <h1 className="text-display text-4xl lg:text-5xl font-bold text-[var(--burgundy)] mt-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-[var(--muted-foreground)] mt-4 italic">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Main body content */}
        <div className="prose prose-lg max-w-none">
          {post.body ? (
            <PortableText 
              value={post.body}
              components={{
                block: {
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-[var(--burgundy)] mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-[var(--burgundy)] mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold text-[var(--burgundy)] mt-5 mb-2">{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[var(--gold)] pl-6 py-2 my-6 italic text-[var(--muted-foreground)]">
                      {children}
                    </blockquote>
                  ),
                  normal: ({ children }) => <p className="text-gray-700 leading-relaxed my-4">{children}</p>,
                },
                marks: {
                  strong: ({ children }) => <strong className="font-semibold text-[var(--burgundy)]">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children }) => (
                    <code className="bg-[var(--champagne)] px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                },
                types: {
                  image: ({ value }) => (
                    <figure className="my-8">
                      <img 
                        src={value.asset?.url} 
                        alt={value.alt || 'Blog image'}
                        className="w-full rounded-lg shadow-sm"
                      />
                      {value.caption && <figcaption className="text-sm text-[var(--muted-foreground)] mt-2 text-center">{value.caption}</figcaption>}
                    </figure>
                  ),
                },
              }}
            />
          ) : (
            <p className="text-gray-500">No content available</p>
          )}
        </div>

        {/* Related posts section */}
        <div className="mt-16 pt-12 border-t border-[var(--gold)]/20">
          <p className="label-eyebrow text-[var(--gold)]">Keep Reading</p>
          <h2 className="text-2xl font-bold text-[var(--burgundy)] mt-3 mb-6">More from the Journal</h2>
          <Link to="/blog" className="inline-flex items-center justify-center px-8 py-3 bg-[var(--burgundy)] text-white rounded hover:bg-[var(--burgundy)]/90 transition">
            View All Articles
          </Link>
        </div>
      </div>
    </article>
  );
}
