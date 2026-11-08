import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    allowedHosts: [
      'sb-pybcp2zbqchv.vercel.run'
    ]
  }
});
