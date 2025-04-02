/**
 * Vite configuration for development and build.
 *
 * Added proxy configuration to route API requests during development.
 * This avoids CORS issues when the frontend and backend are on different ports.
 *
 * Had to explicitly set port 5173 to match what was being used in development
 * after strange issues with hot reloading on the default port.
 */

import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});