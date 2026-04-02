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
  userStatus: UserStatus;
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
  resetBuilder: () => void;
}

const defaultProfileData: ProfileData = {
  avatar: null,
  displayName: 'Linh KOC',
  bio: 'Daily TikTok beauty picks, flash-sale finds, and campaign-ready creator links.',
  links: [createDefaultLinkItem(), createDefaultProductItem()],
  selectedTheme: DEFAULT_THEME,
  selectedFont: DEFAULT_FONT,
  cardStyle: DEFAULT_CARD_STYLE,
  shapeStyle: DEFAULT_SHAPE_STYLE,
  watermarkEnabled: true,
};

const defaultUserStatus: UserStatus = {
  isPro: false,
  isAdmin: false,
};

const hasProAccess = (userStatus: UserStatus) => userStatus.isPro || userStatus.isAdmin;

const sanitizeProfileData = (profileData: ProfileData, userStatus: UserStatus): ProfileData => {
  const proAccess = hasProAccess(userStatus);

  const selectedTheme = proAccess || !profileData.selectedTheme.isPro ? profileData.selectedTheme : DEFAULT_THEME;
  const selectedFont = proAccess || !profileData.selectedFont.isPro ? profileData.selectedFont : DEFAULT_FONT;
  const cardStyle = proAccess || !profileData.cardStyle.isPro ? profileData.cardStyle : DEFAULT_CARD_STYLE;
  const shapeStyle = proAccess || !profileData.shapeStyle.isPro ? profileData.shapeStyle : DEFAULT_SHAPE_STYLE;

  return {
    ...profileData,
    selectedTheme,
    selectedFont,
    cardStyle,
    shapeStyle,
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

export const useBuilderStore = create<BuilderStore>((set) => ({
  profileData: defaultProfileData,
  userStatus: defaultUserStatus,
  setProfileField: (field, value) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        [field]: value,
      },
    })),
  setUserStatus: (status) =>
    set((state) => {
      const nextUserStatus = {
        ...state.userStatus,
        ...status,
      };

      return {
        userStatus: nextUserStatus,
        profileData: sanitizeProfileData(state.profileData, nextUserStatus),
      };
    }),
  addLink: (type = 'link') =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        links: [...state.profileData.links, type === 'product' ? createDefaultProductItem() : createDefaultLinkItem()],
      },
    })),
  updateLink: (id, patch) =>
    set((state) => ({
      profileData: {
        ...state.profileData,
        links: state.profileData.links.map((item) =>
          item.id === id ? ({ ...item, ...(patch as Partial<typeof item>) } as BuilderItem) : item,
        ),
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
        profileData: {
          ...state.profileData,
          selectedTheme: theme,
        },
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
  resetBuilder: () => ({
    profileData: {
      ...defaultProfileData,
      links: [createDefaultLinkItem(), createDefaultProductItem()],
    },
    userStatus: defaultUserStatus,
  }),
}));

export const builderSelectors = {
  profileData: (state: BuilderStore) => state.profileData,
  userStatus: (state: BuilderStore) => state.userStatus,
  links: (state: BuilderStore) => state.profileData.links,
  hasProAccess: (state: BuilderStore) => hasProAccess(state.userStatus),
  mustShowWatermark: (state: BuilderStore) => !hasProAccess(state.userStatus) || state.profileData.watermarkEnabled,
  availableThemes: () => THEME_PRESETS,
  availableFonts: () => FONT_PRESETS,
  availableCardStyles: () => CARD_STYLE_PRESETS,
  availableShapeStyles: () => SHAPE_STYLE_PRESETS,
};
