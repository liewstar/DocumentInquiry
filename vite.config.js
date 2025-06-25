import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router']
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://8.137.36.93:8686',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        timeout: 30000,
        configure: (proxy, options) => {
          // 代理配置项
          return {
            ...options,
            // 处理WebSocket
            ws: true,
            // 记录代理错误
            onError: (err, req, res) => {
              console.error('代理请求错误:', err);
            }
          }
        }
      }
    }
  },
  base: '/DocumentInquiry/'
}) 