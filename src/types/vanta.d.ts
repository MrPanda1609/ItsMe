declare module 'vanta/dist/vanta.waves.min' {
  interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
  }

  const WAVES: (options: Record<string, unknown>) => VantaEffect;

  export default WAVES;
}
