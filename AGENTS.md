# AGENTS.md

This repository serves two different products:

- `/` is the internal branch directory landing page.
- `/app` is the mobile web clone of the Paira iOS app.

For almost all product requests, "the app" means the `/app` mobile web experience, not the branch directory at `/`.

## Default Interpretation

If a user says things like:

- "add this feature to the app"
- "update the UI"
- "change the flow"
- "fix the app"

Interpret that as a request to modify the `/app` experience unless the user explicitly says they want to change the internal branch directory or branch preview system.

## What To Work On

When implementing product or design changes, focus on:

- `src/components/PeoplePage.jsx`
- `src/components/RequestPage.jsx`
- `src/components/ProfileDetailPage.jsx`
- `src/components/RequestDetailPage.jsx`
- `src/components/AIChatPage.jsx`
- `src/components/MobileFrame.jsx`
- `src/components/TabBar.jsx`
- `src/data/mockProfiles.js`
- `src/assets/*`
- shared styling files like `src/index.css` and `tailwind.config.js`

You may also update routing in `src/App.jsx` if the change is necessary for the `/app` experience.

## What Not To Touch

Do not modify the internal branch directory system unless the user explicitly asks for it.

Treat these files as off-limits by default:

- `src/components/BranchDirectoryPage.jsx`
- `api/branch-previews.js`
- branch-directory-specific logic in `src/App.jsx` related to `/`
- `vercel.json` if the change only concerns `/app`
- any code whose purpose is fetching or displaying repository branches or preview URLs

If the request is ambiguous, prefer leaving the branch directory untouched.

## Setup Commands

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

During local development:

- the internal branch directory is at `http://localhost:3000/`
- the mocked Paira iOS app is at `http://localhost:3000/app`

## Validation

Minimum validation before handing work back:

```bash
npm run build
```

There is currently no dedicated automated test suite configured in `package.json`. Do not claim tests passed beyond the commands you actually ran.

## Git Workflow

When a user asks to "commit" work, default to creating a separate branch, committing there, and pushing that branch to GitHub. Do not push directly to `main` unless the user explicitly asks for that.

Recommended flow:

```bash
git checkout -b <user-name>/<short-feature-name>
git status
git add <files-you-changed>
git commit -m "Add <short description>"
git push -u origin <user-name>/<short-feature-name>
```

This repository currently uses:

```bash
git remote -v
```

with `origin` pointing to:

- `https://github.com/Rsirp0c/paira-clone.git`

## Agent Behavior Rules

- Prefer small, targeted changes to `/app`.
- Preserve the branch directory at `/` unless explicitly instructed otherwise.
- Do not reinterpret a product request as a branch-directory request without clear evidence.
- If you must touch shared files such as `src/App.jsx`, avoid changing the `/` route behavior unless requested.
- After changes, report exactly what you changed and which validation command you ran.
