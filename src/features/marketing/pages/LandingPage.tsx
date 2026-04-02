import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Camera,
  Check,
  Globe2,
  LayoutTemplate,
  Mail,
  MessageSquareMore,
  Music4,
  MoonStar,
  Package2,
  Play,
  Sparkles,
  Store,
  SunMedium,
  type LucideIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useAppExperience } from '../../../providers/AppExperienceProvider';

const CREATOR_IMAGE_SRC = '/images/hero-koc.png';
const FALLBACK_CREATOR_IMAGE = 'https://picsum.photos/seed/itsme-koc-hero/900/1200';

const mockLinks = ['Đặt lịch hợp tác', 'Trang Facebook', 'Sản phẩm yêu thích'];

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

const featureItems = [
  {
    icon: LayoutTemplate,
    title: 'Tùy biến giao diện',
    description: 'Điều chỉnh bố cục, màu sắc và nhịp nội dung để profile luôn đúng tinh thần thương hiệu cá nhân của bạn.',
  },
  {
    icon: Store,
    title: 'Quản lý sản phẩm',
    description: 'Ghim sản phẩm nổi bật, gom link bán hàng và dẫn người xem đi đúng hành trình chuyển đổi.',
  },
  {
    icon: BarChart3,
    title: 'Phân tích hiệu quả',
    description: 'Theo dõi lượt chạm, sản phẩm nổi bật và insight cần thiết để tối ưu chiến dịch nhanh hơn.',
  },
];

const pricingPlans = {
  free: ['Trình tạo profile', 'Giao diện cơ bản', 'Khối sản phẩm', 'Watermark ItsMe'],
  pro: ['Toàn bộ tính năng gói Miễn phí', 'Giao diện cao cấp', 'Tùy chỉnh bố cục nâng cao', 'Tắt watermark', 'Hỗ trợ ưu tiên cho creator'],
};

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return <img src={imageSrc} alt={alt} className={className} onError={() => setImageSrc(FALLBACK_CREATOR_IMAGE)} />;
}

function ArrowBadge() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-white/10 dark:text-rose-300">
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
    </span>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      className="relative h-[650px] w-[320px] overflow-hidden rounded-[3rem] border-[14px] border-black bg-white shadow-[0_40px_120px_rgba(15,23,42,0.22)] dark:bg-[#0b0b0b]"
    >
      <div className="absolute left-1/2 top-2 z-30 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />

      <div className="hidden-scrollbar h-full overflow-y-auto">
        <div className="min-h-full bg-[linear-gradient(180deg,#fff7fa_0%,#fffafb_42%,#ffffff_100%)] pt-12 dark:bg-[linear-gradient(180deg,#151515_0%,#111111_35%,#0a0a0a_100%)]">
          <div className="relative h-[290px] overflow-hidden">
            <ImageWithFallback src={CREATOR_IMAGE_SRC} alt="Ảnh bìa creator" className="h-full w-full object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#fff8fa] via-[#fff8fa]/92 to-transparent dark:from-[#151515] dark:via-[#151515]/85 dark:to-transparent" />
          </div>

          <div className="relative -mt-12 px-4 pb-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-lg shadow-rose-100/80 dark:border-[#151515] dark:bg-[#1b1b1b] dark:shadow-black/30">
              <ImageWithFallback src={CREATOR_IMAGE_SRC} alt="Ảnh đại diện creator" className="h-full w-full object-cover object-top" />
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-[2rem] font-bold tracking-[-0.04em] text-gray-900 dark:text-white">Ngianggg</h2>
                <span className="text-lg text-rose-500">♥</span>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-gray-500 dark:text-gray-400">
                Chuyên làm review, unboxing
                <br />
                Những sản phẩm mình review đều nằm ở bên dưới nha
              </p>
            </div>

            <div className="mt-5 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-md shadow-rose-100/70 dark:border-white/10 dark:bg-white/10 dark:text-rose-300 dark:shadow-black/30">
                <MessageSquareMore className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <span className="inline-flex rounded-full border border-rose-100 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-rose-500 dark:border-white/10 dark:bg-white/10 dark:text-rose-200">
                Các bạn hãy tham khảo
              </span>
            </div>

            <h3 className="mt-4 text-center text-[1.85rem] font-bold tracking-[-0.04em] text-gray-900 dark:text-white">
              Sản phẩm yêu thích của mình nhé!
            </h3>

            <div className="mt-6 space-y-4">
              {mockLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  className="flex w-full items-center justify-between rounded-[1.75rem] border border-black/5 bg-white px-5 py-4 text-left shadow-[0_18px_40px_rgba(244,63,94,0.1)] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                >
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">{link}</span>
                  <ArrowBadge />
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              {mockProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 rounded-[1.75rem] border border-black/5 bg-white p-4 shadow-[0_18px_40px_rgba(244,63,94,0.1)] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                >
                  <img src={product.image} alt={product.name} className="h-24 w-24 rounded-[1.25rem] object-cover" />

                  <div className="min-w-0 flex-1 text-left">
                    <p className="line-clamp-2 text-base font-semibold leading-6 text-gray-900 dark:text-white">{product.name}</p>
                  </div>

                  <ArrowBadge />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingShell({
  children,
  className,
  duration,
  delay,
}: {
  children: ReactNode;
  className: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
      className={`absolute z-20 hidden overflow-hidden rounded-[1.75rem] border border-black/5 bg-white/88 p-4 text-left shadow-[0_18px_40px_rgba(244,63,94,0.10)] backdrop-blur-md lg:block dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_18px_40px_rgba(0,0,0,0.28)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.12),transparent_68%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.18),transparent_68%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function FloatingInboxBlock({ className, duration, delay }: { className: string; duration: number; delay: number }) {
  return (
    <FloatingShell className={className} duration={duration} delay={delay}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-white text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-rose-300">
          <Mail className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Hộp Thư Đến</h3>
          <p className="mt-1 text-xs leading-6 text-gray-500 dark:text-gray-400">Xem tin nhắn &amp; yêu cầu từ nhãn hàng.</p>
        </div>
      </div>
    </FloatingShell>
  );
}

function FloatingAnalyticsBlock({ className, duration, delay }: { className: string; duration: number; delay: number }) {
  return (
    <FloatingShell className={className} duration={duration} delay={delay}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-white text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-rose-300">
          <BarChart3 className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Báo Cáo Click</h3>
          <p className="mt-1 text-xs leading-6 text-gray-500 dark:text-gray-400">Theo dõi lượng truy cập và tỷ lệ chuyển đổi.</p>
        </div>
      </div>
    </FloatingShell>
  );
}

function FloatingProductBlock({ className, duration, delay }: { className: string; duration: number; delay: number }) {
  return (
    <FloatingShell className={className} duration={duration} delay={delay}>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] border border-rose-100 bg-white text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-rose-300">
          <Package2 className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-500 dark:text-rose-300">JULIDO</p>
          <h3 className="mt-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">Quần Shorts Unisex</h3>
          <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">150,000đ</p>
        </div>
      </div>
    </FloatingShell>
  );
}

function FloatingSocialBlock({ className, duration, delay }: { className: string; duration: number; delay: number }) {
  return (
    <FloatingShell className={className} duration={duration} delay={delay}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-white text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-rose-300">
          <Globe2 className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Kết Nối MXH</h3>
          <p className="mt-1 text-xs leading-6 text-gray-500 dark:text-gray-400">Gắn link TikTok, Youtube, Instagram...</p>
          <div className="mt-3 flex items-center gap-2 text-rose-500 dark:text-rose-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 dark:bg-white/10">
              <Music4 className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 dark:bg-white/10">
              <Play className="h-4 w-4" strokeWidth={1.8} />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 dark:bg-white/10">
              <Camera className="h-4 w-4" strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </div>
    </FloatingShell>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-rose-300">
        {eyebrow}
      </span>
      <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="mt-4 text-base leading-8 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white p-7 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-white/10 dark:text-rose-300">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  highlighted = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return highlighted ? (
    <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(244,63,94,0.95),rgba(251,113,133,0.45),rgba(255,255,255,0.15))] p-[1px] shadow-[0_28px_80px_rgba(244,63,94,0.22)]">
      <div className="rounded-[calc(2rem-1px)] bg-white p-8 backdrop-blur-sm dark:bg-[#111111]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-rose-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">Phổ biến</span>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-gray-100">{title}</h3>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-[-0.05em] text-gray-900 dark:text-gray-100">{price}</span>
              <span className="pb-1 text-sm text-gray-600 dark:text-gray-400">VND / tháng</span>
            </div>
          </div>
          <Sparkles className="h-6 w-6 text-rose-400" strokeWidth={1.8} />
        </div>

        <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">{description}</p>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {features.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
              <Check className="h-4 w-4 text-rose-500" strokeWidth={2} />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item}</span>
            </div>
          ))}
        </div>

        <a href="/login" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
          {cta}
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </a>
      </div>
    </div>
  ) : (
    <div className="rounded-[2rem] border border-black/5 bg-white p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-700 dark:bg-white/10 dark:text-gray-200">{title}</span>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-gray-100">{price}</h3>
        </div>
        <Sparkles className="h-6 w-6 text-rose-500 dark:text-rose-300" strokeWidth={1.8} />
      </div>

      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{description}</p>

      <div className="mt-8 grid gap-3">
        {features.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
            <Check className="h-4 w-4 text-rose-500" strokeWidth={2} />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item}</span>
          </div>
        ))}
      </div>

      <a
        href="/login"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
      >
        {cta}
        <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
      </a>
    </div>
  );
}

export function LandingPage() {
  const { mode, toggleMode } = useAppExperience();
  const isDark = mode === 'dark';

  return (
    <main className="min-h-screen transition-colors duration-300 bg-[#fafafa] text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 pt-6 flex items-center justify-between gap-4">
        <a href="/" className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100">
          ItsMe
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMode}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100"
          >
            {isDark ? <SunMedium className="h-4 w-4" strokeWidth={1.8} /> : <MoonStar className="h-4 w-4" strokeWidth={1.8} />}
            {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
          </button>

          <a href="/login" className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100">
            Đăng nhập
          </a>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left space-y-6">
          <span className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-rose-300">
            Bộ công cụ tăng trưởng creator
          </span>

          <h1 className="max-w-xl text-5xl font-bold tracking-[-0.06em] text-gray-900 dark:text-gray-100 md:text-7xl">
            Tối ưu hóa hành trình KOC của bạn
          </h1>

          <p className="max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
            Xây dựng profile, gắn link sản phẩm và chuyển đổi người theo dõi thành khách hàng chỉ với vài cú click.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/login" className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
              Bắt đầu miễn phí
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Xem bảng giá
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full h-[700px]">
          <div className="pointer-events-none absolute h-[460px] w-[460px] rounded-full bg-black/5 blur-3xl dark:bg-white/5" />

          <FloatingInboxBlock className="top-20 -left-24 w-64" duration={4.2} delay={0.2} />
          <FloatingAnalyticsBlock className="top-24 -right-24 w-64" duration={5} delay={0.5} />
          <FloatingProductBlock className="bottom-36 -left-32 w-72" duration={4.8} delay={0.35} />
          <FloatingSocialBlock className="bottom-24 -right-32 w-72" duration={5.5} delay={0.75} />

          <PhoneMockup />
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-4 pb-24">
        <SectionHeading
          eyebrow="Tính năng"
          title="Công cụ mạnh mẽ, thao tác đơn giản"
          description="Từ landing page đến trình dựng profile, mọi điểm chạm đều được giữ cùng một ngôn ngữ thiết kế để creator thao tác nhanh mà vẫn chuyên nghiệp."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featureItems.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-4 pb-24">
        <SectionHeading
          eyebrow="Bảng giá"
          title="Chọn gói phù hợp với tốc độ phát triển của bạn"
          description="Bắt đầu với những gì cần thiết để lên profile nhanh, sau đó nâng cấp khi bạn cần nhiều quyền kiểm soát hơn và hình ảnh chuyên nghiệp hơn."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PricingCard
            title="Miễn phí"
            price="0 VND"
            description="Phù hợp cho creator muốn bắt đầu nhanh với một profile gọn gàng, dễ dùng và đủ để dẫn traffic đến sản phẩm của mình."
            features={pricingPlans.free}
            cta="Bắt đầu với gói Miễn phí"
          />

          <PricingCard
            title="Pro"
            price="150,000"
            description="Dành cho creator muốn có nhiều quyền tùy biến hơn, hình ảnh cao cấp hơn và đầu ra profile chỉn chu hơn để làm việc với nhãn hàng."
            features={pricingPlans.pro}
            cta="Nâng cấp lên Pro"
            highlighted
          />
        </div>
      </section>
    </main>
  );
}
