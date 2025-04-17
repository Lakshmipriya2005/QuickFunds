import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      'c6b7-2403-8600-c090-42-0-4ff-ffb3-1abb.ngrok-free.app',
      'localhost:5173'
    ]
  }
})
