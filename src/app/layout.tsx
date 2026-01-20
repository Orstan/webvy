import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import ClientChatBot from '@/components/ClientChatBot'
import ClientScripts from '@/components/ClientScripts'
import ClientGoogleAnalytics from '@/components/ClientGoogleAnalytics'
import ClientPhonePopup from '@/components/ClientPhonePopup'
import I18nInitializer from '@/components/I18nProvider'
import SimpleTitle from '@/components/SimpleTitle'
import DynamicMetaTags from '@/components/DynamicMetaTags'
import ConsentBanner from '@/components/ConsentBanner'
import SocialFixedBar from '@/components/SocialFixedBar'
import Script from 'next/script'

// Підключаємо шрифт Montserrat
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://webvy.online'),
  title: {
    default: 'WebVy — Розробка сайтів під ключ | Замовити сайт, купити сайт, зробити сайт',
    template: '%s | WebVy — Розробка сайтів',
  },
  description: '✅ Замовити сайт під ключ від $150. Створення сайтів: лендінг, сайт-візитка, інтернет-магазин. Адаптивний дизайн, SEO-оптимізація, Next.js, React. Зробити сайт швидко та якісно!',
  keywords: [
    'замовити сайт',
    'купити сайт',
    'зробити сайт',
    'створення сайту',
    'розробка сайту',
    'сайт під ключ',
    'лендінг',
    'сайт візитка',
    'інтернет магазин',
    'веб розробка',
    'веб студія',
    'сайт для бізнесу',
    'сайт Україна',
    'веб розробник',
    'Next.js розробка',
    'React сайт',
    'сайт ціна',
    'скільки коштує сайт',
    'webvy',
    'корпоративний сайт',
    'каталог товарів'
  ],
  authors: [{ name: 'WebVy', url: 'https://webvy.online' }],
  creator: 'WebVy',
  publisher: 'WebVy',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1e3a8a',
  alternates: {
    canonical: 'https://webvy.online/',
    languages: {
      'uk': 'https://webvy.online/',
      'ru': 'https://webvy.online/ru/',
      'x-default': 'https://webvy.online/',
    },
  },
  openGraph: {
    title: 'WebVy — Розробка сайтів під ключ',
    description: 'Замов розробку сайту під ключ — лендінг, візитка, онлайн-магазин. WebVy — твій надійний партнер у веброзробці.',
    url: 'https://webvy.online',
    siteName: 'WebVy',
    images: [
      {
        url: 'https://webvy.online/images/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'WebVy — Розробка сайтів під ключ',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebVy — Розробка сайтів під ключ',
    description: 'Замов розробку сайту під ключ — лендінг, візитка, онлайн-магазин. WebVy — твій надійний партнер у веброзробці.',
    images: ['https://webvy.online/images/preview.jpg'],
  },
  other: {
    'og:locale:alternate': ['ru_RU', 'en_US'],
    // Російська версія
    'og:title:ru': 'WebVy — Разработка сайтов под ключ | Заказать сайт, купить сайт, создать сайт',
    'og:description:ru': '✅ Заказать сайт под ключ от $150. Создание сайтов: лендинг, сайт-визитка, интернет-магазин. Адаптивный дизайн, SEO-оптимизация, Next.js, React.',
    'description-ru': '✅ Заказать сайт под ключ от $150. Создание сайтов: лендинг, сайт-визитка, интернет-магазин. Адаптивный дизайн, SEO-оптимизация, Next.js, React. Сделать сайт быстро и качественно!',
    'keywords-ru': 'заказать сайт, купить сайт, создать сайт, разработка сайта, лендинг, сайт визитка, интернет магазин, веб разработка, сайт цена, сколько стоит сайт, webvy',
    // Англійська версія
    'og:title:en': 'WebVy — Website Development | Order Website, Buy Website, Create Website',
    'og:description:en': '✅ Order a website from $150. Website development: landing page, business card site, online store. Responsive design, SEO optimization, Next.js, React.',
    'description-en': '✅ Order a website from $150. Website development: landing page, business card site, online store. Responsive design, SEO optimization, Next.js, React. Create a website fast and professionally!',
    'keywords-en': 'order website, buy website, create website, website development, landing page, business site, online store, web development, website price, how much website cost, webvy',
    'manifest': '/manifest.json',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'apple-mobile-web-app-title': 'WebVy',
    'mobile-web-app-capable': 'yes',
    'application-name': 'WebVy'
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="uk" className={montserrat.variable} data-locale="uk">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="WebVy" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://webvy.online/#organization",
              name: "WebVy",
              url: "https://webvy.online/",
              logo: {
                "@type": "ImageObject",
                url: "https://webvy.online/apple-icon.png",
                width: 512,
                height: 512
              },
              description: {
                "@language": "uk",
                "@value": "Професійна розробка сайтів під ключ: лендінги, сайти-візитки, інтернет-магазини. Next.js, React, сучасний дизайн."
              },
              "description:ru": "Профессиональная разработка сайтов под ключ: лендинги, сайты-визитки, интернет-магазины. Next.js, React, современный дизайн.",
              "description:en": "Professional website development: landing pages, business card sites, online stores. Next.js, React, modern design.",
              foundingDate: "2020",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+380988302566",
                contactType: "customer service",
                email: "my@webvy.online",
                availableLanguage: ["Ukrainian", "Russian", "English"]
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "UA"
              },
              sameAs: [
                "https://t.me/L_evenets"
              ]
            }),
          }}
        />
        
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://webvy.online/#website",
              name: "WebVy",
              url: "https://webvy.online/",
              description: "Замовити сайт під ключ — лендінг, візитка, інтернет-магазин від $150 | Order website from $150 | Заказать сайт от $150",
              publisher: {
                "@id": "https://webvy.online/#organization"
              },
              inLanguage: ["uk", "ru", "en"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://webvy.online/blog?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://webvy.online/#localbusiness",
              name: "WebVy — Розробка сайтів",
              image: "https://webvy.online/images/preview.jpg",
              url: "https://webvy.online/",
              telephone: "+380988302566",
              email: "my@webvy.online",
              priceRange: "$150 - $2000",
              description: "Професійна розробка веб-сайтів: лендінги від $150, сайти-візитки від $200, корпоративні сайти від $400, інтернет-магазини від $800. | Professional web development: landing pages from $150, business sites from $200, corporate sites from $400, online stores from $800. | Профессиональная разработка сайтов: лендинги от $150, сайты-визитки от $200, корпоративные сайты от $400, интернет-магазины от $800.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "UA"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "48.9226",
                longitude: "24.7111"
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "15",
                bestRating: "5",
                worstRating: "1"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Послуги веб-розробки",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Лендінг (Landing Page)",
                      description: "Односторінковий сайт для швидкого запуску продукту або послуги"
                    },
                    price: "150",
                    priceCurrency: "USD"
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Сайт-візитка",
                      description: "Компактний сайт для представлення бізнесу"
                    },
                    price: "200",
                    priceCurrency: "USD"
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Корпоративний сайт",
                      description: "Повноцінний сайт для компанії з кількома розділами"
                    },
                    price: "400",
                    priceCurrency: "USD"
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Інтернет-магазин",
                      description: "E-commerce рішення з каталогом, кошиком та оплатою"
                    },
                    price: "800",
                    priceCurrency: "USD"
                  }
                ]
              }
            }),
          }}
        />
        
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Головна",
                  item: "https://webvy.online/"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Портфоліо",
                  item: "https://webvy.online/portfolio"
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Блог",
                  item: "https://webvy.online/blog"
                }
              ]
            }),
          }}
        />
        
        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Скільки коштує створення сайту?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Вартість залежить від типу сайту: лендінг від $150, сайт-візитка від $200, корпоративний сайт від $400, інтернет-магазин від $800. Точну ціну можна розрахувати за допомогою калькулятора на сайті."
                  }
                },
                {
                  "@type": "Question",
                  name: "Скільки часу займає розробка сайту?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Терміни залежать від складності: лендінг — 3-7 днів, сайт-візитка — 5-10 днів, корпоративний сайт — 2-3 тижні, інтернет-магазин — 3-6 тижнів."
                  }
                },
                {
                  "@type": "Question",
                  name: "Які технології використовуються для розробки?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Використовую сучасні технології: Next.js, React, TypeScript, Tailwind CSS. Це забезпечує швидке завантаження, SEO-оптимізацію та зручність підтримки."
                  }
                },
                {
                  "@type": "Question",
                  name: "Чи включена SEO-оптимізація?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Так, базова SEO-оптимізація включена в кожен проект: мета-теги, структуровані дані, оптимізація швидкості, адаптивний дизайн. Розширена SEO-оптимізація доступна як додаткова послуга."
                  }
                },
                {
                  "@type": "Question",
                  name: "Як замовити сайт?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Заповніть форму на сайті, скористайтеся калькулятором для оцінки вартості, або зв'яжіться напряму через Telegram, WhatsApp чи телефон +380988302566."
                  }
                }
              ]
            }),
          }}
        />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2290138538589116"
          crossOrigin="anonymous"></script>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NXVZ8ZW');`
          }}
        />

        
        {/* Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17306290470"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17306290470');
              
              // Функція для оновлення згоди
              window.updateConsent = function(analytics, ads) {
                if (typeof gtag !== 'function') {
                  console.warn('Google Analytics не завантажений. Не вдалося оновити згоду.');
                  return false;
                }
                
                try {
                  gtag('consent', 'update', {
                    'ad_storage': ads ? 'granted' : 'denied',
                    'analytics_storage': analytics ? 'granted' : 'denied'
                  });
                  return true;
                } catch (e) {
                  console.error('Помилка при оновленні згоди:', e);
                  return false;
                }
              };
              
              // Встановлюємо статус згоди за замовчуванням
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
            `
          }}
        />
      </head>
      <body className={montserrat.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXVZ8ZW"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        <ClientGoogleAnalytics id="G-W83BYFH7CH" />
        <I18nInitializer>
          <DynamicMetaTags />
          {children}
          <ClientChatBot />
          <ClientPhonePopup />
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id="8d645bce-7a09-40bc-87a4-9789028b6389"
            strategy="afterInteractive"
          />
          <ClientScripts />
          {/* Компонент для налаштування cookie */}
          <ConsentBanner />
          <SocialFixedBar />
        </I18nInitializer>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
