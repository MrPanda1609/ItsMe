import { useMemo } from 'react';
import type { ProfileEffectId } from '../types';

interface ProfileEffectOverlayProps {
  effect: ProfileEffectId;
  accentColor: string;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const hexToRgba = (hex: string, alpha: number) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const RISE_KEYFRAMES = `
  @keyframes rise-fade {
    0%   { transform: translateY(0)   scale(0.6); opacity: 0; }
    20%  { opacity: var(--op); }
    80%  { opacity: var(--op); }
    100% { transform: translateY(var(--rise)) scale(var(--scale-end)); opacity: 0; }
  }
`;

function RosePetals({ accentColor }: { accentColor: string }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 4 + seededRandom(i * 3) * 92,
        bottom: seededRandom(i * 7) * 80,
        delay: seededRandom(i * 11) * 10,
        duration: 6 + seededRandom(i * 13) * 6,
        size: 5 + seededRandom(i * 17) * 6,
        rise: 60 + seededRandom(i * 19) * 80,
        op: 0.35 + seededRandom(i * 23) * 0.30,
        scaleEnd: 0.3 + seededRandom(i * 29) * 0.4,
        rotate: seededRandom(i * 31) * 360,
      })),
    [],
  );

  return (
    <>
      <style>{RISE_KEYFRAMES}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size * 0.65,
            borderRadius: '50% 50% 50% 0 / 60% 60% 40% 40%',
            backgroundColor: hexToRgba(accentColor, p.op),
            transform: `rotate(${p.rotate}deg)`,
            animationName: 'rise-fade',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
            '--rise': `-${p.rise}px`,
            '--op': p.op,
            '--scale-end': p.scaleEnd,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

function Fireflies({ accentColor }: { accentColor: string }) {
  const flies = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: 4 + seededRandom(i * 3) * 92,
        bottom: seededRandom(i * 7) * 85,
        delay: seededRandom(i * 11) * 8,
        duration: 4 + seededRandom(i * 13) * 5,
        size: 3 + seededRandom(i * 17) * 3,
        rise: 40 + seededRandom(i * 19) * 70,
        op: 0.45 + seededRandom(i * 23) * 0.35,
        scaleEnd: 0.2 + seededRandom(i * 29) * 0.3,
      })),
    [],
  );

  return (
    <>
      <style>{RISE_KEYFRAMES}</style>
      {flies.map((f) => (
        <div
          key={f.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${f.left}%`,
            bottom: `${f.bottom}%`,
            width: f.size,
            height: f.size,
            backgroundColor: hexToRgba(accentColor, f.op),
            boxShadow: `0 0 ${f.size * 3}px ${f.size * 1.5}px ${hexToRgba(accentColor, f.op * 0.5)}`,
            animationName: 'rise-fade',
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
            '--rise': `-${f.rise}px`,
            '--op': f.op,
            '--scale-end': f.scaleEnd,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

function Starlight({ accentColor }: { accentColor: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: 3 + seededRandom(i * 3) * 94,
        bottom: seededRandom(i * 7) * 90,
        delay: seededRandom(i * 11) * 7,
        duration: 3 + seededRandom(i * 13) * 4,
        size: 2 + seededRandom(i * 17) * 3.5,
        rise: 50 + seededRandom(i * 19) * 90,
        op: 0.4 + seededRandom(i * 23) * 0.35,
        scaleEnd: 0.1 + seededRandom(i * 29) * 0.3,
      })),
    [],
  );

  return (
    <>
      <style>{RISE_KEYFRAMES}</style>
      {stars.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: `${s.bottom}%`,
            width: s.size,
            height: s.size,
            backgroundColor: hexToRgba(accentColor, s.op),
            boxShadow: `0 0 ${s.size * 5}px ${s.size * 2}px ${hexToRgba(accentColor, s.op * 0.4)}`,
            animationName: 'rise-fade',
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
            '--rise': `-${s.rise}px`,
            '--op': s.op,
            '--scale-end': s.scaleEnd,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

export function ProfileEffectOverlay({ effect, accentColor }: ProfileEffectOverlayProps) {
  if (effect === 'none') {
    return null;
  }

  const safeColor = /^#[0-9a-fA-F]{6}$/.test(accentColor) ? accentColor : '#fb7185';

  return (
    <div className="pointer-events-none absolute inset-0 z-[10] overflow-hidden">
      {effect === 'rose-petals' ? <RosePetals accentColor={safeColor} /> : null}
      {effect === 'fireflies' ? <Fireflies accentColor={safeColor} /> : null}
      {effect === 'starlight' ? <Starlight accentColor={safeColor} /> : null}
    </div>
  );
}
