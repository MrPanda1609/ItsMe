export type BuilderBlockType = 'link' | 'product';
export type UserPlan = 'free' | 'pro' | 'admin';
export type ProfileTemplateId = 'cover-story' | 'avatar-circle' | 'editorial-poster' | 'banner-float' | 'cinematic' | 'ribbon';
export type ProfileEffectId = 'none' | 'rose-petals' | 'fireflies' | 'starlight';

export interface ThemePreset {
  id: string;
  name: string;
  isPro: boolean;
  background: string;
  backgroundColor: string;
  surface: string;
  surfaceColor: string;
  borderColor: string;
  textColor: string;
  mutedTextColor: string;
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

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
  zalo: string;
}

export interface ProfileData {
  avatar: string | null;
  coverImage: string | null;
  coverImagePositionX: number;
  coverImagePositionY: number;
  profileTemplate: ProfileTemplateId;
  socialLinks: SocialLinks;
  displayName: string;
  bio: string;
  sectionBadge: string;
  sectionTitle: string;
  backgroundColor: string;
  surfaceColor: string;
  accentColor: string;
  sectionBadgeColor: string;
  nameColor: string;
  bioColor: string;
  sectionTitleColor: string;
  cardTitleColor: string;
  mutedTextColor: string;
  sectionBadgeSize: number;
  displayNameSize: number;
  bioSize: number;
  sectionTitleSize: number;
  cardTitleSize: number;
  links: BuilderItem[];
  selectedTheme: ThemePreset;
  selectedFont: FontPreset;
  cardStyle: CardStyleOption;
  shapeStyle: ShapeStyleOption;
  profileEffect: ProfileEffectId;
  brandPromoEnabled: boolean;
  watermarkEnabled: boolean;
}

export interface UserStatus {
  isPro: boolean;
  isAdmin: boolean;
}
