import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/LAFILof/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-ui': ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})
