'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Sphere.module.css';

const OrderSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Функція для визначення мобільного пристрою
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Створюємо базову сцену Three.js
    const scene = new THREE.Scene();
    
    // Налаштовуємо камеру відповідно до розмірів контейнера
    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    
    // Адаптуємо позицію камери в залежності від типу пристрою
    camera.position.z = 25; // Для форми замовлення використовуємо фіксовану відстань
    
    // Створюємо рендерер
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true // Додаємо згладжування для кращої якості
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Оптимізація для мобільних пристроїв
    if (isMobile()) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Обмежуємо pixelRatio для продуктивності
    } else {
      renderer.setPixelRatio(window.devicePixelRatio);
    }
    
    // Очищуємо контейнер і додаємо canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Застосовуємо стилі до canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    
    // Створюємо просту геометрію - кольорову сферу
    // Адаптуємо деталізацію та розмір для мобільних
    const sphereRadius = 13; // Більший розмір для форми замовлення
    const sphereSegments = 32; // Вища деталізація
    const geometry = new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereSegments);
    
    // Створюємо матеріал з переливанням кольорів
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x4A6CF7, // Синій колір для форми замовлення
      wireframe: true
    });
    
    // Змінні для анімації кольору
    const colorParams = {
      r: 0.0,
      g: 0.5,
      b: 1.0,
      cycleSpeed: 0.005,
      time: 0
    };
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Обробник зміни розміру вікна
    const handleResize = () => {
      // Перевіряємо тип пристрою при зміні розміру
      const mobile = isMobile();
      
      // Оновлюємо розміри рендерера
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(mobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Функція анімації
    function animate() {
      const animationId = requestAnimationFrame(animate);
      
      // Обертаємо сферу з різною швидкістю
      const rotationSpeed = 0.005;
      sphere.rotation.x += rotationSpeed;
      sphere.rotation.y += rotationSpeed * 1.6;
      
      // Анімуємо колір сфери
      colorParams.time += colorParams.cycleSpeed;
      
      // Змінюємо компоненти кольору за синусоїдальним патерном
      // Використовуємо трохи інші параметри для створення відмінного ефекту
      colorParams.r = Math.abs(Math.sin(colorParams.time * 0.8)) * 0.5;
      colorParams.g = Math.abs(Math.sin(colorParams.time * 0.6 + 1)) * 0.5;
      colorParams.b = Math.abs(Math.cos(colorParams.time * 0.7 + 2)) * 0.8 + 0.2;
      
      // Застосовуємо новий колір
      material.color.setRGB(
        colorParams.r,
        colorParams.g,
        colorParams.b
      );
      
      // Рендеримо сцену
      renderer.render(scene, camera);
      
      return animationId;
    }
    
    // Запускаємо анімацію
    const animationId = animate();
    
    // Очищення при розмонтуванні компонента
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      // Очищення ресурсів Three.js
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.orderSphereContainer}
    ></div>
  );
};

export default OrderSphere;
