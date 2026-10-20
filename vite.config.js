import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssMinify: false,
    rolldownOptions: {
      input: fileURLToPath(new URL('./src/assets/scss/main.scss', import.meta.url)),
      output: {
        assetFileNames: 'design-system[extname]',
      },
    },
  },
})
