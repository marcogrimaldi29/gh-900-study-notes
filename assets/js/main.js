document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const backToTop = document.querySelector('.back-to-top');
  const homeFab = document.querySelector('.home-fab');

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });

    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      });
    });
  }

  if (backToTop || homeFab) {
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      if (backToTop) backToTop.classList.toggle('visible', show);
      if (homeFab) homeFab.classList.toggle('visible', show);
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const getSlug = (path) => {
    const clean = path.replace(/index\.html?$/, '').replace(/\/+$/, '');
    const parts = clean.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : '';
  };

  const currentSlug = getSlug(window.location.pathname);
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (/^https?:\/\//.test(href)) return;
    if (getSlug(href) === currentSlug) {
      link.classList.add('active');
    }
  });

  initCodeRain();
});

function initCodeRain() {
  const container = document.querySelector('.code-rain');
  if (!container) return;

  const symbols = ['git', 'clone', 'init', 'add', 'commit', 'push', 'pull',
    'branch', 'merge', 'fetch', 'rebase', 'checkout', 'fork', 'PR', 'issue',
    'main', 'HEAD', 'origin', 'remote', 'stash', 'tag', 'blame', 'diff',
    'README', 'LICENSE', '.gitignore', 'Actions', 'CI/CD', 'YAML', 'workflow',
    '{', '}', '(', ')', ';', '//', '=>', '#', '##', '```', '&&', '||', '...'];

  const columns = Math.floor(window.innerWidth / 40);

  for (let i = 0; i < columns; i++) {
    const col = document.createElement('div');
    col.style.cssText = `
      position: absolute;
      top: ${-Math.random() * 100}%;
      left: ${(i / columns) * 100}%;
      writing-mode: vertical-rl;
      animation: rain ${15 + Math.random() * 20}s linear infinite;
      animation-delay: ${-Math.random() * 20}s;
    `;

    const count = 8 + Math.floor(Math.random() * 12);
    for (let j = 0; j < count; j++) {
      const span = document.createElement('span');
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)] + ' ';
      col.appendChild(span);
    }
    container.appendChild(col);
  }

  if (!document.querySelector('#rain-keyframes')) {
    const style = document.createElement('style');
    style.id = 'rain-keyframes';
    style.textContent = `@keyframes rain { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }`;
    document.head.appendChild(style);
  }
}
