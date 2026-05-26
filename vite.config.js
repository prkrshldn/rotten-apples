import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',  // output directory
    minify: 'terser', // minification strategy
    rollupOptions: {
      input: {
        main: './index.html',
        album: './album.html',
        albumwall: './albumwall.html',
        list: './list.html',
      }
    }
  }
})