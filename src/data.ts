import type { DemoAccount, FontKind, Plan, SiteRecord, SiteStyles, UserSession } from './types';

const now = () => new Date().toISOString();

export const PRODUCT_LIMITS = {
  free: 3,
} as const;

export const FONT_STACKS: Record<FontKind, string> = {
  'plus-jakarta': `'Geist', 'Manrope', system-ui, sans-serif`,
  outfit: `'Outfit', 'Geist', system-ui, sans-serif`,
  manrope: `'Manrope', 'Geist', system-ui, sans-serif`,
  system: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
};

export const DEFAULT_STYLES: SiteStyles = {
  layout: 'soft-portrait',
  fontFamily: 'plus-jakarta',
  backgroundType: 'solid',
  backgroundSolid: '#FFF8FA',
  backgroundGradientFrom: '#FFF8FA',
  backgroundGradientTo: '#FFE4ED',
  backgroundImage: '',
  nameSize: '1.85rem',
  nameColor: '#1A1A2E',
  bioSize: '0.92rem',
  bioColor: '#6B7280',
  badgeSize: '0.68rem',
  badgeColor: '#C65F86',
  badgeBg: '#FFF0F5',
  titleSize: '1.3rem',
  titleColor: '#1A1A2E',
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'user-koc-01',
    name: 'Linh An',
    email: 'koc@itsme.vn',
    password: 'demo123',
    role: 'user',
    plan: 'free',
    unlockedAll: false,
  },
  {
    id: 'admin-itsme-01',
    name: 'Itsme Admin',
    email: 'admin@itsme.vn',
    password: 'demo123',
    role: 'super_admin',
    plan: 'pro',
    unlockedAll: true,
  },
];

export const DEMO_HINTS = DEMO_ACCOUNTS.map(({ password, ...account }) => ({
  ...account,
  password,
}));

export const DEMO_USERS: UserSession[] = DEMO_ACCOUNTS.map(({ password: _password, ...user }) => user);

export const SEED_SITES: SiteRecord[] = [
  {
    id: 'site-duongsua',
    ownerId: 'user-koc-01',
    plan: 'free',
    removeBranding: false,
    isPublished: true,
    slug: 'duongsua',
    pageTitle: 'Dương Sứa · profile KOC',
    updatedAt: now(),
    profile: {
      name: 'Dương Sứa',
      bio: 'Mình làm nội dung review và unboxing. Trên trang này là những món mình đã dùng, thấy ổn và muốn gom lại ở một chỗ để mọi người xem nhanh hơn.',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      avatarPosition: '50% 24%',
      sectionBadge: 'Mình đang dùng',
      sectionTitle: 'Những món nên xem trước',
      social: {
        tiktok: 'https://tiktok.com/@duongsua',
        instagram: 'https://instagram.com/pe_review007',
        youtube: 'https://youtube.com/@duongsua',
        facebook: 'https://facebook.com/duongsua',
      },
    },
    styles: {
      ...DEFAULT_STYLES,
      layout: 'soft-portrait',
      fontFamily: 'plus-jakarta',
      backgroundType: 'solid',
      backgroundSolid: '#FFF8FA',
    },
    products: [
      {
        id: 'duong-1',
        name: 'Tai nghe chụp tai để edit clip',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: 'Hot',
        note: 'Đeo lâu vẫn dễ chịu, mình hay dùng khi dựng video ở nhà.',
      },
      {
        id: 'duong-2',
        name: 'Đèn bàn ánh sáng mềm',
        image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: 'Mới',
        note: 'Ánh sáng lên da mềm hơn nên quay cận mặt đỡ bị gắt.',
      },
      {
        id: 'duong-3',
        name: 'Kệ mini để set góc quay',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: '',
        note: 'Nhỏ nhưng gọn, giúp góc quay sản phẩm nhìn sạch hơn rất nhiều.',
      },
    ],
  },
  {
    id: 'site-mai-an-picks',
    ownerId: 'admin-itsme-01',
    plan: 'pro',
    removeBranding: true,
    isPublished: true,
    slug: 'mai-an-picks',
    pageTitle: 'Mai An · profile sản phẩm đang giới thiệu',
    updatedAt: now(),
    profile: {
      name: 'Mai An',
      bio: 'Mình làm nội dung beauty và lifestyle. Đây là profile riêng để gom những món đang dùng, đang quay cùng và sẵn sàng giới thiệu trong từng chiến dịch.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
      avatarPosition: '50% 18%',
      sectionBadge: 'Mình đang gắn link',
      sectionTitle: 'Sản phẩm mình muốn bạn xem trước',
      social: {
        tiktok: 'https://tiktok.com/@maian.picks',
        instagram: 'https://instagram.com/maian.picks',
        youtube: 'https://youtube.com/@maianpicks',
        facebook: '',
      },
    },
    styles: {
      ...DEFAULT_STYLES,
      layout: 'framed-showcase',
      fontFamily: 'outfit',
      backgroundType: 'gradient',
      backgroundSolid: '#FFF6F7',
      backgroundGradientFrom: '#FFF7F5',
      backgroundGradientTo: '#F5EFFF',
      badgeBg: '#FFF1F4',
      badgeColor: '#B14B67',
      nameColor: '#16152A',
      titleColor: '#16152A',
    },
    products: [
      {
        id: 'mai-an-1',
        name: 'Son tint đỏ gạch đi quay',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: 'Bán chạy',
        note: 'Lên màu ổn ngay cả khi quay ngoài trời, hợp những hôm cần gương mặt có điểm nhấn nhanh.',
      },
      {
        id: 'mai-an-2',
        name: 'Serum cấp ẩm trước makeup',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: 'Dùng hằng ngày',
        note: 'Mình hay dùng trước những buổi quay dài để lớp nền mượt hơn và đỡ bị khô giữa ngày.',
      },
      {
        id: 'mai-an-3',
        name: 'Đèn mini để quay tại bàn',
        image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: 'Góc quay',
        note: 'Gọn, dễ kê sát bàn làm việc và đủ sáng để quay review nhanh ngay trong phòng.',
      },
    ],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'profile-koc';

export function normalizePlan(value: string | undefined | null): Plan {
  return value === 'pro' ? 'pro' : 'free';
}

export function applyPlanConstraints(site: SiteRecord): SiteRecord {
  const plan = normalizePlan(site.plan);

  if (plan === 'pro') {
    return {
      ...site,
      plan,
    };
  }

  return {
    ...site,
    plan: 'free',
    removeBranding: false,
    styles: {
      ...site.styles,
      layout: 'soft-portrait',
      fontFamily: 'plus-jakarta',
      backgroundType: 'solid',
      backgroundImage: '',
    },
    products: site.products.slice(0, PRODUCT_LIMITS.free),
  };
}

export function normalizeUserSession(user: UserSession | null): UserSession | null {
  if (!user) return null;

  return {
    ...user,
    plan: normalizePlan(user.plan),
  };
}

export function normalizeSiteRecord(site: SiteRecord): SiteRecord {
  return applyPlanConstraints({
    ...site,
    plan: normalizePlan(site.plan),
    styles: {
      ...DEFAULT_STYLES,
      ...site.styles,
    },
  });
}

export function createBlankSite(owner: UserSession, count: number): SiteRecord {
  const nextPlan: Plan = owner.role === 'super_admin' ? 'pro' : normalizePlan(owner.plan);
  const slug = `${slugify(owner.name)}-${count + 1}`;

  return applyPlanConstraints({
    id: `site-${crypto.randomUUID()}`,
    ownerId: owner.id,
    plan: nextPlan,
    removeBranding: nextPlan === 'pro',
    isPublished: false,
    slug,
    pageTitle: `${owner.name} · profile KOC`,
    updatedAt: now(),
    profile: {
      name: owner.name,
      bio: 'Giới thiệu ngắn bạn là ai, làm nội dung gì và vì sao người xem nên xem các món bên dưới.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      avatarPosition: '50% 24%',
      sectionBadge: 'Đang dùng',
      sectionTitle: 'Món mình muốn giới thiệu',
      social: { tiktok: '', instagram: '', youtube: '', facebook: '' },
    },
    styles: {
      ...DEFAULT_STYLES,
      layout: nextPlan === 'pro' && count % 2 !== 0 ? 'framed-showcase' : 'soft-portrait',
      fontFamily: nextPlan === 'pro' && count % 2 !== 0 ? 'outfit' : 'plus-jakarta',
    },
    products: [
      {
        id: crypto.randomUUID(),
        name: 'Món nên xem đầu tiên',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
        link: 'https://shopee.vn/',
        tag: 'Nên xem',
        note: 'Viết một câu thật cụ thể: bạn dùng món này khi nào và vì sao muốn giới thiệu.',
      },
    ],
  });
}
