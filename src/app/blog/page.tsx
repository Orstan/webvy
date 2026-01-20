'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/utils/i18n-context';
import MobileMenu from '@/components/MobileMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';

const postsMeta = [
  { slug: 'yak-vybraty-hostyng', tagsKeys: ['blog.tag_webdev', 'blog.tag_hosting'], categoryKey: 'blog.category_guides' },
  { slug: 'seo-dlya-lendingu', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'], categoryKey: 'blog.category_guides' },
  { slug: 'react-vs-wordpress', tagsKeys: ['blog.tag_react', 'blog.tag_webdev'], categoryKey: 'blog.category_tech' },
  { slug: 'core-web-vitals', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'], categoryKey: 'blog.category_tech' },
  { slug: 'struktura-lendingu', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'], categoryKey: 'blog.category_guides' },
  { slug: 'optimizaciya-shvydkosti', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'], categoryKey: 'blog.category_tech' },
  { slug: 'konversiya-lendingu', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'], categoryKey: 'blog.category_guides' },
  { slug: 'bezpeka-saitu', tagsKeys: ['blog.tag_webdev'], categoryKey: 'blog.category_tech' },
  { slug: 'stvorennya-saitu-cina', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'], categoryKey: 'blog.category_guides' },
  { slug: 'landing-chi-site', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'], categoryKey: 'blog.category_guides' },
  { slug: 'seo-pislya-zapusku', tagsKeys: ['blog.tag_seo'], categoryKey: 'blog.category_guides' },
  { slug: 'pomylky-pry-zamovlenni-saitu', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'], categoryKey: 'blog.category_guides' },
] as const;

const seoContent = {
  uk: {
    title: 'Розробка сайтів під ключ: Next.js, React та сучасні технології',
    paragraphs: [
      'Якщо ви шукаєте, де замовити розробку сайту під ваш бізнес, важливо обрати розробника, який працює з сучасними технологіями та розуміє, як сайт впливає на продажі. Я спеціалізуюся на створенні швидких, адаптивних і SEO-оптимізованих веб-рішень на базі Next.js та React. Це означає, що ваш сайт буде не лише гарно виглядати, але й швидко завантажуватися та коректно індексуватися в Google.',
      'Вартість створення сайту залежить від типу проекту: лендінг, сайт-візитка, блог чи повноцінний інтернет-магазин. На сторінці ви можете скористатися зручним калькулятором, щоб попередньо оцінити бюджет. Я допомагаю підібрати оптимальний стек технологій, структуру та функціонал, щоб ви не переплачували за зайве, але при цьому отримали інструмент, який реально приносить клієнтів.',
      'Працюю з клієнтами по всій Україні та за кордоном, пропонуючи повний цикл послуг: від аналізу ніші та прототипування до дизайну, фронтенд-розробки, інтеграцій та базової SEO-оптимізації сайту. Особливу увагу приділяю швидкості завантаження сторінок, адаптивності під мобільні пристрої та зручності користувача. Це ключові фактори, які впливають на позиції в Google та конверсію.',
      "Якщо вам потрібен розробник Next.js, який говорить простою мовою, прозоро пояснює етапи роботи та дотримується дедлайнів, ви за адресою. Заповніть форму замовлення вище або зв'яжіться зі мною, щоб обговорити ваш проект. Разом ми створимо сайт, який виглядає сучасно, працює стабільно та допомагає вашому бізнесу рости."
    ]
  },
  en: {
    title: 'Full-cycle website development: Next.js, React and modern technologies',
    paragraphs: [
      'If you are looking where to order website development for your business, it is important to choose a developer who works with modern technologies and understands how a website affects sales. I specialize in building fast, responsive and SEO-optimized web solutions based on Next.js and React. This means your website will not only look great, but also load quickly and be correctly indexed by Google.',
      'The cost of creating a website depends on the type of project: landing page, business card site, blog or full-featured online store. On this page you can use a convenient calculator to roughly estimate the budget. I help you choose the optimal tech stack, structure and functionality so you do not overpay for unnecessary features but still get a tool that really brings clients.',
      'I work with clients across Ukraine and abroad, offering a full cycle of services: from niche analysis and prototyping to design, frontend development, integrations and basic SEO optimization. I pay special attention to page load speed, mobile responsiveness and user experience – the key factors that influence Google rankings and conversions.',
      'If you need a Next.js developer who explains things in simple terms, is transparent about the process and respects deadlines, you are in the right place. Fill out the order form above or contact me to discuss your project. Together we will create a website that looks modern, runs reliably and helps your business grow.'
    ]
  },
  ru: {
    title: 'Разработка сайтов под ключ: Next.js, React и современные технологии',
    paragraphs: [
      'Если вы ищете, где заказать разработку сайта для вашего бизнеса, важно выбрать разработчика, который работает с современными технологиями и понимает, как сайт влияет на продажи. Я специализируюсь на создании быстрых, адаптивных и SEO-оптимизированных веб-решений на базе Next.js и React. Это означает, что ваш сайт будет не только красиво выглядеть, но и быстро загружаться и корректно индексироваться в Google.',
      'Стоимость создания сайта зависит от типа проекта: лендинг, сайт-визитка, блог или полноценный интернет-магазин. На странице вы можете воспользоваться удобным калькулятором, чтобы предварительно оценить бюджет. Я помогаю подобрать оптимальный стек технологий, структуру и функционал, чтобы вы не переплачивали за лишнее, но при этом получили инструмент, который действительно приносит клиентов.',
      'Я работаю с клиентами по всей Украине и за рубежом, предлагая полный цикл услуг: от анализа ниши и прототипирования до дизайна, фронтенд-разработки, интеграций и базовой SEO-оптимизации сайта. Особое внимание уделяю скорости загрузки страниц, адаптивности под мобильные устройства и удобству пользователя. Это ключевые факторы, которые влияют на позиции в Google и конверсии.',
      'Если вам нужен разработчик Next.js, который говорит простым языком, прозрачно объясняет этапы работы и соблюдает дедлайны, вы по адресу. Заполните форму заказа выше или свяжитесь со мной, чтобы обсудить ваш проект. Вместе мы создадим сайт, который выглядит современно, работает стабильно и помогает вашему бизнесу расти.'
    ]
  }
} as const;

export default function BlogPage() {
  const { t, locale } = useI18n();
  const currentSeo = seoContent[locale as keyof typeof seoContent] || seoContent.uk;

  return (
    <main className="blog-page">
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <Image src="/img/logo.webp" alt="WebVy" width={120} height={40} style={{ width: 'auto', height: '40px' }} className="logo-image" unoptimized />
              </a>
            </div>
            <div className="nav-content">
              <nav>
                <div className="nav-container">
                  <ul className="menu">
                    <li><a href="/">{t('navigation.home')}</a></li>
                    <li><a href="/#calculator">{t('navigation.calculator')}</a></li>
                    <li><a href="/#services">{t('navigation.services')}</a></li>
                    <li><a href="/portfolio">{t('navigation.portfolio')}</a></li>
                    <li><a href="/#about">{t('navigation.about')}</a></li>
                    <li><a href="/#reviews">{t('navigation.reviews')}</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li><LanguageSwitcher /></li>
                  </ul>
                </div>
                <MobileMenu />
              </nav>
            </div>
            <div className="cta-button">
              <a href="/#order" className="btn">{t('contact.title')}</a>
            </div>
          </div>
        </div>
      </header>

      <section className="blog-hero">
        <div className="container">
          <h1 className="blog-title">{t('blog.title')}</h1>
          <p className="blog-subtitle">{t('blog.subtitle')}</p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="container">
          <div className="blog-grid">
            {postsMeta.map((meta) => {
              const title = t(`blog.posts.${meta.slug}.title`);
              const excerpt = t(`blog.posts.${meta.slug}.excerpt`);
              const category = t(meta.categoryKey || 'blog.category_guides');
              const tags = meta.tagsKeys.map((key) => t(key));

              return (
                <article key={meta.slug} className="blog-card">
                  <div className="blog-card-category">{category}</div>
                  <h2 className="blog-card-title">{title}</h2>
                  <p className="blog-card-excerpt">{excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-tags">
                      {tags.map((tag) => (
                        <span key={tag} className="blog-card-tag">{tag}</span>
                      ))}
                    </div>
                    <Link href={`/blog/${meta.slug}`} className="blog-card-link">
                      {t('blog.read_more')}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="seo-text-section" id="seo-text">
        <div className="container">
          <div className="seo-text-inner">
            <h2 className="seo-text-title">{currentSeo.title}</h2>
            {currentSeo.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-card">
            <h2>{t('blog.cta_title')}</h2>
            <p>{t('blog.cta_text')}</p>
            <Link href="/#order" className="btn">
              {t('blog.cta_button')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
