import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),

  ],
  server: {
    https:{
      key: 'cacaoyvainilla-privateKey.key',
      cert: 'cacaoyvainilla-certificate.crt',
    }
  }
})