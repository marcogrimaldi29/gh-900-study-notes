# Contributing to GH-900 Study Notes

First off, thank you for taking the time to help improve these notes! 🎉

These are community-maintained study notes for the [GH-900 GitHub Foundations certification](https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/). Every correction, resource link, or improvement helps other learners prepare more effectively.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [What We Welcome](#what-we-welcome)
- [What Is Out of Scope](#what-is-out-of-scope)
- [How to Contribute](#how-to-contribute)
- [Local Development](#local-development)
- [Content Style Guide](#content-style-guide)
- [Commit & PR Guidelines](#commit--pr-guidelines)

---

## Code of Conduct

This project follows a [Contributor Covenant Code of Conduct](../CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please be respectful and constructive in all interactions.

---

## What We Welcome

| Type | Examples |
|------|----------|
| **Content corrections** | Outdated information, wrong feature names, plan features that have changed |
| **New study resources** | Relevant Microsoft Learn modules, GitHub docs pages, open-source tools |
| **Exam tips** | Additional caveats or high-yield facts backed by official sources |
| **Broken links** | Any internal or external link that no longer resolves |
| **Site / UX fixes** | Layout bugs, accessibility issues, mobile responsiveness |
| **Typos & grammar** | Spelling errors, grammatical issues, unclear wording |

---

## What Is Out of Scope

To keep the notes accurate and legally clean, please **do not** submit:

- **Unverified claims** about the exam — all content must be traceable to official Microsoft Learn, GitHub Docs, or the [official GH-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-900).
- **Exam dumps** — specific recalled questions or answers from the real exam are prohibited by Microsoft's NDA and will not be accepted.
- **Affiliation implications** — changes that could imply endorsement by Microsoft, GitHub, or Pearson VUE.
- **Advertising or promotional content** — no affiliate links or paid placements.

---

## How to Contribute

### Option A — Quick edits (recommended for small fixes)

For typos, broken links, or minor wording changes, use GitHub's built-in web editor:

1. Navigate to the relevant file in the repository.
2. Click the **✏️ pencil icon** (Edit this file) in the top-right corner.
3. Make your change and scroll down to **"Propose changes"**.
4. GitHub will automatically fork the repo and open a pull request for you.

### Option B — Full contribution flow

For larger changes (new sections, structural edits, page additions):

1. **Fork** the repository and clone your fork locally.
2. **Create a branch** with a descriptive name:
   ```bash
   git checkout -b fix/repositories-key-files
   git checkout -b content/add-actions-workflow-details
   ```
3. **Make your changes** (see [Local Development](#local-development) and [Content Style Guide](#content-style-guide) below).
4. **Test locally** to confirm the site renders correctly and links resolve.
5. **Commit** with a clear message (see [Commit & PR Guidelines](#commit--pr-guidelines)).
6. **Push** to your fork and **open a Pull Request** against `main`.

---

## Local Development

Pages use clean folder-style URLs (`/repositories/` serves `repositories/index.html`). A local HTTP server is required — `file://` won't auto-resolve directory indexes.

```bash
# Node (npx — no install needed)
npx http-server . -p 8080

# Python
python -m http.server 8080

# VS Code — install the "Live Server" extension, right-click index.html → Open with Live Server
```

Then open [http://localhost:8080](http://localhost:8080).

### Project Structure

```
assets/
  css/style.css       — single stylesheet (GitHub-dark design system)
  js/main.js          — sidebar nav, floating buttons, scroll behavior, code rain
  images/             — logos and author photo

<domain-slug>/
  index.html          — one page per skill area (clean URL: /repositories/, etc.)

index.html            — home page (hero, card grid, quick links)
exam-tips/index.html  — exam caveats, strategy, and study plan
```

---

## Content Style Guide

### Source requirements
- Every factual claim must be backed by an official source.
- Add an inline hyperlink to the source (Microsoft Learn module, GitHub Docs page, or the official study guide).
- If you're unsure, open an **issue** to discuss before writing the content.

### HTML patterns — use what's already there

Each page uses shared CSS classes for consistent styling. Match the existing pattern:

```html
<!-- Informational block -->
<div class="skill-section">
  <h4>Sub-heading</h4>
  <ul>...</ul>
</div>

<!-- Callout boxes: info | tip | warning | danger -->
<div class="callout tip">
  <div class="callout-title">💡 Tip Title</div>
  <p>Content here.</p>
</div>

<!-- Data tables -->
<table>
  <thead><tr><th>Column A</th><th>Column B</th></tr></thead>
  <tbody>
    <tr><td>Value</td><td>Value</td></tr>
  </tbody>
</table>
```

### TOC anchors
If you add a new `<h2>` or `<h3>` with an `id`, update the in-page `<nav class="page-toc">` at the top of that page to include a matching `<a href="#your-id">` entry.

### The disclaimer
**Do not remove** the per-page disclaimer box:
```html
<div class="disclaimer">
  <strong>Disclaimer:</strong> These are personal study notes...
</div>
```

---

## Commit & PR Guidelines

### Commit messages
Use a short, descriptive imperative-mood message:
```
fix: correct GitHub Flow branch step ordering
content: add branch protection rule details to security page
style: improve back-to-top button animation
```

### Pull request checklist
Your PR description should include:
- **What** was changed and **why**
- A link to the official source supporting any content change
- A note if you've tested locally

The PR template will guide you through this when you open one.

---

## Questions?

- **Not sure if something is accurate?** Open an [issue](https://github.com/marcogrimaldi29/gh-900-study-notes/issues) to discuss before writing.
- **Found a bug?** Use the [Bug Report issue template](https://github.com/marcogrimaldi29/gh-900-study-notes/issues/new?template=bug-report.yml).
- **Content correction?** Use the [Content Correction issue template](https://github.com/marcogrimaldi29/gh-900-study-notes/issues/new?template=content-correction.yml).

Thank you for contributing! ❤️
