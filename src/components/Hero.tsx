import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Layers, Monitor, Moon, PlayCircle, Sparkles, Sun, TrendingUp } from 'lucide-react';
import heroBrandStudioImg from '../assets/images/hero_brand_studio_1794724324651.jpg';
import {
  CYCLING_HEADLINE_WORDS,
  SERVICES,
  type ServiceId,
} from '../data/studioData';
import { MagneticAction, SpotlightTiltCard } from './MotionPrimitives';
import { StudioImage } from './StudioImage';

interface HeroProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSelectServiceForBrief: (serviceId: ServiceId) => void;
}

interface BurstPetal {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  isRose: boolean;
}

const SERVICE_ICONS: Record<ServiceId, typeof Sparkles> = {
  branding: Sparkles,
  websites: Monitor,
  content: PlayCircle,
  marketing: TrendingUp,
};

export function Hero({ theme, onToggleTheme, onSelectServiceForBrief }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 70, y: 35 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [wordText, setWordText] = useState('bloom.');
  const [activePreviewId, setActivePreviewId] = useState<ServiceId>('branding');
  const [burstPetals, setBurstPetals] = useState<BurstPetal[]>([]);

  const activeService = SERVICES.find((s) => s.id === activePreviewId) ?? SERVICES[0];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const emblemParallaxY = useTransform(scrollYProgress, [0, 1], [0, -32]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setWordText('bloom.');
      return;
    }

    let wordIndex = 0;
    let charIndex = CYCLING_HEADLINE_WORDS[0].length;
    let deleting = true;
    let timerId = 0;

    const tick = () => {
      const current = CYCLING_HEADLINE_WORDS[wordIndex];
      if (!deleting) {
        charIndex++;
        setWordText(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          deleting = true;
          timerId = window.setTimeout(tick, 1800);
          return;
        }
        timerId = window.setTimeout(tick, 85);
      } else {
        charIndex--;
        setWordText(current.slice(0, charIndex) || '\u200b');
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % CYCLING_HEADLINE_WORDS.length;
          timerId = window.setTimeout(tick, 280);
          return;
        }
        timerId = window.setTimeout(tick, 45);
      }
    };

    timerId = window.setTimeout(tick, 1800);
    return () => window.clearTimeout(timerId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: px, y: py });
    setParallax({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handleHeroClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const stamp = Date.now();

    const newPetals: BurstPetal[] = Array.from({ length: 12 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.25;
      const dist = 56 + Math.random() * 56;
      return {
        id: stamp + i,
        x: cx,
        y: cy,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        isRose: i % 2 === 0,
      };
    });

    setBurstPetals((prev) => [...prev.slice(-20), ...newPetals]);
    window.setTimeout(() => {
      setBurstPetals((prev) => prev.filter((p) => p.id < stamp || p.id >= stamp + 12));
    }, 950);
  };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onClick={handleHeroClick}
      className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden border-b border-[#e8dccf] bg-transparent py-10 lg:py-12 dark:border-[#3d2530]"
    >
      {/* Subtle architectural dot canvas + warm mouse spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(155,44,74,0.18) 1px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, #000 35%, transparent 95%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(620px circle at ${spotlight.x}% ${spotlight.y}%, rgba(155,44,74,0.16), transparent 62%), radial-gradient(640px 420px at 8% 92%, rgba(184,137,59,0.14), transparent 62%)`,
        }}
      />

      {/* Interactive Petal Click Burst */}
      {burstPetals.map((p) => (
        <motion.span
          key={p.id}
          aria-hidden="true"
          initial={{ x: p.x, y: p.y, scale: 1, opacity: 0.95, rotate: 0 }}
          animate={{
            x: p.x + p.dx,
            y: p.y + p.dy,
            scale: 0.2,
            opacity: 0,
            rotate: 220,
          }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className={`pointer-events-none absolute top-0 left-0 z-20 h-2.5 w-2.5 rounded-tl-full rounded-tr-none rounded-br-full rounded-bl-full ${
            p.isRose ? 'bg-[#9b2c4a] dark:bg-[#e0728f]' : 'bg-[#b8893b]'
          }`}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Typographic & Interactive Capability Column */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[#b8893b] uppercase">
                Creative &amp; Digital Studio · Brands that Bloom
              </p>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'velvet dark' : 'warm cream'} studio theme`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#e8dccf] bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-[#2a0f19] transition-colors hover:border-[#9b2c4a] dark:border-[#3d2530] dark:bg-[#26121a] dark:text-[#f6ece4] dark:hover:border-[#e0728f]"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-3.5 w-3.5 text-[#9b2c4a]" />
                    <span>Velvet Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-3.5 w-3.5 text-[#e6c27a]" />
                    <span>Warm Cream</span>
                  </>
                )}
              </motion.button>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(2.65rem,5vw,4.55rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-[#2a0f19] dark:text-[#f6ece4]"
            >
              Ideas that make your brand{' '}
              <em className="font-editorial text-bloom-gradient inline-block border-r-[3px] border-[#b8893b] pr-2 font-semibold">
                {wordText}
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#6b5560] sm:text-lg dark:text-[#c7b2ba]"
            >
              Distinctive identities, considered websites and stories that connect. We shape a
              modern digital presence that feels unmistakably yours.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <MagneticAction
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-[#9b2c4a] px-6 py-3.5 text-sm font-semibold text-white transition-shadow hover:bg-[#82223c] hover:shadow-[0_14px_30px_rgba(155,44,74,0.36)] dark:bg-[#e0728f] dark:text-[#14070c] dark:hover:bg-[#ec8da5]"
              >
                <span>Discover our work</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticAction>

              <MagneticAction
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2a0f19]/25 bg-transparent px-5 py-3.5 text-sm font-semibold text-[#2a0f19] transition-colors hover:border-[#9b2c4a] hover:text-[#9b2c4a] dark:border-[#f6ece4]/25 dark:text-[#f6ece4] dark:hover:border-[#e0728f] dark:hover:text-[#e0728f]"
              >
                <Layers className="h-4 w-4" />
                <span>What we do</span>
              </MagneticAction>
            </motion.div>

            {/* Interactive Capability Spotlight Selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 border-t border-[#e8dccf] pt-6 dark:border-[#3d2530]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono-tabular text-[11px] font-medium tracking-[0.16em] text-[#6b5560] uppercase dark:text-[#b9a3ab]">
                  Explore Capabilities
                </span>
                <span className="font-mono-tabular text-[11px] text-[#9b2c4a] dark:text-[#e0728f]">
                  {activeService.number} / 04
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Preview studio capabilities"
                className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {SERVICES.map((srv) => {
                  const Icon = SERVICE_ICONS[srv.id];
                  const selected = srv.id === activePreviewId;
                  return (
                    <motion.button
                      key={srv.id}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActivePreviewId(srv.id)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                        selected
                          ? 'border-[#9b2c4a] bg-[#9b2c4a] text-white shadow-[0_8px_20px_rgba(155,44,74,0.28)] dark:border-[#e0728f] dark:bg-[#e0728f] dark:text-[#14070c]'
                          : 'border-[#e8dccf] bg-white/80 text-[#2a0f19] hover:border-[#b8893b] dark:border-[#3d2530] dark:bg-[#26121a] dark:text-[#f6ece4]'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{srv.shortLabel}</span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.28 }}
                  className="mt-4 flex flex-col justify-between gap-3 border-l-2 border-[#b8893b] pl-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2a0f19] dark:text-[#f6ece4]">
                      <span>{activeService.title}</span>
                      <span className="text-[#b8893b]">·</span>
                      <span className="font-mono-tabular font-normal text-[#6b5560] dark:text-[#b9a3ab]">
                        {activeService.typicalTimeline}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#6b5560] dark:text-[#c7b2ba]">
                      {activeService.outcomeNote}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForBrief(activeService.id)}
                    className="shrink-0 self-start rounded-lg border border-[#9b2c4a]/35 px-3 py-1.5 text-xs font-semibold text-[#9b2c4a] transition-colors hover:bg-[#9b2c4a] hover:text-white sm:self-center dark:border-[#e0728f]/40 dark:text-[#e0728f] dark:hover:bg-[#e0728f] dark:hover:text-[#14070c]"
                  >
                    Brief this →
                  </button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Tilt Studio Showcase + Floating Rose Emblem */}
          <div className="relative lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <SpotlightTiltCard
                tiltStrength={4}
                className="aspect-[4/3] w-full rounded-3xl border border-[#e8dccf] bg-[#2a0f19] shadow-[0_32px_70px_rgba(42,15,25,0.22)] dark:border-[#3d2530] dark:shadow-[0_32px_70px_rgba(0,0,0,0.6)]"
              >
                <StudioImage
                  src={heroBrandStudioImg}
                  alt="RoseDsigns brand studio showcase featuring embossed gold rose stationery, burgundy color swatches, fresh rose and editorial website mockup"
                  loading="eager"
                  fallbackTitle="RoseDsigns Creative Studio"
                  className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#16070c]/65 via-transparent to-transparent"
                />
                <div className="relative z-20 flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4 text-[#f6ece4]">
                    <div>
                      <span className="block font-mono-tabular text-[11px] tracking-[0.16em] text-[#e6c27a] uppercase">
                        Studio Showcase · 2025
                      </span>
                      <span className="mt-0.5 block font-editorial text-xl font-semibold italic">
                        Identity, Web &amp; Editorial Craft
                      </span>
                    </div>
                    <a
                      href="#work"
                      className="rounded-xl bg-white/15 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-[#9b2c4a]"
                    >
                      Featured Work →
                    </a>
                  </div>
                </div>
              </SpotlightTiltCard>

              {/* Floating Interactive RoseDsigns Original Rose Emblem Accent */}
              <motion.div
                style={{
                  y: emblemParallaxY,
                  x: parallax.x * -18,
                }}
                className="pointer-events-none absolute -top-5 -right-3 z-20 hidden h-28 w-28 items-center justify-center rounded-full border border-[#e8dccf] bg-[#fbf6f1]/90 p-2 shadow-xl backdrop-blur-md sm:flex lg:-top-7 lg:-right-6 lg:h-32 lg:w-32 dark:border-[#3d2530] dark:bg-[#26121a]/90"
              >
                <StudioImage
                  src="/assets/original/img_1.webp"
                  alt="RoseDsigns rotating botanical rose emblem"
                  loading="eager"
                  fallbackTitle="Rose"
                  className="animate-slow-spin h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(155,44,74,0.35)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
