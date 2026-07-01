# GH-900 Study Notes — GitHub Foundations Certification

> **Personal study companion for the GH-900 GitHub Foundations certification exam.**

[![GitHub Pages](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-blue?logo=github)](https://marcogrimaldi29.github.io/gh-900-study-notes/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ⚠️ Disclaimer

These notes are for **personal use and learning purposes only**. They are not affiliated with, endorsed by, or a substitute for the official Microsoft or GitHub certification materials. Content may become outdated as the exam evolves. Always verify against the **[official GH-900 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-900)**.

---

## About

A structured, GitHub-Pages-hosted companion site for the **[GitHub Foundations certification (GH-900)](https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/)** exam. Content is organized by the official exam skill areas (as of the January 2026 update), with links to Microsoft Learn modules, GitHub documentation, and community resources.

## Skill Areas Covered

| Area | Weight |
|------|--------|
| Understand Git and GitHub basics | 25–30% |
| Work with GitHub repositories | 10–15% |
| Collaborate using GitHub | 10–15% |
| Apply modern development practices | 10–15% |
| Manage projects with GitHub | 5–10% |
| Understand privacy, security, and administration | 10–15% |
| Explore the GitHub community | 5–10% |

## Tech Stack

Pure front-end: HTML, CSS, vanilla JavaScript. No build tools or dependencies — open any page in a browser or serve from any static host.

```
assets/
  css/style.css     — GitHub-dark design system
  js/main.js        — sidebar nav, scroll behavior, code rain
  images/           — logos and author photo
git-github-basics/
repositories/
collaboration/
modern-development/
project-management/
security-administration/
github-community/
exam-tips/
index.html          — home page
```

## Running Locally

Pages use clean folder-style URLs (`/repositories/` → `repositories/index.html`), which require a local server to resolve properly (file:// won't work):

```bash
# Option A — Node (npx, no install required)
npx http-server . -p 8080

# Option B — Python
python -m http.server 8080

# Then open http://localhost:8080/
```

## Contributing

Corrections, improvements, and pull requests are welcome — see **[CONTRIBUTING.md](.github/CONTRIBUTING.md)** for guidelines.

## Author

**Marco Grimaldi** · Cloud Solution Architect  
[github.com/marcogrimaldi29](https://github.com/marcogrimaldi29) · [LinkedIn](https://www.linkedin.com/in/marco-grimaldi29/) · [marcogrimaldi29.com](https://marcogrimaldi29.com)

## License

Site code (HTML, CSS, JS) is released under the [MIT License](LICENSE).  
Study content is a personal summary derived from public Microsoft and GitHub documentation — always refer to the official sources linked throughout the notes.
