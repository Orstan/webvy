'use client';

import Script from 'next/script';

export default function ClientTitleScript() {
  return (
    <Script id="dynamic-title-script" strategy="afterInteractive">
      {`
        (function() {
          function updateTitle() {
            const locale = localStorage.getItem('locale') || 'uk';
            const titles = {
              uk: 'WebVy — Розробка сайтів під ключ | Лендінги, візитки, онлайн-магазини',
              en: 'WebVy — Website Development | Landing Pages, Business Sites, Online Stores',
              ru: 'WebVy — Разработка сайтов под ключ | Лендинги, визитки, интернет-магазины'
            };
            document.title = titles[locale] || titles.uk;
          }

          // Змінюємо заголовок при завантаженні сторінки
          updateTitle();

          // Створюємо MutationObserver для відстеження змін у DOM
          const observer = new MutationObserver(function(mutations) {
            // Перевіряємо, чи змінилася мова
            updateTitle();
          });

          // Налаштовуємо спостереження за змінами в body
          observer.observe(document.body, { 
            childList: true, 
            subtree: true 
          });

          // Додаємо обробник події для зберігання в localStorage
          window.addEventListener('storage', function(e) {
            if (e.key === 'locale') {
              updateTitle();
            }
          });
        })();
      `}
    </Script>
  );
}
