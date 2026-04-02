import { PublicProfile } from '../components/PublicProfile';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';

export function PublicProfilePage() {
  const profileData = useBuilderStore(builderSelectors.profileData);
  const mustShowWatermark = useBuilderStore(builderSelectors.mustShowWatermark);

  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top,rgba(251,113,133,0.14),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-6xl flex-col gap-6 md:min-h-[calc(100dvh-5rem)] md:justify-center">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-rose-500">Public Output</p>
            <h1 className="mt-2 text-xl font-semibold text-slate-900">Shared mobile renderer</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/editor"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
            >
              Back to editor
            </a>
          </div>
        </div>

        <div className="mx-auto w-full md:max-w-[430px] md:overflow-hidden md:rounded-[40px] md:border md:border-gray-200 md:shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
          <PublicProfile profileData={profileData} mustShowWatermark={mustShowWatermark} className="min-h-[100dvh] md:min-h-[844px]" />
        </div>
      </div>
    </main>
  );
}
