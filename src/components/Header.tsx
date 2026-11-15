import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { MagneticAction } from './MotionPrimitives';

interface HeaderProps {
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'about', label: 'Studio' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
];

export function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-[#e8dccf] bg-[#fbf6f1]/90 shadow-[0_10px_34px_rgba(42,15,25,0.08)] backdrop-blur-lg dark:border-[#3d2530] dark:bg-[#14070c]/90 dark:shadow-[0_10px_34px_rgba(0,0,0,0.45)]'
          : 'border-[#e8dccf]/65 bg-[#fbf6f1]/78 backdrop-blur-md dark:border-[#3d2530]/65 dark:bg-[#14070c]/78'
      }`}
    >

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          onClick={handleLinkClick}
          className="font-display text-2xl font-extrabold tracking-tight text-[#2a0f19] whitespace-nowrap shrink-0 transition-colors hover:text-[#9b2c4a] dark:text-[#f6ece4] dark:hover:text-[#e0728f]"
        >
          Rose<em className="font-semibold text-[#9b2c4a] dark:text-[#e0728f]">Dsigns</em>
        </a>

        {/* Zone 2: Navigation links */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#9b2c4a] dark:text-[#e0728f]'
                    : 'text-[#2a0f19]/75 hover:text-[#9b2c4a] dark:text-[#f6ece4]/75 dark:hover:text-[#e0728f]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute right-0 -bottom-0.5 left-0 h-[2px] origin-left bg-gradient-to-r from-[#9b2c4a] to-[#b8893b] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex shrink-0 items-center gap-3">
          <MagneticAction
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#9b2c4a] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-shadow hover:bg-[#82223c] hover:shadow-[0_10px_24px_rgba(155,44,74,0.28)] dark:bg-[#e0728f] dark:text-[#14070c] dark:hover:bg-[#ec8da5]"
          >
            <span>Let’s create</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticAction>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e8dccf] text-[#2a0f19] transition-colors hover:border-[#9b2c4a] md:hidden dark:border-[#3d2530] dark:text-[#f6ece4]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#e8dccf] bg-[#fbf6f1] px-6 py-5 md:hidden dark:border-[#3d2530] dark:bg-[#14070c]">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleLinkClick}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-[#2a0f19] transition-colors hover:bg-[#9b2c4a]/10 hover:text-[#9b2c4a] dark:text-[#f6ece4] dark:hover:bg-[#e0728f]/15"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#9b2c4a] px-4 py-2.5 text-sm font-semibold text-white dark:bg-[#e0728f] dark:text-[#14070c]"
              >
                <span>Let’s create</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
