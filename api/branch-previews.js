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

function resolveRepoDetails() {
  const owner = process.env.GITHUB_REPO_OWNER || process.env.VERCEL_GIT_REPO_OWNER;
  const name = process.env.GITHUB_REPO_NAME || process.env.VERCEL_GIT_REPO_SLUG;

  if (!owner || !name) {
    return null;
  }

  return { owner, name };
}

function resolveVercelProjectDetails() {
  const projectId = process.env.VERCEL_PROJECT_ID || process.env.VERCEL_GIT_REPO_SLUG;
  const teamId = process.env.VERCEL_TEAM_ID || process.env.VERCEL_ORG_ID || null;
  const teamSlug = process.env.VERCEL_TEAM_SLUG || null;
  const token = process.env.VERCEL_TOKEN || process.env.VERCEL_API_TOKEN || null;

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

async function fetchBranches(repo) {
  const token = process.env.GITHUB_TOKEN;
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
    const repo = resolveRepoDetails();
    const vercelProject = resolveVercelProjectDetails();

    if (!repo) {
      response.status(500).json({
        error:
          'Missing repository metadata. Set GITHUB_REPO_OWNER and GITHUB_REPO_NAME, or deploy from a GitHub-connected Vercel project.',
      });
      return;
    }

    const appBasePath = process.env.APP_BASE_PATH || DEFAULT_APP_BASE_PATH;
    const primaryBranch = process.env.GITHUB_PRIMARY_BRANCH || DEFAULT_PRIMARY_BRANCH;
    const productionRootUrl = withProtocol(process.env.VERCEL_PROJECT_PRODUCTION_URL);
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

    const branches = await fetchBranches(repo);
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

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    response.status(200).json({
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
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected error while loading branch previews.',
    });
  }
}
