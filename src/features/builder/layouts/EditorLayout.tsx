import type { ReactNode } from 'react';
import { Button } from '../../../components/ui/button';
import { setMockAuthenticated } from '../../auth/mockAuth';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import { useIsDesktopEditor } from '../hooks/useIsDesktopEditor';

interface EditorLayoutProps {
  controls?: ReactNode;
  preview?: ReactNode;
}

function PanelFallback({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-gray-200 bg-white p-6 text-slate-600 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function DesktopOnlyOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 p-6 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-[32px] border border-gray-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70"
      >
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-rose-500">Desktop only</p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">Please use a Desktop browser to design your profile</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The /editor workspace is locked on mobile so creators can build with the full split-screen experience.
        </p>
      </div>
    </div>
  );
}

export function EditorLayout({ controls, preview }: EditorLayoutProps) {
  const isDesktop = useIsDesktopEditor();
  const userStatus = useBuilderStore(builderSelectors.userStatus);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);

  const handleGoHome = () => {
    window.location.assign('/');
  };

  const handleLogout = () => {
    setMockAuthenticated(false);
    window.location.assign('/login');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-50 text-slate-900">
      {!isDesktop && <DesktopOnlyOverlay />}

      <div className={`flex h-screen w-full overflow-hidden ${!isDesktop ? 'pointer-events-none select-none blur-[2px]' : ''}`}>
        <aside className="flex h-full w-[40%] min-w-[400px] flex-col overflow-hidden border-r border-gray-200 bg-white">
          <header className="border-b border-gray-200 bg-white px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-rose-500">KOC Profile Builder</p>
                <h1 className="mt-2 text-xl font-semibold text-slate-900">Editor Workspace</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">Builder view đã chuyển sang light mode, ưu tiên cảm giác consumer product cho creator.</p>
              </div>

              <div className="flex flex-col items-end gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleGoHome}>
                    Về trang chủ
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  >
                    Đăng xuất
                  </Button>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-slate-700">
                    {userStatus.isAdmin ? 'Admin' : 'User'}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 ${
                      hasProAccess ? 'border border-rose-200 bg-rose-50 text-rose-700' : 'border border-gray-200 bg-gray-50 text-slate-700'
                    }`}
                  >
                    {hasProAccess ? 'Pro access enabled' : 'Free access'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {controls ?? (
              <PanelFallback
                title="Left panel is ready"
                description="Profile Info, Links & Products, and Appearance controls will be mounted here in Step 2."
              />
            )}
          </div>
        </aside>

        <main className="relative flex h-full w-[60%] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(251,113,133,0.12),transparent_22%),linear-gradient(180deg,#f8fafc_0%,#fdf2f8_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
          <div className="relative z-10 flex h-full w-full items-center justify-center p-4 lg:p-6">
            {preview ?? (
              <PanelFallback
                title="Preview stage reserved"
                description="The centered smartphone mockup and shared PublicProfile renderer will land here in Step 3."
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
