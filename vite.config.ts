import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' set to './' allows assets to be loaded correctly on GitHub Pages
  base: "/coats-legal/",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure we don't have conflicting chunk issues
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
