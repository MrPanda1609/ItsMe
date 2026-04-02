import type { CSSProperties } from 'react';
import { Switch } from '../../../components/ui/switch';
import { cn } from '../../../lib/cn';
import {
  CARD_STYLE_PRESETS,
  FONT_PRESETS,
  SHAPE_STYLE_PRESETS,
  THEME_PRESETS,
} from '../config/builderPresets';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import type { CardStyleOption, FontPreset, ThemePreset } from '../types';
import { BuilderPanelSection } from './BuilderPanelSection';

interface OptionCardProps {
  title: string;
  subtitle: string;
  selected: boolean;
  locked: boolean;
  onClick: () => void;
  previewStyle?: CSSProperties;
  previewClassName?: string;
  previewText?: string;
}

function OptionCard({ title, subtitle, selected, locked, onClick, previewStyle, previewClassName, previewText }: OptionCardProps) {
  return (
    <button
      type="button"
      disabled={locked}
      onClick={onClick}
      className={cn(
        'relative rounded-[28px] border p-4 text-left transition',
        selected ? 'border-rose-200 bg-rose-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
        locked && 'cursor-not-allowed opacity-70',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {locked ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-700">
              Pro
            </span>
          ) : null}
          {selected ? (
            <span className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-rose-700">
              Active
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn('mt-4 rounded-[22px] border border-gray-200 bg-gray-50 p-4', previewClassName)} style={previewStyle}>
        {previewText ? <span className="text-sm font-medium text-slate-900">{previewText}</span> : null}
      </div>
    </button>
  );
}

function ThemeOption({ option, selected, locked, onClick }: { option: ThemePreset; selected: boolean; locked: boolean; onClick: () => void }) {
  return (
    <OptionCard
      title={option.name}
      subtitle={option.isPro ? 'Premium gradient background' : 'Included for all users'}
      selected={selected}
      locked={locked}
      onClick={onClick}
      previewStyle={{ background: option.background }}
      previewClassName="h-24"
    />
  );
}

function FontOption({ option, selected, locked, onClick }: { option: FontPreset; selected: boolean; locked: boolean; onClick: () => void }) {
  return (
    <OptionCard
      title={option.name}
      subtitle={option.isPro ? 'Premium font option' : 'Free base font'}
      selected={selected}
      locked={locked}
      onClick={onClick}
      previewText="Aa TikTok creator"
      previewStyle={{ fontFamily: option.family }}
      previewClassName="flex min-h-[90px] items-center"
    />
  );
}

function CardStyleOptionTile({ option, selected, locked, onClick }: { option: CardStyleOption; selected: boolean; locked: boolean; onClick: () => void }) {
  return (
    <OptionCard
      title={option.name}
      subtitle={`Blur ${option.blur} · border ${option.borderWidth}px`}
      selected={selected}
      locked={locked}
      onClick={onClick}
      previewClassName="min-h-[90px]"
      previewStyle={{
        background: `rgba(255,255,255,${option.glassOpacity})`,
        backdropFilter: `blur(${option.blur})`,
        boxShadow: option.shadow,
        borderWidth: `${option.borderWidth}px`,
      }}
      previewText="Glass card"
    />
  );
}

export function AppearancePanel() {
  const selectedTheme = useBuilderStore((state) => state.profileData.selectedTheme);
  const selectedFont = useBuilderStore((state) => state.profileData.selectedFont);
  const selectedCardStyle = useBuilderStore((state) => state.profileData.cardStyle);
  const selectedShapeStyle = useBuilderStore((state) => state.profileData.shapeStyle);
  const userStatus = useBuilderStore(builderSelectors.userStatus);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);
  const mustShowWatermark = useBuilderStore(builderSelectors.mustShowWatermark);
  const setTheme = useBuilderStore((state) => state.setTheme);
  const setFont = useBuilderStore((state) => state.setFont);
  const setCardStyle = useBuilderStore((state) => state.setCardStyle);
  const setShapeStyle = useBuilderStore((state) => state.setShapeStyle);
  const setWatermarkEnabled = useBuilderStore((state) => state.setWatermarkEnabled);
  const setUserStatus = useBuilderStore((state) => state.setUserStatus);

  return (
    <div className="space-y-5">
      <BuilderPanelSection
        eyebrow="Appearance"
        title="Backgrounds, typography, and cards"
        description="Free users can see premium presets but locked states are enforced until Pro or Admin access is enabled."
      >
        <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900">Background Themes</h3>
              <span className="text-xs text-slate-500">Selected: {selectedTheme.name}</span>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {THEME_PRESETS.map((option) => (
                <ThemeOption
                  key={option.id}
                  option={option}
                  selected={option.id === selectedTheme.id}
                  locked={option.isPro && !hasProAccess}
                  onClick={() => setTheme(option)}
                />
              ))}
            </div>
          </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900">Fonts</h3>
              <span className="text-xs text-slate-500">Selected: {selectedFont.name}</span>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {FONT_PRESETS.map((option) => (
                <FontOption
                  key={option.id}
                  option={option}
                  selected={option.id === selectedFont.id}
                  locked={option.isPro && !hasProAccess}
                  onClick={() => setFont(option)}
                />
              ))}
            </div>
          </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900">Card Styles</h3>
              <span className="text-xs text-slate-500">Selected: {selectedCardStyle.name}</span>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {CARD_STYLE_PRESETS.map((option) => (
                <CardStyleOptionTile
                  key={option.id}
                  option={option}
                  selected={option.id === selectedCardStyle.id}
                  locked={option.isPro && !hasProAccess}
                  onClick={() => setCardStyle(option)}
                />
              ))}
            </div>
          </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900">Shape Styles</h3>
              <span className="text-xs text-slate-500">Selected: {selectedShapeStyle.name}</span>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {SHAPE_STYLE_PRESETS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  disabled={option.isPro && !hasProAccess}
                  onClick={() => setShapeStyle(option)}
                  className={cn(
                    'relative rounded-[28px] border p-4 text-left transition',
                    option.id === selectedShapeStyle.id
                      ? 'border-rose-200 bg-rose-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
                    option.isPro && !hasProAccess && 'cursor-not-allowed opacity-70',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{option.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Avatar {option.avatarRadius} · Card {option.cardRadius}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {option.isPro ? (
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-700">
                          Pro
                        </span>
                      ) : null}
                      {option.id === selectedShapeStyle.id ? (
                        <span className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-rose-700">
                          Active
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-[22px] border border-gray-200 bg-gray-50 p-4">
                    <div
                      className="h-14 w-14 border border-gray-200 bg-white"
                      style={{
                        borderRadius:
                          option.avatarRadius === 'full'
                            ? '9999px'
                            : option.avatarRadius === '2xl'
                              ? '1.5rem'
                              : option.avatarRadius === 'lg'
                                ? '0.5rem'
                                : '0',
                        boxShadow: option.glow ? '0 0 24px rgba(251, 113, 133, 0.16)' : 'none',
                        borderWidth: `${option.outlineWidth}px`,
                      }}
                    />
                    <div
                      className="h-12 flex-1 border border-gray-200 bg-white"
                      style={{
                        borderRadius:
                          option.cardRadius === 'full'
                            ? '9999px'
                            : option.cardRadius === '2xl'
                              ? '1.5rem'
                              : option.cardRadius === 'lg'
                                ? '0.5rem'
                                : '0',
                        boxShadow: option.glow ? '0 0 24px rgba(251, 113, 133, 0.12)' : 'none',
                        borderWidth: `${option.outlineWidth}px`,
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Built with ItsMe watermark</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Free users must keep the watermark on. Admin can disable it for testing.
                </p>
              </div>
              <Switch checked={!mustShowWatermark} disabled={!hasProAccess} onCheckedChange={(checked) => setWatermarkEnabled(!checked)} />
            </div>
            <p className="mt-3 text-xs text-slate-500">Current state: {mustShowWatermark ? 'Visible on output profile' : 'Hidden for Pro/Admin preview'}</p>
          </div>
        </div>
      </BuilderPanelSection>

      <BuilderPanelSection
        title="Access sandbox"
        description="Temporary toggles for testing restrictions before auth wiring exists. Admin always bypasses Pro locks."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Pro plan</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Unlock premium themes, advanced shapes, and watermark control.</p>
            </div>
            <Switch checked={userStatus.isPro} onCheckedChange={(checked) => setUserStatus({ isPro: checked })} />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Admin override</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Bypass all paid restrictions to test premium states without a Pro account.</p>
            </div>
            <Switch checked={userStatus.isAdmin} onCheckedChange={(checked) => setUserStatus({ isAdmin: checked })} />
          </div>

          <div className="flex items-center justify-between rounded-[24px] border border-gray-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm">
            <span>Effective access</span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-slate-700">{hasProAccess ? 'Pro/Admin' : 'Free user'}</span>
          </div>
        </div>
      </BuilderPanelSection>
    </div>
  );
}
