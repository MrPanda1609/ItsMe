import { Link, useParams } from 'react-router-dom';
import { getPublicPageStyle, ProfileCanvas } from '../components/ProfileCanvas';
import { useAuth, useSites } from '../state';

export function PublicProfilePage() {
  const { slug } = useParams();
  const { sites } = useSites();
  const { user } = useAuth();
  const site = sites.find((entry) => entry.slug === slug);

  if (!site) {
    return (
      <main id="app-main" className="public-page public-page--empty">
        <div className="public-empty-card">
          <span className="eyebrow">404</span>
          <h1>Không tìm thấy trang bạn cần.</h1>
          <p>Có thể đường dẫn chưa đúng hoặc trang này hiện không còn được chia sẻ.</p>
          <div className="hero-actions">
            <Link to="/" className="button button--primary">
              Về trang chủ
            </Link>
            {user ? (
              <Link to="/builder" className="button button--ghost">
                Chỉnh trang
              </Link>
            ) : (
              <Link to="/login" className="button button--ghost">
                Tạo trang của bạn
              </Link>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="app-main" className="public-page" style={getPublicPageStyle(site)}>
      <div className="public-topbar">
        <Link to="/" className="brand-lockup brand-lockup--dark">
          <span className="brand-lockup__mark">Itsme</span>
        </Link>
        <div className="public-topbar__actions">
          {user ? <Link to="/builder">Chỉnh trang</Link> : <Link to="/login">Tạo trang của bạn</Link>}
        </div>
      </div>

      <div className="public-canvas-shell">
        <ProfileCanvas site={site} mode="public" />
      </div>
    </main>
  );
}
