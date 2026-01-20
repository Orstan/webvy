import React from 'react';
import styles from './Services.module.css';
import { FaLaptopCode, FaPencilRuler, FaMobileAlt, FaSearch, FaHeadset, FaChartLine } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import SectionSEO from './SectionSEO';

const Services = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <SectionSEO sectionId="services" />
      <section className={styles.services} id="services">
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
        <div className={styles.servicesGrid}>
          {/* Послуга 1: Розробка сайтів */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}>
              <FaLaptopCode />
            </div>
            <h3>{t('services.web_development.title')}</h3>
            <p>{t('services.web_development.description')}</p>
          </div>
          
          {/* Послуга 2: Дизайн інтерфейсів */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}>
              <FaPencilRuler />
            </div>
            <h3>{t('services.interface_design.title')}</h3>
            <p>{t('services.interface_design.description')}</p>
          </div>
          
          {/* Послуга 3: Адаптивний дизайн */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}>
              <FaMobileAlt />
            </div>
            <h3>{t('services.responsive_design.title')}</h3>
            <p>{t('services.responsive_design.description')}</p>
          </div>
          
          {/* Послуга 4: SEO-оптимізація */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}>
              <FaSearch />
            </div>
            <h3>{t('services.seo_optimization.title')}</h3>
            <p>{t('services.seo_optimization.description')}</p>
          </div>
          
          {/* Послуга 5: Технічна підтримка */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}>
              <FaHeadset />
            </div>
            <h3>{t('services.technical_support.title')}</h3>
            <p>{t('services.technical_support.description')}</p>
          </div>
          
          {/* Послуга 6: Аналітика */}
          <div className={styles.serviceItem}>
            <div className={styles.serviceIcon}>
              <FaChartLine />
            </div>
            <h3>{t('services.analytics.title')}</h3>
            <p>{t('services.analytics.description')}</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Services;
