export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  categoryKey: string;
  tagsKeys: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'yak-vybraty-hostyng',
    title: 'Як вибрати надійний хостинг для бізнес-сайту | Блог WebVy',
    description: 'Пояснюю, як відрізнити нормальний хостинг від проблемного, чим shared відрізняється від VPS і як вибір тарифу впливає на швидкість та стабільність сайту.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_webdev', 'blog.tag_hosting']
  },
  {
    slug: 'seo-dlya-lendingu',
    title: 'SEO для лендингу: з чого почати оптимізацію односторінкового сайту | Блог WebVy',
    description: 'Розбираю базові принципи SEO для лендінгів: структура заголовків, контент, швидкість завантаження та технічні налаштування, які допомагають отримувати трафік з пошуку.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_seo', 'blog.tag_webdev']
  },
  {
    slug: 'react-vs-wordpress',
    title: 'React/Next.js чи WordPress: що краще для вашого сайту | Блог WebVy',
    description: 'Порівнюю можливості React/Next.js і WordPress для бізнес-сайтів: швидкість, безпека, масштабованість, гнучкість дизайну та подальший розвиток проєкту.',
    categoryKey: 'blog.category_tech',
    tagsKeys: ['blog.tag_react', 'blog.tag_webdev']
  },
  {
    slug: 'core-web-vitals',
    title: 'Core Web Vitals: головні метрики швидкості сайту для SEO | Блог WebVy',
    description: 'Що таке LCP, CLS та INP, чому Google приділяє їм увагу та як оптимізований сайт на Next.js допомагає покращити ці показники.',
    categoryKey: 'blog.category_tech',
    tagsKeys: ['blog.tag_seo', 'blog.tag_webdev']
  },
  {
    slug: 'struktura-lendingu',
    title: 'Ідеальна структура лендінгу, який продає | Блог WebVy',
    description: 'Які блоки повинні бути на сучасному продаючому лендингу: від першого екрану й вигод до відгуків, FAQ та сильної форми заявки.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_webdev', 'blog.tag_seo']
  },
  {
    slug: 'optimizaciya-shvydkosti',
    title: 'Оптимізація швидкості сайту: практичні кроки для бізнесу | Блог WebVy',
    description: 'Розбираю типові причини повільної роботи сайту та показую, як за допомогою Next.js, оптимізації зображень і кешування реально прискорити завантаження.',
    categoryKey: 'blog.category_tech',
    tagsKeys: ['blog.tag_seo', 'blog.tag_webdev']
  },
  {
    slug: 'konversiya-lendingu',
    title: 'Як підвищити конверсію лендингу без збільшення бюджету | Блог WebVy',
    description: 'Пояснюю, як змінити структуру, тексти та дизайн лендингу, щоб отримувати більше заявок з того ж самого трафіку.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_seo', 'blog.tag_webdev']
  },
  {
    slug: 'bezpeka-saitu',
    title: 'Безпека сайту: базові налаштування, які захищають бізнес онлайн | Блог WebVy',
    description: 'SSL, оновлення, резервні копії та захист форм — про мінімальний рівень безпеки сайту, без якого ризикує кожен бізнес.',
    categoryKey: 'blog.category_tech',
    tagsKeys: ['blog.tag_webdev']
  },
  {
    slug: 'stvorennya-saitu-cina',
    title: 'Скільки коштує створення сайту під ключ: з чого складається ціна | Блог WebVy',
    description: 'Пояснюю, як формується вартість сайту: що впливає на ціну лендінгу, корпоративного сайту та інтернет-магазину, і як не переплатити за непотрібний функціонал.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_webdev', 'blog.tag_seo']
  },
  {
    slug: 'landing-chi-site',
    title: 'Лендінг чи багатосторінковий сайт: що обрати бізнесу | Блог WebVy',
    description: 'Розбираю, коли достатньо односторінкового лендингу, а коли краще інвестувати в повноцінний сайт з кількома розділами та блогом.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_webdev', 'blog.tag_seo']
  },
  {
    slug: 'seo-pislya-zapusku',
    title: 'SEO після запуску сайту: що робити далі, щоб був трафік | Блог WebVy',
    description: 'Чек-ліст дій після запуску сайту: аналітика, Google Search Console, контент-план, посилання та технічна підтримка, щоб сайт не просто існував, а ріс у пошуку.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_seo']
  },
  {
    slug: 'pomylky-pry-zamovlenni-saitu',
    title: 'Типові помилки при замовленні сайту: як не зіпсувати проєкт ще на старті | Блог WebVy',
    description: 'Розповідаю, які рішення на етапі замовлення сайту найчастіше призводять до провалених результатів, зривів термінів і зайвих витрат, і як цього уникнути.',
    categoryKey: 'blog.category_guides',
    tagsKeys: ['blog.tag_webdev', 'blog.tag_seo']
  }
];
