import type { ProfileTemplateId } from '../types';

export interface ProfileTemplateOption {
  id: ProfileTemplateId;
  title: string;
  subtitle: string;
  isPro: boolean;
}

export const DEFAULT_PROFILE_TEMPLATE: ProfileTemplateId = 'avatar-circle';

export const PROFILE_TEMPLATE_OPTIONS: ProfileTemplateOption[] = [
  {
    id: 'cover-story',
    title: 'Ảnh nổi bật lớn',
    subtitle: 'Ảnh cover tràn đầu trang, tên và nội dung nằm bên dưới.',
    isPro: true,
  },
  {
    id: 'avatar-circle',
    title: 'Avatar tròn',
    subtitle: 'Ảnh hiển thị dạng avatar tròn ở trung tâm, phù hợp creator cá nhân.',
    isPro: false,
  },
  {
    id: 'editorial-poster',
    title: 'Editorial poster',
    subtitle: 'Ảnh chính nằm trong card lớn, phần nội dung nổi phía dưới sang hơn.',
    isPro: true,
  },
  {
    id: 'banner-float',
    title: 'Banner nổi',
    subtitle: 'Ảnh ngắn phía trên, card danh tính nổi overlap lên — cảm giác layered cao cấp.',
    isPro: true,
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    subtitle: 'Ảnh dọc lớn, tên và bio đè trực tiếp lên ảnh qua gradient — như poster phim.',
    isPro: true,
  },
  {
    id: 'ribbon',
    title: 'Ribbon',
    subtitle: 'Strip màu nhấn trên cùng, avatar lớn, typography nổi bật — cá tính nhất.',
    isPro: true,
  },
];

export const getProfileTemplateOption = (templateId: ProfileTemplateId) => PROFILE_TEMPLATE_OPTIONS.find((option) => option.id === templateId);
