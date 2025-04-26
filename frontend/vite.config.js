import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      'd6f3-2409-408d-3e37-cfcd-657e-d8c8-dca0-347e.ngrok-free.app',
      'localhost:5173'
    ]
  }
})
