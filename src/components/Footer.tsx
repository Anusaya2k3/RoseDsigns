import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useSectionObserver } from './MotionPrimitives';

export function Footer() {
  const sectionObserver = useSectionObserver();

  return (
    <motion.footer
      {...sectionObserver}
      className="relative z-10 border-t border-[#e8dccf] bg-[#fbf6f1]/80 py-10 text-sm text-[#6b5560] dark:border-[#3d2530] dark:bg-[#14070c]/80 dark:text-[#b9a3ab]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center lg:px-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className="font-display text-base font-extrabold text-[#2a0f19] dark:text-[#f6ece4]">
            Rose<em className="font-editorial font-semibold text-[#9b2c4a] dark:text-[#e0728f]">Dsigns</em> — Brands that Bloom
          </span>
          <span aria-hidden="true" className="hidden text-[#b8893b] sm:inline">
            ·
          </span>
          <span className="font-editorial text-base font-semibold italic text-[#9b2c4a] dark:text-[#e0728f]">
            Design by Anusaya
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="#about"
            className="font-medium transition-colors hover:text-[#9b2c4a] dark:hover:text-[#e0728f]"
          >
            Studio
          </a>
          <a
            href="#services"
            className="font-medium transition-colors hover:text-[#9b2c4a] dark:hover:text-[#e0728f]"
          >
            Services
          </a>
          <a
            href="#work"
            className="font-medium transition-colors hover:text-[#9b2c4a] dark:hover:text-[#e0728f]"
          >
            Work
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-semibold text-[#2a0f19] transition-colors hover:text-[#9b2c4a] dark:text-[#f6ece4] dark:hover:text-[#e0728f]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
