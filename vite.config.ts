import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
