# Contributing

Thanks for helping design and build the UI! This document explains the recommended workflow and checks.

## Branching
- Use feature branches: `feature/<yourname>-short-desc`
- Small focused PRs make reviews quicker.
- If experimenting, use `playground/<yourname>-topic` (this branch can be reset frequently).

## Workflow
1. Fork the repo (recommended for external contributors) or branch from `develop` (if you have write access).
2. Make changes on a branch, run lint/tests locally.
3. Push branch and open a Pull Request against `develop` (or `main` only for hotfixes).
4. Link any issue(s) in the PR and include screenshots or preview links.

## Commit messages
- Use Conventional Commits: `feat(ui): add button component`, `fix(styles):` etc.
- We use commitlint + husky to enforce this; run `npm run commit` if configured.

## Local checks (recommended)
- `npm install`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run storybook` (to run Storybook locally)

## Previews
- PRs will trigger an automated preview deployment. Include the preview link in your PR description to make review fast.

## Code style & tools
- ESLint & Prettier configured — please run formatting before PR.
- TypeScript type-checking is required for merges.

## Reviews
- Add at least one reviewer from the frontend team.
- Address review comments and push follow-up commits; keep PRs small.

## Support
If you need a sandbox environment with write access, contact @anushrotmohanty to create a temporary branch or team access.