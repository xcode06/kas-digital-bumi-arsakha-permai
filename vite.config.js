import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Runs the Vercel /api/state function inside `vite dev`; in production Vercel serves /api directly.
function localApi() {
  return {
    name: 'local-vercel-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''));
      server.middlewares.use('/api/state', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/state.js');
        await handler(req, res);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localApi()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
