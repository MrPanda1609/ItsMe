import { cn } from '../../../lib/cn';
import { AppearancePanel } from './AppearancePanel';
import { LinksProductsPanel } from './LinksProductsPanel';
import { ProfileInfoPanel } from './ProfileInfoPanel';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';

type BuilderTab = 'profile' | 'links' | 'appearance';

const tabs: Array<{ id: BuilderTab; label: string; description: string }> = [
  { id: 'profile', label: 'Thông tin hồ sơ', description: 'Ảnh, tên và nội dung chính' },
  { id: 'links', label: 'Liên kết & sản phẩm', description: 'Thêm, sửa, kéo thả' },
  { id: 'appearance', label: 'Giao diện', description: 'Màu sắc, phông chữ, kích thước' },
];

export function EditorControls() {
  const activeTab = useBuilderStore(builderSelectors.activeTab);
  const setActiveTab = useBuilderStore((state) => state.setActiveTab);

  return (
    <div className="space-y-5">
      <div className="rounded-[30px] border border-gray-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#111111]">
        <div className="grid gap-2 xl:grid-cols-3">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'rounded-[24px] border px-4 py-3 text-left transition',
                  isActive
                    ? 'border-rose-200 bg-rose-50 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/10'
                    : 'border-transparent bg-transparent hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/10 dark:hover:bg-white/[0.04]',
                )}
              >
                <p className={cn('text-sm font-semibold', isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200')}>{tab.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{tab.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn(activeTab === 'profile' ? 'block' : 'hidden')} aria-hidden={activeTab !== 'profile'}>
        <ProfileInfoPanel />
      </div>
      <div className={cn(activeTab === 'links' ? 'block' : 'hidden')} aria-hidden={activeTab !== 'links'}>
        <LinksProductsPanel />
      </div>
      <div className={cn(activeTab === 'appearance' ? 'block' : 'hidden')} aria-hidden={activeTab !== 'appearance'}>
        <AppearancePanel />
      </div>
    </div>
  );
}
