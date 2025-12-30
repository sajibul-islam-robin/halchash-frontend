# Halchash Frontend

React + Vite frontend application for Halchash e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Vercel Deployment

This project is configured for Vercel deployment:

1. Connect your repository to Vercel
2. Set the build settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (or `pnpm build`)
   - **Output Directory**: `dist`
   - **Framework Preset**: Vite
3. The `vercel.json` file handles SPA routing automatically
4. Deploy!

The backend API is configured to use: `https://halchash-nodejs-backend.onrender.com`

To override the API URL, create a `.env` file in the frontend directory or set it in Vercel environment variables:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

## Netlify Deployment (Alternative)

If deploying to Netlify instead:
1. Connect your repository to Netlify
2. Set the build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build` (or `pnpm build`)
   - **Publish directory**: `frontend/dist`
3. The `netlify.toml` and `public/_redirects` files handle SPA routing

