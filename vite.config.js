import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SmartParking',
        short_name: 'SmartPark',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4CAF50',
        icons: [
          {
            src: '/app1.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/app1.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  devOptions: {
    enabled: true // Enable service worker in development
  },
});
