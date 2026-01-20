import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
};

export const metadata: Metadata = {
  title: 'Політика конфіденційності | WebVy',
  description: 'Політика конфіденційності WebVy: як ми збираємо, зберігаємо та захищаємо ваші персональні дані при використанні сайту та форми замовлення.',
  alternates: {
    canonical: 'https://webvy.online/privacy-policy',
    languages: {
      'uk': 'https://webvy.online/privacy-policy',
      'ru': 'https://webvy.online/privacy-policy?lang=ru',
      'en': 'https://webvy.online/privacy-policy?lang=en',
      'x-default': 'https://webvy.online/privacy-policy',
    },
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
