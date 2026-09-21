# P Shiranjeevi — Portfolio

A React + Vite personal portfolio: dark/light theme, 6-language switcher,
animated sections, searchable/filterable project grid, and a private
`/admin` analytics demo. Built with plain CSS + `IntersectionObserver`
(no animation library dependency).

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # optional, serves the production build locally
```

The production build is written to `dist/`.

## Adding your real photo and resume

Drop these two files in `public/` with these exact names and they'll be
picked up automatically — no code changes needed:

- `public/profile.jpg` — your headshot (used in the hero section)
- `public/resume.pdf` — your résumé (powers the "Download Resume" button)

Until they exist, the hero shows a violet monogram avatar and the resume
button gracefully reads "Resume Coming Soon".

## Editing content

Everything editable lives in `src/data/` and `src/i18n/` — you never need
to touch a component to update content.

| What to change              | File                          |
| ---------------------------- | ------------------------------ |
| Name, title, contact, links  | `src/data/personal.js`        |
| Education & training         | `src/data/education.js`       |
| Internship                   | `src/data/internship.js`      |
| Skills                       | `src/data/skills.js`          |
| Projects (verified project list)            | `src/data/projects.js`        |
| Translations (6 languages)   | `src/i18n/en.js`, `ta.js`, `hi.js`, `te.js`, `kn.js`, `ml.js` |

### Adding / editing a project

Open `src/data/projects.js` and edit the array — the Projects section,
search, and filters update automatically:

```js
{
  id: 11,
  title: 'Your Project',
  description: 'One or two sentences.',
  technologies: ['React', 'Spring Boot'],
  category: ['React', 'Spring Boot', 'Full Stack'], // used by the filter bar
  features: ['Feature one', 'Feature two'],
  image: '/projects/project-11.png', // put the file in public/projects/
  github: 'https://github.com/you/repo', // or null when unavailable
  liveDemo: 'https://your-demo.com',     // or null when unavailable
}
```

Project previews use project-specific artwork and supplied project screenshots under `public/projects/`. The Movie Recommendation System includes a four-image screenshot gallery.

## Admin analytics (`/admin`)

Visit `/admin` and enter the demo passphrase `shiranjeevi-admin`
(set in `src/components/AdminDashboard.jsx`) to view local visit stats.

This is a **frontend-only, local-only demo**: it counts visits and section
views into your own browser's `localStorage`. There is no server, no
real authentication, and no data ever leaves the browser. Treat the
passphrase as a "keep casual visitors out" convenience, not security —
change it in the source before sharing the link if you use this feature.

## Tech stack

- React 18 + Vite
- React Router (`/` and `/admin`)
- `react-icons` for iconography
- Plain CSS with custom properties (theme tokens in `src/index.css`)
- `IntersectionObserver`-based scroll reveal (`src/hooks/useScrollReveal.js`, `src/components/Reveal.jsx`)
- `localStorage` for theme, language, and demo analytics persistence

## Project structure

```
src/
  components/   UI components (Navbar, Hero, About, Skills, Projects, ...)
  pages/        Home.jsx assembles the public one-page layout
  context/      Theme + Language React contexts
  hooks/        useLocalStorage, useScrollReveal, useActiveSection
  data/         Editable content: personal info, education, skills, projects
  i18n/         Translation dictionaries (en, ta, hi, te, kn, ml)
  utils/        analytics.js (localStorage-only demo tracking)
  App.jsx       Routes + providers
  main.jsx      React entry point
  index.css     Design tokens, resets, utilities, reveal animation system
```

## Notes

- Respects `prefers-reduced-motion` (animations are disabled site-wide).
- All interactive elements have visible keyboard focus states.
- No fake GitHub/demo URLs — unavailable links are simply omitted from the project card.
