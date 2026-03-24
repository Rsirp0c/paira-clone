# Paira Branch Directory

## Agent Instructions

If you are a coding agent working in this repository, read `AGENTS.md` before making changes. It defines the default scope of work, which parts of the codebase are off-limits unless explicitly requested, the validation command, and the expected Git workflow.

This project now serves two jobs:

- `/` is an internal landing page that lists repository branches and their preview URLs.
- `/app` hosts the existing mobile web clone of the Paira iOS experience.

## Features

- **Branch Directory Landing Page**: Root route shows all known GitHub branches and their preview links
- **Vercel-Friendly API**: `/api/branch-previews` pulls branches from GitHub at request time
- **Mobile-First Clone**: The original Paira app clone remains available under `/app`
- **Custom Styling**: Tailwind CSS with custom color palette and design tokens
- **Status Bar & Navigation**: Complete iOS-style status bar and bottom tab navigation

## Tech Stack

- **React 18.3.1**: Modern React with hooks
- **Vite 6.0.1**: Fast build tool and dev server
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Google Fonts**: DM Serif Display, Plus Jakarta Sans

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`.

Note: the branch-directory API is implemented as a Vercel serverless function in `api/branch-previews.js`, so the landing page branch list is intended to run in Vercel deployments.

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
app-clone/
├── api/
│   └── branch-previews.js      # Branch directory API for Vercel
├── src/
│   ├── assets/
│   │   └── figmaAssets.js       # Image URLs from Figma
│   ├── components/
│   │   ├── BranchDirectoryPage.jsx
│   │   ├── ProfileCard.jsx
│   │   └── TabBar.jsx
│   ├── App.jsx                  # Root router for / and /app
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & Tailwind imports
├── index.html                   # HTML template
├── AGENTS.md                    # Instructions for coding agents working in this repo
├── vercel.json                  # SPA rewrites for /app routes
├── vite.config.js
├── tailwind.config.js
└── package.json

```

## Vercel Setup

Set these environment variables in Vercel:

- `VERCEL_TOKEN`: required, used to query the Vercel Deployments API
- `VERCEL_PROJECT_ID`: required, used to scope deployment lookups to this project
- `GITHUB_PRIMARY_BRANCH`: optional, defaults to `main`
- `APP_BASE_PATH`: optional, defaults to `/app`
- `GITHUB_TOKEN`: optional for private repos or to avoid GitHub rate limits
- `GITHUB_REPO_OWNER`: optional if Vercel already exposes Git metadata
- `GITHUB_REPO_NAME`: optional if Vercel already exposes Git metadata
- `VERCEL_TEAM_ID`: optional, use if the project belongs to a team scope
- `VERCEL_TEAM_SLUG`: optional alternative to `VERCEL_TEAM_ID`

How it works:

- The landing page fetches the branch list from GitHub.
- For each branch, the API asks Vercel for the latest `READY` deployment on that branch.
- The branch card links to that deployment’s root URL and to `/app` on that deployment.

## Design Features

### Color Palette

- **Primary Neutral**: `#f7f7f1` (50), `#a7a7a3` (300), `#5e5e5c` (700), `#3d3d3b` (900), `#1e1e1d` (950)
- **Primary Blue**: `#605cff` (500)
- **Primary Yellow**: `#fbff5c` (50)
- **Base Card**: `#232421`
- **Base Tag**: `rgba(63,63,58,0.3)`

### Typography

- **Headings**: DM Serif Display
- **Body**: Plus Jakarta Sans
- **Status Bar**: SF Pro

### Interactive Elements

- Close button (dismiss profile)
- Premium ping button (send connection request)
- Handshake button (accept connection)
- Tab navigation (People/Request)
- Settings button

## Components

### ProfileCard

The main component displaying:
- User profile photo
- Name with verification badge
- Job title and location
- Interest/skill tags
- Stacked background cards for next profiles
- Action buttons for interactions

### TabBar

Bottom navigation with three tabs:
- Notes
- Chat
- User profile

## Customization

To customize the design:

1. **Colors**: Edit `tailwind.config.js` under `theme.extend.colors`
2. **Fonts**: Modify font imports in `src/index.css`
3. **Profile Data**: Update the content in `ProfileCard.jsx`
4. **Images**: Replace image URLs in `src/assets/figmaAssets.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
