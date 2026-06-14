# Sanity CMS Complete Setup & Reference Guide

Comprehensive guide for setting up, configuring, and using Sanity CMS with Grace Rental Couture.

## 📑 Table of Contents

1. [Project Configuration](#project-configuration)
2. [Initial Setup](#initial-setup)
3. [Schema Configuration](#schema-configuration)
4. [Creating & Publishing Content](#creating--publishing-content)
5. [GROQ Queries Reference](#groq-queries-reference)
6. [Frontend Integration](#frontend-integration)
7. [Advanced Features](#advanced-features)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## Project Configuration

### Current Settings

```typescript
// Project Details
Project ID: tg7pzdn2
Dataset: production
API Version: 2026-05-20
Studio URL: http://localhost:3333
Frontend URL: http://localhost:8080
CDN Enabled: false (for instant updates)
```

### Sanity Configuration File

Location: `studio-gracengorgeous/sanity.config.ts`

```typescript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Grace Rental Couture',

  projectId: 'tg7pzdn2',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

### Client Configuration

Location: `src/lib/sanityClient.ts`

```typescript
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'tg7pzdn2',
  dataset: 'production',
  apiVersion: '2026-05-20',
  useCdn: false, // Disable CDN for instant updates
})
```

**Why `useCdn: false`?**
- Ensures blog posts appear immediately after publishing
- Reduces latency for content updates
- Better for real-time content management

---

## Initial Setup

### Step 1: Sanity Account & Project

1. **Create Sanity Account**
   - Visit: https://www.sanity.io/
   - Click "Get started"
   - Create account with email or GitHub

2. **Create New Project**
   - Click "Create new project" in dashboard
   - Project name: "Grace Rental Couture"
   - Select dataset: "production"
   - Region: Choose closest to you

3. **Get Project ID**
   - Navigate to Project Settings
   - Copy your Project ID
   - Store in environment variables

### Step 2: Sanity CLI Setup

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Or use with npx (no installation needed)
npx sanity

# Initialize new project
cd studio-gracengorgeous
sanity init

# When prompted:
# - Use existing project: YES
# - Select your project
# - Select dataset: production
# - Choose starter template: "Clean" or "Blog"
```

### Step 3: Install Dependencies

```bash
# In studio-gracengorgeous folder
npm install

# Or with Bun
bun install
```

**Key Dependencies:**
```json
{
  "@sanity/cli": "^3.x",
  "sanity": "^3.x",
  "@sanity/structure": "^3.x",
  "@sanity/vision": "^3.x"
}
```

### Step 4: Start Studio

```bash
cd studio-gracengorgeous
npm run dev

# Studio opens at http://localhost:3333
```

---

## Schema Configuration

### Schema Structure

Location: `studio-gracengorgeous/schemaTypes/post.ts`

#### Complete Post Schema

```typescript
import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      description: 'Short preview text for listings',
      validation: (Rule) => Rule.max(160),
    }),
    
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Styling Tips', value: 'styling-tips'},
          {title: 'Bridal Stories', value: 'bridal-stories'},
          {title: 'Fashion Guide', value: 'fashion-guide'},
          {title: 'Celebrity', value: 'celebrity'},
          {title: 'Trends', value: 'trends'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
```

### Schema Export

Location: `studio-gracengorgeous/schemaTypes/index.ts`

```typescript
import {post} from './post'

export const schemaTypes = [post]
```

### Field Types Explained

| Field | Type | Purpose | Required |
|-------|------|---------|----------|
| **title** | string | Post headline | ✅ Yes |
| **slug** | slug | SEO URL (auto from title) | ✅ Yes |
| **excerpt** | string | Preview text (max 160 chars) | ❌ No |
| **category** | dropdown | Content type selector | ✅ Yes |
| **date** | datetime | Publication timestamp | ✅ Yes |
| **mainImage** | image | Hero/featured image | ❌ No |
| **body** | array | Rich text content | ❌ No |

### Validation Rules

```typescript
// Title: 5-100 characters, required
validation: (Rule) => Rule.required().min(5).max(100)

// Excerpt: Max 160 characters
validation: (Rule) => Rule.max(160)

// Slug: Required, max 96 characters
validation: (Rule) => Rule.required()

// Category: Required (dropdown)
validation: (Rule) => Rule.required()

// Date: Required
validation: (Rule) => Rule.required()
```

---

## Creating & Publishing Content

### Step-by-Step Blog Post Creation

1. **Open Sanity Studio**
   ```bash
   cd studio-gracengorgeous
   npm run dev
   # Visit http://localhost:3333
   ```

2. **Navigate to Posts**
   - Click "Blog Post" in left sidebar
   - Click "Create" button

3. **Fill in Post Details**

   **Title** (Required)
   - Enter post headline
   - Example: "How to Style Your Bridal Lehenga"

   **Slug** (Auto-generated)
   - Auto-fills from title
   - Manually edit for custom URL
   - Example: `how-to-style-bridal-lehenga`

   **Excerpt** (Optional)
   - 160 characters max
   - Displays in blog listings
   - Make it compelling!

   **Category** (Required)
   - Select from dropdown
   - Options: Styling Tips, Bridal Stories, Fashion Guide, Celebrity, Trends

   **Date** (Required)
   - Set publication date/time
   - Future dates schedule content
   - Past dates publish immediately

   **Main Image** (Optional)
   - Click to upload featured image
   - Enable hotspot for cropping
   - Add alt text for accessibility

   **Body** (Rich Text)
   - Use + button to add blocks
   - **Text**: Regular paragraphs
   - **Headings**: H1, H2, H3 for structure
   - **Formatting**: Bold, Italic, Underline, Code
   - **Quotes**: Blockquotes for highlights
   - **Images**: Inline images with captions

4. **Save Draft**
   - Click "Publish" to save as draft
   - Still not visible on frontend

5. **Preview**
   - Click "Preview" tab
   - See how it looks on site
   - Test on mobile view

6. **Publish**
   - Click "Publish" button (top right)
   - Select "Publish" in dialog
   - Content now live on frontend!

### Image Guidelines

**Main Image**
- Recommended size: 1200 x 800px (3:2 ratio)
- Format: JPG or PNG
- File size: < 2MB
- Use hotspot to set focal point

**Inline Images**
- Recommended width: 600-800px
- Keep aspect ratio consistent
- Include descriptive captions
- Add alt text for SEO

### Rich Text Editor Features

**Text Formatting**
- `Cmd/Ctrl + B` = Bold
- `Cmd/Ctrl + I` = Italic
- `Cmd/Ctrl + U` = Underline
- `Cmd/Ctrl + E` = Code

**Block Types**
- Normal paragraph
- Heading 1, 2, 3
- Blockquote
- Image with caption

**Editor Tips**
- Use headings for structure
- Break content into readable sections
- Highlight key points with bold/italic
- Add images to break up text

---

## GROQ Queries Reference

### What is GROQ?

GROQ (Graph-Relational Object Queries) is Sanity's query language. It retrieves data from your content lake with powerful filtering and transformation capabilities.

### Basic Query Structure

```groq
*[_type == "post"]              // Select all posts
| order(date desc)              // Sort by date (newest first)
[0...10]                        // Limit to 10 results
{                               // Select specific fields
  title,
  slug,
  _id,
  date
}
```

### Common Queries

#### 1. Get All Posts (Newest First)

```groq
*[_type == "post"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  category,
  date,
  mainImage,
}
```

**Usage in React:**
```typescript
const posts = await client.fetch(`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    date,
  }
`)
```

#### 2. Get Single Post by Slug

```groq
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  category,
  date,
  mainImage,
  body,
}
```

**Usage in React:**
```typescript
const post = await client.fetch(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    category,
    date,
    mainImage,
    body,
  }
`, { slug: params.slug })
```

#### 3. Get Recent Posts (Home Page)

```groq
*[_type == "post"] | order(date desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  category,
  date,
  mainImage,
}
```

**Returns:** 3 most recent posts for home page

#### 4. Get Posts by Category

```groq
*[_type == "post" && category == $category] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  date,
  mainImage,
}
```

**Usage:**
```typescript
const storyPosts = await client.fetch(`
  *[_type == "post" && category == $category] | order(date desc)
`, { category: "bridal-stories" })
```

#### 5. Count Posts

```groq
count(*[_type == "post"])
```

**Returns:** Total number of blog posts

#### 6. Get Post Count by Category

```groq
*[_type == "post"] {
  category
} | group(category) {
  category,
  count: count(.)
}
```

#### 7. Search Posts by Title

```groq
*[_type == "post" && title match $searchTerm] | order(date desc) {
  title,
  slug,
  excerpt,
}
```

**Usage:**
```typescript
const results = await client.fetch(`
  *[_type == "post" && title match $searchTerm] | order(date desc)
`, { searchTerm: "lehenga" })
```

#### 8. Get All Categories

```groq
distinct(*[_type == "post"].category)
```

**Returns:** Array of unique categories

#### 9. Get Posts with Image

```groq
*[_type == "post" && defined(mainImage)] | order(date desc)
```

**Returns:** Only posts with featured images

#### 10. Get Recent Posts Within Last 30 Days

```groq
*[_type == "post" && dateTime(date) > dateTime(now()) - 30*24*60*60*1000] 
| order(date desc)
```

### Query Parameters (Variables)

Use `$` to pass dynamic values:

```groq
*[_type == "post" && slug.current == $slug && category == $category]
```

**In React:**
```typescript
await client.fetch(query, {
  slug: "my-post-slug",
  category: "styling-tips"
})
```

### Query Operators

| Operator | Purpose | Example |
|----------|---------|---------|
| `==` | Equal | `category == "bridal-stories"` |
| `!=` | Not equal | `status != "draft"` |
| `>` | Greater than | `date > "2024-01-01"` |
| `<` | Less than | `date < "2024-12-31"` |
| `>=` | Greater or equal | `views >= 100` |
| `<=` | Less or equal | `rating <= 5` |
| `&&` | AND | `category == "tips" && views > 50` |
| `||` | OR | `category == "tips" || category == "trends"` |
| `in` | In list | `category in ["tips", "trends"]` |
| `match` | Text search | `title match "lehenga"` |
| `defined` | Field exists | `defined(mainImage)` |

### Array Slicing

```groq
[0...10]   // First 10 results
[0...3]    // First 3 results
[5...15]   // Results 5-15
[0]        // First result only
```

### Sorting

```groq
| order(date desc)           // Newest first
| order(date asc)            // Oldest first
| order(title asc)           // Alphabetical
| order(_createdAt desc)     // Most recent creations
```

---

## Frontend Integration

### Install Sanity SDK

```bash
npm install next-sanity @sanity/image-url
# or
bun add next-sanity @sanity/image-url
```

### Setup Sanity Client

Location: `src/lib/sanityClient.ts`

```typescript
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'tg7pzdn2',
  dataset: 'production',
  apiVersion: '2026-05-20',
  useCdn: false,
})

// Image URL builder
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

### Fetch Blog Posts in React Component

```typescript
import { client } from '@/lib/sanityClient'

export async function getBlogPosts() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(date desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      date,
      mainImage,
    }
  `)
  return posts
}

export async function getBlogPostBySlug(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      date,
      mainImage,
      body,
    }
  `, { slug })
  return post
}
```

### Display Blog Posts

```typescript
import { getBlogPosts } from '@/lib/sanityClient'
import { urlFor } from '@/lib/sanityClient'

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <time>{new Date(post.date).toLocaleDateString()}</time>
          {post.mainImage && (
            <img 
              src={urlFor(post.mainImage).url()} 
              alt={post.title}
            />
          )}
        </article>
      ))}
    </div>
  )
}
```

### Render Rich Text (PortableText)

```typescript
import {PortableText} from '@portabletext/react'

const components = {
  types: {
    image: ({value}: any) => (
      <img src={urlFor(value).url()} alt={value.alt} />
    ),
  },
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold">{children}</h3>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },
}

export default function BlogPost({post}: {post: any}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <PortableText value={post.body} components={components} />
    </article>
  )
}
```

---

## Advanced Features

### Publishing Workflow

1. **Save as Draft**
   - Work in progress
   - Not visible on frontend
   - Can be edited anytime

2. **Preview**
   - See how content looks
   - Test formatting and images
   - Check responsiveness

3. **Schedule**
   - Set future date in `date` field
   - Post publishes automatically
   - Great for campaigns

4. **Publish**
   - Makes content live immediately
   - Visible on frontend
   - Appears in queries

### Asset Management

**Image Optimization**
- Sanity auto-optimizes images
- CDN delivery for fast loading
- Responsive image generation

**Image URL Parameters**
```typescript
// Resize
urlFor(image).width(600).height(400).url()

// Quality
urlFor(image).quality(80).url()

// Cropping
urlFor(image).crop('center').fit('fillmax').url()

// Format
urlFor(image).auto('format').url()

// Combined
urlFor(image)
  .width(800)
  .height(600)
  .quality(80)
  .auto('format')
  .url()
```

### Validation Rules

Create strict validation for data quality:

```typescript
defineField({
  name: 'title',
  type: 'string',
  validation: (Rule) => [
    Rule.required().error('Title is required'),
    Rule.min(5).error('Title must be at least 5 characters'),
    Rule.max(100).error('Title must be less than 100 characters'),
  ]
})
```

### Custom Components

Create custom UI for specific fields:

```typescript
defineField({
  name: 'seoTitle',
  type: 'string',
  components: {
    input: (props) => {
      const length = props.value?.length || 0
      return (
        <div>
          <input {...props} />
          <p>{length}/60 characters</p>
        </div>
      )
    }
  }
})
```

---

## Troubleshooting

### Problem: Studio Won't Load

**Solution 1: Check Project ID**
```bash
# Verify in sanity.config.ts
projectId: 'tg7pzdn2'  // Should match your actual project ID
```

**Solution 2: Clear Cache**
```bash
# Remove dependencies and reinstall
rm -rf node_modules
npm install
npm run dev
```

**Solution 3: Check Authentication**
```bash
# Login to Sanity CLI
sanity login
sanity list

# Verify project access
sanity projects list
```

### Problem: Blog Posts Not Appearing

**Solution 1: Check Publication Status**
- Verify posts are "Published" (not Draft)
- Check post date is not in future

**Solution 2: Verify GROQ Query**
```typescript
// Test query in Vision tool
*[_type == "post"] | order(date desc)

// Check if posts exist
count(*[_type == "post"])
```

**Solution 3: Check Client Configuration**
```typescript
// Ensure useCdn: false for instant updates
useCdn: false
```

**Solution 4: Clear Frontend Cache**
```bash
# Clear Vite cache
rm -rf .vite
npm run dev
```

### Problem: Images Not Loading

**Solution 1: Check Asset Upload**
- Verify images uploaded in Sanity Studio
- Check image alt text is filled
- Ensure images are not too large

**Solution 2: Verify Image URL Builder**
```typescript
import imageUrlBuilder from '@sanity/image-url'
import {client} from '@/lib/sanityClient'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

**Solution 3: Check Image Format**
```typescript
// Use auto format for best compatibility
urlFor(image).auto('format').url()
```

### Problem: Slug Already Exists

**Solution:** Modify slug manually
- Edit the slug field
- Add suffix: `-2`, `-variant`, etc.
- Example: `post-name-2`

### Problem: Rich Text Not Rendering

**Solution 1: Install PortableText**
```bash
npm install @portabletext/react
```

**Solution 2: Configure Components**
```typescript
const components = {
  types: {
    image: ({value}) => <img src={urlFor(value).url()} />,
  },
  block: {
    h2: ({children}) => <h2 className="text-2xl font-bold">{children}</h2>,
  },
}

<PortableText value={post.body} components={components} />
```

### Problem: Outdated Data in Frontend

**Solution 1: Disable CDN**
```typescript
export const client = createClient({
  useCdn: false,  // Always fetch fresh data
})
```

**Solution 2: Clear Browser Cache**
- Press `Cmd/Ctrl + Shift + Delete`
- Select "Cached images and files"
- Clear cache

**Solution 3: Hard Refresh**
- Press `Cmd/Ctrl + Shift + R` (not just F5)

---

## Best Practices

### Content Strategy

✅ **DO:**
- Use descriptive, SEO-friendly titles
- Write engaging excerpts (160 characters max)
- Include featured images for visual appeal
- Structure content with headings
- Use categories consistently
- Publish regularly

❌ **DON'T:**
- Leave fields empty unnecessarily
- Use unclear or keyword-stuffed titles
- Upload massive images (> 2MB)
- Skip alt text on images
- Forget to set publication date
- Leave posts in draft

### SEO Optimization

```typescript
// Good title (40-60 characters)
"How to Style Your Bridal Lehenga for Maximum Elegance"

// Good excerpt (120-160 characters)
"Learn professional styling tips for bridal lehengas. 
Discover how to accessorize, layer, and pose for 
the perfect wedding day look."

// Good slug
"how-to-style-bridal-lehenga-maximum-elegance"

// Good alt text
"Beautiful burgundy bridal lehenga with gold zardozi work"
```

### Image Best Practices

- **Featured Images**: 1200 x 800px (3:2 ratio)
- **Inline Images**: 600-800px width
- **File Size**: Keep under 2MB
- **Format**: JPG for photos, PNG for graphics
- **Alt Text**: Descriptive and SEO-friendly
- **Hotspot**: Set focal point for responsive cropping

### Organization

```
Blog Categories:
├── Styling Tips       → How-to guides, tips & tricks
├── Bridal Stories     → Client features, inspirations
├── Fashion Guide      → Trends, collections, fabrics
├── Celebrity         → Celebrity features, red carpet
└── Trends            → Seasonal trends, forecasting
```

### Naming Conventions

```
Slugs (lowercase, hyphens):
✅ "styling-tips-for-wedding-lehenga"
❌ "Styling Tips For Wedding Lehenga"
❌ "styling_tips_for_wedding_lehenga"

Image names:
✅ "lehenga-hero-image.jpg"
❌ "image1.jpg"
❌ "IMG_1234.jpg"

Post titles:
✅ "5 Essential Styling Tips for Your Bridal Lehenga"
❌ "tips"
❌ "LEHENGA STYLING GUIDE!!!!"
```

### Performance Optimization

```typescript
// Always use image optimization
urlFor(image)
  .width(800)           // Set specific width
  .quality(80)          // Reduce quality slightly
  .auto('format')       // Auto best format
  .url()

// Use pagination for large datasets
*[_type == "post"] | order(date desc) [0...10]

// Cache queries when appropriate
// Use revalidate in Next.js
revalidate: 3600  // 1 hour cache
```

### Security & Permissions

- Use Sanity's role-based access control
- Grant only necessary permissions
- Keep project ID confidential
- Use API tokens for frontend queries
- Implement content moderation workflow

---

## Additional Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Reference**: https://www.sanity.io/docs/groq
- **PortableText**: https://www.portabletext.dev
- **Image API**: https://www.sanity.io/docs/image-urls
- **CLI Reference**: https://www.sanity.io/docs/cli

---

**Last Updated**: June 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
