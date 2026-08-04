import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    cssMinify: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react'
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('zustand')) return 'state'
            if (id.includes('zod') || id.includes('react-hook-form') || id.includes('@hookform')) return 'forms'
            if (id.includes('lucide-react')) return 'icons'
            if (
              id.includes('react-markdown') ||
              id.includes('remark-') ||
              id.includes('rehype-') ||
              id.includes('highlight.js') ||
              id.includes('micromark') ||
              id.includes('mdast') ||
              id.includes('hast')
            )
              return 'markdown'
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
})
