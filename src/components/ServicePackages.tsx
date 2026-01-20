"use client";

import { useI18n } from '@/utils/i18n-context';
import styles from './ServicePackages.module.css';
import SectionSEO from './SectionSEO';

const ServicePackages = () => {
  const { t } = useI18n();

  const packages = [
    {
      id: 'landing-start',
      title: t('packages.landing_start.title', 'Landing Page Start'),
      subtitle: t(
        'packages.landing_start.subtitle',
        'Односторінковий лендінг для швидкого запуску послуги або продукту.'
      ),
      price: t('packages.landing_start.price', 'від $150'),
      points: [
        t('packages.landing_start.point1', 'До 3 блоків (герой, про послугу, контактна форма)'),
        t('packages.landing_start.point2', 'Адаптивний дизайн під мобільні та десктопи'),
        t('packages.landing_start.point3', 'Базова SEO-оптимізація та підключення аналітики'),
      ],
    },
    {
      id: 'business-pro',
      title: t('packages.business_pro.title', 'Business Site Pro'),
      subtitle: t(
        'packages.business_pro.subtitle',
        'Сайт для компанії з кількома розділами та блогом.'
      ),
      price: t('packages.business_pro.price', 'від $200'),
      points: [
        t('packages.business_pro.point1', 'Від 5 сторінок (послуги, кейси, про компанію, контакти)'),
        t('packages.business_pro.point2', 'Інтеграція з формами заявок та месенджерами'),
        t('packages.business_pro.point3', 'Оптимізація швидкості та Core Web Vitals'),
      ],
    },
    {
      id: 'ecommerce-advanced',
      title: t('packages.ecommerce_advanced.title', 'E-commerce Advanced'),
      subtitle: t(
        'packages.ecommerce_advanced.subtitle',
        'Інтернет-магазин з корзиною, каталогом товарів та оплатою.'
      ),
      price: t('packages.ecommerce_advanced.price', 'від $800'),
      points: [
        t('packages.ecommerce_advanced.point1', 'Каталог товарів, фільтри, сторінка товару'),
        t('packages.ecommerce_advanced.point2', 'Кошик, оформлення замовлення, інтеграція з оплатою'),
        t('packages.ecommerce_advanced.point3', 'Технічна SEO-оптимізація та підключення аналітики'),
      ],
    },
  ];

  const handlePackageClick = (pkgId: string) => {
    if (typeof window === 'undefined') return;

    const pkg = packages.find((p) => p.id === pkgId);
    if (!pkg) return;

    const packageTitle = pkg.title;
    const packagePrice = pkg.price;

    const message =
      t('whatsapp.package_intro', 'Добрий день! Хочу замовити пакет розробки сайту.') + '\n\n' +
      `${t('whatsapp.package_name', 'Пакет')}: ${packageTitle}\n` +
      `${t('whatsapp.package_price', 'Орієнтовна вартість')}: ${packagePrice}`;

    const whatsappUrl = `https://wa.me/380988302566?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <SectionSEO sectionId="packages" />
      <section id="packages" className={`section ${styles.packagesSection}`}>
      <div className="container">
        <h2 className="section-title">
          {t('packages.title', 'Готові рішення під різні задачі')}
        </h2>
        <p className="section-subtitle">
          {t(
            'packages.subtitle',
            'Обирайте формат співпраці: від простого лендінга до повноцінного корпоративного сайту чи інтернет-магазину.'
          )}
        </p>

        <div className={styles.packagesGrid}>
          {packages.map((pkg) => (
            <div key={pkg.id} className={styles.packageCard}>
              <h3 className={styles.packageTitle}>{pkg.title}</h3>
              <div className={styles.packagePrice}>{pkg.price}</div>
              <p className={styles.packageSubtitle}>{pkg.subtitle}</p>
              <ul className={styles.packageList}>
                {pkg.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.packageButton}
                onClick={() => handlePackageClick(pkg.id)}
              >
                {t('packages.cta', 'Замовити цей пакет')}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default ServicePackages;
