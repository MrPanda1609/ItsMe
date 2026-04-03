import { DEFAULT_CARD_STYLE, DEFAULT_FONT, DEFAULT_SHAPE_STYLE, DEFAULT_THEME } from './builderPresets';
import type { ProfileData, UserPlan, UserStatus } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

export const createDefaultProfileData = (): ProfileData => ({
  avatar: null,
  coverImage: null,
  coverImagePositionX: 50,
  coverImagePositionY: 50,
  profileTemplate: 'cover-story',
  socialLinks: {
    facebook: '',
    instagram: '',
    tiktok: '',
    zalo: '',
  },
  displayName: 'Tên của bạn',
  bio: 'Mô tả ngắn về bạn',
  sectionBadge: 'Dòng giới thiệu',
  sectionTitle: 'Tiêu đề review',
  backgroundColor: DEFAULT_THEME.backgroundColor,
  surfaceColor: DEFAULT_THEME.surfaceColor,
  accentColor: DEFAULT_THEME.accentColor,
  sectionBadgeColor: DEFAULT_THEME.accentColor,
  nameColor: DEFAULT_THEME.textColor,
  bioColor: DEFAULT_THEME.mutedTextColor,
  sectionTitleColor: DEFAULT_THEME.textColor,
  cardTitleColor: DEFAULT_THEME.textColor,
  mutedTextColor: DEFAULT_THEME.mutedTextColor,
  sectionBadgeSize: 10,
  displayNameSize: 32,
  bioSize: 15,
  sectionTitleSize: 28,
  cardTitleSize: 17,
  links: [],
  selectedTheme: DEFAULT_THEME,
  selectedFont: DEFAULT_FONT,
  cardStyle: DEFAULT_CARD_STYLE,
  shapeStyle: DEFAULT_SHAPE_STYLE,
  brandPromoEnabled: true,
  watermarkEnabled: true,
});

export const mergeProfileDataWithDefaults = (candidate: unknown): ProfileData => {
  const fallback = createDefaultProfileData();

  if (!isRecord(candidate)) {
    return fallback;
  }

  return {
    ...fallback,
    ...candidate,
    links: Array.isArray(candidate.links) ? (candidate.links as ProfileData['links']) : fallback.links,
    socialLinks: isRecord(candidate.socialLinks) ? { ...fallback.socialLinks, ...candidate.socialLinks } : fallback.socialLinks,
    selectedTheme: isRecord(candidate.selectedTheme) ? { ...fallback.selectedTheme, ...candidate.selectedTheme } : fallback.selectedTheme,
    selectedFont: isRecord(candidate.selectedFont) ? { ...fallback.selectedFont, ...candidate.selectedFont } : fallback.selectedFont,
    cardStyle: isRecord(candidate.cardStyle) ? { ...fallback.cardStyle, ...candidate.cardStyle } : fallback.cardStyle,
    shapeStyle: isRecord(candidate.shapeStyle) ? { ...fallback.shapeStyle, ...candidate.shapeStyle } : fallback.shapeStyle,
  };
};

export const normalizePlan = (value: unknown): UserPlan => {
  if (value === 'admin' || value === 'pro' || value === 'free') {
    return value;
  }

  return 'free';
};

export const userStatusFromPlan = (plan: UserPlan): UserStatus => ({
  isPro: plan === 'pro' || plan === 'admin',
  isAdmin: plan === 'admin',
});
