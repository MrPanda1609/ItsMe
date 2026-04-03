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
import { DEFAULT_PROFILE_TEMPLATE } from '../config/profileTemplates';
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
import { countProducts, getActiveProFeatureLabels, getFreeCompatibleProfile, hasProAccess, isAdvancedTextColorActive, PRO_TEXT_COLOR_FIELDS } from '../utils/proFeatureAccess';

interface BuilderStore {
  profileData: ProfileData;
  publishedProfileData: ProfileData;
  userStatus: UserStatus;
  activeTab: BuilderControlTab;
  hydrateBuilder: (payload: { draftProfileData: ProfileData; publishedProfileData: ProfileData; userStatus: UserStatus }) => void;
  setActiveTab: (tab: BuilderControlTab) => void;
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
  resetProFeaturesToFree: () => void;
  resetBuilder: () => void;
}

type BuilderControlTab = 'profile' | 'links' | 'appearance';

const defaultUserStatus: UserStatus = { isPro: false, isAdmin: false };

const cloneProfileData = (profileData: ProfileData): ProfileData => JSON.parse(JSON.stringify(profileData)) as ProfileData;

const sanitizeProfileData = (profileData: ProfileData, userStatus: UserStatus): ProfileData => {
  return hasProAccess(userStatus) ? profileData : getFreeCompatibleProfile(profileData);
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
    activeTab: 'profile' as BuilderControlTab,
  };
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...createInitialState(),
  hydrateBuilder: ({ draftProfileData, publishedProfileData, userStatus }) =>
    set(() => ({
      userStatus,
      profileData: cloneProfileData(draftProfileData),
      publishedProfileData: sanitizeProfileData(cloneProfileData(publishedProfileData), userStatus),
    })),
  setActiveTab: (tab) =>
    set(() => ({
      activeTab: tab,
    })),
  setProfileField: (field, value) =>
    set((state) => {
      if (field === 'accentColor') {
        const nextAccentColor = value as ProfileData['accentColor'];
        const shouldSyncBadgeColor = state.profileData.sectionBadgeColor === state.profileData.accentColor;

        return {
          profileData: {
            ...state.profileData,
            accentColor: nextAccentColor,
            sectionBadgeColor: shouldSyncBadgeColor ? nextAccentColor : state.profileData.sectionBadgeColor,
          },
        };
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
        profileData: state.profileData,
        publishedProfileData: sanitizeProfileData(state.publishedProfileData, nextUserStatus),
      };
    }),
  addLink: (type = 'link') =>
    set((state) => {
      if (type === 'product' && !hasProAccess(state.userStatus) && countProducts(state.profileData.links) >= 3) {
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
    set((state) => ({
      profileData: {
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
    })),
  setFont: (font) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        selectedFont: font,
      },
    })),
  setCardStyle: (style) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        cardStyle: style,
      },
    })),
  setShapeStyle: (style) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        shapeStyle: style,
      },
    })),
  setWatermarkEnabled: (enabled) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        watermarkEnabled: enabled,
      },
    })),
  saveProfile: () =>
    set((state) => {
      const nextPublishedProfile = cloneProfileData(state.profileData);

      return {
        profileData: cloneProfileData(nextPublishedProfile),
        publishedProfileData: nextPublishedProfile,
      };
    }),
  resetProFeaturesToFree: () =>
    set((state) => ({
      profileData: getFreeCompatibleProfile(state.profileData),
    })),
  resetBuilder: () =>
    set(() => ({
      ...createInitialState(),
    })),
}));

export const builderSelectors = {
  profileData: (state: BuilderStore) => state.profileData,
  publishedProfileData: (state: BuilderStore) => state.publishedProfileData,
  userStatus: (state: BuilderStore) => state.userStatus,
  activeTab: (state: BuilderStore) => state.activeTab,
  links: (state: BuilderStore) => state.profileData.links,
  productCount: (state: BuilderStore) => countProducts(state.profileData.links),
  hasProAccess: (state: BuilderStore) => hasProAccess(state.userStatus),
  canAddMoreProducts: (state: BuilderStore) => hasProAccess(state.userStatus) || countProducts(state.profileData.links) < 3,
  mustShowWatermark: (state: BuilderStore) => state.profileData.watermarkEnabled,
  publishedMustShowWatermark: (state: BuilderStore) => sanitizeProfileData(state.publishedProfileData, state.userStatus).watermarkEnabled,
  activeProFeatureLabels: (state: BuilderStore) => getActiveProFeatureLabels(state.profileData, state.userStatus),
  hasUnsavedChanges: (state: BuilderStore) => JSON.stringify(state.profileData) !== JSON.stringify(state.publishedProfileData),
  availableThemes: () => THEME_PRESETS,
  availableFonts: () => FONT_PRESETS,
  availableCardStyles: () => CARD_STYLE_PRESETS,
  availableShapeStyles: () => SHAPE_STYLE_PRESETS,
};
