import { ChevronRight } from 'lucide-react';

interface SampleProfileProps {
  mode: 'light' | 'dark';
}

const favoriteProducts = [
  { name: 'Xe máy điện VinFast Feliz 2025', image: '/product-feliz.svg' },
  { name: 'Váy ngủ 2 dây cánh tiên', image: '/product-dress.svg' },
];

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

function ProductCard({ title, image, dark }: { title: string; image: string; dark: boolean }) {
  return (
    <a
      href="#"
      className={`group flex items-center gap-4 rounded-[1.75rem] border p-3 transition duration-300 ${
        dark
          ? 'border-white/8 bg-white/[0.05] hover:bg-white/[0.08]'
          : 'border-rose-100 bg-white shadow-[0_18px_42px_rgba(244,63,94,0.1)] hover:shadow-[0_24px_52px_rgba(244,63,94,0.16)]'
      }`}
    >
      <div className={`overflow-hidden rounded-[1.25rem] ${dark ? 'border border-white/10 bg-white/5' : 'border border-rose-50 bg-[#fff7fa]'}`}>
        <img src={image} alt={title} className="h-[130px] w-[130px] object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className={`text-[1.08rem] font-semibold leading-7 ${dark ? 'text-white' : 'text-[#15213d]'}`}>{title}</h3>
      </div>

      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5 ${
          dark ? 'bg-white/10 text-rose-300' : 'bg-rose-50 text-rose-400'
        }`}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </a>
  );
}

export function SampleProfile({ mode }: SampleProfileProps) {
  const isDark = mode === 'dark';

  return (
    <div
      className={`w-full min-h-full pb-12 transition-colors duration-300 ${
        isDark ? 'bg-[linear-gradient(180deg,#111318_0%,#0f1117_34%,#111318_100%)] text-white' : 'bg-[linear-gradient(180deg,#fff7fa_0%,#fffafb_44%,#ffffff_100%)] text-[#1f2747]'
      }`}
    >
      <div className="relative h-[320px] w-full shrink-0 overflow-hidden">
        <img src="/home.png" alt="Ngiangg KOC" className="h-full w-full object-cover object-top" />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[linear-gradient(180deg,rgba(15,17,23,0)_22%,rgba(15,17,23,0.2)_48%,rgba(15,17,23,0.76)_78%,#111318_100%)]'
              : 'bg-[linear-gradient(180deg,rgba(255,247,250,0)_26%,rgba(255,247,250,0.18)_48%,rgba(255,250,251,0.92)_78%,#fffafb_100%)]'
          }`}
        />
        <div className={`absolute bottom-[-34px] left-1/2 h-28 w-[88%] -translate-x-1/2 rounded-full blur-3xl ${isDark ? 'bg-[#111318]/90' : 'bg-white/95'}`} />
      </div>

      <div className="relative -mt-6 flex flex-col items-center px-4 pb-2 text-center">
        <h1 className={`mt-4 flex items-center justify-center gap-1 text-[2rem] font-bold tracking-[-0.06em] ${isDark ? 'text-white' : 'text-[#1f2547]'}`}>
          Pandaa <span className="text-rose-400">🩷</span>
        </h1>

        <p className={`mt-3 max-w-[26ch] text-[15px] leading-7 ${isDark ? 'text-slate-300' : 'text-[#6b7280]'}`}>
          Chuyên làm review, unboxing
          <br />
          Những sp tui review đều ở bên dưới nha
        </p>

        <div className="mt-7 flex items-center justify-center">
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
              isDark ? 'border-white/12 bg-white/10 text-rose-300 hover:bg-white/14' : 'border-rose-100 bg-white text-rose-500 shadow-[0_12px_30px_rgba(244,114,182,0.24)] hover:bg-rose-50'
            }`}
          >
            <FacebookGlyph />
          </button>
        </div>
      </div>

      <section className="mt-8 px-3 pb-4">
        <div className="text-center">
          <span
            className={`inline-flex rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] ${
              isDark ? 'border border-white/10 bg-white/[0.06] text-rose-300' : 'bg-rose-50 text-rose-500 shadow-[inset_0_0_0_1px_rgba(244,114,182,0.12)]'
            }`}
          >
            Các bạn hãy tham khảo
          </span>

          <h2 className={`mt-5 text-[2rem] font-bold leading-tight tracking-[-0.05em] ${isDark ? 'text-white' : 'text-[#18213e]'}`}>
            Sản phẩm yêu thích của mình nhé!
          </h2>
        </div>

        <div className="mt-6 space-y-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.name} title={product.name} image={product.image} dark={isDark} />
          ))}
        </div>
      </section>
    </div>
  );
}
