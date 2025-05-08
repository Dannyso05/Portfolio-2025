import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteStaticCopy({
    targets: [
      {
        src: 'src/assets/remitbee_logo.jpeg',
        dest: 'assets'
      },
      {
        src: 'src/assets/countable_io_logo.jpeg',
        dest: 'assets'
      },
      {
        src: 'src/assets/environment_canada_logo.jpeg',
        dest: 'assets'
      },
      {
        src: 'src/assets/1703795023034.jpeg',
        dest: 'assets'
      }
    ]
  })],
  base: '/Portfolio-2025/',    
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
})

// vite.config.js / vite.config.ts

