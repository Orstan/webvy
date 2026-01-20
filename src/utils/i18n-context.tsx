'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type Locale = 'uk' | 'en' | 'ru';

interface I18nContextType {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
  t: (key: string, options?: any) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation('common');
  const [locale, setLocale] = useState<Locale>('uk');

  useEffect(() => {
    // Перевіряємо, чи ми в браузері
    if (typeof window !== 'undefined') {
      // Отримуємо поточну мову з localStorage або використовуємо українську за замовчуванням
      const savedLocale = localStorage.getItem('locale') as Locale;
      const supportedLangs = ['uk', 'en', 'ru'];
      
      if (savedLocale && supportedLangs.includes(savedLocale)) {
        setLocale(savedLocale);
        i18n.changeLanguage(savedLocale);
      } else {
        // Визначаємо мову браузера і мапимо на підтримувані локалі
        const browserLang = (navigator.language || navigator.languages?.[0] || 'en').toLowerCase();
        let initialLocale: Locale = 'en';

        if (browserLang.startsWith('uk')) {
          initialLocale = 'uk';
        } else if (browserLang.startsWith('ru')) {
          initialLocale = 'ru';
        } else {
          initialLocale = 'en';
        }

        setLocale(initialLocale);
        i18n.changeLanguage(initialLocale);
        localStorage.setItem('locale', initialLocale);
      }
    }
  }, [i18n]);

  const changeLocale = (newLocale: Locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
      i18n.changeLanguage(newLocale);
      
      // Змінюємо заголовок сторінки залежно від мови (оновлені SEO-title)
      const titles: Record<Locale, string> = {
        uk: 'Розробка Сайтів Під Ключ (Next.js/React) | Калькулятор Вартість | WebVy',
        en: 'Full-Cycle Website Development (Next.js/React) | Cost Calculator | WebVy',
        ru: 'Разработка Сайтов Под Ключ (Next.js/React) | Калькулятор Стоимости | WebVy'
      };
      document.title = titles[newLocale] || titles.uk;
      document.documentElement.lang = newLocale;
      document.documentElement.setAttribute('data-locale', newLocale);
      
      // Перезавантажуємо сторінку для оновлення контенту та метатегів
      window.location.reload();
    }
  };

  return (
    <I18nContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
