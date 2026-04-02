import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { cn } from '../../../lib/cn';
import type { BuilderItem, BuilderProductItem, ProfileData } from '../types';
import { buildAvatarStyle, buildBadgeStyle, buildGlassPanelStyle, buildProfileThemeVars, toDisplayUrl } from '../utils/profileTheme';

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
      <path d="M5.833 14.167 14.167 5.833M8.333 5.833h5.834v5.834" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccentBullet() {
  return <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--theme-accent)' }} />;
}

function ProfileLinkCard({ item, mode, style }: { item: BuilderItem; mode: 'preview' | 'public'; style: CSSProperties }) {
  return (
    <motion.a
      layout
      href={item.url}
      target={mode === 'public' ? '_blank' : undefined}
      rel={mode === 'public' ? 'noreferrer' : undefined}
      onClick={mode === 'preview' ? (event) => event.preventDefault() : undefined}
      transition={cardTransition}
      className="group relative block overflow-hidden border px-4 py-4 text-slate-900"
      style={style}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)] opacity-70" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gray-200 bg-white shadow-sm" style={{ borderRadius: 'calc(var(--theme-card-radius) - 8px)' }}>
          {item.type === 'link' && item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" style={{ borderRadius: 'calc(var(--theme-card-radius) - 8px)' }} />
          ) : (
            <AccentBullet />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold">{item.title}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{toDisplayUrl(item.url)}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white shadow-sm transition group-hover:translate-x-0.5" style={{ borderRadius: 'calc(var(--theme-card-radius) - 10px)' }}>
          <ArrowIcon />
        </div>
      </div>
    </motion.a>
  );
}

function ProductCard({ item, mode, style, badgeStyle }: { item: BuilderProductItem; mode: 'preview' | 'public'; style: CSSProperties; badgeStyle: CSSProperties }) {
  return (
    <motion.a
      layout
      href={item.url}
      target={mode === 'public' ? '_blank' : undefined}
      rel={mode === 'public' ? 'noreferrer' : undefined}
      onClick={mode === 'preview' ? (event) => event.preventDefault() : undefined}
      transition={cardTransition}
      className="group relative block overflow-hidden border p-4 text-slate-900"
      style={style}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.16),transparent_45%)] opacity-80" />
      <div className="relative flex gap-4">
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden border border-gray-200 bg-white shadow-sm" style={{ borderRadius: 'calc(var(--theme-card-radius) - 6px)' }}>
          {item.image ? (
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-900" style={{ backgroundColor: 'var(--theme-accent-soft)' }}>
              {item.vendor}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em]" style={badgeStyle}>
              {item.vendor}
            </span>
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-600">
              Code {item.code}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-[15px] font-semibold leading-6">{item.title}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="truncate text-xs text-slate-500">{toDisplayUrl(item.url)}</p>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white shadow-sm transition group-hover:translate-x-0.5" style={{ borderRadius: 'calc(var(--theme-card-radius) - 12px)' }}>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function PublicProfile({ profileData, mustShowWatermark, mode = 'public', className }: PublicProfileProps) {
  const visibleItems = profileData.links.filter((item) => item.enabled);
  const themeVars = buildProfileThemeVars(profileData);
  const glassPanelStyle = buildGlassPanelStyle(profileData);
  const avatarStyle = buildAvatarStyle(profileData);
  const badgeStyle = buildBadgeStyle(profileData);
  const avatarFallback = profileData.displayName.trim().slice(0, 1).toUpperCase() || 'K';

  return (
    <div className={cn('relative h-full w-full overflow-hidden text-slate-900', className)} style={themeVars}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-10 h-40 w-40 rounded-full blur-3xl" style={{ backgroundColor: 'var(--theme-accent-soft)' }} />
        <div className="absolute bottom-16 right-[-72px] h-48 w-48 rounded-full blur-3xl" style={{ backgroundColor: 'var(--theme-accent-strong)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_25%)]" />
      </div>

      <div className="relative h-full overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-[430px] flex-col px-4 pb-6 pt-6">
          <motion.header layout transition={cardTransition} className="relative overflow-hidden border px-5 pb-5 pt-6" style={glassPanelStyle}>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent)] opacity-75" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border bg-white text-2xl font-semibold text-slate-900 shadow-sm" style={avatarStyle}>
                {profileData.avatar ? <img src={profileData.avatar} alt={profileData.displayName} className="h-full w-full object-cover" /> : <span>{avatarFallback}</span>}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] opacity-70">TikTok Creator Profile</p>
                <h1 className="mt-2 break-words text-[28px] font-semibold leading-8 tracking-[-0.04em]">{profileData.displayName}</h1>
                <p className="mt-3 text-sm leading-6 opacity-80">{profileData.bio}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em]" style={badgeStyle}>
                {visibleItems.length} live blocks
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-600 shadow-sm">
                {profileData.selectedTheme.name}
              </span>
            </div>
          </motion.header>

          <section className="mt-4 flex-1">
            {visibleItems.length > 0 ? (
              <motion.div layout className="space-y-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleItems.map((item) =>
                    isProductItem(item) ? (
                      <ProductCard key={item.id} item={item} mode={mode} style={glassPanelStyle} badgeStyle={badgeStyle} />
                    ) : (
                      <ProfileLinkCard key={item.id} item={item} mode={mode} style={glassPanelStyle} />
                    ),
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div layout transition={cardTransition} className="relative overflow-hidden border px-5 py-6" style={glassPanelStyle}>
                <p className="text-sm font-semibold">No live blocks yet</p>
                <p className="mt-2 text-sm leading-6 opacity-75">Add a link or product card from the editor to populate this public profile.</p>
              </motion.div>
            )}
          </section>

          {mustShowWatermark ? (
            <footer className="mt-4 flex justify-center pb-2 pt-1">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 shadow-sm">
                Built with ItsMe
              </div>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
}
