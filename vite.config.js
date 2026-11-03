import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pagesのプロジェクトサイトのパス(リポジトリ名と大文字小文字まで一致させる)
  base: '/Mydashboard/',
})
