'use client';

import React from 'react';
import Link from 'next/link';
import styles from './privacy-policy.module.css';
import { useI18n } from '@/utils/i18n-context';

const PrivacyPolicy = () => {
  const { t } = useI18n();
  return (
    <div className={styles.privacyContainer}>
      <div className="container">
        <div className={styles.privacyContent}>
          <h1 className={styles.title}>{t('privacy_policy.title')}</h1>
          
          <div className={styles.lastUpdated}>
            {t('privacy_policy.last_updated')}
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.intro.title')}</h2>
            <p>
              {t('privacy_policy.intro.p1')}
            </p>
            <p>
              {t('privacy_policy.intro.p2')}
            </p>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.data_collection.title')}</h2>
            <p>{t('privacy_policy.data_collection.intro')}</p>
            <ul>
              <li><strong>{t('privacy_policy.data_collection.contact_info.title')}</strong> {t('privacy_policy.data_collection.contact_info.desc')}</li>
              <li><strong>{t('privacy_policy.data_collection.usage_info.title')}</strong> {t('privacy_policy.data_collection.usage_info.desc')}</li>
              <li><strong>{t('privacy_policy.data_collection.project_info.title')}</strong> {t('privacy_policy.data_collection.project_info.desc')}</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.data_usage.title')}</h2>
            <p>{t('privacy_policy.data_usage.intro')}</p>
            <ul>
              <li>{t('privacy_policy.data_usage.services')}</li>
              <li>{t('privacy_policy.data_usage.communication')}</li>
              <li>{t('privacy_policy.data_usage.marketing')}</li>
              <li>{t('privacy_policy.data_usage.analytics')}</li>
              <li>{t('privacy_policy.data_usage.legal')}</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.data_protection.title')}</h2>
            <p>
              {t('privacy_policy.data_protection.content')}
            </p>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.third_parties.title')}</h2>
            <p>{t('privacy_policy.third_parties.intro')}</p>
            <ul>
              <li>{t('privacy_policy.third_parties.services')}</li>
              <li>{t('privacy_policy.third_parties.legal')}</li>
              <li>{t('privacy_policy.third_parties.protection')}</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.cookies.title')}</h2>
            <p>
              {t('privacy_policy.cookies.content')}
            </p>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.your_rights.title')}</h2>
            <p>{t('privacy_policy.your_rights.intro')}</p>
            <ul>
              <li>{t('privacy_policy.your_rights.access')}</li>
              <li>{t('privacy_policy.your_rights.rectify')}</li>
              <li>{t('privacy_policy.your_rights.delete')}</li>
              <li>{t('privacy_policy.your_rights.restrict')}</li>
              <li>{t('privacy_policy.your_rights.object')}</li>
              <li>{t('privacy_policy.your_rights.portability')}</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.changes.title')}</h2>
            <p>
              {t('privacy_policy.changes.content')}
            </p>
          </div>
          
          <div className={styles.section}>
            <h2>{t('privacy_policy.contact.title')}</h2>
            <p>
              {t('privacy_policy.contact.content')} <a href="mailto:my@webvy.online">my@webvy.online</a>
            </p>
          </div>
          
          <div className={styles.backToSite}>
            <Link href="/">
              {t('privacy_policy.back_to_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
