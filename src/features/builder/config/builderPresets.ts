import type {
  BuilderLinkItem,
  BuilderProductItem,
  CardStyleOption,
  FontPreset,
  ShapeStyleOption,
  ThemePreset,
} from '../types';

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'soft-blush',
    name: 'Soft Blush',
    isPro: false,
    background: 'linear-gradient(180deg, #fff7fb 0%, #ffe9f2 42%, #ffffff 100%)',
    surface: 'rgba(255, 255, 255, 0.88)',
    borderColor: 'rgba(244, 114, 182, 0.16)',
    textColor: '#111827',
    accentColor: '#fb7185',
  },
  {
    id: 'peach-cream',
    name: 'Peach Cream',
    isPro: true,
    background: 'linear-gradient(180deg, #fffaf5 0%, #ffe9dc 46%, #ffffff 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(251, 146, 60, 0.16)',
    textColor: '#111827',
    accentColor: '#f97316',
  },
  {
    id: 'mono-cream',
    name: 'Mono Cream',
    isPro: true,
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 54%, #eef2f7 100%)',
    surface: 'rgba(255, 255, 255, 0.92)',
    borderColor: 'rgba(15, 23, 42, 0.08)',
    textColor: '#0f172a',
    accentColor: '#111827',
  },
];

export const CARD_STYLE_PRESETS: CardStyleOption[] = [
  {
    id: 'soft-glass',
    name: 'Soft Card',
    isPro: false,
    borderWidth: 1,
    blur: '8px',
    glassOpacity: 0.86,
    shadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
  },
  {
    id: 'soft-float',
    name: 'Soft Float',
    isPro: true,
    borderWidth: 1.5,
    blur: '12px',
    glassOpacity: 0.9,
    shadow: '0 18px 44px rgba(244, 114, 182, 0.14)',
  },
];

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'creator-sans',
    name: 'Creator Sans',
    isPro: false,
    family: '"Plus Jakarta Sans", "Segoe UI", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: 'creator-rounded',
    name: 'Creator Rounded',
    isPro: true,
    family: '"Aptos", "Trebuchet MS", "Segoe UI", sans-serif',
  },
  {
    id: 'modern-display',
    name: 'Modern Display',
    isPro: true,
    family: '"Verdana", "Segoe UI", sans-serif',
  },
];

export const SHAPE_STYLE_PRESETS: ShapeStyleOption[] = [
  {
    id: 'rounded-soft',
    name: 'Rounded Soft',
    isPro: false,
    avatarRadius: 'full',
    cardRadius: '2xl',
    outlineWidth: 1,
    glow: false,
  },
  {
    id: 'pill-luxe',
    name: 'Pill Luxe',
    isPro: true,
    avatarRadius: '2xl',
    cardRadius: 'full',
    outlineWidth: 2,
    glow: true,
  },
];

export const DEFAULT_THEME = THEME_PRESETS[0];
export const DEFAULT_CARD_STYLE = CARD_STYLE_PRESETS[0];
export const DEFAULT_FONT = FONT_PRESETS[0];
export const DEFAULT_SHAPE_STYLE = SHAPE_STYLE_PRESETS[0];

export const createDefaultLinkItem = (): BuilderLinkItem => ({
  id: createId(),
  type: 'link',
  title: 'Book collab now',
  url: 'https://itsme.vn/collab',
  enabled: true,
  thumbnail: null,
});

export const createDefaultProductItem = (): BuilderProductItem => ({
  id: createId(),
  type: 'product',
  title: 'Lip tint spotlight',
  url: 'https://itsme.vn/products/julido-123',
  enabled: true,
  vendor: 'JULIDO',
  code: '123',
  image: null,
});
