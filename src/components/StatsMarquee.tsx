import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';
import { MARQUEE_ITEMS, STUDIO_STATS } from '../data/studioData';
import { useSectionObserver } from './MotionPrimitives';

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const start = performance.now();
            const duration = 1350;

            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(target * eased));
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };

            requestAnimationFrame(step);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-mono-tabular">
      {display}
      {suffix}
    </span>
  );
}

export function StatsMarquee() {
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const baseX = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  useAnimationFrame((_, delta) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const speedFactor = hovered ? 0.3 : 1;
    const moveBy = -0.04 * (Math.min(delta, 32) / 16) * speedFactor;

    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    baseX.set(next);
  });

  const xPercent = useTransform(baseX, (v) => `${v}%`);
  const sectionObserver = useSectionObserver();

  return (
    <div className="w-full overflow-hidden">
      {/* Scroll-Velocity-Reactive Kinetic Marquee Band */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full overflow-hidden bg-[#2a0f19] py-4 text-[#f6ece4] dark:bg-[#0d0407]"
      >
        <motion.div
          style={{ x: xPercent }}
          className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform"
        >
          {repeatedItems.map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="flex items-center gap-10 text-xs font-semibold tracking-[0.22em] uppercase"
            >
              <span className="transition-colors hover:text-[#e6c27a]">{item}</span>
              <span aria-hidden="true" className="font-editorial text-base text-[#e6c27a]">
                ✦
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Quantified Proof Strip */}
      <motion.section
        {...sectionObserver}
        aria-label="Studio impact metrics"
        className="border-b border-[#e8dccf] bg-white/60 py-11 dark:border-[#3d2530] dark:bg-[#1f0c13]/65"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:px-10">
          {STUDIO_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-transparent p-5 text-center transition-all duration-300 hover:border-[#b8893b]/40 hover:bg-white hover:shadow-[0_14px_30px_rgba(42,15,25,0.06)] md:text-left dark:hover:border-[#e6c27a]/30 dark:hover:bg-[#26121a]"
            >
              <div className="font-display text-3xl font-extrabold text-[#9b2c4a] transition-transform duration-300 group-hover:scale-105 sm:text-4xl dark:text-[#e0728f]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-[#2a0f19] dark:text-[#f6ece4]">
                {stat.label}
              </div>
              <div className="mt-0.5 text-xs text-[#6b5560] dark:text-[#b9a3ab]">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
