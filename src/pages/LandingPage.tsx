import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProfileCanvas } from '../components/ProfileCanvas';
import { useSites } from '../state';

const featureCards = [
  {
    title: 'Thiết kế profile',
    description: 'Đổi layout, font, nền và ảnh hero để trang nhìn đúng chất của bạn.',
  },
  {
    title: 'Gắn sản phẩm',
    description: 'Mỗi món có hình, note ngắn và link riêng để người xem bấm đúng thứ bạn muốn đẩy.',
  },
  {
    title: 'Xuất bản nhanh',
    description: 'Xong là có link công khai để gắn ở bio, story hoặc inbox.',
  },
];

const niches = ['Beauty', 'Lifestyle', 'Fitness', 'Home picks', 'Daily use'];

const pricing = [
  {
    name: 'Free',
    price: '0đ',
    meta: '/tháng',
    title: 'Đủ để lên trang và chia sẻ ngay.',
    features: ['1 layout cơ bản', '1 font mặc định', 'Nền màu đơn', 'Tối đa 3 sản phẩm'],
  },
  {
    name: 'Pro',
    price: '129k',
    meta: '/tháng',
    title: 'Dành cho KOC cần trang có chất riêng và nhiều sản phẩm hơn.',
    featured: true,
    features: ['Mở toàn bộ layout', 'Đổi font và nền nâng cao', 'Không giới hạn sản phẩm', 'Ẩn nhãn Itsme'],
  },
];

export function LandingPage() {
  const { sites } = useSites();
  const heroSite = sites.find((site) => site.plan === 'pro') ?? sites[0];

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.marketing-page .reveal'));
    if (nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="marketing-page marketing-page--minimal">
      <header className="site-nav-shell">
        <div className="site-nav site-shell">
          <Link to="/" className="brand-lockup">
            <span className="brand-lockup__mark">Itsme</span>
            <span className="brand-lockup__text">Profile KOC custom</span>
          </Link>

          <nav className="site-nav__links" aria-label="Điều hướng chính">
            <a href="#features">Tính năng</a>
            <a href="#pricing">Bảng giá</a>
          </nav>

          <div className="site-nav__actions">
            <Link to="/login" className="button button--ghost">
              Vào builder
            </Link>
            <Link to="/builder" className="button button--primary">
              <span>Tạo profile</span>
              <span className="button__icon">↗</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="app-main">
        <section className="landing-minimal-hero site-shell">
          <div className="landing-minimal-hero__copy reveal">
            <span className="eyebrow">Profile KOC custom</span>
            <h1>Tạo một profile gọn, đẹp và có thể gắn sản phẩm ngay.</h1>
            <p>Giới thiệu bản thân, thêm social, chọn giao diện và gom những món đang muốn đẩy vào một link riêng.</p>

            <div className="hero-actions">
              <Link to="/builder" className="button button--primary">
                <span>Mở builder</span>
                <span className="button__icon">↗</span>
              </Link>
              <Link to={heroSite ? `/u/${heroSite.slug}` : '/login'} className="button button--ghost">
                Xem profile mẫu
              </Link>
            </div>

            <div className="landing-minimal-hero__chips">
              <span>Bio + social</span>
              <span>Layout custom</span>
              <span>Preview realtime</span>
              <span>Link công khai</span>
            </div>
          </div>

          <div className="landing-minimal-hero__preview reveal">
            <div className="landing-minimal-hero__preview-shell">
              <div className="phone-frame landing-minimal-hero__phone">
                <div className="phone-frame__notch" />
                {heroSite ? <ProfileCanvas site={heroSite} mode="device" /> : null}
              </div>

              <div className="landing-minimal-hero__caption">
                <strong>Một link để gắn ở bio.</strong>
                <p>Profile, social và sản phẩm nằm trong cùng một trang nhìn sạch và dễ bấm.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-minimal-features site-shell" id="features">
          <div className="landing-minimal-section-head reveal">
            <span className="eyebrow">Tính năng chính</span>
            <h2>Chỉ giữ những gì thật sự cần cho một landing page KOC.</h2>
          </div>

          <div className="landing-minimal-features__grid reveal">
            {featureCards.map((item) => (
              <article key={item.title} className="landing-minimal-feature-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-minimal-niches site-shell reveal">
          <div className="landing-minimal-niches__inner">
            <strong>Dùng tốt cho</strong>
            <div className="landing-minimal-niches__row">
              {niches.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-minimal-pricing site-shell" id="pricing">
          <div className="landing-minimal-section-head reveal">
            <span className="eyebrow">Bảng giá</span>
            <h2>Bắt đầu thật gọn. Khi cần nhiều tùy biến hơn thì mở Pro.</h2>
          </div>

          <div className="pricing-grid reveal">
            {pricing.map((item) => (
              <article key={item.name} className={`price-card ${item.featured ? 'price-card--featured' : ''}`}>
                <span className="price-card__tag">{item.name}</span>
                <h3>{item.title}</h3>
                <div className="price-card__value">
                  {item.price}
                  <span>{item.meta}</span>
                </div>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to="/builder" className={`button ${item.featured ? 'button--primary' : 'button--ghost'}`}>
                  {item.featured ? 'Mở bản Pro' : 'Bắt đầu miễn phí'}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-minimal-cta site-shell reveal">
          <div className="landing-minimal-cta__inner">
            <h2>Dựng profile xong trong vài phút rồi gắn link đi chia sẻ.</h2>
            <p>Giữ mọi thứ ngắn, rõ và tập trung vào thứ người xem cần bấm.</p>
            <div className="hero-actions hero-actions--center">
              <Link to="/builder" className="button button--primary">
                <span>Tạo profile ngay</span>
                <span className="button__icon">↗</span>
              </Link>
              <Link to={heroSite ? `/u/${heroSite.slug}` : '/login'} className="button button--ghost">
                Xem profile mẫu
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer site-shell">
        <div>
          <Link to="/" className="brand-lockup brand-lockup--dark">
            <span className="brand-lockup__mark">Itsme</span>
            <span className="brand-lockup__text">Profile KOC custom</span>
          </Link>
          <p>Tạo profile riêng cho KOC với bio, social và sản phẩm trong cùng một link.</p>
        </div>

        <nav className="site-footer__links" aria-label="Liên kết cuối trang">
          <Link to="/privacy">Chính sách riêng tư</Link>
          <Link to="/terms">Điều khoản sử dụng</Link>
          <Link to={heroSite ? `/u/${heroSite.slug}` : '/login'}>Profile mẫu</Link>
        </nav>
      </footer>
    </div>
  );
}
