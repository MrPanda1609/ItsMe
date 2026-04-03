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
];

export const getProfileTemplateOption = (templateId: ProfileTemplateId) => PROFILE_TEMPLATE_OPTIONS.find((option) => option.id === templateId);
