import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

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