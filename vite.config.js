import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  publicDir: 'public',
  plugins: [eslintPlugin()],
  server: {
    host: 'localhost',
    cors: '*',
    port: 1337,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'umd',
        entryFileNames: 'index.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
          sitemapController: 'SitemapController'
        },
      },
      external: ['jquery'],
    },
  },
})
