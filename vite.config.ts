import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import * as path from "path"

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: process.env.NODE_ENV === "production" ? "/vue3_ec_backstage/" : "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "assets": path.resolve(__dirname, "src/assets/"),
      "img": path.resolve(__dirname, "src/img"),
      "styles": path.resolve(__dirname, "src/styles/"),
      "pages": path.resolve(__dirname, "src/pages/"),
    },
  },
  css: {
    devSourcemap: true
  }
})
