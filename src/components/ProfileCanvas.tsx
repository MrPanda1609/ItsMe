import type { CSSProperties, MouseEvent } from 'react';
import { FONT_STACKS } from '../data';
import type { SiteRecord } from '../types';

type CanvasMode = 'preview' | 'public' | 'device';

interface ProfileCanvasProps {
  site: SiteRecord;
  mode?: CanvasMode;
}

type RgbColor = { r: number; g: number; b: number };

const WHITE: RgbColor = { r: 255, g: 255, b: 255 };
const BLACK: RgbColor = { r: 17, g: 17, b: 17 };

const SOCIAL_LABELS = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
} as const;

function SocialIcon({ platform }: { platform: keyof typeof SOCIAL_LABELS }) {
  switch (platform) {
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.8 3.5c.3 2 1.7 3.7 3.7 4.3v2.4a7.6 7.6 0 0 1-3.7-1v6a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.5a3.4 3.4 0 1 0 2.4 3.2V3.5h2.5Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm4.5 2.7a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.8-.9a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.3 7.2a2.7 2.7 0 0 0-1.9-1.9C16.7 5 12 5 12 5s-4.7 0-6.4.3a2.7 2.7 0 0 0-1.9 1.9C3.4 8.9 3.4 12 3.4 12s0 3.1.3 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.3 6.4.3 6.4.3s4.7 0 6.4-.3a2.7 2.7 0 0 0 1.9-1.9c.3-1.7.3-4.8.3-4.8s0-3.1-.3-4.8ZM10.2 15.8V8.2l5.9 3.8-5.9 3.8Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.8H7.8V14h2.3v7h3.4Z" />
        </svg>
      );
    default:
      return null;
  }
}

function hexToRgb(value: string): RgbColor | null {
  const normalized = value.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function mixColors(from: RgbColor, to: RgbColor, ratio: number): RgbColor {
  return {
    r: Math.round(from.r + (to.r - from.r) * ratio),
    g: Math.round(from.g + (to.g - from.g) * ratio),
    b: Math.round(from.b + (to.b - from.b) * ratio),
  };
}

function rgbToCss(color: RgbColor) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function rgbaCss(color: RgbColor, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function getBrightness(color: RgbColor) {
  return (color.r * 0.299 + color.g * 0.587 + color.b * 0.114) / 255;
}

function getThemeBase(site: SiteRecord) {
  const solid = hexToRgb(site.styles.backgroundSolid) ?? hexToRgb('#FFF8FA') ?? WHITE;
  const accent = hexToRgb(site.styles.badgeColor) ?? solid;
  let candidate = solid;

  if (site.styles.backgroundType === 'gradient') {
    const gradientTo = hexToRgb(site.styles.backgroundGradientTo);
    candidate = gradientTo ? mixColors(solid, gradientTo, 0.5) : solid;
  }

  return getBrightness(candidate) > 0.93 ? accent : candidate;
}

export function getPublicPageStyle(site: SiteRecord): CSSProperties {
  const base = getThemeBase(site);
  const halo = mixColors(base, WHITE, 0.84);
  const wash = mixColors(base, WHITE, 0.94);

  return {
    background: `radial-gradient(circle at top, ${rgbToCss(halo)} 0%, ${rgbToCss(wash)} 34%, #fcfbf8 74%)`,
  };
}

function getBackgroundStyle(site: SiteRecord): CSSProperties {
  const styles = site.styles;
  const base = getThemeBase(site);
  const sectionBg = mixColors(base, WHITE, 0.95);
  const cardBg = mixColors(base, WHITE, 0.985);
  const softAccent = mixColors(base, WHITE, 0.9);
  const borderTone = mixColors(base, BLACK, 0.16);

  const themeVars = {
    ['--profile-section-bg' as any]: rgbToCss(sectionBg),
    ['--profile-card-bg' as any]: rgbToCss(cardBg),
    ['--profile-soft-accent' as any]: rgbToCss(softAccent),
    ['--profile-border' as any]: rgbaCss(borderTone, 0.12),
    ['--profile-border-strong' as any]: rgbaCss(borderTone, 0.2),
  } as CSSProperties;

  if (styles.backgroundType === 'gradient') {
    return {
      ...themeVars,
      background: `linear-gradient(160deg, ${rgbToCss(mixColors(hexToRgb(styles.backgroundGradientFrom) ?? base, WHITE, 0.94))} 0%, ${rgbToCss(mixColors(hexToRgb(styles.backgroundGradientTo) ?? base, WHITE, 0.9))} 100%)`,
    };
  }

  if (styles.backgroundType === 'image' && styles.backgroundImage) {
    return {
      ...themeVars,
      backgroundColor: rgbToCss(sectionBg),
      backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.88)), url("${styles.backgroundImage}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return {
    ...themeVars,
    background: `linear-gradient(180deg, ${rgbToCss(mixColors(base, WHITE, 0.94))} 0%, ${rgbToCss(sectionBg)} 100%)`,
  };
}

export function ProfileCanvas({ site, mode = 'public' }: ProfileCanvasProps) {
  const styles = site.styles;
  const socialEntries = Object.entries(site.profile.social).filter(([, value]) => value);
  const disableLinks = mode !== 'public';

  const onLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disableLinks) event.preventDefault();
  };

  return (
    <article
      className={`profile-canvas profile-canvas--${mode} profile-layout--${styles.layout} ${
        styles.backgroundType === 'image' && styles.backgroundImage ? 'profile-canvas--image' : ''
      }`}
      style={{
        ...getBackgroundStyle(site),
        fontFamily: FONT_STACKS[styles.fontFamily],
      }}
    >
      <header className="profile-canvas__hero">
        {site.profile.avatar ? (
          <img
            className="profile-canvas__hero-image"
            src={site.profile.avatar}
            alt={site.profile.name}
            style={{ objectPosition: site.profile.avatarPosition }}
          />
        ) : (
          <div className="profile-canvas__hero-placeholder" />
        )}
        <div className="profile-canvas__hero-blur" />
        <div className="profile-canvas__hero-fade" />
      </header>

      <section className="profile-canvas__header-copy">
        <h1 className="profile-canvas__name" style={{ color: styles.nameColor, fontSize: styles.nameSize }}>
          {site.profile.name}
        </h1>
        <p className="profile-canvas__bio" style={{ color: styles.bioColor, fontSize: styles.bioSize }}>
          {site.profile.bio}
        </p>
      </section>

      {socialEntries.length > 0 && (
        <nav className="profile-canvas__socials" aria-label="Mạng xã hội của KOC">
          {socialEntries.map(([platform, value]) => (
            <a
              key={platform}
              href={value}
              onClick={onLinkClick}
              target="_blank"
              rel="noreferrer"
              className="profile-canvas__social-link"
              aria-label={SOCIAL_LABELS[platform as keyof typeof SOCIAL_LABELS]}
            >
              <SocialIcon platform={platform as keyof typeof SOCIAL_LABELS} />
            </a>
          ))}
        </nav>
      )}

      <section className="profile-canvas__products">
        <div className="profile-canvas__section-head">
          {site.profile.sectionBadge ? (
            <span
              className="profile-canvas__badge"
              style={{
                color: styles.badgeColor,
                background: styles.badgeBg,
                fontSize: styles.badgeSize,
              }}
            >
              {site.profile.sectionBadge}
            </span>
          ) : null}
          {site.profile.sectionTitle ? (
            <h2 className="profile-canvas__section-title" style={{ color: styles.titleColor, fontSize: styles.titleSize }}>
              {site.profile.sectionTitle}
            </h2>
          ) : null}
        </div>

        <div className="profile-canvas__product-grid">
          {site.products.map((product) => {
            const hasLink = Boolean(product.link.trim());
            const isInteractive = !disableLinks && hasLink;
            const cardContent = (
              <>
                <div className="profile-product-card__media">
                  {product.tag ? <span className="profile-product-card__tag">{product.tag}</span> : null}
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="profile-product-card__image" />
                  ) : (
                    <div className="profile-product-card__placeholder" />
                  )}
                </div>

                <div className="profile-product-card__body">
                  <h3>{product.name}</h3>
                  {product.note ? <p>{product.note}</p> : null}
                </div>

                <div className="profile-product-card__arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 16 16 8" />
                    <path d="M9 8h7v7" />
                  </svg>
                </div>
              </>
            );

            if (isInteractive) {
              return (
                <a
                  key={product.id}
                  href={product.link}
                  onClick={onLinkClick}
                  target="_blank"
                  rel="noreferrer"
                  className="profile-product-card profile-product-card--interactive"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={product.id}
                className={`profile-product-card ${hasLink ? 'profile-product-card--static' : 'profile-product-card--disabled'}`}
                aria-disabled={!hasLink}
              >
                {cardContent}
              </div>
            );
          })}

          {site.products.length === 0 ? (
            <div className="profile-canvas__empty">Trang này chưa có sản phẩm nào được giới thiệu.</div>
          ) : null}
        </div>
      </section>

      {!site.removeBranding && (
        <footer className="profile-canvas__branding">
          <span>Được tạo với Itsme</span>
        </footer>
      )}
    </article>
  );
}
