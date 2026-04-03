import { type PointerEvent as ReactPointerEvent, useRef } from 'react';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { useBuilderStore } from '../store/useBuilderStore';
import { BuilderPanelSection } from './BuilderPanelSection';
import { ImageUploadField } from './ImageUploadField';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function CoverPositionEditor({
  image,
  positionX,
  positionY,
  onChange,
}: {
  image: string | null;
  positionX: number;
  positionY: number;
  onChange: (positionX: number, positionY: number) => void;
}) {
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!image) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialX: positionX,
      initialY: positionY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const deltaX = ((event.clientX - dragState.startX) / rect.width) * 100;
    const deltaY = ((event.clientY - dragState.startY) / rect.height) * 100;

    onChange(clamp(dragState.initialX - deltaX, 0, 100), clamp(dragState.initialY - deltaY, 0, 100));
  };

  const clearDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Canh ảnh nổi bật</p>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Kéo trực tiếp trên khung để chỉnh vùng crop hiển thị. Nếu cần, dùng thêm thanh căn ngang và dọc ở dưới.</p>
      </div>

      <div
        className="relative mx-auto aspect-[17/16] w-full max-w-[360px] overflow-hidden rounded-[28px] border border-dashed border-gray-200 bg-gray-50 touch-none select-none dark:border-white/10 dark:bg-white/[0.04]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={clearDrag}
        onPointerCancel={clearDrag}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="Ảnh nổi bật"
              className="h-full w-full cursor-grab object-cover active:cursor-grabbing"
              style={{ objectPosition: `${positionX}% ${positionY}%` }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_35%,rgba(15,23,42,0.15)_100%)]" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Tải ảnh hoặc dán URL trước, sau đó kéo để chỉnh vùng crop.
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Căn ngang</p>
            <span className="text-xs text-slate-500 dark:text-slate-400">{Math.round(positionX)}%</span>
          </div>
          <input type="range" min={0} max={100} value={positionX} onChange={(event) => onChange(Number(event.target.value), positionY)} className="mt-3 w-full accent-rose-500" />
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Căn dọc</p>
            <span className="text-xs text-slate-500 dark:text-slate-400">{Math.round(positionY)}%</span>
          </div>
          <input type="range" min={0} max={100} value={positionY} onChange={(event) => onChange(positionX, Number(event.target.value))} className="mt-3 w-full accent-rose-500" />
        </div>
      </div>
    </div>
  );
}

export function ProfileInfoPanel() {
  const coverImage = useBuilderStore((state) => state.profileData.coverImage);
  const coverImagePositionX = useBuilderStore((state) => state.profileData.coverImagePositionX);
  const coverImagePositionY = useBuilderStore((state) => state.profileData.coverImagePositionY);
  const socialLinks = useBuilderStore((state) => state.profileData.socialLinks);
  const displayName = useBuilderStore((state) => state.profileData.displayName);
  const bio = useBuilderStore((state) => state.profileData.bio);
  const sectionBadge = useBuilderStore((state) => state.profileData.sectionBadge);
  const sectionTitle = useBuilderStore((state) => state.profileData.sectionTitle);
  const setProfileField = useBuilderStore((state) => state.setProfileField);

  const updateCoverPosition = (positionX: number, positionY: number) => {
    setProfileField('coverImagePositionX', positionX);
    setProfileField('coverImagePositionY', positionY);
  };

  const updateSocialLink = (platform: keyof typeof socialLinks, value: string) => {
    setProfileField('socialLinks', {
      ...socialLinks,
      [platform]: value,
    });
  };

  return (
    <div className="space-y-5">
      <BuilderPanelSection
        eyebrow="Thông tin hồ sơ"
        title="Ảnh và nội dung chính"
        description="Tải ảnh mẫu hoặc dán URL, sửa tên, mô tả và các dòng nội dung chính. Mọi thay đổi đều đồng bộ ngay sang preview bên phải."
      >
        <div className="space-y-5">
          <ImageUploadField
            label="Ảnh nổi bật"
            hint="Ảnh này sẽ nằm ở phần đầu profile, giống template ngoài landing page. Bạn có thể tải máy lên hoặc dán URL ảnh vào."
            value={coverImage}
            onChange={(value) => {
              setProfileField('coverImage', value);
              setProfileField('coverImagePositionX', 50);
              setProfileField('coverImagePositionY', 50);
            }}
            placeholder="Xem trước ảnh nổi bật"
            previewWrapperClassName="aspect-[3/4] max-w-[180px]"
            imageClassName="object-cover"
          />

          <CoverPositionEditor image={coverImage} positionX={coverImagePositionX} positionY={coverImagePositionY} onChange={updateCoverPosition} />

          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Tên hiển thị
              </label>
              <Input
                id="displayName"
                value={displayName}
                maxLength={50}
                placeholder="Nhập tên hiển thị của bạn"
                className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                onChange={(event) => setProfileField('displayName', event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Mô tả ngắn
              </label>
              <Textarea
                id="bio"
                rows={5}
                maxLength={180}
                value={bio}
                placeholder="Giới thiệu ngắn về nội dung bạn làm, sản phẩm bạn review hoặc cách nhãn hàng liên hệ với bạn."
                className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                onChange={(event) => setProfileField('bio', event.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="sectionBadge" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Dòng “Các bạn hãy tham khảo”
                </label>
                <Input
                  id="sectionBadge"
                  value={sectionBadge}
                  maxLength={40}
                  placeholder="Ví dụ: Các bạn hãy tham khảo"
                  className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                  onChange={(event) => setProfileField('sectionBadge', event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sectionTitle" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Tiêu đề phần sản phẩm
                </label>
                <Input
                  id="sectionTitle"
                  value={sectionTitle}
                  maxLength={80}
                  placeholder="Ví dụ: Sản phẩm yêu thích của mình nhé!"
                  className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                  onChange={(event) => setProfileField('sectionTitle', event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Liên kết mạng xã hội</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Nhập link nào thì nút mạng xã hội đó sẽ hiện trên profile công khai.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="social-facebook" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Facebook
                  </label>
                  <Input
                    id="social-facebook"
                    value={socialLinks.facebook}
                    placeholder="https://facebook.com/..."
                    className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                    onChange={(event) => updateSocialLink('facebook', event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="social-instagram" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Instagram
                  </label>
                  <Input
                    id="social-instagram"
                    value={socialLinks.instagram}
                    placeholder="https://instagram.com/..."
                    className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                    onChange={(event) => updateSocialLink('instagram', event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="social-tiktok" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    TikTok
                  </label>
                  <Input
                    id="social-tiktok"
                    value={socialLinks.tiktok}
                    placeholder="https://tiktok.com/..."
                    className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                    onChange={(event) => updateSocialLink('tiktok', event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="social-zalo" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Zalo
                  </label>
                  <Input
                    id="social-zalo"
                    value={socialLinks.zalo}
                    placeholder="https://zalo.me/..."
                    className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500"
                    onChange={(event) => updateSocialLink('zalo', event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BuilderPanelSection>
    </div>
  );
}
