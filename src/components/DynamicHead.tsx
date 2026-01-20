'use client';

import { useEffect } from 'react';
import { useI18n } from '@/utils/i18n-context';

const titles = {
  uk: 'WebVy — Розробка сайтів під ключ | Лендінги, візитки, онлайн-магазини',
  en: 'WebVy — Website Development | Landing Pages, Business Sites, Online Stores',
  ru: 'WebVy — Разработка сайтов под ключ | Лендинги, визитки, интернет-магазины'
};

const descriptions = {
  uk: 'Створюємо сучасні сайти під ключ: від лендінгу до інтернет-магазину. Адаптивний дизайн, SEO, швидке завантаження. Замовити сайт — просто з WebVy.',
  en: 'We create modern websites: from landing pages to online stores. Responsive design, SEO, fast loading. Order a website — easy with WebVy.',
  ru: 'Создаем современные сайты под ключ: от лендинга до интернет-магазина. Адаптивный дизайн, SEO, быстрая загрузка. Заказать сайт — просто с WebVy.'
};

export default function DynamicHead() {
  const { locale } = useI18n();

  useEffect(() => {
    // Змінюємо заголовок сторінки залежно від обраної мови
    document.title = titles[locale] || titles.uk;

    // Змінюємо мета-опис сторінки
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[locale] || descriptions.uk);
    }

    // Змінюємо атрибут lang у HTML-тегу
    document.documentElement.lang = locale;
  }, [locale]);

  return null; // Цей компонент не рендерить нічого у DOM
}
