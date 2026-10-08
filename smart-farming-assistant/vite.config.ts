import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'SmartFarm AI — Smart Farming Assistant',
        short_name: 'SmartFarm AI',
        description: 'AI-powered smart farming assistant for crop health, weather, disease detection, and government schemes.',
        theme_color: '#2E7D32',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache static assets (JS, CSS, fonts, images)
        globPatterns: ['**/*.{js,css,html,ico,svg,png,woff2}'],
        // Runtime caching for external APIs that are safe to cache
        runtimeCaching: [
          {
            // Open-Meteo weather API — cache for 10 minutes
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'open-meteo-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 600 },
            },
          },
          {
            // Nominatim reverse geocoding — cache for 1 hour
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'nominatim-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 3600 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true, // expose to local network so phone can connect via IP
  },
})
