'use client';

import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';
import { useI18n } from '@/utils/i18n-context';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className={styles.notFoundContainer}>
      <div className="container">
        <div className={styles.notFoundContent}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>{t('not_found.title')}</h1>
          <p className={styles.description}>
            {t('not_found.description')}
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.homeButton}>
              {t('not_found.back_to_home')}
            </Link>
          </div>
          
          <div className={styles.illustration}>
            <div className={styles.planet}></div>
            <div className={styles.astronaut}>
              <div className={styles.astronautBody}></div>
              <div className={styles.astronautHead}></div>
              <div className={styles.astronautArm1}></div>
              <div className={styles.astronautArm2}></div>
              <div className={styles.astronautLeg1}></div>
              <div className={styles.astronautLeg2}></div>
            </div>
            <div className={styles.stars}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
