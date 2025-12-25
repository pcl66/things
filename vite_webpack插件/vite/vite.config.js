import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { preloadImg } from './plugins/preload-img'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),preloadImg({dir: 'images/*.{svg,png,jpg}',mode:'prefetch'})],
})
