import { Metadata, Viewport } from 'next';
import { ukrainianCities } from '@/data/ukrainian-cities';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
};

interface CityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = ukrainianCities.find((city) => city.slug === slug);
  
  if (!city) {
    return {
      title: 'Місто не знайдено | WebVy',
      description: 'Сторінка міста не знайдена',
    };
  }
  
  return {
    title: `Розробка сайтів в місті ${city.name} | WebVy`,
    description: `✅ Замовити сайт під ключ в місті ${city.name}. Створення сайтів: лендінг, сайт-візитка, інтернет-магазин. Адаптивний дизайн, SEO-оптимізація, Next.js, React.`,
    keywords: [
      `розробка сайтів ${city.name}`,
      `створення сайту ${city.name}`,
      `замовити сайт ${city.name}`,
      `веб студія ${city.name}`,
      `лендінг ${city.name}`,
      `сайт візитка ${city.name}`,
      `інтернет магазин ${city.name}`,
      'webvy',
    ],
    alternates: {
      canonical: `https://webvy.online/city/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return ukrainianCities.map((city) => ({
    slug: city.slug,
  }));
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = ukrainianCities.find((city) => city.slug === slug);
  
  if (!city) {
    notFound();
  }
  
  const services = [
    { slug: 'landing-page', name: 'Лендінг', price: 'від $150' },
    { slug: 'business-card-site', name: 'Сайт-візитка', price: 'від $200' },
    { slug: 'corporate-site', name: 'Корпоративний сайт', price: 'від $400' },
    { slug: 'online-store', name: 'Інтернет-магазин', price: 'від $800' },
  ];

  return (
    <main className="city-page">
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
            <div className="cta-button">
              <a href="/#order" className="btn">Замовити</a>
            </div>
          </div>
        </div>
      </header>

      <section className="city-hero">
        <div className="container">
          <h1 className="city-title">Розробка сайтів в місті {city.name}</h1>
          <p className="city-subtitle">Професійне створення сайтів під ключ: від ідеї до запуску</p>
        </div>
      </section>

      <section className="city-services">
        <div className="container">
          <h2>Послуги веб-розробки в місті {city.name}</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.slug} className="service-card">
                <h3>{service.name}</h3>
                <p className="service-price">{service.price}</p>
                <p className="service-description">
                  Професійна розробка {service.name.toLowerCase()} для бізнесу в місті {city.name}.
                  Сучасний дизайн, адаптивна верстка, SEO-оптимізація.
                </p>
                <Link href={`/city/${city.slug}/${service.slug}`} className="service-link">
                  Детальніше
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="city-content">
        <div className="container">
          <h2>Веб-розробка в місті {city.name}</h2>
          <div className="content-blocks">
            <div className="content-block">
              <h3>Чому варто замовити сайт у WebVy?</h3>
              <p>
                Якщо ви шукаєте професійну розробку сайту в місті {city.name}, WebVy пропонує повний спектр послуг:
                від створення лендінгів та сайтів-візиток до повноцінних корпоративних сайтів та інтернет-магазинів.
              </p>
              <p>
                Ми використовуємо сучасні технології (Next.js, React), які забезпечують швидке завантаження,
                високу продуктивність та SEO-оптимізацію вашого сайту.
              </p>
            </div>
            
            <div className="content-block">
              <h3>Наші переваги для клієнтів з міста {city.name}</h3>
              <ul>
                <li>Індивідуальний підхід до кожного проекту</li>
                <li>Адаптивний дизайн для всіх пристроїв</li>
                <li>SEO-оптимізація для кращого ранжування в Google</li>
                <li>Швидке завантаження сторінок</li>
                <li>Зручна система управління контентом</li>
                <li>Технічна підтримка після запуску</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="city-blog-section">
        <div className="container">
          <h2>Корисні статті для бізнесу в місті {city.name}</h2>
          <div className="blog-links">
            <Link href={`/city/${city.slug}/blog/yak-vybraty-hostyng`} className="blog-link">
              Як вибрати надійний хостинг для бізнес-сайту в {city.name}
            </Link>
            <Link href={`/city/${city.slug}/blog/seo-dlya-lendingu`} className="blog-link">
              SEO для лендингу: з чого почати оптимізацію в {city.name}
            </Link>
            <Link href={`/city/${city.slug}/blog/react-vs-wordpress`} className="blog-link">
              React/Next.js чи WordPress: що краще для бізнесу в {city.name}
            </Link>
            <Link href={`/city/${city.slug}/blog/stvorennya-saitu-cina`} className="blog-link">
              Скільки коштує створення сайту в {city.name}: з чого складається ціна
            </Link>
          </div>
        </div>
      </section>

      <section className="city-cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Замовити сайт в місті {city.name}</h2>
            <p>Готові обговорити ваш проект? Зв'яжіться з нами для безкоштовної консультації.</p>
            <Link href="/#order" className="btn">
              Замовити сайт
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Link href="/">
                <Image src="/img/logo.webp" alt="WebVy" width={120} height={40} style={{ width: 'auto', height: '40px' }} className="logo-image" unoptimized />
              </Link>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h3>Послуги</h3>
                <ul>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/city/${city.slug}/${service.slug}`}>
                        {service.name} в {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-column">
                <h3>Контакти</h3>
                <ul>
                  <li><a href="mailto:my@webvy.online">my@webvy.online</a></li>
                  <li><a href="tel:+380988302566">+38 (098) 830-25-66</a></li>
                  <li><a href="https://t.me/L_evenets" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} WebVy. Всі права захищені.
          </div>
        </div>
      </footer>
    </main>
  );
}
