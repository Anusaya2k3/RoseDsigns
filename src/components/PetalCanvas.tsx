import { useEffect, useRef } from 'react';

interface Petal {
  xFrac: number;
  y: number;
  depth: number;
  spriteIdx: number;
  rot: number;
  rotVel: number;
  tilt: number;
  tiltSpeed: number;
  wobble: number;
  driftAmp: number;
  fallSpeed: number;
}

export function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    function createPetalSprite(c1: string, c2: string, veinColor: string): HTMLCanvasElement {
      const s = document.createElement('canvas');
      s.width = 72;
      s.height = 88;
      const x = s.getContext('2d');
      if (!x) return s;
      x.translate(36, 44);
      const g = x.createLinearGradient(0, -36, 0, 36);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      x.fillStyle = g;
      x.beginPath();
      x.moveTo(0, -36);
      x.bezierCurveTo(30, -30, 34, 14, 0, 38);
      x.bezierCurveTo(-34, 14, -30, -30, 0, -36);
      x.fill();
      x.strokeStyle = veinColor;
      x.lineWidth = 1.5;
      x.beginPath();
      x.moveTo(0, -28);
      x.quadraticCurveTo(4, 4, 0, 30);
      x.stroke();
      return s;
    }

    const sprites = [
      createPetalSprite('#f08aa3', '#b83255', 'rgba(255,255,255,0.3)'),
      createPetalSprite('#e0728f', '#8f2442', 'rgba(255,255,255,0.24)'),
      createPetalSprite('#f7b6c4', '#d46a86', 'rgba(255,255,255,0.34)'),
      createPetalSprite('#c43d5e', '#7a1f3a', 'rgba(255,255,255,0.22)'),
      createPetalSprite('#e6c27a', '#b8893b', 'rgba(255,255,255,0.32)'),
    ];

    let width = 0;
    let height = 0;
    let lastScrollY = window.scrollY;
    let petals: Petal[] = [];
    let rafId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seedPetals = () => {
      petals = [];
      // Scale cleanly across full screen width on mobile, tablet, and desktop
      const count = Math.min(34, Math.max(16, Math.round(width / 46)));
      for (let i = 0; i < count; i++) {
        const depth = 0.25 + Math.random() * 0.75;
        petals.push({
          xFrac: Math.random(),
          y: Math.random() * height,
          depth,
          spriteIdx: i % sprites.length,
          rot: Math.random() * Math.PI * 2,
          rotVel: (Math.random() - 0.5) * 0.022,
          tilt: Math.random() * Math.PI * 2,
          tiltSpeed: 0.012 + Math.random() * 0.022,
          wobble: Math.random() * Math.PI * 2,
          driftAmp: 14 + Math.random() * 22,
          fallSpeed: 0.35 + depth * 0.85,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedPetals();
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (now: number) => {
      const rawDy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const dy = Math.max(-28, Math.min(28, rawDy));

      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y += p.fallSpeed - dy * p.depth * 0.38;
        if (p.y > height + 48) p.y = -48;
        else if (p.y < -60) p.y = height + 48;

        p.rot += p.rotVel;
        p.tilt += p.tiltSpeed;

        const baseX = p.xFrac * width;
        const swayX = Math.sin(now / 1500 + p.wobble) * p.driftAmp;
        const x = baseX + swayX;
        const sc = (10 + p.depth * 9) / 72;

        ctx.save();
        ctx.translate(x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(sc * Math.cos(p.tilt), sc);
        // Subtle background alpha so petals enrich the full page without distracting from foreground content
        ctx.globalAlpha = 0.16 + p.depth * 0.24;
        ctx.drawImage(sprites[p.spriteIdx], -36, -44);
        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
    />
  );
}
