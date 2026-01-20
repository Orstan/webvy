'use client';

import { useEffect } from 'react';
import { useI18n } from '@/utils/i18n-context';

const pageTitles = {
  uk: 'Розробка Сайтів Під Ключ (Next.js/React) | Калькулятор Вартість | WebVy',
  en: 'Full-Cycle Website Development (Next.js/React) | Cost Calculator | WebVy',
  ru: 'Разработка Сайтов Под Ключ (Next.js/React) | Калькулятор Стоимости | WebVy'
};

export default function TitleChanger() {
  const { locale } = useI18n();

  useEffect(() => {
    // Функція для зміни заголовка
    const updateTitle = () => {
      document.title = pageTitles[locale] || pageTitles.uk;
    };

    // Змінюємо заголовок відразу
    updateTitle();

    // Додаємо обробник події для зміни заголовка при зміні мови
    window.addEventListener('languagechange', updateTitle);
    
    // Додаємо обробник події для зміни заголовка при зміні URL
    window.addEventListener('popstate', updateTitle);

    // Очищаємо обробники подій при розмонтуванні компонента
    return () => {
      window.removeEventListener('languagechange', updateTitle);
      window.removeEventListener('popstate', updateTitle);
    };
  }, [locale]);

  return null; // Цей компонент не рендерить нічого у DOM
}
