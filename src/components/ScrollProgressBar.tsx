import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const tipLeft = useTransform(smoothProgress, (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`);
  const tipOpacity = useTransform(smoothProgress, [0, 0.015], [0, 1]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[3px] bg-[#2a0f19]/8 dark:bg-white/10"
    >
      {/* Animated gradient progress fill driven purely on GPU MotionValue */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="animate-progress-shimmer h-full w-full origin-left bg-gradient-to-r from-[#9b2c4a] via-[#e0728f] to-[#e6c27a] bg-[length:200%_100%] will-change-transform"
      />

      {/* Subtle luminous leading spark along the scroll edge */}
      <motion.span
        style={{ left: tipLeft, opacity: tipOpacity }}
        className="absolute top-1/2 h-2 w-6 -translate-x-full -translate-y-1/2 rounded-full bg-[#e6c27a] blur-[3px] will-change-transform"
      />
    </div>
  );
}
