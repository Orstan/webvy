'use client';

import { useState, FormEvent } from 'react';
import styles from './OrderForm.module.css';
import OrderSphere from './OrderSphere';
import { useI18n } from '@/utils/i18n-context';

export default function OrderForm() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [fileName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setIsSubmitting(true);

    const name = (form.elements.namedItem('user_name') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('user_phone') as HTMLInputElement).value;
    const messageText = (form.elements.namedItem('user_message') as HTMLTextAreaElement).value;

    const fullMessage =
      `${encodeURIComponent(t('whatsapp.order_intro', 'Добрий день! Хочу замовити сайт.'))}%0A%0A` +
      `${encodeURIComponent(t('whatsapp.name_label', "Ім'я"))}: ${encodeURIComponent(name)}%0A` +
      `${encodeURIComponent(t('whatsapp.phone_label', 'Телефон'))}: ${encodeURIComponent(phone)}%0A` +
      `${encodeURIComponent(t('whatsapp.message_label', 'Повідомлення'))}: ${encodeURIComponent(messageText)}`;

    const whatsappUrl = `https://wa.me/380988302566?text=${fullMessage}`;

    try {
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }

      form.reset();
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 5000);
    } catch (error) {
      console.error('Помилка при відкритті WhatsApp:', error);
      alert(t('order_form.error_message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThanksModal = () => {
    setShowThanks(false);
  };

  return (
    <section className={styles.order} id="order">
      <span className={styles.sectionAnchor} id="order"></span>
      <div className="container">
        <div className={styles.orderContent}>
          <div className={styles.orderText}>
            <h2 className={styles.sectionTitle}>{t('order_form.title')}</h2>
            <p className={styles.orderDescription}>{t('order_form.description')}</p>
            
            <form id="order-form" className={styles.orderForm} onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="user_name" 
                placeholder={t('order_form.name_placeholder')} 
                required 
                className={styles.formInput}
              />
              <input 
                type="tel" 
                name="user_phone" 
                placeholder={t('order_form.phone_placeholder')} 
                required 
                className={styles.formInput}
              />
              <textarea 
                name="user_message" 
                placeholder={t('order_form.message_placeholder')} 
                required 
                className={styles.formTextarea}
              ></textarea>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {t('order_form.submit')}
              </button>
            </form>
          </div>
          <div className={styles.orderAnimation}>
            <div className={styles.sphereContainer}>
              <div className={styles.sphereWrapper}>
                <OrderSphere />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно подяки */}
      {showThanks && (
        <div className={styles.modalThanks} onClick={closeThanksModal}>
          <div className={styles.modalThanksContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalThanksClose} onClick={closeThanksModal}>
              ✕
            </div>
            <div className={styles.modalThanksIcon}>
              ✓
            </div>
            <h3>{t('order_form.thanks_title')}</h3>
            <p>{t('order_form.thanks_message')}</p>
            <button className={styles.btnPrimary} onClick={closeThanksModal}>{t('order_form.thanks_button')}</button>
          </div>
        </div>
      )}
    </section>
  );
}
