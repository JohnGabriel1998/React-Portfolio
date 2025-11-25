import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    include: ['postprocessing', 'three', 'face-api.js'],
    exclude: []
  },
  server: {
    fs: {
      strict: false
    }
  }
})