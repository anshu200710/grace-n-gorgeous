# Grace Rental Couture

A premium rental fashion platform showcasing exquisite Indian designer wear with a blog system for styling tips, bridal stories, and fashion trends.

## 🌟 Overview

Grace Rental Couture is a full-stack web application featuring:
- **Product Catalog**: 13 featured rental pieces across 6 categories (Bridal, Sarees, Reception, Haldi, Mehendi, Rentals)
- **Blog System**: Rich content management with Sanity CMS for articles, tutorials, and trend pieces
- **Responsive Design**: Mobile-first approach with Tailwind CSS and Radix UI components
- **Professional UI**: Featuring luxury bridal wear with high-end aesthetics

## 🏗️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 + TypeScript |
| **Routing** | TanStack React Router v1 |
| **Styling** | Tailwind CSS + Radix UI |
| **CMS** | Sanity (Headless) |
| **Database** | Sanity Content Lake |
| **Build Tool** | Vite |
| **Runtime** | Node.js with Bun package manager |
| **Deployment** | Cloudflare Workers |

## 📁 Project Structure

```
grace-rental-couture-main/
├── src/                          # Frontend application
│   ├── components/               # React components
│   │   ├── BlogPostDetailPage.tsx   # Blog post display
│   │   ├── ProductCard.tsx         # Product card component
│   │   ├── RecentPosts.tsx        # Home page blog posts
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── Footer.tsx            # Footer section
│   │   ├── WhatsAppFab.tsx       # WhatsApp floating button
│   │   └── ui/                   # Radix UI component library
│   ├── routes/                   # TanStack Router pages
│   │   ├── _site/                # Public site pages
│   │   │   ├── index.tsx         # Home page
│   │   │   ├── blog.tsx          # Blog listing
│   │   │   ├── blog.$slug.tsx    # Blog detail page
│   │   │   ├── about.tsx         # About page
│   │   │   ├── contact.tsx       # Contact page
│   │   │   ├── appointment.tsx   # Appointment booking
│   │   │   ├── product.$slug.tsx # Product detail
│   │   │   ├── bridal.tsx        # Bridal collection
│   │   │   ├── sarees.tsx        # Sarees collection
│   │   │   ├── lehengas.tsx      # Lehengas collection
│   │   │   ├── celebrity.tsx     # Celebrity collection
│   │   │   ├── rentals.tsx       # Rentals page
│   │   │   └── gallery.tsx       # Gallery page
│   │   └── __root.tsx            # Root layout
│   ├── lib/                      # Utilities & configuration
│   │   ├── sanityClient.ts       # Sanity API client
│   │   ├── catalog.ts            # Product catalog data
│   │   ├── error-capture.ts      # Error handling
│   │   └── utils.ts              # Helper functions
│   ├── hooks/                    # Custom React hooks
│   │   └── use-mobile.tsx        # Mobile detection
│   ├── assets/                   # Images & static files
│   │   ├── product1-13.jpeg      # Product images
│   │   ├── logo.jpg              # Brand logo
│   │   ├── col-*.jpg             # Collection images
│   │   └── hero-bride.jpg        # Hero images
│   ├── styles.css                # Global styles
│   ├── router.tsx                # Router configuration
│   ├── server.ts                 # Server setup
│   └── start.ts                  # Application entry point
│
├── studio-gracengorgeous/        # Sanity CMS Studio
│   ├── sanity.config.ts          # Sanity configuration
│   ├── schemaTypes/
│   │   ├── post.ts               # Blog post schema
│   │   └── index.ts              # Schema exports
│   ├── static/                   # Studio static files
│   └── package.json              # Studio dependencies
│
├── public/                       # Public static assets
├── gracengorgeous/               # Additional assets
│   ├── schemaTypes/
│   └── static/
│
├── Configuration Files
│   ├── package.json              # Project dependencies
│   ├── tsconfig.json             # TypeScript config
│   ├── vite.config.ts            # Vite bundler config
│   ├── wrangler.jsonc            # Cloudflare Workers config
│   ├── components.json           # shadcn UI config
│   └── eslint.config.js          # ESLint rules
│
└── Documentation
    ├── README.md                 # This file
    ├── SANITY_COMPLETE_GUIDE.md  # Comprehensive Sanity setup
    ├── SCHEMA_SETUP_GUIDE.md     # Schema configuration guide
    ├── BLOG_SETUP_GUIDE.md       # Blog system guide
    ├── BLOG_QUICK_START.md       # Quick start reference
    ├── SANITY_SETUP.md           # Original Sanity guide
    ├── IMPLEMENTATION_SUMMARY.md # Feature summary
    └── SETUP_STATUS.sh           # Setup verification script
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ or **Bun** runtime
- **npm/bun** package manager
- **Sanity Account** (free tier available)
- **Cloudflare Account** (for deployment)

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/grace-rental-couture.git
cd grace-rental-couture-main
```

2. **Install Dependencies**
```bash
npm install
# or with Bun:
bun install
```

3. **Configure Sanity**
```bash
cd studio-gracengorgeous
npm install
# Update sanity.config.ts with your project ID and dataset
```

4. **Set Environment Variables**
Create `.env.local` in the root directory:
```env
VITE_SANITY_PROJECT_ID=tg7pzdn2
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-20
```

### Development

**Start the Sanity Studio:**
```bash
cd studio-gracengorgeous
npm run dev
# Opens at http://localhost:3333
```

**Start the Frontend (in another terminal):**
```bash
npm run dev
# Opens at http://localhost:8080
```

**Build for Production:**
```bash
npm run build
```

## 📦 Product Catalog

The platform features 13 premium rental pieces:

| Product | Category | Price | Status |
|---------|----------|-------|--------|
| Rani Zardozi Lehenga | Bridal | ₹145,000 | Signature |
| Noor Banarasi Saree | Saree | ₹48,000 | New |
| Gulnaaz Reception Lehenga | Reception | ₹92,000 | - |
| Marigold Haldi Set | Haldi | ₹32,000 | - |
| Zara Mehendi Anarkali | Mehendi | ₹36,000 | Trending |
| Shaan Velvet Anarkali | Reception | ₹72,000 | - |
| Heritage Edit Saree | Saree | ₹39,000 | - |
| Shahi Dulhan Lehenga | Bridal | ₹175,000 | Couture |
| Emerald Festive Anarkali | Reception | ₹68,000 | - |
| Royal Bridal Lehenga | Bridal | ₹165,000 | Exclusive |
| Golden Grace Saree | Saree | ₹52,000 | - |
| Rose Pink Mehendi Set | Mehendi | ₹38,000 | - |
| Burgundy Celebration Lehenga | Bridal | ₹155,000 | Premium |

### Collections

Six curated collections:
- **Bridal Lehengas** - "The Dulhan Edit"
- **Designer Sarees** - "Drape Heritage"
- **Reception Looks** - "Modern Couture"
- **Haldi Collection** - "Sunlit Mornings"
- **Mehendi Edit** - "Garden Soirée"
- **Rental Atelier** - "Curated Pieces"

## 📝 Blog System Features

### Content Types
- **Blog Posts** with rich text editing
- **Categories**: Styling Tips, Bridal Stories, Fashion Guide, Celebrity, Trends
- **Rich Content**: Headings, formatting, quotes, embedded images
- **Auto-Generated URLs** from post titles
- **Publication Dates** for chronological sorting

### Pages
- **Home** - 3 most recent blog posts
- **Blog Listing** (`/blog`) - All posts with grid layout
- **Blog Detail** (`/blog/[slug]`) - Full post with rich formatting

## 🔑 Key Features

✅ **Product Management**
- 13 featured rental pieces
- 6 curated collections
- Product detail pages with rich descriptions
- Category filtering

✅ **Content Management**
- Sanity CMS for blog posts
- Rich text with images and formatting
- GROQ queries for flexible data retrieval
- Auto-generated slugs for SEO

✅ **User Experience**
- Responsive design (mobile-first)
- High-performance image optimization
- Smooth animations with Framer Motion
- WhatsApp integration
- Professional color scheme and typography

✅ **Developer Experience**
- TypeScript for type safety
- Component-based architecture
- Clean code structure
- Comprehensive error handling
- Development documentation

## 🎨 Styling & Design

- **Color Scheme**: Burgundy, Gold, Cream, Champagne
- **Typography**: Display text, labels, body text hierarchy
- **Components**: Radix UI primitives + custom components
- **Animations**: Smooth transitions and reveal effects
- **Responsive**: Tailored for mobile, tablet, and desktop

### CSS Variables
```css
--burgundy: Deep wine color for accents
--gold: Luxe gold highlights
--cream: Off-white backgrounds
--champagne: Soft neutral tones
--muted-foreground: Secondary text
```

## 🌐 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `index.tsx` | Home page with recent blog posts |
| `/blog` | `blog.tsx` | Blog listing page |
| `/blog/[slug]` | `blog.$slug.tsx` | Individual blog post |
| `/product/[slug]` | `product.$slug.tsx` | Product detail page |
| `/bridal` | `bridal.tsx` | Bridal collection |
| `/sarees` | `sarees.tsx` | Saree collection |
| `/lehengas` | `lehengas.tsx` | Lehenga collection |
| `/celebrity` | `celebrity.tsx` | Celebrity collection |
| `/rentals` | `rentals.tsx` | All rentals |
| `/gallery` | `gallery.tsx` | Gallery showcase |
| `/about` | `about.tsx` | About the brand |
| `/contact` | `contact.tsx` | Contact form |
| `/appointment` | `appointment.tsx` | Booking appointments |

## 🔧 Sanity CMS Integration

### Project Configuration
- **Project ID**: `tg7pzdn2`
- **Dataset**: `production`
- **API Version**: `2026-05-20`
- **CDN**: Disabled for instant updates

### Available GROQ Queries

**Get All Posts (Newest First)**
```groq
*[_type == "post"] | order(date desc)
```

**Get Single Post by Slug**
```groq
*[_type == "post" && slug.current == $slug][0]
```

**Get Recent Posts**
```groq
*[_type == "post"] | order(date desc)[0...3]
```

**Get Posts by Category**
```groq
*[_type == "post" && category == $category] | order(date desc)
```

See [SANITY_COMPLETE_GUIDE.md](SANITY_COMPLETE_GUIDE.md) for more details.

## 📋 Blog Post Schema

```typescript
{
  title: string (required)           // Post headline
  slug: string (auto-generated)      // SEO URL
  excerpt: string                    // Preview text
  category: 'Styling Tips' | 'Bridal Stories' | 'Fashion Guide' | 'Celebrity' | 'Trends'
  date: DateTime                     // Publication date
  mainImage: Image with hotspot     // Featured hero image
  body: PortableText[]               // Rich content with formatting & images
}
```

## 🚀 Deployment

### Deploy to Cloudflare Workers

1. **Install Wrangler CLI**
```bash
npm install -g wrangler
```

2. **Configure `wrangler.jsonc`**
```json
{
  "name": "grace-rental-couture",
  "main": "src/server.ts",
  "env": {
    "production": {
      "routes": [{ "pattern": "gracecouture.com/*" }]
    }
  }
}
```

3. **Deploy**
```bash
npm run deploy
# or
wrangler deploy
```

### Configure CORS for Sanity

Ensure your Sanity project allows requests from your domain:

```bash
cd studio-gracengorgeous
sanity cors add https://yourdomain.com
```

## 🐛 Troubleshooting

### Common Issues

**Sanity Studio Won't Load**
- Verify `sanity.config.ts` has correct project ID
- Run `npm install` in `studio-gracengorgeous/`
- Check that you're authenticated with Sanity CLI

**Blog Posts Not Appearing**
- Ensure posts are published in Sanity Studio
- Check GROQ query in browser console
- Verify `useCdn: false` for instant updates

**Images Not Loading**
- Confirm images are in `src/assets/`
- Check image import paths in components
- Verify asset file names match exactly

**Build Errors**
- Clear `.vite/` cache: `rm -rf .vite/`
- Reinstall dependencies: `npm install`
- Check TypeScript errors: `npm run typecheck`

See [SANITY_COMPLETE_GUIDE.md](SANITY_COMPLETE_GUIDE.md) for more troubleshooting.

## 📚 Documentation

- **[SANITY_COMPLETE_GUIDE.md](SANITY_COMPLETE_GUIDE.md)** - Complete Sanity CMS setup & usage
- **[SCHEMA_SETUP_GUIDE.md](SCHEMA_SETUP_GUIDE.md)** - Schema configuration reference
- **[BLOG_SETUP_GUIDE.md](BLOG_SETUP_GUIDE.md)** - Blog system implementation
- **[BLOG_QUICK_START.md](BLOG_QUICK_START.md)** - 5-minute quick reference
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Feature overview

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests and linting: `npm run lint`
4. Submit a pull request

## 📝 License

This project is proprietary and confidential.

## 👥 Team

**Grace Rental Couture** - Premium Indian Wear Rental Platform

## 📞 Support

For issues, feature requests, or support:
- Open an issue on GitHub
- Contact the development team
- Check the [troubleshooting guide](SANITY_COMPLETE_GUIDE.md#troubleshooting)

---

**Last Updated**: June 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
