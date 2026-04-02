export type Role = 'user' | 'super_admin';
export type Plan = 'free' | 'pro';
export type LayoutKind = 'soft-portrait' | 'framed-showcase' | 'editorial-stack';
export type FontKind = 'plus-jakarta' | 'outfit' | 'manrope' | 'system';
export type BackgroundKind = 'solid' | 'gradient' | 'image';

export interface SocialLinks {
  tiktok: string;
  instagram: string;
  youtube: string;
  facebook: string;
}

export interface SiteStyles {
  layout: LayoutKind;
  fontFamily: FontKind;
  backgroundType: BackgroundKind;
  backgroundSolid: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  backgroundImage: string;
  nameSize: string;
  nameColor: string;
  bioSize: string;
  bioColor: string;
  badgeSize: string;
  badgeColor: string;
  badgeBg: string;
  titleSize: string;
  titleColor: string;
}

export interface SiteProfile {
  name: string;
  bio: string;
  avatar: string;
  avatarPosition: string;
  sectionBadge: string;
  sectionTitle: string;
  social: SocialLinks;
}

export interface SiteProduct {
  id: string;
  name: string;
  image: string;
  link: string;
  tag: string;
  note: string;
}

export interface SiteRecord {
  id: string;
  ownerId: string;
  plan: Plan;
  removeBranding: boolean;
  isPublished: boolean;
  slug: string;
  pageTitle: string;
  updatedAt: string;
  profile: SiteProfile;
  styles: SiteStyles;
  products: SiteProduct[];
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  plan: Plan;
  unlockedAll: boolean;
}

export interface DemoAccount extends UserSession {
  password: string;
}

export interface LoginResult {
  ok: boolean;
  error?: string;
}
