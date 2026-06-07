# Saucedemo Test Automation

End-to-end UI test automation for [saucedemo.com](https://www.saucedemo.com/) built with [Playwright](https://playwright.dev/) and TypeScript.

## Prerequisites

- Node.js (LTS)
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Running tests

```bash
# Run the full suite (chromium, firefox, webkit)
npm test

# Run tests with the interactive UI mode
npm run test:ui

# Run a single spec file
npx playwright test tests/login.spec.ts

# Run a single test by name
npx playwright test -g "login and logout as standard_user"

# Run against a single browser
npx playwright test --project=chromium

# Open the HTML report after a run
npx playwright show-report
```

## Linting & formatting

```bash
npm run lint
npm run format
```

## Project structure

```
tests/
  fixtures/   # custom Playwright fixtures (e.g. auth actions/locators)
  *.spec.ts   # test specs
```

- `playwright.config.ts` — Playwright configuration (test directory, browser projects, retries, tracing).
- `tests/fixtures/auth.ts` — custom `test` fixture exposing `auth` (login/logout actions and related locators) for use in specs.

## CI

Tests run automatically on every push and pull request to `main`/`master` via [GitHub Actions](.github/workflows/playwright.yml), with the HTML report uploaded as a build artifact.
