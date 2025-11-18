# PDF Tools Frontend

## Overview

PDF Tools is a modern web application built with Next.js that provides free online PDF processing tools. The application offers three core features: converting images to PDF, merging multiple PDFs, and compressing PDFs with quality control. The application is fully bilingual, supporting both German (default) and English languages, and features a responsive design that works across desktop, tablet, and mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14 with Pages Router (not App Router)
- **Rationale**: Pages Router provides stable, well-documented routing with built-in file-system based routing and server-side rendering capabilities
- **TypeScript**: Full type safety across components and pages
- **React 18**: Modern React features with concurrent rendering support

**Styling Solution**: Tailwind CSS
- **Rationale**: Utility-first CSS framework enables rapid development with consistent design
- **Custom Theme**: Ocean blue color palette with gradient effects
  - Deep Twilight (#03045e): Primary dark navy shade
  - French Blue (#023e8a): Bold European blue
  - Bright Teal (#0077b6): Primary brand color
  - Blue Green (#0096c7): Dynamic oceanic blue
  - Turquoise (#00b4d8): Vibrant surf color
  - Sky Aqua (#48cae4): Secondary brand color
  - Frosted Blue (#90e0ef): Light accent
  - Frosted Light (#ade8f4): Subtle highlight
  - Light Cyan (#caf0f8): Background tint
- **Responsive Design**: Mobile-first approach using Tailwind's responsive utilities
- **Visual Features**: Gradient backgrounds, gradient text effects, smooth transitions, hover animations, and modern rounded corners

**Internationalization (i18n)**: next-i18next
- **Supported Languages**: German (de - default), English (en)
- **Locale Detection**: Disabled to ensure German is always the default landing language
- **Translation Files**: JSON-based translations in `/public/locales/{locale}/common.json`
- **Static Generation**: Uses `serverSideTranslations` for static page generation with translations
- **User Guidance**: One-time language popup appears to first-time visitors, pointing to the language toggle button to help them discover the language switching feature

**Component Architecture**:
- **Layout Component**: Provides navigation with gradient background, language switcher with visual highlight, and consistent page structure. Includes a one-time language tutorial popup that appears on first visit to help users discover the language toggle feature.
- **Reusable File Uploaders**: 
  - Generic `FileUploader` component for image-to-pdf and merge-pdf tools with ocean blue gradient styling
  - Specialized `CompressPdfUploader` with quality control settings (DPI, image quality, color mode) and gradient UI elements
- **Loading States**: `Loader` and `PageLoader` components for processing feedback
- **File Upload**: react-dropzone library for drag-and-drop functionality with gradient hover effects and smooth transitions

### Backend Integration

**API Communication**: Axios for HTTP requests
- **Proxy Configuration**: Next.js rewrites route `/api/*` requests to backend server
- **Environment Variable**: `NEXT_PUBLIC_BACKEND_URL` configures backend endpoint
- **Fallback**: Defaults to `http://localhost:8000` for local development
- **File Upload**: FormData with multipart/form-data for file transfers
- **Response Handling**: Blob responses for downloadable PDF files

**API Endpoints Used**:
- `/api/image-to-pdf`: Converts images to PDF
- `/api/merge-pdf`: Merges multiple PDFs
- `/api/compress-pdf`: Compresses PDFs with quality parameters (dpi, image_quality, color_mode)

### Routing Structure

**Static Pages**:
- `/`: Homepage with tool selection cards
- `/image-to-pdf`: Image to PDF conversion tool
- `/merge-pdf`: PDF merging tool
- `/compress-pdf`: PDF compression tool with quality controls
- `/blog`: Blog listing page showing all posts
- `/blog/[slug]`: Dynamic blog post pages

**Locale-aware URLs**: Each page supports `/de/` and `/en/` prefixes for language-specific content

### State Management

**Local Component State**: React useState hooks for:
- File selection and storage
- Processing status
- Download URLs
- Error messages
- Compression settings (DPI, quality, color mode)

**No Global State**: Application uses component-level state management, sufficient for the isolated nature of each tool

### Build and Development

**Development Server**: Runs on port 5000, bound to 0.0.0.0 for network accessibility
**Production Build**: Static optimization with Next.js build process
**Type Checking**: TypeScript strict mode enabled for compile-time error detection

## External Dependencies

### Core Framework Dependencies
- **next** (14.1.0): React framework for server-side rendering and static site generation
- **react** (18.2.0) & **react-dom** (18.2.0): Core React libraries

### UI and Interaction
- **react-dropzone** (14.2.3): Drag-and-drop file upload interface
- **react-icons** (5.0.1): Icon library (using Feather Icons - Fi prefix)
- **tailwindcss** (3.4.1): Utility-first CSS framework with autoprefixer and postcss

### Internationalization
- **next-i18next** (15.2.0): i18n framework for Next.js with server-side translations

### HTTP Client
- **axios** (1.6.5): Promise-based HTTP client for API requests with multipart/form-data support

### Markdown and Content Processing
- **gray-matter** (latest): YAML frontmatter parser for blog posts
- **remark** (latest): Markdown processor
- **remark-html** (latest): Converts markdown to HTML

### Development Tools
- **TypeScript** (5.3.3): Static type checking
- **ESLint**: Code linting with Next.js configuration
- **Autoprefixer**: CSS vendor prefix automation

### Backend Service
- **Separate Backend API**: External service (referenced as "backend-railway repository") handles actual PDF processing
- **Connection**: Frontend proxies API requests through Next.js rewrites
- **No Database**: Frontend is stateless; all file processing is handled by backend API

### Blog System (November 2025)

**Markdown-Based Blog**: File-system based blog with auto-discovery and full bilingual support
- **Content Location**: All blog posts stored in `/content/blog/` as `.md` files
- **Frontmatter Support**: Each post uses YAML frontmatter for metadata (title, date, and optional German translations)
- **Auto-Discovery**: New posts automatically appear when `.md` files are added to `/content/blog/`
- **Static Generation**: Blog pages use getStaticProps/getStaticPaths for optimal performance
- **Bilingual Content**: Posts automatically display German or English content based on selected site locale

**Technical Implementation**:
- **lib/blog.ts**: Server-side utilities for reading/parsing markdown files (uses fs, path, gray-matter, remark)
  - Processes both English content (main markdown body) and German content (contentDe frontmatter field)
  - Generates excerpts for both languages automatically
  - Converts markdown to HTML for both English and German content
  - Safely handles posts with or without German translations (falls back to English)
- **lib/blogUtils.ts**: Client-safe utilities (formatDate function for date rendering)
- **Markdown Processing**: gray-matter for frontmatter, remark + remark-html for markdown-to-HTML conversion
- **Date Handling**: Robust validation handles missing/invalid dates without crashes; posts sorted newest-first with undated posts at end
- **Styling**: Custom prose CSS classes in `styles/globals.css` for beautiful markdown rendering
- **Webpack Configuration**: `next.config.js` includes fallback for fs/path to prevent client-side bundling errors

**Blog Pages**:
- **/blog**: Listing page with post titles, dates, excerpts, and read-more links
  - Uses `router.locale` to display German titles/excerpts when locale is 'de'
  - Falls back to English content when German translation is missing
- **/blog/[slug]**: Individual post pages with full markdown content rendering
  - Automatically displays German content when site is in German locale
  - Seamlessly switches between languages when user toggles locale
- **Navigation**: Blog link integrated into Layout component with i18n support
- **Translation Keys**: Added to both German and English locale files (`blog.title`, `blog.readMore`, `blog.backToBlog`, etc.)

**Bilingual Content Format**:
Posts support optional German translations through frontmatter fields:
- **titleDe**: German translation of the title
- **contentDe**: German markdown content (in YAML block format using `|`)
- **excerptDe**: Auto-generated from German content, or falls back to English excerpt

**Content Management**:
- Upload new `.md` files to `/content/blog/` via GitHub
- Required frontmatter: `title` (string), `date` (ISO format like "2025-01-20")
- Optional frontmatter: `titleDe` (German title), `contentDe: |` (German content in YAML block format)
- Optional slug: filename becomes URL slug (e.g., `my-post.md` → `/blog/my-post`)
- Posts appear automatically after deployment with no code changes needed
- See `/content/blog/upload-blog.md` for comprehensive bilingual upload guide

**Example Bilingual Post**:
```markdown
---
title: "Welcome to PDF Wandler"
titleDe: "Willkommen bei PDF Wandler"
date: "2025-01-15"
contentDe: |
  Dies ist der deutsche Inhalt...
  
  ## Deutsche Überschrift
  Deutscher Text hier.
---

This is the English content...

## English Heading
English text here.
```

## SEO and Security Features

### SEO Assets (November 2025)
The application includes comprehensive SEO optimization for Google Search Console indexing:

**Sitemap**: `/public/sitemap.xml`
- Includes all pages (home, image-to-pdf, merge-pdf, compress-pdf)
- Supports bilingual hreflang tags for German (de) and English (en)
- **⚠️ IMPORTANT**: Replace `https://your-domain.com` with your actual production domain before deploying

**Robots.txt**: `/public/robots.txt`
- Allows all search engines to crawl the site
- References sitemap.xml for indexing
- **⚠️ IMPORTANT**: Replace `https://your-domain.com` with your actual production domain before deploying

**Meta Tags**: Added to all pages (index, image-to-pdf, merge-pdf, compress-pdf)
- Title and description tags optimized for German audience
- Open Graph tags for social media sharing
- Twitter Card tags for enhanced Twitter previews
- Canonical URLs for duplicate content prevention
- German-focused keywords (PDF Tools, PDF konvertieren, PDF zusammenführen, PDF komprimieren, DSGVO, Deutschland)
- **⚠️ IMPORTANT**: Replace `https://your-domain.com` in canonical URLs with your actual production domain before deploying

### Security Section (November 2025)
A prominent "Warum uns wählen?" (Why Choose Us) section appears on the homepage above the footer, emphasizing German data protection and privacy:

**Key Messages** (fully bilingual):
1. **German Servers Only**: All processing happens exclusively on servers located in Germany
2. **GDPR/DSGVO Compliance**: Full compliance with German and European data protection laws
3. **No Database Storage**: Files are never stored in databases; processing happens in memory only
4. **Automatic Deletion**: All files are automatically deleted after processing sessions end

**Visual Design**: 
- Ocean blue gradient background (deep-twilight to bright-teal)
- Four feature cards with icons (FiServer, FiShield, FiDatabase, FiTrash2)
- Hover effects and smooth transitions
- White text on gradient background for maximum visibility

**Translation Keys** (in `/public/locales/{locale}/common.json`):
- `security.title`, `security.subtitle`
- `security.germanServers.title/description`
- `security.dataProtection.title/description`
- `security.noDatabase.title/description`
- `security.autoDelete.title/description`

## Deployment Notes

### Before Production Deployment

1. **Update Domain URLs**: Search and replace all instances of `https://your-domain.com` in:
   - `/public/sitemap.xml` (all `<loc>` and `<xhtml:link>` tags)
   - `/public/robots.txt` (Sitemap URL)
   - All page files with canonical URLs (`pages/index.tsx`, `pages/image-to-pdf.tsx`, `pages/merge-pdf.tsx`, `pages/compress-pdf.tsx`)

2. **Set Environment Variable**: Configure `NEXT_PUBLIC_BACKEND_URL` to point to your production backend API

3. **Google Search Console**: After deployment, submit your sitemap at `https://your-domain.com/sitemap.xml` to Google Search Console for indexing