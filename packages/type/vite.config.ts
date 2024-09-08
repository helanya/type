import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/type.ts'),
      name: 'MyTypes',
      fileName: (format) => `my-types.${format}.js`
    },
    rollupOptions: {
      external: [], // 如果有外部依赖,在这里列出
      output: {
        globals: {} // 如果有全局变量需要定义,在这里添加
      }
    }
  }
})
