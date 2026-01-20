'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/utils/i18n-context';

export default function Navbar() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Додаємо перевірку монтування компонента
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Відстежуємо розмір екрану
  const checkIfMobile = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 992);
    }
  }, []);

  useEffect(() => {
    // Перевіряємо розмір екрану при завантаженні
    checkIfMobile();
    
    // Додаємо прослуховувач для зміни розміру екрану
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [checkIfMobile]);

  // Відстежуємо скролл для зміни стилю навігації
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Функції для мобільного меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Відправка запиту у WhatsApp з кнопки "Замовити сайт"
  const handleWhatsAppOrderClick = () => {
    if (typeof window === 'undefined') return;

    const phone = '+380988302566';
    const message = t('whatsapp.order_short', 'Добрий день! Хочу замовити сайт.');
    const whatsappUrl = `https://wa.me/380988302566?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  // Перевіряємо, чи компонент змонтований (для уникнення помилок гідратації)
  if (!isMounted) {
    return null;
  }
  
  // Стилі для мобільного меню
  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    right: isMenuOpen ? 0 : '-100%',
    width: '80%',
    maxWidth: '300px',
    height: '100vh',
    backgroundColor: 'rgba(34, 34, 34, 0.98)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'right 0.3s ease',
    boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)',
    padding: '50px 20px',
    overflowY: 'auto',
    zIndex: 9000
  } as React.CSSProperties;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 8999,
    opacity: isMenuOpen ? 1 : 0,
    visibility: isMenuOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    pointerEvents: isMenuOpen ? 'auto' : 'none'
  } as React.CSSProperties;

  const mobileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    fontSize: '16px',
    padding: '4px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#ffffff',
    zIndex: 9999,
    position: 'relative'
  } as React.CSSProperties;
  
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Оверлей для затемнення фону при відкритому меню */}
      {isMobile && isMenuOpen && (
        <div style={overlayStyle} onClick={closeMenu} />
      )}
      
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image 
              src="/img/logo.webp" 
              alt="WebVy Logo" 
              width={120} 
              height={40} 
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Мобільна кнопка меню */}
        {isMobile && (
          <button 
            style={mobileButtonStyle}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* Десктопна навігація */}
        {!isMobile && (
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>
                  {t('navigation.home')}
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/services" className={styles.navLink}>
                  {t('navigation.services')}
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/portfolio" className={styles.navLink}>
                  {t('navigation.portfolio')}
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/reviews" className={styles.navLink}>
                  {t('navigation.reviews')}
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/blog" className={styles.navLink}>
                  {t('navigation.blog')}
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/contacts" className={styles.navLink}>
                  {t('navigation.contacts')}
                </Link>
              </li>
            </ul>
            <div className={styles.navCta}>
              <LanguageSwitcher />
              <button type="button" className={styles.ctaButton} onClick={handleWhatsAppOrderClick}>
                {t('navigation.order')}
              </button>
            </div>
          </nav>
        )}
        
        {/* Мобільне меню */}
        {isMobile && (
          <div style={mobileMenuStyle}>
            <ul className={styles.navList} style={{ flexDirection: 'column', width: '100%' }}>
              <li className={styles.navItem} style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
                <Link href="/" className={styles.navLink} onClick={closeMenu} style={{ fontSize: '18px', padding: '10px 0', display: 'block', width: '100%' }}>
                  {t('navigation.home')}
                </Link>
              </li>
              <li className={styles.navItem} style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
                <Link href="/services" className={styles.navLink} onClick={closeMenu} style={{ fontSize: '18px', padding: '10px 0', display: 'block', width: '100%' }}>
                  {t('navigation.services')}
                </Link>
              </li>
              <li className={styles.navItem} style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
                <Link href="/portfolio" className={styles.navLink} onClick={closeMenu} style={{ fontSize: '18px', padding: '10px 0', display: 'block', width: '100%' }}>
                  {t('navigation.portfolio')}
                </Link>
              </li>
              <li className={styles.navItem} style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
                <Link href="/reviews" className={styles.navLink} onClick={closeMenu} style={{ fontSize: '18px', padding: '10px 0', display: 'block', width: '100%' }}>
                  {t('navigation.reviews')}
                </Link>
              </li>
              <li className={styles.navItem} style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
                <Link href="/blog" className={styles.navLink} onClick={closeMenu} style={{ fontSize: '18px', padding: '10px 0', display: 'block', width: '100%' }}>
                  {t('navigation.blog')}
                </Link>
              </li>
              <li className={styles.navItem} style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
                <Link href="/contacts" className={styles.navLink} onClick={closeMenu} style={{ fontSize: '18px', padding: '10px 0', display: 'block', width: '100%' }}>
                  {t('navigation.contacts')}
                </Link>
              </li>
            </ul>
            <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
              <div style={{ marginBottom: '15px' }}>
                <LanguageSwitcher />
              </div>
              <button
                type="button"
                className={styles.ctaButton}
                onClick={() => {
                  closeMenu();
                  handleWhatsAppOrderClick();
                }}
                style={{ fontSize: '14px', padding: '8px 15px', borderRadius: '20px', width: '100%', display: 'inline-block' }}
              >
                {t('navigation.order')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
