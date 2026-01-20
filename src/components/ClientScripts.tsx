'use client';

import { useEffect } from 'react';
import { initMobileMenu, initSmoothScroll } from '@/app/scripts';

const ClientScripts = () => {
  useEffect(() => {
    // Ініціалізація скриптів після завантаження DOM
    initMobileMenu();
    initSmoothScroll();
  }, []);

  return null; // Цей компонент не рендерить нічого
};

export default ClientScripts;
