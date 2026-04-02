import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main id="app-main" className="public-page public-page--empty">
      <section className="public-empty-card">
        <span className="eyebrow">404</span>
        <h1>Trang này không còn ở đây.</h1>
        <p>Kiểm tra lại địa chỉ hoặc quay về trang chủ để bắt đầu lại từ một nơi rõ ràng hơn.</p>

        <div className="hero-actions">
          <Link to="/" className="button button--primary">
            Về trang chủ
          </Link>
          <Link to="/login" className="button button--ghost">
            Vào không gian chỉnh trang
          </Link>
        </div>
      </section>
    </main>
  );
}
