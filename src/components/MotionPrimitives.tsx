import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

export function useSectionObserver() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.04 });
  const prefersReduced = useReducedMotion();
  const visible = isInView || Boolean(prefersReduced);

  return {
    ref,
    initial: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.04 });
  const prefersReduced = useReducedMotion();
  const visible = isInView || Boolean(prefersReduced);

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StudioCursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed top-0 left-0 z-30 h-64 w-64 rounded-full bg-radial from-[#9b2c4a]/10 via-[#b8893b]/5 to-transparent blur-2xl dark:from-[#e0728f]/14 dark:via-[#e6c27a]/6"
    />
  );
}

interface SpotlightTiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  tiltStrength?: number;
}

export function SpotlightTiltCard({
  children,
  className = '',
  onClick,
  tiltStrength = 7,
}: SpotlightTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50, active: false });

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const smoothX = useSpring(normX, { stiffness: 260, damping: 24 });
  const smoothY = useSpring(normY, { stiffness: 260, damping: 24 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltStrength, tiltStrength]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    normX.set(px - 0.5);
    normY.set(py - 0.5);
    setHoverPos({ x: px * 100, y: py * 100, active: true });
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
    setHoverPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 950,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group relative overflow-hidden ${className}`}
    >
      {/* Dynamic cursor-tracking rose & gold border/surface glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hoverPos.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${hoverPos.x}% ${hoverPos.y}%, rgba(224,114,143,0.16), rgba(184,137,59,0.08) 45%, transparent 72%)`,
        }}
      />

      {/* Sweeping diagonal light sheen on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full z-10 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-700 ease-out group-hover:left-[140%]"
      />

      {children}
    </motion.div>
  );
}

interface MagneticActionProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function MagneticAction({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
}: MagneticActionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 20 });
  const sy = useSpring(my, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || window.matchMedia('(hover: none)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.97 }}
        className={`group relative overflow-hidden ${className}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-[140%]"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-[140%]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
