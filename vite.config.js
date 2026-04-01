import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy /api/* to the local dev API server (scripts/dev-api.mjs on port 3001)
    // Only used when running `npm run dev:vite` alongside `npm run dev:api`
    // When using `npm run dev` (vercel dev), this proxy is ignored — Vercel handles /api/*
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
