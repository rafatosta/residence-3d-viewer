import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/residence-3d-viewer/',
  plugins: [react(), tailwindcss()],
})
