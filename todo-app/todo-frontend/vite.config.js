import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let host;

if (process.env.VITE_BACKEND_URL) {
  host = true
} else {
  host = 'localhost'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: host,
    allowedHosts: ['frontend', 'localhost'],
  },
})
