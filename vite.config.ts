import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // Bundled for prerendering because this package's named exports don't load in Node's ESM loader
  ssr: { noExternal: ['react-helmet-async'] },
  // embed.html is a second shell with no ad or analytics scripts, for wheels embedded on other sites
  build: isSsrBuild ? {} : {
    rollupOptions: {
      input: { main: 'index.html', embed: 'embed.html' }
    }
  }
}))
