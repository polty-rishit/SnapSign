import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        darkMode: 'class', // This enables class-based dark mode
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
        ],
        theme: {
          extend: {
            colors: {
              // Ensure your custom colors are defined
              purple: {
                500: '#8B5CF6',
                600: '#7C3AED',
                700: '#6D28D9',
                800: '#5B21B6',
                900: '#4C1D95',
              },
              cyan: {
                400: '#22D3EE',
              },
            },
          },
        },
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      "/llm": {
        target: "http://10.0.15.208:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/llm/, ''),
      },
    },
  },
});