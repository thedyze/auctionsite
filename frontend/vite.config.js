import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   host:true,
    proxy: {
      "/api": "http://192.168.1.231:4000",
      "/rest": "http://192.168.1.231:4000",
      "/logout": "http://192.168.1.231:4000",
      "/uploads": "http://192.168.1.231:4000",
    },
  },
});
