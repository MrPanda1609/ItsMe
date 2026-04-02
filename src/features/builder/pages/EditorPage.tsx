import { Button } from '../../../components/ui/button';
import { EditorControls } from '../components/EditorControls';
import { PhoneMockup } from '../components/PhoneMockup';
import { PublicProfile } from '../components/PublicProfile';
import { EditorLayout } from '../layouts/EditorLayout';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';

function PreviewCanvas() {
  const profileData = useBuilderStore(builderSelectors.profileData);
  const mustShowWatermark = useBuilderStore(builderSelectors.mustShowWatermark);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-2">
        <PhoneMockup>
          <PublicProfile profileData={profileData} mustShowWatermark={mustShowWatermark} mode="preview" />
        </PhoneMockup>
      </div>

      <a
        href="/profile"
        className="absolute bottom-4 right-4 inline-flex h-11 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
      >
        Mở trang profile công khai
      </a>
    </div>
  );
}

export function EditorPage() {
  const hasUnsavedChanges = useBuilderStore(builderSelectors.hasUnsavedChanges);
  const saveProfile = useBuilderStore((state) => state.saveProfile);

  return (
    <EditorLayout
      controls={<EditorControls />}
      preview={<PreviewCanvas />}
      headerActions={
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium shadow-sm whitespace-nowrap ${
              hasUnsavedChanges
                ? 'border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'
            }`}
          >
            {hasUnsavedChanges ? 'Chưa lưu' : 'Đã lưu'}
          </span>
          <Button
            type="button"
            size="sm"
            className="h-10 rounded-full px-4 whitespace-nowrap bg-rose-500 text-white shadow-[0_10px_24px_rgba(244,63,94,0.22)] hover:bg-rose-400 dark:border-transparent dark:bg-rose-500 dark:text-white dark:hover:bg-rose-400"
            disabled={!hasUnsavedChanges}
            onClick={saveProfile}
          >
            Lưu thay đổi
          </Button>
        </div>
      }
    />
  );
}
