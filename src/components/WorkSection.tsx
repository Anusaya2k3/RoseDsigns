import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, ExternalLink, Eye, Sparkles, X } from 'lucide-react';
import { WORK_PROJECTS, type WorkCategory, type WorkProject } from '../data/studioData';
import { SpotlightTiltCard, useSectionObserver } from './MotionPrimitives';
import { StudioImage } from './StudioImage';

const FILTER_TABS: WorkCategory[] = ['All', 'Websites', 'Social & Reels', 'Brand Identity'];

export function WorkSection() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All');
  const [activeProject, setActiveProject] = useState<WorkProject | null>(null);

  const visibleProjects =
    activeCategory === 'All'
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  const sectionObserver = useSectionObserver();

  return (
    <motion.section {...sectionObserver} id="work" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header + Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <p className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[#b8893b] uppercase">
              Selected Work
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.2vw,3.35rem)] leading-[1.08] font-extrabold text-[#2a0f19] dark:text-[#f6ece4]">
              Distinctive brands.{' '}
              <em className="font-editorial text-bloom-gradient font-semibold">
                Thoughtfully brought to life.
              </em>
            </h2>
            <p className="mt-3 max-w-xl text-base text-[#6b5560] dark:text-[#c7b2ba]">
              A curated selection across hospitality, dining, entertainment and digital identity.
              Hover any card to feel the motion or open the full case study.
            </p>
          </div>

          {/* Segmented Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter selected projects by discipline"
            className="flex flex-wrap gap-2"
          >
            {FILTER_TABS.map((tab) => {
              const selected = activeCategory === tab;
              return (
                <motion.button
                  key={tab}
                  role="tab"
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-selected={selected}
                  onClick={() => setActiveCategory(tab)}
                  className={`rounded-lg border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                    selected
                      ? 'border-[#9b2c4a] bg-[#9b2c4a] text-white shadow-[0_8px_18px_rgba(155,44,74,0.28)] dark:border-[#e0728f] dark:bg-[#e0728f] dark:text-[#16080d]'
                      : 'border-[#e8dccf] bg-white text-[#2a0f19] hover:border-[#b8893b] dark:border-[#3d2530] dark:bg-[#26121a] dark:text-[#f6ece4]'
                  }`}
                >
                  {tab}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Even, Symmetrical Showcase Grid with Interactive 3D Tilt & Spotlight Hover */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-[360px]"
              >
                <SpotlightTiltCard
                  tiltStrength={6}
                  className="flex h-full w-full flex-col justify-end rounded-2xl border border-[#e8dccf] bg-[#1a0a10] text-[#f6ece4] transition-colors duration-300 hover:border-[#e6c27a]/70 hover:shadow-[0_24px_48px_rgba(42,15,25,0.28)] dark:border-[#3d2530] dark:hover:border-[#e0728f]/70"
                >
                  <StudioImage
                    src={project.image}
                    alt={project.imageAlt}
                    objectPosition={project.objectPosition}
                    fallbackTitle={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:saturate-115"
                  />

                  {/* Focused bottom gradient scrim so photography breathes across the top */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14050a] via-[#14050a]/35 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                  />

                  {/* Minimal Card Footer */}
                  <div className="relative z-20 flex flex-col gap-3.5 p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 font-mono-tabular text-[11px] font-semibold tracking-[0.16em] uppercase">
                        <span className="text-[#e6c27a]">{project.channelLabel}</span>
                        <span className="text-[#f6ece4]/70">{project.year}</span>
                      </div>
                      <h3 className="mt-1 font-display text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-0.5">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t border-white/15 pt-3.5">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-[#9b2c4a]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Case Study</span>
                      </button>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live project ${project.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 text-white transition-all group-hover:border-[#e6c27a] group-hover:bg-[#e6c27a] group-hover:text-[#16070c]"
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      </a>
                    </div>
                  </div>
                </SpotlightTiltCard>
              </motion.div>
            ))}

            {/* Matching Symmetrical 6th Studio Invitation Card in All View so Grid is 3x2 Even */}
            {activeCategory === 'All' && (
              <motion.div
                key="your-brand-next"
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-[360px]"
              >
                <SpotlightTiltCard
                  tiltStrength={6}
                  className="flex h-full w-full flex-col justify-between rounded-2xl border border-[#b8893b]/45 bg-gradient-to-br from-[#2a0f19] via-[#4a1628] to-[#1a0a10] p-6 text-[#f6ece4] transition-colors duration-300 hover:border-[#e6c27a] hover:shadow-[0_24px_48px_rgba(155,44,74,0.3)]"
                >
                  <div className="relative z-20 flex items-center justify-between">
                    <span className="font-mono-tabular text-[11px] font-semibold tracking-[0.18em] text-[#e6c27a] uppercase">
                      NEXT IN BLOOM
                    </span>
                    <Sparkles className="h-4 w-4 text-[#e6c27a] transition-transform duration-500 group-hover:rotate-45" />
                  </div>

                  <div className="relative z-20">
                    <h3 className="font-display text-3xl leading-tight font-bold text-white">
                      Your brand{' '}
                      <em className="font-editorial text-[#e6c27a] font-semibold">
                        could be next.
                      </em>
                    </h3>
                  </div>

                  <div className="relative z-20 border-t border-white/15 pt-4">
                    <a
                      href="#contact"
                      className="inline-flex w-full items-center justify-between rounded-lg bg-[#e6c27a] px-4 py-2.5 text-xs font-bold text-[#1a0a10] transition-colors hover:bg-white"
                    >
                      <span>Start Your Project Brief</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </SpotlightTiltCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Case Study Modal Lightbox */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#120509]/80 p-4 backdrop-blur-sm sm:p-6"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#e8dccf] bg-[#fbf6f1] text-[#2a0f19] shadow-2xl dark:border-[#3d2530] dark:bg-[#1f0d14] dark:text-[#f6ece4]"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close case study modal"
                className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#16070c]/80 text-white backdrop-blur-md transition-colors hover:bg-[#9b2c4a]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1a0a10]">
                <StudioImage
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  objectPosition={activeProject.objectPosition}
                  fallbackTitle={activeProject.title}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16070c]/85 via-transparent to-transparent"
                />
                <div className="absolute right-6 bottom-5 left-6 text-white">
                  <span className="font-mono-tabular text-xs tracking-[0.18em] text-[#e6c27a] uppercase">
                    {activeProject.channelLabel} · {activeProject.clientSector} · {activeProject.year}
                  </span>
                  <h3 id="case-study-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8dccf] pb-4 dark:border-[#3d2530]">
                  <div>
                    <span className="block font-mono-tabular text-[11px] text-[#6b5560] uppercase dark:text-[#b9a3ab]">
                      Headline Outcome
                    </span>
                    <span className="font-display text-xl font-bold text-[#9b2c4a] dark:text-[#e0728f]">
                      {activeProject.headlineMetric}
                    </span>
                  </div>
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#9b2c4a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#82223c] dark:bg-[#e0728f] dark:text-[#16080d]"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="font-mono-tabular text-xs font-semibold tracking-[0.14em] text-[#b8893b] uppercase">
                      The Challenge
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#6b5560] dark:text-[#c7b2ba]">
                      {activeProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono-tabular text-xs font-semibold tracking-[0.14em] text-[#b8893b] uppercase">
                      Studio Solution
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#6b5560] dark:text-[#c7b2ba]">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono-tabular text-xs font-semibold tracking-[0.14em] text-[#6b5560] uppercase dark:text-[#b9a3ab]">
                    Key Deliverables
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2.5">
                    {activeProject.deliverables.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8dccf] bg-white px-3 py-1.5 text-xs font-medium text-[#2a0f19] dark:border-[#3d2530] dark:bg-[#26121a] dark:text-[#f6ece4]"
                      >
                        <Check className="h-3.5 w-3.5 text-[#9b2c4a] dark:text-[#e0728f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
