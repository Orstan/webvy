import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
};

export const metadata: Metadata = {
  title: 'Блог про веб-розробку | SEO, Next.js, React — WebVy',
  description: '📚 Блог про створення сайтів: SEO-оптимізація, Next.js, React, швидкість завантаження, конверсія. Корисні статті для бізнесу та розробників.',
  keywords: [
    'блог веб-розробка',
    'SEO статті',
    'Next.js уроки',
    'React навчання',
    'як створити сайт',
    'оптимізація сайту',
    'швидкість сайту',
    'конверсія лендінгу',
    'веб-розробка Україна',
    'створення сайтів блог'
  ],
  openGraph: {
    title: 'Блог про веб-розробку | WebVy',
    description: 'Корисні статті про створення сайтів, SEO, Next.js, React та оптимізацію.',
    url: 'https://webvy.online/blog',
    siteName: 'WebVy',
    images: [
      {
        url: 'https://webvy.online/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Блог WebVy — Статті про веб-розробку',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог про веб-розробку | WebVy',
    description: 'Корисні статті про створення сайтів, SEO, Next.js, React.',
    images: ['https://webvy.online/images/preview.jpg'],
  },
  alternates: {
    canonical: 'https://webvy.online/blog',
    languages: {
      'uk': 'https://webvy.online/blog',
      'ru': 'https://webvy.online/blog?lang=ru',
      'en': 'https://webvy.online/blog?lang=en',
      'x-default': 'https://webvy.online/blog',
    },
  },
  other: {
    // Російська версія
    'title-ru': 'Блог о веб-разработке | SEO, Next.js, React — WebVy',
    'description-ru': '📚 Блог о создании сайтов: SEO-оптимизация, Next.js, React, скорость загрузки, конверсия. Полезные статьи для бизнеса и разработчиков.',
    'keywords-ru': 'блог веб-разработка, SEO статьи, Next.js уроки, React обучение, как создать сайт, оптимизация сайта, скорость сайта, конверсия лендинга',
    // Англійська версія
    'title-en': 'Web Development Blog | SEO, Next.js, React — WebVy',
    'description-en': '📚 Blog about website development: SEO optimization, Next.js, React, page speed, conversion. Useful articles for business and developers.',
    'keywords-en': 'web development blog, SEO articles, Next.js tutorials, React learning, how to create website, website optimization, page speed, landing conversion',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
