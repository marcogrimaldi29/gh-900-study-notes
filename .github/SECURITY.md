# Security Policy

GH-900 Study Notes is a static site of hand-written HTML, CSS and vanilla JavaScript, published to GitHub Pages. It has no accounts, no sign-in and no package dependencies. Search runs entirely in your browser, building its index from the site's own pages, and the site doesn't set cookies or save anything on your device. Analytics are cookieless, through [Umami](https://umami.is/). The attack surface is small, but security reports are still welcome, and I'd rather hear about a problem privately before it's public.

---

## 🛡️ Supported Versions

There are no releases. Only what's live is maintained.

| Version | Supported |
| --- | --- |
| The live site at [marcogrimaldi29.com/gh-900-study-notes](https://marcogrimaldi29.com/gh-900-study-notes/) and the `main` branch | ✅ |
| Older commits, forks and copies hosted elsewhere | ❌ |

## 📮 Reporting a Vulnerability

**Please don't open a public issue or comment.** Report it privately through GitHub instead: open the repo's **Security** tab and choose **Report a vulnerability**, or go straight to the [private report form](https://github.com/marcogrimaldi29/gh-900-study-notes/security/advisories/new). Only you and I can see the report, and we can discuss and fix the problem there before anything is made public.

It helps to include:

- The affected URL, or the file in this repo
- What the problem is and what someone could do with it
- The steps to reproduce it, or a short proof of concept

Please don't include real secrets, credentials or anyone else's personal data in the report, and don't test against anything that isn't yours.

If you can't use GitHub, send me a private message on [LinkedIn](https://www.linkedin.com/in/marco-grimaldi29/) instead, starting it with **"Security: GH-900 Study Notes"** so it's easy to spot.

## 🎯 Scope

**In scope:**

- The published site, including its pages, scripts and assets
- This repository's source and its GitHub Actions deploy workflow
- A known-vulnerable version of an action the workflow uses. The site itself has no package dependencies, so those actions are the only pinned versions in the repo

**Out of scope:**

- **GitHub or Microsoft products.** Report a vulnerability in GitHub itself, including GitHub Pages and GitHub Actions, through the [GitHub Bug Bounty](https://bounty.github.com/) program, and one in Microsoft Learn or another Microsoft product to the [Microsoft Security Response Center](https://msrc.microsoft.com/create-report).
- **A vulnerability inside an action or in Umami itself.** Report it to that project. If this repo uses an affected version, let me know as well.
- **HTTP response headers set by GitHub Pages.** The repo can't change them.
- **Automated scanner output** with no demonstrated impact on this site.
- **An insecure pattern in the notes**, such as advice that would leave a personal access token in a repository, or a 2FA recommendation that's weaker than GitHub's own guidance. That's a content issue, so it's welcome as a public issue — see the [contributing guide](CONTRIBUTING.md).

## ⏱️ What to Expect

I maintain this repo on my own, so responses are best effort. I'll confirm I've received your report, keep you updated in the private report while I look into it, and let you know when it's fixed. If you'd like to be credited, say so and I'll credit you in the security advisory or the fix.

Dependabot alerts are turned on for this repo, so a known vulnerability in an action the workflow uses is usually flagged without a report.
