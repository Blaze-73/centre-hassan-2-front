import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const locales = { fr, en: enUS, ar };

export default function NewsCard({ article, index = 0 }) {
  const { i18n, t } = useTranslation();
  const locale = locales[i18n.language] || fr;
  const title = typeof article.title === 'object' ? (article.title[i18n.language] || article.title.fr) : article.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/news/${article.slug || article.id}`} className="card news-card">
        <div className="news-card-image">
          <img
            src={article.featured_image || '/images/placeholder-news.jpg'}
            alt={title}
            loading="lazy"
          />
        </div>
        <div className="news-card-body">
          <div className="news-card-meta">
            {article.created_at && format(new Date(article.created_at), 'MMM d, yyyy', { locale })}
          </div>
          <h3>{title}</h3>
          <p className="news-card-excerpt">
            {typeof article.content === 'object'
              ? (article.content[i18n.language] || article.content.fr)?.replace(/<[^>]*>/g, '').substring(0, 150)
              : article.content?.replace(/<[^>]*>/g, '').substring(0, 150)}
          </p>
          <span className="read-more">{t('news.read_more')} →</span>
        </div>
      </Link>
      <style>{`
        .news-card { display: block; }
        .news-card-image {
          height: 220px;
          overflow: hidden;
        }
        .news-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .news-card:hover .news-card-image img { transform: scale(1.05); }
        .news-card-body { padding: 1.25rem; }
        .news-card-meta {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .news-card-body h3 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .news-card-excerpt {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .read-more {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 0.75rem;
          display: inline-block;
        }
      `}</style>
    </motion.div>
  );
}
