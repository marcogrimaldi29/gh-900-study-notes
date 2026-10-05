/*
 * Site-wide search (Ctrl+K, or "/" when not typing).
 *
 * Ported from the GH-600 study notes. The index is built in the browser from the
 * site's own pages, section by section, the first time search is opened. Every
 * term on every page is searchable (prose, tables, callouts) without a separate
 * index to generate, commit and keep in step with the content.
 *
 * The page list is read from the sidebar, so a new page becomes searchable as
 * soon as it is linked there. Results are section-level: choosing one lands on
 * the exact heading rather than the top of a long page.
 */
(function () {
  const SEARCH_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/></svg>';

  const clean = (s) => s.replace(/\s+/g, ' ').trim();

  // "…/exam-tips/index.html#x" and "…/exam-tips/" are the same page.
  const pageKey = (url) => {
    const u = new URL(url, window.location.href);
    return u.origin + u.pathname.replace(/index\.html?$/, '');
  };

  function init() {
    const openBtn = document.getElementById('search-open');
    if (!openBtn || typeof HTMLDialogElement === 'undefined') return;

    // Show the shortcut the way this platform spells it.
    if (/Mac|iPhone|iPad/.test(navigator.platform || '')) {
      const kbd = openBtn.querySelector('.search-kbd');
      if (kbd) kbd.textContent = '⌘ K';
      openBtn.title = 'Search (⌘K)';
    }

    const modal = document.createElement('dialog');
    modal.className = 'search-modal';
    modal.setAttribute('aria-label', 'Search the study notes');
    modal.innerHTML = `
      <div class="sm-inner">
        <div class="sm-field">
          <span class="sm-icon">${SEARCH_ICON}</span>
          <input type="search" class="sm-input"
            placeholder="Search every page: GitHub Flow, SCIM, Codespaces…"
            autocomplete="off" spellcheck="false"
            role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list">
          <button type="button" class="sm-close" aria-label="Close search">Esc</button>
        </div>
        <p class="sm-status" role="status" aria-live="polite"></p>
        <ul class="sm-results" id="search-results" role="listbox" aria-label="Search results"></ul>
        <div class="sm-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>`;
    document.body.append(modal);

    const input = modal.querySelector('.sm-input');
    const closeBtn = modal.querySelector('.sm-close');
    const list = modal.querySelector('.sm-results');
    const status = modal.querySelector('.sm-status');

    // Internal sidebar links are the site map: Home, Exam Tips and every skill area.
    const seen = new Set();
    const pages = [];
    document.querySelectorAll('.sidebar .sidebar-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || /^https?:\/\//.test(href)) return;
      const key = pageKey(href);
      if (seen.has(key)) return;
      seen.add(key);
      const label = link.cloneNode(true);
      label.querySelectorAll('.badge, svg').forEach((n) => n.remove());
      pages.push({ url: new URL(href, window.location.href).href.replace(/#.*$/, ''), key, label: clean(label.textContent) });
    });

    let records = null;
    let building = null;
    let failed = 0;
    let active = -1;

    /* ---------- index ---------- */

    function extract(main, page) {
      const out = [];
      if (!main) return out;

      // Page chrome repeats on every page and would drown out the real content.
      main.querySelectorAll('.breadcrumb, .disclaimer, .page-toc, .page-nav, script').forEach((n) => n.remove());
      // Table cells and list items sit flush against each other in the markup;
      // pad them so their text doesn't run together ("FeatureQuestion it answers").
      main.querySelectorAll('th, td, li, p, h4, h5, div, br').forEach((n) => n.after(' '));

      const push = (heading, hash, text) => {
        const t = clean(text);
        if (!t && !heading) return;
        out.push({
          url: page.url,
          label: page.label,
          heading: heading || page.label,
          hash,
          text: t,
          hay: (heading + ' ' + page.label + ' ' + t).toLowerCase(),
        });
      };

      // Everything above the first H2 belongs to an intro record.
      let heading = page.label;
      let hash = '';
      let buf = '';

      for (const node of Array.from(main.children)) {
        const tag = node.tagName;
        if (tag === 'H1') {
          heading = clean(node.textContent || '');
        } else if (tag === 'H2' || tag === 'H3') {
          push(heading, hash, buf);
          heading = clean(node.textContent || '');
          hash = node.id ? '#' + node.id : '';
          buf = '';
        } else {
          buf += ' ' + (node.textContent || '');
        }
      }
      push(heading, hash, buf);
      return out;
    }

    function buildIndex() {
      if (records) return Promise.resolve(records);
      if (building) return building;

      const here = pageKey(window.location.href);
      building = Promise.all(
        pages.map((page) => {
          // The current page is already loaded, which also keeps search working
          // when the site is opened straight from disk (file://), where fetch fails.
          if (page.key === here) {
            const main = document.querySelector('.main-content');
            return Promise.resolve(extract(main && main.cloneNode(true), page));
          }
          return fetch(page.url)
            .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
            .then((html) => extract(new DOMParser().parseFromString(html, 'text/html').querySelector('.main-content'), page))
            .catch(() => {
              failed++;
              return [];
            });
        }),
      ).then((groups) => {
        records = groups.flat();
        return records;
      });

      return building;
    }

    // Warm the index as soon as there is any sign of intent, so the first
    // keystroke has something to search.
    openBtn.addEventListener('pointerenter', () => void buildIndex(), { once: true });
    openBtn.addEventListener('focus', () => void buildIndex(), { once: true });

    /* ---------- scoring ---------- */

    const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    function compile(terms) {
      const phrase = terms.join(' ');
      return {
        terms: terms.map((t) => ({
          t,
          whole: new RegExp('\\b' + escape(t) + '\\b'),
          prefix: new RegExp('\\b' + escape(t)),
        })),
        phrase,
        wholePhrase: terms.length > 1 ? new RegExp('\\b' + escape(phrase) + '\\b') : null,
      };
    }

    function score(rec, q) {
      let s = 0;
      const heading = rec.heading.toLowerCase();
      const label = rec.label.toLowerCase();
      const text = rec.text.toLowerCase();

      // Every term must appear somewhere, so multi-word queries narrow rather
      // than widen the result set. A whole word beats a word prefix, which
      // beats a match inside a word: "pro" should find "GitHub Pro" before
      // "GitHub Projects", but still find "Projects" while it is being typed.
      for (const { t, whole, prefix } of q.terms) {
        if (!rec.hay.includes(t)) return 0;
        if (heading.includes(t)) s += whole.test(heading) ? 12 : prefix.test(heading) ? 6 : 3;
        if (label.includes(t)) s += 2;
        if (text.includes(t)) s += whole.test(text) ? 4 : prefix.test(text) ? 2 : 1;
      }

      // An exact phrase is a much stronger signal than the same words scattered.
      if (q.wholePhrase) {
        if (q.wholePhrase.test(heading)) s += 40;
        else if (q.wholePhrase.test(text)) s += 30;
        else if (heading.includes(q.phrase)) s += 8;
        else if (text.includes(q.phrase)) s += 3;
      }
      // Prefer the tighter section when two cover the same ground.
      if (rec.text.length < 900) s += 1;
      return s;
    }

    /* ---------- rendering ---------- */

    function highlight(text, terms) {
      const frag = document.createDocumentFragment();
      const lower = text.toLowerCase();
      const ranges = [];

      for (const term of terms) {
        let i = lower.indexOf(term);
        while (i !== -1) {
          ranges.push([i, i + term.length]);
          i = lower.indexOf(term, i + term.length);
        }
      }
      ranges.sort((a, b) => a[0] - b[0]);

      let cursor = 0;
      for (const [start, end] of ranges) {
        if (start < cursor) continue;
        frag.append(text.slice(cursor, start));
        const mark = document.createElement('mark');
        mark.textContent = text.slice(start, end);
        frag.append(mark);
        cursor = end;
      }
      frag.append(text.slice(cursor));
      return frag;
    }

    function snippet(rec, q) {
      const lower = rec.text.toLowerCase();
      // Centre on the exact phrase when there is one, else on the first term.
      let at = -1;
      if (q.wholePhrase) {
        const m = q.wholePhrase.exec(lower);
        at = m ? m.index : lower.indexOf(q.phrase);
      }
      if (at === -1) {
        for (const { t } of q.terms) {
          const i = lower.indexOf(t);
          if (i !== -1 && (at === -1 || i < at)) at = i;
        }
      }
      if (at === -1) return rec.text.slice(0, 160) + (rec.text.length > 160 ? '…' : '');
      const start = Math.max(0, at - 70);
      const end = Math.min(rec.text.length, at + 130);
      return (start > 0 ? '…' : '') + rec.text.slice(start, end) + (end < rec.text.length ? '…' : '');
    }

    function setActive(next) {
      const items = Array.from(list.querySelectorAll('.sm-hit'));
      if (!items.length) return;
      active = (next + items.length) % items.length;
      items.forEach((li, i) => {
        const on = i === active;
        li.classList.toggle('active', on);
        li.setAttribute('aria-selected', String(on));
        if (on) {
          li.scrollIntoView({ block: 'nearest' });
          input.setAttribute('aria-activedescendant', li.id);
        }
      });
    }

    function render(query) {
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      list.innerHTML = '';
      active = -1;
      input.removeAttribute('aria-activedescendant');

      if (!terms.length) {
        status.textContent = 'Type to search every page.';
        input.setAttribute('aria-expanded', 'false');
        return;
      }
      if (!records) {
        status.textContent = 'Building the index…';
        return;
      }

      const q = compile(terms);
      const hits = records
        .map((rec) => ({ rec, s: score(rec, q) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 30)
        .map((r) => r.rec);

      input.setAttribute('aria-expanded', String(hits.length > 0));
      status.textContent = (hits.length
        ? `${hits.length} result${hits.length === 1 ? '' : 's'}`
        : `No match for “${query}”.`) +
        (failed ? ` (${failed} page${failed === 1 ? '' : 's'} could not be loaded)` : '');

      hits.forEach((rec, i) => {
        const li = document.createElement('li');
        li.className = 'sm-hit';
        li.id = `sm-hit-${i}`;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', 'false');

        const a = document.createElement('a');
        a.href = rec.url + rec.hash;

        const crumb = document.createElement('span');
        crumb.className = 'sm-crumb';
        crumb.textContent = rec.label;

        const title = document.createElement('span');
        title.className = 'sm-title';
        title.append(highlight(rec.heading, terms));

        const body = document.createElement('span');
        body.className = 'sm-snippet';
        body.append(highlight(snippet(rec, q), terms));

        a.append(crumb, title, body);
        li.append(a);
        list.append(li);
      });

      if (hits.length) setActive(0);
    }

    /* ---------- open / close ---------- */

    async function open() {
      modal.showModal();
      input.value = '';
      render('');
      input.focus();
      if (!records) status.textContent = 'Building the index…';
      await buildIndex();
      if (modal.open) render(input.value.trim());
    }

    function close() {
      modal.close();
    }

    openBtn.addEventListener('click', () => void open());
    closeBtn.addEventListener('click', close);

    // Click outside the panel closes it; <dialog> handles Esc itself.
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    let debounce;
    input.addEventListener('input', () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => render(input.value.trim()), 90);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(active + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === 'Enter') {
        const link = list.querySelector('.sm-hit.active a');
        if (link) {
          e.preventDefault();
          close();
          window.location.href = link.href;
        }
      }
    });

    list.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });

    // Ctrl/Cmd+K from anywhere, and "/" when not already typing.
    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '');
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        modal.open ? close() : void open();
      } else if (e.key === '/' && !typing && !modal.open) {
        e.preventDefault();
        void open();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
