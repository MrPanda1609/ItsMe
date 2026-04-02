import type { ReactNode } from 'react';
import { Button } from '../../../components/ui/button';
import { useAppExperience } from '../../../providers/AppExperienceProvider';
import { setMockAuthenticated } from '../../auth/mockAuth';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import { useIsDesktopEditor } from '../hooks/useIsDesktopEditor';

interface EditorLayoutProps {
  controls?: ReactNode;
  preview?: ReactNode;
  headerActions?: ReactNode;
}

function PanelFallback({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-gray-200 bg-white p-6 text-slate-600 shadow-sm dark:border-white/10 dark:bg-[#111111] dark:text-slate-300">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}

function DesktopOnlyOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 p-6 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-[32px] border border-gray-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70 dark:border-white/10 dark:bg-[#111111] dark:shadow-black/30"
      >
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-rose-500 dark:text-rose-300">Chỉ hỗ trợ máy tính</p>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Vui lòng dùng trình duyệt trên máy tính để thiết kế profile</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Khu vực /editor hiện đang khoá trên mobile để creator có trải nghiệm chia đôi màn hình đầy đủ.
        </p>
      </div>
    </div>
  );
}

export function EditorLayout({ controls, preview, headerActions }: EditorLayoutProps) {
  const isDesktop = useIsDesktopEditor();
  const userStatus = useBuilderStore(builderSelectors.userStatus);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);
  const { mode, toggleMode } = useAppExperience();
  const isDark = mode === 'dark';

  const handleGoHome = () => {
    window.location.assign('/');
  };

  const handleLogout = () => {
    setMockAuthenticated(false);
    window.location.assign('/login');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#fafafa] text-slate-900 dark:bg-[#0a0a0a] dark:text-gray-100">
      {!isDesktop && <DesktopOnlyOverlay />}

      <div className={`flex h-screen w-full overflow-hidden ${!isDesktop ? 'pointer-events-none select-none blur-[2px]' : ''}`}>
        <aside className="flex h-full w-[40%] min-w-[400px] flex-col overflow-hidden border-r border-gray-200 bg-white dark:border-white/10 dark:bg-[#0b0b0f]">
          <header className="border-b border-gray-200 bg-white px-6 py-5 dark:border-white/10 dark:bg-[#0b0b0f]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-rose-500 dark:text-rose-300">Studio</p>
              </div>

              <div className="flex flex-col items-end gap-3 text-xs">
                <div className="flex flex-wrap items-center justify-end gap-2">
                  {headerActions}
                  <Button type="button" variant="outline" size="sm" onClick={toggleMode} className="h-10 rounded-full px-4 whitespace-nowrap">
                    {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={handleGoHome} className="h-10 rounded-full px-4 whitespace-nowrap">
                    Trang chủ
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="h-10 rounded-full px-4 whitespace-nowrap text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
                  >
                    Đăng xuất
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                    {userStatus.isAdmin ? 'Quản trị' : 'Người dùng'}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1.5 shadow-sm ${
                      hasProAccess
                        ? 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200'
                        : 'border border-gray-200 bg-gray-50 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white'
                    }`}
                  >
                    {hasProAccess ? 'Đã mở gói Pro' : 'Gói miễn phí'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {controls ?? (
              <PanelFallback
                title="Panel bên trái đã sẵn sàng"
                description="Các khối Thông tin hồ sơ, Link & sản phẩm và Giao diện sẽ hiển thị tại đây."
              />
            )}
          </div>
        </aside>

        <main className="relative flex h-full w-[60%] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(251,113,133,0.12),transparent_22%),linear-gradient(180deg,#f8fafc_0%,#fdf2f8_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(251,113,133,0.16),transparent_22%),linear-gradient(180deg,#09090b_0%,#111114_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50 dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
          <div className="relative z-10 flex h-full w-full items-center justify-center p-4 lg:p-6">
            {preview ?? (
              <PanelFallback
                title="Khu xem trước đã sẵn sàng"
                description="Mockup điện thoại và khung hiển thị profile công khai sẽ hiển thị tại đây."
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
