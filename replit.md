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

### Development Tools
- **TypeScript** (5.3.3): Static type checking
- **ESLint**: Code linting with Next.js configuration
- **Autoprefixer**: CSS vendor prefix automation

### Backend Service
- **Separate Backend API**: External service (referenced as "backend-railway repository") handles actual PDF processing
- **Connection**: Frontend proxies API requests through Next.js rewrites
- **No Database**: Frontend is stateless; all file processing is handled by backend API