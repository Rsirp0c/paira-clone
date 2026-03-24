import { useEffect, useState } from 'react';

function formatBranchLabel(branchName) {
  return branchName.replace(/[-_/]+/g, ' ');
}

function BranchCard({ branch }) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 font-jakarta text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-neutral-300">
            {branch.isPrimary ? 'Production branch' : 'Preview branch'}
          </p>
          <h2 className="font-dm-serif text-3xl leading-none text-primary-neutral-50">{branch.name}</h2>
          <p className="mt-2 max-w-sm font-jakarta text-sm text-primary-neutral-300">
            {formatBranchLabel(branch.name)}
          </p>
        </div>

        {branch.isPrimary ? (
          <span className="rounded-full border border-[#fbff5c]/40 bg-[#fbff5c]/10 px-3 py-1 font-jakarta text-xs font-semibold text-[#fbff5c]">
            Live
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

          {branch.rootUrl ? (
            <a
              className="rounded-full border border-white/15 px-4 py-2 font-jakarta text-sm font-semibold text-primary-neutral-50 transition hover:border-white/30 hover:bg-white/5"
              href={branch.rootUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open root
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
        const payload = await response.json();

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

  return (
    <main className="min-h-screen bg-[#060606] text-primary-neutral-50">
      <div className="relative overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-72 w-72 rounded-full bg-[#605cff]/20 blur-3xl" />
        <div className="absolute right-[-5%] top-24 h-80 w-80 rounded-full bg-[#fbff5c]/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-8 lg:px-10">
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 font-jakarta text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-neutral-300">
                Internal Branch Index
              </p>
              <h1 className="max-w-2xl font-dm-serif text-5xl leading-[0.95] text-primary-neutral-50 sm:text-6xl">
                One landing page for every branch preview in this project.
              </h1>
              <p className="mt-6 max-w-2xl font-jakarta text-base leading-7 text-primary-neutral-300">
                Root now acts as the internal directory. The existing iOS clone lives at <span className="font-semibold text-primary-neutral-50">/app</span>, and each branch card links to its matching preview deployment.
              </p>
            </div>

            <a
              className="inline-flex w-fit rounded-full border border-white/15 px-5 py-3 font-jakarta text-sm font-semibold text-primary-neutral-50 transition hover:border-white/30 hover:bg-white/5"
              href="/app"
            >
              Open production app
            </a>
          </div>

          <section className="mb-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="mb-2 font-jakarta text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-neutral-300">
                Repository
              </p>
              <p className="font-jakarta text-lg font-semibold text-primary-neutral-50">
                {payload ? `${payload.repo.owner}/${payload.repo.name}` : 'Loading'}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="mb-2 font-jakarta text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-neutral-300">
                Branches discovered
              </p>
              <p className="font-jakarta text-lg font-semibold text-primary-neutral-50">{branches.length}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="mb-2 font-jakarta text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-neutral-300">
                App base path
              </p>
              <p className="font-jakarta text-lg font-semibold text-primary-neutral-50">
                {payload?.appBasePath ?? '/app'}
              </p>
            </div>
          </section>

          {state.status === 'loading' ? (
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
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
            <section className="space-y-4">
              {payload.warnings?.length ? (
                <div className="rounded-[28px] border border-[#fbff5c]/20 bg-[#fbff5c]/5 p-5">
                  <p className="font-jakarta text-sm leading-6 text-primary-neutral-50">{payload.warnings[0]}</p>
                </div>
              ) : null}

              <div className="grid gap-4 xl:grid-cols-2">
                {branches.map((branch) => (
                  <BranchCard branch={branch} key={branch.name} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default BranchDirectoryPage;
