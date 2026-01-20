'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';
import { useI18n } from '@/utils/i18n-context';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const faqItems: FAQItem[] = t('faq.items', { returnObjects: true }) as unknown as FAQItem[] || [
    // Запасні дані на випадок, якщо переклади не завантажаться
    {
      question: "Скільки часу займає створення сайту?",
      answer: "Термін розробки залежить від складності проекту. Простий сайт-візитка може бути готовий за 1-2 тижні, в той час як складний інтернет-магазин може зайняти 1-2 місяці."
    },
    {
      question: "Які етапи розробки сайту?",
      answer: "Основні етапи включають: аналіз вимог, прототипування, дизайн, верстку, програмування, тестування та запуск."
    },
    {
      question: "Чи надаєте ви послуги з підтримки сайту?",
      answer: "Так, ми пропонуємо послуги з технічної підтримки та обслуговування сайтів після запуску."
    },
    {
      question: "Які технології ви використовуєте?",
      answer: "Ми використовуємо сучасні технології розробки, включаючи React, Angular, Vue.js, Node.js, PHP, WordPress та інші, залежно від потреб проекту."
    },
    {
      question: "Чи можу я вносити зміни в проект під час розробки?",
      answer: "Так, ми працюємо за гнучкою методологією, яка дозволяє вносити зміни на різних етапах розробки. Значні зміни можуть вплинути на терміни та вартість."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq">
      <span className={styles.sectionAnchor} id="faq"></span>
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>
        <h3 className={styles.sectionSubtitle}>{t('faq.subtitle')}</h3>
        <div className={styles.faqItems}>
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <div 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{item.question}</h3>
                <span className={styles.faqToggle}>+</span>
              </div>
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
