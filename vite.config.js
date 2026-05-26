import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/rotten-apples/', // I'm most defo on the spectrum
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',  // output directory
    minify: 'terser', // minification strategy
    rollupOptions: {
      input: {
        main: './index.html',
      }
    }
  }
})
