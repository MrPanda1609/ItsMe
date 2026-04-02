import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { setMockAuthenticated } from '../mockAuth';

export function LoginPage() {
  const [email, setEmail] = useState('creator@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Vui lòng nhập email và mật khẩu để tiếp tục.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setMockAuthenticated(true);
    window.location.assign('/editor');
  };

  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top_left,rgba(251,113,133,0.14),transparent_28%),linear-gradient(180deg,#fff_0%,#f8fafc_100%)] px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl gap-6 md:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm md:p-10">
          <a href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900">
            ItsMe
          </a>
          <p className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-rose-500">Đăng nhập để vào editor</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">Mock login cho luồng onboarding</h1>
          <p className="mt-4 max-w-[44ch] text-base leading-8 text-slate-600">
            Bản này chưa nối auth thật. Bấm Sign in là lưu session tạm và điều hướng vào workspace dựng profile.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-4">
              <p className="text-sm font-semibold text-slate-900">1. Tạo profile</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">Điền avatar, bio, link và sản phẩm theo flow kéo thả.</p>
            </div>
            <div className="rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-4">
              <p className="text-sm font-semibold text-slate-900">2. Chỉnh giao diện</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">Chọn theme sáng, card bo mềm và preview trực tiếp trên phone mockup.</p>
            </div>
            <div className="rounded-[24px] border border-gray-200 bg-gray-50 px-4 py-4">
              <p className="text-sm font-semibold text-slate-900">3. Xuất profile</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">Sau khi sign in, bạn vào thẳng editor để hoàn thiện profile công khai.</p>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[36px] border border-gray-200 bg-white p-8 shadow-sm md:p-10">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500">Mocked Auth</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Sign in để tiếp tục</h2>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="creator@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter any mock password"
                />
              </div>

              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              Chưa có tài khoản thật. Đây là màn mock để hoàn thiện flow từ landing page sang builder.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
