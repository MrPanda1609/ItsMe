import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state';

export function LoginPage() {
  const { login, demoHints } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(demoHints[0]?.email ?? '');
  const [password, setPassword] = useState(demoHints[0]?.password ?? 'demo123');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/builder';

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const nextFieldErrors: { email?: string; password?: string } = {};

    if (!trimmedEmail) {
      nextFieldErrors.email = 'Nhập email để tiếp tục.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextFieldErrors.email = 'Email chưa đúng định dạng.';
    }

    if (!trimmedPassword) {
      nextFieldErrors.password = 'Nhập mật khẩu để tiếp tục.';
    }

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      setError('');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const result = await login(trimmedEmail, trimmedPassword);

    if (!result.ok) {
      setError(result.error || 'Không đăng nhập được.');
      setIsSubmitting(false);
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <main id="app-main" className="auth-page">
      <div className="auth-shell">
        <section className="auth-copy">
          <Link to="/" className="brand-lockup brand-lockup--dark">
            <span className="brand-lockup__mark">Itsme</span>
            <span className="brand-lockup__text">Builder profile KOC</span>
          </Link>

          <span className="eyebrow">Tài khoản mẫu</span>
          <h1>Vào thử builder để xem cách tạo một profile KOC custom với bio, giao diện và khối sản phẩm riêng.</h1>
          <p>Bấm một thẻ để điền sẵn thông tin, hoặc nhập tay ở form bên phải.</p>

          <div className="auth-hint-grid">
            {demoHints.map((account) => (
              <button
                key={account.email}
                type="button"
                className="auth-hint-card"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                  setFieldErrors({});
                  setError('');
                }}
                >
                  <strong>{account.name}</strong>
                  <span>{account.role === 'super_admin' ? 'Quản trị' : 'Người tạo nội dung'}</span>
                  <small>{account.email} · mật khẩu: {account.password}</small>
                </button>
              ))}
            </div>
        </section>

        <section className="auth-form-card">
          <form className="auth-form" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((current) => ({ ...current, email: undefined }));
                  }
                }}
                placeholder="admin@itsme.vn"
                autoComplete="email"
                inputMode="email"
                required
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email ? (
                <p id="email-error" className="form-error" role="alert">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((current) => ({ ...current, password: undefined }));
                  }
                }}
                placeholder="demo123"
                autoComplete="current-password"
                required
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              />
              {fieldErrors.password ? (
                <p id="password-error" className="form-error" role="alert">
                  {fieldErrors.password}
                </p>
              ) : null}
            </div>

            {error ? (
              <p className="form-error" role="alert">
                {error}
              </p>
            ) : null}

            <button className="button button--primary button--block" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang mở không gian...' : 'Tiếp tục'}
            </button>

            <p className="auth-form__meta">Nội dung bạn lưu sẽ được giữ trên trình duyệt đang dùng trong bản hiện tại.</p>
          </form>
        </section>
      </div>
    </main>
  );
}
