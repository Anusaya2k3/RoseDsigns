export function BackgroundAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Top-left rose bloom aura — pure radial gradient without heavy blur filters */}
      <div
        className="absolute -top-40 -left-40 h-[44rem] w-[44rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(224,114,143,0.16) 0%, rgba(155,44,74,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Right-side warm gold champagne aura */}
      <div
        className="absolute top-[18%] -right-44 h-[48rem] w-[48rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,137,59,0.15) 0%, rgba(230,194,122,0.06) 42%, transparent 72%)',
        }}
      />

      {/* Lower deep-blush ambient wash */}
      <div
        className="absolute -bottom-32 left-[18%] h-[46rem] w-[46rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(155,44,74,0.13) 0%, rgba(184,137,59,0.05) 42%, transparent 72%)',
        }}
      />

      {/* Ultra-subtle fine architectural dot field across entire page */}
      <div
        className="absolute inset-0 opacity-[0.22] dark:opacity-[0.14]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(155,44,74,0.22) 1px, transparent 1.2px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
}
