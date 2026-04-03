import { Check, Copy, Eye, Globe2, Sparkles, X } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../../providers/AuthProvider';
import { EditorControls } from '../components/EditorControls';
import { PhoneMockup } from '../components/PhoneMockup';
import { PublicProfile } from '../components/PublicProfile';
import { EditorLayout } from '../layouts/EditorLayout';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import { ensureOwnProfile, publishProfile, saveDraftProfile } from '../api/profileRepository';

type DraftSyncState = 'idle' | 'saving' | 'saved' | 'error';

function ActionRailItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative flex items-center justify-end">
      <div className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-black/5 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm opacity-0 transition duration-200 group-hover:opacity-100 dark:border-white/10 dark:bg-[#111111] dark:text-white lg:block">
        {label}
      </div>
      {children}
    </div>
  );
}

function ProTrialModal({ features, onClose, onResetToFree }: { features: string[]; onClose: () => void; onResetToFree: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white text-slate-500 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/[0.08]"
          aria-label="Đóng thông báo Pro"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
          Bạn đang thử tính năng Pro
        </span>

        <h2 className="mt-5 pr-10 text-2xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">Không thể cập nhật public với tài khoản Free</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">Bạn đang bật các tính năng Pro dưới đây. Hãy hủy các tính năng đó để tiếp tục với bản Free hoặc nâng cấp Pro để lưu lên trang public.</p>

        <div className="mt-6 rounded-[1.5rem] border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-violet-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onResetToFree}
            className="inline-flex items-center justify-center rounded-full border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.08]"
          >
            Hủy tính năng Pro
          </button>
          <a
            href="/#pricing"
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Kích hoạt Pro
          </a>
        </div>
      </div>
    </div>
  );
}

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

      <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
        <ActionRailItem label="Preview riêng tư">
          <button
            type="button"
            onClick={onOpenPreview}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white px-0 text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            aria-label="Preview riêng tư"
            title="Preview riêng tư"
          >
            <Eye className="h-4 w-4" strokeWidth={1.9} />
          </button>
        </ActionRailItem>

        <ActionRailItem label={copyLabel}>
          <button
            type="button"
            onClick={onCopyPublicLink}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white px-0 text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            aria-label={copyLabel}
            title={copyLabel}
          >
            {copyLabel === 'Đã copy link' ? <Check className="h-4 w-4" strokeWidth={1.9} /> : <Copy className="h-4 w-4" strokeWidth={1.9} />}
          </button>
        </ActionRailItem>

        <ActionRailItem label="Public">
          <a
            href={publicHref}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white px-0 text-slate-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            aria-label="Public"
            title="Public"
          >
            <Globe2 className="h-4 w-4" strokeWidth={1.9} />
          </a>
        </ActionRailItem>
      </div>
    </div>
  );
}

const LOCAL_DRAFT_KEY = (userId: string) => `itsme-local-draft-${userId}`;
const LOCAL_DRAFT_TS_KEY = (userId: string) => `itsme-local-draft-ts-${userId}`;

const saveLocalDraft = (userId: string, snapshot: string) => {
  try {
    window.localStorage.setItem(LOCAL_DRAFT_KEY(userId), snapshot);
    window.localStorage.setItem(LOCAL_DRAFT_TS_KEY(userId), Date.now().toString());
  } catch {
    // ignore storage errors
  }
};

const loadLocalDraft = (userId: string): { snapshot: string; ts: number } | null => {
  try {
    const snapshot = window.localStorage.getItem(LOCAL_DRAFT_KEY(userId));
    const ts = Number(window.localStorage.getItem(LOCAL_DRAFT_TS_KEY(userId)) ?? '0');
    if (snapshot) return { snapshot, ts };
  } catch {
    // ignore
  }
  return null;
};

export function EditorPage() {
  const { user, isConfigured } = useAuth();
  const profileData = useBuilderStore(builderSelectors.profileData);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);
  const activeProFeatureLabels = useBuilderStore(builderSelectors.activeProFeatureLabels);
  const hasUnsavedChanges = useBuilderStore(builderSelectors.hasUnsavedChanges);
  const hydrateBuilder = useBuilderStore((state) => state.hydrateBuilder);
  const saveProfileToStore = useBuilderStore((state) => state.saveProfile);
  const resetProFeaturesToFree = useBuilderStore((state) => state.resetProFeaturesToFree);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpeningPreview, setIsOpeningPreview] = useState(false);
  const [copyLabel, setCopyLabel] = useState('Copy link public');
  const [draftSyncState, setDraftSyncState] = useState<DraftSyncState>('idle');
  const [draftSyncMessage, setDraftSyncMessage] = useState('');
  const [lastSavedLabel, setLastSavedLabel] = useState('');
  const [showProTrialModal, setShowProTrialModal] = useState(false);
  const draftSnapshotRef = useRef('');
  const draftRequestIdRef = useRef(0);
  // track which userId we've already loaded — prevents reload on token refresh
  const loadedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // skip if same user already loaded
    if (loadedUserIdRef.current === user.id) {
      return;
    }

    if (!isConfigured) {
      setLoadError('Hệ thống chưa sẵn sàng. Vui lòng liên hệ quản trị viên.');
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setLoadError('');

    ensureOwnProfile(user.id, user.email)
      .then((payload) => {
        if (!active) return;

        // check if localStorage has a newer unsaved draft
        const localDraft = loadLocalDraft(user.id);
        const serverDraftSnapshot = JSON.stringify(payload.draftProfileData);

        if (localDraft && localDraft.snapshot !== serverDraftSnapshot) {
          // merge: hydrate from server for auth/plan, then restore local draft data
          try {
            const localProfileData = JSON.parse(localDraft.snapshot);
            hydrateBuilder({ ...payload, draftProfileData: localProfileData });
            draftSnapshotRef.current = localDraft.snapshot;
            setDraftSyncState('saving');
            setDraftSyncMessage('Đang khôi phục bản chỉnh sửa trước đó...');
          } catch {
            hydrateBuilder(payload);
            draftSnapshotRef.current = serverDraftSnapshot;
            setDraftSyncState('saved');
            setDraftSyncMessage('Đã lưu bản nháp');
          }
        } else {
          hydrateBuilder(payload);
          draftSnapshotRef.current = serverDraftSnapshot;
          setDraftSyncState('saved');
          setDraftSyncMessage('Đã lưu bản nháp');
        }

        loadedUserIdRef.current = user.id;
      })
      .catch(() => {
        if (!active) return;
        setLoadError('Không thể tải dữ liệu tài khoản. Vui lòng thử tải lại trang.');
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

    // instant local backup — survives tab switch & page reload
    saveLocalDraft(user.id, snapshot);

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

    if (!hasProAccess && activeProFeatureLabels.length > 0) {
      setShowProTrialModal(true);
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const payload = await publishProfile(user.id, profileData);
      hydrateBuilder(payload);
      saveProfileToStore();
      draftSnapshotRef.current = JSON.stringify(payload.draftProfileData);
      setLastSavedLabel('Đã cập nhật');
    } catch {
      setSaveError('Không thể cập nhật. Vui lòng kiểm tra kết nối mạng và thử lại.');
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
      setSaveError('Không thể mở xem trước. Vui lòng thử lại.');
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

  const handleResetToFree = () => {
    resetProFeaturesToFree();
    setShowProTrialModal(false);
  };

  return (
    <>
      {showProTrialModal ? <ProTrialModal features={activeProFeatureLabels} onClose={() => setShowProTrialModal(false)} onResetToFree={handleResetToFree} /> : null}

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
                  : !hasProAccess && activeProFeatureLabels.length > 0
                    ? 'border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200'
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
                : !hasProAccess && activeProFeatureLabels.length > 0
                  ? 'Đang thử Pro'
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
    </>
  );
}
