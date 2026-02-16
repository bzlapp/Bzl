# Issue tracker guide

This document is for reporting bugs and requesting features in Bzl.

## Before you file

- Search existing issues first (duplicates are common).
- If you can reproduce it, write down the smallest set of steps that still triggers the bug.
- Collect logs:
  - In-app dev log: **Moderation → Log → Server dev log**
  - Browser console (if it’s a UI bug)

## Where to file

Use the GitHub Issues page for the repository.

Security-sensitive reports should **not** be filed as public issues. See `SECURITY.md`.

## Bug reports

Please include:

- Summary (1–2 sentences)
- Steps to reproduce (numbered list)
- Expected vs actual behavior
- Environment:
  - OS
  - Browser (for UI issues)
  - Node version (`node -v`)
  - Install type: repo clone vs `CLEAN_INSTALL`
- Logs:
  - In-app dev log output around the time of the bug
  - Browser console output (if relevant)

If you’re reporting a UI issue, screenshots or a short screen recording help a lot.

## Feature requests

Please include:

- What problem you’re solving
- The minimum viable behavior you want
- Any constraints (mobile support, moderation requirements, performance targets)
- Optional: mockups or examples from other apps

## Plugins

If your issue involves plugins:

- Include the plugin `id` and `version`
- Mention whether it’s installed via the UI (zip upload) or from disk
- Include plugin logs from the in-app dev log
