import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Locked-In-Website/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
