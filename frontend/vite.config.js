import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:true,
    proxy: {
      "/api": "http://10.250.84.76:4000",
      "/rest": "http://10.250.84.76:4000",
      "/logout": "http://10.250.84.76:4000",
      "/uploads": "http://10.250.84.76:4000",
    },
  },
});
