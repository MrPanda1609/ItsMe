import { Link } from 'react-router-dom';

type LegalKind = 'privacy' | 'terms';

const LEGAL_CONTENT: Record<
  LegalKind,
  {
    eyebrow: string;
    title: string;
    intro: string;
    sections: Array<{ title: string; body: string; bullets?: string[] }>;
  }
> = {
  privacy: {
    eyebrow: 'Chính sách riêng tư',
    title: 'Nội dung bạn chỉnh được giữ trên thiết bị đang dùng.',
    intro:
      'Trong bản hiện tại, một số dữ liệu như trạng thái đăng nhập và nội dung trang sẽ được lưu trên trình duyệt để bạn mở lại vẫn thấy phần mình đã chỉnh.',
    sections: [
      {
        title: 'Những gì được lưu',
        body: 'Hệ thống có thể lưu tài khoản bạn đang dùng và nội dung bạn chỉnh như tên, bio, link, giao diện và danh sách sản phẩm.',
      },
      {
        title: 'Dữ liệu được dùng để làm gì',
        body: 'Mục đích là giữ lại trạng thái làm việc trên chính thiết bị này để bạn không phải nhập lại mọi thứ sau mỗi lần mở trang.',
      },
      {
        title: 'Khi nào dữ liệu có thể biến mất',
        body: 'Nếu bạn xoá dữ liệu trình duyệt, đổi thiết bị hoặc đặt lại dữ liệu, những gì đã lưu có thể không còn hiển thị nữa.',
        bullets: ['Trạng thái đăng nhập có thể bị xoá.', 'Các trang bạn vừa chỉnh có thể trở về dữ liệu ban đầu.', 'Nên tránh dùng nội dung quan trọng như nơi lưu trữ lâu dài.'],
      },
    ],
  },
  terms: {
    eyebrow: 'Điều khoản sử dụng',
    title: 'Itsme đang cung cấp một bản trải nghiệm để bạn tạo, xem và chia sẻ profile KOC.',
    intro:
      'Bạn có thể dùng khu vực đăng nhập, chỉnh trang và xem trang công khai để cảm nhận cách nội dung được trình bày trong bản hiện tại.',
    sections: [
      {
        title: 'Phạm vi sử dụng',
        body: 'Bạn có thể chỉnh thông tin cá nhân, thêm sản phẩm, đổi giao diện và mở trang công khai từ một đường dẫn riêng.',
      },
      {
        title: 'Một số giới hạn hiện tại',
        body: 'Một vài phần nâng cao vẫn đang được hoàn thiện, vì vậy trải nghiệm và nội dung hiển thị có thể thay đổi theo từng giai đoạn cập nhật.',
      },
      {
        title: 'Điều cần lưu ý',
        body: 'Hãy ưu tiên dùng dữ liệu mẫu hoặc nội dung phù hợp để trải nghiệm luồng tạo trang trong giai đoạn này.',
        bullets: ['Dữ liệu chủ yếu được giữ trên trình duyệt đang dùng.', 'Một số chức năng có thể thay đổi khi hệ thống được cập nhật.', 'Không nên xem đây là nơi lưu trữ lâu dài cho nội dung quan trọng.'],
      },
    ],
  },
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const content = LEGAL_CONTENT[kind];

  return (
    <main id="app-main" className="legal-page site-shell">
      <Link to="/" className="brand-lockup brand-lockup--dark">
        <span className="brand-lockup__mark">Itsme</span>
        <span className="brand-lockup__text">Thông tin pháp lý</span>
      </Link>

      <header className="legal-header">
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
        </div>

        <p>{content.intro}</p>

        <div className="hero-actions">
          <Link to="/" className="button button--primary">
            Về trang chủ
          </Link>
          <Link to="/login" className="button button--ghost">
            Vào không gian chỉnh trang
          </Link>
        </div>
      </header>

      <section className="legal-content">
        {content.sections.map((section) => (
          <article key={section.title} className="legal-article">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.bullets ? (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <p className="legal-footer">Thông tin trên mô tả cách bản hiện tại đang lưu và hiển thị dữ liệu.</p>
    </main>
  );
}
