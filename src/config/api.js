// API Base URL - defaults to Render backend
// To override, create a .env file in the frontend directory with:
// VITE_API_BASE_URL=https://halchash-nodejs-backend.onrender.com
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://halchash-nodejs-backend.onrender.com';