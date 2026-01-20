'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nProvider as CustomI18nProvider, type Locale } from '@/utils/i18n-context';

// Імпортуємо файли перекладів
import ukCommon from '../../public/locales/uk/common.json';
import enCommon from '../../public/locales/en/common.json';
import ruCommon from '../../public/locales/ru/common.json';

// Ініціалізуємо i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      uk: {
        common: ukCommon,
      },
      en: {
        common: enCommon,
      },
      ru: {
        common: ruCommon,
      },
    },
    lng: 'uk', // Мова за замовчуванням
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false, // React вже екранує значення
    },
    defaultNS: 'common',
  });

interface I18nInitializerProps {
  children: ReactNode;
}

export default function I18nInitializer({ children }: I18nInitializerProps) {
  useEffect(() => {
    // Перевіряємо, чи ми в браузері
    if (typeof window !== 'undefined') {
      // Завжди використовуємо українську мову за замовчуванням при першому завантаженні
      const savedLocale = localStorage.getItem('locale');
      const supportedLangs = ['uk', 'en', 'ru'];
      let currentLocale = 'uk';
      
      // Якщо є збережена мова, використовуємо її
      if (savedLocale && supportedLangs.includes(savedLocale)) {
        i18n.changeLanguage(savedLocale);
        currentLocale = savedLocale;
      } 
      // За замовчуванням завжди використовуємо українську
      else {
        i18n.changeLanguage('uk');
        localStorage.setItem('locale', 'uk');
        currentLocale = 'uk';
      }
      
      // Змінюємо заголовок сторінки залежно від мови
      const titles: Record<Locale, string> = {
        uk: 'WebVy — Розробка сайтів під ключ | Лендінги, візитки, онлайн-магазини',
        en: 'WebVy — Website Development | Landing Pages, Business Sites, Online Stores',
        ru: 'WebVy — Разработка сайтов под ключ | Лендинги, визитки, интернет-магазины'
      };
      document.title = titles[currentLocale as Locale] || titles.uk;
      document.documentElement.lang = currentLocale;
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <CustomI18nProvider>
        {children}
      </CustomI18nProvider>
    </I18nextProvider>
  );
}
