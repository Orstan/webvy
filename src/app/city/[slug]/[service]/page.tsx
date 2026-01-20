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

interface CityServicePageProps {
  params: Promise<{
    slug: string;
    service: string;
  }>;
}

const services = [
  { 
    slug: 'landing-page', 
    name: 'Лендінг', 
    price: 'від $150',
    description: 'Односторінковий сайт для швидкого запуску продукту або послуги. Ідеально підходить для презентації одного товару, послуги або події.',
    features: [
      'Адаптивний дизайн',
      'Швидке завантаження',
      'SEO-оптимізація',
      'Інтеграція з CRM',
      'Форма зворотного зв\'язку',
      'Аналітика відвідувань'
    ]
  },
  { 
    slug: 'business-card-site', 
    name: 'Сайт-візитка', 
    price: 'від $200',
    description: 'Компактний сайт для представлення бізнесу в інтернеті. Містить кілька сторінок з основною інформацією про компанію та її послуги.',
    features: [
      'Адаптивний дизайн',
      'До 5 сторінок',
      'SEO-оптимізація',
      'Контактна форма',
      'Інтеграція з Google Maps',
      'Галерея робіт/продуктів'
    ]
  },
  { 
    slug: 'corporate-site', 
    name: 'Корпоративний сайт', 
    price: 'від $400',
    description: 'Повноцінний сайт для компанії з кількома розділами. Представляє всі напрямки діяльності, послуги, проекти та інформацію про компанію.',
    features: [
      'Адаптивний дизайн',
      'Необмежена кількість сторінок',
      'SEO-оптимізація',
      'Блог/Новини',
      'Система управління контентом',
      'Інтеграція з соціальними мережами',
      'Розширені форми зворотного зв\'язку'
    ]
  },
  { 
    slug: 'online-store', 
    name: 'Інтернет-магазин', 
    price: 'від $800',
    description: 'E-commerce рішення з каталогом товарів, кошиком та оплатою. Повноцінний онлайн-магазин для продажу товарів або послуг.',
    features: [
      'Адаптивний дизайн',
      'Каталог товарів/послуг',
      'Фільтрація та пошук',
      'Кошик та оформлення замовлення',
      'Інтеграція з платіжними системами',
      'Особистий кабінет користувача',
      'Система управління товарами',
      'SEO-оптимізація'
    ]
  },
];

export async function generateMetadata({ params }: CityServicePageProps): Promise<Metadata> {
  const { slug, service: serviceSlug } = await params;
  const city = ukrainianCities.find((city) => city.slug === slug);
  const service = services.find((service) => service.slug === serviceSlug);
  
  if (!city || !service) {
    return {
      title: 'Сторінка не знайдена | WebVy',
      description: 'Сторінка не знайдена',
    };
  }
  
  return {
    title: `${service.name} в місті ${city.name} ${service.price} | WebVy`,
    description: `✅ Замовити ${service.name.toLowerCase()} в місті ${city.name} ${service.price}. Професійна розробка, адаптивний дизайн, SEO-оптимізація, швидке завантаження. Сучасні технології Next.js, React.`,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `замовити ${service.name.toLowerCase()} ${city.name}`,
      `створення ${service.name.toLowerCase()} ${city.name}`,
      `розробка ${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} під ключ ${city.name}`,
      `${service.name.toLowerCase()} ціна ${city.name}`,
      'webvy',
    ],
    alternates: {
      canonical: `https://webvy.online/city/${slug}/${serviceSlug}`,
    },
  };
}

export function generateStaticParams() {
  const params = [];
  
  for (const city of ukrainianCities) {
    for (const service of services) {
      params.push({
        slug: city.slug,
        service: service.slug,
      });
    }
  }
  
  return params;
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { slug, service: serviceSlug } = await params;
  const city = ukrainianCities.find((city) => city.slug === slug);
  const service = services.find((service) => service.slug === serviceSlug);
  
  if (!city || !service) {
    notFound();
  }

  return (
    <main className="city-service-page">
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

      <section className="service-hero">
        <div className="container">
          <h1 className="service-title">{service.name} в місті {city.name}</h1>
          <p className="service-subtitle">Професійна розробка {service.name.toLowerCase()} під ключ {service.price}</p>
          <div className="service-cta">
            <Link href="/#order" className="btn btn-primary">
              Замовити {service.name.toLowerCase()}
            </Link>
            <Link href="/#calculator" className="btn btn-secondary">
              Розрахувати вартість
            </Link>
          </div>
        </div>
      </section>

      <section className="service-description">
        <div className="container">
          <div className="service-info">
            <div className="service-text">
              <h2>Що таке {service.name.toLowerCase()}?</h2>
              <p>{service.description}</p>
              <h3>Особливості {service.name.toLowerCase()} від WebVy:</h3>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="service-price-card">
              <div className="price-header">
                <h3>{service.name}</h3>
                <div className="price">{service.price}</div>
              </div>
              <div className="price-features">
                <ul>
                  {service.features.slice(0, 5).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="price-cta">
                <Link href="/#order" className="btn btn-primary">
                  Замовити
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-process">
        <div className="container">
          <h2>Як ми створюємо {service.name.toLowerCase()} в місті {city.name}</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Аналіз та планування</h3>
              <p>Вивчаємо вашу нішу, конкурентів та цільову аудиторію. Визначаємо цілі проекту та складаємо технічне завдання.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Прототипування</h3>
              <p>Створюємо прототип сайту, який показує структуру та розміщення елементів на сторінках.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Дизайн</h3>
              <p>Розробляємо унікальний дизайн, який відповідає вашому бренду та привертає увагу цільової аудиторії.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Розробка</h3>
              <p>Верстаємо та програмуємо сайт з використанням сучасних технологій (Next.js, React), що забезпечує швидке завантаження та SEO-оптимізацію.</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Тестування</h3>
              <p>Перевіряємо сайт на різних пристроях та браузерах, виправляємо помилки та оптимізуємо швидкість.</p>
            </div>
            <div className="process-step">
              <div className="step-number">6</div>
              <h3>Запуск та підтримка</h3>
              <p>Публікуємо сайт, налаштовуємо аналітику та надаємо технічну підтримку після запуску.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="city-seo-section">
        <div className="container">
          <h2>{service.name} для бізнесу в місті {city.name}</h2>
          <div className="seo-content">
            <p>
              Якщо ви шукаєте професійну розробку {service.name.toLowerCase()} в місті {city.name}, WebVy пропонує повний спектр послуг
              з створення сучасних, швидких та SEO-оптимізованих сайтів. Ми використовуємо передові технології (Next.js, React),
              які забезпечують високу продуктивність та зручність користування вашим сайтом.
            </p>
            <p>
              Наші {service.name.toLowerCase()} для бізнесу в місті {city.name} розроблені з урахуванням особливостей локального ринку
              та потреб вашої цільової аудиторії. Ми приділяємо особливу увагу адаптивному дизайну, швидкості завантаження
              та SEO-оптимізації, що допомагає вашому сайту займати високі позиції в пошукових системах.
            </p>
            <p>
              Замовляючи {service.name.toLowerCase()} у WebVy, ви отримуєте не просто сайт, а ефективний інструмент для розвитку
              вашого бізнесу в місті {city.name}. Наша команда забезпечує повний цикл розробки: від аналізу та планування
              до запуску та подальшої підтримки.
            </p>
          </div>
        </div>
      </section>

      <section className="city-cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Замовити {service.name.toLowerCase()} в місті {city.name}</h2>
            <p>Готові обговорити ваш проект? Зв'яжіться з нами для безкоштовної консультації.</p>
            <Link href="/#order" className="btn">
              Замовити {service.name.toLowerCase()}
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
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/city/${city.slug}/${s.slug}`}>
                        {s.name} в {city.name}
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
