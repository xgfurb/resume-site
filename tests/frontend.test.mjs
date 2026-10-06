import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const html = await readFile(new URL('../frontend/index.html', import.meta.url), 'utf8');
const scripts = Object.fromEntries(await Promise.all(['app.js', 'theme-init.js'].map(async name => [name, await readFile(new URL('../frontend/' + name, import.meta.url), 'utf8')])));
const css = await readFile(new URL('../frontend/style.css', import.meta.url), 'utf8');

for (const width of [1280, 375]) {
  test(`resume layout and theme at ${width}px`, async () => {
    const browser = await chromium.launch({
      executablePath: process.env.CHROMIUM_PATH || undefined,
    });
    try {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const externalRequests = [];
      // Serve the project locally; block external fonts during isolated tests.
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname === 'resume.test') {
          return route.fulfill({
            contentType: url.pathname.endsWith('.js') ? 'text/javascript' : url.pathname.endsWith('.css') ? 'text/css' : 'text/html',
            body: scripts[url.pathname.split('/').pop()] ?? (url.pathname.endsWith('.css') ? css : html),
          });
        }
        externalRequests.push(url.href);
        return route.fulfill({ contentType: 'text/css', body: '' });
      });
      await page.goto('https://resume.test/resume-site/');
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      await page.locator('#theme-toggle').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
      await page.reload();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
      assert.equal(await page.locator('.job > ul').first().evaluate(el => getComputedStyle(el).gridColumn), '1 / -1');
      assert.equal(await page.locator('.skill-group > ul').first().evaluate(el => getComputedStyle(el).display), 'flex');
      assert.equal(await page.locator('.header-contact').evaluate(el => getComputedStyle(el).textAlign), width < 600 ? 'left' : 'right');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Page must not overflow horizontally');
      const fontUrl = new URL(await page.locator('link[href*="fonts.googleapis.com/css2"]').getAttribute('href'));
      assert.deepEqual(fontUrl.searchParams.getAll('family'), ['IBM Plex Sans:wght@400;500;600;700', 'JetBrains Mono:wght@300;400;500']);
      assert.equal(await page.locator('#visit-count').count(), 0);
      assert.ok(externalRequests.every(url => new URL(url).hostname === 'fonts.googleapis.com'), 'No backend or unexpected external requests');
      if (process.env.SCREENSHOT_DIR) {
        await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/resume-${width}.png`, fullPage: true, animations: 'disabled' });
      }
    } finally {
      await browser.close();
    }
  });
}
