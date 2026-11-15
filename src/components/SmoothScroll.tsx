import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const dest = document.querySelector(hash);
      if (!dest) return;

      e.preventDefault();
      const top =
        hash === '#top'
          ? 0
          : Math.max(0, dest.getBoundingClientRect().top + window.scrollY - 68);

      window.scrollTo({
        top,
        behavior: reduced ? 'auto' : 'smooth',
      });
    };

    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, []);

  return null;
}
