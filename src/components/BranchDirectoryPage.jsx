import { useEffect, useState } from 'react';
import pairaLogo from '../assets/icons/Paira-logo.svg';

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

  return (
    <main className="min-h-screen bg-[#060606] text-primary-neutral-50">
      <div className="relative overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-72 w-72 rounded-full bg-[#605cff]/20 blur-3xl" />
        <div className="absolute right-[-5%] top-24 h-80 w-80 rounded-full bg-[#fbff5c]/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-8 lg:px-10">
          <div className="mx-auto mb-14 w-full max-w-4xl flex-col gap-8 xl:max-w-5xl lg:flex lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <img alt="Paira logo" className="h-11 w-11 shrink-0 sm:h-14 sm:w-14" src={pairaLogo} />
                <h1 className="max-w-2xl font-dm-serif text-5xl leading-[0.95] text-primary-neutral-50 sm:text-6xl">
                  mini Paira
                </h1>
              </div>
            </div>
          </div>

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
            <section className="mx-auto w-full max-w-4xl space-y-4 xl:max-w-5xl">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
                <input
                  className="w-full bg-transparent px-3 py-2 font-jakarta text-sm text-primary-neutral-50 outline-none placeholder:text-primary-neutral-300"
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search branches"
                  type="search"
                  value={searchQuery}
                />
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
