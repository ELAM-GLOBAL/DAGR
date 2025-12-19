# D.A.G.R. Frontend

A Vite + React + TypeScript frontend that uses IBM Carbon Design System.

## Quick start

Requirements

- Node.js 16+ (recommended)
- npm (or yarn / pnpm)

Install dependencies

```bash
npm install
```

Run dev server

```bash
npm run dev
```

Build for production

```bash
npm run build
npm run preview
```

## Notes

- The app uses IBM Carbon Design System with the **white** theme applied globally. See `src/main.tsx` for the `Theme` wrapper and `src/index.scss` for the global CSS variable mappings.
- Dev server default port observed: `5174`.
- Major UI components live in `src/components/` and pages are in `src/pages/`.

## Next steps we suggest

- Map hard-coded hex colors in `src/` to Carbon white theme CSS variables (todo tracked).
- Run a visual QA pass while the dev server is running and iterate on spacing and token usage.

## Resources

| Resource | Link |
|---|---|
| IBM Carbon Design System | https://carbondesignsystem.com/ |
| IBM Carbon github | https://github.com/carbon-design-system/carbon |
| IBM Carbon Charts | https://github.com/carbon-design-system/carbon-charts |
| old V0 UI prototype | https://v0.app/chat/elam-global-dagr-frontend-demo-oPjRiVFXuk9?ref=6HZQKR |
| Orange Data Mining | https://github.com/biolab/orange3 |
| OpenBB | https://github.com/OpenBB-finance/OpenBB |

## License

This repository follows the licensing of its contributors. Check individual files and referenced packages for their licenses.
