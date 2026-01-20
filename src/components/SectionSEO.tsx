'use client'

import { useEffect } from 'react'

interface SectionSEOProps {
  sectionId: string
  title: string
  description: string
  keywords: string[]
}

interface MultilingualSEOData {
  uk: {
    title: string
    description: string
    keywords: string[]
  }
  ru: {
    title: string
    description: string
    keywords: string[]
  }
  en: {
    title: string
    description: string
    keywords: string[]
  }
}

const multilingualSEOData: Record<string, MultilingualSEOData> = {
  calculator: {
    uk: {
      title: 'Калькулятор вартості сайту | Розрахувати ціну сайту онлайн | WebVy',
      description: 'Безкоштовний калькулятор для розрахунку вартості сайту. Дізнайтеся скільки коштує лендінг, сайт-візитка, інтернет-магазин. Розрахуйте ціну сайту за 2 хвилини.',
      keywords: ['калькулятор сайту', 'розрахунок вартості сайту', 'скільки коштує сайт', 'ціна сайту', 'калькулятор лендінгу', 'вартість сайту онлайн']
    },
    ru: {
      title: 'Калькулятор стоимости сайта | Рассчитать цену сайта онлайн | WebVy',
      description: 'Бесплатный калькулятор для расчета стоимости сайта. Узнайте сколько стоит лендинг, сайт-визитка, интернет-магазин. Рассчитайте цену сайта за 2 минуты.',
      keywords: ['калькулятор сайта', 'расчет стоимости сайта', 'сколько стоит сайт', 'цена сайта', 'калькулятор лендинга', 'стоимость сайта онлайн']
    },
    en: {
      title: 'Website Cost Calculator | Calculate Website Price Online | WebVy',
      description: 'Free calculator for website cost calculation. Find out how much a landing page, business card site, or online store costs. Calculate website price in 2 minutes.',
      keywords: ['website calculator', 'website cost calculation', 'how much website cost', 'website price', 'landing page calculator', 'website cost online']
    }
  },
  packages: {
    uk: {
      title: 'Готові рішення для бізнесу | Пакети сайтів під ключ | WebVy',
      description: 'Готові пакети сайтів для бізнесу: лендінг від $150, сайт-візитка від $200, корпоративний сайт від $400. Швидкий запуск та професійна розробка.',
      keywords: ['готові сайти', 'пакети сайтів', 'сайти для бізнесу', 'готові рішення', 'сайти під ключ', 'бізнес сайти']
    },
    ru: {
      title: 'Готовые решения для бизнеса | Пакеты сайтов под ключ | WebVy',
      description: 'Готовые пакеты сайтов для бизнеса: лендинг от $150, сайт-визитка от $200, корпоративный сайт от $400. Быстрый запуск и профессиональная разработка.',
      keywords: ['готовые сайты', 'пакеты сайтов', 'сайты для бизнеса', 'готовые решения', 'сайты под ключ', 'бизнес сайты']
    },
    en: {
      title: 'Ready Business Solutions | Website Packages | WebVy',
      description: 'Ready website packages for business: landing page from $150, business card site from $200, corporate site from $400. Fast launch and professional development.',
      keywords: ['ready websites', 'website packages', 'business websites', 'ready solutions', 'turnkey websites', 'business sites']
    }
  },
  services: {
    uk: {
      title: 'Послуги з розробки сайтів | Web розробка під ключ | WebVy',
      description: 'Професійні послуги з розробки сайтів: створення лендінгів, корпоративних сайтів, інтернет-магазинів. Next.js, React, сучасні технології.',
      keywords: ['послуги розробки сайтів', 'web розробка', 'створення сайтів', 'розробка сайтів київ', 'професійна розробка', 'next.js розробка']
    },
    ru: {
      title: 'Услуги по разработке сайтов | Web разработка под ключ | WebVy',
      description: 'Профессиональные услуги по разработке сайтов: создание лендингов, корпоративных сайтов, интернет-магазинов. Next.js, React, современные технологии.',
      keywords: ['услуги разработки сайтов', 'web разработка', 'создание сайтов', 'разработка сайтов киев', 'профессиональная разработка', 'next.js разработка']
    },
    en: {
      title: 'Website Development Services | Turnkey Web Development | WebVy',
      description: 'Professional website development services: creating landing pages, corporate sites, online stores. Next.js, React, modern technologies.',
      keywords: ['website development services', 'web development', 'website creation', 'website development kyiv', 'professional development', 'next.js development']
    }
  },
  about: {
    uk: {
      title: 'Про компанію WebVy | Розробка сайтів під ключ | Веб студія',
      description: 'WebVy - професійна веб-студія з розробки сайтів під ключ. 5+ років досвіду, 50+ проектів. Сучасні технології та індивідуальний підхід.',
      keywords: ['про компанію webvy', 'веб студія', 'розробка сайтів', 'web студія київ', 'студія сайтів', 'веб розробка']
    },
    ru: {
      title: 'О компании WebVy | Разработка сайтов под ключ | Веб студия',
      description: 'WebVy - профессиональная веб-студия по разработке сайтов под ключ. 5+ лет опыта, 50+ проектов. Современные технологии и индивидуальный подход.',
      keywords: ['о компании webvy', 'веб студия', 'разработка сайтов', 'web студия киев', 'студия сайтов', 'веб разработка']
    },
    en: {
      title: 'About WebVy Company | Turnkey Website Development | Web Studio',
      description: 'WebVy is a professional web studio for turnkey website development. 5+ years of experience, 50+ projects. Modern technologies and individual approach.',
      keywords: ['about webvy company', 'web studio', 'website development', 'web studio kyiv', 'studio of websites', 'web development']
    }
  },
  reviews: {
    uk: {
      title: 'Відгуки клієнтів | Про роботу WebVy | Відгуки про розробку сайтів',
      description: 'Реальні відгуки клієнтів про роботу WebVy. Дізнайтеся що кажуть про нашу розробку сайтів, якість та сервіс.',
      keywords: ['відгуки клієнтів', 'відгуки webvy', 'відгуки про сайти', 'відгуки розробка', 'клієнти webvy', 'відгуки веб студія']
    },
    ru: {
      title: 'Отзывы клиентов | О работе WebVy | Отзывы о разработке сайтов',
      description: 'Реальные отзывы клиентов о работе WebVy. Узнайте что говорят о нашей разработке сайтов, качестве и сервисе.',
      keywords: ['отзывы клиентов', 'отзывы webvy', 'отзывы о сайтах', 'отзывы разработка', 'клиенты webvy', 'отзывы веб студия']
    },
    en: {
      title: 'Customer Reviews | About WebVy Work | Website Development Reviews',
      description: 'Real customer reviews about WebVy work. Find out what they say about our website development, quality and service.',
      keywords: ['customer reviews', 'webvy reviews', 'website reviews', 'development reviews', 'webvy clients', 'web studio reviews']
    }
  },
  faq: {
    uk: {
      title: 'FAQ по розробці сайтів | Часті питання | WebVy',
      description: 'Відповіді на часті питання по розробці сайтів: ціни, терміни, технології, SEO, підтримка. Все що потрібно знати перед замовленням сайту.',
      keywords: ['faq сайти', 'питання про сайти', 'часті питання', 'розробка сайтів питання', 'seo питання', 'ціна сайту питання']
    },
    ru: {
      title: 'FAQ по разработке сайтов | Частые вопросы | WebVy',
      description: 'Ответы на частые вопросы по разработке сайтов: цены, сроки, технологии, SEO, поддержка. Все что нужно знать перед заказом сайта.',
      keywords: ['faq сайты', 'вопросы о сайтах', 'частые вопросы', 'разработка сайтов вопросы', 'seo вопросы', 'цена сайта вопросы']
    },
    en: {
      title: 'Website Development FAQ | Common Questions | WebVy',
      description: 'Answers to common website development questions: prices, timelines, technologies, SEO, support. Everything you need to know before ordering a website.',
      keywords: ['website faq', 'website questions', 'common questions', 'development questions', 'seo questions', 'website price questions']
    }
  },
  process: {
    uk: {
      title: 'Етапи розробки сайтів | Процес створення сайту | WebVy',
      description: 'Повний процес розробки сайту від аналізу до запуску. Етапи: дизайн, розробка, тестування, налаштування. Прозора робота та контроль.',
      keywords: ['етапи розробки', 'процес створення сайту', 'як роблять сайти', 'розробка сайту кроки', 'створення сайту процес', 'етапи веб розробки']
    },
    ru: {
      title: 'Этапы разработки сайтов | Процесс создания сайта | WebVy',
      description: 'Полный процесс разработки сайта от анализа до запуска. Этапы: дизайн, разработка, тестирование, настройка. Прозрачная работа и контроль.',
      keywords: ['этапы разработки', 'процесс создания сайта', 'как делают сайты', 'разработка сайта шаги', 'создание сайта процесс', 'этапы веб разработки']
    },
    en: {
      title: 'Website Development Stages | Website Creation Process | WebVy',
      description: 'Complete website development process from analysis to launch. Stages: design, development, testing, setup. Transparent work and control.',
      keywords: ['development stages', 'website creation process', 'how websites are made', 'website development steps', 'website creation process', 'web development stages']
    }
  }
}

export default function SectionSEO({ sectionId }: { sectionId: string }) {
  const seoData = multilingualSEOData[sectionId as keyof typeof multilingualSEOData]

  useEffect(() => {
    if (!seoData) return

    // Визначаємо поточну мову
    const currentLang = document.documentElement.lang || 'uk'
    const currentSEO = seoData[currentLang as keyof typeof seoData] || seoData.uk

    // Оновлюємо метатеги для секції
    document.title = currentSEO.title
    
    // Оновлюємо meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', currentSEO.description)
    
    // Оновлюємо meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', currentSEO.keywords.join(', '))
    
    // Оновлюємо canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `https://webvy.online/#${sectionId}`)
    
    // Додаємо hreflang теги для мовних версій
    const languages = ['uk', 'ru', 'en']
    languages.forEach(lang => {
      let hreflang = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
      if (!hreflang) {
        hreflang = document.createElement('link')
        hreflang.setAttribute('rel', 'alternate')
        hreflang.setAttribute('hreflang', lang)
        document.head.appendChild(hreflang)
      }
      hreflang.setAttribute('href', `https://webvy.online/#${sectionId}`)
    })
    
    // Додаємо x-default для мовної версії за замовчуванням
    let hreflangDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]')
    if (!hreflangDefault) {
      hreflangDefault = document.createElement('link')
      hreflangDefault.setAttribute('rel', 'alternate')
      hreflangDefault.setAttribute('hreflang', 'x-default')
      document.head.appendChild(hreflangDefault)
    }
    hreflangDefault.setAttribute('href', `https://webvy.online/#${sectionId}`)
    
    // Додаємо структуровані дані для секції
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": currentSEO.title,
      "description": currentSEO.description,
      "url": `https://webvy.online/#${sectionId}`,
      "inLanguage": currentLang,
      "isPartOf": {
        "@id": "https://webvy.online/#website"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": currentLang === 'uk' ? 'Головна' : currentLang === 'ru' ? 'Главная' : 'Home',
            "item": "https://webvy.online/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": currentSEO.title,
            "item": `https://webvy.online/#${sectionId}`
          }
        ]
      }
    }

    // Видаляємо старі структуровані дані
    const oldScript = document.querySelector(`script[data-section="${sectionId}"]`)
    if (oldScript) {
      oldScript.remove()
    }

    // Додаємо нові структуровані дані
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-section', sectionId)
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      // Cleanup при розмонтуванні
      const script = document.querySelector(`script[data-section="${sectionId}"]`)
      if (script) {
        script.remove()
      }
    }
  }, [seoData, sectionId])

  return null // Компонент не рендерить нічого, тільки оновлює SEO
}
