import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { cn } from '../../../lib/cn';
import type { BuilderItem, BuilderProductItem, ProfileData, SocialLinks } from '../types';
import { radiusTokenToValue, withAlpha } from '../utils/profileTheme';

interface PublicProfileProps {
  profileData: ProfileData;
  mustShowWatermark: boolean;
  mode?: 'preview' | 'public';
  className?: string;
}

const cardTransition = { type: 'spring', stiffness: 120, damping: 18 } as const;

const isProductItem = (item: BuilderItem): item is BuilderProductItem => item.type === 'product';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M7.5 5.833 12.5 10l-5 4.167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.4 1.4-1.4h1.5V5.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2h-2.2V14h2.2v7h2.5Z"
      />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TikTokGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M14.5 5c.7 1.9 2 3 4 3.4v2.4a6.5 6.5 0 0 1-3.3-1v4.8a5.2 5.2 0 1 1-5.2-5.1c.3 0 .7 0 1 .1v2.5a2.7 2.7 0 1 0 1.7 2.5V5h1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ZaloGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M6 7.5h12v2l-7.3 7H18V18H6v-2l7.3-7H6V7.5Z" fill="currentColor" />
    </svg>
  );
}

const normalizeExternalUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (/^(https?:\/\/|mailto:|tel:|zalo:)/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const socialPlatformMeta: Array<{
  key: keyof SocialLinks;
  label: string;
  icon: () => JSX.Element;
}> = [
  { key: 'facebook', label: 'Facebook', icon: FacebookGlyph },
  { key: 'instagram', label: 'Instagram', icon: InstagramGlyph },
  { key: 'tiktok', label: 'TikTok', icon: TikTokGlyph },
  { key: 'zalo', label: 'Zalo', icon: ZaloGlyph },
];

function LinkCard({ item, mode, cardStyle, profileData }: { item: BuilderItem; mode: 'preview' | 'public'; cardStyle: CSSProperties; profileData: ProfileData }) {
  return (
    <motion.a
      layout
      href={item.url}
      target={mode === 'public' ? '_blank' : undefined}
      rel={mode === 'public' ? 'noreferrer' : undefined}
      onClick={mode === 'preview' ? (event) => event.preventDefault() : undefined}
      transition={cardTransition}
      className="group flex items-center gap-4 border p-4"
      style={cardStyle}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border"
        style={{
          borderRadius: '18px',
          borderColor: withAlpha(profileData.accentColor, 0.14),
          backgroundColor: item.type === 'link' && item.thumbnail ? 'transparent' : withAlpha(profileData.accentColor, 0.08),
        }}
      >
        {item.type === 'link' && item.thumbnail ? (
          <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: profileData.accentColor }} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="truncate font-semibold"
          style={{
            color: profileData.cardTitleColor,
            fontSize: Math.max(profileData.cardTitleSize - 1, 14),
            lineHeight: 1.45,
          }}
        >
          {item.title}
        </p>
      </div>

      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5"
        style={{
          backgroundColor: withAlpha(profileData.accentColor, 0.1),
          color: profileData.accentColor,
        }}
      >
        <ArrowIcon />
      </span>
    </motion.a>
  );
}

function ProductCard({ item, mode, cardStyle, profileData }: { item: BuilderProductItem; mode: 'preview' | 'public'; cardStyle: CSSProperties; profileData: ProfileData }) {
  return (
    <motion.a
      layout
      href={item.url}
      target={mode === 'public' ? '_blank' : undefined}
      rel={mode === 'public' ? 'noreferrer' : undefined}
      onClick={mode === 'preview' ? (event) => event.preventDefault() : undefined}
      transition={cardTransition}
      className="group flex items-center gap-4 border p-3"
      style={cardStyle}
    >
      <div
        className="overflow-hidden border"
        style={{
          borderRadius: '20px',
          borderColor: withAlpha(profileData.accentColor, 0.1),
          backgroundColor: withAlpha(profileData.accentColor, 0.05),
        }}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className="h-[130px] w-[130px] object-cover" />
        ) : (
          <div
            className="flex h-[130px] w-[130px] items-center justify-center px-4 text-center text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: profileData.accentColor }}
          >
            Ảnh sản phẩm
          </div>
        )}
      </div>

      <div className="min-w-0 flex flex-1 items-center justify-between gap-3 self-stretch">
        <p
          className="line-clamp-2 flex-1 font-semibold"
          style={{
            color: profileData.cardTitleColor,
            fontSize: profileData.cardTitleSize,
            lineHeight: 1.55,
          }}
        >
          {item.title}
        </p>

        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5"
          style={{
            backgroundColor: withAlpha(profileData.accentColor, 0.1),
            color: profileData.accentColor,
          }}
        >
          <ArrowIcon />
        </span>
      </div>
    </motion.a>
  );
}

export function PublicProfile({ profileData, mustShowWatermark, mode = 'public', className }: PublicProfileProps) {
  const visibleItems = profileData.links.filter((item) => item.enabled);
  const visibleSocialLinks = socialPlatformMeta.filter(({ key }) => profileData.socialLinks[key].trim());
  const coverImage = profileData.coverImage ?? profileData.avatar;
  const cardRadius = radiusTokenToValue(profileData.shapeStyle.cardRadius);
  const cardStyle: CSSProperties = {
    borderRadius: cardRadius,
    borderColor: profileData.selectedTheme.borderColor,
    borderWidth: `${profileData.cardStyle.borderWidth}px`,
    backgroundColor: profileData.surfaceColor,
    boxShadow: profileData.cardStyle.shadow,
  };

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={{
        backgroundColor: profileData.backgroundColor,
        color: profileData.nameColor,
        fontFamily: profileData.selectedFont.family,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[48%]" style={{ background: `linear-gradient(180deg, ${withAlpha(profileData.backgroundColor, 0)} 0%, ${profileData.backgroundColor} 100%)` }} />
        <div className="absolute left-[-40px] top-[34%] h-44 w-44 rounded-full blur-3xl" style={{ backgroundColor: withAlpha(profileData.accentColor, 0.14) }} />
        <div className="absolute bottom-10 right-[-48px] h-52 w-52 rounded-full blur-3xl" style={{ backgroundColor: withAlpha(profileData.accentColor, 0.18) }} />
      </div>

      <div className="relative h-full overflow-y-auto hidden-scrollbar">
        <div className="min-h-full pb-10">
          <div className="relative h-[320px] overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt={profileData.displayName}
                className="h-full w-full object-cover"
                style={{ objectPosition: `${profileData.coverImagePositionX}% ${profileData.coverImagePositionY}%` }}
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center px-8 text-center"
                style={{
                  background: `linear-gradient(135deg, ${withAlpha(profileData.accentColor, 0.16)}, ${withAlpha(profileData.backgroundColor, 0.96)})`,
                  color: profileData.mutedTextColor,
                }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em]">Ảnh nổi bật</p>
                  <p className="mt-3 text-sm leading-7">Thêm ảnh cover trong builder để profile công khai nổi bật hơn.</p>
                </div>
              </div>
            )}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${withAlpha(profileData.backgroundColor, 0)} 24%, ${withAlpha(profileData.backgroundColor, 0.16)} 48%, ${withAlpha(profileData.backgroundColor, 0.94)} 82%, ${profileData.backgroundColor} 100%)`,
              }}
            />
            <div
              className="absolute bottom-[-34px] left-1/2 h-28 w-[88%] -translate-x-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: withAlpha(profileData.backgroundColor, 0.96) }}
            />
          </div>

          <div className="relative -mt-6 flex flex-col items-center px-4 text-center">
            <h1
              className="mt-4 break-words font-bold tracking-[-0.06em]"
              style={{
                color: profileData.nameColor,
                fontSize: profileData.displayNameSize,
                lineHeight: 1.08,
              }}
            >
              {profileData.displayName || 'Tên KOC của bạn'}
            </h1>

            <p
              className="mt-3 max-w-[26ch] whitespace-pre-line"
              style={{
                color: profileData.bioColor,
                fontSize: profileData.bioSize,
                lineHeight: 1.75,
              }}
            >
              {profileData.bio || 'Hãy mô tả ngắn gọn về bạn, nội dung bạn chia sẻ và sản phẩm bạn review.'}
            </p>

            {visibleSocialLinks.length > 0 ? (
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                {visibleSocialLinks.map(({ key, label, icon: Icon }) => (
                  <a
                    key={key}
                    href={normalizeExternalUrl(profileData.socialLinks[key])}
                    target={mode === 'public' ? '_blank' : undefined}
                    rel={mode === 'public' ? 'noreferrer' : undefined}
                    onClick={mode === 'preview' ? (event) => event.preventDefault() : undefined}
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border"
                    style={{
                      color: profileData.accentColor,
                      borderColor: withAlpha(profileData.accentColor, 0.16),
                      backgroundColor: profileData.surfaceColor,
                      boxShadow: `0 12px 30px ${withAlpha(profileData.accentColor, 0.18)}`,
                    }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <section className="mt-8 px-3 pb-4">
            <div className="text-center">
              <span
                className="inline-flex rounded-full px-4 py-2 font-semibold uppercase tracking-[0.26em]"
                style={{
                  color: profileData.sectionBadgeColor,
                  backgroundColor: withAlpha(profileData.accentColor, 0.08),
                  boxShadow: `inset 0 0 0 1px ${withAlpha(profileData.accentColor, 0.14)}`,
                  fontSize: profileData.sectionBadgeSize,
                }}
              >
                {profileData.sectionBadge || 'Các bạn hãy tham khảo'}
              </span>

              <h2
                className="mt-5 font-bold tracking-[-0.05em]"
                style={{
                  color: profileData.sectionTitleColor,
                  fontSize: profileData.sectionTitleSize,
                  lineHeight: 1.18,
                }}
              >
                {profileData.sectionTitle || 'Sản phẩm yêu thích của mình nhé!'}
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              {visibleItems.length > 0 ? (
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleItems.map((item) =>
                    isProductItem(item) ? (
                      <ProductCard key={item.id} item={item} mode={mode} cardStyle={cardStyle} profileData={profileData} />
                    ) : (
                      <LinkCard key={item.id} item={item} mode={mode} cardStyle={cardStyle} profileData={profileData} />
                    ),
                  )}
                </AnimatePresence>
              ) : (
                <motion.div layout transition={cardTransition} className="border px-5 py-6 text-left" style={cardStyle}>
                  <p className="text-sm font-semibold" style={{ color: profileData.sectionTitleColor }}>
                    Chưa có khối nội dung nào
                  </p>
                  <p className="mt-2 text-sm leading-6" style={{ color: profileData.mutedTextColor }}>
                    Hãy thêm link hoặc sản phẩm từ panel bên trái để hoàn thiện profile công khai của bạn.
                  </p>
                </motion.div>
              )}
            </div>
          </section>

          {mustShowWatermark ? (
            <footer className="mt-2 flex justify-center pb-2 pt-1">
              <div
                className="inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em]"
                style={{
                  color: profileData.mutedTextColor,
                  borderColor: profileData.selectedTheme.borderColor,
                  backgroundColor: withAlpha(profileData.surfaceColor, 0.92),
                }}
              >
                Tạo với ItsMe
              </div>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
}
