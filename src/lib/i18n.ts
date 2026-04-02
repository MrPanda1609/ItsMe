import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      theme: {
        dark: 'Dark mode',
        light: 'Light mode',
      },
      landing: {
        nav: {
          login: 'Đăng nhập',
        },
        hero: {
          eyebrow: 'Immersive profile builder cho creator',
          line1: 'Tạo profile',
          line2: 'đậm chất thương hiệu',
          line3: 'ngay từ cú chạm đầu tiên',
          subheading:
            'Landing page chuyển từ tĩnh sang cinematic: mượt hơn, sâu hơn, và đủ wow-factor để kéo creator đi tiếp từ login vào builder.',
          primaryCta: 'Bắt đầu miễn phí',
          secondaryCta: 'Xem bảng giá',
          statLabel: 'Creator-first flow',
          statValue: 'Landing → Login → Builder',
          statNote: 'Dark premium mặc định, có toggle light mode và nền Vanta phản ứng theo chuột.',
          splineLoading: 'Đang tải 3D scene',
          splineTag: 'Spline scene · temp asset',
        },
        sections: {
          featuresEyebrow: 'Features stage',
          featuresTitle: 'Pinning + scrub sẽ vào bước tiếp theo',
          featuresBody:
            'Tôi chỉ dựng shell kính và glow scroll-ready ở bước này. Phần GSAP pinning cho Features sẽ tách riêng sau khi bạn duyệt Hero.',
          pricingEyebrow: 'Pricing stage',
          pricingTitle: 'Pricing cards sẽ được animate riêng ở lượt kế tiếp',
          pricingBody:
            'Hiện tại section này giữ nhịp visual và bố cục tổng, chưa bật scale-in và pulse glow cho thẻ Pro.',
        },
      },
    },
  },
  en: {
    translation: {
      theme: {
        dark: 'Dark mode',
        light: 'Light mode',
      },
      landing: {
        nav: {
          login: 'Sign in',
        },
        hero: {
          eyebrow: 'Immersive profile builder for creators',
          line1: 'Craft a profile',
          line2: 'with premium presence',
          line3: 'from the very first scroll',
          subheading:
            'The landing flow shifts from static to cinematic: smoother, deeper, and built to pull creators from login straight into the builder.',
          primaryCta: 'Start free',
          secondaryCta: 'View pricing',
          statLabel: 'Creator-first flow',
          statValue: 'Landing → Login → Builder',
          statNote: 'Dark premium is the default, with a light toggle and a mouse-reactive Vanta background.',
          splineLoading: 'Loading 3D scene',
          splineTag: 'Spline scene · temp asset',
        },
        sections: {
          featuresEyebrow: 'Features stage',
          featuresTitle: 'Pinning + scrub arrives in the next step',
          featuresBody:
            'This step only builds the glass shell and scroll-ready glow. The full GSAP pinning experience for Features stays for the next round after hero approval.',
          pricingEyebrow: 'Pricing stage',
          pricingTitle: 'Pricing cards get motion in the next pass',
          pricingBody:
            'This section currently holds the visual rhythm and overall structure. Scale-in and pulse glow for the Pro card will come next.',
        },
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
