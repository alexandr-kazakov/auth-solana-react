import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), 
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/view/components'),
      '@pages': path.resolve(__dirname, 'src/view/pages/index.ts'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@theme': path.resolve(__dirname, 'src/theme.ts'),
    },
  },
});