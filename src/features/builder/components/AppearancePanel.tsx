import { Check } from 'lucide-react';
import { memo, type CSSProperties, type ReactNode } from 'react';
import { Switch } from '../../../components/ui/switch';
import { cn } from '../../../lib/cn';
import { FONT_PRESETS, THEME_PRESETS } from '../config/builderPresets';
import { PROFILE_TEMPLATE_OPTIONS } from '../config/profileTemplates';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import type { FontPreset, ProfileEffectId, ProfileTemplateId, ThemePreset } from '../types';
import { hasProAccess as hasProAccessForStatus, isAdvancedTextColorActive } from '../utils/proFeatureAccess';
import { BuilderPanelSection } from './BuilderPanelSection';

const EFFECT_OPTIONS: Array<{ id: ProfileEffectId; title: string; subtitle: string; emoji: string; isPro: boolean }> = [
  { id: 'none', title: 'Không có hiệu ứng', subtitle: 'Profile tĩnh, không có chuyển động phủ lên.', emoji: '—', isPro: false },
  { id: 'rose-petals', title: 'Cánh hoa bay', subtitle: 'Những cánh hoa hồng rơi nhẹ theo màu nhấn.', emoji: '🌸', isPro: true },
  { id: 'fireflies', title: 'Đóm đóm', subtitle: 'Các đốm sáng nhỏ nổi lên mờ ảo, rất dễ chịu.', emoji: '✨', isPro: true },
  { id: 'starlight', title: 'Ánh sao', subtitle: 'Các ngôi sao và điểm sáng lấp lánh khắp profile.', emoji: '⭐', isPro: true },
];

function EffectOption({ option, selected, trialing, onClick }: { option: (typeof EFFECT_OPTIONS)[number]; selected: boolean; trialing: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-4 rounded-[24px] border p-4 text-left transition dark:border-white/10 dark:bg-[#111111]',
        selected
          ? 'border-rose-200 bg-rose-50 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/10'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:hover:border-white/20 dark:hover:bg-white/[0.05]',
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-2xl dark:border-white/10 dark:bg-white/[0.04]">
        {option.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{option.title}</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{option.subtitle}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        {option.isPro ? (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            Pro
          </span>
        ) : null}
        {trialing ? (
          <span className="text-[10px] uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">Đang thử</span>
        ) : null}
        {selected ? (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-700 dark:border-rose-400/30 dark:bg-white/10 dark:text-rose-200">
            <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
        ) : null}
      </div>
    </button>
  );
}

interface OptionCardProps {
  title: string;
  subtitle: string;
  selected: boolean;
  proBadge?: boolean;
  trialing?: boolean;
  disabled?: boolean;
  onClick: () => void;
  previewStyle?: CSSProperties;
  previewClassName?: string;
  previewText?: string;
  previewContent?: ReactNode;
}

function OptionCard({ title, subtitle, selected, proBadge = false, trialing = false, disabled = false, onClick, previewStyle, previewClassName, previewText, previewContent }: OptionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'relative rounded-[28px] border p-4 text-left transition dark:border-white/10 dark:bg-[#111111]',
        selected
          ? 'border-rose-200 bg-rose-50 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/10'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:hover:border-white/20 dark:hover:bg-white/[0.05]',
        disabled && 'cursor-not-allowed opacity-70',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {proBadge ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              Pro
            </span>
          ) : null}
          {selected ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-700 dark:border-rose-400/30 dark:bg-white/10 dark:text-rose-200">
              <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn('mt-4 rounded-[22px] border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.04]', previewClassName)} style={previewStyle}>
        {previewContent ?? (previewText ? <span className="text-sm font-medium text-slate-900 dark:text-white">{previewText}</span> : null)}
      </div>
    </button>
  );
}

function TemplatePreview({ id }: { id: ProfileTemplateId }) {
  if (id === 'avatar-circle') {
    return (
      <div className="relative h-full overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff7fa_0%,#ffffff_100%)] p-4 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]">
        <div className="absolute left-1/2 top-3 h-12 w-12 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#f9a8d4_0%,#fecdd3_100%)] shadow-[0_10px_24px_rgba(244,114,182,0.22)]" />
        <div className="absolute inset-x-6 bottom-7 h-2 rounded-full bg-rose-100 dark:bg-white/10" />
        <div className="absolute inset-x-10 bottom-3 h-1.5 rounded-full bg-slate-200 dark:bg-white/5" />
      </div>
    );
  }

  if (id === 'editorial-poster') {
    return (
      <div className="relative h-full overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff8fb_0%,#ffffff_100%)] p-3 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]">
        <div className="h-14 rounded-[16px] bg-[linear-gradient(135deg,#f9a8d4_0%,#fecaca_100%)]" />
        <div className="absolute inset-x-5 bottom-4 rounded-[16px] border border-white/60 bg-white/90 p-3 shadow-[0_14px_30px_rgba(244,114,182,0.12)] dark:border-white/10 dark:bg-[#151515]">
          <div className="h-2 w-20 rounded-full bg-slate-800 dark:bg-white/80" />
          <div className="mt-2 h-1.5 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  if (id === 'banner-float') {
    return (
      <div className="relative h-full overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff4fb_0%,#ffffff_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]">
        <div className="absolute inset-x-0 top-0 h-10 bg-[linear-gradient(135deg,#f9a8d4_0%,#fecdd3_100%)]" />
        <div className="absolute inset-x-4 top-6 h-14 rounded-[14px] border border-white/60 bg-white/95 shadow-[0_8px_20px_rgba(244,114,182,0.14)] dark:border-white/10 dark:bg-[#1a1a1a]">
          <div className="mt-3 mx-3 h-2 w-12 rounded-full bg-slate-700 dark:bg-white/70" />
          <div className="mt-1.5 mx-3 h-1.5 w-16 rounded-full bg-slate-300 dark:bg-white/20" />
        </div>
      </div>
    );
  }

  if (id === 'cinematic') {
    return (
      <div className="relative h-full overflow-hidden rounded-[18px]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f9a8d4_0%,#a5b4fc_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(15,15,25,0.88)_100%)]" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="h-2.5 w-16 rounded-full bg-white/90" />
          <div className="mt-1.5 h-1.5 w-20 rounded-full bg-white/50" />
        </div>
      </div>
    );
  }

  if (id === 'ribbon') {
    return (
      <div className="relative h-full overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff7fa_0%,#ffffff_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]">
        <div className="absolute inset-x-0 top-0 h-10 rounded-t-[18px] bg-[linear-gradient(90deg,#fb7185_0%,#f9a8d4_100%)]" />
        <div className="absolute left-1/2 top-6 h-10 w-10 -translate-x-1/2 rounded-full border-2 border-white/80 bg-[linear-gradient(135deg,#fecdd3_0%,#fda4af_100%)] shadow-lg" />
        <div className="absolute inset-x-6 bottom-3 h-1.5 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#ffe4ec_0%,#ffffff_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)]">
      <div className="absolute inset-x-0 top-0 h-11 bg-[linear-gradient(135deg,#fb7185_0%,#fecdd3_100%)]" />
      <div className="absolute inset-x-5 bottom-4 h-2 rounded-full bg-slate-900 dark:bg-white/80" />
      <div className="absolute inset-x-10 bottom-0 h-8 rounded-t-[18px] bg-white shadow-[0_-10px_30px_rgba(244,114,182,0.15)] dark:bg-[#151515]" />
    </div>
  );
}

function TemplateOption({ id, title, subtitle, selected, isPro, trialing, onClick }: { id: ProfileTemplateId; title: string; subtitle: string; selected: boolean; isPro: boolean; trialing: boolean; onClick: () => void }) {
  return (
    <OptionCard
      title={title}
      subtitle={subtitle}
      selected={selected}
      proBadge={isPro}
      trialing={trialing}
      onClick={onClick}
      previewClassName="h-24 p-2"
      previewContent={<TemplatePreview id={id} />}
    />
  );
}

function ThemeOption({ option, selected, onClick, trialing }: { option: ThemePreset; selected: boolean; onClick: () => void; trialing: boolean }) {
  return (
    <OptionCard
      title={option.name}
      subtitle={option.isPro ? 'Preset nâng cao cho người dùng Pro' : 'Preset miễn phí cho mọi tài khoản'}
      selected={selected}
      proBadge={option.isPro}
      trialing={trialing}
      onClick={onClick}
      previewStyle={{ background: option.background }}
      previewClassName="h-24"
    />
  );
}

function FontOption({ option, selected, onClick, trialing }: { option: FontPreset; selected: boolean; onClick: () => void; trialing: boolean }) {
  return (
    <OptionCard
      title={option.name}
      subtitle={option.isPro ? 'Phông chữ nâng cao' : 'Phông chữ mặc định'}
      selected={selected}
      proBadge={option.isPro}
      trialing={trialing}
      onClick={onClick}
      previewText="Aa Hồ sơ nhà sáng tạo"
      previewStyle={{ fontFamily: option.family }}
      previewClassName="flex min-h-[90px] items-center"
    />
  );
}

function ColorInputField({
  label,
  value,
  onChange,
  description,
  proBadge = false,
  trialing = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description: string;
  proBadge?: boolean;
  trialing?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {proBadge ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              Pro
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-16 cursor-pointer rounded-2xl border border-gray-200 bg-white p-1 dark:border-white/10 dark:bg-white/[0.04]"
        />
        <div className="inline-flex h-12 items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium uppercase tracking-[0.14em] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
          {value}
        </div>
      </div>
    </div>
  );
}

function SizeControl({ label, value, min, max, onChange, description }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void; description: string }) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
          {value}px
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-rose-500"
      />
    </div>
  );
}

export const AppearancePanel = memo(function AppearancePanel() {
  const profileData = useBuilderStore((state) => state.profileData);
  const selectedTheme = useBuilderStore((state) => state.profileData.selectedTheme);
  const selectedFont = useBuilderStore((state) => state.profileData.selectedFont);
  const selectedTemplate = useBuilderStore((state) => state.profileData.profileTemplate);
  const selectedEffect = useBuilderStore((state) => state.profileData.profileEffect);
  const userStatus = useBuilderStore(builderSelectors.userStatus);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);
  const mustShowWatermark = useBuilderStore(builderSelectors.mustShowWatermark);
  const brandPromoEnabled = useBuilderStore((state) => state.profileData.brandPromoEnabled);
  const setTheme = useBuilderStore((state) => state.setTheme);
  const setFont = useBuilderStore((state) => state.setFont);
  const setWatermarkEnabled = useBuilderStore((state) => state.setWatermarkEnabled);
  const setProfileField = useBuilderStore((state) => state.setProfileField);
  const isFreeTryingPro = !hasProAccessForStatus(userStatus);

  return (
    <div className="space-y-5">
      <BuilderPanelSection
        eyebrow="Giao diện"
        title="Màu sắc, phông chữ và kích thước"
        description="Bắt đầu từ preset giống landing page, sau đó tinh chỉnh màu nền, màu chữ và cỡ chữ cho đúng gu của bạn."
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Template</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Đang chọn: {PROFILE_TEMPLATE_OPTIONS.find((option) => option.id === selectedTemplate)?.title ?? 'Ảnh nổi bật lớn'}</span>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              {PROFILE_TEMPLATE_OPTIONS.map((option) => (
                <TemplateOption
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  subtitle={option.subtitle}
                  selected={selectedTemplate === option.id}
                  isPro={option.isPro}
                  trialing={selectedTemplate === option.id && option.isPro && isFreeTryingPro}
                  onClick={() => setProfileField('profileTemplate', option.id)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Preset giao diện</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Đang chọn: {selectedTheme.name}</span>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              {THEME_PRESETS.map((option) => (
                <ThemeOption
                  key={option.id}
                  option={option}
                  selected={option.id === selectedTheme.id}
                  trialing={option.id === selectedTheme.id && option.isPro && isFreeTryingPro}
                  onClick={() => setTheme(option)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Phông chữ</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Đang chọn: {selectedFont.name}</span>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              {FONT_PRESETS.map((option) => (
                <FontOption
                  key={option.id}
                  option={option}
                  selected={option.id === selectedFont.id}
                  trialing={option.id === selectedFont.id && option.isPro && isFreeTryingPro}
                  onClick={() => setFont(option)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Bảng màu tuỳ chỉnh</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Free chỉnh màu nền, thẻ và màu nhấn</span>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <ColorInputField label="Màu nền" value={profileData.backgroundColor} onChange={(value) => setProfileField('backgroundColor', value)} description="Màu nền chính của hồ sơ công khai." />
              <ColorInputField label="Màu thẻ" value={profileData.surfaceColor} onChange={(value) => setProfileField('surfaceColor', value)} description="Màu nền cho card sản phẩm và card link." />
              <ColorInputField label="Màu nhấn" value={profileData.accentColor} onChange={(value) => setProfileField('accentColor', value)} description="Màu của icon, pill và nút điều hướng." />
              <ColorInputField label="Màu nhãn phụ" value={profileData.sectionBadgeColor} onChange={(value) => setProfileField('sectionBadgeColor', value)} description="Màu chữ của nhãn nhỏ nằm trên tiêu đề sản phẩm." proBadge trialing={isFreeTryingPro && isAdvancedTextColorActive(profileData, 'sectionBadgeColor')} />
              <ColorInputField label="Màu tên" value={profileData.nameColor} onChange={(value) => setProfileField('nameColor', value)} description="Màu cho tên hiển thị ở phần đầu profile." proBadge trialing={isFreeTryingPro && isAdvancedTextColorActive(profileData, 'nameColor')} />
              <ColorInputField label="Màu mô tả" value={profileData.bioColor} onChange={(value) => setProfileField('bioColor', value)} description="Màu cho đoạn giới thiệu bên dưới tên." proBadge trialing={isFreeTryingPro && isAdvancedTextColorActive(profileData, 'bioColor')} />
              <ColorInputField label="Màu tiêu đề phần" value={profileData.sectionTitleColor} onChange={(value) => setProfileField('sectionTitleColor', value)} description="Màu cho tiêu đề của khối sản phẩm." proBadge trialing={isFreeTryingPro && isAdvancedTextColorActive(profileData, 'sectionTitleColor')} />
              <ColorInputField label="Màu tiêu đề thẻ" value={profileData.cardTitleColor} onChange={(value) => setProfileField('cardTitleColor', value)} description="Màu chữ cho tên link hoặc sản phẩm." proBadge trialing={isFreeTryingPro && isAdvancedTextColorActive(profileData, 'cardTitleColor')} />
              <ColorInputField label="Màu chữ phụ" value={profileData.mutedTextColor} onChange={(value) => setProfileField('mutedTextColor', value)} description="Màu cho URL, mô tả phụ và watermark." proBadge trialing={isFreeTryingPro && isAdvancedTextColorActive(profileData, 'mutedTextColor')} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Kích thước chữ</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Điều chỉnh theo từng nhóm nội dung</span>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <SizeControl label="Nhãn phụ" value={profileData.sectionBadgeSize} min={10} max={18} onChange={(value) => setProfileField('sectionBadgeSize', value)} description="Cỡ chữ của nhãn nhỏ nằm trên tiêu đề sản phẩm." />
              <SizeControl label="Tên hiển thị" value={profileData.displayNameSize} min={24} max={48} onChange={(value) => setProfileField('displayNameSize', value)} description="Cỡ chữ của tên hiển thị ở đầu trang." />
              <SizeControl label="Mô tả" value={profileData.bioSize} min={13} max={24} onChange={(value) => setProfileField('bioSize', value)} description="Cỡ chữ của đoạn giới thiệu ngắn." />
              <SizeControl label="Tiêu đề phần" value={profileData.sectionTitleSize} min={22} max={40} onChange={(value) => setProfileField('sectionTitleSize', value)} description="Cỡ chữ của tiêu đề khối sản phẩm." />
              <SizeControl label="Tiêu đề thẻ" value={profileData.cardTitleSize} min={14} max={24} onChange={(value) => setProfileField('cardTitleSize', value)} description="Cỡ chữ tên sản phẩm hoặc link." />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Hiệu ứng profile</h3>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                Pro
              </span>
            </div>
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Hoạt ảnh trang trí trên trang cá nhân. Màu sẽ theo màu nhấn bạn đã chọn.</p>
            <div className="grid gap-3">
              {EFFECT_OPTIONS.map((option) => (
                <EffectOption
                  key={option.id}
                  option={option}
                  selected={selectedEffect === option.id}
                  trialing={option.isPro && selectedEffect === option.id && isFreeTryingPro}
                  onClick={() => setProfileField('profileEffect', option.id)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Dấu ItsMe</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Hiển thị nhãn ItsMe ở cuối trang. Pro có thể tắt.</p>
              </div>
              <Switch checked={!mustShowWatermark} onCheckedChange={(checked) => setWatermarkEnabled(!checked)} />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{!mustShowWatermark && isFreeTryingPro ? 'Bạn đang thử tắt — cần Pro để áp dụng' : mustShowWatermark ? 'Đang hiển thị' : 'Đã tắt'}</p>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quảng bá ItsMe</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Hiển thị giới thiệu ItsMe trên trang cá nhân. Pro có thể tắt.</p>
              </div>
              <Switch checked={brandPromoEnabled} onCheckedChange={(checked) => setProfileField('brandPromoEnabled', checked)} />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{!brandPromoEnabled && isFreeTryingPro ? 'Bạn đang thử tắt — cần Pro để áp dụng' : brandPromoEnabled ? 'Đang hiển thị' : 'Đã tắt'}</p>
          </div>
        </div>
      </BuilderPanelSection>
    </div>
  );
});
