import { ukrainianCities } from '@/data/ukrainian-cities';
import { blogPosts } from '@/data/blog-posts';

interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Базові URL сайту
export const generateBasicUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://webvy.online';
  const currentDate = new Date().toISOString();
  
  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
};

// URL для блог-постів
export const generateBlogUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://webvy.online';
  const currentDate = new Date().toISOString();
  
  return blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
};

// URL для міст
export const generateCityUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://webvy.online';
  const currentDate = new Date().toISOString();
  
  return ukrainianCities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
};

// URL для комбінації міст та послуг
export const generateCityServiceUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://webvy.online';
  const currentDate = new Date().toISOString();
  const services = [
    { slug: 'landing-page', name: 'Лендінг' },
    { slug: 'business-card-site', name: 'Сайт-візитка' },
    { slug: 'corporate-site', name: 'Корпоративний сайт' },
    { slug: 'online-store', name: 'Інтернет-магазин' },
  ];
  
  const urls: SitemapUrl[] = [];
  
  for (const city of ukrainianCities) {
    for (const service of services) {
      urls.push({
        url: `${baseUrl}/city/${city.slug}/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }
  
  return urls;
};

// URL для комбінації міст та блог-постів
export const generateCityBlogUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://webvy.online';
  const currentDate = new Date().toISOString();
  
  const urls: SitemapUrl[] = [];
  
  for (const city of ukrainianCities) {
    for (const post of blogPosts) {
      urls.push({
        url: `${baseUrl}/city/${city.slug}/blog/${post.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }
  
  return urls;
};

// Генерація всіх URL для sitemap
export const generateAllSitemapUrls = (): SitemapUrl[] => {
  return [
    ...generateBasicUrls(),
    ...generateBlogUrls(),
    ...generateCityUrls(),
    ...generateCityServiceUrls(),
    ...generateCityBlogUrls(),
  ];
};

// Генерація XML для sitemap
export const generateSitemapXml = (): string => {
  const urls = generateAllSitemapUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach((url) => {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    xml += `    <lastmod>${url.lastModified}</lastmod>\n`;
    xml += `    <changefreq>${url.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Функція для розділення sitemap на частини (якщо більше 50000 URL)
export const splitSitemapIfNeeded = (): { index: string; sitemaps: string[] } => {
  const MAX_URLS_PER_SITEMAP = 50000;
  const urls = generateAllSitemapUrls();
  
  if (urls.length <= MAX_URLS_PER_SITEMAP) {
    return { 
      index: '',
      sitemaps: [generateSitemapXml()] 
    };
  }
  
  const chunks: SitemapUrl[][] = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
  }
  
  const sitemaps = chunks.map((chunk, index) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    chunk.forEach((url) => {
      xml += '  <url>\n';
      xml += `    <loc>${url.url}</loc>\n`;
      xml += `    <lastmod>${url.lastModified}</lastmod>\n`;
      xml += `    <changefreq>${url.changeFrequency}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    return xml;
  });
  
  // Створення індексного файлу sitemap
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (let i = 0; i < sitemaps.length; i++) {
    indexXml += '  <sitemap>\n';
    indexXml += `    <loc>https://webvy.online/sitemap-${i + 1}.xml</loc>\n`;
    indexXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    indexXml += '  </sitemap>\n';
  }
  
  indexXml += '</sitemapindex>';
  
  return {
    index: indexXml,
    sitemaps
  };
};
