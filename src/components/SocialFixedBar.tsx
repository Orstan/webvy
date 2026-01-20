"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import styles from './SocialFixedBar.module.css';

const SocialFixedBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.socialFixedBar}>
      <div className={`${styles.socialIcons} ${isOpen ? styles.open : ''}`}>
        <Link href="tel:+380988302566" className={`${styles.socialIcon} ${styles.phone}`} aria-label="Телефон">
          <FaPhone />
        </Link>
        
        <Link href="mailto:my@webvy.online" className={`${styles.socialIcon} ${styles.email}`} aria-label="Email">
          <FaEnvelope />
        </Link>
        
        <Link href="https://t.me/L_evenets" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.telegram}`} aria-label="Telegram">
          <FaTelegram />
        </Link>
        
        <Link href="https://wa.me/380988302566" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.whatsapp}`} aria-label="WhatsApp">
          <FaWhatsapp />
        </Link>
      </div>
      
      <button 
        className={`${styles.mainButton} ${isOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-label="Відкрити меню соціальних мереж"
      >
        <FaPhone />
      </button>
    </div>
  );
};

export default SocialFixedBar;
