import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router')) return 'react-vendor'
            if (id.includes('/framer-motion')) return 'motion'
            if (id.includes('/react-icons')) return 'icons'
            if (id.includes('/i18next')) return 'i18n'
            return 'vendor'
          }
        },
      },
    },
  },
})
