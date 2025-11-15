# PDF Tools - Frontend

Modern Next.js frontend for PDF processing tools with German/English support.

## Features

- **Image to PDF Converter**: Drag and drop images to create PDFs
- **PDF Merger**: Combine multiple PDFs into one file
- **PDF Compressor**: Reduce file sizes with quality control
- **Bilingual**: Full German and English language support
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Drag & Drop**: Easy file upload interface

## Tech Stack

- Next.js 14 (Pages Router)
- React 18
- TypeScript
- Tailwind CSS
- next-i18next (internationalization)
- Axios (API calls)
- react-dropzone (file upload)

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend-railway repository)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Edit `.env.local` and set your backend URL:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Deploy to Vercel

### Quick Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   
   Add the following in Vercel dashboard → Environment Variables:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_BACKEND_URL` | `https://your-api.railway.app` | Production |
   | `NEXT_PUBLIC_BACKEND_URL` | `https://your-api.railway.app` | Preview |
   | `NEXT_PUBLIC_BACKEND_URL` | `http://localhost:8000` | Development |

   Replace `https://your-api.railway.app` with your actual Railway backend URL.

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app will be live at `https://your-app.vercel.app`

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

## Environment Variables

### Required

- `NEXT_PUBLIC_BACKEND_URL`: URL of your backend API (Railway, Render, etc.)

### Optional

No additional environment variables required.

## Project Structure

```
frontend-vercel/
├── components/           # React components
│   ├── CompressPdfUploader.tsx
│   ├── FileUploader.tsx
│   ├── Layout.tsx
│   ├── Loader.tsx
│   └── PageLoader.tsx
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # Document wrapper
│   ├── index.tsx        # Homepage
│   ├── image-to-pdf.tsx
│   ├── merge-pdf.tsx
│   └── compress-pdf.tsx
├── public/
│   └── locales/         # Translations
│       ├── de/          # German
│       └── en/          # English
├── styles/
│   └── globals.css      # Global styles
├── next.config.js       # Next.js config
├── next-i18next.config.js  # i18n config
└── package.json
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Lint code
npm run lint
```

## Language Support

The app supports German (default) and English:

- Toggle between languages using the language selector in the header
- Translations are in `public/locales/de/` and `public/locales/en/`
- To add more languages, create new folders in `public/locales/` and update `next-i18next.config.js`

## Customization

### Styling

- Edit `styles/globals.css` for global styles
- Tailwind CSS classes are used throughout components
- Update `tailwind.config.ts` to customize the theme

### Translations

Edit the JSON files in `public/locales/`:
- `de/common.json` - German translations
- `en/common.json` - English translations

### Backend URL

The backend URL is configured via environment variable:
- Development: Set in `.env.local`
- Production: Set in Vercel dashboard

## Custom Domain

1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. HTTPS is automatically configured

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

Each preview deployment gets a unique URL for testing.

## Performance

Next.js features enabled:
- Static page generation where possible
- Image optimization (Next.js Image component)
- Code splitting
- Automatic font optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API calls fail with CORS errors

Ensure your backend CORS configuration includes your Vercel domain:

```python
# In backend main.py
allow_origins=[
    "https://your-app.vercel.app",
    "https://*.vercel.app",
]
```

### Environment variable not working

- Environment variables must start with `NEXT_PUBLIC_` to be accessible in browser code
- Rebuild your app after changing environment variables in Vercel
- For local development, restart `npm run dev` after changing `.env.local`

### Build fails

- Ensure all dependencies are in `package.json`
- Check that `next.config.js` and `next-i18next.config.js` are valid
- Review build logs in Vercel dashboard

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to your project → Analytics
2. Enable Vercel Analytics
3. Install package: `npm install @vercel/analytics`
4. Add to `_app.tsx`

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user analytics

## Security

- All API calls go through Next.js rewrites (server-side proxy)
- No API keys or secrets exposed in frontend code
- HTTPS automatically enabled on Vercel
- Environment variables properly scoped

## Alternative Deployment Platforms

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

### Cloudflare Pages

1. Connect GitHub repository
2. Configure build:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

## License

This is an open-source project for PDF processing tools.

## Support

For Vercel deployment issues:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: support@vercel.com

For frontend issues, create an issue in the repository.
