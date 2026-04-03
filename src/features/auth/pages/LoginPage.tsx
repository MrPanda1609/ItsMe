import { ArrowLeft } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { supabase } from '../../../lib/supabase';
import { useAppExperience } from '../../../providers/AppExperienceProvider';
import { useAuth } from '../../../providers/AuthProvider';

const authBenefits = [
  {
    step: '01',
    title: 'Profile riêng cho từng tài khoản',
    description: 'Mỗi creator có một builder riêng, lưu draft và public profile tách biệt.',
  },
  {
    step: '02',
    title: 'Link public theo user id',
    description: 'Xuất bản tại đường dẫn riêng để bạn chia sẻ trực tiếp với nhãn hàng hoặc follower.',
  },
  {
    step: '03',
    title: 'Chỉnh sửa rồi mới xuất bản',
    description: 'Bạn thao tác trong builder, bấm lưu rồi public page mới cập nhật đúng phiên bản đã chốt.',
  },
];

interface LoginPageProps {
  mode: 'login' | 'signup';
}

const getAuthErrorMessage = (message: string) => {
  const normalized = message.toLowerCase();

  if (normalized.includes('invalid login credentials')) {
    return 'Email hoặc mật khẩu chưa đúng.';
  }

  if (normalized.includes('user already registered')) {
    return 'Email này đã được đăng ký.';
  }

  if (normalized.includes('password should be at least')) {
    return 'Mật khẩu cần có ít nhất 6 ký tự.';
  }

  return 'Đã có lỗi xảy ra. Vui lòng thử lại.';
};

export function LoginPage({ mode }: LoginPageProps) {
  const { mode: themeMode } = useAppExperience();
  const { isConfigured } = useAuth();
  const isDark = themeMode === 'dark';
  const isSignup = mode === 'signup';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('landing-scrollbar-hidden');
    document.body.classList.add('landing-scrollbar-hidden');

    return () => {
      document.documentElement.classList.remove('landing-scrollbar-hidden');
      document.body.classList.remove('landing-scrollbar-hidden');
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured || !supabase) {
      setError('Hệ thống chưa sẵn sàng. Vui lòng liên hệ quản trị viên.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Vui lòng nhập email và mật khẩu để tiếp tục.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Vui lòng nhập đúng định dạng email.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });

        if (signUpError) {
          throw signUpError;
        }

        if (!data.session) {
          setSuccessMessage('Tài khoản đã được tạo. Hãy kiểm tra email để xác nhận rồi đăng nhập.');
        }

        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (signInError) {
        throw signInError;
      }
    } catch (caughtError) {
      const nextMessage = caughtError instanceof Error ? getAuthErrorMessage(caughtError.message) : 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(nextMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-transparent px-6 py-8 md:px-10 md:py-12">
      <div className={`pointer-events-none absolute inset-0 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[linear-gradient(180deg,#fcfcfd_0%,#f8fafc_100%)]'}`} />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[380px] blur-3xl ${
          isDark ? 'bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.12),transparent_52%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(251,113,133,0.16),transparent_34%)]'
        }`}
      />
      <div className={`pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-3xl ${isDark ? 'bg-rose-500/8' : 'bg-rose-100/90'}`} />

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-stretch gap-6 md:grid-cols-[0.95fr_1.05fr]">
        <section className="h-full">
          <div className="h-full rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-rose-500 dark:text-white dark:hover:text-rose-300">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              <span className="uppercase tracking-[0.3em]">ItsMe</span>
            </a>

            <p className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-rose-500 dark:text-rose-300">Tài khoản</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">{isSignup ? 'Tạo tài khoản mới' : 'Chào mừng quay lại!'}</h1>
            <p className="mt-4 max-w-[44ch] text-base leading-8 text-slate-600 dark:text-gray-400">
              {isSignup
                ? 'Tạo tài khoản để bắt đầu thiết kế trang cá nhân, trưng bày sản phẩm và chia sẻ link với mọi người.'
                : 'Đăng nhập để tiếp tục chỉnh sửa trang cá nhân và quản lý nội dung của bạn.'}
            </p>

            <div className="mt-10 space-y-4">
              {authBenefits.map((benefit) => (
                <div key={benefit.step} className="rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
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
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500 dark:text-rose-300">{isSignup ? 'Đăng ký' : 'Đăng nhập'}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{isSignup ? 'Tạo tài khoản' : 'Đăng nhập'}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
                {isSignup
                  ? 'Dùng email và mật khẩu để tạo tài khoản. Sau đó mỗi tài khoản sẽ có profile riêng và link public riêng.'
                  : 'Dùng email và mật khẩu để đăng nhập vào builder và tiếp tục chỉnh sửa profile của bạn.'}
              </p>
            </div>

            {!isConfigured ? (
              <div className="mt-8 rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-7 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                Hệ thống đăng nhập chưa sẵn sàng. Vui lòng liên hệ quản trị viên để được hỗ trợ.
              </div>
            ) : null}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                  {!isSignup ? (
                    <a href="mailto:support@itsme.vn?subject=Kh%C3%B4i%20ph%E1%BB%A5c%20m%E1%BA%ADt%20kh%E1%BA%A9u" className="text-sm font-medium text-slate-500 transition hover:text-rose-500 dark:text-gray-400 dark:hover:text-rose-300">
                      Quên mật khẩu?
                    </a>
                  ) : null}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isSignup ? 'Tạo mật khẩu của bạn' : 'Nhập mật khẩu của bạn'}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  className="dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-rose-400 dark:focus:ring-rose-500/10"
                />
              </div>

              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">{error}</p> : null}
              {successMessage ? <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">{successMessage}</p> : null}

              <Button
                type="submit"
                className="w-full border-transparent bg-rose-500 text-white shadow-[0_18px_40px_rgba(244,63,94,0.22)] hover:bg-rose-400"
                disabled={isSubmitting || !isConfigured}
              >
                {isSubmitting ? (isSignup ? 'Đang tạo tài khoản...' : 'Đang đăng nhập...') : isSignup ? 'Tạo tài khoản' : 'Đăng nhập'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm leading-7 text-slate-500 dark:text-gray-400">
              {isSignup ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
              <a href={isSignup ? '/login' : '/signup'} className="font-semibold text-rose-500 transition hover:text-rose-400 dark:text-rose-300 dark:hover:text-rose-200">
                {isSignup ? 'Quay lại đăng nhập' : 'Đăng ký miễn phí'}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
