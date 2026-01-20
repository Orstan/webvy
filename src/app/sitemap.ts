import { MetadataRoute } from 'next';
import { ukrainianCities } from '@/data/ukrainian-cities';
import { blogPosts } from '@/data/blog-posts';

export const dynamic = 'force-static';
export const revalidate = 86400; // Перевіряти раз на день

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webvy.online';
  const currentDate = new Date().toISOString();
  
  // Базові URL сайту
  const basicUrls = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
  ];

  // URL для блог-постів
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.8,
  }));

  // URL для міст
  const cityUrls = ukrainianCities.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.7,
  }));

  // URL для комбінації міст та послуг
  const services = [
    { slug: 'landing-page', name: 'Лендінг' },
    { slug: 'business-card-site', name: 'Сайт-візитка' },
    { slug: 'corporate-site', name: 'Корпоративний сайт' },
    { slug: 'online-store', name: 'Інтернет-магазин' },
  ];
  
  const cityServiceUrls = [];
  
  for (const city of ukrainianCities) {
    for (const service of services) {
      cityServiceUrls.push({
        url: `${baseUrl}/city/${city.slug}/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: 0.7,
      });
    }
  }

  // URL для комбінації міст та блог-постів
  const cityBlogUrls = [];
  
  for (const city of ukrainianCities) {
    for (const post of blogPosts) {
      cityBlogUrls.push({
        url: `${baseUrl}/city/${city.slug}/blog/${post.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as ChangeFrequency,
        priority: 0.6,
      });
    }
  }

  return [
    ...basicUrls,
    ...blogUrls,
    ...cityUrls,
    ...cityServiceUrls,
    ...cityBlogUrls,
  ];
}
