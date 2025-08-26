import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // ✅ ensures assets load correctly on all devices
  plugins: [react()],
  build: {
    outDir: 'dist'  // ✅ Vercel will look here for built files
  },
  server: {
    port: 5173
  }
})
