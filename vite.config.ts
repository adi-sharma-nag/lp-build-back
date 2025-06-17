import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-hot-toast', 'react-markdown'],
          'icons': ['lucide-react'],
          'ai': ['@google/generative-ai']        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: false,
    sourcemap: false
  },
  base: '/'
})