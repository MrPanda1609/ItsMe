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
        className="absolute bottom-4 right-4 inline-flex h-11 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
      >
        Open shared public page
      </a>
    </div>
  );
}

export function EditorPage() {
  return <EditorLayout controls={<EditorControls />} preview={<PreviewCanvas />} />;
}
