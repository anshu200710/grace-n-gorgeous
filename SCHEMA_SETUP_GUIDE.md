# Sanity Schema Setup Guide

Detailed guide for creating, configuring, and extending Sanity schemas for Grace Rental Couture.

## 📑 Table of Contents

1. [Schema Basics](#schema-basics)
2. [Post Schema Reference](#post-schema-reference)
3. [Field Types Explained](#field-types-explained)
4. [Validation Rules](#validation-rules)
5. [Custom Schemas](#custom-schemas)
6. [Schema Management](#schema-management)
7. [Common Issues](#common-issues)

---

## Schema Basics

### What is a Schema?

A schema defines the structure of your content. Think of it like a database table that describes what fields exist, their types, and validation rules.

### Schema Structure

```typescript
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',                      // Unique identifier (used in GROQ)
  title: 'Blog Post',                // Display name in Studio
  type: 'document',                  // Type: document, object, array, etc.
  
  fields: [
    // Field definitions go here
  ],
  
  preview: {                         // How it looks in list view
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
```

### Document vs Object

| Feature | Document | Object |
|---------|----------|--------|
| Stored as | Top-level content | Nested in documents |
| Queries | Direct GROQ queries | Nested in parent queries |
| Use Case | Blog posts, pages | Author info, metadata |
| Example | `post` | `author` object |

---

## Post Schema Reference

### Complete Post Type

Location: `studio-gracengorgeous/schemaTypes/post.ts`

```typescript
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  
  fields: [
    // ====== BASIC INFORMATION ======
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main headline of your blog post',
      validation: (Rule) => [
        Rule.required().error('Title is required'),
        Rule.min(5).error('Title must be at least 5 characters'),
        Rule.max(100).error('Title cannot exceed 100 characters'),
      ],
    }),

    // ====== URL SLUG ======
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (auto-generated)',
      options: {
        source: 'title',           // Auto-generate from title
        maxLength: 96,             // Max slug length
        slugify: (input) =>        // Custom slug generation
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => 
        Rule.required().error('Slug is required'),
    }),

    // ====== PREVIEW TEXT ======
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      description: 'Short preview for blog listings (max 160 characters)',
      validation: (Rule) => 
        Rule.max(160).warning('Excerpt should be under 160 characters for best display'),
    }),

    // ====== CATEGORY ======
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Blog post category for organization',
      options: {
        list: [
          { title: 'Styling Tips', value: 'styling-tips' },
          { title: 'Bridal Stories', value: 'bridal-stories' },
          { title: 'Fashion Guide', value: 'fashion-guide' },
          { title: 'Celebrity', value: 'celebrity' },
          { title: 'Trends', value: 'trends' },
        ],
        layout: 'dropdown',         // Dropdown selector
      },
      validation: (Rule) => 
        Rule.required().error('Please select a category'),
    }),

    // ====== PUBLICATION DATE ======
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'datetime',
      description: 'When the post should be published (future dates schedule it)',
      validation: (Rule) => 
        Rule.required().error('Publication date is required'),
    }),

    // ====== FEATURED IMAGE ======
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Hero image that appears at top of post (recommended: 1200x800px)',
      options: {
        hotspot: true,             // Enable focal point selection
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule) => 
            Rule.max(120).warning('Keep alt text under 120 characters'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed under the image',
        },
      ],
    }),

    // ====== RICH TEXT BODY ======
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Main post content with text, images, and formatting',
      of: [
        {
          type: 'block',
          
          // Text styles
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          
          // Text formatting
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            
            // Links
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        
        // Inline images
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Image Caption',
            },
          ],
        },
      ],
    }),
  ],

  // ====== LIST PREVIEW ======
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
      date: 'date',
    },
    prepare(selection) {
      const { title, category, date } = selection
      return {
        title,
        subtitle: `${category} • ${new Date(date).toLocaleDateString()}`,
        media: selection.media,
      }
    },
  },
})
```

### Schema Export

Location: `studio-gracengorgeous/schemaTypes/index.ts`

```typescript
import { post } from './post'

export const schemaTypes = [post]
```

---

## Field Types Explained

### String Field

**Best for:** Text input (titles, names, descriptions)

```typescript
defineField({
  name: 'title',
  type: 'string',
  title: 'Title',
  validation: (Rule) => Rule.required().min(5),
})
```

**Options:**
- `maxLength`: Max characters
- `placeholder`: Hint text
- `layout`: 'single-line' or 'default'

### Text Area

**Best for:** Long text with line breaks

```typescript
defineField({
  name: 'description',
  type: 'text',
  title: 'Description',
  rows: 5,
})
```

### Slug Field

**Best for:** URL-friendly identifiers (auto-generated from title)

```typescript
defineField({
  name: 'slug',
  type: 'slug',
  title: 'Slug',
  options: {
    source: 'title',
    maxLength: 96,
  },
})
```

**Features:**
- Auto-generates from source field
- URL-safe (lowercase, hyphens)
- Manually editable

### Number Field

**Best for:** Quantities, prices, ratings

```typescript
defineField({
  name: 'price',
  type: 'number',
  title: 'Price',
  validation: (Rule) => Rule.min(0),
})
```

**Options:**
- `min`: Minimum value
- `max`: Maximum value
- `precision`: Decimal places

### Boolean Field

**Best for:** Yes/No, True/False options

```typescript
defineField({
  name: 'featured',
  type: 'boolean',
  title: 'Featured Post',
  description: 'Show on homepage',
})
```

### DateTime Field

**Best for:** Dates, timestamps, scheduling

```typescript
defineField({
  name: 'date',
  type: 'datetime',
  title: 'Published Date',
  options: {
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    timeStep: 15,
  },
})
```

### Image Field

**Best for:** Uploading and managing images

```typescript
defineField({
  name: 'mainImage',
  type: 'image',
  title: 'Main Image',
  options: {
    hotspot: true,  // Enable cropping
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    },
  ],
})
```

**Advanced Options:**
```typescript
options: {
  hotspot: true,
  crop: true,
  sources: ['sanity-default'],  // Asset sources
  storeOriginalFilename: true,
}
```

### Array Field

**Best for:** Lists of items (blog body, gallery items)

```typescript
defineField({
  name: 'body',
  type: 'array',
  title: 'Body',
  of: [
    { type: 'block' },      // Paragraph blocks
    { type: 'image' },      // Images
  ],
})
```

### Object Field

**Best for:** Grouped data (author info, location)

```typescript
defineField({
  name: 'author',
  type: 'object',
  title: 'Author',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'email', type: 'email', title: 'Email' },
    { name: 'bio', type: 'text', title: 'Bio' },
  ],
})
```

### Reference Field

**Best for:** Linking to other documents

```typescript
defineField({
  name: 'author',
  type: 'reference',
  title: 'Author',
  to: [{ type: 'author' }],
})
```

### URL Field

**Best for:** Website URLs

```typescript
defineField({
  name: 'website',
  type: 'url',
  title: 'Website',
  validation: (Rule) => 
    Rule.uri({ scheme: ['http', 'https'] }),
})
```

### Email Field

**Best for:** Email addresses

```typescript
defineField({
  name: 'email',
  type: 'email',
  title: 'Email Address',
})
```

### Dropdown (String with Options)

**Best for:** Predefined choices

```typescript
defineField({
  name: 'status',
  type: 'string',
  title: 'Status',
  options: {
    list: [
      { title: 'Draft', value: 'draft' },
      { title: 'Published', value: 'published' },
      { title: 'Archived', value: 'archived' },
    ],
    layout: 'dropdown',
  },
})
```

### Portable Text (Block)

**Best for:** Rich text editing with formatting

```typescript
defineField({
  name: 'content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h1' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
      },
    },
  ],
})
```

---

## Validation Rules

### Basic Validation

```typescript
// Required field
validation: (Rule) => Rule.required()

// Min/Max length
validation: (Rule) => Rule.min(5).max(100)

// Min/Max value
validation: (Rule) => Rule.min(0).max(1000)

// Pattern matching (regex)
validation: (Rule) => Rule.regex(/^[A-Z]+$/)

// Custom validation
validation: (Rule) => 
  Rule.custom((value) => {
    if (value && value.length < 3) {
      return 'Must be at least 3 characters'
    }
    return true
  })
```

### Multiple Validations

```typescript
validation: (Rule) => [
  Rule.required().error('Title is required'),
  Rule.min(5).error('At least 5 characters'),
  Rule.max(100).error('Maximum 100 characters'),
]
```

### Conditional Validation

```typescript
validation: (Rule) => 
  Rule.custom((value, context) => {
    const parent = context.document
    
    if (parent.featured && !value) {
      return 'Description required for featured posts'
    }
    return true
  })
```

### Field-Level Validation

```typescript
defineField({
  name: 'email',
  type: 'email',
  validation: (Rule) => [
    Rule.required(),
    Rule.email(),
  ],
})

defineField({
  name: 'website',
  type: 'url',
  validation: (Rule) => 
    Rule.uri({ scheme: ['http', 'https'] }),
})
```

### Unique Slug Validation

```typescript
defineField({
  name: 'slug',
  type: 'slug',
  validation: (Rule) => 
    Rule.custom(async (value, context) => {
      if (!value) return true
      
      const existing = await context.client.fetch(
        '*[_type == "post" && slug.current == $slug]',
        { slug: value.current }
      )
      
      if (existing.length > 0 && existing[0]._id !== context.document._id) {
        return 'Slug already exists'
      }
      return true
    }),
})
```

---

## Custom Schemas

### Example: Author Schema

```typescript
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
```

### Example: Category Schema

```typescript
export const category = defineType({
  name: 'category',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
```

### Example: Gallery Item Schema

```typescript
export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
  ],
})
```

---

## Schema Management

### Adding a New Field

1. **Edit Schema File**
```typescript
defineField({
  name: 'newField',
  title: 'New Field',
  type: 'string',
})
```

2. **Update Studio**
```bash
npm run dev
```

3. **Field Available in Studio**
- All documents can use the new field
- Existing documents can add values

### Removing a Field

1. **Comment or Delete Field**
```typescript
// defineField({
//   name: 'oldField',
//   ...
// })
```

2. **Existing Data**
- Data persists in Sanity
- Can be recovered if needed
- Consider archiving instead

### Renaming a Field

⚠️ **Warning:** Breaking change!

1. **Create New Field**
2. **Migrate Data**
3. **Delete Old Field**

### Schema Versioning

Track changes in comments:

```typescript
// Schema v1.0 - Initial setup
// Schema v1.1 - Added excerpt field (June 2024)
// Schema v1.2 - Added category field (July 2024)

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  // ...
})
```

---

## Common Issues

### Issue: Field Not Appearing in Studio

**Solution:**
1. Export schema in `index.ts`
2. Restart studio: `npm run dev`
3. Clear browser cache

```typescript
// schemaTypes/index.ts
import { post } from './post'

export const schemaTypes = [post]  // Must be included
```

### Issue: Validation Error

**Check:**
- Required field without value
- Field length exceeding max
- Invalid regex pattern
- Wrong field type

**Debug:**
```typescript
validation: (Rule) => 
  Rule.custom((value) => {
    console.log('Value:', value)  // Debug
    return true
  })
```

### Issue: Slug Conflicts

**Solution:**
1. Manual edit slug
2. Add suffix: `-2`, `-variant`
3. Use unique identifier in slug

### Issue: Image Hotspot Not Working

**Solution:**
1. Ensure `hotspot: true`
2. Upload different image format
3. Check image file integrity

### Issue: Reference Field Not Showing

**Solution:**
```typescript
defineField({
  name: 'author',
  type: 'reference',
  to: [{ type: 'author' }],  // Must reference valid type
})
```

Ensure referenced schema is exported in `index.ts`.

---

## Tips & Tricks

### Use Field Groups

Organize fields in tabs:

```typescript
fieldsets: [
  {
    name: 'content',
    title: 'Content',
  },
  {
    name: 'metadata',
    title: 'Metadata',
  },
]

fields: [
  defineField({
    name: 'title',
    fieldset: 'content',
    // ...
  }),
  defineField({
    name: 'seoTitle',
    fieldset: 'metadata',
    // ...
  }),
]
```

### Custom Preview

```typescript
preview: {
  select: {
    title: 'title',
    category: 'category',
    date: 'date',
    media: 'mainImage',
  },
  prepare({ title, category, date, media }) {
    return {
      title,
      subtitle: `${category} • ${new Date(date).toLocaleDateString()}`,
      media,
    }
  },
}
```

### Field Descriptions

Add helpful hints:

```typescript
defineField({
  name: 'excerpt',
  title: 'Excerpt',
  type: 'string',
  description: 'Max 160 characters. Shown in blog listings.',
})
```

---

**Last Updated**: June 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
