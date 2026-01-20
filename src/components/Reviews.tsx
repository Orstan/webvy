'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import styles from './Reviews.module.css';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { useI18n } from '@/utils/i18n-context';

interface Review {
  id: string;
  name: string;
  email?: string;
  rating: number;
  text: string;
  date: any;
}

const Reviews = () => {
  const { t } = useI18n();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    text: '',
  });
  const [formVisible, setFormVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Отримання відгуків з Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, 'reviews');
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList = reviewsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        
        // Сортування за датою (найновіші спочатку)
        reviewsList.sort((a, b) => {
          // Безпечне порівняння дат
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          
          try {
            return b.date.toDate() - a.date.toDate();
          } catch (e) {
            // Якщо дата не може бути перетворена на Date
            return 0;
          }
        });
        
        setReviews(reviewsList);
        setLoading(false);
      } catch (error) {
        console.error('Помилка при отриманні відгуків:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Функція для переходу до наступного відгуку
  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Функція для переходу до попереднього відгуку
  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Обробка зміни полів форми
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  // Відправка нового відгуку
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const reviewsCollection = collection(db, 'reviews');
      const newReview = {
        ...formData,
        date: serverTimestamp(),
      };
      
      // Додаємо відгук до Firebase
      const docRef = await addDoc(reviewsCollection, newReview);
      
      // Створюємо новий відгук для відображення на сайті
      const newReviewWithId = {
        id: docRef.id,
        ...formData,
        date: new Date(), // Використовуємо поточну дату для миттєвого відображення
      };
      
      // Додаємо новий відгук до списку і оновлюємо стан
      setReviews(prevReviews => [newReviewWithId, ...prevReviews]);
      
      // Переходимо до нового відгуку
      setCurrentIndex(0);

      // Очищення форми та показ повідомлення про успіх
      setFormData({
        name: '',
        email: '',
        rating: 5,
        text: '',
      });
      setSubmitStatus('success');
      
      // Приховання повідомлення про успіх через 3 секунди
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormVisible(false);
      }, 3000);
      
    } catch (error) {
      console.error('Помилка при додаванні відгуку:', error);
      setSubmitStatus('error');
    }
  };

  // Відображення зірок рейтингу
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? styles.starFilled : styles.starEmpty} 
      />
    ));
  };

  return (
    <section className={styles.reviews} id="reviews">
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('reviews.title')}</h2>
        <h3 className={styles.sectionSubtitle}>{t('reviews.subtitle')}</h3>
        
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>{t('reviews.loading')}</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className={styles.reviewsContainer}>
            <div className={styles.reviewsSlider}>
              {reviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className={`${styles.reviewCard} ${index === currentIndex ? styles.active : ''}`}
                  style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                >
                  <div className={styles.reviewContent}>
                    <FaQuoteLeft className={styles.quoteIcon} />
                    <p className={styles.reviewText}>{review.text}</p>
                    <FaQuoteRight className={styles.quoteIcon} />
                  </div>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.authorInfo}>
                      <h4>{review.name}</h4>
                      {/* Email не відображається в картці відгуку */}
                    </div>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.reviewControls}>
              <button className={styles.controlBtn} onClick={prevReview} aria-label={t('reviews.previous')}>
                &lt;
              </button>
              <div className={styles.reviewDots}>
                {reviews.map((_, index) => (
                  <span 
                    key={index} 
                    className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  ></span>
                ))}
              </div>
              <button className={styles.controlBtn} onClick={nextReview} aria-label={t('reviews.next')}>
                &gt;
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.noReviews}>
            <p>{t('reviews.no_reviews')}</p>
            <button className={styles.addReviewBtn} onClick={() => setFormVisible(true)}>{t('reviews.leave_review')}</button>
          </div>
        )}
        
        <div className={styles.addReviewSection}>
          {!formVisible ? (
            <button 
              className={styles.addReviewBtn} 
              onClick={() => setFormVisible(true)}
            >
              {t('reviews.leave_review')}
            </button>
          ) : (
            <div className={styles.reviewForm}>
              <h3>{t('reviews.leave_review')}</h3>
              
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  {t('reviews.success_message')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  {t('reviews.error_message')}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t('reviews.form.name')} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">{t('reviews.form.email')} <span className={styles.privateNote}>({t('reviews.form.not_published')})</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('reviews.form.email_placeholder')}
                    required
                  />
                  <small className={styles.privateHint}>{t('reviews.form.email_hint')}</small>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="rating">{t('reviews.form.rating')} *</label>
                  <div className={styles.interactiveRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star} 
                        className={`${styles.starInteractive} ${star <= formData.rating ? styles.starFilled : styles.starEmpty}`}
                        onClick={() => setFormData({...formData, rating: star})}
                      >
                        <FaStar />
                      </span>
                    ))}
                    <span className={styles.ratingText}>
                      {formData.rating === 5 && t('reviews.rating.excellent')}
                      {formData.rating === 4 && t('reviews.rating.very_good')}
                      {formData.rating === 3 && t('reviews.rating.good')}
                      {formData.rating === 2 && t('reviews.rating.fair')}
                      {formData.rating === 1 && t('reviews.rating.poor')}
                    </span>
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="text">{t('reviews.form.text')} *</label>
                  <textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  ></textarea>
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelBtn}
                    onClick={() => setFormVisible(false)}
                  >
                    {t('reviews.form.cancel')}
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? t('reviews.form.submitting') : t('reviews.form.submit')}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
