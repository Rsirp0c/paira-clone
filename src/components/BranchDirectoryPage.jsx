import { useEffect, useState } from 'react';
import pairaLogo from '../assets/icons/Paira-logo.svg';

const emphasisClassName = 'font-semibold text-primary-neutral-50';

function BranchCard({ branch }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-dm-serif text-3xl leading-none text-primary-neutral-50">{branch.name}</h2>
        </div>

        {branch.isPrimary ? (
          <span className="rounded-full border border-[#fbff5c]/40 bg-[#fbff5c]/10 px-3 py-1 font-jakarta text-xs font-semibold text-[#fbff5c]">
            Pinned
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
          <p className="mb-1 font-jakarta text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-neutral-300">
            App URL
          </p>
          <p className="break-all font-jakarta text-sm text-primary-neutral-50">
            {branch.appUrl ?? 'No READY Vercel deployment found for this branch yet'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {branch.appUrl ? (
            <a
              className="rounded-full bg-primary-neutral-50 px-4 py-2 font-jakarta text-sm font-semibold text-black transition hover:bg-[#fbff5c]"
              href={branch.appUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open app
            </a>
          ) : null}

          <a
            className="rounded-full border border-white/15 px-4 py-2 font-jakarta text-sm font-semibold text-primary-neutral-50 transition hover:border-white/30 hover:bg-white/5"
            href={branch.githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            View branch
          </a>
        </div>
      </div>
    </article>
  );
}

function BranchDirectoryPage() {
  const cloneCommand = 'git clone https://github.com/Rsirp0c/paira-clone.git';
  const [copyFeedback, setCopyFeedback] = useState('');
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState({
    status: 'loading',
    error: '',
    payload: null,
  });

  useEffect(() => {
    let isCancelled = false;

    async function loadBranchPreviews() {
      try {
        const response = await fetch('/api/branch-previews');
        const contentType = response.headers.get('content-type') || '';
        let payload = null;

        if (contentType.includes('application/json')) {
          payload = await response.json();
        } else {
          const rawResponse = await response.text();
          throw new Error(
            `Expected JSON from /api/branch-previews, received ${contentType || 'an unknown content type'}: ${rawResponse.slice(0, 120)}`,
          );
        }

        if (!response.ok) {
          throw new Error(payload.error || 'Failed to load branch previews.');
        }

        if (!isCancelled) {
          setState({
            status: 'ready',
            error: '',
            payload,
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            status: 'error',
            error: error.message,
            payload: null,
          });
        }
      }
    }

    loadBranchPreviews();

    return () => {
      isCancelled = true;
    };
  }, []);

  const payload = state.payload;
  const branches = payload?.branches ?? [];
  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  async function handleCopyCloneCommand() {
    try {
      await navigator.clipboard.writeText(cloneCommand);
      setCopyFeedback('Copied');
      window.setTimeout(() => setCopyFeedback(''), 2000);
    } catch {
      setCopyFeedback('Copy failed');
      window.setTimeout(() => setCopyFeedback(''), 2000);
    }
  }

  return (
    <main className="min-h-screen bg-[#060606] text-primary-neutral-50">
      <div className="relative overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-72 w-72 rounded-full bg-[#605cff]/20 blur-3xl" />
        <div className="absolute right-[-5%] top-24 h-80 w-80 rounded-full bg-[#fbff5c]/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-8 lg:px-10">
          <div className="mx-auto mb-14 w-full max-w-4xl space-y-6 xl:max-w-5xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <img alt="Paira logo" className="h-11 w-11 shrink-0 sm:h-14 sm:w-14" src={pairaLogo} />
                <h1 className="max-w-2xl font-dm-serif text-5xl leading-[0.95] text-primary-neutral-50 sm:text-6xl">
                  mini Paira
                </h1>
              </div>
            </div>
            <div className="w-full rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <button
                aria-expanded={isGettingStartedOpen}
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setIsGettingStartedOpen((open) => !open)}
                type="button"
              >
                <span className="font-jakarta text-sm font-semibold text-primary-neutral-50">Getting started</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20">
                  <svg
                    aria-hidden="true"
                    className={`h-4 w-4 text-primary-neutral-50 transition-transform ${isGettingStartedOpen ? 'rotate-180' : 'rotate-90'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </span>
              </button>
              {isGettingStartedOpen ? (
                <div className="mt-4 space-y-4 font-jakarta text-base leading-7 tracking-[0.015em] text-primary-neutral-300">
                <p>
                  Start by cloning the repo locally. The current repo is
                  {' '}
                  <span className={`break-all ${emphasisClassName}`}>https://github.com/Rsirp0c/paira-clone.git</span>
                  .
                </p>
                <div className="rounded-[20px] border border-white/10 bg-black/25 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <code className="block break-all font-jakarta text-sm leading-6 tracking-[0.02em] text-primary-neutral-50">
                      {cloneCommand}
                    </code>
                    <button
                      className="rounded-full border border-white/15 px-4 py-2 font-jakarta text-xs font-semibold uppercase tracking-[0.18em] text-primary-neutral-50 transition hover:border-white/30 hover:bg-white/5"
                      onClick={handleCopyCloneCommand}
                      type="button"
                    >
                      {copyFeedback || 'Copy'}
                    </button>
                  </div>
                </div>
                <p>
                  Open the cloned folder in
                  {' '}
                  <span className={emphasisClassName}>Codex</span>
                  ,
                  {' '}
                  <span className={emphasisClassName}>Cloud Code</span>
                  ,
                  {' '}
                  or
                  {' '}
                  <span className={emphasisClassName}>VS Code</span>
                  , then work directly from prompts instead of navigating everything by hand.
                </p>
                <p>
                  Good starter prompts are
                  {' '}
                  <span className={emphasisClassName}>start the app</span>
                  ,
                  {' '}
                  <span className={emphasisClassName}>make this change</span>
                  ,
                  {' '}
                  <span className={emphasisClassName}>fix this bug</span>
                  , or
                  {' '}
                  <span className={emphasisClassName}>update this page</span>
                  .
                </p>
                <p>
                  When you are ready to save the current version, type something like
                  {' '}
                  <span className={emphasisClassName}>commit this edit</span>
                  {' '}
                  or
                  {' '}
                  <span className={emphasisClassName}>create a new version of this clone</span>
                  .
                </p>
                </div>
              ) : null}
            </div>
          </div>

          {state.status === 'loading' ? (
            <section className="mx-auto w-full max-w-4xl xl:max-w-5xl">
              <p className="font-jakarta text-base text-primary-neutral-300">Loading branch previews...</p>
            </section>
          ) : null}

          {state.status === 'error' ? (
            <section className="rounded-[32px] border border-[#ff7b7b]/20 bg-[#3b1010]/40 p-10 backdrop-blur-xl">
              <h2 className="font-dm-serif text-3xl text-primary-neutral-50">Branch directory unavailable</h2>
              <p className="mt-4 max-w-2xl font-jakarta text-base leading-7 text-primary-neutral-300">
                {state.error}
              </p>
              <p className="mt-4 max-w-2xl font-jakarta text-sm leading-6 text-primary-neutral-300">
                Set <span className="font-semibold text-primary-neutral-50">VERCEL_PROJECT_ID</span> and <span className="font-semibold text-primary-neutral-50">VERCEL_TOKEN</span> so this page can resolve branch previews directly from the Vercel API.
              </p>
            </section>
          ) : null}

          {state.status === 'ready' ? (
            <section className="mx-auto w-full max-w-4xl space-y-4 xl:max-w-5xl">
              <div className="border-b border-white/70 pb-5">
                <div className="relative flex items-center gap-4">
                  <svg aria-hidden="true" className="h-7 w-7 shrink-0 text-primary-neutral-300" fill="none" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 16L21 21" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                  </svg>
                  {!isSearchFocused && !searchQuery ? (
                    <div className="pointer-events-none absolute left-11 flex items-center gap-1 font-dm-serif text-3xl text-primary-neutral-300 sm:text-[2rem]">
                      <span>Search branches...</span>
                      <span aria-hidden="true" className="search-idle-caret inline-block h-8 w-[2px] bg-[#fbff5c]" />
                    </div>
                  ) : null}
                  <input
                    className="w-full bg-transparent font-dm-serif text-3xl text-primary-neutral-50 caret-transparent outline-none placeholder:text-transparent sm:text-[2rem]"
                    onBlur={() => setIsSearchFocused(false)}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search branches..."
                    type="search"
                    value={searchQuery}
                  />
                </div>
              </div>

              {payload.warnings?.length ? (
                <div className="rounded-[28px] border border-[#fbff5c]/20 bg-[#fbff5c]/5 p-5">
                  <p className="font-jakarta text-sm leading-6 text-primary-neutral-50">{payload.warnings[0]}</p>
                </div>
              ) : null}

              <div className="grid gap-4 xl:grid-cols-2">
                {filteredBranches.map((branch) => (
                  <BranchCard branch={branch} key={branch.name} />
                ))}
              </div>

              {filteredBranches.length === 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="font-jakarta text-sm text-primary-neutral-300">No branches match that search.</p>
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default BranchDirectoryPage;
