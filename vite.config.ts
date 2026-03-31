import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 静态托管在 GitHub Pages 子路径或根站点时，用相对路径加载资源
  base: './',
  plugins: [react()],
})
