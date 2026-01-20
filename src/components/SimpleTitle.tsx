'use client';

import { useEffect } from 'react';
import { useI18n } from '@/utils/i18n-context';

export default function SimpleTitle() {
  const { locale } = useI18n();

  useEffect(() => {
    // Простий об'єкт з заголовками для різних мов
    const titles = {
      uk: 'WebVy — Розробка сайтів під ключ | Лендінги, візитки, онлайн-магазини',
      en: 'WebVy — Website Development | Landing Pages, Business Sites, Online Stores',
      ru: 'WebVy — Разработка сайтов под ключ | Лендинги, визитки, интернет-магазины'
    };

    // Встановлюємо заголовок відповідно до поточної мови
    document.title = titles[locale] || titles.uk;
    
    // Також оновлюємо атрибут lang у тегу html
    document.documentElement.lang = locale;
  }, [locale]);

  // Цей компонент не рендерить нічого видимого
  return null;
}
