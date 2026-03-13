# Movie App

A Netflix-inspired movie and TV show browser built with React, TypeScript, and the [TMDB API](https://developer.themoviedb.org/docs). Browse popular titles, switch between movies and TV shows, and explore details — all with infinite scroll.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Component Overview](#component-overview)
- [Type System](#type-system)
- [Commit Conventions](#commit-conventions)
- [Changelog](#changelog)

---

## Features

- **Browse Popular Content** — Fetches trending movies and TV shows sorted by popularity from the TMDB API.
- **Category Filtering** — Toggle between Movies and TV Shows with a single click.
- **Infinite Scroll** — Automatically loads the next page of results as you scroll to the bottom using the `IntersectionObserver` API.
- **Media Cards** — Each title is displayed as a card with its poster image, title, and release year.
- **Detail Modal** — Click "Learn More" on any card to open a modal with the backdrop image and full overview.
- **404 Page** — A dedicated Not Found page for unmatched routes.
- **Responsive Layout** — CSS Grid via MUI Grid2 adapts across screen sizes.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build Tool | [Vite 6](https://vite.dev/) |
| Routing | [React Router DOM v7](https://reactrouter.com/) |
| UI Components | [Material UI (MUI) v6](https://mui.com/) |
| Styling | [SASS](https://sass-lang.com/) + MUI Emotion |
| HTTP Client | [Axios](https://axios-http.com/) |
| Linting | [ESLint](https://eslint.org/) + typescript-eslint |
| Commit Convention | [Commitizen](https://commitizen-tools.github.io/commitizen/) + cz-conventional-changelog |
| Versioning | [standard-version](https://github.com/conventional-changelog/standard-version) |

---

## Project Structure

```
movie-app/
├── public/                     # Static assets served as-is
├── src/
│   ├── api/
│   │   └── movieApi.ts         # Axios instance configured with base URL and auth token
│   ├── components/
│   │   ├── common/
│   │   │   ├── MediaCard/      # Card component for a single movie or TV show
│   │   │   └── MediaModal/     # Modal overlay with detail view
│   │   └── layout/
│   │       ├── Header/         # Top app bar with app title
│   │       └── Footer/         # Footer (placeholder)
│   ├── pages/
│   │   ├── Home/               # Main browsing page with grid and filters
│   │   └── NotFound/           # 404 fallback page
│   ├── styles/
│   │   ├── _base.scss          # Base element styles
│   │   ├── _reset.scss         # CSS reset
│   │   ├── _variables.scss     # SCSS variables (colors, spacing, fonts)
│   │   └── global.scss         # Global stylesheet entry point
│   ├── types/
│   │   └── mediaTypes.ts       # TypeScript interfaces and union types for media data
│   ├── utils/                  # Utility helpers (reserved for future use)
│   ├── App.tsx                 # Root component with router setup
│   └── main.tsx                # Application entry point
├── .env                        # Local environment variables (not committed)
├── index.html                  # Vite HTML entry
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) v9 or later
- A free [TMDB API](https://developer.themoviedb.org/docs) account to obtain an access token

### Installation

```bash
git clone https://github.com/raymondjosephsotto/movie-app.git
cd movie-app
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_API_BASE_URL=https://api.themoviedb.org/3/
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token_here
```

> **How to get your TMDB token:**
> 1. Sign up at [themoviedb.org](https://www.themoviedb.org/).
> 2. Go to **Settings → API**.
> 3. Copy your **API Read Access Token (v4 auth)** and paste it as the value of `VITE_TMDB_ACCESS_TOKEN`.

### Running the App

```bash
npm run dev
```

The app opens automatically in your default browser at `http://localhost:5173`.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite --open` | Start the development server and open the browser |
| `build` | `tsc -b && vite build` | Type-check and compile a production build to `dist/` |
| `preview` | `vite preview` | Serve the production build locally for inspection |
| `lint` | `eslint .` | Run ESLint across all source files |
| `commit` | `cz` | Open the interactive Commitizen prompt for conventional commits |
| `release` | `standard-version` | Bump the version, generate the changelog, and tag the release |
| `cache` | `rm -rf node_modules/.vite` | Clear the Vite dev server cache |

---

## API Integration

All API requests go through a single Axios instance defined in [`src/api/movieApi.ts`](src/api/movieApi.ts). It automatically attaches the base URL and Bearer token from environment variables to every request.

The `Home` page fetches from the following TMDB endpoints:

| Category | Endpoint |
|---|---|
| Movies | `discover/movie?page={n}&sort_by=popularity.desc` |
| TV Shows | `discover/tv?page={n}&sort_by=popularity.desc` |

---

## Component Overview

### `MediaCard`
Renders a single media item as a Material UI `Card`. Displays the poster image, title, and release year. Contains a "Learn More" button that opens the `MediaModal`.

### `MediaModal`
A MUI `Modal` overlay that shows the backdrop image and full plot overview for a selected title.

### `Header`
A fixed MUI `AppBar` displaying the app name "Netflix Clone".

### `Home`
The main page component. Manages:
- `media` state — accumulated list of fetched items
- `category` state — `'movie'` or `'tv'`
- `page` state — current pagination page
- Infinite scroll via `IntersectionObserver` attached to the last rendered card

---

## Type System

Defined in [`src/types/mediaTypes.ts`](src/types/mediaTypes.ts):

```ts
interface BaseMedia        // Shared fields: id, overview, poster_path, vote_average, etc.
interface Movie            // Extends BaseMedia — adds title, release_date (type: 'movie')
interface TVShow           // Extends BaseMedia — adds name, first_air_date (type: 'tv')
type Media = Movie | TVShow  // Discriminated union used throughout the app
```

The `type` discriminator (`'movie'` | `'tv'`) allows TypeScript to narrow the union safely in components.

---

## Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Use `npm run commit` instead of `git commit` to get an interactive prompt:

```bash
npm run commit
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a full history of releases generated by `standard-version`.
