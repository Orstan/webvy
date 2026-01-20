"use client";

import Link from 'next/link';
import { useI18n } from '@/utils/i18n-context';
import styles from './BlogPreview.module.css';

const previewSlugs = [
  'core-web-vitals',
  'react-vs-wordpress',
  'seo-dlya-lendingu',
  'yak-vybraty-hostyng',
] as const;

export default function BlogPreview() {
  const { t } = useI18n();

  return (
    <section id="blog-preview" className={`section ${styles.blogPreviewSection}`}>
      <div className="container">
        <h2 className="section-title">
          {t('blog.preview_title', 'Корисні статті про SEO, швидкість та Next.js')}
        </h2>
        <p className="section-subtitle">
          {t(
            'blog.preview_subtitle',
            '3–4 останні матеріали з блогу, які допоможуть розібратися в SEO, швидкості та сучасних технологіях.'
          )}
        </p>

        <div className={styles.blogGridPreview}>
          {previewSlugs.map((slug) => {
            const title = t(`blog.posts.${slug}.title`);
            const excerpt = t(`blog.posts.${slug}.excerpt`);

            return (
              <article key={slug} className={styles.blogCardPreview}>
                <h3 className={styles.blogCardTitle}>{title}</h3>
                <p className={styles.blogCardExcerpt}>{excerpt}</p>
                <div className="blog-card-footer">
                  <Link href={`/blog/${slug}`} className="blog-card-link">
                    {t('blog.read_more')}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.blogPreviewCta}>
          <Link href="/blog" className="btn">
            {t('blog.preview_cta', 'Перейти до блогу')}
          </Link>
        </div>
      </div>
    </section>
  );
}
