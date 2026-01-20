import { Metadata, Viewport } from 'next';
import { ukrainianCities } from '@/data/ukrainian-cities';
import { blogPosts } from '@/data/blog-posts';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from '../blog-city.module.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
};

interface CityBlogPostPageProps {
  params: Promise<{
    slug: string;
    post: string;
  }>;
}

export async function generateMetadata({ params }: CityBlogPostPageProps): Promise<Metadata> {
  const { slug, post: postSlug } = await params;
  const city = ukrainianCities.find((city) => city.slug === slug);
  const post = blogPosts.find((post) => post.slug === postSlug);
  
  if (!city || !post) {
    return {
      title: 'Сторінка не знайдена | WebVy',
      description: 'Сторінка не знайдена',
    };
  }
  
  return {
    title: `${post.title} в місті ${city.name}`,
    description: `${post.description} Актуальна інформація для бізнесу в місті ${city.name}.`,
    keywords: [
      `${post.slug.replace(/-/g, ' ')} ${city.name}`,
      ...post.tagsKeys.map(tag => `${tag.replace('blog.tag_', '')} ${city.name}`),
      'webvy',
    ],
    alternates: {
      canonical: `https://webvy.online/city/${slug}/blog/${postSlug}`,
    },
  };
}

export function generateStaticParams() {
  const params = [];
  
  for (const city of ukrainianCities) {
    for (const post of blogPosts) {
      params.push({
        slug: city.slug,
        post: post.slug,
      });
    }
  }
  
  return params;
}

export default async function CityBlogPostPage({ params }: CityBlogPostPageProps) {
  const { slug, post: postSlug } = await params;
  const city = ukrainianCities.find((city) => city.slug === slug);
  const post = blogPosts.find((post) => post.slug === postSlug);
  
  if (!city || !post) {
    notFound();
  }

  // Генеруємо контент статті з урахуванням міста
  const generateCitySpecificContent = () => {
    switch (post.slug) {
      case 'yak-vybraty-hostyng':
        return {
          title: `Як вибрати надійний хостинг для бізнес-сайту в місті ${city.name}`,
          intro: `Для бізнесу в місті ${city.name} вибір правильного хостингу є критично важливим. У цій статті ми розглянемо, як обрати надійний хостинг, що забезпечить стабільну роботу вашого сайту та допоможе залучити більше клієнтів з ${city.name}.`,
          paragraphs: [
            `Якщо ви плануєте запустити бізнес-сайт у місті ${city.name}, перше, на що варто звернути увагу при виборі хостингу — це швидкість завантаження сторінок. Користувачі з ${city.name} очікують миттєвої відповіді від сайту, і якщо сторінка завантажується довше 3 секунд, більшість відвідувачів просто закриють її.`,
            `Для бізнесу в ${city.name} рекомендуємо обирати хостинг-провайдерів з серверами, розташованими в Україні або Європі. Це забезпечить найкращу швидкість для ваших відвідувачів. Крім того, зверніть увагу на тип хостингу: для невеликих сайтів підійде shared-хостинг, але для більш відвідуваних проектів краще обрати VPS або виділений сервер.`,
            `Ще один важливий фактор — технічна підтримка. Переконайтеся, що хостинг-провайдер пропонує цілодобову підтримку українською або російською мовою. Це особливо важливо для бізнесу в ${city.name}, де будь-який простій сайту може призвести до втрати клієнтів та доходу.`,
            `Також зверніть увагу на наявність SSL-сертифіката, регулярних резервних копій та захисту від DDoS-атак. Ці функції забезпечать безпеку вашого сайту та даних ваших клієнтів з міста ${city.name}.`,
          ],
          conclusion: `Вибір правильного хостингу для бізнес-сайту в місті ${city.name} — це інвестиція в стабільність та успіх вашого онлайн-присутності. Звертайте увагу на швидкість, надійність, технічну підтримку та безпеку, і ваш сайт буде ефективно працювати на розвиток вашого бізнесу в ${city.name}.`
        };
      case 'seo-dlya-lendingu':
        return {
          title: `SEO для лендингу: з чого почати оптимізацію односторінкового сайту в ${city.name}`,
          intro: `Для бізнесу в місті ${city.name} лендінги є ефективним інструментом залучення клієнтів. Але щоб ваш лендінг був видимим у пошукових системах, потрібно правильно підійти до його SEO-оптимізації.`,
          paragraphs: [
            `Перш за все, проведіть дослідження ключових слів, які використовують потенційні клієнти з міста ${city.name}. Включіть локальні запити, такі як "${post.slug.replace(/-/g, ' ')} ${city.name}" або "замовити ${post.slug.replace(/-/g, ' ')} ${city.name}".`,
            `Оптимізуйте метатеги вашого лендінгу. У title обов'язково вкажіть назву послуги та місто ${city.name}, а в description додайте коротку, але інформативну фразу про вашу пропозицію для жителів ${city.name}.`,
            `Структура заголовків на лендінгу повинна бути логічною та містити ключові слова. H1 має бути один на сторінці і включати основний запит, наприклад, "Замовити ${post.slug.replace(/-/g, ' ')} в місті ${city.name}".`,
            `Для лендінгів особливо важлива швидкість завантаження. Оптимізуйте розмір зображень, використовуйте кешування та мінімізуйте код. Це покращить користувацький досвід та позитивно вплине на позиції в пошуку для запитів з міста ${city.name}.`,
          ],
          conclusion: `SEO-оптимізація лендінгу для міста ${city.name} — це комплексний процес, який включає роботу з ключовими словами, метатегами, контентом та технічними аспектами. Правильно оптимізований лендінг буде ефективно залучати цільову аудиторію з ${city.name} та конвертувати відвідувачів у клієнтів.`
        };
      case 'react-vs-wordpress':
        return {
          title: `React/Next.js чи WordPress: що краще для вашого сайту в місті ${city.name}`,
          intro: `Для бізнесу в місті ${city.name} вибір правильної технології для створення сайту є важливим стратегічним рішенням. У цій статті ми порівняємо React/Next.js та WordPress, щоб допомогти вам зробити правильний вибір для вашого проекту в ${city.name}.`,
          paragraphs: [
            `WordPress є популярною CMS, яка дозволяє швидко створити сайт без глибоких технічних знань. Це може бути хорошим вибором для малого бізнесу в ${city.name}, який потребує простого сайту з базовим функціоналом.`,
            `Однак, для більш складних проектів у ${city.name}, особливо тих, що потребують високої продуктивності та унікального дизайну, React/Next.js може бути кращим вибором. Ці технології забезпечують швидке завантаження сторінок, що критично важливо для утримання відвідувачів з ${city.name}.`,
            `React/Next.js також надає більше можливостей для масштабування вашого проекту в майбутньому. Якщо ви плануєте розширювати свій бізнес у ${city.name} та додавати нові функції до сайту, ця технологія забезпечить необхідну гнучкість.`,
            `З іншого боку, WordPress має велику екосистему плагінів та тем, що може прискорити розробку та знизити її вартість. Це може бути важливим фактором для стартапів та малого бізнесу в ${city.name} з обмеженим бюджетом.`,
          ],
          conclusion: `Вибір між React/Next.js та WordPress для вашого сайту в місті ${city.name} залежить від специфіки вашого проекту, бюджету та довгострокових цілей. React/Next.js підходить для складних, високопродуктивних проектів, тоді як WordPress може бути кращим вибором для простіших сайтів з обмеженим бюджетом. В обох випадках, важливо обрати технологію, яка найкраще відповідає потребам вашого бізнесу в ${city.name}.`
        };
      default:
        return {
          title: `${post.title} для бізнесу в місті ${city.name}`,
          intro: `Ця стаття містить важливу інформацію про ${post.slug.replace(/-/g, ' ')} для бізнесу в місті ${city.name}. Ми розглянемо основні аспекти та надамо практичні поради, які допоможуть вашому бізнесу в ${city.name} розвиватися онлайн.`,
          paragraphs: [
            `Для бізнесу в місті ${city.name} ${post.slug.replace(/-/g, ' ')} є важливим аспектом онлайн-присутності. Правильний підхід до цього питання може значно підвищити ефективність вашого сайту та залучити більше клієнтів.`,
            `У ${city.name}, як і в інших містах України, конкуренція в онлайн-просторі постійно зростає. Тому важливо використовувати сучасні підходи та технології для створення та оптимізації вашого сайту.`,
            `Наша команда має великий досвід роботи з проектами в місті ${city.name} та знає специфіку місцевого ринку. Ми допоможемо вам створити ефективний сайт, який буде працювати на розвиток вашого бізнесу.`,
            `Використання сучасних технологій, таких як Next.js та React, дозволяє створювати швидкі, адаптивні та SEO-оптимізовані сайти, які добре ранжуються в пошукових системах для запитів, пов'язаних з містом ${city.name}.`,
          ],
          conclusion: `${post.slug.replace(/-/g, ' ')} є важливим аспектом розвитку бізнесу в місті ${city.name}. Правильний підхід до цього питання допоможе вам залучити більше клієнтів та підвищити ефективність вашого онлайн-присутності. Наша команда готова допомогти вам з цим завданням та створити сайт, який буде працювати на розвиток вашого бізнесу в ${city.name}.`
        };
    }
  };

  const content = generateCitySpecificContent();

  return (
    <main className={styles["blog-city-page"]}>
      <header>
        <div className={styles.container}>
          <div className={styles["header-content"]}>
            <div className={styles.logo}>
              <a href="/">
                <Image src="/img/logo.webp" alt="WebVy" width={120} height={40} style={{ width: 'auto', height: '40px' }} className={styles["logo-image"]} unoptimized />
              </a>
            </div>
            <div className={styles["nav-content"]}>
              <nav>
                <div className={styles["nav-container"]}>
                  <ul className={styles.menu}>
                    <li><a href="/">Головна</a></li>
                    <li><a href="/#calculator">Калькулятор</a></li>
                    <li><a href="/#services">Послуги</a></li>
                    <li><a href="/portfolio">Портфоліо</a></li>
                    <li><a href="/#about">Про мене</a></li>
                    <li><a href="/#reviews">Відгуки</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li><a href="/blog">Блог</a></li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className={styles["cta-button"]}>
              <a href="/#order" className={styles.btn}>Замовити</a>
            </div>
          </div>
        </div>
      </header>

      <section className={styles["blog-hero"]}>
        <div className={styles.container}>
          <div className={styles["blog-breadcrumbs"]}>
            <Link href="/">Головна</Link> &gt; 
            <Link href="/blog">Блог</Link> &gt; 
            <Link href={`/city/${city.slug}`}>{city.name}</Link> &gt; 
            <span>{post.title}</span>
          </div>
          <h1 className={styles["blog-title"]}>{content.title}</h1>
        </div>
      </section>

      <section className={styles["blog-content"]}>
        <div className={styles.container}>
          <div className={styles["blog-inner"]}>
            <div className={styles["blog-text"]}>
              <p className={styles["blog-intro"]}>{content.intro}</p>
              
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              
              <h2>Висновок</h2>
              <p>{content.conclusion}</p>
            </div>
            
            <div className={styles["blog-sidebar"]}>
              <div className={styles["sidebar-section"]}>
                <h3>Послуги в місті {city.name}</h3>
                <ul>
                  <li><Link href={`/city/${city.slug}/landing-page`}>Лендінг в {city.name}</Link></li>
                  <li><Link href={`/city/${city.slug}/business-card-site`}>Сайт-візитка в {city.name}</Link></li>
                  <li><Link href={`/city/${city.slug}/corporate-site`}>Корпоративний сайт в {city.name}</Link></li>
                  <li><Link href={`/city/${city.slug}/online-store`}>Інтернет-магазин в {city.name}</Link></li>
                </ul>
              </div>
              
              <div className={styles["sidebar-section"]}>
                <h3>Інші статті для {city.name}</h3>
                <ul>
                  {blogPosts
                    .filter(p => p.slug !== post.slug)
                    .slice(0, 5)
                    .map(p => (
                      <li key={p.slug}>
                        <Link href={`/city/${city.slug}/blog/${p.slug}`}>
                          {p.title.split('|')[0]} в {city.name}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles["blog-cta-section"]}>
        <div className={styles.container}>
          <div className={styles["blog-cta-card"]}>
            <h2>Замовити сайт в місті {city.name}</h2>
            <p>Готові обговорити ваш проект? Зв'яжіться з нами для безкоштовної консультації.</p>
            <Link href="/#order" className={styles.btn}>
              Замовити сайт
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className={styles.container}>
          <div className={styles["footer-content"]}>
            <div className={styles["footer-logo"]}>
              <Link href="/">
                <Image src="/img/logo.webp" alt="WebVy" width={120} height={40} style={{ width: 'auto', height: '40px' }} className={styles["logo-image"]} unoptimized />
              </Link>
            </div>
            <div className={styles["footer-links"]}>
              <div className={styles["footer-column"]}>
                <h3>Послуги</h3>
                <ul>
                  <li><Link href={`/city/${city.slug}/landing-page`}>Лендінг в {city.name}</Link></li>
                  <li><Link href={`/city/${city.slug}/business-card-site`}>Сайт-візитка в {city.name}</Link></li>
                  <li><Link href={`/city/${city.slug}/corporate-site`}>Корпоративний сайт в {city.name}</Link></li>
                  <li><Link href={`/city/${city.slug}/online-store`}>Інтернет-магазин в {city.name}</Link></li>
                </ul>
              </div>
              <div className={styles["footer-column"]}>
                <h3>Контакти</h3>
                <ul>
                  <li><a href="mailto:my@webvy.online">my@webvy.online</a></li>
                  <li><a href="tel:+380988302566">+38 (098) 830-25-66</a></li>
                  <li><a href="https://t.me/L_evenets" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} WebVy. Всі права захищені.
          </div>
        </div>
      </footer>
    </main>
  );
}
