import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { PublicProfile } from '../components/PublicProfile';
import { getPublicProfile } from '../api/profileRepository';
import { createDefaultProfileData } from '../config/defaultProfileData';
import { useAppExperience } from '../../../providers/AppExperienceProvider';

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
      setError('Không tìm thấy trang cá nhân.');
      setLoading(false);
      return;
    }

    if (!isConfigured) {
      setError('Hệ thống chưa sẵn sàng. Vui lòng thử lại sau.');
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
          setError('Trang cá nhân này chưa được tạo hoặc chưa được công khai.');
          return;
        }

        setProfileData(result.publishedProfileData);
        setMustShowWatermark(!result.userStatus.isPro || result.publishedProfileData.watermarkEnabled);
        const shouldShowBrandPromo = !result.userStatus.isPro || result.publishedProfileData.brandPromoEnabled;
        setMustShowBrandPromo(shouldShowBrandPromo);
        setPromoOpen(false);
      })
      .catch(() => {
        if (!active) return;
        setError('Không thể tải trang cá nhân. Vui lòng thử lại sau.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isConfigured, requestedUserId]);

  useEffect(() => {
    if (!mustShowBrandPromo || loading || error) {
      setPromoOpen(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setPromoOpen(true);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [error, loading, mustShowBrandPromo]);

  return (
    <main
      className="min-h-[100dvh]"
      style={{
        background: isDark
          ? 'radial-gradient(circle_at_top, rgba(251,113,133,0.16), transparent 24%), linear-gradient(180deg, #09090b 0%, #111114 100%)'
          : 'radial-gradient(circle_at_top, rgba(251,113,133,0.14), transparent 24%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      }}
    >
      {loading ? (
        <div className="flex min-h-[100dvh] items-center justify-center px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <div className="rounded-[28px] border border-gray-200 bg-white px-5 py-10 shadow-sm dark:border-white/10 dark:bg-[#111111]">
            Đang tải...
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
            <PublicProfile
              profileData={profileData}
              mustShowWatermark={mustShowWatermark}
              brandPromoEnabled={mustShowBrandPromo}
              promoOpen={promoOpen}
              onPromoOpen={() => setPromoOpen(true)}
              onPromoClose={() => setPromoOpen(false)}
              className="min-h-[100dvh] md:min-h-[844px]"
            />
          </motion.div>
        </div>
      )}
    </main>
  );
}
