import { DEFAULT_CARD_STYLE, DEFAULT_FONT, DEFAULT_SHAPE_STYLE, DEFAULT_THEME } from '../config/builderPresets';
import { DEFAULT_PROFILE_TEMPLATE, getProfileTemplateOption } from '../config/profileTemplates';
import type { BuilderItem, ProfileData, UserStatus } from '../types';

export const PRO_TEXT_COLOR_FIELDS: Array<keyof Pick<ProfileData, 'sectionBadgeColor' | 'nameColor' | 'bioColor' | 'sectionTitleColor' | 'cardTitleColor' | 'mutedTextColor'>> = [
  'sectionBadgeColor',
  'nameColor',
  'bioColor',
  'sectionTitleColor',
  'cardTitleColor',
  'mutedTextColor',
];

export const hasProAccess = (userStatus: UserStatus) => userStatus.isPro || userStatus.isAdmin;

export const countProducts = (links: BuilderItem[]) => links.filter((item) => item.type === 'product').length;

export const isAdvancedTextColorActive = (profileData: ProfileData, field: (typeof PRO_TEXT_COLOR_FIELDS)[number]) => {
  if (field === 'sectionBadgeColor') return profileData.sectionBadgeColor !== profileData.selectedTheme.accentColor;
  if (field === 'bioColor' || field === 'mutedTextColor') return profileData[field] !== profileData.selectedTheme.mutedTextColor;
  return profileData[field] !== profileData.selectedTheme.textColor;
};

export const getActiveProFeatureLabels = (profileData: ProfileData, userStatus: UserStatus) => {
  if (hasProAccess(userStatus)) {
    return [];
  }

  const labels = new Set<string>();

  if (profileData.selectedTheme.isPro) labels.add(`Preset giao diện: ${profileData.selectedTheme.name}`);
  if (profileData.selectedFont.isPro) labels.add(`Phông chữ: ${profileData.selectedFont.name}`);
  if (profileData.cardStyle.isPro) labels.add(`Kiểu thẻ: ${profileData.cardStyle.name}`);
  if (profileData.shapeStyle.isPro) labels.add(`Kiểu bo góc: ${profileData.shapeStyle.name}`);

  const templateOption = getProfileTemplateOption(profileData.profileTemplate);
  if (templateOption?.isPro) labels.add(`Template: ${templateOption.title}`);

  if (PRO_TEXT_COLOR_FIELDS.some((field) => isAdvancedTextColorActive(profileData, field))) {
    labels.add('Màu chữ nâng cao');
  }

  if (!profileData.watermarkEnabled) labels.add('Tắt dấu ItsMe');
  if (!profileData.brandPromoEnabled) labels.add('Tắt popup quảng bá ItsMe');
  if (profileData.profileEffect && profileData.profileEffect !== 'none') {
    const effectLabels: Record<string, string> = { 'rose-petals': 'Cánh hoa bay', 'fireflies': 'Đóm đóm', 'starlight': 'Ánh sao' };
    labels.add(`Hiệu ứng profile: ${effectLabels[profileData.profileEffect] ?? profileData.profileEffect}`);
  }

  const productCount = countProducts(profileData.links);
  if (productCount > 3) labels.add(`Thêm ${productCount} sản phẩm (Free chỉ lưu tối đa 3)`);

  return Array.from(labels);
};

const limitProductsForFree = (links: BuilderItem[]) => {
  let productCount = 0;

  return links.filter((item) => {
    if (item.type !== 'product') {
      return true;
    }

    productCount += 1;
    return productCount <= 3;
  });
};

export const getFreeCompatibleProfile = (profileData: ProfileData): ProfileData => {
  const nextTheme = profileData.selectedTheme.isPro ? DEFAULT_THEME : profileData.selectedTheme;

  return {
    ...profileData,
    selectedTheme: nextTheme,
    selectedFont: profileData.selectedFont.isPro ? DEFAULT_FONT : profileData.selectedFont,
    cardStyle: profileData.cardStyle.isPro ? DEFAULT_CARD_STYLE : profileData.cardStyle,
    shapeStyle: profileData.shapeStyle.isPro ? DEFAULT_SHAPE_STYLE : profileData.shapeStyle,
    profileTemplate: getProfileTemplateOption(profileData.profileTemplate)?.isPro ? DEFAULT_PROFILE_TEMPLATE : profileData.profileTemplate,
    sectionBadgeColor: nextTheme.accentColor,
    nameColor: nextTheme.textColor,
    bioColor: nextTheme.mutedTextColor,
    sectionTitleColor: nextTheme.textColor,
    cardTitleColor: nextTheme.textColor,
    mutedTextColor: nextTheme.mutedTextColor,
    profileEffect: 'none',
    brandPromoEnabled: true,
    watermarkEnabled: true,
    links: limitProductsForFree(profileData.links),
  };
};
