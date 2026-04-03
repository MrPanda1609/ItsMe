import { create } from 'zustand';
import {
  CARD_STYLE_PRESETS,
  DEFAULT_CARD_STYLE,
  DEFAULT_FONT,
  DEFAULT_SHAPE_STYLE,
  DEFAULT_THEME,
  FONT_PRESETS,
  SHAPE_STYLE_PRESETS,
  THEME_PRESETS,
  createDefaultLinkItem,
  createDefaultProductItem,
} from '../config/builderPresets';
import { createDefaultProfileData } from '../config/defaultProfileData';
import type {
  BuilderBlockType,
  BuilderItem,
  CardStyleOption,
  FontPreset,
  ProfileData,
  ShapeStyleOption,
  ThemePreset,
  UserStatus,
} from '../types';

interface BuilderStore {
  profileData: ProfileData;
  publishedProfileData: ProfileData;
  userStatus: UserStatus;
  hydrateBuilder: (payload: { draftProfileData: ProfileData; publishedProfileData: ProfileData; userStatus: UserStatus }) => void;
  setProfileField: <K extends keyof ProfileData>(field: K, value: ProfileData[K]) => void;
  setUserStatus: (status: Partial<UserStatus>) => void;
  addLink: (type?: BuilderBlockType) => void;
  updateLink: (id: string, patch: Partial<BuilderItem>) => void;
  removeLink: (id: string) => void;
  reorderLinks: (startIndex: number, endIndex: number) => void;
  setTheme: (theme: ThemePreset) => void;
  setFont: (font: FontPreset) => void;
  setCardStyle: (style: CardStyleOption) => void;
  setShapeStyle: (style: ShapeStyleOption) => void;
  setWatermarkEnabled: (enabled: boolean) => void;
  saveProfile: () => void;
  resetBuilder: () => void;
}

const MAX_FREE_PRODUCTS = 3;
const PRO_ONLY_COLOR_FIELDS = new Set<keyof ProfileData>(['sectionBadgeColor', 'nameColor', 'bioColor', 'sectionTitleColor', 'cardTitleColor', 'mutedTextColor']);
const defaultUserStatus: UserStatus = { isPro: false, isAdmin: false };

const cloneProfileData = (profileData: ProfileData): ProfileData => JSON.parse(JSON.stringify(profileData)) as ProfileData;
const hasProAccess = (userStatus: UserStatus) => userStatus.isPro || userStatus.isAdmin;

const limitProductsForFree = (links: BuilderItem[]) => {
  let productCount = 0;

  return links.filter((item) => {
    if (item.type !== 'product') {
      return true;
    }

    productCount += 1;
    return productCount <= MAX_FREE_PRODUCTS;
  });
};

const sanitizeProfileData = (profileData: ProfileData, userStatus: UserStatus): ProfileData => {
  const proAccess = hasProAccess(userStatus);
  const selectedTheme = proAccess || !profileData.selectedTheme.isPro ? profileData.selectedTheme : DEFAULT_THEME;
  const selectedFont = proAccess || !profileData.selectedFont.isPro ? profileData.selectedFont : DEFAULT_FONT;
  const cardStyle = proAccess || !profileData.cardStyle.isPro ? profileData.cardStyle : DEFAULT_CARD_STYLE;
  const shapeStyle = proAccess || !profileData.shapeStyle.isPro ? profileData.shapeStyle : DEFAULT_SHAPE_STYLE;

  return {
    ...profileData,
    links: proAccess ? profileData.links : limitProductsForFree(profileData.links),
    selectedTheme,
    selectedFont,
    cardStyle,
    shapeStyle,
    sectionBadgeColor: proAccess ? profileData.sectionBadgeColor : selectedTheme.accentColor,
    nameColor: proAccess ? profileData.nameColor : selectedTheme.textColor,
    bioColor: proAccess ? profileData.bioColor : selectedTheme.mutedTextColor,
    sectionTitleColor: proAccess ? profileData.sectionTitleColor : selectedTheme.textColor,
    cardTitleColor: proAccess ? profileData.cardTitleColor : selectedTheme.textColor,
    mutedTextColor: proAccess ? profileData.mutedTextColor : selectedTheme.mutedTextColor,
    brandPromoEnabled: proAccess ? profileData.brandPromoEnabled : true,
    watermarkEnabled: proAccess ? profileData.watermarkEnabled : true,
  };
};

const reorder = (items: BuilderItem[], startIndex: number, endIndex: number) => {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(startIndex, 1);

  if (!movedItem) {
    return items;
  }

  nextItems.splice(endIndex, 0, movedItem);
  return nextItems;
};

const createInitialState = () => {
  const defaultProfile = createDefaultProfileData();

  return {
    profileData: cloneProfileData(defaultProfile),
    publishedProfileData: cloneProfileData(defaultProfile),
    userStatus: defaultUserStatus,
  };
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...createInitialState(),
  hydrateBuilder: ({ draftProfileData, publishedProfileData, userStatus }) =>
    set(() => ({
      userStatus,
      profileData: sanitizeProfileData(cloneProfileData(draftProfileData), userStatus),
      publishedProfileData: sanitizeProfileData(cloneProfileData(publishedProfileData), userStatus),
    })),
  setProfileField: (field, value) =>
    set((state) => {
      if (PRO_ONLY_COLOR_FIELDS.has(field) && !hasProAccess(state.userStatus)) {
        return state;
      }

      return {
        profileData: {
          ...state.profileData,
          [field]: value,
        },
      };
    }),
  setUserStatus: (status) =>
    set((state) => {
      const nextUserStatus = { ...state.userStatus, ...status };

      return {
        userStatus: nextUserStatus,
        profileData: sanitizeProfileData(state.profileData, nextUserStatus),
        publishedProfileData: sanitizeProfileData(state.publishedProfileData, nextUserStatus),
      };
    }),
  addLink: (type = 'link') =>
    set((state) => {
      const productCount = state.profileData.links.filter((item) => item.type === 'product').length;

      if (type === 'product' && !hasProAccess(state.userStatus) && productCount >= MAX_FREE_PRODUCTS) {
        return state;
      }

      return {
        profileData: {
          ...state.profileData,
          links: [...state.profileData.links, type === 'product' ? createDefaultProductItem() : createDefaultLinkItem()],
        },
      };
    }),
  updateLink: (id, patch) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        links: state.profileData.links.map((item) => (item.id === id ? ({ ...item, ...(patch as Partial<typeof item>) } as BuilderItem) : item)),
      },
    })),
  removeLink: (id) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        links: state.profileData.links.filter((item) => item.id !== id),
      },
    })),
  reorderLinks: (startIndex, endIndex) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        links: reorder(state.profileData.links, startIndex, endIndex),
      },
    })),
  setTheme: (theme) =>
    set((state) => {
      if (theme.isPro && !hasProAccess(state.userStatus)) {
        return state;
      }

      return {
        profileData: sanitizeProfileData(
          {
            ...state.profileData,
            selectedTheme: theme,
            backgroundColor: theme.backgroundColor,
            surfaceColor: theme.surfaceColor,
            accentColor: theme.accentColor,
            sectionBadgeColor: theme.accentColor,
            nameColor: theme.textColor,
            bioColor: theme.mutedTextColor,
            sectionTitleColor: theme.textColor,
            cardTitleColor: theme.textColor,
            mutedTextColor: theme.mutedTextColor,
          },
          state.userStatus,
        ),
      };
    }),
  setFont: (font) =>
    set((state) => {
      if (font.isPro && !hasProAccess(state.userStatus)) {
        return state;
      }

      return {
        profileData: {
          ...state.profileData,
          selectedFont: font,
        },
      };
    }),
  setCardStyle: (style) =>
    set((state) => {
      if (style.isPro && !hasProAccess(state.userStatus)) {
        return state;
      }

      return {
        profileData: {
          ...state.profileData,
          cardStyle: style,
        },
      };
    }),
  setShapeStyle: (style) =>
    set((state) => {
      if (style.isPro && !hasProAccess(state.userStatus)) {
        return state;
      }

      return {
        profileData: {
          ...state.profileData,
          shapeStyle: style,
        },
      };
    }),
  setWatermarkEnabled: (enabled) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        watermarkEnabled: hasProAccess(state.userStatus) ? enabled : true,
      },
    })),
  saveProfile: () =>
    set((state) => {
      const nextPublishedProfile = sanitizeProfileData(cloneProfileData(state.profileData), state.userStatus);

      return {
        profileData: cloneProfileData(nextPublishedProfile),
        publishedProfileData: nextPublishedProfile,
      };
    }),
  resetBuilder: () =>
    set(() => ({
      ...createInitialState(),
    })),
}));

export const builderSelectors = {
  profileData: (state: BuilderStore) => state.profileData,
  publishedProfileData: (state: BuilderStore) => state.publishedProfileData,
  userStatus: (state: BuilderStore) => state.userStatus,
  links: (state: BuilderStore) => state.profileData.links,
  productCount: (state: BuilderStore) => state.profileData.links.filter((item) => item.type === 'product').length,
  hasProAccess: (state: BuilderStore) => hasProAccess(state.userStatus),
  canAddMoreProducts: (state: BuilderStore) => hasProAccess(state.userStatus) || state.profileData.links.filter((item) => item.type === 'product').length < MAX_FREE_PRODUCTS,
  mustShowWatermark: (state: BuilderStore) => !hasProAccess(state.userStatus) || state.profileData.watermarkEnabled,
  publishedMustShowWatermark: (state: BuilderStore) => !hasProAccess(state.userStatus) || state.publishedProfileData.watermarkEnabled,
  hasUnsavedChanges: (state: BuilderStore) => JSON.stringify(state.profileData) !== JSON.stringify(state.publishedProfileData),
  availableThemes: () => THEME_PRESETS,
  availableFonts: () => FONT_PRESETS,
  availableCardStyles: () => CARD_STYLE_PRESETS,
  availableShapeStyles: () => SHAPE_STYLE_PRESETS,
};
