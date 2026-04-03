import { motion, AnimatePresence } from 'framer-motion';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatTimestamp(value) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function formatDuration(milliseconds) {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return '0 ms';
  if (milliseconds >= 1000) return `${(milliseconds / 1000).toFixed(1)} s`;
  return `${Math.round(milliseconds)} ms`;
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return null;
  return `${Math.round(value * 100)}%`;
}

function matchesSession(session, query) {
  if (!query) return true;
  const haystack = [
    session.title,
    session.originalQuery,
    session.currentStage,
    session.outcome,
    session.conversationId,
    session.userId,
    session.conversation.map((entry) => entry.text).join('\n'),
  ]
    .join('\n')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function Tag({ children, tone = 'default' }) {
  const toneClassName = {
    default: 'border-white/10 bg-white/[0.05] text-primary-neutral-100',
    accent: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100',
    success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100',
    warning: 'border-amber-400/20 bg-amber-400/10 text-amber-100',
    stage: 'border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100',
    error: 'border-rose-400/20 bg-rose-400/10 text-rose-100',
  }[tone];

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${toneClassName}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-neutral-300">{label}</p>
      <p className="mt-2 text-[28px] font-semibold leading-none text-primary-neutral-50">{value}</p>
      {helper ? <p className="mt-1.5 text-[12px] text-primary-neutral-300">{helper}</p> : null}
    </div>
  );
}

function ConversationTurn({ entry }) {
  const isUser = entry.role === 'user';
  const bubbleClassName = isUser
    ? 'ml-auto bg-[#605cff] text-[#f7f7f1]'
    : 'mr-auto border border-white/10 bg-white/[0.05] text-primary-neutral-50';

  return (
    <div className="space-y-1.5">
      <div className={`flex flex-wrap items-center gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <Tag tone={isUser ? 'accent' : 'stage'}>{entry.stage}</Tag>
        <span className="text-[11px] text-primary-neutral-300">{formatTimestamp(entry.createdAt)}</span>
      </div>
      <div className={`max-w-[88%] rounded-[18px] px-3.5 py-2.5 ${bubbleClassName}`}>
        <p className="whitespace-pre-wrap text-[13px] leading-5">{entry.text}</p>
      </div>
    </div>
  );
}

const STEP_TYPE_COLORS = {
  Validate: { dot: 'bg-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/10', text: 'text-emerald-300', active: 'border-emerald-400/60 bg-emerald-400/20' },
  Clarify: { dot: 'bg-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/10', text: 'text-amber-300', active: 'border-amber-400/60 bg-amber-400/20' },
  'Recommend Paths': { dot: 'bg-fuchsia-400', border: 'border-fuchsia-400/30', bg: 'bg-fuchsia-400/10', text: 'text-fuchsia-300', active: 'border-fuchsia-400/60 bg-fuchsia-400/20' },
  'Generate Draft': { dot: 'bg-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-400/10', text: 'text-cyan-300', active: 'border-cyan-400/60 bg-cyan-400/20' },
  Match: { dot: 'bg-blue-400', border: 'border-blue-400/30', bg: 'bg-blue-400/10', text: 'text-blue-300', active: 'border-blue-400/60 bg-blue-400/20' },
};

function getStepColors(stepType) {
  return STEP_TYPE_COLORS[stepType] ?? {
    dot: 'bg-white/40',
    border: 'border-white/10',
    bg: 'bg-white/[0.04]',
    text: 'text-primary-neutral-200',
    active: 'border-white/25 bg-white/[0.08]',
  };
}

function PipelineTimeline({ steps }) {
  const [selectedId, setSelectedId] = useState(null);

  const sorted = useMemo(
    () => [...steps].sort((a, b) => (a.stepOrder ?? 99) - (b.stepOrder ?? 99)),
    [steps],
  );

  const selectedStep = sorted.find((s) => s.id === selectedId) ?? null;

  return (
    <div>
      {/* Horizontal pipeline */}
      <div className="flex items-center gap-0 overflow-x-auto pb-1 hide-scrollbar">
        {sorted.map((step, i) => {
          const colors = getStepColors(step.stepType || step.stepName);
          const isSelected = selectedId === step.id;
          const isDone = step.status === 'Done';

          return (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => setSelectedId(isSelected ? null : step.id)}
                className={[
                  'group flex min-w-[92px] flex-col items-center gap-1.5 rounded-[14px] border px-3 py-2.5 text-center transition-all',
                  isSelected ? colors.active : `${colors.border} ${colors.bg} hover:brightness-125`,
                ].join(' ')}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${colors.dot} ${isDone ? 'opacity-100' : 'opacity-40'}`} />
                  <span className={`text-[11px] font-semibold ${colors.text}`}>
                    {step.stepType || step.stepName || '?'}
                  </span>
                </div>
                <span className={`text-[10px] ${isDone ? 'text-primary-neutral-200' : 'text-amber-300'}`}>
                  {isDone ? formatDuration(step.latencyMs) : step.status}
                </span>
              </button>

              {i < sorted.length - 1 && (
                <div className="mx-1 h-px w-5 shrink-0 bg-white/15" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step detail panel */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            key={selectedStep.id}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mt-3 rounded-[16px] border border-white/10 bg-black/25 p-4">
              {/* Step header */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Tag tone="stage">{selectedStep.stepType || selectedStep.stepName}</Tag>
                <Tag tone={selectedStep.status === 'Done' ? 'success' : 'warning'}>{selectedStep.status || 'Unknown'}</Tag>
                {Number.isFinite(selectedStep.stepOrder) && <Tag>#{selectedStep.stepOrder}</Tag>}
                {selectedStep.selectedPath && <Tag tone="accent">{selectedStep.selectedPath}</Tag>}
                {selectedStep.model && <Tag>{selectedStep.model}</Tag>}
                {Number.isFinite(selectedStep.latencyMs) && <Tag>{formatDuration(selectedStep.latencyMs)}</Tag>}
                {Number.isFinite(selectedStep.matchScore) && <Tag>Match {selectedStep.matchScore.toFixed(2)}</Tag>}
                {Number.isFinite(selectedStep.confidence) && <Tag>Confidence {formatPercent(selectedStep.confidence)}</Tag>}
              </div>

              {/* Step I/O */}
              <div className="grid gap-3 md:grid-cols-3">
                {selectedStep.humanOutputSummary && (
                  <div className="rounded-[12px] border border-amber-400/20 bg-amber-400/10 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200 mb-1.5">Human Output</p>
                    <p className="whitespace-pre-wrap text-[12px] leading-5 text-primary-neutral-50">{selectedStep.humanOutputSummary}</p>
                  </div>
                )}
                {selectedStep.aiOutputSummary && (
                  <div className="rounded-[12px] border border-cyan-400/20 bg-cyan-400/10 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200 mb-1.5">AI Output</p>
                    <p className="whitespace-pre-wrap text-[12px] leading-5 text-primary-neutral-50">{selectedStep.aiOutputSummary}</p>
                  </div>
                )}
                {selectedStep.inputSummary && (
                  <div className="rounded-[12px] border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-neutral-300 mb-1.5">Input Context</p>
                    <p className="whitespace-pre-wrap text-[12px] leading-5 text-primary-neutral-50">{selectedStep.inputSummary}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SessionPanel({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const shortId = session.conversationId
    ? session.conversationId.slice(0, 8)
    : (session.id ?? '—').toString().slice(0, 8);

  const outcomeTone =
    session.outcome === 'Done' ? 'success'
    : session.outcome === 'In progress' ? 'warning'
    : 'default';

  return (
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] transition-all">
      {/* ── Collapsed header ── */}
      <button
        className="w-full cursor-pointer px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
        onClick={() => setIsOpen((v) => !v)}
        type="button"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: badges + title */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] text-primary-neutral-300 border border-white/10 rounded-full px-2.5 py-1 bg-white/[0.04]">
                {shortId}…
              </span>
              {session.currentStage && <Tag tone="stage">{session.currentStage}</Tag>}
              <Tag tone={outcomeTone}>{session.outcome || 'Unknown'}</Tag>
              {session.accepted && <Tag tone="success">Accepted</Tag>}
              {session.needsReview && <Tag tone="warning">Needs review</Tag>}
            </div>
            <p className="text-[15px] font-semibold text-primary-neutral-50 leading-snug truncate max-w-2xl">
              {session.title || session.originalQuery || 'Untitled session'}
            </p>
            {session.originalQuery && session.title !== session.originalQuery && (
              <p className="text-[12px] text-primary-neutral-300 truncate max-w-xl leading-4">
                {session.originalQuery}
              </p>
            )}
          </div>

          {/* Right: meta + chevron */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] text-primary-neutral-300">
              <span>{formatTimestamp(session.startedAt)}</span>
              <span className="text-primary-neutral-100 font-medium">
                {session.stepCount} steps · {formatDuration(session.totalLatencyMs)}
              </span>
            </div>
            <svg
              aria-hidden="true"
              className={`h-4 w-4 text-primary-neutral-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </button>

      {/* ── Expanded body ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="border-t border-white/10">
              <div className="grid gap-0 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
                {/* Conversation */}
                <div className="border-b border-white/10 p-5 xl:border-b-0 xl:border-r">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-neutral-300">
                      Conversation
                    </p>
                    <Tag>{session.conversation.length} turns</Tag>
                  </div>

                  <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1 hide-scrollbar">
                    {session.conversation.length ? (
                      session.conversation.map((entry) => (
                        <ConversationTurn entry={entry} key={entry.id} />
                      ))
                    ) : (
                      <div className="rounded-[16px] border border-white/10 bg-black/20 p-4 text-[13px] text-primary-neutral-300">
                        No messages available.
                      </div>
                    )}
                  </div>
                </div>

                {/* Pipeline + final answer */}
                <div className="p-5 space-y-4">
                  {/* Pipeline timeline */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-neutral-300 mb-3">
                      Pipeline · click a step to inspect
                    </p>
                    <PipelineTimeline steps={session.steps} />
                  </div>

                  {/* Final answer */}
                  {session.finalAnswerSummary && (
                    <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-neutral-300 mb-2">
                        Final Answer
                      </p>
                      <p className="whitespace-pre-wrap text-[13px] leading-6 text-primary-neutral-50">
                        {session.finalAnswerSummary}
                      </p>
                    </div>
                  )}

                  {/* Timestamps on mobile (hidden on sm+) */}
                  <div className="sm:hidden text-[11px] text-primary-neutral-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Started</span>
                      <span className="text-primary-neutral-50">{formatTimestamp(session.startedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Updated</span>
                      <span className="text-primary-neutral-50">{formatTimestamp(session.lastUpdated)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

const LlmSessionsPage = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const sessions = payload?.sessions ?? [];
  const stats = payload?.stats ?? {
    runCount: 0,
    stepCount: 0,
    acceptedCount: 0,
    needsReviewCount: 0,
  };

  const stageOptions = useMemo(() => {
    const uniqueStages = new Set(
      sessions.map((session) => session.currentStage).filter(Boolean),
    );
    return ['All', ...uniqueStages];
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (stageFilter !== 'All' && session.currentStage !== stageFilter) return false;
      return matchesSession(session, deferredSearchTerm);
    });
  }, [deferredSearchTerm, sessions, stageFilter]);

  const loadSessions = async ({ refresh = false } = {}) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await fetch('/api/notion-llm-sessions?limit=24');
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Failed to load Notion sessions.');
      setPayload(data);
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load Notion sessions.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#0b0b0d] text-primary-neutral-50"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-8">
        {/* ── Header ── */}
        <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] p-5 lg:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone="accent">AI Flow</Tag>
                <Tag>Notion-backed</Tag>
                <Tag>{filteredSessions.length} sessions</Tag>
              </div>
              <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-white lg:text-[36px]">
                LLM session inspector
              </h1>
              <p className="mt-2 text-[14px] leading-6 text-primary-neutral-200">
                Reconstructed from Notion run + step records. Click any session to expand — then click pipeline nodes to inspect I/O.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-primary-neutral-50 transition-colors hover:bg-white/[0.08]"
                onClick={() => navigate('/')}
                type="button"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                Branch Directory
              </button>
              <button
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/20"
                onClick={() => loadSessions({ refresh: true })}
                type="button"
              >
                {isRefreshing ? 'Refreshing…' : 'Refresh Notion'}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Runs loaded" value={stats.runCount} helper="Latest sessions returned by Notion." />
            <StatCard label="Steps stitched" value={stats.stepCount} helper="Joined through the relation field." />
            <StatCard label="Accepted runs" value={stats.acceptedCount} helper="Useful for quick QA sampling." />
            <StatCard
              label="Needs review"
              value={stats.needsReviewCount}
              helper={payload?.fetchedAt ? `Fetched ${formatTimestamp(payload.fetchedAt)}` : 'Awaiting first load.'}
            />
          </div>
        </div>

        {/* ── Sticky filter bar ── */}
        <div className="sticky top-3 z-20 mt-4 rounded-[22px] border border-white/10 bg-[#0f1013]/90 p-3 shadow-[0_12px_48px_rgba(0,0,0,0.3)] backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-primary-neutral-300" fill="none" viewBox="0 0 24 24">
                <path d="M21 21L15.8 15.8M17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <input
                className="w-full bg-transparent text-sm text-primary-neutral-50 outline-none placeholder:text-primary-neutral-300"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search session ID, query, or conversation…"
                type="text"
                value={searchTerm}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="shrink-0 text-primary-neutral-300 hover:text-primary-neutral-50 transition-colors"
                >
                  <svg aria-label="Clear" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                  </svg>
                </button>
              )}
            </label>

            <div className="flex flex-wrap gap-1.5">
              {stageOptions.map((stage) => (
                <button
                  className={[
                    'rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors',
                    stageFilter === stage
                      ? 'border-cyan-400/25 bg-cyan-400/15 text-cyan-100'
                      : 'border-white/10 bg-white/[0.03] text-primary-neutral-200 hover:bg-white/[0.06]',
                  ].join(' ')}
                  key={stage}
                  onClick={() => setStageFilter(stage)}
                  type="button"
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Session list ── */}
        <div className="mt-4 space-y-2">
          {error && (
            <div className="rounded-[20px] border border-rose-400/25 bg-rose-400/10 p-5">
              <p className="text-[14px] leading-6 text-rose-100">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[80px] animate-pulse rounded-[24px] border border-white/10 bg-white/[0.03]" />
              ))}
            </div>
          ) : filteredSessions.length ? (
            filteredSessions.map((session) => (
              <SessionPanel key={session.id} session={session} />
            ))
          ) : (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-[15px] font-semibold text-primary-neutral-50">No sessions match the current filters.</p>
              <p className="mt-1.5 text-[13px] leading-6 text-primary-neutral-300">
                Try clearing the search or switching the stage filter back to All.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default LlmSessionsPage;
