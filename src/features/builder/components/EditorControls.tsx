import { useState } from 'react';
import { cn } from '../../../lib/cn';
import { AppearancePanel } from './AppearancePanel';
import { LinksProductsPanel } from './LinksProductsPanel';
import { ProfileInfoPanel } from './ProfileInfoPanel';

type BuilderTab = 'profile' | 'links' | 'appearance';

const tabs: Array<{ id: BuilderTab; label: string; description: string }> = [
  { id: 'profile', label: 'Profile Info', description: 'Avatar, name, and bio' },
  { id: 'links', label: 'Links & Products', description: 'Drag, edit, reorder' },
  { id: 'appearance', label: 'Appearance', description: 'Themes, fonts, access' },
];

export function EditorControls() {
  const [activeTab, setActiveTab] = useState<BuilderTab>('profile');

  return (
    <div className="space-y-5">
      <div className="rounded-[30px] border border-gray-200 bg-white p-3 shadow-sm">
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
                  isActive ? 'border-rose-200 bg-rose-50 shadow-sm' : 'border-transparent bg-transparent hover:border-gray-200 hover:bg-gray-50',
                )}
              >
                <p className={cn('text-sm font-semibold', isActive ? 'text-slate-900' : 'text-slate-700')}>{tab.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{tab.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'profile' ? <ProfileInfoPanel /> : null}
      {activeTab === 'links' ? <LinksProductsPanel /> : null}
      {activeTab === 'appearance' ? <AppearancePanel /> : null}
    </div>
  );
}
