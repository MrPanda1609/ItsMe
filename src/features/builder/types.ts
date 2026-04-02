export type BuilderBlockType = 'link' | 'product';

export interface ThemePreset {
  id: string;
  name: string;
  isPro: boolean;
  background: string;
  surface: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
}

export interface CardStyleOption {
  id: string;
  name: string;
  isPro: boolean;
  borderWidth: number;
  blur: string;
  glassOpacity: number;
  shadow: string;
}

export interface FontPreset {
  id: string;
  name: string;
  isPro: boolean;
  family: string;
}

export type RadiusToken = 'none' | 'lg' | '2xl' | 'full';

export interface ShapeStyleOption {
  id: string;
  name: string;
  isPro: boolean;
  avatarRadius: RadiusToken;
  cardRadius: RadiusToken;
  outlineWidth: number;
  glow: boolean;
}

export interface BaseBuilderItem {
  id: string;
  type: BuilderBlockType;
  title: string;
  url: string;
  enabled: boolean;
}

export interface BuilderLinkItem extends BaseBuilderItem {
  type: 'link';
  thumbnail: string | null;
}

export interface BuilderProductItem extends BaseBuilderItem {
  type: 'product';
  vendor: string;
  code: string;
  image: string | null;
}

export type BuilderItem = BuilderLinkItem | BuilderProductItem;

export interface ProfileData {
  avatar: string | null;
  displayName: string;
  bio: string;
  links: BuilderItem[];
  selectedTheme: ThemePreset;
  selectedFont: FontPreset;
  cardStyle: CardStyleOption;
  shapeStyle: ShapeStyleOption;
  watermarkEnabled: boolean;
}

export interface UserStatus {
  isPro: boolean;
  isAdmin: boolean;
}
