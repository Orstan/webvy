'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPhone } from 'react-icons/fa';
import styles from './PhonePopup.module.css';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

// Ініціалізація EmailJS
emailjs.init({
  publicKey: 'RYEBpAjlkRZi5e2iA',
});

// Регулярний вираз для валідації українського номера телефону
const PHONE_REGEX = /^\+380\d{9}$/;

// Функція для форматування номера телефону
const formatPhoneNumber = (value: string): string => {
  // Видаляємо всі нецифрові символи, крім +
  let cleaned = value.replace(/[^\d+]/g, '');
  
  // Якщо номер порожній, додаємо +380
  if (!cleaned) return '+380';
  
  // Якщо номер не починається з +, додаємо його
  if (!cleaned.startsWith('+')) cleaned = '+' + cleaned;
  
  // Якщо після + немає 380, додаємо його
  if (cleaned.startsWith('+') && !cleaned.startsWith('+380')) {
    if (cleaned.length === 1) return '+380';
    const digits = cleaned.substring(1);
    return '+380' + digits.substring(Math.min(digits.length, 3));
  }
  
  // Обмежуємо довжину номера до 13 символів (+380 та 9 цифр)
  if (cleaned.length > 13) cleaned = cleaned.substring(0, 13);
  
  // Форматуємо номер у вигляді +380 XX XXX XX XX
  let formatted = cleaned;
  if (cleaned.length > 4) formatted = cleaned.substring(0, 4) + ' ' + cleaned.substring(4);
  if (cleaned.length > 6) formatted = formatted.substring(0, 7) + ' ' + formatted.substring(7);
  if (cleaned.length > 9) formatted = formatted.substring(0, 11) + ' ' + formatted.substring(11);
  if (cleaned.length > 11) formatted = formatted.substring(0, 14) + ' ' + formatted.substring(14);
  
  return formatted;
};

export default function PhonePopup() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('+380');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState('');
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Показуємо спливаюче вікно через 30 секунд після завантаження сторінки
  useEffect(() => {
    // Перевіряємо, чи вже показували вікно в цій сесії
    const hasShownPopup = sessionStorage.getItem('hasShownPhonePopup');
    
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasShownPhonePopup', 'true');
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Функція для валідації номера телефону
  const validatePhone = (phoneNumber: string) => {
    // Видаляємо всі нецифрові символи для перевірки
    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    return PHONE_REGEX.test(cleanPhone);
  };
  
  // Функція для обробки фокусу на полі телефону
  const handlePhoneFocus = () => {
    if (phone === '' || phone === '+380') {
      setPhone('+380');
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валідація номера телефону
    if (!phone || !validatePhone(phone)) {
      setError(t('phone_popup.error_phone'));
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Очищаємо номер телефону від маски перед відправкою
      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      
      // Відправка даних через EmailJS
      await emailjs.send(
        'service_3ymd4he', // Service ID
        'template_rhdvyp8', // Template ID
        {
          to_email: 'vitaliilevenets@gmail.com', // Емейл для отримання заявок
          from_name: name || 'Відвідувач сайту',
          phone_number: cleanPhone,
          message: 'Запит на консультацію з спливаючого вікна',
          timestamp: new Date().toLocaleString()
        }
      );
      
      // Формуємо локалізоване повідомлення для WhatsApp
      const whatsappMessage =
        `${t('phone_popup.title')}\n\n` +
        `${t('phone_popup.description')}\n\n` +
        `${t('whatsapp.name_label', 'Ім\'я')}: ${name || '-'}\n` +
        `${t('whatsapp.phone_label', 'Телефон')}: ${cleanPhone}`;
      
      const whatsappUrl = `https://wa.me/380988302566?text=${encodeURIComponent(whatsappMessage)}`;
      
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }
      
      setShowThanks(true);
      
      // Закриваємо вікно подяки через 3 секунди
      setTimeout(() => {
        setIsVisible(false);
        // Через секунду після закриття скидаємо стан для наступного показу
        setTimeout(() => {
          setShowThanks(false);
          setPhone('');
          setName('');
        }, 1000);
      }, 3000);
      
    } catch (error) {
      console.error('Помилка при відправці форми:', error);
      setError(t('calculator.error_message'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FaTimes />
        </button>
        
        {!showThanks ? (
          <>
            <div className={styles.popupHeader}>
              <div className={styles.popupIcon}>
                <FaPhone />
              </div>
              <h3>{t('phone_popup.title')}</h3>
            </div>
            
            <p className={styles.popupText}>
              {t('phone_popup.description')}
            </p>
            
            <form onSubmit={handleSubmit} className={styles.popupForm}>
              <input
                type="text"
                placeholder={t('phone_popup.name_placeholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.popupInput}
              />
              
              <input
                type="tel"
                placeholder={t('phone_popup.phone_placeholder')}
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(formatPhoneNumber(e.target.value))}
                onFocus={handlePhoneFocus}
                className={`${styles.popupInput} ${!validatePhone(phone) && phone.length > 4 ? styles.inputError : ''}`}
                required
                ref={phoneInputRef}
              />
              <div className={styles.phoneHint}>
                {t('phone_popup.phone_format')}
              </div>
              
              {error && <p className={styles.errorMessage}>{error}</p>}
              
              <button 
                type="submit" 
                className={styles.popupButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('phone_popup.submitting') : t('phone_popup.submit')}
              </button>
            </form>
            
            <p className={styles.popupDisclaimer}>
              {t('phone_popup.privacy_disclaimer')}
            </p>
          </>
        ) : (
          <div className={styles.thanksContainer}>
            <div className={styles.thanksIcon}>
              <span className={styles.checkmark}>✓</span>
            </div>
            <h3>{t('phone_popup.thanks_title')}</h3>
            <p>{t('phone_popup.thanks_message')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
