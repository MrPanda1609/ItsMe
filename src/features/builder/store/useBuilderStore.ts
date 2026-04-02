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
  createDefaultProfileLinks,
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
  publishedProfileData: ProfileData;
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
  saveProfile: () => void;
  resetBuilder: () => void;
}

const PUBLISHED_PROFILE_STORAGE_KEY = 'itsme-builder-published-profile';
const MAX_FREE_PRODUCTS = 3;
const PRO_ONLY_COLOR_FIELDS = new Set<keyof ProfileData>(['sectionBadgeColor', 'nameColor', 'bioColor', 'sectionTitleColor', 'cardTitleColor', 'mutedTextColor']);

const createDefaultProfileData = (): ProfileData => ({
  avatar: null,
  coverImage: '/home.png',
  coverImagePositionX: 50,
  coverImagePositionY: 0,
  socialLinks: {
    facebook: '',
    instagram: '',
    tiktok: '',
    zalo: '',
  },
  displayName: 'Ngiangg',
  bio: 'Chuyên làm review, unboxing\nNhững sp tui review đều ở bên dưới nha',
  sectionBadge: 'Các bạn hãy tham khảo',
  sectionTitle: 'Sản phẩm yêu thích của mình nhé!',
  backgroundColor: DEFAULT_THEME.backgroundColor,
  surfaceColor: DEFAULT_THEME.surfaceColor,
  accentColor: DEFAULT_THEME.accentColor,
  sectionBadgeColor: DEFAULT_THEME.accentColor,
  nameColor: DEFAULT_THEME.textColor,
  bioColor: DEFAULT_THEME.mutedTextColor,
  sectionTitleColor: DEFAULT_THEME.textColor,
  cardTitleColor: DEFAULT_THEME.textColor,
  mutedTextColor: DEFAULT_THEME.mutedTextColor,
  sectionBadgeSize: 10,
  displayNameSize: 32,
  bioSize: 15,
  sectionTitleSize: 28,
  cardTitleSize: 17,
  links: createDefaultProfileLinks(),
  selectedTheme: DEFAULT_THEME,
  selectedFont: DEFAULT_FONT,
  cardStyle: DEFAULT_CARD_STYLE,
  shapeStyle: DEFAULT_SHAPE_STYLE,
  watermarkEnabled: true,
});

const defaultUserStatus: UserStatus = {
  isPro: false,
  isAdmin: false,
};

const cloneProfileData = (profileData: ProfileData): ProfileData => JSON.parse(JSON.stringify(profileData)) as ProfileData;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const mergeProfileData = (fallback: ProfileData, candidate: unknown): ProfileData => {
  if (!isRecord(candidate)) {
    return fallback;
  }

  return {
    ...fallback,
    ...candidate,
    links: Array.isArray(candidate.links) ? (candidate.links as ProfileData['links']) : fallback.links,
    socialLinks: isRecord(candidate.socialLinks) ? { ...fallback.socialLinks, ...candidate.socialLinks } : fallback.socialLinks,
    selectedTheme: isRecord(candidate.selectedTheme) ? { ...fallback.selectedTheme, ...candidate.selectedTheme } : fallback.selectedTheme,
    selectedFont: isRecord(candidate.selectedFont) ? { ...fallback.selectedFont, ...candidate.selectedFont } : fallback.selectedFont,
    cardStyle: isRecord(candidate.cardStyle) ? { ...fallback.cardStyle, ...candidate.cardStyle } : fallback.cardStyle,
    shapeStyle: isRecord(candidate.shapeStyle) ? { ...fallback.shapeStyle, ...candidate.shapeStyle } : fallback.shapeStyle,
  };
};

const loadPublishedProfileData = (): ProfileData => {
  const fallback = createDefaultProfileData();

  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(PUBLISHED_PROFILE_STORAGE_KEY);

    if (!stored) {
      return fallback;
    }

    return mergeProfileData(fallback, JSON.parse(stored));
  } catch {
    return fallback;
  }
};

const persistPublishedProfileData = (profileData: ProfileData) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(PUBLISHED_PROFILE_STORAGE_KEY, JSON.stringify(profileData));
  } catch {
    // ignore storage failures
  }
};

const areProfilesEqual = (left: ProfileData, right: ProfileData) => JSON.stringify(left) === JSON.stringify(right);

const applyThemePreset = (profileData: ProfileData, theme: ThemePreset): ProfileData => ({
  ...profileData,
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
});

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
    watermarkEnabled: proAccess ? profileData.watermarkEnabled : true,
  };
};

const initialPublishedProfileData = sanitizeProfileData(loadPublishedProfileData(), defaultUserStatus);
const initialDraftProfileData = cloneProfileData(initialPublishedProfileData);

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
  profileData: initialDraftProfileData,
  publishedProfileData: initialPublishedProfileData,
  userStatus: defaultUserStatus,
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
      const nextUserStatus = {
        ...state.userStatus,
        ...status,
      };

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
        profileData: applyThemePreset(state.profileData, theme),
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
      const nextPublishedProfile = cloneProfileData(sanitizeProfileData(state.profileData, state.userStatus));
      persistPublishedProfileData(nextPublishedProfile);

      return {
        profileData: cloneProfileData(nextPublishedProfile),
        publishedProfileData: nextPublishedProfile,
      };
    }),
  resetBuilder: () =>
    set(() => {
      const nextDefaultProfile = createDefaultProfileData();
      persistPublishedProfileData(nextDefaultProfile);

      return {
        profileData: cloneProfileData(nextDefaultProfile),
        publishedProfileData: nextDefaultProfile,
        userStatus: defaultUserStatus,
      };
    }),
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
  hasUnsavedChanges: (state: BuilderStore) => !areProfilesEqual(state.profileData, state.publishedProfileData),
  availableThemes: () => THEME_PRESETS,
  availableFonts: () => FONT_PRESETS,
  availableCardStyles: () => CARD_STYLE_PRESETS,
  availableShapeStyles: () => SHAPE_STYLE_PRESETS,
};
