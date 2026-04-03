import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../../providers/AuthProvider';
import { EditorControls } from '../components/EditorControls';
import { PhoneMockup } from '../components/PhoneMockup';
import { PublicProfile } from '../components/PublicProfile';
import { EditorLayout } from '../layouts/EditorLayout';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import { ensureOwnProfile, publishProfile, saveDraftProfile } from '../api/profileRepository';

type DraftSyncState = 'idle' | 'saving' | 'saved' | 'error';

function PreviewCanvas({ publicHref, onOpenPreview, onCopyPublicLink, copyLabel }: { publicHref: string; onOpenPreview: () => void; onCopyPublicLink: () => void; copyLabel: string }) {
  const profileData = useBuilderStore(builderSelectors.profileData);
  const mustShowWatermark = useBuilderStore(builderSelectors.mustShowWatermark);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-2">
        <PhoneMockup>
          <PublicProfile profileData={profileData} mustShowWatermark={mustShowWatermark} mode="preview" />
        </PhoneMockup>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onOpenPreview}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
        >
          Preview riêng tư
        </button>
        <button
          type="button"
          onClick={onCopyPublicLink}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white px-0 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
          aria-label={copyLabel}
          title={copyLabel}
        >
          {copyLabel === 'Đã copy link' ? <Check className="h-4 w-4" strokeWidth={1.9} /> : <Copy className="h-4 w-4" strokeWidth={1.9} />}
        </button>
        <a
          href={publicHref}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
        >
          Public
        </a>
      </div>
    </div>
  );
}

export function EditorPage() {
  const { user, isConfigured } = useAuth();
  const profileData = useBuilderStore(builderSelectors.profileData);
  const hasUnsavedChanges = useBuilderStore(builderSelectors.hasUnsavedChanges);
  const hydrateBuilder = useBuilderStore((state) => state.hydrateBuilder);
  const saveProfileToStore = useBuilderStore((state) => state.saveProfile);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpeningPreview, setIsOpeningPreview] = useState(false);
  const [copyLabel, setCopyLabel] = useState('Copy link public');
  const [draftSyncState, setDraftSyncState] = useState<DraftSyncState>('idle');
  const [draftSyncMessage, setDraftSyncMessage] = useState('');
  const [lastSavedLabel, setLastSavedLabel] = useState('');
  const draftSnapshotRef = useRef('');
  const draftRequestIdRef = useRef(0);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    if (!isConfigured) {
      setLoadError('Chưa cấu hình Supabase. Hãy thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY để dùng builder thật.');
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setLoadError('');

    ensureOwnProfile(user.id, user.email)
      .then((payload) => {
        if (!active) return;
        hydrateBuilder(payload);
        draftSnapshotRef.current = JSON.stringify(payload.draftProfileData);
        setDraftSyncState('saved');
        setDraftSyncMessage('Đã lưu bản nháp');
      })
      .catch(() => {
        if (!active) return;
        setLoadError('Không thể tải dữ liệu builder của tài khoản này. Hãy kiểm tra Supabase schema và quyền truy cập.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [hydrateBuilder, isConfigured, user]);

  useEffect(() => {
    if (!user || !isConfigured || loading || loadError) {
      return;
    }

    const snapshot = JSON.stringify(profileData);

    if (snapshot === draftSnapshotRef.current) {
      return;
    }

    setDraftSyncState('saving');
    setDraftSyncMessage('Đang tự lưu...');

    const timer = window.setTimeout(() => {
      const requestId = draftRequestIdRef.current + 1;
      draftRequestIdRef.current = requestId;

      saveDraftProfile(user.id, profileData)
        .then(() => {
          if (draftRequestIdRef.current !== requestId) {
            return;
          }

          draftSnapshotRef.current = snapshot;
          setDraftSyncState('saved');
          setDraftSyncMessage('Đã lưu bản nháp');
        })
        .catch(() => {
          if (draftRequestIdRef.current !== requestId) {
            return;
          }

          setDraftSyncState('error');
          setDraftSyncMessage('Không thể tự lưu bản nháp');
        });
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isConfigured, loadError, loading, profileData, user]);

  const handleSave = async () => {
    if (!user || !isConfigured) {
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const payload = await publishProfile(user.id, profileData);
      hydrateBuilder(payload);
      saveProfileToStore();
      draftSnapshotRef.current = JSON.stringify(payload.draftProfileData);
      setLastSavedLabel('Đã lưu lên profile công khai');
    } catch {
      setSaveError('Không thể lưu profile công khai. Vui lòng kiểm tra kết nối và schema Supabase.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenPreview = async () => {
    if (!user || !isConfigured || loading || loadError) {
      return;
    }

    setIsOpeningPreview(true);
    setSaveError('');

    try {
      await saveDraftProfile(user.id, profileData);
      draftSnapshotRef.current = JSON.stringify(profileData);
      window.location.assign('/preview');
    } catch {
      setSaveError('Không thể mở preview riêng tư vì draft chưa đồng bộ được.');
    } finally {
      setIsOpeningPreview(false);
    }
  };

  const handleCopyPublicLink = async () => {
    if (!user) {
      return;
    }

    const publicUrl = `${window.location.origin}/profile/${user.id}`;

    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopyLabel('Đã copy link');
      window.setTimeout(() => setCopyLabel('Copy link public'), 1800);
    } catch {
      setCopyLabel('Copy lỗi');
      window.setTimeout(() => setCopyLabel('Copy link public'), 1800);
    }
  };

  return (
    <EditorLayout
      controls={
        loading ? (
          <div className="rounded-[28px] border border-gray-200 bg-white px-5 py-10 text-center text-sm text-slate-500 shadow-sm dark:border-white/10 dark:bg-[#111111] dark:text-slate-400">
            Đang tải builder của tài khoản...
          </div>
        ) : loadError ? (
          <div className="rounded-[28px] border border-rose-200 bg-white px-5 py-10 text-center text-sm text-rose-600 shadow-sm dark:border-rose-500/30 dark:bg-[#111111] dark:text-rose-200">
            {loadError}
          </div>
        ) : (
          <EditorControls />
        )
      }
      preview={<PreviewCanvas publicHref={user ? `/profile/${user.id}` : '/profile'} onOpenPreview={handleOpenPreview} onCopyPublicLink={handleCopyPublicLink} copyLabel={copyLabel} />}
      headerActions={
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-medium shadow-sm whitespace-nowrap ${
              saveError
                ? 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200'
                : draftSyncState === 'saving'
                  ? 'border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200'
                  : draftSyncState === 'error'
                    ? 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200'
                    : hasUnsavedChanges
                      ? 'border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200'
                      : 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'
            }`}
          >
            {saveError
              ? 'Lỗi cập nhật'
              : draftSyncState === 'saving'
                ? 'Đang tự lưu'
                : draftSyncState === 'error'
                  ? 'Lỗi lưu nháp'
                  : hasUnsavedChanges
                    ? 'Nháp mới'
                    : 'Đã đồng bộ'}
          </span>
          <Button
            type="button"
            size="sm"
            className="h-10 rounded-full px-4 whitespace-nowrap !border-transparent !bg-rose-500 !text-white shadow-[0_10px_24px_rgba(244,63,94,0.22)] hover:!bg-rose-400 dark:!border-transparent dark:!bg-rose-500 dark:!text-white dark:hover:!bg-rose-400"
            disabled={!hasUnsavedChanges || isSaving || isOpeningPreview || loading || Boolean(loadError)}
            onClick={handleSave}
          >
            {isSaving ? 'Đang cập nhật...' : 'Cập nhật public'}
          </Button>
        </div>
      }
    />
  );
}
