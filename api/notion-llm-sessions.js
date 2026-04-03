import { getNotionLlmSessions } from '../lib/notionLlmSessions.js';

function parseLimit(rawLimit) {
  const parsedLimit = Number(rawLimit);
  return Number.isFinite(parsedLimit) ? parsedLimit : undefined;
}

function readLimitFromRequest(request) {
  if (request?.query?.limit) {
    return parseLimit(request.query.limit);
  }

  if (!request?.url) {
    return undefined;
  }

  try {
    const url = new URL(request.url, 'http://localhost');
    return parseLimit(url.searchParams.get('limit'));
  } catch {
    return undefined;
  }
}

export default async function handler(request, response) {
  try {
    const payload = await getNotionLlmSessions({
      env: process.env,
      limit: readLimitFromRequest(request),
    });

    response.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300');
    response.status(200).json(payload);
  } catch (error) {
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Unexpected error while loading Notion LLM sessions.',
    });
  }
}

export { getNotionLlmSessions };
