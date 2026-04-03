import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getBranchPreviews } from './api/branch-previews.js';
import { getNotionLlmSessions } from './api/notion-llm-sessions.js';

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

function localNotionLlmSessionsPlugin(mode) {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    name: 'local-notion-llm-sessions',
    configureServer(server) {
      server.middlewares.use('/api/notion-llm-sessions', async (req, res, next) => {
        if (req.method !== 'GET') {
          next();
          return;
        }

        try {
          const requestUrl = new URL(req.url ?? '/', 'http://localhost');
          const limit = Number(requestUrl.searchParams.get('limit'));
          const payload = await getNotionLlmSessions({
            env: {
              ...process.env,
              ...env,
            },
            limit: Number.isFinite(limit) ? limit : undefined,
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
                  : 'Unexpected error while loading Notion LLM sessions.',
            }),
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localBranchPreviewsPlugin(mode), localNotionLlmSessionsPlugin(mode)],
  server: {
    port: 3000,
    open: true,
  },
}));
