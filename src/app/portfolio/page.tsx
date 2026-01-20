"use client";

import Image from 'next/image';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/utils/i18n-context';

export default function PortfolioPage() {
  const { t } = useI18n();

  return (
    <main className="app-page">
      {/* Шапка така ж, як на головній */}
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <Image
                  src="/img/logo.webp"
                  alt="WebVy"
                  width={120}
                  height={40}
                  style={{ width: 'auto', height: '40px' }}
                  className="logo-image"
                  unoptimized
                />
              </a>
            </div>
            <div className="nav-content">
              <nav>
                {/* Десктопне меню */}
                <div className="nav-container">
                  <ul className="menu">
                    <li><a href="/">{t('navigation.home', 'Головна')}</a></li>
                    <li><a href="/#calculator">{t('navigation.calculator')}</a></li>
                    <li><a href="/#services">{t('navigation.services')}</a></li>
                    <li><a href="/#about">{t('navigation.about', 'Про мене')}</a></li>
                    <li><a href="/#reviews">{t('navigation.reviews', 'Відгуки')}</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li><a href="/blog">{t('navigation.blog', 'Блог')}</a></li>
                    <li><LanguageSwitcher /></li>
                  </ul>
                </div>

                {/* Мобільне меню */}
                <MobileMenu />
              </nav>
            </div>
            <div className="cta-button">
              <a href="/#order" className="btn">{t('contact.title')}</a>
            </div>
          </div>
        </div>
      </header>

      {/* Повне портфоліо (з власним заголовком усередині компонента) */}
      <Portfolio />

      {/* Футер */}
      <Footer />
    </main>
  );
}
