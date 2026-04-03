import { motion } from 'framer-motion';
import { type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  LayoutTemplate,
  MoonStar,
  Sparkles,
  Store,
  SunMedium,
  type LucideIcon,
} from 'lucide-react';
import { SampleProfile } from '../components/SampleProfile';
import { useAppExperience } from '../../../providers/AppExperienceProvider';

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
  free: ['Trình tạo profile cơ bản', 'Chỉnh màu nền, thẻ và màu nhấn', 'Tối đa 3 sản phẩm', 'Watermark ItsMe'],
  pro: ['Toàn bộ tính năng gói Miễn phí', 'Mở khóa toàn bộ bảng màu', 'Thêm sản phẩm không giới hạn', 'Tắt watermark', 'Sử dụng nhiều theme mới và độc đáo nhất', 'Ưu tiên sử dụng tính năng mới'],
};

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
      <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-gray-900 dark:text-gray-100 md:mt-6 md:text-4xl">{title}</h2>
      <p className="mt-4 text-[15px] leading-7 text-gray-600 dark:text-gray-400 md:text-base md:leading-8">{description}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="rounded-[1.7rem] border border-black/5 bg-white p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] md:rounded-[2rem] md:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-white/10 dark:text-rose-300">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-gray-900 dark:text-gray-100 md:mt-6">{title}</h3>
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
  onCtaClick,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  onCtaClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  return highlighted ? (
    <div className="rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(244,63,94,0.95),rgba(251,113,133,0.45),rgba(255,255,255,0.15))] p-[1px] shadow-[0_28px_80px_rgba(244,63,94,0.22)] md:rounded-[2rem]">
      <div className="rounded-[calc(1.7rem-1px)] bg-white p-6 backdrop-blur-sm dark:bg-[#111111] md:rounded-[calc(2rem-1px)] md:p-8">
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

        <div className="mt-7 grid gap-3 md:mt-8 md:grid-cols-2">
          {features.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
              <Check className="h-4 w-4 text-rose-500" strokeWidth={2} />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item}</span>
            </div>
          ))}
        </div>

        <a href="/login" onClick={onCtaClick} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 sm:w-auto">
          {cta}
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </a>
      </div>
    </div>
  ) : (
    <div className="rounded-[1.7rem] border border-black/5 bg-white p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] md:rounded-[2rem] md:p-8">
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
        onClick={onCtaClick}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08] sm:w-auto"
      >
        {cta}
        <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
      </a>
    </div>
  );
}

function DesktopOnlyNotice({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-sm rounded-[2rem] border border-black/5 bg-white p-6 text-center shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111]"
      >
        <span className="inline-flex rounded-full bg-rose-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-500 dark:bg-white/10 dark:text-rose-300">
          Chỉ hỗ trợ desktop
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-gray-100">Hãy dùng trên máy tính</h3>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
          Builder hiện chỉ dùng tốt trên bản desktop máy tính. Vui lòng mở lại bằng laptop hoặc PC để đăng nhập và chỉnh sửa profile.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
        >
          Đã hiểu
        </button>
      </motion.div>
    </div>
  );
}

export function LandingPage() {
  const { mode, toggleMode } = useAppExperience();
  const isDark = mode === 'dark';
  const [showDesktopOnlyNotice, setShowDesktopOnlyNotice] = useState(false);
  const phoneDragRef = useRef<{ pointerId: number; startY: number; startScrollTop: number; moved: boolean } | null>(null);
  const suppressPhoneClickRef = useRef(false);

  const handleLoginClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
      event.preventDefault();
      setShowDesktopOnlyNotice(true);
    }
  };

  const handlePhonePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;

    suppressPhoneClickRef.current = false;
    phoneDragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: event.currentTarget.scrollTop,
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePhonePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = phoneDragRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaY = event.clientY - dragState.startY;
    if (!dragState.moved && Math.abs(deltaY) > 4) {
      dragState.moved = true;
      suppressPhoneClickRef.current = true;
    }

    if (!dragState.moved) return;

    event.preventDefault();
    event.currentTarget.scrollTop = dragState.startScrollTop - deltaY;
  };

  const clearPhoneDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = phoneDragRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    phoneDragRef.current = null;
    window.setTimeout(() => {
      suppressPhoneClickRef.current = false;
    }, 0);
  };

  const handlePhoneClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressPhoneClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <main className="min-h-screen transition-colors duration-300 bg-[#fafafa] text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100">
      {showDesktopOnlyNotice ? <DesktopOnlyNotice onClose={() => setShowDesktopOnlyNotice(false)} /> : null}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-4 md:pt-6">
        <a href="/" className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100">
          ItsMe
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMode}
            aria-label={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
            title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100 md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2 md:text-[11px] md:font-semibold md:uppercase md:tracking-[0.24em]"
          >
            {isDark ? <SunMedium className="h-4 w-4" strokeWidth={1.8} /> : <MoonStar className="h-4 w-4" strokeWidth={1.8} />}
            <span className="hidden md:inline">{isDark ? 'Chế độ sáng' : 'Chế độ tối'}</span>
          </button>

          <a href="/login" onClick={handleLoginClick} className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100">
            Đăng nhập
          </a>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-14 sm:pt-20 lg:grid-cols-2 lg:gap-12 lg:pt-28 lg:pb-20">
        <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
          <span className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-rose-300">
            Bộ công cụ tăng trưởng creator
          </span>

          <h1 className="max-w-[12ch] text-[2.7rem] font-bold tracking-[-0.06em] text-gray-900 dark:text-gray-100 sm:max-w-xl sm:text-5xl md:text-6xl lg:text-7xl">
            Mọi thứ bạn cần để xây dựng hồ sơ KOC
          </h1>

          <p className="max-w-xl text-[15px] leading-7 text-gray-600 dark:text-gray-400 md:text-lg md:leading-8">
            Xây dựng hồ sơ creator chuyên nghiệp, trưng bày sản phẩm, nhận yêu cầu booking và biến mỗi lượt ghé thăm thành doanh thu affiliate có thể đo lường.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <a href="/login" onClick={handleLoginClick} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 sm:w-auto">
              Bắt đầu miễn phí
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a
              href="mailto:hello@itsme.vn?subject=Dat%20lich%20demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] sm:w-auto"
            >
              Đặt lịch demo
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="relative flex h-[540px] w-full items-center justify-center sm:h-[640px] lg:h-[760px] lg:justify-end">
          <div className="relative z-10 h-[540px] w-[270px] sm:h-[620px] sm:w-[310px] lg:h-[680px] lg:w-[340px]">
            <div className="absolute inset-8 rounded-full bg-rose-500/10 blur-[70px] transition-colors duration-500 dark:bg-rose-500/14" />

            <div className="relative z-10 h-full w-full overflow-hidden rounded-[3rem] border-[14px] border-[#10172d] bg-white shadow-2xl ring-1 ring-gray-900/5 transition-colors duration-300 dark:border-[#2a2a2a] dark:bg-black dark:ring-white/10">
              <div className="absolute top-0 left-1/2 z-50 h-[28px] w-[120px] -translate-x-1/2 rounded-b-3xl bg-[#10172d] shadow-sm transition-colors duration-300 dark:bg-[#111]" />
              <div
                className="h-full w-full overflow-y-auto hidden-scrollbar pointer-events-auto touch-pan-y select-none md:cursor-grab md:active:cursor-grabbing"
                onPointerDown={handlePhonePointerDown}
                onPointerMove={handlePhonePointerMove}
                onPointerUp={clearPhoneDrag}
                onPointerCancel={clearPhoneDrag}
                onClickCapture={handlePhoneClickCapture}
                onDragStart={(event) => event.preventDefault()}
              >
                <SampleProfile mode={isDark ? 'dark' : 'light'} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 pb-16 md:pb-24">
        <SectionHeading
          eyebrow="Tính năng"
          title="Công cụ mạnh mẽ, thao tác đơn giản"
          description="Từ landing page đến trình dựng profile, mọi điểm chạm đều được giữ cùng một ngôn ngữ thiết kế để creator thao tác nhanh mà vẫn chuyên nghiệp."
        />

        <div className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-3 lg:gap-6">
          {featureItems.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Bảng giá"
          title="Chọn gói phù hợp với tốc độ phát triển của bạn"
          description="Bắt đầu với những gì cần thiết để lên profile nhanh, sau đó nâng cấp khi bạn cần nhiều quyền kiểm soát hơn và hình ảnh chuyên nghiệp hơn."
        />

        <div className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-2 lg:gap-6">
          <PricingCard
            title="Miễn phí"
            price="0 VND"
            description="Phù hợp cho creator muốn bắt đầu nhanh với profile gọn gàng, có thể chỉnh các màu cơ bản và trưng bày tối đa 3 sản phẩm đầu tiên."
            features={pricingPlans.free}
            cta="Bắt đầu với gói Miễn phí"
            onCtaClick={handleLoginClick}
          />

          <PricingCard
            title="Pro"
            price="150,000"
            description="Dành cho creator muốn mở toàn bộ quyền tùy biến màu sắc, đăng nhiều sản phẩm hơn và sẵn sàng đón các tính năng cao cấp sẽ bổ sung tiếp theo."
            features={pricingPlans.pro}
            cta="Nâng cấp lên Pro"
            onCtaClick={handleLoginClick}
            highlighted
          />
        </div>
      </section>
    </main>
  );
}
