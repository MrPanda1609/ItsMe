import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PhoneMockup } from '../components/PhoneMockup';
import { PublicProfile } from '../components/PublicProfile';
import { ensureOwnProfile } from '../api/profileRepository';
import { createDefaultProfileData } from '../config/defaultProfileData';
import { useAppExperience } from '../../../providers/AppExperienceProvider';
import { useAuth } from '../../../providers/AuthProvider';

export function PrivatePreviewPage() {
  const { user, isConfigured } = useAuth();
  const { mode } = useAppExperience();
  const isDark = mode === 'dark';
  const [profileData, setProfileData] = useState(createDefaultProfileData());
  const [mustShowWatermark, setMustShowWatermark] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    if (!isConfigured) {
      setError('Chưa cấu hình Supabase nên chưa thể mở preview riêng tư.');
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError('');

    ensureOwnProfile(user.id, user.email)
      .then((payload) => {
        if (!active) return;
        setProfileData(payload.draftProfileData);
        setMustShowWatermark(!payload.userStatus.isPro || payload.draftProfileData.watermarkEnabled);
      })
      .catch(() => {
        if (!active) return;
        setError('Không thể tải preview riêng tư. Vui lòng kiểm tra kết nối và dữ liệu tài khoản.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isConfigured, user]);

  return (
    <main
      className="relative min-h-[100dvh] overflow-hidden px-4 py-6 md:px-6 md:py-8"
      style={{
        background: isDark
          ? 'radial-gradient(circle at top, rgba(251,113,133,0.14), transparent 24%), linear-gradient(180deg, #09090b 0%, #111114 100%)'
          : 'radial-gradient(circle at top, rgba(251,113,133,0.12), transparent 22%), linear-gradient(180deg, #fffafc 0%, #f8fafc 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-60px] top-14 h-56 w-56 rounded-full bg-rose-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-[-70px] h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3rem)] max-w-5xl flex-col items-center justify-center gap-6">
        <div className="flex w-full max-w-[420px] items-center justify-between gap-3">
          <a
            href="/editor"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/5 bg-white/90 px-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
          >
            Quay lại chỉnh sửa
          </a>
          <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
            Preview riêng tư
          </span>
        </div>

        {loading ? (
          <div className="rounded-[28px] border border-gray-200 bg-white px-5 py-10 text-center text-sm text-slate-500 shadow-sm dark:border-white/10 dark:bg-[#111111] dark:text-slate-400">
            Đang tải preview riêng tư...
          </div>
        ) : error ? (
          <div className="rounded-[28px] border border-rose-200 bg-white px-5 py-10 text-center text-sm text-rose-600 shadow-sm dark:border-rose-500/30 dark:bg-[#111111] dark:text-rose-200">
            {error}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(84vh,844px)] w-full max-w-[420px] items-center justify-center"
          >
            <PhoneMockup>
              <PublicProfile profileData={profileData} mustShowWatermark={mustShowWatermark} mode="preview" />
            </PhoneMockup>
          </motion.div>
        )}
      </div>
    </main>
  );
}
