"use client";

import { useI18n } from '@/utils/i18n-context';
import styles from './WorkProcess.module.css';

const WorkProcess = () => {
  const { t } = useI18n();

  const steps = [
    t('process.step1', 'Аналіз бізнесу та цілей проєкту'),
    t('process.step2', 'Прототипування структури та ключових екранів'),
    t('process.step3', 'Дизайн у вашому стилі з акцентом на конверсію'),
    t('process.step4', 'Розробка на Next.js / React'),
    t('process.step5', 'Тестування швидкості, адаптивності та форм'),
    t('process.step6', 'Запуск сайту, базова SEO-оптимізація та підтримка після старту'),
  ];

  return (
    <section id="process" className={`section ${styles.processSection}`}>
      <div className="container">
        <h2 className="section-title">
          {t('process.title', 'Як відбувається робота над вашим сайтом')}
        </h2>
        <p className="section-subtitle">
          {t(
            'process.subtitle',
            'Чіткий та прозорий процес допомагає зняти зайву тривогу та рухатися по етапах без хаосу.'
          )}
        </p>

        <ol className={styles.processSteps}>
          {steps.map((step, index) => (
            <li key={index} className={styles.processStep}>
              <span className={styles.processStepNumber}>{index + 1}</span>
              <span className={styles.processStepText}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WorkProcess;
