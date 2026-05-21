# Sanity CMS Setup Guide for Grace n Gorgeous

This guide explains how to set up and use Sanity CMS for managing blog content on the Grace n Gorgeous website.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Sanity Studio Configuration](#sanity-studio-configuration)
5. [Creating Blog Posts](#creating-blog-posts)
6. [Frontend Integration](#frontend-integration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Grace n Gorgeous** uses a headless CMS architecture with:
- **Sanity CMS** - Backend content management
- **React + TypeScript** - Frontend framework (Vite)
- **TanStack React Router** - Client-side routing
- **Tailwind CSS** - Styling

The blog system allows content creators to:
- Write rich-text blog posts with formatting
- Add featured images
- Categorize posts (Bridal Stories, Styling Tips, Fashion Guide, Celebrity, Trends)
- Auto-generate SEO-friendly URLs (slugs)
- Display posts on the website automatically

---

## Prerequisites

- **Node.js** v18+ (download from [nodejs.org](https://nodejs.org))
- **npm** or **yarn** package manager
- **Git** (optional, for version control)
- A **Sanity account** (free at [sanity.io](https://sanity.io))

Check your Node.js version:
```bash
node --version
npm --version
```

---

## Installation & Setup

### 1. Clone/Extract Project
```bash
cd grace-rental-couture-main
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Sanity Studio Dependencies
```bash
cd studio-gracengorgeous
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the **root directory** with:
```env
VITE_SANITY_PROJECT_ID=tg7pzdn2
VITE_SANITY_DATASET=production
VITE_SANITY_USE_CDN=false
```

The Sanity credentials are:
- **Project ID:** `tg7pzdn2`
- **Dataset:** `production`
- **Use CDN:** `false` (for instant updates)

---

## Sanity Studio Configuration

### Starting Sanity Studio

```bash
cd studio-gracengorgeous
npm run dev
```

Access Sanity Studio at: **http://localhost:3333**

### Schema Overview

The blog post schema (`studio-gracengorgeous/schemaTypes/post.ts`) includes:

| Field | Type | Description |
|-------|------|-------------|
| **Title** | String (Required) | Post headline |
| **Slug** | Slug (Auto-generated) | SEO-friendly URL from title |
| **Category** | Dropdown | Bridal Stories, Styling Tips, Fashion Guide, Celebrity, Trends |
| **Date** | DateTime | Publication date |
| **Excerpt** | String | Short preview text (meta description) |
| **Main Image** | Image | Featured image with hotspot support |
| **Body** | PortableText Array | Rich text content with formatting |

---

## Creating Blog Posts

### Step 1: Access Sanity Studio
1. Open **http://localhost:3333** in your browser
2. Login with your Sanity account credentials

### Step 2: Create New Post
1. Click **"Create"** or **"New"** button
2. Select **"Post"** from the list
3. Fill in the fields:

```
Title: "My Beautiful Wedding Journey"
Category: "Bridal Stories"
Date: 2024-05-21
Excerpt: "Discover how we brought this bride's vision to life..."
Main Image: [Upload hero image]
Body: [Write rich content with formatting]
```

### Step 3: Format Rich Text (Body)

The body field supports:
- **Headings:** H1, H2, H3
- **Text Formatting:** Bold, Italic, Underline, Code
- **Block Quote:** For testimonials or emphasized text
- **Images:** Embed images within content
- **Paragraphs:** Normal text blocks

Example structure:
```
[H2] The Dress Selection Process
This is normal paragraph text with multiple sentences...

[Bold]Key decision:[/Bold] We chose burgundy...

[H3] Color Story
Here's why we picked...

[Image: dress-photo.jpg]

[Block Quote]
"This dress made me feel like royalty!" - The Bride
[/Block Quote]
```

### Step 4: Auto-Generate Slug
- The slug is **auto-generated** from the title
- Example: "My Beautiful Wedding Journey" → `my-beautiful-wedding-journey`
- You can manually edit the slug if needed

### Step 5: Publish
1. Click **"Publish"** button
2. Post is now **live** and visible on the website

---

## Frontend Integration

### How Blog Posts Display

#### 1. **Blog List Page** (`/blog`)
- **Location:** `src/routes/_site/blog.tsx`
- **Shows:** All published posts in a grid
- **Content:** Image, title, category, date, excerpt
- **Query:** Fetches all posts from Sanity, ordered by date (newest first)

```
GET /blog → Shows all blog posts with cards
```

#### 2. **Individual Blog Post** (`/blog/$slug`)
- **Location:** `src/routes/_site/blog.$slug.tsx`
- **Shows:** Full post content with rich formatting
- **Components:** `BlogPostDetailPage.tsx`
- **Features:**
  - Hero image (500px height)
  - Title, category, date metadata
  - Rich formatted body content
  - "Back to Journal" link

```
GET /blog/my-beautiful-wedding-journey → Shows full post
```

#### 3. **Recent Posts on Home Page**
- **Location:** `src/components/RecentPosts.tsx`
- **Shows:** 3 latest blog posts
- **Updates:** Automatically refreshes when new posts are published
- **Links:** Each card links to `/blog/$slug`

### Code Integration Files

**Sanity Client** (`src/lib/sanityClient.ts`)
```typescript
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "tg7pzdn2",
  dataset: "production",
  useCdn: false, // Always false for real-time updates
  apiVersion: "2024-01-01",
});
```

**Blog Query** (GROQ language)
```groq
*[_type == "post"] | order(date desc)
```

This fetches all documents of type "post" and sorts by date (newest first).

---

## Development Workflow

### Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
# http://localhost:8080
```

**Terminal 2 - Sanity Studio:**
```bash
cd studio-gracengorgeous
npm run dev
# http://localhost:3333
```

### Making Changes

1. **Create/Edit post in Sanity Studio** (http://localhost:3333)
2. **See changes immediately** on frontend (http://localhost:8080)
3. **No rebuild needed** - changes are live in development

### Building for Production

```bash
npm run build
```

This creates optimized builds:
- Client bundle: `dist/`
- SSR bundle: `dist/ssr/`

---

## Deployment

### Frontend Deployment
The frontend can be deployed to:
- **Vercel** (recommended for React/Vite)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting

### Sanity Deployment
Sanity is already deployed at `https://sanity.io`. Your content is automatically stored in Sanity's cloud.

### Environment Variables for Production
Set these in your hosting platform:
```
VITE_SANITY_PROJECT_ID=tg7pzdn2
VITE_SANITY_DATASET=production
VITE_SANITY_USE_CDN=true (recommended for production performance)
```

---

## Project Structure

```
grace-rental-couture-main/
├── src/
│   ├── components/
│   │   ├── BlogPostDetailPage.tsx      # Individual post display
│   │   ├── RecentPosts.tsx             # Home page recent posts
│   │   └── Footer.tsx                  # Footer navigation
│   ├── routes/
│   │   ├── _site/
│   │   │   ├── blog.tsx                # Blog list page
│   │   │   └── blog.$slug.tsx          # Blog detail route
│   │   └── __root.tsx                  # Root layout
│   ├── lib/
│   │   └── sanityClient.ts             # Sanity API client
│   └── styles.css                      # Global styles
│
├── studio-gracengorgeous/
│   ├── schemaTypes/
│   │   ├── index.ts                    # Schema exports
│   │   └── post.ts                     # Blog post schema
│   ├── sanity.config.ts                # Sanity configuration
│   └── package.json
│
└── vite.config.ts                      # Vite build configuration
```

---

## Troubleshooting

### Issue: Posts Not Appearing on Website

**Check:**
1. Is Sanity Studio running? (`http://localhost:3333`)
2. Is the post **published**? (Check publish status in Sanity)
3. Are environment variables correct? (Check `.env`)
4. Try rebuilding: `npm run build`

**Fix:**
```bash
# Restart frontend dev server
npm run dev

# Restart Sanity Studio
cd studio-gracengorgeous && npm run dev
```

### Issue: Slug Already Exists Error

**Problem:** Two posts can't have the same slug.

**Solution:**
- Edit the post slug to be unique
- Example: Add `-2` to the end: `my-wedding-story-2`

### Issue: Image Not Showing

**Check:**
1. Image is properly uploaded in Sanity
2. Image has hotspot set (click on image to adjust)
3. Clear browser cache (Ctrl+Shift+Delete)

**Fix:**
```bash
# Clear Sanity cache
cd studio-gracengorgeous
npm run clean
npm run dev
```

### Issue: "Unknown block type" Error in Console

**Problem:** Old posts created with plain text format can't parse as PortableText.

**Solution:**
- Re-edit the post and re-format the body using rich text editor
- Or recreate the post with new schema

### Issue: Slow Performance

**Problem:** Using `useCdn: false` in development means every query hits Sanity servers.

**Solution (for production only):**
- Set `VITE_SANITY_USE_CDN=true` in production
- This caches content on Sanity's CDN (5-minute cache)

---

## Common GROQ Queries

### Get All Posts (Ordered by Date)
```groq
*[_type == "post"] | order(date desc)
```

### Get 3 Recent Posts
```groq
*[_type == "post"] | order(date desc)[0...3]
```

### Get Single Post by Slug
```groq
*[_type == "post" && slug.current == $slug][0]
```

### Get Posts by Category
```groq
*[_type == "post" && category == "Bridal Stories"] | order(date desc)
```

---

## Contact & Support

**Grace n Gorgeous Contact Info:**
- **Address:** 1/6665, 1/6666, Near Kabul Nagar, Gurudwara, Rohtash Nagar, Shahdara, Delhi-110032
- **Phone:** 8700501349
- **Email:** grace.n.gorgeous25@gmail.com
- **WhatsApp:** 8700501349
- **Instagram:** @grace_n_gorgeous_rental

---

## Resources

- **Sanity Documentation:** https://www.sanity.io/docs
- **GROQ Query Language:** https://www.sanity.io/docs/groq
- **React Router (TanStack):** https://tanstack.com/router/latest
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev

---

**Last Updated:** May 21, 2026
**Maintained by:** Grace n Gorgeous Development Team
