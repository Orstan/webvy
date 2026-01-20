'use client';

import { useI18n } from '@/utils/i18n-context';
import Image from 'next/image';
import Calculator from '@/components/Calculator';
import Services from '@/components/Services';
import ServicePackages from '@/components/ServicePackages';
import PortfolioPreview from '@/components/PortfolioPreview';
import About from '@/components/About';
import WorkProcess from '@/components/WorkProcess';
import BlogPreview from '@/components/BlogPreview';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';
import Sphere from '@/components/Sphere';
import MobileMenu from '@/components/MobileMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ClientPage() {
  const { t, locale } = useI18n();
  
  return (
    <main className="app-page">
      {/* Контейнер для 3D анімації частинок */}
      <div id="animation-container" className="particle-animation-container"></div>
      
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <Image src="/img/logo.webp" alt="WebVy" width={120} height={40} style={{ width: 'auto', height: '40px' }} className="logo-image" unoptimized />
              </a>
            </div>
            <div className="nav-content">
              <nav>
                {/* Десктопне меню */}
                <div className="nav-container">
                  <ul className="menu">
                    <li><a href="#calculator">{t('navigation.calculator')}</a></li>
                    <li><a href="#services">{t('navigation.services')}</a></li>
                    <li><a href="/portfolio">{t('navigation.portfolio', 'Портфоліо')}</a></li>
                    <li><a href="#about">{t('navigation.about', 'Про мене')}</a></li>
                    <li><a href="#reviews">{t('navigation.reviews', 'Відгуки')}</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="/blog">{t('navigation.blog', 'Блог')}</a></li>
                    <li><LanguageSwitcher /></li>
                  </ul>
                </div>
                
                {/* Мобільне меню */}
                <MobileMenu />
              </nav>
            </div>
            <div className="cta-button">
              <a href="#order" className="btn">{t('contact.title')}</a>
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span style={{ color: '#6c63ff' }}>
                  {t('hero.title_main', 'Розробка веб-сайтів під ключ: лендінги, інтернет-магазини (React/Next.js)')}
                </span>
              </h1>
              <p>{t('hero.subtitle')}</p>
              <a href="#order" className="btn">{t('hero.cta')}</a>
            </div>
            {/* Додаємо анімацію сфери */}
            <Sphere />
          </div>
        </div>
      </section>

      {/* Секція калькулятора */}
      <Calculator />

      {/* Пакетні пропозиції */}
      <ServicePackages />

      {/* Секція послуг */}
      <Services />

      {/* Етапи роботи */}
      <WorkProcess />

      {/* Превʼю блогу (останні статті) */}
      <BlogPreview />

      {/* Секція портфоліо (превʼю з 3 робіт) */}
      <PortfolioPreview />

      {/* Секція про мене */}
      <About />

      {/* Секція відгуків */}
      <Reviews />

      {/* Секція FAQ */}
      <FAQ />

      {/* Секція замовлення */}
      <OrderForm />
      
      {/* Футер */}
      <Footer />
    </main>
  );
}
