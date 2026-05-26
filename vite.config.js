import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',  // output directory
    minify: 'terser', // minification strategy
    base: '/rotten-apples/',
    rollupOptions: {
      input: {
        main: './index.html',
      }
    }
  }
})
