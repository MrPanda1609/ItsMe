import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { applyPlanConstraints, DEFAULT_STYLES, PRODUCT_LIMITS } from '../data';
import { ProfileCanvas } from '../components/ProfileCanvas';
import { useAuth, useSites } from '../state';
import type { Plan, SiteProduct, SiteRecord } from '../types';

const layoutOptions = [
  { value: 'soft-portrait', label: 'Soft Portrait', description: 'Mềm, gần gũi và hợp với trang cần cảm giác cá nhân.' },
  { value: 'framed-showcase', label: 'Framed Showcase', description: 'Rõ khối hơn, phù hợp khi bạn muốn sản phẩm nổi bật ngay từ đầu.' },
  { value: 'editorial-stack', label: 'Editorial Stack', description: 'Canh trái và gọn, hợp với phong cách tối giản hoặc cá tính.' },
] as const;

const fontOptions = [
  { value: 'plus-jakarta', label: 'Geist' },
  { value: 'outfit', label: 'Outfit' },
  { value: 'manrope', label: 'Manrope' },
  { value: 'system', label: 'System UI' },
] as const;

const planOptions: Plan[] = ['free', 'pro'];

function deepCloneSite(site: SiteRecord) {
  return JSON.parse(JSON.stringify(site)) as SiteRecord;
}

function remToNumber(value: string, fallback: number) {
  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function numberToRem(value: number) {
  return `${value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}rem`;
}

function parseAvatarPosition(value: string) {
  const [x = '50%', y = '30%'] = (value || '50% 30%').split(' ');
  const parsedX = Number.parseFloat(x);
  const parsedY = Number.parseFloat(y);

  return {
    x: Number.isFinite(parsedX) ? parsedX : 50,
    y: Number.isFinite(parsedY) ? parsedY : 30,
  };
}

function createProduct(): SiteProduct {
  return {
    id: crypto.randomUUID(),
    name: 'Món mới',
    image: '',
    link: 'https://shopee.vn/',
    tag: '',
    note: 'Viết một câu ngắn: bạn dùng món này khi nào và vì sao muốn giới thiệu nó.',
  };
}

export function BuilderPage() {
  const { user, logout } = useAuth();
  const { sites, saveSite, createSite } = useSites();
  const [activeEditorTab, setActiveEditorTab] = useState<'info' | 'products'>('info');

  const visibleSites = useMemo(() => {
    if (!user) return [];
    return user.role === 'super_admin' ? sites : sites.filter((site) => site.ownerId === user.id);
  }, [sites, user]);

  const [activeSiteId, setActiveSiteId] = useState(visibleSites[0]?.id ?? '');
  const activeSite = useMemo(() => visibleSites.find((site) => site.id === activeSiteId) ?? null, [activeSiteId, visibleSites]);
  const [draft, setDraft] = useState<SiteRecord | null>(activeSite ? deepCloneSite(activeSite) : null);

  useEffect(() => {
    if (visibleSites.length === 0) return;
    if (!visibleSites.some((site) => site.id === activeSiteId)) {
      setActiveSiteId(visibleSites[0].id);
    }
  }, [activeSiteId, visibleSites]);

  useEffect(() => {
    if (activeSite) {
      setDraft(deepCloneSite(activeSite));
    }
  }, [activeSite]);

  const canManagePricing = user?.role === 'super_admin' || Boolean(user?.unlockedAll);
  const isProPlan = draft?.plan === 'pro';
  const canRemoveBranding = isProPlan;
  const freeProductLimitReached = Boolean(draft && !isProPlan && draft.products.length >= PRODUCT_LIMITS.free);
  const hasUnsavedChanges = Boolean(draft && activeSite && JSON.stringify(draft) !== JSON.stringify(activeSite));
  const publicPath = draft ? `/u/${draft.slug}` : '';
  const avatarPosition = parseAvatarPosition(draft?.profile.avatarPosition ?? '50% 30%');

  const updateDraft = (updater: (current: SiteRecord) => SiteRecord) => {
    setDraft((current) => (current ? updater(current) : current));
  };

  const saveChanges = () => {
    if (!draft) return;
    const next = applyPlanConstraints({ ...draft, removeBranding: canRemoveBranding ? draft.removeBranding : false });
    saveSite(next);
    setDraft(deepCloneSite(next));
  };

  const createSiteForCurrentUser = () => {
    if (!user) return;
    const next = createSite(user);
    setActiveSiteId(next.id);
  };

  if (!user || !draft) {
    return null;
  }

  return (
    <div className="builder-page">
      <header className="builder-topbar">
        <div>
          <Link to="/" className="brand-lockup brand-lockup--dark">
            <span className="brand-lockup__mark">Itsme</span>
            <span className="brand-lockup__text">Builder profile KOC</span>
          </Link>
        </div>

        <div className="builder-topbar__actions">
          {user.role === 'super_admin' ? (
            <Link to="/admin" className="button button--ghost">
              Quản trị
            </Link>
          ) : null}
          <button className="button button--ghost" onClick={logout} type="button">
            Thoát
          </button>
          <button className="button button--primary" onClick={saveChanges} type="button">
            {hasUnsavedChanges ? 'Lưu thay đổi' : 'Đã đồng bộ'}
          </button>
        </div>
      </header>

      <main id="app-main" className="builder-layout">
        <section className="builder-sidebar">
          <div className="builder-panel builder-panel--compact">
            <div className="builder-panel__header">
              <div>
                <span className="eyebrow">Trang</span>
                <h2>Chọn profile đang muốn chỉnh</h2>
              </div>
              <button className="button button--ghost" type="button" onClick={createSiteForCurrentUser}>
                Tạo trang
              </button>
            </div>

            <div className="builder-tab-switcher" role="tablist" aria-label="Điều hướng khu vực chỉnh trang">
              <button
                type="button"
                role="tab"
                aria-selected={activeEditorTab === 'info'}
                className={`builder-tab-button ${activeEditorTab === 'info' ? 'builder-tab-button--active' : ''}`}
                onClick={() => setActiveEditorTab('info')}
              >
                Thông tin
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeEditorTab === 'products'}
                className={`builder-tab-button ${activeEditorTab === 'products' ? 'builder-tab-button--active' : ''}`}
                onClick={() => setActiveEditorTab('products')}
              >
                Sản phẩm ({draft.products.length})
              </button>
            </div>
          </div>

          {activeEditorTab === 'info' ? (
            <>
              <div className="builder-panel">
                <div className="builder-panel__header">
                  <div>
                    <span className="eyebrow">Thiết lập</span>
                    <h2>Thông tin chung</h2>
                  </div>
                </div>

                <div className="field-grid field-grid--two">
                  <div>
                    <label htmlFor="siteSwitcher">Trang</label>
                    <select id="siteSwitcher" value={activeSiteId} onChange={(event) => setActiveSiteId(event.target.value)}>
                      {visibleSites.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.profile.name} — {site.slug}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sitePlan">Gói</label>
                    <select
                      id="sitePlan"
                      value={draft.plan}
                      onChange={(event) =>
                        updateDraft((current) =>
                          applyPlanConstraints({
                            ...current,
                            plan: event.target.value as Plan,
                          }),
                        )
                      }
                      disabled={!canManagePricing}
                    >
                      {planOptions.map((plan) => (
                        <option key={plan} value={plan}>
                          {plan === 'pro' ? 'Pro' : 'Free'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="builder-note">
                  Gói hiện tại quyết định số layout, kiểu nền, số lượng sản phẩm và khả năng ẩn nhãn Itsme.
                </p>

                <div className="field-grid">
                  <div>
                    <label htmlFor="siteSlug">Slug</label>
                    <input
                      id="siteSlug"
                      value={draft.slug}
                      onChange={(event) => updateDraft((current) => ({ ...current, slug: event.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                    />
                  </div>
                </div>

                <div className="toggle-row">
                  <div>
                    <strong>Ẩn nhãn Itsme</strong>
                    <p>{canRemoveBranding ? 'Bạn có thể bỏ nhãn Itsme để profile chỉ còn thương hiệu cá nhân của mình.' : 'Bản Free vẫn giữ nhãn Itsme ở cuối profile.'}</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={draft.removeBranding}
                      disabled={!canRemoveBranding}
                      onChange={(event) => updateDraft((current) => ({ ...current, removeBranding: event.target.checked }))}
                    />
                    <span />
                  </label>
                </div>

                <div className="field-grid">
                  <div>
                    <label htmlFor="pageTitle">Tên trang</label>
                    <input
                      id="pageTitle"
                      value={draft.pageTitle}
                      onChange={(event) => updateDraft((current) => ({ ...current, pageTitle: event.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="builder-panel">
                <div className="builder-panel__header">
                  <div>
                    <span className="eyebrow">Nội dung</span>
                    <h2>Profile và phần mở đầu</h2>
                  </div>
                </div>

                <div className="field-grid">
                  <div>
                    <label htmlFor="profileName">Tên hiển thị</label>
                    <input
                      id="profileName"
                      value={draft.profile.name}
                      onChange={(event) => updateDraft((current) => ({ ...current, profile: { ...current.profile, name: event.target.value } }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="profileAvatar">Ảnh chính</label>
                    <input
                      id="profileAvatar"
                      value={draft.profile.avatar}
                      onChange={(event) => updateDraft((current) => ({ ...current, profile: { ...current.profile, avatar: event.target.value } }))}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="field-grid__full">
                    <div className="builder-crop-tool">
                      <div className="builder-crop-tool__header">
                        <div>
                          <strong>Căn chỉnh ảnh</strong>
                          <p>Điều chỉnh vùng hiển thị của ảnh hero trên profile.</p>
                        </div>
                        <button
                          type="button"
                          className="button button--ghost"
                          onClick={() =>
                            updateDraft((current) => ({
                              ...current,
                              profile: { ...current.profile, avatarPosition: '50% 30%' },
                            }))
                          }
                        >
                          Đặt lại
                        </button>
                      </div>

                      <div className="builder-crop-tool__preview">
                        <div className="builder-crop-tool__phone">
                          {draft.profile.avatar ? (
                            <img
                              src={draft.profile.avatar}
                              alt={draft.profile.name}
                              style={{ objectPosition: draft.profile.avatarPosition }}
                            />
                          ) : (
                            <div className="builder-crop-tool__placeholder">Thêm ảnh để bắt đầu căn chỉnh</div>
                          )}
                          <div className="builder-crop-tool__fade" />
                        </div>
                      </div>

                      <div className="builder-crop-tool__controls">
                        <label className="slider-field">
                          <span>Canh ngang</span>
                          <div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={1}
                              value={avatarPosition.x}
                              onChange={(event) =>
                                updateDraft((current) => ({
                                  ...current,
                                  profile: { ...current.profile, avatarPosition: `${event.target.value}% ${parseAvatarPosition(current.profile.avatarPosition).y}%` },
                                }))
                              }
                            />
                            <span>{Math.round(avatarPosition.x)}%</span>
                          </div>
                        </label>

                        <label className="slider-field">
                          <span>Canh dọc</span>
                          <div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={1}
                              value={avatarPosition.y}
                              onChange={(event) =>
                                updateDraft((current) => ({
                                  ...current,
                                  profile: { ...current.profile, avatarPosition: `${parseAvatarPosition(current.profile.avatarPosition).x}% ${event.target.value}%` },
                                }))
                              }
                            />
                            <span>{Math.round(avatarPosition.y)}%</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="profileBio">Bio</label>
                    <textarea
                      id="profileBio"
                      rows={4}
                      value={draft.profile.bio}
                      onChange={(event) => updateDraft((current) => ({ ...current, profile: { ...current.profile, bio: event.target.value } }))}
                    />
                  </div>
                </div>

                <div className="field-grid field-grid--two">
                  <div>
                    <label htmlFor="sectionBadge">Nhãn nhỏ</label>
                    <input
                      id="sectionBadge"
                      value={draft.profile.sectionBadge}
                      onChange={(event) => updateDraft((current) => ({ ...current, profile: { ...current.profile, sectionBadge: event.target.value } }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="sectionTitle">Tiêu đề khối sản phẩm</label>
                    <input
                      id="sectionTitle"
                      value={draft.profile.sectionTitle}
                      onChange={(event) => updateDraft((current) => ({ ...current, profile: { ...current.profile, sectionTitle: event.target.value } }))}
                    />
                  </div>
                </div>

                <div className="field-grid field-grid--two">
                  {(['tiktok', 'instagram', 'youtube', 'facebook'] as const).map((channel) => (
                    <div key={channel}>
                      <label htmlFor={`social-${channel}`}>{channel}</label>
                      <input
                        id={`social-${channel}`}
                        value={draft.profile.social[channel]}
                        onChange={(event) =>
                          updateDraft((current) => ({
                            ...current,
                            profile: { ...current.profile, social: { ...current.profile.social, [channel]: event.target.value } },
                          }))
                        }
                        placeholder={`https://${channel}.com/...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="builder-panel">
                <div className="builder-panel__header">
                  <div>
                    <span className="eyebrow">Giao diện</span>
                    <h2>Style của profile</h2>
                  </div>
                </div>

                <div className="option-card-grid">
                  {layoutOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`option-card ${draft.styles.layout === option.value ? 'option-card--active' : ''}`}
                      disabled={!isProPlan && option.value !== 'soft-portrait'}
                      onClick={() => updateDraft((current) => ({ ...current, styles: { ...current.styles, layout: option.value } }))}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                      {!isProPlan && option.value !== 'soft-portrait' ? <small className="option-card__meta">Pro</small> : null}
                    </button>
                  ))}
                </div>

                <div className="field-grid field-grid--two">
                  <div>
                    <label htmlFor="fontFamily">Phông chữ</label>
                    <select
                      id="fontFamily"
                      value={draft.styles.fontFamily}
                      onChange={(event) => updateDraft((current) => ({ ...current, styles: { ...current.styles, fontFamily: event.target.value as SiteRecord['styles']['fontFamily'] } }))}
                      disabled={!isProPlan}
                    >
                      {fontOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="backgroundType">Nền</label>
                    <select
                      id="backgroundType"
                      value={draft.styles.backgroundType}
                      onChange={(event) => updateDraft((current) => ({ ...current, styles: { ...current.styles, backgroundType: event.target.value as SiteRecord['styles']['backgroundType'] } }))}
                      disabled={!isProPlan}
                    >
                      <option value="solid">Màu đơn</option>
                      <option value="gradient">Chuyển sắc</option>
                      <option value="image">Ảnh</option>
                    </select>
                  </div>
                </div>

                <div className="field-grid field-grid--two">
                  <div>
                    <label htmlFor="bgSolid">Màu nền chính</label>
                    <input
                      id="bgSolid"
                      type="color"
                      value={draft.styles.backgroundSolid}
                      onChange={(event) => updateDraft((current) => ({ ...current, styles: { ...current.styles, backgroundSolid: event.target.value } }))}
                    />
                  </div>

                  {draft.styles.backgroundType === 'gradient' ? (
                    <>
                      <div>
                        <label htmlFor="bgFrom">Gradient từ</label>
                        <input
                          id="bgFrom"
                          type="color"
                          value={draft.styles.backgroundGradientFrom}
                          onChange={(event) => updateDraft((current) => ({ ...current, styles: { ...current.styles, backgroundGradientFrom: event.target.value } }))}
                        />
                      </div>
                      <div>
                        <label htmlFor="bgTo">Gradient đến</label>
                        <input
                          id="bgTo"
                          type="color"
                          value={draft.styles.backgroundGradientTo}
                          onChange={(event) => updateDraft((current) => ({ ...current, styles: { ...current.styles, backgroundGradientTo: event.target.value } }))}
                        />
                      </div>
                    </>
                  ) : null}
                </div>

                {draft.styles.backgroundType === 'image' ? (
                  <div className="field-grid">
                    <div>
                      <label htmlFor="bgImage">URL ảnh nền</label>
                      <input
                        id="bgImage"
                        value={draft.styles.backgroundImage}
                        onChange={(event) => updateDraft((current) => ({ ...current, styles: { ...current.styles, backgroundImage: event.target.value } }))}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ) : null}

                <div className="slider-grid">
                  {[
                    { key: 'nameSize', label: 'Cỡ tên', min: 1.4, max: 2.6, step: 0.05, fallback: 1.85 },
                    { key: 'bioSize', label: 'Cỡ bio', min: 0.8, max: 1.3, step: 0.05, fallback: 0.92 },
                    { key: 'badgeSize', label: 'Cỡ badge', min: 0.55, max: 1, step: 0.05, fallback: 0.68 },
                    { key: 'titleSize', label: 'Cỡ tiêu đề', min: 1, max: 1.8, step: 0.05, fallback: 1.3 },
                  ].map((item) => (
                    <div key={item.key} className="slider-field">
                      <label htmlFor={item.key}>{item.label}</label>
                      <div>
                        <input
                          id={item.key}
                          type="range"
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          value={remToNumber(draft.styles[item.key as keyof typeof DEFAULT_STYLES] as string, item.fallback)}
                          onChange={(event) =>
                            updateDraft((current) => ({
                              ...current,
                              styles: { ...current.styles, [item.key]: numberToRem(Number(event.target.value)) },
                            }))
                          }
                        />
                        <span>{draft.styles[item.key as keyof typeof DEFAULT_STYLES]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {activeEditorTab === 'products' ? (
            <div className="builder-panel">
              <div className="builder-panel__header">
                <div>
                  <span className="eyebrow">Sản phẩm</span>
                  <h2>Danh sách sản phẩm đang muốn giới thiệu</h2>
                </div>
                <button
                  className="button button--ghost"
                  type="button"
                  disabled={freeProductLimitReached}
                  onClick={() => updateDraft((current) => ({ ...current, products: [...current.products, createProduct()] }))}
                >
                  {freeProductLimitReached ? 'Đã chạm giới hạn gói Free' : 'Thêm sản phẩm'}
                </button>
              </div>

              <p className="builder-note">
                Mỗi sản phẩm nên có tên rõ, hình đẹp, link đúng và một câu ngắn nói vì sao bạn đang gắn món đó trên profile. Free tối đa {PRODUCT_LIMITS.free} món.
              </p>

              <div className="product-editor-list">
                {draft.products.length === 0 ? (
                  <div className="empty-state-card">
                    <span className="empty-state-card__eyebrow">Bắt đầu từ món đáng nói nhất</span>
                    <strong>Danh sách sản phẩm đang trống.</strong>
                    <p>Thêm món đầu tiên để người xem có một điểm bấm rõ ràng ngay trên trang của bạn.</p>
                    <button
                      className="button button--primary"
                      type="button"
                      onClick={() => updateDraft((current) => ({ ...current, products: [...current.products, createProduct()] }))}
                    >
                      Thêm sản phẩm đầu tiên
                    </button>
                  </div>
                ) : null}

                {draft.products.map((product) => (
                  <article key={product.id} className="product-editor-card">
                    <div className="product-editor-card__header">
                      <strong>{product.name || 'Món mới'}</strong>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => updateDraft((current) => ({ ...current, products: current.products.filter((item) => item.id !== product.id) }))}
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="field-grid field-grid--two">
                      <div>
                        <label>Tên sản phẩm</label>
                        <input
                          value={product.name}
                          onChange={(event) =>
                            updateDraft((current) => ({
                              ...current,
                              products: current.products.map((item) => (item.id === product.id ? { ...item, name: event.target.value } : item)),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label>Tag</label>
                        <input
                          value={product.tag}
                          onChange={(event) =>
                            updateDraft((current) => ({
                              ...current,
                              products: current.products.map((item) => (item.id === product.id ? { ...item, tag: event.target.value } : item)),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label>Ảnh</label>
                        <input
                          value={product.image}
                          onChange={(event) =>
                            updateDraft((current) => ({
                              ...current,
                              products: current.products.map((item) => (item.id === product.id ? { ...item, image: event.target.value } : item)),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label>Link</label>
                        <input
                          value={product.link}
                          onChange={(event) =>
                            updateDraft((current) => ({
                              ...current,
                              products: current.products.map((item) => (item.id === product.id ? { ...item, link: event.target.value } : item)),
                            }))
                          }
                        />
                      </div>
                      <div className="field-grid__full">
                        <label>Lý do giới thiệu</label>
                        <textarea
                          rows={3}
                          value={product.note}
                          onChange={(event) =>
                            updateDraft((current) => ({
                              ...current,
                              products: current.products.map((item) => (item.id === product.id ? { ...item, note: event.target.value } : item)),
                            }))
                          }
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <aside className="builder-preview-shell">
          <div className="builder-preview-panel">
            <div className="builder-preview-topbar">
              <div className="builder-preview-topbar__path">
                <strong>{draft.slug ? `itsme.vn/${draft.slug}` : 'itsme.vn/your-profile'}</strong>
                <span>{hasUnsavedChanges ? 'Chưa lưu' : 'Đã lưu'}</span>
              </div>

              <div className="builder-preview-actions">
                <Link className="button button--ghost" to={publicPath}>
                  Mở trang
                </Link>
              </div>
            </div>

            <div className="builder-device-wrap">
              <div className="builder-device">
                <div className="builder-device__notch" />
                <ProfileCanvas site={draft} mode="preview" />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
