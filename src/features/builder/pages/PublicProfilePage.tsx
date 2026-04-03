import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { PublicProfile } from '../components/PublicProfile';
import { getPublicProfile } from '../api/profileRepository';
import { createDefaultProfileData } from '../config/defaultProfileData';
import { useAppExperience } from '../../../providers/AppExperienceProvider';

function BrandPromoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white text-slate-500 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/[0.08]"
          aria-label="Đóng popup quảng bá"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <span className="inline-flex rounded-full bg-rose-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-500 dark:bg-white/10 dark:text-rose-300">
          Tạo với ItsMe
        </span>
        <h2 className="mt-5 pr-10 text-[1.85rem] font-semibold tracking-[-0.05em] text-slate-900 dark:text-white">Muốn có profile đẹp như thế này?</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">Tạo storefront KOC của riêng bạn với giao diện đẹp, link public riêng và bộ chỉnh sửa trực quan bằng ItsMe.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
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

export function PublicProfilePage() {
  const { mode } = useAppExperience();
  const isConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const isDark = mode === 'dark';
  const [profileData, setProfileData] = useState(createDefaultProfileData());
  const [mustShowWatermark, setMustShowWatermark] = useState(true);
  const [mustShowBrandPromo, setMustShowBrandPromo] = useState(true);
  const [promoOpen, setPromoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const requestedUserId = useMemo(() => {
    const segments = window.location.pathname.split('/').filter(Boolean);
    return segments[1] ?? '';
  }, []);

  useEffect(() => {
    if (!requestedUserId) {
      setError('Không tìm thấy id profile để hiển thị.');
      setLoading(false);
      return;
    }

    if (!isConfigured) {
      setError('Chưa cấu hình Supabase nên chưa thể tải profile công khai.');
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError('');

    getPublicProfile(requestedUserId)
      .then((result) => {
        if (!active) return;

        if (!result) {
          setError('Không tìm thấy profile công khai cho tài khoản này.');
          return;
        }

        setProfileData(result.publishedProfileData);
        setMustShowWatermark(!result.userStatus.isPro || result.publishedProfileData.watermarkEnabled);
        const shouldShowBrandPromo = !result.userStatus.isPro || result.publishedProfileData.brandPromoEnabled;
        setMustShowBrandPromo(shouldShowBrandPromo);
        setPromoOpen(shouldShowBrandPromo);
      })
      .catch(() => {
        if (!active) return;
        setError('Không thể tải profile công khai. Vui lòng kiểm tra cấu hình Supabase và schema.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isConfigured, requestedUserId]);

  return (
    <main
      className="min-h-[100dvh]"
      style={{
        background: isDark
          ? 'radial-gradient(circle_at_top, rgba(251,113,133,0.16), transparent 24%), linear-gradient(180deg, #09090b 0%, #111114 100%)'
          : 'radial-gradient(circle_at_top, rgba(251,113,133,0.14), transparent 24%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      }}
    >
      {promoOpen && mustShowBrandPromo ? <BrandPromoModal onClose={() => setPromoOpen(false)} /> : null}

      {mustShowBrandPromo && !loading && !error ? (
        <button
          type="button"
          onClick={() => setPromoOpen(true)}
          className="fixed right-4 top-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white/90 text-rose-500 shadow-[0_18px_42px_rgba(15,23,42,0.14)] backdrop-blur transition hover:scale-[1.02] hover:bg-white dark:border-white/10 dark:bg-white/[0.08] dark:text-rose-300 dark:hover:bg-white/[0.12] md:right-6 md:top-6"
          aria-label="Mở quảng bá ItsMe"
          title="Khám phá ItsMe"
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.9} />
        </button>
      ) : null}

      {loading ? (
        <div className="flex min-h-[100dvh] items-center justify-center px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <div className="rounded-[28px] border border-gray-200 bg-white px-5 py-10 shadow-sm dark:border-white/10 dark:bg-[#111111]">
            Đang tải profile công khai...
          </div>
        </div>
      ) : error ? (
        <div className="flex min-h-[100dvh] items-center justify-center px-6 text-center text-sm text-rose-600 dark:text-rose-200">
          <div className="rounded-[28px] border border-rose-200 bg-white px-5 py-10 shadow-sm dark:border-rose-500/30 dark:bg-[#111111]">
            {error}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[100dvh] items-center justify-center px-0 py-0 md:px-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:max-w-[430px] md:overflow-hidden md:rounded-[42px] md:border md:border-white/10 md:shadow-[0_28px_80px_rgba(2,6,23,0.26)]"
          >
            <PublicProfile profileData={profileData} mustShowWatermark={mustShowWatermark} className="min-h-[100dvh] md:min-h-[844px]" />
          </motion.div>
        </div>
      )}
    </main>
  );
}
