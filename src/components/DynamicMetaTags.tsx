'use client';

import { useEffect } from 'react';
import { useI18n } from '@/utils/i18n-context';

/**
 * Компонент для динамічної зміни метатегів при завантаженні сторінки
 * Встановлює правильні метатеги залежно від поточної мови
 */
export default function DynamicMetaTags() {
  const { locale } = useI18n();

  // Визначаємо метатеги залежно від мови
  const titles = {
    uk: 'WebVy — Розробка сайтів під ключ | Замовити сайт, купити сайт, зробити сайт',
    en: 'WebVy — Website Development | Order Website, Buy Website, Create Website',
    ru: 'WebVy — Разработка сайтов под ключ | Заказать сайт, купить сайт, создать сайт'
  };

  const descriptions = {
    uk: '✅ Замовити сайт під ключ від $150. Створення сайтів: лендінг, сайт-візитка, інтернет-магазин. Адаптивний дизайн, SEO-оптимізація, Next.js, React. Зробити сайт швидко та якісно!',
    en: '✅ Order a website from $150. Website development: landing page, business card site, online store. Responsive design, SEO optimization, Next.js, React. Create a website fast and professionally!',
    ru: '✅ Заказать сайт под ключ от $150. Создание сайтов: лендинг, сайт-визитка, интернет-магазин. Адаптивный дизайн, SEO-оптимизация, Next.js, React. Сделать сайт быстро и качественно!'
  };

  const keywords = {
    uk: 'замовити сайт, купити сайт, зробити сайт, створення сайту, розробка сайту, сайт під ключ, лендінг, сайт візитка, інтернет магазин, веб розробка, сайт ціна, скільки коштує сайт',
    en: 'order website, buy website, create website, website development, landing page, business site, online store, web development, website price, how much website cost',
    ru: 'заказать сайт, купить сайт, создать сайт, разработка сайта, лендинг, сайт визитка, интернет магазин, веб разработка, сайт цена, сколько стоит сайт'
  };

  // Встановлюємо метатеги при завантаженні сторінки
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const currentLocale = locale as keyof typeof titles;
      
      // Встановлюємо атрибути HTML
      document.documentElement.lang = locale;
      document.documentElement.setAttribute('data-locale', locale);
      
      // Встановлюємо заголовок сторінки
      document.title = titles[currentLocale] || titles.uk;
      
      // Оновлюємо мета-теги
      const metaTags = [
        { selector: 'meta[name="description"]', content: descriptions[currentLocale] || descriptions.uk },
        { selector: 'meta[name="keywords"]', content: keywords[currentLocale] || keywords.uk },
        { selector: 'meta[property="og:title"]', content: titles[currentLocale] || titles.uk },
        { selector: 'meta[property="og:description"]', content: descriptions[currentLocale] || descriptions.uk },
        { selector: 'meta[name="twitter:title"]', content: titles[currentLocale] || titles.uk },
        { selector: 'meta[name="twitter:description"]', content: descriptions[currentLocale] || descriptions.uk },
        { selector: 'meta[property="og:locale"]', content: locale === 'uk' ? 'uk_UA' : locale === 'ru' ? 'ru_RU' : 'en_US' }
      ];
      
      // Оновлюємо кожен мета-тег або створюємо новий
      metaTags.forEach(tag => {
        let element = document.querySelector(tag.selector);
        if (element) {
          element.setAttribute('content', tag.content);
        } else {
          // Створюємо мета-тег якщо його немає
          const meta = document.createElement('meta');
          if (tag.selector.includes('property=')) {
            const property = tag.selector.match(/property="([^"]+)"/)?.[1];
            if (property) meta.setAttribute('property', property);
          } else {
            const name = tag.selector.match(/name="([^"]+)"/)?.[1];
            if (name) meta.setAttribute('name', name);
          }
          meta.setAttribute('content', tag.content);
          document.head.appendChild(meta);
        }
      });

      // Оновлюємо canonical URL залежно від мови
      const canonicalUrl = locale === 'uk' 
        ? 'https://webvy.online/' 
        : `https://webvy.online/?lang=${locale}`;
      
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
      }

      // Оновлюємо hreflang теги
      const hreflangTags = [
        { hreflang: 'uk', href: 'https://webvy.online/' },
        { hreflang: 'ru', href: 'https://webvy.online/?lang=ru' },
        { hreflang: 'en', href: 'https://webvy.online/?lang=en' },
        { hreflang: 'x-default', href: 'https://webvy.online/' }
      ];

      hreflangTags.forEach(tag => {
        let link = document.querySelector(`link[hreflang="${tag.hreflang}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', tag.hreflang);
          link.setAttribute('href', tag.href);
          document.head.appendChild(link);
        }
      });
    }
  }, [locale]);

  // Цей компонент не рендерить нічого
  return null;
}
