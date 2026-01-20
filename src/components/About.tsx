'use client';

import React from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import { useI18n } from '@/utils/i18n-context';

const About = () => {
  const { t } = useI18n();

  return (
    <section className={styles.about} id="about">
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <Image 
              src="/img/preview.webp" 
              unoptimized 
              alt={t('about.alt')} 
              width={500} 
              height={400}
              className={styles.developerImage}
            />
          </div>
          
          <div className={styles.aboutInfo}>
            <h3 className={styles.aboutSubtitle}>{t('about.subtitle')}</h3>
            
            <p className={styles.aboutIntro}>
              <span className={styles.highlight}>{t('about.intro')}</span>
            </p>
            
            <div className={styles.skillsSection}>
              <h4 className={styles.skillsTitle}>{t('about.skills.title')}</h4>
              <ul className={styles.skillsList}>
                {(() => {
                  const skills = t('about.skills.list', { returnObjects: true }) as unknown as string[];
                  return skills.map((skill: string, index: number) => (
                    <li key={index}><span className={styles.checkmark}>✅</span> {skill}</li>
                  ));
                })()}
              </ul>
            </div>
            
            <div className={styles.whyMeSection}>
              <h4 className={styles.whyMeTitle}>{t('about.why_me.title')}</h4>
              <ul className={styles.whyMeList}>
                {(() => {
                  const reasons = t('about.why_me.list', { returnObjects: true }) as unknown as string[];
                  return reasons.map((reason: string, index: number) => (
                    <li key={index}><span className={styles.bulletPoint}>🔹</span> {reason}</li>
                  ));
                })()}
              </ul>
            </div>
            
            <p className={styles.mission}>
              {t('about.mission')}
            </p>
            
            <p className={styles.callToAction}>
              {t('about.cta')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
