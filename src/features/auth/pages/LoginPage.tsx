import { useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useAppExperience } from '../../../providers/AppExperienceProvider';
import { setMockAuthenticated } from '../mockAuth';

const loginBenefits = [
  {
    step: '01',
    title: 'Thiết kế nhanh chóng',
    description: 'Kéo thả dễ dàng, không cần code.',
  },
  {
    step: '02',
    title: 'Giao diện Premium',
    description: 'Nổi bật cá tính, thu hút nhãn hàng.',
  },
  {
    step: '03',
    title: 'Tối ưu chuyển đổi',
    description: 'Analytics chi tiết cho từng lượt click.',
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#EA4335" d="M12.24 10.285v3.821h5.445c-.234 1.506-1.757 4.416-5.445 4.416-3.278 0-5.951-2.717-5.951-6.071s2.673-6.071 5.951-6.071c1.866 0 3.113.795 3.827 1.48l2.608-2.53C17.001 3.776 14.892 3 12.24 3 7.545 3 3.75 6.805 3.75 11.5S7.545 20 12.24 20c6.087 0 8.49-4.244 8.49-6.432 0-.432-.047-.763-.104-1.093H12.24Z" />
      <path fill="#34A853" d="M3.75 11.5c0 1.517.559 2.902 1.482 3.966l2.924-2.26A5.953 5.953 0 0 1 6.289 11.5c0-.589.085-1.159.243-1.697L3.57 7.544A8.454 8.454 0 0 0 3.75 11.5Z" />
      <path fill="#FBBC05" d="M12.24 20c2.652 0 4.875-.872 6.5-2.365l-3.161-2.446c-.848.595-1.931.994-3.339.994-2.829 0-5.231-1.91-6.084-4.477l-3.011 2.321C4.757 17.342 8.187 20 12.24 20Z" />
      <path fill="#4285F4" d="M18.74 17.635c1.885-1.734 2.99-4.287 2.99-7.228 0-.432-.047-.763-.104-1.093H12.24v3.821h5.445c-.112.721-.533 1.772-1.345 2.579l2.4 1.921Z" />
    </svg>
  );
}

export function LoginPage() {
  const { mode } = useAppExperience();
  const isDark = mode === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completeLogin = () => {
    setMockAuthenticated(true);
    window.location.assign('/editor');
  };

  const handleGoogleSignIn = () => {
    setError('');
    setIsSubmitting(true);
    completeLogin();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Vui lòng nhập email và mật khẩu để tiếp tục.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Vui lòng nhập đúng định dạng email.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    completeLogin();
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-transparent px-6 py-8 md:px-10 md:py-12">
      <div className={`pointer-events-none absolute inset-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[linear-gradient(180deg,#fcfcfd_0%,#f8fafc_100%)]'}`} />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[380px] blur-3xl ${
          isDark
            ? 'bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.12),transparent_52%)]'
            : 'bg-[radial-gradient(circle_at_top_left,rgba(251,113,133,0.16),transparent_34%)]'
        }`}
      />
      <div
        className={`pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-3xl ${
          isDark ? 'bg-rose-500/8' : 'bg-rose-100/90'
        }`}
      />

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-stretch gap-6 md:grid-cols-[0.95fr_1.05fr]">
        <section className="h-full">
          <div className="h-full rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <a href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-white">
              ItsMe
            </a>

            <p className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-rose-500 dark:text-rose-300">Creator workspace</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">Chào mừng trở lại!</h1>
            <p className="mt-4 max-w-[44ch] text-base leading-8 text-slate-600 dark:text-gray-400">
              Tiếp tục xây dựng KOC Profile của bạn và bứt phá doanh thu affiliate.
            </p>

            <div className="mt-10 space-y-4">
              {loginBenefits.map((benefit) => (
                <div
                  key={benefit.step}
                  className="rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-white text-xs font-semibold tracking-[0.18em] text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-rose-300">
                      {benefit.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{benefit.title}</p>
                      <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="h-full">
          <div className="flex h-full w-full flex-col justify-center rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500 dark:text-rose-300">Welcome back</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Đăng nhập</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">Quản lý profile, cập nhật sản phẩm và theo dõi hiệu quả chuyển đổi trong một nơi.</p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)] active:translate-y-px dark:border-white/10 dark:bg-white dark:text-slate-900"
              >
                <GoogleIcon />
                <span>Tiếp tục với Google</span>
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs font-medium uppercase tracking-[0.22em] text-slate-400 dark:bg-[#111111] dark:text-gray-500">Hoặc</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-gray-200">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="creator@itsme.vn"
                  autoComplete="email"
                  className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-rose-400 dark:focus:ring-rose-500/10"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-gray-200">
                    Mật khẩu
                  </label>
                  <a
                    href="mailto:support@itsme.vn?subject=Kh%C3%B4i%20ph%E1%BB%A5c%20m%E1%BA%ADt%20kh%E1%BA%A9u"
                    className="text-sm font-medium text-slate-500 transition hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-300"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  autoComplete="current-password"
                  className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-rose-400 dark:focus:ring-rose-500/10"
                />
              </div>

              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">{error}</p> : null}

              <Button
                type="submit"
                className="w-full border-transparent bg-rose-500 text-white shadow-[0_18px_40px_rgba(244,63,94,0.22)] hover:bg-rose-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm leading-7 text-slate-500 dark:text-gray-400">
              Chưa có tài khoản?{' '}
              <a href="/signup" className="font-semibold text-rose-500 transition hover:text-rose-400 dark:text-rose-300 dark:hover:text-rose-200">
                Đăng ký miễn phí
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
