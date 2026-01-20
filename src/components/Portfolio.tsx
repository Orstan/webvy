import React from 'react';
import Image from 'next/image';
import styles from './Portfolio.module.css';
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();
  
  return (
    <section className={styles.portfolio} id="portfolio">
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('portfolio.title')}</h2>
        <div className={styles.portfolioGrid}>
          {/* Проект 1: Kaercher Rental */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/kaercher.png" 
                unoptimized 
                alt={t('portfolio.projects.kaercher.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.kaercher.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.kaercher.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.kaercher.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>Технології</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>Next.js</span>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>JavaScript</span>
                  <span className={styles.techTag}>Tailwind CSS</span>
                  <span className={styles.techTag}>Адаптивний дизайн</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="https://kaercher-rental.com/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                Відвідати сайт
              </a>
            </div>
          </div>

          {/* Проект 2: Kandinsky Residence */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/kandinsky.png" 
                unoptimized 
                alt={t('portfolio.projects.kandinsky.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.kandinsky.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.kandinsky.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.kandinsky.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>Технології</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>Next.js</span>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>JavaScript</span>
                  <span className={styles.techTag}>Tailwind CSS</span>
                  <span className={styles.techTag}>Адаптивний дизайн</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="http://kandinsky-service.com.ua/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                Відвідати сайт
              </a>
            </div>
          </div>

          {/* Проект 3: Адвокат Пройдак */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/advokat.png" 
                unoptimized 
                alt={t('portfolio.projects.advokat.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.advokat.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.advokat.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.advokat.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>{t('portfolio.technologies')}</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>{t('portfolio.tech.html5')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.css3')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.javascript')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.php')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.responsive')}</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="https://advokat-proidak.com/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>
          
          {/* Проект 4: Powerix Express */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/powerix.png" 
                unoptimized 
                alt={t('portfolio.projects.powerix.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.powerix.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.powerix.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.powerix.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>{t('portfolio.technologies')}</h4>
                <div className={styles.techList}>
                  {/* Використовуємо умовний рендеринг для уникнення помилок при відсутності ключів */}
                  <span className={styles.techTag}>Next.js</span>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>JavaScript</span>
                  <span className={styles.techTag}>Tailwind CSS</span>
                  <span className={styles.techTag}>{t('portfolio.tech.responsive')}</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="https://powerix-express.com/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>

          {/* Проект 5: Сонячна Долина */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/dolyna.webp" 
                unoptimized 
                alt={t('portfolio.projects.dolyna.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.dolyna.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.dolyna.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.dolyna.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>{t('portfolio.technologies')}</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>{t('portfolio.tech.html5')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.css3')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.javascript')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.php')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.3d')}</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="https://soniachna.com/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>
          
          {/* Проект 6: 56 Кабінет */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/56.webp" 
                unoptimized 
                alt={t('portfolio.projects.kabinet.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.kabinet.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.kabinet.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.kabinet.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>{t('portfolio.technologies')}</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>{t('portfolio.tech.wordpress')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.php')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.mysql')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.javascript')}</span>
                  <span className={styles.techTag}>{t('portfolio.tech.responsive')}</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="https://56kabinet.te.ua/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>
          
          {/* Проект 7: My Transfer */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/transfer.png" 
                unoptimized 
                alt={t('portfolio.projects.transfer.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.transfer.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.transfer.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.transfer.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>Технології</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>Next.js</span>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>JavaScript</span>
                  <span className={styles.techTag}>Tailwind CSS</span>
                  <span className={styles.techTag}>Адаптивний дизайн</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="http://my-transfer.com.ua/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                Відвідати сайт
              </a>
            </div>
          </div>

          {/* Проект 8: ProchePro */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImage}>
              <Image 
                src="/img/portfolio/prochepro.png" 
                unoptimized 
                alt={t('portfolio.projects.prochepro.title')} 
                width={400} 
                height={250} 
                className={styles.projectImage}
              />
              <span className={styles.projectTag}>{t('portfolio.projects.prochepro.tag')}</span>
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{t('portfolio.projects.prochepro.title')}</h3>
              <p className={styles.projectDescription}>
                {t('portfolio.projects.prochepro.description')}
              </p>
              <div className={styles.projectTech}>
                <h4>{t('portfolio.technologies')}</h4>
                <div className={styles.techList}>
                  <span className={styles.techTag}>Next.js</span>
                  <span className={styles.techTag}>Laragon</span>
                  <span className={styles.techTag}>React</span>
                  <span className={styles.techTag}>JavaScript</span>
                  <span className={styles.techTag}>Tailwind CSS</span>
                  <span className={styles.techTag}>{t('portfolio.tech.responsive')}</span>
                </div>
              </div>
            </div>
            <div className={styles.projectActions}>
              <a href="https://prochepro.fr/" target="_blank" rel="noopener noreferrer" className={styles.btnViewProject}>
                {t('portfolio.visit_site')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Portfolio;
