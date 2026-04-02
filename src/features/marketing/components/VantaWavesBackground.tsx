import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppExperience } from '../../../providers/AppExperienceProvider';

interface VantaEffect {
  destroy: () => void;
}

export function VantaWavesBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useAppExperience();

  useEffect(() => {
    let effect: VantaEffect | null = null;
    let cancelled = false;

    const init = async () => {
      const { default: WAVES } = await import('vanta/dist/vanta.waves.min');

      if (cancelled || !containerRef.current) {
        return;
      }

      effect = WAVES({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        shininess: mode === 'dark' ? 22 : 12,
        waveHeight: mode === 'dark' ? 14 : 8,
        waveSpeed: mode === 'dark' ? 0.42 : 0.28,
        zoom: 0.95,
        color: mode === 'dark' ? 0xf43f5e : 0xfb7185,
        backgroundColor: mode === 'dark' ? 0x0a0a0a : 0xfafafa,
      });
    };

    init();

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [mode]);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
