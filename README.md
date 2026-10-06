# Resume Site

Static resume website intended for GitHub Pages.

The frontend is migrated for static hosting. GitHub Actions checks changes and deploys `frontend/` to GitHub Pages. Custom-domain and DNS migration remain separate steps.

## Structure

- `frontend/`: HTML, CSS, and JavaScript; publish only this directory.
- `frontend/assets/`: local images, documents, and other static assets.
- `tests/`: frontend layout and theme tests.
- `.github/workflows/`: pull request checks and GitHub Pages deployment.
- `docs/`: general migration and deployment instructions.

See [the migration checklist](docs/migration.md) for remaining work.

## Development

See [deployment and local development](docs/deployment.md).

## Attribution

The frontend was adapted from the original cloud-resume learning project, commit `2c1c2a0`, by Chris Zuck. Layout and theme functionality are retained; the visitor-counter backend has been removed.
