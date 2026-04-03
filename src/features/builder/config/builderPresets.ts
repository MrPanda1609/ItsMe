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
    id: 'lavender-mist',
    name: 'Sương tím',
    isPro: true,
    background: 'linear-gradient(180deg, #ede9fe 0%, #ddd6fe 48%, #f5f3ff 100%)',
    backgroundColor: '#ede9fe',
    surface: 'rgba(245, 243, 255, 0.92)',
    surfaceColor: '#f5f3ff',
    borderColor: 'rgba(139, 92, 246, 0.18)',
    textColor: '#1e1548',
    mutedTextColor: '#6d5b98',
    accentColor: '#8b5cf6',
  },
  {
    id: 'sage-garden',
    name: 'Vườn xanh',
    isPro: true,
    background: 'linear-gradient(180deg, #d1fae5 0%, #a7f3d0 50%, #ecfdf5 100%)',
    backgroundColor: '#d1fae5',
    surface: 'rgba(236, 253, 245, 0.92)',
    surfaceColor: '#ecfdf5',
    borderColor: 'rgba(16, 185, 129, 0.18)',
    textColor: '#022c22',
    mutedTextColor: '#3d7a5e',
    accentColor: '#10b981',
  },
  {
    id: 'peach-sunset',
    name: 'Chiều đào',
    isPro: true,
    background: 'linear-gradient(180deg, #fed7aa 0%, #fdba74 50%, #fff7ed 100%)',
    backgroundColor: '#fed7aa',
    surface: 'rgba(255, 247, 237, 0.94)',
    surfaceColor: '#fff7ed',
    borderColor: 'rgba(251, 146, 60, 0.2)',
    textColor: '#431407',
    mutedTextColor: '#9a5b2e',
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
    id: 'cherry-noir',
    name: 'Cherry noir',
    isPro: true,
    background: 'linear-gradient(180deg, #1a0a10 0%, #2d0f1a 50%, #1a0a10 100%)',
    backgroundColor: '#1a0a10',
    surface: 'rgba(45, 15, 26, 0.94)',
    surfaceColor: '#2d0f1a',
    borderColor: 'rgba(244, 63, 94, 0.16)',
    textColor: '#fce7f3',
    mutedTextColor: '#d4829d',
    accentColor: '#f43f5e',
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
