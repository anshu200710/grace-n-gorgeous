# Grace n Gorgeous - Blog System Setup Guide

## ✅ What's Been Completed

Your blog system is now fully configured with the following features:

### 1. **Enhanced Sanity Schema** 
The blog post schema has been upgraded to include:
- **Title** - Blog post title
- **Slug** - URL-friendly version (auto-generated from title)
- **Excerpt** - Short summary for blog list displays
- **Category** - Styling Tips, Bridal Stories, Fashion Guide, Celebrity, Trends
- **Publishing Date** - When the post was published
- **Main Image** - Featured image with hotspot support
- **Body Content** - Rich text editor with:
  - Multiple heading styles (H1, H2, H3)
  - Text formatting (bold, italic, underline, code)
  - Block quotes
  - Image blocks within content

### 2. **Blog Routes & Pages**

#### `/blog` - Blog List Page
- **Location:** `src/routes/_site/blog.tsx`
- **Features:**
  - Displays all blog posts ordered by date (newest first)
  - Shows post image, title, category, date, and excerpt
  - Beautiful grid layout with hover animations
  - Links to individual blog posts

#### `/blog/[slug]` - Blog Detail Page
- **Location:** `src/routes/_site/blog.$slug.tsx`
- **Example URL:** `http://localhost:8080/blog/bridal-lehengas-for-rental`
- **Features:**
  - Full blog post with rich formatted content
  - Hero image at the top
  - Post metadata (category, publishing date)
  - Styled typography for headings, quotes, and code blocks
  - "Back to Journal" navigation
  - "View All Articles" call-to-action

#### Home Page - Recent Posts Section
- **Location:** `src/routes/_site/index.tsx`
- **Component:** `RecentPosts` (src/components/RecentPosts.tsx)
- **Features:**
  - Shows 3 most recent blog posts
  - Displays excerpt and category
  - "View All Articles" button to browse all posts

### 3. **Component Files Updated**

#### BlogPostDetailPage.tsx
- Fetches single post by slug from Sanity
- Renders rich content using PortableText
- Includes custom styling for all content types
- Shows metadata and related posts section

#### RecentPosts.tsx
- Fetches 3 latest posts from Sanity
- Displays on home page with beautiful styling
- Links to individual blog posts

#### blog.tsx
- Fetches all blog posts from Sanity
- Handles slug correctly for navigation
- Shows all posts in grid layout

---

## 🚀 How to Use (Step-by-Step)

### Step 1: Start Sanity Studio
```bash
cd studio-gracengorgeous
npm run dev
```
This opens the Sanity Studio at `http://localhost:3333`

### Step 2: Create Your First Blog Post
1. In Sanity Studio, click **"Blog Post"** (or Posts in the sidebar)
2. Click **"Create"** to add a new post
3. Fill in the fields:
   - **Title:** "Bridal Lehengas For Rental" (slug auto-generates: `bridal-lehengas-for-rental`)
   - **Excerpt:** "Discover our curated collection of stunning bridal lehengas..."
   - **Category:** Select from dropdown (e.g., "Bridal Stories")
   - **Publishing Date:** Select today's date
   - **Main Image:** Upload a featured image
   - **Body Content:** Add rich text with images, headings, etc.
4. Click **"Publish"** to make it live

### Step 3: View on Frontend
1. Start the main app in another terminal:
```bash
npm run dev
```

2. Navigate to:
   - **Blog List:** `http://localhost:8080/blog`
   - **Recent Posts (Home):** `http://localhost:8080/` (scroll down)
   - **Blog Detail:** `http://localhost:8080/blog/bridal-lehengas-for-rental`

---

## 📋 Routing Structure

```
/_site/
├── index.tsx (Home page with RecentPosts component)
├── blog.tsx (Blog list page)
├── blog.$slug.tsx (Individual blog post page)
└── ...other routes
```

---

## 🎨 Sanity Client Configuration

**File:** `src/lib/sanityClient.ts`

```typescript
export const sanityClient = createClient({
  projectId: 'tg7pzdn2',
  dataset: 'production',
  useCdn: false,  // Ensures instant updates
  apiVersion: '2026-05-20',
})
```

---

## 📝 Blog Post Examples

### Example 1: Bridal Styling Guide
```
Title: Bridal Lehengas For Rental
Slug: bridal-lehengas-for-rental (auto-generated)
Category: Bridal Stories
Excerpt: Everything you need to know about choosing the perfect lehenga...
Date: May 21, 2024
Main Image: [Upload bridal image]
Body: [Add content with multiple images and formatting]
```

### Example 2: Styling Tips
```
Title: How to Style Your Saree Like a Pro
Slug: how-to-style-your-saree
Category: Styling Tips
Excerpt: Master the art of draping and styling...
```

---

## 🔍 GROQ Queries Used

### Fetch all posts (for blog list)
```groq
*[_type == "post"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  "date": date,
  "imageUrl": mainImage.asset->url
}
```

### Fetch single post by slug (for blog detail)
```groq
*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  "imageUrl": mainImage.asset->url,
  category,
  date,
  excerpt
}
```

### Fetch recent posts (for home page)
```groq
*[_type == "post"] | order(date desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url,
  excerpt,
  category,
  date
}
```

---

## 🎯 URLs Generated

When you create a blog post titled **"Bridal Lehengas For Rental"**, the following URLs are automatically available:

- **Blog List:** `http://localhost:8080/blog`
- **Blog Detail:** `http://localhost:8080/blog/bridal-lehengas-for-rental`
- **Home Page Recent Posts:** `http://localhost:8080/` (scroll to "Recent Stories")

---

## ✨ Features Summary

| Feature | Status | Location |
|---------|--------|----------|
| Sanity Schema with Rich Content | ✅ | `studio-gracengorgeous/schemaTypes/post.ts` |
| Blog List Page | ✅ | `src/routes/_site/blog.tsx` |
| Blog Detail Page | ✅ | `src/routes/_site/blog.$slug.tsx` |
| Recent Posts on Home | ✅ | `src/routes/_site/index.tsx` |
| Responsive Design | ✅ | All components |
| Image Support | ✅ | Featured + in-content images |
| Rich Text Formatting | ✅ | Headings, bold, italic, quotes, code |
| Category System | ✅ | 5 predefined categories |
| Date Publishing | ✅ | Sortable by date |

---

## 🛠️ Troubleshooting

### Blog posts not showing up?
1. Make sure you **Publish** the post in Sanity (not just save as draft)
2. Check that your Sanity project ID matches in `sanityClient.ts`
3. Try refreshing the page (useCdn is set to false for instant updates)

### Images not loading?
1. Ensure the image was uploaded in Sanity (not just a URL)
2. Check that the asset URL is generated in the image field

### Slug not working in URL?
1. Sanity auto-generates slugs from titles, but they must be valid
2. You can manually edit the slug in Sanity if needed
3. Avoid special characters (use hyphens instead of spaces)

---

## 📚 Next Steps

1. **Create multiple blog posts** with different categories
2. **Add featured images** to each post for visual appeal
3. **Use rich text** - add headings, images, and quotes to posts
4. **Share the journal link** (`/blog`) in your navigation for easy access
5. **Monitor analytics** to see which stories resonate with your audience

---

## 🎉 You're All Set!

Your blog system is ready to go. Start creating beautiful wedding stories for your brides! 

Questions? Check the Sanity documentation at: https://www.sanity.io/docs
