# Contributing to GH-900 Study Notes

Thanks for helping keep these notes accurate. They cover **Exam GH-900: GitHub Foundations**, and GitHub ships new features fast, so plans, allowances and feature names can change well before the next revision of the study guide. Reports from people studying with the notes are the best way to catch that.

> [!IMPORTANT]
> **This repo accepts issues, not pull requests.** Pull requests are turned off: I write every change myself and check it against GitHub Docs and the official study guide, so the notes keep one voice and stay consistent from page to page. If you know exactly how something should read, put your proposed wording in the issue. That's just as useful as an edit.

---

## Contents

- [Ways to Help](#-ways-to-help)
- [Before You Open an Issue](#-before-you-open-an-issue)
- [Opening an Issue](#-opening-an-issue)
- [Out of Scope](#-out-of-scope)
- [What Happens Next](#-what-happens-next)
- [Code of Conduct](#-code-of-conduct)
- [Security](#-security)

## 🙌 Ways to Help

Every report fits one of the five types in the issue template:

| Type | What it covers | For example |
| --- | --- | --- |
| **Content error** | Text, a table, a callout or a code sample is wrong | A Git command in the commands table does something other than the notes say, or the repository roles table gives Triage a permission it doesn't have |
| **Outdated content** | GitHub or the exam has changed since the page was written | A plan's included Actions minutes or storage have changed, a feature has been renamed or has left preview, or the study guide has been revised since January 2026 |
| **Site bug** | Search, navigation, a broken link or accessibility | A search result (Ctrl+K or /) lands on the wrong section, a GitHub Docs link returns 404, or a control can't be reached with the keyboard |
| **Device issue** | The site looks or behaves wrong on a specific device, screen size or browser | The plans table overflows on a phone in portrait, or the sidebar menu won't close on a tablet |
| **Other** | Something else, or a suggestion to make the notes clearer | Two features that would be easier to tell apart in a comparison table, or a trap that's missing from Exam Tips |

## 🔎 Before You Open an Issue

- **Search the existing issues**, [open and closed](https://github.com/marcogrimaldi29/gh-900-study-notes/issues?q=is%3Aissue). If yours is already there, add a 👍 reaction or a comment with anything new instead of opening a duplicate.
- **Check the date.** The notes are written against the skills listed in the study guide's **"Skills at a glance as of January 2026"** heading. If the [official study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-900) shows a later date there, say so in the issue, so I know which revision to compare against.
- **Check the current docs.** [GitHub Docs](https://docs.github.com/en) and the [GitHub Changelog](https://github.blog/changelog/) usually confirm whether something has changed, and give you the link the issue asks for.
- **One problem per issue.** Separate issues are easier to track, fix and close. Several typos on the same page can go in one issue.
- **For a site bug, hard-refresh first** (Ctrl+F5, or Cmd+Shift+R on a Mac) in case your browser is showing an older copy of the page.

## 📝 Opening an Issue

1. Open a new issue with the [🐞 Report an Issue](https://github.com/marcogrimaldi29/gh-900-study-notes/issues/new?template=ISSUE_TEMPLATE.md) template.
2. Give it a title that names the page and the problem, for example *"Git & GitHub Basics: plans table shows an old Actions allowance for GitHub Free"* rather than *"Mistake on page"*.
3. Fill in the template's sections, and leave out any that don't apply.

> [!TIP]
> To link straight to a section, click it in **On This Page**, then copy the address from your browser. A search result takes you to its section too, so the address works the same way.

### What Makes a Report Easy to Fix

- **A link to the exact section**, not just the page
- **The text as the notes have it**, quoted, so it can still be found if the page changes
- **An official source** for any content change: GitHub Docs for how a feature works, or the study guide for what the exam covers. A report without one may take longer, because every change is checked against the documentation before it goes in
- **For bugs and device issues:** the steps to reproduce it, what you expected and what happened instead, the device, operating system and browser, and a screenshot if it shows the problem
- **Your proposed wording**, if you have it. With pull requests turned off, it's the closest thing to suggesting an edit directly

## 🚫 Out of Scope

To keep the notes accurate and the issue tracker useful, please don't open issues for:

- **Live exam content.** Questions, answers or topics remembered from a real GH-900 exam break [Microsoft's exam security policy](https://learn.microsoft.com/en-us/credentials/support/exam-and-assessment-lab-security-policies). Issues or comments that include them will be closed and the content removed.
- **Exam booking, scores or retakes.** The GitHub Certifications section of [Microsoft Credentials support](https://learn.microsoft.com/en-us/credentials/support/help) covers scheduling, exam problems and how to challenge a question you think was wrong.
- **Help with your own account, organization or repositories.** To troubleshoot your own GitHub setup, ask in [GitHub Community discussions](https://github.com/orgs/community/discussions), or contact [GitHub Support](https://support.github.com/) for account and billing problems.
- **Anything private.** Issues are public, so leave out tokens, passwords, recovery codes, email addresses and the names of private repositories, organizations or enterprises, including in screenshots.
- **Unofficial sources.** Practice-test sites, exam dump sites and AI chat answers, Copilot Chat included, aren't accepted as the source for a content change.
- **Promotion.** Links to courses, products or services, affiliate links and paid placements won't be added.
- **Security vulnerabilities.** Please [report these privately](https://github.com/marcogrimaldi29/gh-900-study-notes/security/advisories/new), as described in the [security policy](SECURITY.md), not in a public issue.

## 🔄 What Happens Next

- I maintain the notes on my own, in my spare time, so replies are best effort and there's no fixed response time.
- I check each report against GitHub Docs and the study guide. If I need more detail, I'll ask on the issue, so keep an eye on your GitHub notifications.
- When a fix goes in, I close the issue with a note on what changed, or a link to the commit. The live site updates shortly after.
- If nothing changes, I close the issue with the reason, such as out of scope, can't be verified, or working as intended.
- An issue that's waiting on a reply may be closed after a while. Comment with the missing details and it can be reopened.

## 🤝 Code of Conduct

By opening, commenting on or reacting to issues here, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Comments that are abusive, spam or share live exam content may be hidden, edited or locked.

## 🔒 Security

Found a security problem with the site or this repo? Please don't report it in a public issue. Use [Report a vulnerability](https://github.com/marcogrimaldi29/gh-900-study-notes/security/advisories/new) instead, so only you and I can see it. The [security policy](SECURITY.md) has the details.

---

If the notes helped you, the README's [💚 Support](https://github.com/marcogrimaldi29/gh-900-study-notes#-support) section has a couple of ways to show it. Thanks for helping make them better for the next GH-900 candidate.
