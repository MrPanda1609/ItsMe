import { PublicProfile } from '../components/PublicProfile';
import { useAppExperience } from '../../../providers/AppExperienceProvider';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';

export function PublicProfilePage() {
  const profileData = useBuilderStore(builderSelectors.publishedProfileData);
  const mustShowWatermark = useBuilderStore(builderSelectors.publishedMustShowWatermark);
  const { mode } = useAppExperience();
  const isDark = mode === 'dark';

  return (
    <main className="min-h-[100dvh] px-4 py-6 md:px-8 md:py-10" style={{ background: isDark ? 'radial-gradient(circle_at_top, rgba(251,113,133,0.16), transparent 24%), linear-gradient(180deg, #09090b 0%, #111114 100%)' : 'radial-gradient(circle_at_top, rgba(251,113,133,0.14), transparent 24%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-6xl flex-col gap-6 md:min-h-[calc(100dvh-5rem)] md:justify-center">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-rose-500 dark:text-rose-300">Trang công khai</p>
            <h1 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Bản xem công khai trên điện thoại</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/editor"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Quay lại trình chỉnh sửa
            </a>
          </div>
        </div>

        <div className="mx-auto w-full md:max-w-[430px] md:overflow-hidden md:rounded-[40px] md:border md:border-gray-200 md:shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:md:border-white/10 dark:md:shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <PublicProfile profileData={profileData} mustShowWatermark={mustShowWatermark} className="min-h-[100dvh] md:min-h-[844px]" />
        </div>
      </div>
    </main>
  );
}
