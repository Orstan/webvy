"use client";

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ConsentBanner.module.css';

const ConsentBanner: React.FC = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Перевіряємо, чи користувач вже дав згоду
    const consentStatus = localStorage.getItem('consentStatus');
    if (!consentStatus) {
      // Додаємо невелику затримку для кращого UX
      const timer = setTimeout(() => {
        setShowBanner(true);
        // Додаткова затримка для анімації
        setTimeout(() => setIsVisible(true), 100);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (analytics: boolean, ads: boolean) => {
    // Зберігаємо вибір користувача
    localStorage.setItem('consentStatus', JSON.stringify({ analytics, ads }));
    
    // Оновлюємо статус згоди в Google
    if (typeof window !== 'undefined' && window.updateConsent) {
      window.updateConsent(analytics, ads);
    }
    
    // Спочатку приховуємо з анімацією
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
    }, 500); // Час анімації зникнення
  };

  if (!showBanner) return null;

  return (
    <div className={`${styles.cookiePopup} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.cookieContainer}>
        <div className={styles.cookieHeader}>
          <h3 className={styles.cookieTitle}>{t('consent.title')}</h3>
          <button 
            onClick={() => handleConsent(false, false)}
            className={styles.cookieCloseButton}
            aria-label="Закрити"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className={styles.cookieContent}>
          <p className={styles.cookieDescription}>{t('consent.description')}</p>
          
          <div className={styles.cookieOptions}>
            <div className={styles.cookieOption}>
              <label>
                <input
                  type="radio"
                  id="consent-necessary"
                  name="consent"
                  onChange={() => handleConsent(false, false)}
                />
                <div>
                  <span className={styles.cookieOptionTitle}>{t('consent.necessary')}</span>
                  <p className={styles.cookieOptionDescription}>{t('consent.necessaryDescription')}</p>
                </div>
              </label>
            </div>
            
            <div className={styles.cookieOption}>
              <label>
                <input
                  type="radio"
                  id="consent-analytics"
                  name="consent"
                  onChange={() => handleConsent(true, false)}
                />
                <div>
                  <span className={styles.cookieOptionTitle}>{t('consent.analytics')}</span>
                  <p className={styles.cookieOptionDescription}>{t('consent.analyticsDescription')}</p>
                </div>
              </label>
            </div>
            
            <div className={styles.cookieOption}>
              <label>
                <input
                  type="radio"
                  id="consent-all"
                  name="consent"
                  onChange={() => handleConsent(true, true)}
                />
                <div>
                  <span className={styles.cookieOptionTitle}>{t('consent.all')}</span>
                  <p className={styles.cookieOptionDescription}>{t('consent.allDescription')}</p>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div className={styles.cookieFooter}>
          <a 
            href="https://policies.google.com/privacy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.cookiePrivacyLink}
          >
            {t('consent.privacyPolicy')}
          </a>
          <button
            onClick={() => handleConsent(false, false)}
            className={styles.cookieAcceptButton}
          >
            {t('consent.accept')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;

// Розширюємо Window інтерфейс для TypeScript
declare global {
  interface Window {
    updateConsent?: (analytics: boolean, ads: boolean) => boolean;
  }
}
