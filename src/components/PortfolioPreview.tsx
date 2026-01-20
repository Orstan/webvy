import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Portfolio.module.css';
import { useTranslation } from 'react-i18next';

const PortfolioPreview = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.portfolio} id="portfolio">
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('portfolio.title')}</h2>
        <div className={styles.portfolioGrid}>
          {/* KANDINSKY RESIDENCE */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/kandinsky.png" 
                unoptimized 
                alt={t('portfolio.projects.kandinsky.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.kandinsky.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.kandinsky.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.kandinsky.description')}
              </p>
            </div>
            <div className={styles.projectActions}>
              <a href="http://kandinsky-service.com.ua/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>

          {/* ProchePro */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/prochepro.png" 
                unoptimized 
                alt={t('portfolio.projects.prochepro.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.prochepro.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.prochepro.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.prochepro.description')}
              </p>
            </div>
            <div className={styles.projectActions}>
              <a href="https://prochepro.fr/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>

          {/* Powerix Express */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/powerix.png" 
                unoptimized 
                alt={t('portfolio.projects.powerix.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.powerix.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.powerix.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.powerix.description')}
              </p>
            </div>
            <div className={styles.projectActions}>
              <a href="https://powerix-express.com/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.portfolioMoreWrapper}>
          <Link href="/portfolio" className={styles.btnViewMore}>
            {t('portfolio.view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
