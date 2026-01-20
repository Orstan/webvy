'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaPhone, FaEnvelope, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { useI18n } from '@/utils/i18n-context';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Link href="/" className={styles.logoLink}>
              <Image src="/img/logo.webp" alt="WebVy" width={120} height={40} className={styles.logoImage} unoptimized />
            </Link>
            <p className={styles.tagline}>
              {t('site.description', 'Професійна розробка веб-сайтів під ключ. Створюю сучасні та функціональні рішення для вашого бізнесу.')}
            </p>
          </div>
          
          <div className={styles.footerMiddle}>
            <div className={styles.footerContact}>
              <h3>{t('navigation.contacts', 'Контакти')}</h3>
              <div className={styles.contactInfo}>
                <a href="tel:+380988302566" className={styles.copyText}>
                  <FaPhone className={styles.icon} /> <span>+380988302566</span>
                </a>
                <a href="mailto:my@webvy.online" className={styles.copyText}>
                  <FaEnvelope className={styles.icon} /> <span>my@webvy.online</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.footerRight}>
            <div className={styles.footerSocial}>
              <h3>{t('footer.social', 'Соціальні мережі')}</h3>
              <div className={styles.socialLinks}>
                <a href="https://t.me/L_evenets" target="_blank" rel="noopener noreferrer">
                  <FaTelegram className={styles.icon} /> <span>Telegram</span>
                </a>
                <a href="https://wa.me/380988302566" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className={styles.icon} /> <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.footerCopyright}>
            <p>{t('footer.copyright', `© ${currentYear} WebVy. Всі права захищені.`)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
