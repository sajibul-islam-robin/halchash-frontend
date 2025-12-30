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

## Netlify Deployment

This project is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Set the build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build` (or `pnpm build`)
   - **Publish directory**: `frontend/dist`
3. Deploy!

The backend API is configured to use: `https://halchash-nodejs-backend.onrender.com`

To override the API URL, create a `.env` file in the frontend directory:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

