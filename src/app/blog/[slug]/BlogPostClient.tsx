'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/utils/i18n-context';
import MobileMenu from '@/components/MobileMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';

const postsMeta = [
  { slug: 'yak-vybraty-hostyng', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_webdev', 'blog.tag_hosting'] },
  { slug: 'seo-dlya-lendingu', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'] },
  { slug: 'react-vs-wordpress', categoryKey: 'blog.category_tech', tagsKeys: ['blog.tag_react', 'blog.tag_webdev'] },
  { slug: 'core-web-vitals', categoryKey: 'blog.category_tech', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'] },
  { slug: 'struktura-lendingu', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'] },
  { slug: 'optimizaciya-shvydkosti', categoryKey: 'blog.category_tech', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'] },
  { slug: 'konversiya-lendingu', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_seo', 'blog.tag_webdev'] },
  { slug: 'bezpeka-saitu', categoryKey: 'blog.category_tech', tagsKeys: ['blog.tag_webdev'] },
  { slug: 'stvorennya-saitu-cina', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'] },
  { slug: 'landing-chi-site', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'] },
  { slug: 'seo-pislya-zapusku', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_seo'] },
  { slug: 'pomylky-pry-zamovlenni-saitu', categoryKey: 'blog.category_guides', tagsKeys: ['blog.tag_webdev', 'blog.tag_seo'] },
] as const;

type PostSlug = (typeof postsMeta)[number]['slug'];

interface BlogPostClientProps {
  slug: PostSlug;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const { t, locale } = useI18n();
  const meta = postsMeta.find((p) => p.slug === slug);

  if (!meta) {
    return (
      <main>
        <section className="blog-hero">
          <div className="container">
            <h1 className="blog-title">404</h1>
            <p className="blog-subtitle">Post not found.</p>
          </div>
        </section>
      </main>
    );
  }

  const title = t(`blog.posts.${meta.slug}.title`);
  const excerpt = t(`blog.posts.${meta.slug}.excerpt`);
  const body = t(`blog.posts.${meta.slug}.body`, { returnObjects: true }) as unknown as string[];
  const category = t(meta.categoryKey || 'blog.category_guides');
  const tags = meta.tagsKeys.map((key) => t(key));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    articleBody: Array.isArray(body) ? body.join('\n\n') : String(body),
    inLanguage: locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://webvy.online/blog/${meta.slug}/`,
    },
    author: {
      '@type': 'Person',
      name: 'WebVy',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WebVy',
      url: 'https://webvy.online/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webvy.online/apple-icon.png',
      },
    },
  };

  return (
    <main>
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
                    <li><a href="/#services">{t('navigation.services')}</a></li>
                    <li><a href="/#portfolio">{t('navigation.portfolio')}</a></li>
                    <li><a href="/#about">{t('navigation.about')}</a></li>
                    <li><a href="/#reviews">{t('navigation.reviews')}</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li><a href="/blog">{t('navigation.blog')}</a></li>
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
          <h1 className="blog-title">{title}</h1>
        </div>
      </section>

      <section className="blog-post-content">
        <div className="container">
          <article className="blog-post-article">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {body.map((paragraph, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </article>
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
