import { motion } from 'framer-motion';
import { ArrowUpRight, MoonStar, SunMedium } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useAppExperience } from '../../../providers/AppExperienceProvider';

const CREATOR_IMAGE_SRC = '/images/hero-koc.png';
const FALLBACK_CREATOR_IMAGE = 'https://picsum.photos/seed/itsme-koc-hero/900/1200';

const mockLinks = ['Booking collab', 'Facebook', 'Sản phẩm yêu thích'];

const mockProducts = [
  {
    name: 'Xe máy điện VinFast Feliz 2025',
    image: 'https://picsum.photos/seed/itsme-product-1/600/600',
  },
  {
    name: 'Váy ngủ 2 dây cánh tiên',
    image: 'https://picsum.photos/seed/itsme-product-2/600/600',
  },
];

const floatingWidgets = [
  {
    title: 'New message',
    body: '3 brands want to collab',
    className: 'left-0 top-16 lg:-left-2',
    duration: 4.2,
    delay: 0.2,
  },
  {
    title: 'Analytics',
    body: '+28% profile taps',
    className: 'right-2 top-10 lg:right-0',
    duration: 5,
    delay: 0.6,
  },
  {
    title: 'Top product',
    body: 'VinFast Feliz 2025',
    className: 'left-3 bottom-28 lg:left-1',
    duration: 4.8,
    delay: 0.4,
  },
  {
    title: 'New order',
    body: '12 clicks in 1 hour',
    className: 'right-0 bottom-24 lg:right-2',
    duration: 5.4,
    delay: 0.8,
  },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-rose-500" aria-hidden="true">
      <path
        d="M10 16.25 8.792 15.149C5.125 11.826 2.75 9.67 2.75 7.042A3.376 3.376 0 0 1 6.167 3.625c1.1 0 2.156.511 2.833 1.312.677-.801 1.733-1.312 2.833-1.312A3.376 3.376 0 0 1 15.25 7.042c0 2.628-2.375 4.784-6.042 8.107L10 16.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M5.833 14.167 14.167 5.833M8.333 5.833h5.834v5.834" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4H16V5.5c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v2.5H9V14h2.3v7h2.2Z" />
    </svg>
  );
}

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return <img src={imageSrc} alt={alt} className={className} onError={() => setImageSrc(FALLBACK_CREATOR_IMAGE)} />;
}

function GlassShell({ children, mode, className = '' }: { children: ReactNode; mode: 'dark' | 'light'; className?: string }) {
  return (
    <div
      className={`${className} rounded-[2rem] border backdrop-blur ${
        mode === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/5 bg-white/70'
      }`}
    >
      {children}
    </div>
  );
}

function HeroButton({ href, label, mode, secondary = false }: { href: string; label: string; mode: 'dark' | 'light'; secondary?: boolean }) {
  const classes = secondary
    ? mode === 'dark'
      ? 'border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]'
      : 'border border-black/5 bg-white/70 text-gray-900 hover:bg-white'
    : mode === 'dark'
      ? 'bg-rose-500 text-white hover:bg-rose-400'
      : 'bg-gray-900 text-white hover:bg-black';

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-3 py-3 text-sm font-semibold transition duration-300 ${classes}`}
    >
      <span className="pl-3">{label}</span>
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${secondary ? (mode === 'dark' ? 'bg-white/10 text-white' : 'bg-gray-900 text-white') : 'bg-white/15 text-white'}`}>
        <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
      </span>
    </a>
  );
}

function FloatingWidget({
  title,
  body,
  className,
  duration,
  delay,
  mode,
}: {
  title: string;
  body: string;
  className: string;
  duration: number;
  delay: number;
  mode: 'dark' | 'light';
}) {
  return (
    <motion.div
      className={`absolute z-20 hidden w-44 p-4 text-left xl:block ${className} ${
        mode === 'dark'
          ? 'rounded-[1.6rem] border border-white/10 bg-white/[0.05] shadow-[0_24px_60px_rgba(0,0,0,0.3)]'
          : 'rounded-[1.6rem] border border-black/5 bg-white/82 shadow-[0_24px_60px_rgba(15,23,42,0.1)]'
      }`}
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${mode === 'dark' ? 'text-rose-300' : 'text-rose-500'}`}>{title}</p>
      <p className={`mt-2 text-sm font-medium ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>{body}</p>
    </motion.div>
  );
}

function PhoneMockup({ mode }: { mode: 'dark' | 'light' }) {
  return (
    <div className="relative w-[320px] h-[650px] mx-auto z-10">
      <div className="absolute inset-0 bg-rose-500/0 dark:bg-rose-500/20 blur-[70px] rounded-[3rem] -z-10 transition-colors duration-500"></div>

      <div className="w-full h-full border-[14px] border-gray-900 dark:border-[#2a2a2a] bg-white dark:bg-black rounded-[3rem] shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 dark:bg-[#111] rounded-b-3xl z-50 shadow-sm border-b border-x border-transparent dark:border-white/5 transition-colors duration-300"></div>

        <div className="w-full h-full overflow-y-auto hidden-scrollbar bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-black">
          <div className="pt-12 pb-10 px-4 flex flex-col items-center">
            <div className="w-full">
              <div className="relative -mx-4 -mt-12 h-[300px] overflow-hidden">
                <ImageWithFallback src={CREATOR_IMAGE_SRC} alt="Creator cover" className="block h-full w-full object-cover object-top" />
                <div className={`absolute inset-0 ${mode === 'dark' ? 'bg-[linear-gradient(180deg,rgba(10,10,10,0.08),rgba(10,10,10,0.12))]' : 'bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.02))]'}`} />
                <div className={`absolute inset-x-0 bottom-0 h-44 ${mode === 'dark' ? 'bg-gradient-to-t from-[#161217] via-[#161217]/88 to-transparent' : 'bg-gradient-to-t from-[#fff8fa] via-[#fff8fa]/92 to-transparent'}`} />
              </div>

              <div className="relative -mt-12 pb-6">
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-lg ${
                    mode === 'dark'
                      ? 'border-[#161217] bg-[#1d191d] shadow-black/40'
                      : 'border-white bg-white shadow-rose-100/70'
                  }`}
                >
                  <ImageWithFallback src={CREATOR_IMAGE_SRC} alt="Creator avatar" className="block h-full w-full object-cover object-top" />
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <h2 className={`text-[2rem] font-bold tracking-[-0.04em] ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Ngianggg</h2>
                  <HeartIcon />
                </div>

                <p className={`mt-3 text-center text-[15px] leading-7 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Chuyên làm review, unboxing
                  <br />
                  Những sp tui review đều ở bên dưới nha
                </p>

                <div className="mt-5 flex justify-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-rose-500 shadow-md ${
                      mode === 'dark'
                        ? 'border-white/10 bg-white/10 shadow-black/30'
                        : 'border-rose-100 bg-white shadow-rose-100/60'
                    }`}
                  >
                    <SocialIcon />
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] ${
                      mode === 'dark'
                        ? 'border border-white/10 bg-white/10 text-rose-200'
                        : 'border border-rose-100 bg-white text-rose-500'
                    }`}
                  >
                    Các bạn hãy tham khảo
                  </span>
                </div>

                <h3 className={`mt-4 text-center text-[2rem] font-bold tracking-[-0.04em] ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sản phẩm yêu thích của mình nhé!
                </h3>

                <div className="mt-6 space-y-4">
                  {mockLinks.map((link) => (
                    <button
                      key={link}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-[1.75rem] px-5 py-4 text-left ${
                        mode === 'dark'
                          ? 'bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.28)]'
                          : 'bg-white shadow-[0_18px_40px_rgba(244,63,94,0.1)]'
                      }`}
                    >
                      <span className={`text-sm font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>{link}</span>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full text-rose-500 ${mode === 'dark' ? 'bg-white/10' : 'bg-rose-50'}`}>
                        <ArrowIcon />
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 space-y-4">
                  {mockProducts.map((product) => (
                    <div
                      key={product.name}
                      className={`flex items-center gap-4 rounded-[1.75rem] p-4 ${
                        mode === 'dark'
                          ? 'bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.28)]'
                          : 'bg-white shadow-[0_18px_40px_rgba(244,63,94,0.1)]'
                      }`}
                    >
                      <img src={product.image} alt={product.name} className="h-24 w-24 rounded-[1.25rem] object-cover" />

                      <div className="min-w-0 flex-1 text-left">
                        <p className={`line-clamp-2 text-base font-semibold leading-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                      </div>

                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-rose-500 ${mode === 'dark' ? 'bg-white/10' : 'bg-rose-50'}`}>
                        <ArrowIcon />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { mode, toggleMode } = useAppExperience();
  const isDark = mode === 'dark';

  return (
    <section className="relative px-4 pb-20 pt-10 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 pb-10">
        <GlassShell mode={mode} className="px-4 py-2">
          <span className={`text-[10px] font-semibold uppercase tracking-[0.34em] ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>ItsMe</span>
        </GlassShell>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMode}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${
              isDark ? 'border border-white/10 bg-white/[0.04] text-gray-100' : 'border border-black/5 bg-white/70 text-gray-900'
            }`}
          >
            {isDark ? <SunMedium className="h-4 w-4" strokeWidth={1.8} /> : <MoonStar className="h-4 w-4" strokeWidth={1.8} />}
            {isDark ? 'Light mode' : 'Dark mode'}
          </button>

          <GlassShell mode={mode} className="px-4 py-2">
            <a href="/login" className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              Sign in
            </a>
          </GlassShell>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="max-w-2xl text-left">
          <span className={`inline-flex rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] ${isDark ? 'border border-white/10 bg-white/[0.04] text-rose-300' : 'border border-black/5 bg-white/70 text-rose-500'}`}>
            Creator growth stack
          </span>

          <h1 className={`mt-8 text-5xl font-bold tracking-[-0.06em] md:text-7xl ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            All you need to power your creator growth
          </h1>

          <p className={`mt-6 max-w-xl text-base leading-8 md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Build your profile, showcase products, and move followers from curiosity to clicks with a cleaner creator storefront.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <HeroButton href="/login" label="Get started free" mode={mode} />
            <HeroButton href="#pricing" label="View pricing" mode={mode} secondary />
          </div>
        </div>

        <div className="relative flex min-h-[780px] items-center justify-center">
          <div className={`pointer-events-none absolute inset-0 m-auto h-[520px] w-[520px] rounded-full blur-3xl ${isDark ? 'bg-rose-500/10' : 'bg-rose-500/8'}`} />

          {floatingWidgets.map((widget) => (
            <FloatingWidget key={widget.title} {...widget} mode={mode} />
          ))}

          <PhoneMockup mode={mode} />
        </div>
      </div>
    </section>
  );
}

export const LandingHero = HeroSection;
