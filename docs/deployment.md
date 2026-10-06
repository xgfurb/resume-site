# Deployment

GitHub Pages publishes only `frontend/`. Pushes to `main` run HTML validation, dependency auditing, and desktop/mobile browser tests before deployment. Pull requests run the same checks.

Enable GitHub Actions as the publishing source in repository Settings → Pages. The initial site is available at the account's project Pages URL. Custom-domain and DNS setup are separate migration steps; store operational details privately.

GitHub Pages does not reproduce custom response headers from the previous host. Tests exercise the layout and theme without assuming those headers.

For local development:

```bash
npm ci
npm run lint
npx playwright install chromium
npm test
python -m http.server 8000 --bind 127.0.0.1 --directory frontend
```

To use an installed Chromium browser, run `CHROMIUM_PATH=/usr/bin/chromium npm test`.
