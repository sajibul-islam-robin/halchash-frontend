import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['recharts', '@radix-ui/react-select', '@radix-ui/react-dialog', '@radix-ui/react-label'],
    exclude: []
  },
  server: {
    fs: {
      strict: false
    }
  }
})
