import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 3001,
    hmr: {
      host: 'localhost',
      port: 3001
    },
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    },
    allowedHosts: [
      'localhost',
      '*.railway.app'
    ]
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    }
  }
})
