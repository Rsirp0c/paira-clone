const NOTION_API_BASE_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2025-09-03';

const DEFAULT_RUNS_DATA_SOURCE_ID = 'cf7abce6-de50-44b4-b6de-427bed6eea78';
const DEFAULT_STEPS_DATA_SOURCE_ID = 'f9bb9238-4aae-4bba-8d72-6bc7a4fd6806';
const DEFAULT_RUN_LIMIT = 24;
const MAX_RUN_LIMIT = 200;

function clampLimit(limit) {
  if (!Number.isFinite(limit)) {
    return DEFAULT_RUN_LIMIT;
  }

  return Math.min(Math.max(Math.round(limit), 1), MAX_RUN_LIMIT);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeText(value) {
  return String(value ?? '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n?/g, '\n')
    .replace(/\u00a0/g, ' ')
    .trim();
}

function extractPlainText(items) {
  if (!Array.isArray(items)) {
    return '';
  }

  return items
    .map((item) => item?.plain_text ?? item?.text?.content ?? '')
    .join('');
}

function getProperty(page, name) {
  return page?.properties?.[name] ?? null;
}

function getTitle(page, name) {
  const property = getProperty(page, name);
  return normalizeText(extractPlainText(property?.title));
}

function getRichText(page, name) {
  const property = getProperty(page, name);
  return normalizeText(extractPlainText(property?.rich_text));
}

function getSelectName(page, name) {
  const property = getProperty(page, name);
  return normalizeText(property?.select?.name ?? property?.status?.name ?? '');
}

function getBoolean(page, name) {
  const property = getProperty(page, name);
  return Boolean(property?.checkbox);
}

function getNumber(page, name) {
  const property = getProperty(page, name);
  return typeof property?.number === 'number' ? property.number : null;
}

function getTimestamp(page, name) {
  const property = getProperty(page, name);
  return property?.created_time ?? property?.last_edited_time ?? null;
}

function getRelationIds(page, name) {
  const property = getProperty(page, name);

  if (!Array.isArray(property?.relation)) {
    return [];
  }

  return property.relation
    .map((entry) => entry?.id)
    .filter(Boolean);
}

function extractField(text, fieldName) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return '';
  }

  const expression = new RegExp(
    `(?:^|\\n)${escapeRegExp(fieldName)}:\\s*([\\s\\S]*?)(?=\\n[\\w ][\\w ()/-]*:\\s|$)`,
    'i',
  );

  const match = normalized.match(expression);
  return normalizeText(match?.[1] ?? '');
}

function buildAssistantConversation(step) {
  const summary = normalizeText(step.aiOutputSummary);

  if (!summary) {
    return '';
  }

  if (step.stepType === 'Validate') {
    return extractField(summary, 'message');
  }

  if (step.stepType === 'Clarify') {
    return extractField(summary, 'reply') || summary;
  }

  if (step.stepType === 'Generate Draft') {
    const title = extractField(summary, 'Title');
    const description = extractField(summary, 'Description');

    if (title || description) {
      return normalizeText([title, description].filter(Boolean).join('\n\n'));
    }
  }

  return summary;
}

function formatStageLabel(stepType) {
  return normalizeText(stepType || 'Step');
}

async function notionRequest(path, { env, method = 'GET', body, searchParams } = {}) {
  const token = env.NOTION_TOKEN || env.NOTION_API_KEY || env.NOTION_ACCESS_TOKEN;

  if (!token) {
    throw new Error('Missing NOTION_TOKEN. Add it to your local environment before loading LLM sessions.');
  }

  const url = new URL(`${NOTION_API_BASE_URL}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (Array.isArray(value)) {
        value.forEach((entry) => {
          if (entry !== undefined && entry !== null && entry !== '') {
            url.searchParams.append(key, String(entry));
          }
        });
        continue;
      }

      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Notion API request failed (${response.status}): ${message}`);
  }

  return response.json();
}

async function queryDataSource({ dataSourceId, env, filterProperties = [], sorts = [], maxItems = null }) {
  const results = [];
  let nextCursor = null;

  while (true) {
    const remainingItems =
      typeof maxItems === 'number' ? Math.max(maxItems - results.length, 0) : null;

    if (remainingItems === 0) {
      break;
    }

    const payload = await notionRequest(`/data_sources/${dataSourceId}/query`, {
      env,
      method: 'POST',
      body: {
        page_size: remainingItems ? Math.min(remainingItems, 100) : 100,
        start_cursor: nextCursor ?? undefined,
        sorts,
      },
      searchParams: filterProperties.length
        ? { 'filter_properties[]': filterProperties }
        : undefined,
    });

    results.push(...(payload.results ?? []));

    if (!payload.has_more || !payload.next_cursor) {
      break;
    }

    nextCursor = payload.next_cursor;
  }

  return results;
}

function mapRun(page) {
  return {
    id: page.id,
    notionUrl: page.url,
    title: getTitle(page, 'Run Name') || 'Untitled run',
    originalQuery: getRichText(page, 'Original Query'),
    currentStage: getSelectName(page, 'Current Stage'),
    outcome: getSelectName(page, 'Outcome'),
    finalAnswerSummary: getRichText(page, 'Final Answer Summary'),
    finalSource: getSelectName(page, 'Final Source'),
    conversationId: getRichText(page, 'Conversation ID'),
    userId: getRichText(page, 'User ID'),
    accepted: getBoolean(page, 'Accepted'),
    needsReview: getBoolean(page, 'Needs Review'),
    startedAt: getTimestamp(page, 'Started At') ?? page.created_time ?? null,
    lastUpdated: getTimestamp(page, 'Last Updated') ?? page.last_edited_time ?? null,
  };
}

function mapStep(page) {
  return {
    id: page.id,
    notionUrl: page.url,
    runIds: getRelationIds(page, 'Run'),
    stepName: getTitle(page, 'Step Name') || 'Untitled step',
    stepType: getSelectName(page, 'Step Type'),
    stepOrder: getNumber(page, 'Step Order'),
    status: getSelectName(page, 'Status'),
    inputSummary: getRichText(page, 'Input Summary'),
    aiOutputSummary: getRichText(page, 'AI Output Summary'),
    humanOutputSummary: getRichText(page, 'Human Output Summary'),
    selectedPath: getRichText(page, 'Selected Path'),
    model: getRichText(page, 'Model'),
    latencyMs: getNumber(page, 'Latency ms'),
    matchScore: getNumber(page, 'Match Score'),
    confidence: getNumber(page, 'Confidence'),
    needsHumanReview: getBoolean(page, 'Needs Human Review'),
    createdAt: getTimestamp(page, 'Created At') ?? page.created_time ?? null,
    lastUpdated: getTimestamp(page, 'Last Updated') ?? page.last_edited_time ?? null,
  };
}

function compareSteps(left, right) {
  const leftOrder = Number.isFinite(left.stepOrder) ? left.stepOrder : Number.MAX_SAFE_INTEGER;
  const rightOrder = Number.isFinite(right.stepOrder) ? right.stepOrder : Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return String(left.createdAt ?? '').localeCompare(String(right.createdAt ?? ''));
}

function buildConversation(run, steps) {
  const conversation = [];

  if (run.originalQuery) {
    conversation.push({
      id: `${run.id}-origin`,
      role: 'user',
      stage: 'Original Query',
      text: run.originalQuery,
      createdAt: run.startedAt,
    });
  }

  steps.forEach((step) => {
    if (step.humanOutputSummary) {
      conversation.push({
        id: `${step.id}-human`,
        role: 'user',
        stage: formatStageLabel(step.stepType),
        text: step.humanOutputSummary,
        createdAt: step.createdAt,
      });
    }

    const assistantText = buildAssistantConversation(step);

    if (assistantText) {
      conversation.push({
        id: `${step.id}-assistant`,
        role: 'assistant',
        stage: formatStageLabel(step.stepType),
        text: assistantText,
        createdAt: step.createdAt,
      });
    }
  });

  return conversation;
}

function attachStepsToRuns(runs, steps) {
  const stepsByRunId = new Map();

  steps.forEach((step) => {
    step.runIds.forEach((runId) => {
      const existingSteps = stepsByRunId.get(runId) ?? [];
      existingSteps.push(step);
      stepsByRunId.set(runId, existingSteps);
    });
  });

  return runs.map((run) => {
    const runSteps = (stepsByRunId.get(run.id) ?? []).sort(compareSteps);
    const totalLatencyMs = runSteps.reduce(
      (total, step) => total + (typeof step.latencyMs === 'number' ? step.latencyMs : 0),
      0,
    );

    return {
      ...run,
      steps: runSteps,
      conversation: buildConversation(run, runSteps),
      stepCount: runSteps.length,
      totalLatencyMs,
    };
  });
}

export async function getNotionLlmSessions({ env = process.env, limit = DEFAULT_RUN_LIMIT } = {}) {
  const runsDataSourceId = env.NOTION_RUNS_DATA_SOURCE_ID || DEFAULT_RUNS_DATA_SOURCE_ID;
  const stepsDataSourceId = env.NOTION_STEPS_DATA_SOURCE_ID || DEFAULT_STEPS_DATA_SOURCE_ID;
  const normalizedLimit = clampLimit(Number(limit));

  const runs = await queryDataSource({
    dataSourceId: runsDataSourceId,
    env,
    filterProperties: [
      'Run Name',
      'Original Query',
      'Current Stage',
      'Outcome',
      'Final Answer Summary',
      'Final Source',
      'Conversation ID',
      'User ID',
      'Accepted',
      'Needs Review',
      'Started At',
      'Last Updated',
    ],
    sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }],
    maxItems: normalizedLimit + 1,
  });

  const hasMore = runs.length > normalizedLimit;
  const limitedRuns = hasMore ? runs.slice(0, normalizedLimit) : runs;
  const mappedRuns = limitedRuns.map(mapRun);
  const recentRunIds = new Set(mappedRuns.map((run) => run.id));

  const steps = await queryDataSource({
    dataSourceId: stepsDataSourceId,
    env,
    filterProperties: [
      'Run',
      'Step Name',
      'Step Type',
      'Step Order',
      'Status',
      'Input Summary',
      'AI Output Summary',
      'Human Output Summary',
      'Selected Path',
      'Model',
      'Latency ms',
      'Match Score',
      'Confidence',
      'Needs Human Review',
      'Created At',
      'Last Updated',
    ],
    sorts: [
      { property: 'Step Order', direction: 'ascending' },
      { timestamp: 'created_time', direction: 'ascending' },
    ],
  });

  const mappedSteps = steps
    .map(mapStep)
    .filter((step) => step.runIds.some((runId) => recentRunIds.has(runId)));

  const sessions = attachStepsToRuns(mappedRuns, mappedSteps);

  return {
    fetchedAt: new Date().toISOString(),
    hasMore,
    limit: normalizedLimit,
    stats: {
      runCount: sessions.length,
      stepCount: mappedSteps.length,
      acceptedCount: sessions.filter((session) => session.accepted).length,
      needsReviewCount: sessions.filter((session) => session.needsReview).length,
    },
    sessions,
  };
}
