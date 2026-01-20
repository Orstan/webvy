'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Calculator.module.css';
import emailjs from '@emailjs/browser';
import { useI18n } from '@/utils/i18n-context';
import SectionSEO from './SectionSEO';

const Calculator = () => {
  const { t } = useI18n();
  // Стани для зберігання значень калькулятора
  const [siteType, setSiteType] = useState('landing'); // За замовчуванням лендінг
  const [pagesCount, setPagesCount] = useState(1); // За замовчуванням 1 сторінка
  const [designType, setDesignType] = useState('template'); // За замовчуванням шаблонний дизайн (без доплати)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Використовуємо useRef для доступу до DOM-елементів
  const calculatedPriceRef = useRef<HTMLSpanElement>(null);
  const totalPriceInputRef = useRef<HTMLInputElement>(null);
  
  // Ініціалізуємо EmailJS
  useEffect(() => {
    emailjs.init('RYEBpAjlkRZi5e2iA'); // Публічний ключ EmailJS
  }, []);

  // Ціни
  const prices = {
    types: {
      'landing': 150,
      'business-card': 200,
      'corporate': 400,
      'online-store': 800,
      'catalog': 600,
      'other': 150
    },
    pages: {
      min: 1,
      max: 50,
      pricePerPage: 25
    },
    design: {
      'template': 0,
      'custom': 240,
      'premium': 480
    },
    features: {
      'seo': 120,
      'content': 100,
      'domain': 15,
      'hosting': 75,
      'support': 100,
      'analytics': 60
    },
    descriptions: {
      'landing': 'Лендінг під ключ',
      'business-card': 'Сайт-візитка',
      'corporate': 'Корпоративний сайт',
      'online-store': 'Інтернет-магазин',
      'catalog': 'Каталог товарів',
      'other': 'Інший тип сайту',
      'template': 'Шаблонний дизайн',
      'custom': 'Індивідуальний (унікальний дизайн)',
      'premium': 'Преміум дизайн',
      'business': 'Корпоративний сайт',
      'shop': 'Інтернет-магазин',
      'portal': 'Інформаційний портал',
      'design': 'Індивідуальний дизайн',
      'cms': 'Система управління (CMS)',
      'seo': 'SEO оптимізація',
      'support': 'Техпідтримка 3 місяці',
      'hosting': 'Хостинг на рік',
      'domain': 'Домен на рік',
      'content': 'Наповнення контентом',
      'analytics': 'Налаштування аналітики'
    }
  };

  // Парсинг ціни з рядка
  const parsePrice = (priceString: string | null | undefined) => {
    if (!priceString) return 0;
    
    // Видаляємо всі символи, крім цифр і десяткового роздільника
    const numberString = priceString.toString().replace(/[^\d.,]/g, '').replace(',', '.');
    const number = parseFloat(numberString);
    
    return isNaN(number) ? 0 : Math.round(number);
  };

  // Форматування ціни
  const formatPrice = (price: number, raw = false) => {
    if (isNaN(price)) return '$0';
    
    if (raw) {
      return price.toString();
    }
    
    // Використовуємо простий формат замість Intl.NumberFormat для уникнення проблем гідратації
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Анімація зміни ціни
  const animatePriceChange = (targetPrice: number) => {
    // Перевіряємо, чи ми на клієнті
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      // Використовуємо ref замість document.getElementById
      const priceElement = calculatedPriceRef.current;
      if (!priceElement) {
        console.error('Елемент calculated-price не знайдено через ref');
        return;
      }

    // Отримуємо поточну ціну з елемента або використовуємо 0, якщо елемент порожній
    let startPrice = 0;
    if (priceElement.textContent) {
      startPrice = parsePrice(priceElement.textContent);
    }
    
    console.log('Анімація ціни:', 'Початкова:', startPrice, 'Цільова:', targetPrice);
    
    // Якщо ціни однакові, просто встановлюємо значення
    if (startPrice === targetPrice) {
      priceElement.textContent = formatPrice(targetPrice);
      return;
    }
    
    const duration = 1000; // 1 секунда
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Використовуємо плавну функцію згладжування
      const easeInOutCubic = (t: number) => t < 0.5 
        ? 4 * t * t * t 
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      
      const easedProgress = easeInOutCubic(progress);
      const animatedValue = startPrice + (targetPrice - startPrice) * easedProgress;
      
      // Оновлюємо відображення, якщо елемент існує
      if (priceElement) {
        priceElement.textContent = formatPrice(Math.round(animatedValue));
      }
      
      // Оновлюємо приховане поле форми через ref
      const totalPriceInput = totalPriceInputRef.current;
      if (totalPriceInput) {
        totalPriceInput.value = Math.round(animatedValue).toString();
      }
      
      // Продовжуємо анімацію, якщо ще не закінчили
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    // Запускаємо анімацію
    requestAnimationFrame(step);
    } catch (error) {
      console.error('Помилка при анімації ціни:', error);
      // Встановлюємо ціну без анімації
      setTotalPrice(targetPrice);
    }
  };

  // Розрахунок загальної вартості
  const calculateTotalPrice = () => {
    let total = 0;
    const selectedType = siteType || 'landing';
    const selectedDesign = designType || 'custom';
    const pagesValue = pagesCount || 1;
    
    // Базова ціна за тип сайту
    total += prices.types[selectedType as keyof typeof prices.types] || 0;
    
    // Додаткова вартість за кількість сторінок (якщо більше 1)
    if (pagesValue > 1) {
      total += (pagesValue - 1) * prices.pages.pricePerPage;
    }
    
    // Вартість дизайну
    total += prices.design[selectedDesign as keyof typeof prices.design] || 0;
    
    // Додаткові функції
    selectedFeatures.forEach(feature => {
      if (prices.features[feature as keyof typeof prices.features]) {
        total += prices.features[feature as keyof typeof prices.features];
      }
    });
    
    console.log('Розрахована ціна:', total, 'Тип сайту:', selectedType, 'Дизайн:', selectedDesign, 'Сторінки:', pagesValue);
    
    // Встановлюємо нову ціну в стан
    setTotalPrice(total);
    
    // Запускаємо анімацію зміни ціни
    setTimeout(() => animatePriceChange(total), 0);
    
    return total;
  };

  // Обробка зміни чекбоксів
  const handleFeatureChange = (feature: string) => {
    // Перевіряємо, чи вже вибрана ця опція
    const isAlreadySelected = selectedFeatures.includes(feature);
    
    // Дебаг інформація
    console.log(`Зміна функції ${feature}: була ${isAlreadySelected ? 'вибрана' : 'не вибрана'}, стане ${isAlreadySelected ? 'не вибрана' : 'вибрана'}`); 
    
    // Оновлюємо список вибраних функцій
    const newFeatures = isAlreadySelected
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    
    // Зберігаємо новий стан
    setSelectedFeatures(newFeatures);
    
    // Дебаг інформація про новий список функцій
    console.log('Новий список функцій:', newFeatures);
    
    // Виконуємо перерахунок ціни з невеликою затримкою
    // щоб дозволити стану оновитись
    setTimeout(() => {
      // Розраховуємо ціну вручну, щоб використати оновлений список функцій
      let total = 0;
      const selectedType = siteType || 'landing';
      const selectedDesign = designType || 'custom';
      const pagesValue = pagesCount || 1;
      
      // Базова ціна за тип сайту
      total += prices.types[selectedType as keyof typeof prices.types] || 0;
      
      // Додаткова вартість за кількість сторінок (якщо більше 1)
      if (pagesValue > 1) {
        total += (pagesValue - 1) * prices.pages.pricePerPage;
      }
      
      // Вартість дизайну
      total += prices.design[selectedDesign as keyof typeof prices.design] || 0;
      
      // Додаткові функції - використовуємо оновлений список
      newFeatures.forEach(feature => {
        if (prices.features[feature as keyof typeof prices.features]) {
          total += prices.features[feature as keyof typeof prices.features];
        }
      });
      
      console.log('Перерахована ціна після зміни чекбокса:', total);
      
      // Встановлюємо нову ціну в стан
      setTotalPrice(total);
      
      // Оновлюємо відображення ціни
      if (typeof window !== 'undefined') {
        const priceElement = document.getElementById('calculated-price');
        if (priceElement) {
          priceElement.textContent = formatPrice(total);
        }
      }
    }, 10);
  };
  
  // Відкриття модального вікна
  const openModal = () => {
    // Оновлюємо дані у формі перед відкриттям
    updateFormData();
    
    // Показуємо модальне вікно
    setIsModalOpen(true);
    
    // Перевіряємо, чи ми на клієнті
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };
  
  // Закриття модального вікна
  const closeModal = () => {
    setIsModalOpen(false);
    
    // Скидаємо стан форми через невелику затримку для плавності анімації
    setTimeout(() => {
      setFormErrors({});
    }, 300);
    
    // Перевіряємо, чи ми на клієнті
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Закриття модального вікна подяки
  const closeThanksModal = () => {
    setFormSubmitted(false);
    closeModal();
  };
  
  // Оновлення даних у формі
  const updateFormData = () => {
    // Перевіряємо, чи ми на клієнті
    if (typeof window === 'undefined') {
      return;
    }
    
    // Визначаємо тексти вибраних опцій без доступу до DOM
    let siteTypeText = 'Лендінг';
    switch(siteType) {
      case 'landing': siteTypeText = 'Лендінг'; break;
      case 'business-card': siteTypeText = 'Сайт-візитка'; break;
      case 'corporate': siteTypeText = 'Корпоративний сайт'; break;
      case 'online-store': siteTypeText = 'Інтернет-магазин'; break;
      case 'catalog': siteTypeText = 'Каталог товарів'; break;
      case 'other': siteTypeText = 'Інший тип'; break;
    }
    
    let designText = t('calculator.custom_design_short', 'Індивідуальний дизайн');
    switch(designType) {
      case 'template': designText = t('calculator.template_design', 'Шаблонний дизайн'); break;
      case 'custom': designText = t('calculator.custom_design', 'Індивідуальний (унікальний дизайн)'); break;
      case 'premium': designText = t('calculator.premium_design', 'Преміум дизайн'); break;
    }
    
    // Формуємо список вибраних додаткових послуг
    const selectedFeaturesText = selectedFeatures.map(feature => {
      return prices.descriptions[feature as keyof typeof prices.descriptions] || feature;
    }).join(', ');
    
    // Зберігаємо дані для відправки
    const projectData = {
      type: siteTypeText,
      pages: pagesCount.toString(),
      design: designText,
      features: selectedFeaturesText,
      budget: formatPrice(totalPrice, true)
    };
    
    // Зберігаємо дані в локальному сховищі для подальшої відправки
    try {
      localStorage.setItem('projectData', JSON.stringify(projectData));
    } catch (error) {
      console.error('Помилка при збереженні даних:', error);
    }
  };
  
  // Обробка зміни полів форми
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищуємо помилку при введенні даних
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Відправка запиту у WhatsApp із повними даними з калькулятора
  const handleWhatsAppOfferClick = () => {
    if (typeof window === 'undefined') return;

    // Текстові назви вибраних опцій
    let siteTypeText = t('calculator.landing', 'Лендінг');
    switch(siteType) {
      case 'landing': siteTypeText = t('calculator.landing', 'Лендінг'); break;
      case 'business-card': siteTypeText = t('calculator.business_card', 'Сайт-візитка'); break;
      case 'corporate': siteTypeText = t('calculator.corporate', 'Корпоративний сайт'); break;
      case 'online-store': siteTypeText = t('calculator.online_store', 'Інтернет-магазин'); break;
      case 'catalog': siteTypeText = t('calculator.catalog', 'Каталог товарів'); break;
      case 'other': siteTypeText = t('calculator.other', 'Інший тип сайту'); break;
    }

    let designText = 'Індивідуальний дизайн';
    switch(designType) {
      case 'template': designText = 'Шаблонний дизайн'; break;
      case 'custom': designText = 'Індивідуальний (унікальний дизайн)'; break;
      case 'premium': designText = 'Преміум дизайн'; break;
    }

    const selectedFeaturesText = selectedFeatures.length
      ? selectedFeatures
          .map(feature => prices.descriptions[feature as keyof typeof prices.descriptions] || feature)
          .join(', ')
      : t('calculator.no_additional_features', 'Без додаткових послуг');

    const budgetText = formatPrice(totalPrice);

    const fullMessage =
      t('whatsapp.calculator_intro', 'Добрий день! Хочу отримати комерційну пропозицію на розробку сайту.') + '\n\n' +
      `${t('whatsapp.calculator_site_type', 'Тип сайту')}: ${siteTypeText}\n` +
      `${t('whatsapp.calculator_pages', 'Кількість сторінок')}: ${pagesCount}\n` +
      `${t('whatsapp.calculator_design', 'Дизайн')}: ${designText}\n` +
      `${t('whatsapp.calculator_features', 'Додаткові послуги')}: ${selectedFeaturesText}\n` +
      `${t('whatsapp.calculator_budget', 'Розрахований бюджет')}: ${budgetText}`;

    const whatsappUrl = `https://wa.me/380988302566?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappUrl, '_blank');
  };
  
  // Валідація форми
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = t('calculator.form.required', "Це поле обов'язкове для заповнення");
    }
    
    if (!formData.email.trim()) {
      errors.email = t('calculator.form.required', "Це поле обов'язкове для заповнення");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('calculator.form.invalid_email', "Некоректний формат email");
    }
    
    if (!formData.phone.trim()) {
      errors.phone = t('calculator.form.required', "Це поле обов'язкове для заповнення");
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Обробка відправки форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Отримуємо дані проекту
      const form = e.target as HTMLFormElement;
      
      // Визначаємо тип сайту в зрозумілому форматі
      let siteTypeText = '';
      switch(siteType) {
        case 'landing': siteTypeText = t('calculator.landing', 'Лендінг під ключ'); break;
        case 'business-card': siteTypeText = t('calculator.business_card', 'Сайт-візитка'); break;
        case 'corporate': siteTypeText = t('calculator.corporate', 'Корпоративний сайт'); break;
        case 'online-store': siteTypeText = t('calculator.online_store', 'Інтернет-магазин'); break;
        case 'catalog': siteTypeText = t('calculator.catalog', 'Сайт-каталог'); break;
        default: siteTypeText = t('calculator.other', 'Інший тип сайту');
      }
      
      // Визначаємо тип дизайну в зрозумілому форматі
      let designTypeText = '';
      switch(designType) {
        case 'template': designTypeText = t('calculator.template_design', 'Шаблонний дизайн'); break;
        case 'custom': designTypeText = t('calculator.custom_design', 'Індивідуальний дизайн'); break;
        case 'premium': designTypeText = t('calculator.premium_design', 'Преміум дизайн'); break;
        default: designTypeText = t('calculator.template_design', 'Стандартний дизайн');
      }
      
      // Формуємо список функцій в зрозумілому форматі
      const featuresText = selectedFeatures.map(feature => {
        switch(feature) {
          case 'seo': return t('calculator.seo', 'SEO-оптимізація');
          case 'content': return t('calculator.content', 'Наповнення контентом');
          case 'domain': return t('calculator.domain', 'Реєстрація домену');
          case 'hosting': return t('calculator.hosting', 'Хостинг на рік');
          case 'support': return t('calculator.support', 'Технічна підтримка');
          case 'analytics': return t('calculator.analytics', 'Налаштування аналітики');
          default: return feature;
        }
      }).join(', ') || t('calculator.no_additional_features', 'Без додаткових функцій');
      
      // Підготовка даних для відправки
      const templateParams = {
        to_email: 'vitaliilevenets@gmail.com', // Емейл для отримання заявок
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || 'Повідомлення не залишено',
        type: siteTypeText,
        pages: pagesCount.toString(),
        design: designTypeText,
        features: featuresText,
        budget: formatPrice(totalPrice, true),
        timestamp: new Date().toLocaleString()
      };
      
      // Відправка даних через EmailJS
      console.log('Відправляю дані:', templateParams);
      const response = await emailjs.send(
        'service_3ymd4he', // ID сервісу EmailJS
        'template_58es2ku', // ID шаблону для калькулятора
        templateParams
      );
      
      console.log('Успішно відправлено:', response);
      
      // Показуємо повідомлення про успіх
      setFormSubmitted(true);
      
      // Скидаємо форму для наступного використання
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      console.log('Помилка при відправці форми:', error);
      alert(t('calculator.error_message', 'Помилка при відправці форми. Спробуйте ще раз.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Автоматичний розрахунок при першому завантаженні
  useEffect(() => {
    // Перевіряємо, чи ми на клієнті
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      // Затримка для гарантії, що елемент DOM буде доступний
      const timer = setTimeout(() => {
        // Розраховуємо початкову ціну
        let initialTotal = 0;
        initialTotal += prices.types[siteType as keyof typeof prices.types] || 0;
        
        if (pagesCount > 1) {
          initialTotal += (pagesCount - 1) * prices.pages.pricePerPage;
        }
        
        initialTotal += prices.design[designType as keyof typeof prices.design] || 0;
        
        selectedFeatures.forEach(feature => {
          if (prices.features[feature as keyof typeof prices.features]) {
            initialTotal += prices.features[feature as keyof typeof prices.features];
          }
        });
        
        // Встановлюємо початкову ціну без анімації
        setTotalPrice(initialTotal);
        
        // Оновлюємо відображення ціни напряму
        const priceElement = document.getElementById('calculated-price');
        if (priceElement) {
          priceElement.textContent = formatPrice(initialTotal);
        }
        
        console.log('Початкова ціна встановлена:', initialTotal);
      }, 10);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Помилка при ініціалізації калькулятора:', error);
    }
  }, []);

  return (
    <>
      <SectionSEO sectionId="calculator" />
      <section id="calculator" className={styles.calculator}>
      <div className="container">
        <h2 className={styles.title}>{t('calculator.title', 'Розрахувати вартість сайту')}</h2>
        
        <div className={styles.calculatorWrapper}>
          <div className={styles.calculatorForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('calculator.type', 'Тип сайту')} <span className={styles.infoIcon} title={t('calculator.type_info', 'Оберіть тип сайту, який вам потрібен')}>i</span>
              </label>
                <select 
                  id="site-type"
                  value={siteType}
                  onChange={(e) => {
                    const newSiteType = e.target.value;
                    console.log(`Зміна типу сайту з ${siteType} на ${newSiteType}`);
                    setSiteType(newSiteType);
                    
                    // Виконуємо розрахунок вручну з новим типом сайту
                    setTimeout(() => {
                      let total = 0;
                      
                      // Використовуємо новий тип сайту
                      total += prices.types[newSiteType as keyof typeof prices.types] || 0;
                      
                      // Додаткова вартість за кількість сторінок (якщо більше 1)
                      if (pagesCount > 1) {
                        total += (pagesCount - 1) * prices.pages.pricePerPage;
                      }
                      
                      // Вартість дизайну
                      total += prices.design[designType as keyof typeof prices.design] || 0;
                      
                      // Додаткові функції
                      selectedFeatures.forEach(feature => {
                        if (prices.features[feature as keyof typeof prices.features]) {
                          total += prices.features[feature as keyof typeof prices.features];
                        }
                      });
                      
                      console.log('Нова ціна після зміни типу сайту:', total);
                      
                      // Встановлюємо нову ціну в стан
                      setTotalPrice(total);
                      
                      // Запускаємо анімацію зміни ціни
                      animatePriceChange(total);
                    }, 10);
                  }}
                  className={styles.select}
                >
                <option value="landing">{t('calculator.landing', 'Лендінг')}</option>
                <option value="business-card">{t('calculator.business_card', 'Сайт-візитка')}</option>
                <option value="corporate">{t('calculator.corporate', 'Корпоративний сайт')}</option>
                <option value="online-store">{t('calculator.online_store', 'Інтернет-магазин')}</option>
                <option value="catalog">{t('calculator.catalog', 'Каталог товарів')}</option>
                <option value="other">{t('calculator.other', 'Інший тип')}</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('calculator.pages', 'Кількість сторінок')} <span className={styles.infoIcon} title={t('calculator.pages_info', 'Вкажіть приблизну кількість сторінок')}>i</span>
              </label>
              <div className={styles.sliderContainer}>
                <input 
                  type="range" 
                  id="pages"
                  min={1} 
                  max={50} 
                  value={pagesCount}
                  onChange={(e) => {
                    const newPagesCount = parseInt(e.target.value);
                    console.log(`Зміна кількості сторінок з ${pagesCount} на ${newPagesCount}`);
                    setPagesCount(newPagesCount);
                    
                    // Виконуємо розрахунок вручну з новою кількістю сторінок
                    setTimeout(() => {
                      let total = 0;
                      
                      // Базова ціна за тип сайту
                      total += prices.types[siteType as keyof typeof prices.types] || 0;
                      
                      // Додаткова вартість за кількість сторінок (якщо більше 1)
                      if (newPagesCount > 1) {
                        total += (newPagesCount - 1) * prices.pages.pricePerPage;
                      }
                      
                      // Вартість дизайну
                      total += prices.design[designType as keyof typeof prices.design] || 0;
                      
                      // Додаткові функції
                      selectedFeatures.forEach(feature => {
                        if (prices.features[feature as keyof typeof prices.features]) {
                          total += prices.features[feature as keyof typeof prices.features];
                        }
                      });
                      
                      console.log('Нова ціна після зміни кількості сторінок:', total);
                      
                      // Встановлюємо нову ціну в стан
                      setTotalPrice(total);
                      
                      // Запускаємо анімацію зміни ціни
                      animatePriceChange(total);
                    }, 10);
                  }}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                  <span>50+</span>
                </div>
                <div id="pages-value" className={styles.sliderValue}>{t('calculator.pages_count', { count: pagesCount })}</div>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('calculator.design', 'Дизайн')} <span className={styles.infoIcon} title={t('calculator.design_info', 'Оберіть тип дизайну для вашого сайту')}>i</span>
              </label>
                <select 
                  id="design"
                  value={designType}
                  onChange={(e) => {
                    const newDesignType = e.target.value;
                    console.log(`Зміна типу дизайну з ${designType} на ${newDesignType}`);
                    setDesignType(newDesignType);
                    
                    // Виконуємо розрахунок вручну з новим типом дизайну
                    setTimeout(() => {
                      let total = 0;
                      
                      // Базова ціна за тип сайту
                      total += prices.types[siteType as keyof typeof prices.types] || 0;
                      
                      // Додаткова вартість за кількість сторінок (якщо більше 1)
                      if (pagesCount > 1) {
                        total += (pagesCount - 1) * prices.pages.pricePerPage;
                      }
                      
                      // Вартість дизайну - використовуємо новий тип дизайну
                      total += prices.design[newDesignType as keyof typeof prices.design] || 0;
                      
                      // Додаткові функції
                      selectedFeatures.forEach(feature => {
                        if (prices.features[feature as keyof typeof prices.features]) {
                          total += prices.features[feature as keyof typeof prices.features];
                        }
                      });
                      
                      console.log('Нова ціна після зміни типу дизайну:', total);
                      
                      // Встановлюємо нову ціну в стан
                      setTotalPrice(total);
                      
                      // Запускаємо анімацію зміни ціни
                      animatePriceChange(total);
                    }, 10);
                  }}
                  className={styles.select}
                >
                <option value="template">{t('calculator.template_design', 'Шаблонний дизайн')}</option>
                <option value="custom">{t('calculator.custom_design', 'Індивідуальний (унікальний дизайн)')}</option>
                <option value="premium">{t('calculator.premium_design', 'Преміум дизайн')}</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t('calculator.additional_services', 'Додаткові послуги')} <span className={styles.infoIcon} title={t('calculator.additional_services_info', 'Оберіть додаткові послуги, які вам потрібні')}>i</span>
              </label>
              <div className={styles.checkboxGroup}>
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    id="seo" 
                    name="features" 
                    value="seo"
                    data-feature-name="SEO оптимізація"
                    checked={selectedFeatures.includes('seo')}
                    onChange={(e) => handleFeatureChange('seo')}
                  />
                  <label htmlFor="seo">{t('calculator.seo', 'SEO оптимізація')} <span className={styles.featurePrice}>+$120</span></label>
                </div>
                
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    id="content" 
                    name="features" 
                    value="content"
                    data-feature-name="Наповнення контентом"
                    checked={selectedFeatures.includes('content')}
                    onChange={(e) => handleFeatureChange('content')}
                  />
                  <label htmlFor="content">{t('calculator.content', 'Наповнення контентом')} <span className={styles.featurePrice}>+$100</span></label>
                </div>
                
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    id="domain" 
                    name="features" 
                    value="domain"
                    data-feature-name="Домен на рік"
                    checked={selectedFeatures.includes('domain')}
                    onChange={(e) => handleFeatureChange('domain')}
                  />
                  <label htmlFor="domain">{t('calculator.domain', 'Домен на рік')} <span className={styles.featurePrice}>+$15/{t('calculator.year', 'рік')}</span></label>
                </div>
                
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    id="hosting" 
                    name="features" 
                    value="hosting"
                    data-feature-name="Хостинг на рік"
                    checked={selectedFeatures.includes('hosting')}
                    onChange={(e) => handleFeatureChange('hosting')}
                  />
                  <label htmlFor="hosting">{t('calculator.hosting', 'Хостинг на рік')} <span className={styles.featurePrice}>+$75/{t('calculator.year', 'рік')}</span></label>
                </div>
                
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    id="support" 
                    name="features" 
                    value="support"
                    data-feature-name="Техпідтримка 3 місяці"
                    checked={selectedFeatures.includes('support')}
                    onChange={(e) => handleFeatureChange('support')}
                  />
                  <label htmlFor="support">{t('calculator.support', 'Техпідтримка')} <span className={styles.featurePrice}>+$100/{t('calculator.month', 'міс')}</span></label>
                </div>
                
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    id="analytics" 
                    name="features" 
                    value="analytics"
                    data-feature-name="Налаштування аналітики"
                    checked={selectedFeatures.includes('analytics')}
                    onChange={(e) => handleFeatureChange('analytics')}
                  />
                  <label htmlFor="analytics">{t('calculator.analytics', 'Налаштування аналітики')} <span className={styles.featurePrice}>+$60</span></label>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${styles.calculatorResult} ${styles.active}`}>
            <div className={styles.priceBox}>
              <h3>{t('calculator.result', 'Орієнтовна вартість:')}</h3>
              <div className={styles.price}>
                <span id="calculated-price" ref={calculatedPriceRef}>{formatPrice(totalPrice)}</span>
              </div>
                <input type="hidden" id="total-price" name="total-price" ref={totalPriceInputRef} value={formatPrice(totalPrice, true)} />
              <p className={styles.priceNote}>{t('calculator.price_note', 'разово')}</p>
              <p className={styles.priceDisclaimer}>{t('calculator.price_disclaimer', '* Точну вартість уточніть у менеджера')}</p>
              
              <div id="features-list" className={styles.resultDetails}>
                {/* Відображення обов'язкових елементів */}
                <div className={styles.resultItem}>
                  <span>
                    {(() => {
                      // Визначаємо текст вибраного типу сайту
                      switch(siteType) {
                        case 'landing': return t('calculator.landing', 'Лендінг');
                        case 'business-card': return t('calculator.business_card', 'Сайт-візитка');
                        case 'corporate': return t('calculator.corporate', 'Корпоративний сайт');
                        case 'online-store': return t('calculator.online_store', 'Інтернет-магазин');
                        case 'catalog': return t('calculator.catalog', 'Каталог товарів');
                        case 'other': return t('calculator.other', 'Інший тип');
                        default: return t('calculator.website', 'Сайт');
                      }
                    })()}
                  </span>
                </div>
                
                <div className={styles.resultItem}>
                  <span>{t('calculator.pages_count', { count: pagesCount })}</span>
                </div>
                
                <div className={styles.resultItem}>
                  <span>
                    {(() => {
                      // Визначаємо текст вибраного типу дизайну
                      switch(designType) {
                        case 'template': return t('calculator.template_design', 'Шаблонний дизайн');
                        case 'custom': return t('calculator.custom_design', 'Індивідуальний (унікальний дизайн)');
                        case 'premium': return t('calculator.premium_design', 'Преміум дизайн');
                        default: return t('calculator.custom_design_short', 'Індивідуальний дизайн');
                      }
                    })()}
                  </span>
                </div>
                
                {/* Відображення вибраних додаткових послуг */}
                {selectedFeatures.length > 0 && (
                  <>
                    <div className={styles.resultItemHeader}>{t('calculator.additional_services_title', 'Додаткові послуги:')}</div>
                    {selectedFeatures.map(feature => {
                      // Використовуємо переклади для додаткових послуг
                      let featureText;
                      switch(feature) {
                        case 'seo': featureText = t('calculator.seo', 'SEO оптимізація'); break;
                        case 'content': featureText = t('calculator.content', 'Наповнення контентом'); break;
                        case 'domain': featureText = t('calculator.domain', 'Домен на рік'); break;
                        case 'hosting': featureText = t('calculator.hosting', 'Хостинг на рік'); break;
                        case 'support': featureText = t('calculator.support', 'Техпідтримка'); break;
                        case 'analytics': featureText = t('calculator.analytics', 'Налаштування аналітики'); break;
                        default: featureText = feature;
                      }
                      
                      return (
                        <div key={feature} className={styles.resultItem}>
                          <span>{featureText}</span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              
              <button 
                onClick={handleWhatsAppOfferClick}
                className={styles.offerButton}
              >
                {t('calculator.get_offer', 'Отримати комерційну пропозицію')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Модальне вікно для комерційної пропозиції */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button 
              className={styles.closeModal}
              onClick={() => closeModal()}
            >
              &times;
            </button>
            
            {!formSubmitted && (
              <div className={styles.modalHeader}>
                <h3>{t('calculator.offer_title', 'Отримати комерційну пропозицію')}</h3>
                <p>{t('calculator.offer_description', 'Залиште свої контактні дані, і ми надішлемо вам детальну комерційну пропозицію')}</p>
              </div>
            )}
            
            {formSubmitted ? (
              <div className={styles.modalThanks}>
                <div className={styles.modalThanksContent} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.modalThanksClose} onClick={closeThanksModal}>
                    ✕
                  </div>
                  <div className={styles.modalThanksIcon}>
                    ✓
                  </div>
                  <h3>{t('calculator.thank_you_title', 'Дякуємо за заявку!')}</h3>
                  <p>{t("calculator.thank_you_message", "Ваше повідомлення успішно надіслано. Ми зв'яжемося з вами найближчим часом.")}</p>
                  <button className={styles.btnPrimary} onClick={closeThanksModal}>{t('calculator.ok_button', 'Чудово')}</button>
                </div>
              </div>
            ) : (
              <form id="offer-form" onSubmit={handleSubmit} className={styles.offerForm}>
                {/* Приховані поля для даних проекту */}
                <input type="hidden" id="project-type" name="project-type" />
                <input type="hidden" id="project-pages" name="project-pages" />
                <input type="hidden" id="project-design" name="project-design" />
                <input type="hidden" id="project-features" name="project-features" />
                <input type="hidden" id="project-budget" name="project-budget" />
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t('calculator.form.name', 'Ваше ім\'я')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? styles.inputError : ''}
                    required 
                  />
                  {formErrors.name && <div className={styles.errorMessage}>{formErrors.name}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">{t('calculator.form.email', 'Email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? styles.inputError : ''}
                    required 
                  />
                  {formErrors.email && <div className={styles.errorMessage}>{formErrors.email}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">{t('calculator.form.phone', 'Телефон')}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? styles.inputError : ''}
                    required 
                  />
                  {formErrors.phone && <div className={styles.errorMessage}>{formErrors.phone}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">{t('calculator.form.message', 'Повідомлення')}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className={formErrors.message ? styles.inputError : ''}
                  ></textarea>
                  {formErrors.message && <div className={styles.errorMessage}>{formErrors.message}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <div className={styles.policyCheckbox}>
                    <input type="checkbox" id="privacy-policy" name="privacy-policy" required />
                    <label htmlFor="privacy-policy" className={styles.policyLabel}>
                      <span className={styles.policyText}>{t('calculator.privacy_agree', 'Я погоджуюсь з')}</span>
                      <span className={styles.policySpacer}> </span>
                      <a href="/privacy-policy" className={styles.policyLink}>{t('footer.privacy', 'політикою конфіденційності')}</a>
                    </label>
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="submit" 
                    className={styles.btnPrimary}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('calculator.form.sending', 'Відправляємо...') : t('calculator.form.send', 'Відправити')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Calculator;