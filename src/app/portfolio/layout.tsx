import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Портфоліо веб-розробки | Приклади сайтів — WebVy',
  description: '🎨 Портфоліо веб-розробника: лендінги, корпоративні сайти, інтернет-магазини, маркетплейси. Реальні проекти на Next.js, React. Замовити подібний сайт від $150.',
  keywords: [
    'портфоліо веб-розробника',
    'приклади сайтів',
    'зразки сайтів',
    'роботи веб-студії',
    'лендінг приклад',
    'корпоративний сайт приклад',
    'інтернет-магазин приклад',
    'Next.js проекти',
    'React сайти',
    'веб-дизайн портфоліо'
  ],
  openGraph: {
    title: 'Портфоліо веб-розробки | WebVy',
    description: 'Реальні проекти: лендінги, корпоративні сайти, інтернет-магазини. Замовити подібний сайт.',
    url: 'https://webvy.online/portfolio',
    siteName: 'WebVy',
    images: [
      {
        url: 'https://webvy.online/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Портфоліо WebVy — Приклади сайтів',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Портфоліо веб-розробки | WebVy',
    description: 'Реальні проекти: лендінги, корпоративні сайти, інтернет-магазини.',
    images: ['https://webvy.online/images/preview.jpg'],
  },
  alternates: {
    canonical: 'https://webvy.online/portfolio',
    languages: {
      'uk': 'https://webvy.online/portfolio',
      'ru': 'https://webvy.online/portfolio?lang=ru',
      'en': 'https://webvy.online/portfolio?lang=en',
      'x-default': 'https://webvy.online/portfolio',
    },
  },
  other: {
    // Російська версія
    'title-ru': 'Портфолио веб-разработки | Примеры сайтов — WebVy',
    'description-ru': '🎨 Портфолио веб-разработчика: лендинги, корпоративные сайты, интернет-магазины, маркетплейсы. Реальные проекты на Next.js, React. Заказать подобный сайт от $150.',
    'keywords-ru': 'портфолио веб-разработчика, примеры сайтов, образцы сайтов, работы веб-студии, лендинг пример, корпоративный сайт пример, интернет-магазин пример',
    // Англійська версія
    'title-en': 'Web Development Portfolio | Website Examples — WebVy',
    'description-en': '🎨 Web developer portfolio: landing pages, corporate websites, online stores, marketplaces. Real projects on Next.js, React. Order a similar website from $150.',
    'keywords-en': 'web developer portfolio, website examples, website samples, web studio works, landing page example, corporate website example, online store example',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
