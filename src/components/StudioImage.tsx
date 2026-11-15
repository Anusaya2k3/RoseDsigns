import { useState } from 'react';

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  fallbackTitle?: string;
  loading?: 'lazy' | 'eager';
}

export function StudioImage({
  src,
  alt,
  className = '',
  objectPosition = '50% 50%',
  fallbackTitle = 'RoseDsigns Studio',
  loading = 'lazy',
}: StudioImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#9b2c4a] via-[#4a1628] to-[#1a0a10] p-6 text-center text-[#f6ece4] ${className}`}
      >
        <div>
          <span className="block font-mono-tabular text-[11px] tracking-[0.2em] text-[#e6c27a] uppercase">
            RoseDsigns
          </span>
          <span className="mt-1 block font-display text-lg italic">{fallbackTitle}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
}
