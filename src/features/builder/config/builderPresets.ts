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
    id: 'hong-phan',
    name: 'Hồng phấn',
    isPro: false,
    background: 'linear-gradient(180deg, #fff7fb 0%, #ffe9f2 42%, #ffffff 100%)',
    backgroundColor: '#fffafb',
    surface: 'rgba(255, 255, 255, 0.88)',
    surfaceColor: '#ffffff',
    borderColor: 'rgba(244, 114, 182, 0.16)',
    textColor: '#18213e',
    mutedTextColor: '#6b7280',
    accentColor: '#fb7185',
  },
  {
    id: 'dao-kem',
    name: 'Đào kem',
    isPro: true,
    background: 'linear-gradient(180deg, #fffaf5 0%, #ffe9dc 46%, #ffffff 100%)',
    backgroundColor: '#fff8f2',
    surface: 'rgba(255, 255, 255, 0.9)',
    surfaceColor: '#fffdfb',
    borderColor: 'rgba(251, 146, 60, 0.16)',
    textColor: '#2a1f1a',
    mutedTextColor: '#7c6f67',
    accentColor: '#f97316',
  },
  {
    id: 'dem-nhung',
    name: 'Đêm nhung',
    isPro: true,
    background: 'linear-gradient(180deg, #111318 0%, #0f1117 42%, #111318 100%)',
    backgroundColor: '#111318',
    surface: 'rgba(23, 24, 31, 0.92)',
    surfaceColor: '#181b22',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    textColor: '#f8fafc',
    mutedTextColor: '#cbd5e1',
    accentColor: '#fb7185',
  },
  {
    id: 'dem-dai-duong',
    name: 'Đêm đại dương',
    isPro: true,
    background: 'linear-gradient(180deg, #060d1a 0%, #091525 48%, #060d1a 100%)',
    backgroundColor: '#070e1b',
    surface: 'rgba(10, 20, 40, 0.94)',
    surfaceColor: '#0c1929',
    borderColor: 'rgba(6, 182, 212, 0.14)',
    textColor: '#e2f4fa',
    mutedTextColor: '#7ab8cc',
    accentColor: '#06b6d4',
  },
  {
    id: 'hoang-hon-san-ho',
    name: 'Hoàng hôn san hô',
    isPro: true,
    background: 'linear-gradient(180deg, #fff4ee 0%, #ffe0d0 52%, #fff9f6 100%)',
    backgroundColor: '#fff6f1',
    surface: 'rgba(255, 255, 255, 0.92)',
    surfaceColor: '#fffaf7',
    borderColor: 'rgba(249, 112, 102, 0.14)',
    textColor: '#2d1a14',
    mutedTextColor: '#8a5a4c',
    accentColor: '#f97066',
  },
  {
    id: 'ngoc-nga',
    name: 'Ngọc ngà',
    isPro: true,
    background: 'linear-gradient(180deg, #fffdf5 0%, #fdf4d0 52%, #fffef8 100%)',
    backgroundColor: '#fffef7',
    surface: 'rgba(255, 255, 255, 0.94)',
    surfaceColor: '#fffef4',
    borderColor: 'rgba(202, 138, 4, 0.14)',
    textColor: '#1c1408',
    mutedTextColor: '#78632a',
    accentColor: '#ca8a04',
  },
];

export const CARD_STYLE_PRESETS: CardStyleOption[] = [
  {
    id: 'soft-glass',
    name: 'Thẻ mềm',
    isPro: false,
    borderWidth: 1,
    blur: '8px',
    glassOpacity: 0.86,
    shadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
  },
  {
    id: 'soft-float',
    name: 'Thẻ nổi',
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
    name: 'Jakarta Sans',
    isPro: false,
    family: '"Plus Jakarta Sans", "Segoe UI", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: 'creator-rounded',
    name: 'Bo tròn hiện đại',
    isPro: true,
    family: '"Aptos", "Trebuchet MS", "Segoe UI", sans-serif',
  },
  {
    id: 'modern-display',
    name: 'Display hiện đại',
    isPro: true,
    family: '"Verdana", "Segoe UI", sans-serif',
  },
];

export const SHAPE_STYLE_PRESETS: ShapeStyleOption[] = [
  {
    id: 'rounded-soft',
    name: 'Bo tròn mềm',
    isPro: false,
    avatarRadius: 'full',
    cardRadius: '2xl',
    outlineWidth: 1,
    glow: false,
  },
  {
    id: 'pill-luxe',
    name: 'Viên nang luxe',
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
  title: 'Đặt lịch hợp tác',
  url: 'https://itsme.vn/collab',
  enabled: true,
  thumbnail: null,
});

type ProductTemplate = 'generic' | 'feliz' | 'dress';

const productTemplates: Record<ProductTemplate, Omit<BuilderProductItem, 'id' | 'type' | 'enabled'>> = {
  generic: {
    title: 'Sản phẩm mới',
    url: 'https://itsme.vn/products/san-pham-moi',
    vendor: 'THƯƠNG HIỆU',
    code: 'NEW',
    image: null,
  },
  feliz: {
    title: 'Xe máy điện VinFast Feliz 2025',
    url: 'https://itsme.vn/products/vinfast-feliz-2025',
    vendor: 'VINFAST',
    code: 'FELIZ',
    image: '/product-feliz.svg',
  },
  dress: {
    title: 'Váy ngủ 2 dây cánh tiên',
    url: 'https://itsme.vn/products/vay-ngu-canh-tien',
    vendor: 'LUNA',
    code: 'DRESS',
    image: '/product-dress.svg',
  },
};

export const createDefaultProductItem = (template: ProductTemplate = 'generic'): BuilderProductItem => ({
  id: createId(),
  type: 'product',
  enabled: true,
  ...productTemplates[template],
});

export const createDefaultProfileLinks = () => [createDefaultProductItem('feliz'), createDefaultProductItem('dress')];
