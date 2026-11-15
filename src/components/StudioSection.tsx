import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PROCESS_PHASES } from '../data/studioData';
import { MagneticAction } from './MotionPrimitives';
import { StudioImage } from './StudioImage';

export function StudioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.04 });
  const prefersReduced = useReducedMotion();
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const currentPhase = PROCESS_PHASES[activePhaseIdx];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const emblemY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const emblemRotate = useTransform(scrollYProgress, [0, 1], [-6, 8]);

  const progressWidth = activePhaseIdx === 0 ? '16.6%' : activePhaseIdx === 1 ? '50%' : '100%';

  const visible = isInView || Boolean(prefersReduced);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top Philosophy 2-Column Split */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[#b8893b] uppercase">
              Our Philosophy
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.2vw,3.35rem)] leading-[1.08] font-extrabold text-[#2a0f19] dark:text-[#f6ece4]">
              Rooted in purpose.{' '}
              <em className="font-editorial text-bloom-gradient font-semibold">
                Made to be seen.
              </em>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#6b5560] sm:text-lg dark:text-[#c7b2ba]">
              We create meaningful brands, compelling content and impactful campaigns that help
              businesses stand out and grow. Every brand has a story worth telling—our craft turns
              that story into unmistakable visual presence.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#e8dccf] pt-7 sm:grid-cols-2 dark:border-[#3d2530]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#2a0f19] dark:text-[#f6ece4]">
                  Tactile Brand Systems
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6b5560] dark:text-[#b9a3ab]">
                  From embossed stationery to scalable digital palettes, every mark stays coherent.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#2a0f19] dark:text-[#f6ece4]">
                  Conversion-Ready Digital
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6b5560] dark:text-[#b9a3ab]">
                  Websites and social reels engineered together so discovery naturally turns into action.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll-Linked Parallax Emblem Visual Showcase */}
          <motion.div
            style={{ y: emblemY }}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center lg:col-span-6"
          >
            <div className="relative flex h-72 w-72 items-center justify-center sm:h-88 sm:w-88">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 rounded-full bg-radial from-[#e0728f]/28 via-[#b8893b]/12 to-transparent blur-2xl"
              />
              <div
                aria-hidden="true"
                className="animate-slow-spin pointer-events-none absolute inset-2 rounded-full border border-dashed border-[#b8893b]/45"
              />
              <motion.div
                style={{ rotate: emblemRotate }}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="animate-subtle-float relative z-10 flex h-56 w-56 items-center justify-center sm:h-68 sm:w-68"
              >
                <StudioImage
                  src="/assets/original/img_2.png"
                  alt="RoseDsigns signature rose-and-D monogram emblem"
                  fallbackTitle="RoseDsigns Emblem"
                  className="h-full w-full object-contain drop-shadow-[0_22px_30px_rgba(155,44,74,0.3)]"
                />
              </motion.div>
            </div>
            <p className="mt-4 font-editorial text-xl italic text-[#2a0f19] dark:text-[#f6ece4]">
              The art of a distinctive brand
            </p>
          </motion.div>
        </div>

        {/* Sculptural Velvet Kinetic Process Stage (Zero Formal White Content Boxes!) */}
        <motion.div
          id="process"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-[#250c15] via-[#17070d] to-[#2e101c] px-6 py-12 text-[#f6ece4] shadow-[0_32px_70px_rgba(42,15,25,0.22)] sm:px-10 sm:py-16 lg:px-14"
        >
          {/* Ambient radial glow orbs inside dark editorial stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-radial from-[#e0728f]/20 via-transparent to-transparent blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-radial from-[#b8893b]/15 via-transparent to-transparent blur-3xl"
          />

          <div className="relative z-10">
            {/* Stage Heading */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#e6c27a] uppercase">
                  The Creative Flow
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.1] font-extrabold text-white">
                  Three steps from{' '}
                  <em className="font-editorial text-[#e6c27a] font-semibold">
                    spark to bloom.
                  </em>
                </h3>
              </div>
              <span className="font-mono-tabular text-xs text-[#cbb6bf]">
                Hover or tap any milestone to explore
              </span>
            </div>

            {/* Horizontal Kinetic Progress Filament & Floating Typographic Stations */}
            <div className="relative mt-12">
              {/* Connecting Filament Bar */}
              <div
                aria-hidden="true"
                className="relative mb-8 hidden h-[2px] w-full overflow-hidden rounded-full bg-white/10 md:block"
              >
                <motion.div
                  animate={{ width: progressWidth }}
                  transition={{ type: 'spring', stiffness: 160, damping: 24 }}
                  className="h-full bg-gradient-to-r from-[#e0728f] via-[#e6c27a] to-[#f6ece4]"
                />
              </div>

              {/* Open Typographic Station Selectors (Borderless, No Formal Boxes) */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {PROCESS_PHASES.map((phase, idx) => {
                  const active = idx === activePhaseIdx;
                  return (
                    <button
                      key={phase.step}
                      type="button"
                      onMouseEnter={() => setActivePhaseIdx(idx)}
                      onClick={() => setActivePhaseIdx(idx)}
                      className="group relative flex flex-col items-start border-b border-white/12 pb-5 text-left transition-all md:border-b-0 md:pb-0"
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-editorial text-4xl font-bold italic transition-all duration-300 sm:text-5xl ${
                            active
                              ? 'scale-110 text-[#e6c27a]'
                              : 'text-white/25 group-hover:text-white/60'
                          }`}
                        >
                          {phase.step}
                        </span>
                        <span
                          className={`font-display text-2xl font-bold transition-colors sm:text-3xl ${
                            active ? 'text-white' : 'text-white/55 group-hover:text-white/90'
                          }`}
                        >
                          {phase.title}
                        </span>
                      </div>
                      <span
                        className={`mt-2 text-sm transition-colors ${
                          active ? 'text-[#f6ece4]/90' : 'text-[#cbb6bf]/60 group-hover:text-[#cbb6bf]'
                        }`}
                      >
                        {phase.tagline}
                      </span>

                      {active && (
                        <motion.span
                          layoutId="process-active-dot"
                          className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-[#e0728f] to-[#e6c27a]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frameless Fluid Editorial Stage Showcase */}
            <div className="mt-10 border-t border-white/12 pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase.step}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
                >
                  {/* Sculptural Statement Column */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 font-mono-tabular text-xs tracking-[0.18em] text-[#e0728f] uppercase">
                      <span>Stage {currentPhase.step}</span>
                      <span className="text-[#e6c27a]">·</span>
                      <span className="text-[#e6c27a]">{currentPhase.duration}</span>
                    </div>

                    <h4 className="mt-3 font-editorial text-3xl leading-snug font-semibold italic text-white sm:text-4xl">
                      “{currentPhase.tagline}”
                    </h4>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#dfd0d6]">
                      {currentPhase.description}
                    </p>
                  </div>

                  {/* Open Flowing Outputs & Action */}
                  <div className="flex flex-col items-start justify-between gap-6 border-l border-white/15 pl-0 lg:col-span-5 lg:pl-8">
                    <div className="w-full">
                      <span className="block font-mono-tabular text-[11px] tracking-[0.18em] text-[#e6c27a] uppercase">
                        Crafted in this phase
                      </span>
                      <ul className="mt-4 space-y-3">
                        {currentPhase.outputs.map((output, i) => (
                          <motion.li
                            key={output}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-3 text-sm font-medium text-[#f6ece4]"
                          >
                            <Check className="h-4 w-4 shrink-0 text-[#e6c27a]" />
                            <span>{output}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <MagneticAction
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#e6c27a] px-5 py-2.5 text-xs font-bold text-[#17070d] transition-colors hover:bg-white"
                    >
                      <span>Start with {currentPhase.title}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </MagneticAction>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
