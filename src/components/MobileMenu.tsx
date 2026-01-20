'use client';

import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './MobileMenu.module.css';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/utils/i18n-context';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  // Функція для відкриття меню
  const openMenu = () => {
    if (isTransitioning || isOpen) return;
    
    setIsTransitioning(true);
    console.log('Opening menu');
    
    document.body.style.overflow = 'hidden';
    
    // Оновлюємо aria-атрибути
    if (toggleButtonRef.current) {
      toggleButtonRef.current.setAttribute('aria-expanded', 'true');
      toggleButtonRef.current.setAttribute('aria-label', 'Закрити меню');
    }
    
    // Додаємо обробник кліку на документ для закриття меню
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEscapeKey);
    
    setIsOpen(true);
    setIsTransitioning(false);
  };

  // Функція для закриття меню
  const closeMenu = () => {
    if (isTransitioning || !isOpen) return;
    
    setIsTransitioning(true);
    console.log('Closing menu');
    
    document.body.style.overflow = '';
    
    // Оновлюємо aria-атрибути
    if (toggleButtonRef.current) {
      toggleButtonRef.current.setAttribute('aria-expanded', 'false');
      toggleButtonRef.current.setAttribute('aria-label', 'Відкрити меню');
    }
    
    // Видаляємо обробники подій
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleEscapeKey);
    
    setIsOpen(false);
    setIsTransitioning(false);
  };

  // Обробник кліку на документі для закриття меню
  const handleDocumentClick = (event: MouseEvent) => {
    // Якщо клік не по контенту меню або кнопці бургер-меню
    if (
      menuContentRef.current && 
      toggleButtonRef.current && 
      !menuContentRef.current.contains(event.target as Node) && 
      !toggleButtonRef.current.contains(event.target as Node)
    ) {
      closeMenu();
    }
  };

  // Обробник натискання клавіші Escape
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  };

  // Обробник зміни розміру вікна
  const handleResize = () => {
    if (window.innerWidth > 992 && isOpen) {
      closeMenu();
    }
  };

  // Обробник кліку на посилання в меню
  const handleMenuLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const target = e.currentTarget;
    const targetId = target.getAttribute('href');
    
    if (!targetId || !targetId.startsWith('#')) return;

    closeMenu();

    // Якщо ми вже на головній сторінці, робимо плавний скролл
    if (typeof window !== 'undefined' && pathname === '/') {
      setTimeout(() => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }, 350);
      return;
    }

    // Якщо ми на /blog чи іншій сторінці, переходимо на головну з якорем
    router.push(`/${targetId}`);
  };

  // Відправка запиту у WhatsApp з кнопки "Залишити заявку"
  const handleWhatsAppOrderClick = () => {
    if (typeof window === 'undefined') return;

    const phone = '+380988302566';
    const message = t('whatsapp.order_short', 'Добрий день! Хочу замовити сайт.');
    const whatsappUrl = `https://wa.me/380988302566?text=${encodeURIComponent(message)}`;

    closeMenu();
    window.open(whatsappUrl, '_blank');
  };

  // Додаємо обробник зміни розміру вікна
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.mobileMenuContainer}>
      {/* Кнопка мобільного меню */}
      <button 
        ref={toggleButtonRef}
        className={`${styles.mobileMenuToggle} ${isOpen ? styles.active : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          isOpen ? closeMenu() : openMenu();
        }}
        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
        aria-expanded={isOpen}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Мобільне меню */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}>
        <div 
          ref={menuContentRef}
          className={styles.mobileMenuContent}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Анімований логотип */}
          <div className={styles.logoContainer}>
            <img 
              src="/img/logo.webp" 
              alt="WebVy Logo" 
              className={styles.animatedLogo} 
            />
          </div>
          <ul className={styles.mobileMenuList}>
            {(pathname?.startsWith('/blog') || pathname?.startsWith('/portfolio')) && (
              <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
                <Link href="/" onClick={() => closeMenu()}>{t('navigation.home', 'Головна')}</Link>
              </li>
            )}
            <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
              <a href="#calculator" onClick={handleMenuLinkClick}>{t('navigation.calculator')}</a>
            </li>
            <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s' }}>
              <a href="#services" onClick={handleMenuLinkClick}>{t('navigation.services')}</a>
            </li>
            {!pathname?.startsWith('/portfolio') && (
              <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s' }}>
                <Link href="/portfolio" onClick={() => closeMenu()}>{t('navigation.portfolio', 'Портфоліо')}</Link>
              </li>
            )}
            <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s' }}>
              <a href="#about" onClick={handleMenuLinkClick}>{t('navigation.about', 'Про мене')}</a>
            </li>
            <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s' }}>
              <a href="#reviews" onClick={handleMenuLinkClick}>{t('navigation.reviews', 'Відгуки')}</a>
            </li>
            <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease 0.25s, transform 0.3s ease 0.25s' }}>
              <a href="#faq" onClick={handleMenuLinkClick}>FAQ</a>
            </li>
            {!pathname?.startsWith('/blog') && (
              <li style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s' }}>
                <Link href="/blog" onClick={() => closeMenu()}>{t('navigation.blog', 'Блог')}</Link>
              </li>
            )}
          </ul>
          <div className={styles.mobileMenuCta}>
            <div className={styles.languageSwitcherContainer}>
              <LanguageSwitcher />
            </div>
            <button type="button" className="btn" onClick={handleWhatsAppOrderClick}>
              {t('contact.title')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
