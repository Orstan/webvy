'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/utils/i18n-context';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { locale, changeLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закриваємо випадаючий список при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Додаємо обробник кліків на документ
    document.addEventListener('mousedown', handleClickOutside);
    
    // Прибираємо обробник при розмонтуванні компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Запобігаємо спливанню події
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLocale: 'uk' | 'en' | 'ru') => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button 
        className={styles.currentLanguage} 
        onClick={toggleDropdown}
        aria-label="Змінити мову"
      >
        <Image 
          src={`/flags/${locale}.svg`} 
          alt={locale.toUpperCase()} 
          width={24} 
          height={16} 
          className={styles.flagIcon}
          unoptimized
        />
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <button 
            className={`${styles.languageOption} ${locale === 'uk' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('uk')}
          >
            <div className={styles.flagOptionContainer}>
              <Image 
                src="/flags/uk.svg" 
                alt="Українська" 
                width={24} 
                height={16} 
                className={styles.flagOptionIcon}
                unoptimized
              />
              <span>{t('language.uk')}</span>
            </div>
          </button>
          <button 
            className={`${styles.languageOption} ${locale === 'en' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            <div className={styles.flagOptionContainer}>
              <Image 
                src="/flags/en.svg" 
                alt="English" 
                width={24} 
                height={16} 
                className={styles.flagOptionIcon}
                unoptimized
              />
              <span>{t('language.en')}</span>
            </div>
          </button>
          <button 
            className={`${styles.languageOption} ${locale === 'ru' ? styles.active : ''}`}
            onClick={() => handleLanguageChange('ru')}
          >
            <div className={styles.flagOptionContainer}>
              <Image 
                src="/flags/ru.svg" 
                alt="Русский" 
                width={24} 
                height={16} 
                className={styles.flagOptionIcon}
                unoptimized
              />
              <span>{t('language.ru')}</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
