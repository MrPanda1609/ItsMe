import { motion } from 'framer-motion';
import { type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, useRef } from 'react';
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
  free: ['Trình tạo profile', 'Giao diện cơ bản', 'Khối sản phẩm', 'Watermark ItsMe'],
  pro: ['Toàn bộ tính năng gói Miễn phí', 'Giao diện cao cấp', 'Tùy chỉnh bố cục nâng cao', 'Tắt watermark', 'Hỗ trợ ưu tiên cho creator'],
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
  const phoneDragRef = useRef<{ pointerId: number; startY: number; startScrollTop: number; moved: boolean } | null>(null);
  const suppressPhoneClickRef = useRef(false);

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
            Creator growth stack
          </span>

          <h1 className="max-w-xl text-5xl font-bold tracking-[-0.06em] text-gray-900 dark:text-gray-100 md:text-7xl">
            All you need to build your KOC Profile
          </h1>

          <p className="max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
            Build a premium creator storefront, showcase products, collect booking requests, and turn every profile visit into measurable affiliate revenue.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/login" className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
              Get started free
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a
              href="mailto:hello@itsme.vn?subject=Book%20a%20demo"
              className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>

        <div className="relative flex h-[760px] w-full items-center justify-center lg:justify-end">
          <div className="relative z-10 h-[680px] w-[340px]">
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
