import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import type { CSSProperties } from 'react';
import { cn } from '../../../lib/cn';
import type { BuilderItem, BuilderProductItem, ProfileData, ProfileTemplateId, SocialLinks } from '../types';
import { radiusTokenToValue, withAlpha } from '../utils/profileTheme';
import { ProfileEffectOverlay } from './ProfileEffectOverlay';

interface PublicProfileProps {
  profileData: ProfileData;
  mustShowWatermark: boolean;
  mode?: 'preview' | 'public';
  className?: string;
  brandPromoEnabled?: boolean;
  promoOpen?: boolean;
  onPromoOpen?: () => void;
  onPromoClose?: () => void;
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

function ProfileMediaPlaceholder({ profileData, circular = false }: { profileData: ProfileData; circular?: boolean }) {
  return (
    <div
      className={cn('flex h-full w-full items-center justify-center text-center', circular ? 'rounded-full px-4' : 'px-8')}
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
  );
}

function ProfileImageBlock({
  profileData,
  coverImage,
  className,
  circular = false,
}: {
  profileData: ProfileData;
  coverImage: string | null;
  className: string;
  circular?: boolean;
}) {
  return (
    <div className={className}>
      {coverImage ? (
        <img
          src={coverImage}
          alt={profileData.displayName}
          className="h-full w-full object-cover"
          style={{ objectPosition: `${profileData.coverImagePositionX}% ${profileData.coverImagePositionY}%` }}
        />
      ) : (
        <ProfileMediaPlaceholder profileData={profileData} circular={circular} />
      )}
    </div>
  );
}

function SocialButtons({
  visibleSocialLinks,
  profileData,
  mode,
  align = 'center',
}: {
  visibleSocialLinks: Array<{ key: keyof SocialLinks; label: string; icon: () => JSX.Element }>;
  profileData: ProfileData;
  mode: 'preview' | 'public';
  align?: 'center' | 'left';
}) {
  if (visibleSocialLinks.length === 0) {
    return null;
  }

  return (
    <div className={cn('mt-7 flex flex-wrap items-center gap-3', align === 'center' ? 'justify-center' : 'justify-start')}>
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
  );
}

function ProfileIdentity({
  profileData,
  align = 'center',
  compact = false,
  visibleSocialLinks,
  mode,
}: {
  profileData: ProfileData;
  align?: 'center' | 'left';
  compact?: boolean;
  visibleSocialLinks: Array<{ key: keyof SocialLinks; label: string; icon: () => JSX.Element }>;
  mode: 'preview' | 'public';
}) {
  return (
    <div className={cn('flex flex-col', align === 'center' ? 'items-center text-center' : 'items-start text-left')}>
      <h1
        className={cn('break-words font-bold tracking-[-0.06em]', compact ? 'mt-0' : 'mt-4')}
        style={{
          color: profileData.nameColor,
          fontSize: profileData.displayNameSize,
          lineHeight: 1.08,
        }}
      >
        {profileData.displayName || 'Tên KOC của bạn'}
      </h1>

      <p
        className={cn('mt-3 whitespace-pre-line', align === 'center' ? 'max-w-[26ch]' : 'max-w-[28ch]')}
        style={{
          color: profileData.bioColor,
          fontSize: profileData.bioSize,
          lineHeight: 1.75,
        }}
      >
        {profileData.bio || 'Hãy mô tả ngắn gọn về bạn, nội dung bạn chia sẻ và sản phẩm bạn review.'}
      </p>

      <SocialButtons visibleSocialLinks={visibleSocialLinks} profileData={profileData} mode={mode} align={align} />
    </div>
  );
}

function ProfileSection({
  profileData,
  visibleItems,
  mode,
  cardStyle,
  align = 'center',
}: {
  profileData: ProfileData;
  visibleItems: BuilderItem[];
  mode: 'preview' | 'public';
  cardStyle: CSSProperties;
  align?: 'center' | 'left';
}) {
  return (
    <section className="mt-8 px-3 pb-4">
      <div className={cn(align === 'center' ? 'text-center' : 'text-left')}>
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
  );
}

function CoverStoryTemplate({ profileData, coverImage, visibleSocialLinks, mode }: { profileData: ProfileData; coverImage: string | null; visibleSocialLinks: Array<{ key: keyof SocialLinks; label: string; icon: () => JSX.Element }>; mode: 'preview' | 'public' }) {
  return (
    <>
      <div className="relative h-[320px] overflow-hidden">
        <ProfileImageBlock profileData={profileData} coverImage={coverImage} className="h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${withAlpha(profileData.backgroundColor, 0)} 10%, ${withAlpha(profileData.backgroundColor, 0.1)} 40%, ${withAlpha(profileData.backgroundColor, 0.75)} 68%, ${withAlpha(profileData.backgroundColor, 0.97)} 88%, ${profileData.backgroundColor} 100%)`,
          }}
        />
      </div>

      <div className="relative -mt-6 px-4">
        <ProfileIdentity profileData={profileData} visibleSocialLinks={visibleSocialLinks} mode={mode} align="center" />
      </div>
    </>
  );
}

function AvatarCircleTemplate({ profileData, coverImage, visibleSocialLinks, mode }: { profileData: ProfileData; coverImage: string | null; visibleSocialLinks: Array<{ key: keyof SocialLinks; label: string; icon: () => JSX.Element }>; mode: 'preview' | 'public' }) {
  return (
    <section className="px-4 pt-8">
      <div
        className="relative overflow-hidden rounded-[2.4rem] border px-5 pb-8 pt-6"
        style={{
          borderColor: profileData.selectedTheme.borderColor,
          backgroundColor: withAlpha(profileData.surfaceColor, 0.94),
          boxShadow: `0 24px 50px ${withAlpha(profileData.accentColor, 0.12)}`,
        }}
      >
        <div className="absolute inset-x-8 top-0 h-24 rounded-b-full blur-3xl" style={{ backgroundColor: withAlpha(profileData.accentColor, 0.18) }} />
        <div className="relative flex flex-col items-center text-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border-[4px] bg-white shadow-[0_18px_36px_rgba(15,23,42,0.14)]" style={{ borderColor: withAlpha(profileData.accentColor, 0.2) }}>
            <ProfileImageBlock profileData={profileData} coverImage={coverImage} className="h-full w-full rounded-full" circular />
          </div>

          <ProfileIdentity profileData={profileData} visibleSocialLinks={visibleSocialLinks} mode={mode} align="center" compact />
        </div>
      </div>
    </section>
  );
}

function EditorialPosterTemplate({ profileData, coverImage, visibleSocialLinks, mode }: { profileData: ProfileData; coverImage: string | null; visibleSocialLinks: Array<{ key: keyof SocialLinks; label: string; icon: () => JSX.Element }>; mode: 'preview' | 'public' }) {
  return (
    <section className="px-4 pt-6">
      <div className="relative rounded-[2.4rem] border p-3" style={{ borderColor: profileData.selectedTheme.borderColor, backgroundColor: withAlpha(profileData.surfaceColor, 0.92), boxShadow: `0 24px 50px ${withAlpha(profileData.accentColor, 0.1)}` }}>
        <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5]">
          <ProfileImageBlock profileData={profileData} coverImage={coverImage} className="h-full w-full" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, transparent 50%, ${withAlpha(profileData.surfaceColor, 0.85)} 85%, ${profileData.surfaceColor} 100%)` }}
          />
        </div>

        <div className="relative mx-2 -mt-12 rounded-[2rem] border px-5 pb-5 pt-4 shadow-[0_20px_40px_rgba(15,23,42,0.12)]" style={{ borderColor: withAlpha(profileData.accentColor, 0.12), backgroundColor: withAlpha(profileData.surfaceColor, 0.96) }}>
          <ProfileIdentity profileData={profileData} visibleSocialLinks={visibleSocialLinks} mode={mode} align="left" compact />
        </div>
      </div>
    </section>
  );
}

type TemplateProps = { profileData: ProfileData; coverImage: string | null; visibleSocialLinks: Array<{ key: keyof SocialLinks; label: string; icon: () => JSX.Element }>; mode: 'preview' | 'public' };

function BannerFloatTemplate({ profileData, coverImage, visibleSocialLinks, mode }: TemplateProps) {
  return (
    <section className="px-3 pt-5">
      <div
        className="relative overflow-hidden rounded-[2.4rem] border"
        style={{ borderColor: profileData.selectedTheme.borderColor, boxShadow: `0 32px 64px ${withAlpha(profileData.accentColor, 0.14)}` }}
      >
        {/* Short banner image */}
        <div className="relative h-[180px] overflow-hidden">
          <ProfileImageBlock profileData={profileData} coverImage={coverImage} className="h-full w-full" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${withAlpha(profileData.surfaceColor, 0)} 20%, ${withAlpha(profileData.surfaceColor, 0.5)} 58%, ${withAlpha(profileData.surfaceColor, 0.96)} 88%, ${profileData.surfaceColor} 100%)` }}
          />
        </div>

        {/* Floating identity card — overlaps banner */}
        <div
          className="relative -mt-10 mx-4 rounded-[2rem] px-5 pb-6 pt-5"
          style={{ backgroundColor: profileData.surfaceColor, border: `1px solid ${withAlpha(profileData.accentColor, 0.1)}`, boxShadow: `0 -8px 32px ${withAlpha(profileData.accentColor, 0.08)}, 0 16px 32px ${withAlpha(profileData.accentColor, 0.06)}` }}
        >
          {/* Accent glow orb */}
          <div className="absolute right-4 top-[-20px] h-16 w-16 rounded-full blur-2xl" style={{ backgroundColor: withAlpha(profileData.accentColor, 0.24) }} />

          <ProfileIdentity profileData={profileData} visibleSocialLinks={visibleSocialLinks} mode={mode} align="center" compact />
        </div>
      </div>
    </section>
  );
}

function CinematicTemplate({ profileData, coverImage, visibleSocialLinks, mode }: TemplateProps) {
  return (
    <section>
      {/* Full portrait image with identity overlaid */}
      <div className="relative" style={{ minHeight: '340px' }}>
        <div className="h-[340px] overflow-hidden">
          <ProfileImageBlock profileData={profileData} coverImage={coverImage} className="h-full w-full" />
        </div>

        {/* Deep cinematic gradient — starts early, fully opaque at bottom */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent 5%, ${withAlpha(profileData.backgroundColor, 0.04)} 28%, ${withAlpha(profileData.backgroundColor, 0.55)} 55%, ${withAlpha(profileData.backgroundColor, 0.92)} 78%, ${profileData.backgroundColor} 92%)` }}
        />

        {/* Identity sitting on image */}
        <div className="absolute bottom-0 inset-x-0 px-5 pb-6">
          <h1
            className="font-bold tracking-[-0.06em] leading-none"
            style={{ color: profileData.nameColor, fontSize: profileData.displayNameSize }}
          >
            {profileData.displayName || 'Tên KOC của bạn'}
          </h1>
          <p className="mt-2 whitespace-pre-line" style={{ color: profileData.bioColor, fontSize: profileData.bioSize, lineHeight: 1.65 }}>
            {profileData.bio || 'Giới thiệu ngắn về bạn.'}
          </p>
          <SocialButtons visibleSocialLinks={visibleSocialLinks} profileData={profileData} mode={mode} align="left" />
        </div>
      </div>
    </section>
  );
}

function RibbonTemplate({ profileData, coverImage, visibleSocialLinks, mode }: TemplateProps) {
  return (
    <section className="px-4 pt-5">
      {/* Decorative ribbon strip */}
      <div
        className="relative mb-5 overflow-hidden rounded-[2rem] px-6 py-5"
        style={{ background: `linear-gradient(135deg, ${profileData.accentColor}, ${withAlpha(profileData.accentColor, 0.6)})`, boxShadow: `0 12px 32px ${withAlpha(profileData.accentColor, 0.28)}` }}
      >
        {/* Geometric accent shapes */}
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30" style={{ backgroundColor: 'white' }} />
        <div className="absolute -bottom-4 left-1/3 h-14 w-14 rounded-full opacity-20" style={{ backgroundColor: 'white' }} />
        <p className="relative text-[10px] font-semibold uppercase tracking-[0.4em] text-white/80">Profile</p>
        <p
          className="relative mt-1 font-bold leading-none tracking-[-0.05em] text-white"
          style={{ fontSize: Math.min(profileData.displayNameSize, 28) }}
        >
          {profileData.displayName || 'Tên của bạn'}
        </p>
      </div>

      {/* Avatar + bio card */}
      <div
        className="overflow-hidden rounded-[2.2rem] border px-5 pb-6 pt-5"
        style={{ borderColor: profileData.selectedTheme.borderColor, backgroundColor: withAlpha(profileData.surfaceColor, 0.95), boxShadow: `0 24px 48px ${withAlpha(profileData.accentColor, 0.08)}` }}
      >
        <div className="flex items-center gap-4">
          <div
            className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-[3px]"
            style={{ borderColor: withAlpha(profileData.accentColor, 0.3), boxShadow: `0 8px 24px ${withAlpha(profileData.accentColor, 0.2)}` }}
          >
            <ProfileImageBlock profileData={profileData} coverImage={coverImage} className="h-full w-full rounded-full" circular />
          </div>
          <div className="min-w-0 flex-1">
            <p className="whitespace-pre-line text-sm leading-6" style={{ color: profileData.bioColor, fontSize: profileData.bioSize * 0.9 }}>
              {profileData.bio || 'Mô tả ngắn về bạn.'}
            </p>
          </div>
        </div>
        <SocialButtons visibleSocialLinks={visibleSocialLinks} profileData={profileData} mode={mode} align="center" />
      </div>
    </section>
  );
}

function BrandPromoModal({ profileData, onClose }: { profileData: ProfileData; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[88%] rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white text-slate-500 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/[0.08]"
          aria-label="Đóng popup quảng bá"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <span
          className="inline-flex rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{
            backgroundColor: withAlpha(profileData.accentColor, 0.12),
            color: profileData.accentColor,
          }}
        >
          Tạo với ItsMe
        </span>
        <h2 className="mt-5 pr-10 text-[1.65rem] font-semibold tracking-[-0.05em] text-slate-900 dark:text-white">Muốn có profile đẹp như thế này?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">Tạo storefront KOC của riêng bạn với giao diện đẹp, link public riêng và bộ chỉnh sửa trực quan bằng ItsMe.</p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition"
            style={{ backgroundColor: profileData.accentColor }}
          >
            Khám phá ItsMe
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
}

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

export function PublicProfile({
  profileData,
  mustShowWatermark,
  mode = 'public',
  className,
  brandPromoEnabled = false,
  promoOpen = false,
  onPromoOpen,
  onPromoClose,
}: PublicProfileProps) {
  const visibleItems = profileData.links.filter((item) => item.enabled);
  const visibleSocialLinks = socialPlatformMeta.filter(({ key }) => profileData.socialLinks[key].trim());
  const coverImage = profileData.coverImage ?? profileData.avatar;
  const activeTemplate: ProfileTemplateId = profileData.profileTemplate ?? 'avatar-circle';
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
      {brandPromoEnabled && mode === 'public' ? (
        <button
          type="button"
          onClick={onPromoOpen}
          className="absolute right-4 top-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 shadow-[0_18px_42px_rgba(15,23,42,0.14)] backdrop-blur transition hover:scale-[1.02] hover:bg-white dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
          style={{
            borderColor: withAlpha(profileData.accentColor, 0.16),
            color: profileData.accentColor,
          }}
          aria-label="Mở quảng bá ItsMe"
          title="Khám phá ItsMe"
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.9} />
        </button>
      ) : null}

      {brandPromoEnabled && promoOpen && mode === 'public' && onPromoClose ? <BrandPromoModal profileData={profileData} onClose={onPromoClose} /> : null}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[48%]" style={{ background: `linear-gradient(180deg, ${withAlpha(profileData.backgroundColor, 0)} 0%, ${profileData.backgroundColor} 100%)` }} />
        <div className="absolute left-[-40px] top-[34%] h-44 w-44 rounded-full blur-3xl" style={{ backgroundColor: withAlpha(profileData.accentColor, 0.14) }} />
        <div className="absolute bottom-10 right-[-48px] h-52 w-52 rounded-full blur-3xl" style={{ backgroundColor: withAlpha(profileData.accentColor, 0.18) }} />
      </div>

      <ProfileEffectOverlay effect={profileData.profileEffect ?? 'none'} accentColor={profileData.accentColor} />

      <div className="relative h-full overflow-y-auto hidden-scrollbar">
        <div className="min-h-full pb-10">
          {activeTemplate === 'avatar-circle' ? (
            <AvatarCircleTemplate profileData={profileData} coverImage={coverImage} visibleSocialLinks={visibleSocialLinks} mode={mode} />
          ) : activeTemplate === 'editorial-poster' ? (
            <EditorialPosterTemplate profileData={profileData} coverImage={coverImage} visibleSocialLinks={visibleSocialLinks} mode={mode} />
          ) : activeTemplate === 'banner-float' ? (
            <BannerFloatTemplate profileData={profileData} coverImage={coverImage} visibleSocialLinks={visibleSocialLinks} mode={mode} />
          ) : activeTemplate === 'cinematic' ? (
            <CinematicTemplate profileData={profileData} coverImage={coverImage} visibleSocialLinks={visibleSocialLinks} mode={mode} />
          ) : activeTemplate === 'ribbon' ? (
            <RibbonTemplate profileData={profileData} coverImage={coverImage} visibleSocialLinks={visibleSocialLinks} mode={mode} />
          ) : (
            <CoverStoryTemplate profileData={profileData} coverImage={coverImage} visibleSocialLinks={visibleSocialLinks} mode={mode} />
          )}

          <ProfileSection profileData={profileData} visibleItems={visibleItems} mode={mode} cardStyle={cardStyle} align={activeTemplate === 'editorial-poster' || activeTemplate === 'cinematic' ? 'left' : 'center'} />

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
