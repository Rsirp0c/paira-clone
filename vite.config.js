import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getBranchPreviews } from './api/branch-previews.js';

function localBranchPreviewsPlugin(mode) {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    name: 'local-branch-previews',
    configureServer(server) {
      server.middlewares.use('/api/branch-previews', async (req, res, next) => {
        if (req.method !== 'GET') {
          next();
          return;
        }

        try {
          const payload = await getBranchPreviews({
            ...process.env,
            ...env,
          });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(payload));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(
            JSON.stringify({
              error:
                error instanceof Error
                  ? error.message
                  : 'Unexpected error while loading branch previews.',
            }),
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localBranchPreviewsPlugin(mode)],
  server: {
    port: 3000,
    open: true,
  },
}));
