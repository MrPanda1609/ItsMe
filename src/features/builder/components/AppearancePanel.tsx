import type { CSSProperties } from 'react';
import { Switch } from '../../../components/ui/switch';
import { cn } from '../../../lib/cn';
import { FONT_PRESETS, THEME_PRESETS } from '../config/builderPresets';
import { builderSelectors, useBuilderStore } from '../store/useBuilderStore';
import type { FontPreset, ThemePreset } from '../types';
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
        'relative rounded-[28px] border p-4 text-left transition dark:border-white/10 dark:bg-[#111111]',
        selected
          ? 'border-rose-200 bg-rose-50 shadow-sm dark:border-rose-400/30 dark:bg-rose-500/10'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:hover:border-white/20 dark:hover:bg-white/[0.05]',
        locked && 'cursor-not-allowed opacity-70',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {locked ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              Pro
            </span>
          ) : null}
          {selected ? (
            <span className="rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-rose-700 dark:border-rose-400/30 dark:bg-white/10 dark:text-rose-200">
              Đang dùng
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn('mt-4 rounded-[22px] border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.04]', previewClassName)} style={previewStyle}>
        {previewText ? <span className="text-sm font-medium text-slate-900 dark:text-white">{previewText}</span> : null}
      </div>
    </button>
  );
}

function ThemeOption({ option, selected, locked, onClick }: { option: ThemePreset; selected: boolean; locked: boolean; onClick: () => void }) {
  return (
    <OptionCard
      title={option.name}
      subtitle={option.isPro ? 'Preset nâng cao cho người dùng Pro' : 'Preset miễn phí cho mọi tài khoản'}
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
      subtitle={option.isPro ? 'Phông chữ nâng cao' : 'Phông chữ mặc định'}
      selected={selected}
      locked={locked}
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
  locked = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description: string;
  locked?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        {locked ? (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            Pro
          </span>
        ) : null}
      </div>

      <div className={cn('mt-4 flex items-center gap-3', locked && 'opacity-60')}>
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={locked}
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

export function AppearancePanel() {
  const profileData = useBuilderStore((state) => state.profileData);
  const selectedTheme = useBuilderStore((state) => state.profileData.selectedTheme);
  const selectedFont = useBuilderStore((state) => state.profileData.selectedFont);
  const userStatus = useBuilderStore(builderSelectors.userStatus);
  const hasProAccess = useBuilderStore(builderSelectors.hasProAccess);
  const mustShowWatermark = useBuilderStore(builderSelectors.mustShowWatermark);
  const setTheme = useBuilderStore((state) => state.setTheme);
  const setFont = useBuilderStore((state) => state.setFont);
  const setWatermarkEnabled = useBuilderStore((state) => state.setWatermarkEnabled);
  const setUserStatus = useBuilderStore((state) => state.setUserStatus);
  const setProfileField = useBuilderStore((state) => state.setProfileField);

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
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Preset giao diện</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Đang chọn: {selectedTheme.name}</span>
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
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Phông chữ</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Đang chọn: {selectedFont.name}</span>
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
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Bảng màu tuỳ chỉnh</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Free chỉnh màu nền, thẻ và màu nhấn</span>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <ColorInputField label="Màu nền" value={profileData.backgroundColor} onChange={(value) => setProfileField('backgroundColor', value)} description="Màu nền chính của hồ sơ công khai." />
              <ColorInputField label="Màu thẻ" value={profileData.surfaceColor} onChange={(value) => setProfileField('surfaceColor', value)} description="Màu nền cho card sản phẩm và card link." />
              <ColorInputField label="Màu nhấn" value={profileData.accentColor} onChange={(value) => setProfileField('accentColor', value)} description="Màu của icon, pill và nút điều hướng." />
              <ColorInputField label="Màu dòng 'Các bạn hãy tham khảo'" value={profileData.sectionBadgeColor} onChange={(value) => setProfileField('sectionBadgeColor', value)} description="Màu chữ của dòng nhãn nhỏ nằm trên tiêu đề phần sản phẩm." locked={!hasProAccess} />
              <ColorInputField label="Màu tên" value={profileData.nameColor} onChange={(value) => setProfileField('nameColor', value)} description="Màu cho tên hiển thị ở phần đầu profile." locked={!hasProAccess} />
              <ColorInputField label="Màu mô tả" value={profileData.bioColor} onChange={(value) => setProfileField('bioColor', value)} description="Màu cho đoạn giới thiệu bên dưới tên." locked={!hasProAccess} />
              <ColorInputField label="Màu tiêu đề phần" value={profileData.sectionTitleColor} onChange={(value) => setProfileField('sectionTitleColor', value)} description="Màu cho tiêu đề của khối sản phẩm." locked={!hasProAccess} />
              <ColorInputField label="Màu tiêu đề thẻ" value={profileData.cardTitleColor} onChange={(value) => setProfileField('cardTitleColor', value)} description="Màu chữ cho tên link hoặc sản phẩm." locked={!hasProAccess} />
              <ColorInputField label="Màu chữ phụ" value={profileData.mutedTextColor} onChange={(value) => setProfileField('mutedTextColor', value)} description="Màu cho URL, mô tả phụ và watermark." locked={!hasProAccess} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Kích thước chữ</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Điều chỉnh theo từng nhóm nội dung</span>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <SizeControl label="Dòng 'Các bạn hãy tham khảo'" value={profileData.sectionBadgeSize} min={10} max={18} onChange={(value) => setProfileField('sectionBadgeSize', value)} description="Cỡ chữ của dòng nhãn nhỏ nằm trên tiêu đề phần sản phẩm." />
              <SizeControl label="Tên hiển thị" value={profileData.displayNameSize} min={24} max={48} onChange={(value) => setProfileField('displayNameSize', value)} description="Cỡ chữ của tên hiển thị ở đầu trang." />
              <SizeControl label="Mô tả" value={profileData.bioSize} min={13} max={24} onChange={(value) => setProfileField('bioSize', value)} description="Cỡ chữ của đoạn giới thiệu ngắn." />
              <SizeControl label="Tiêu đề phần" value={profileData.sectionTitleSize} min={22} max={40} onChange={(value) => setProfileField('sectionTitleSize', value)} description="Cỡ chữ của tiêu đề khối sản phẩm." />
              <SizeControl label="Tiêu đề thẻ" value={profileData.cardTitleSize} min={14} max={24} onChange={(value) => setProfileField('cardTitleSize', value)} description="Cỡ chữ tên sản phẩm hoặc link." />
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Dấu ItsMe</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Tài khoản miễn phí cần giữ watermark. Pro hoặc quản trị có thể tắt để kiểm thử.</p>
              </div>
              <Switch checked={!mustShowWatermark} disabled={!hasProAccess} onCheckedChange={(checked) => setWatermarkEnabled(!checked)} />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Trạng thái hiện tại: {mustShowWatermark ? 'Đang hiển thị trên hồ sơ' : 'Đã ẩn trong bản xem thử / trang công khai'}</p>
          </div>
        </div>
      </BuilderPanelSection>

      <BuilderPanelSection title="Môi trường kiểm thử quyền truy cập" description="Dùng tạm để kiểm tra trạng thái miễn phí, Pro và quản trị trước khi nối auth thật.">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Gói Pro</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Mở khoá preset nâng cao, font nâng cao và quyền tắt watermark.</p>
            </div>
            <Switch checked={userStatus.isPro} onCheckedChange={(checked) => setUserStatus({ isPro: checked })} />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Quyền quản trị</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Bỏ qua mọi giới hạn trả phí để test nhanh giao diện cao cấp.</p>
            </div>
            <Switch checked={userStatus.isAdmin} onCheckedChange={(checked) => setUserStatus({ isAdmin: checked })} />
          </div>

          <div className="flex items-center justify-between rounded-[24px] border border-gray-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm dark:border-white/10 dark:bg-[#111111] dark:text-slate-300">
            <span>Quyền hiệu lực</span>
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
              {hasProAccess ? 'Pro / Quản trị' : 'Người dùng miễn phí'}
            </span>
          </div>
        </div>
      </BuilderPanelSection>
    </div>
  );
}
