<!-- Auto-generated starter for this workspace. Edit with project specifics. -->
# Copilot instructions for this repository

Purpose: give an AI coding agent the minimal, actionable context needed to be productive in this codebase.

What I discovered
- Repository root scanned: no source files, docs, or agent rules found.
- No `README.md`, `package.json`, `pyproject.toml`, `Makefile`, or CI config were present to infer build/test commands.

What I need from you (short answers help)
- Project type & language(s): e.g., `Node (TypeScript)`, `Python (3.11)`, `Go 1.20`.
- Primary entry point or service files: path to app server (e.g., `src/server.ts`, `app.py`).
- How to build: exact commands (e.g., `npm install && npm run build`, `python -m venv .venv && pip install -r requirements.txt`).
- How to run tests: exact commands and any test env vars.
- Common debug run: command to start in dev with hot-reload.
- CI: path to CI workflows (e.g., `.github/workflows/*`), and any important checks.
- External services and env vars: e.g., `DATABASE_URL`, `AWS_*`, `STRIPE_KEY` and local emulators to use.

Quick agent guidance (what to do now)
- If files are missing, ask the user to upload or point to the project root.
- If given a language (e.g., Node/Python), prioritize generating a minimal `README.md`, `package.json`/`pyproject.toml`, and a simple test to verify the toolchain.
- When editing code, prefer small, focused patches and run the project's tests or linters if available.

Project-specific patterns I will look for (please confirm)
- Monorepo vs single service: presence of `packages/`, `services/`, or multiple top-level `package.json` files.
- Backend APIs: `routes/`, `controllers/`, or `api/` folders and OpenAPI specs under `specs/` or `openapi/`.
- Frontend frameworks: presence of `next.config.js`, `vite.config.*`, or `webpack.config.*`.
- Infrastructure as code: `terraform/`, `cloudformation/`, or `pulumi/` folders.

Examples for responses you can give me
- "It's a Node monorepo. Run `pnpm -w install` then `pnpm -w test`. Main app at `packages/api/src/index.ts`. CI: `.github/workflows/ci.yml`."
- "Python service. Virtualenv and `pip install -r requirements.txt`. Run tests with `pytest -q`. Entry: `service/main.py`. Local DB: `docker-compose up db`"

If you want, I can:
- Create an initial `README.md` and minimal build/test scripts based on your answers.
- Scaffold `.github/workflows/ci.yml` with recommended checks once you confirm the language and test commands.

Next step: please provide the items requested above or grant access to the project root containing source code.

Reference repos (recommended workflow)

Goal: keep local, discoverable copies of design system repos for offline reference and to guide UI implementation.

Recommendation: use Git subtrees (keeps upstream history optional, allows committing a snapshot into this repo, and is easier for contributors than submodules). We use --squash to avoid importing full upstream history.

Commands (one-time add per repo):

```bash
# example for carbon
git remote add ref-carbon https://github.com/carbon-design-system/carbon.git
git fetch ref-carbon
git subtree add --prefix=reference_repos/carbon ref-carbon main --squash
```

Update snapshot later:

```bash
git fetch ref-carbon
git subtree pull --prefix=reference_repos/carbon ref-carbon main --squash
```

Quick alternative (local-only, not committed): shallow clones (fast, small):

```bash
mkdir -p reference_repos
cd reference_repos
git clone --depth 1 https://github.com/carbon-design-system/carbon.git
```

Automated script: `scripts/update-references.sh` is provided to add or update all reference repos using the subtree method. Usage:

```bash
# add all references (one-time)
./scripts/update-references.sh add

# update existing references
./scripts/update-references.sh update
```

License note: these are reference copies only. Respect each project's license before redistributing or modifying upstream code.
