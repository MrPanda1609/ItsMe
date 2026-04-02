import { Link } from 'react-router-dom';
import { useAuth, useSites } from '../state';

export function AdminPage() {
  const { user } = useAuth();
  const { sites, demoUsers } = useSites();

  const publishedSites = sites.filter((site) => site.isPublished).length;
  const freeSites = sites.filter((site) => site.plan === 'free').length;
  const proSites = sites.filter((site) => site.plan === 'pro').length;

  return (
    <main id="app-main" className="admin-page site-shell">
      <header className="admin-header">
        <div>
          <span className="eyebrow">Quản trị hệ thống</span>
          <h1>Tổng quan nhanh về các trang đang có trong hệ thống.</h1>
          <p>{user?.name} có thể xem số lượng trang, gói đang dùng và mở nhanh từng trang công khai từ đây.</p>
        </div>
        <div className="admin-header__actions">
          <Link to="/builder" className="button button--primary">
            Về chỉnh trang
          </Link>
        </div>
      </header>

      <section className="admin-stats-grid">
        <article className="stat-card">
          <span>Trang Free</span>
          <strong>{freeSites}</strong>
        </article>
        <article className="stat-card">
          <span>Trang Pro</span>
          <strong>{proSites}</strong>
        </article>
        <article className="stat-card">
          <span>Đã xuất bản</span>
          <strong>{publishedSites}</strong>
        </article>
        <article className="stat-card">
          <span>Tài khoản mẫu</span>
          <strong>{demoUsers.length}</strong>
        </article>
      </section>

      <section className="admin-grid">
        <article className="admin-card">
          <div className="admin-card__header">
            <span className="eyebrow">Tài khoản</span>
            <h2>Tài khoản mẫu</h2>
          </div>

          <div className="admin-list">
            {demoUsers.map((entry) => (
              <div key={entry.id} className="admin-list__row">
                <div>
                  <strong>{entry.name}</strong>
                  <p>{entry.email}</p>
                </div>
                <div className="pill-row">
                  <span className="pill">{entry.role === 'super_admin' ? 'quản trị' : 'KOC'}</span>
                  <span className="pill">{entry.plan === 'pro' ? 'Pro' : 'Free'}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <div className="admin-card__header">
            <span className="eyebrow">Trang</span>
            <h2>Các trang hiện có</h2>
          </div>

          <div className="admin-list">
            {sites.map((site) => (
              <div key={site.id} className="admin-list__row admin-list__row--stacked">
                <div>
                  <strong>{site.profile.name}</strong>
                  <p>
                    itsme.vn/{site.slug} · {site.pageTitle}
                  </p>
                </div>

                <div className="pill-row">
                  <span className="pill">{site.plan === 'pro' ? 'Pro' : 'Free'}</span>
                  <span className="pill">{site.isPublished ? 'đã xuất bản' : 'bản nháp'}</span>
                  <span className="pill">{site.removeBranding ? 'ẩn nhãn' : 'hiện nhãn Itsme'}</span>
                </div>

                <div className="admin-card__links">
                  <Link to={`/u/${site.slug}`}>Mở trang</Link>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
