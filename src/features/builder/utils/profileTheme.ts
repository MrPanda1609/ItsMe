import type { CSSProperties } from 'react';
import type { ProfileData, RadiusToken } from '../types';

type ProfileThemeVars = CSSProperties & {
  '--theme-bg': string;
  '--theme-surface': string;
  '--theme-border': string;
  '--theme-text': string;
  '--theme-accent': string;
  '--theme-accent-soft': string;
  '--theme-accent-strong': string;
  '--theme-font-family': string;
  '--theme-card-radius': string;
  '--theme-avatar-radius': string;
  '--theme-card-blur': string;
  '--theme-card-border': string;
  '--theme-outline-width': string;
  '--theme-card-shadow': string;
};

const radiusMap: Record<RadiusToken, string> = {
  none: '0px',
  lg: '16px',
  '2xl': '28px',
  full: '999px',
};

const hexToRgb = (value: string) => {
  const sanitized = value.replace('#', '').trim();

  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(sanitized)) {
    return null;
  }

  const normalized = sanitized.length === 3 ? sanitized.split('').map((char) => `${char}${char}`).join('') : sanitized;
  const parsed = Number.parseInt(normalized, 16);

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
};

export const withAlpha = (value: string, alpha: number) => {
  const rgb = hexToRgb(value);

  if (!rgb) {
    return `rgba(255, 255, 255, ${alpha})`;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

export const radiusTokenToValue = (token: RadiusToken) => radiusMap[token];

export const buildProfileThemeVars = (profileData: ProfileData): ProfileThemeVars => {
  const accentSoft = withAlpha(profileData.selectedTheme.accentColor, 0.14);
  const accentStrong = withAlpha(profileData.selectedTheme.accentColor, 0.24);
  const glowShadow = profileData.shapeStyle.glow ? `, 0 0 36px ${withAlpha(profileData.selectedTheme.accentColor, 0.18)}` : '';

  return {
    '--theme-bg': profileData.selectedTheme.background,
    '--theme-surface': profileData.selectedTheme.surface,
    '--theme-border': profileData.selectedTheme.borderColor,
    '--theme-text': profileData.selectedTheme.textColor,
    '--theme-accent': profileData.selectedTheme.accentColor,
    '--theme-accent-soft': accentSoft,
    '--theme-accent-strong': accentStrong,
    '--theme-font-family': profileData.selectedFont.family,
    '--theme-card-radius': radiusTokenToValue(profileData.shapeStyle.cardRadius),
    '--theme-avatar-radius': radiusTokenToValue(profileData.shapeStyle.avatarRadius),
    '--theme-card-blur': profileData.cardStyle.blur,
    '--theme-card-border': `${profileData.cardStyle.borderWidth}px`,
    '--theme-outline-width': `${profileData.shapeStyle.outlineWidth}px`,
    '--theme-card-shadow': `${profileData.cardStyle.shadow}${glowShadow}`,
    background: 'var(--theme-bg)',
    color: 'var(--theme-text)',
    fontFamily: 'var(--theme-font-family)',
  };
};

export const buildGlassPanelStyle = (profileData: ProfileData): CSSProperties => ({
  borderRadius: 'var(--theme-card-radius)',
  borderColor: 'var(--theme-border)',
  borderWidth: 'var(--theme-card-border)',
  backgroundColor: 'var(--theme-surface)',
  backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, ${Math.min(profileData.cardStyle.glassOpacity + 0.04, 0.94)}) 0%, var(--theme-surface) 100%)`,
  backdropFilter: `blur(var(--theme-card-blur))`,
  WebkitBackdropFilter: `blur(var(--theme-card-blur))`,
  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.72), var(--theme-card-shadow)`,
});

export const buildAvatarStyle = (profileData: ProfileData): CSSProperties => ({
  borderRadius: 'var(--theme-avatar-radius)',
  borderColor: 'var(--theme-border)',
  borderWidth: 'var(--theme-outline-width)',
  boxShadow: profileData.shapeStyle.glow ? `0 0 28px ${withAlpha(profileData.selectedTheme.accentColor, 0.18)}` : 'none',
});

export const buildBadgeStyle = (profileData: ProfileData): CSSProperties => ({
  borderRadius: '999px',
  borderColor: 'var(--theme-border)',
  borderWidth: '1px',
  backgroundColor: withAlpha(profileData.selectedTheme.accentColor, 0.12),
  color: 'var(--theme-text)',
});

export const toDisplayUrl = (value: string) => value.replace(/^https?:\/\//, '').replace(/\/$/, '');
