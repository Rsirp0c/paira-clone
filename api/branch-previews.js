import { execSync } from 'node:child_process';

const DEFAULT_APP_BASE_PATH = '/app';
const DEFAULT_PRIMARY_BRANCH = 'main';
const VERCEL_API_BASE_URL = 'https://api.vercel.com/v6';

function sanitizeBranchName(branchName) {
  return branchName
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

function withProtocol(url) {
  if (!url) {
    return null;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
}

function joinUrl(baseUrl, pathName) {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = pathName.startsWith('/') ? pathName : `/${pathName}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

function parseGithubRemote(remoteUrl) {
  if (!remoteUrl) {
    return null;
  }

  const normalizedRemoteUrl = remoteUrl.trim().replace(/\.git$/, '');
  const sshMatch = normalizedRemoteUrl.match(/^git@github\.com:(.+?)\/(.+)$/);

  if (sshMatch) {
    return {
      owner: sshMatch[1],
      name: sshMatch[2],
    };
  }

  try {
    const url = new URL(normalizedRemoteUrl);

    if (url.hostname !== 'github.com') {
      return null;
    }

    const [, owner, name] = url.pathname.split('/');

    if (!owner || !name) {
      return null;
    }

    return { owner, name };
  } catch {
    return null;
  }
}

function resolveRepoFromGitRemote() {
  try {
    const remoteUrl = execSync('git remote get-url origin', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();

    return parseGithubRemote(remoteUrl);
  } catch {
    return null;
  }
}

function resolveRepoDetails(env) {
  const owner = env.GITHUB_REPO_OWNER || env.VERCEL_GIT_REPO_OWNER;
  const name = env.GITHUB_REPO_NAME || env.VERCEL_GIT_REPO_SLUG;

  if (!owner || !name) {
    return resolveRepoFromGitRemote();
  }

  return { owner, name };
}

function resolveVercelProjectDetails(env) {
  const projectId = env.VERCEL_PROJECT_ID || env.VERCEL_GIT_REPO_SLUG;
  const teamId = env.VERCEL_TEAM_ID || env.VERCEL_ORG_ID || null;
  const teamSlug = env.VERCEL_TEAM_SLUG || null;
  const token = env.VERCEL_TOKEN || env.VERCEL_API_TOKEN || null;

  return {
    projectId,
    teamId,
    teamSlug,
    token,
  };
}

async function fetchLatestDeploymentForBranch(branchName, vercelProject) {
  if (!vercelProject.projectId || !vercelProject.token) {
    return null;
  }

  const searchParams = new URLSearchParams({
    projectId: vercelProject.projectId,
    branch: branchName,
    state: 'READY',
    limit: '1',
  });

  if (vercelProject.teamId) {
    searchParams.set('teamId', vercelProject.teamId);
  } else if (vercelProject.teamSlug) {
    searchParams.set('slug', vercelProject.teamSlug);
  }

  const response = await fetch(`${VERCEL_API_BASE_URL}/deployments?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${vercelProject.token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Vercel deployment lookup failed for branch "${branchName}" (${response.status}): ${message}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.deployments) ? payload.deployments[0] ?? null : null;
}

async function fetchBranches(repo, env) {
  const token = env.GITHUB_TOKEN;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'paira-branch-directory',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const branches = [];
  let page = 1;

  while (page <= 10) {
    const response = await fetch(
      `https://api.github.com/repos/${repo.owner}/${repo.name}/branches?per_page=100&page=${page}`,
      { headers },
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`GitHub branch lookup failed (${response.status}): ${message}`);
    }

    const pageBranches = await response.json();

    if (!Array.isArray(pageBranches) || pageBranches.length === 0) {
      break;
    }

    branches.push(...pageBranches);

    if (pageBranches.length < 100) {
      break;
    }

    page += 1;
  }

  return branches;
}

function sortBranches(branches, primaryBranch) {
  return [...branches].sort((left, right) => {
    if (left.name === primaryBranch) {
      return -1;
    }

    if (right.name === primaryBranch) {
      return 1;
    }

    return left.name.localeCompare(right.name);
  });
}

export default async function handler(request, response) {
  try {
    const payload = await getBranchPreviews(process.env);
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    response.status(200).json(payload);
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected error while loading branch previews.',
    });
  }
}

export async function getBranchPreviews(env = process.env) {
  const repo = resolveRepoDetails(env);
  const vercelProject = resolveVercelProjectDetails(env);

  if (!repo) {
    throw new Error(
      'Missing repository metadata. Set GITHUB_REPO_OWNER and GITHUB_REPO_NAME, or deploy from a GitHub-connected Vercel project.',
    );
  }

  const appBasePath = env.APP_BASE_PATH || DEFAULT_APP_BASE_PATH;
  const primaryBranch = env.GITHUB_PRIMARY_BRANCH || DEFAULT_PRIMARY_BRANCH;
  const productionRootUrl = withProtocol(env.VERCEL_PROJECT_PRODUCTION_URL);
  const warnings = [];

  if (!vercelProject.projectId) {
    warnings.push(
      'VERCEL_PROJECT_ID is not set, so preview URLs can only be resolved for the production branch.',
    );
  }

  if (!vercelProject.token) {
    warnings.push(
      'VERCEL_TOKEN is not set, so preview URLs can only be resolved for the production branch.',
    );
  }

  const branches = await fetchBranches(repo, env);
  const sortedBranches = await Promise.all(
    sortBranches(branches, primaryBranch).map(async (branch) => {
      const latestDeployment = await fetchLatestDeploymentForBranch(branch.name, vercelProject);
      const previewRootUrl = latestDeployment?.url ? withProtocol(latestDeployment.url) : null;
      const isPrimary = branch.name === primaryBranch;
      const rootUrl = isPrimary && productionRootUrl ? productionRootUrl : previewRootUrl;
      const appUrl = rootUrl ? joinUrl(rootUrl, appBasePath) : null;

      return {
        name: branch.name,
        branchSlug: sanitizeBranchName(branch.name),
        githubUrl: `https://github.com/${repo.owner}/${repo.name}/tree/${branch.name}`,
        isPrimary,
        rootUrl,
        appUrl,
        commitSha: branch.commit?.sha ?? null,
        deploymentId: latestDeployment?.uid ?? null,
        deploymentState: latestDeployment?.state ?? null,
        deploymentCreatedAt: latestDeployment?.createdAt ?? latestDeployment?.created ?? null,
      };
    }),
  );

  return {
    appBasePath,
    generatedAt: new Date().toISOString(),
    primaryBranch,
    repo,
    vercelProject: {
      projectId: vercelProject.projectId ?? null,
      teamId: vercelProject.teamId,
      teamSlug: vercelProject.teamSlug,
    },
    warnings,
    branches: sortedBranches,
  };
}
