import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { FaSpinner } from 'react-icons/fa';
import AnimatedSection from '../../components/common/AnimatedSection';
import NewsCard from '../../components/common/NewsCard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';
import { SkeletonCards } from '../../components/common/Skeleton';
import { localized } from '../../utils/localize';
import { handleImageError } from '../../utils/imageFallback';
import api from '../../services/api';

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(t('news.title'), { description: t('news.meta_description') });

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const loadNews = useCallback(async (pageNum, reset = true) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);
    setError(null);
    try {
      const res = await api.get('/news', { params: { page: pageNum } });
      const payload = res.data;
      const items = payload.data ?? payload;
      setNews((prev) => (reset ? items : [...prev, ...items]));
      setPage(pageNum);
      setHasMore(Boolean(payload.meta && pageNum < payload.meta.last_page));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    api
      .get('/news', { params: { page: 1 } })
      .then((res) => {
        const payload = res.data;
        if (ignore) return;
        setNews(payload.data ?? payload);
        setPage(1);
        setHasMore(Boolean(payload.meta && 1 < payload.meta.last_page));
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const featured = news[0];
  const rest = news.slice(1);

  return (
    <>
      <PageHero titleKey="news.title" />

      <section className="section">
        <div className="container">
          {loading ? (
            <SkeletonCards count={6} />
          ) : error ? (
            <div className="empty-state" role="alert">
              <h3>{t('news.load_error')}</h3>
              <button className="btn btn-primary" onClick={() => setReloadKey((k) => k + 1)}>{t('common.retry')}</button>
            </div>
          ) : news.length === 0 ? (
            <div className="empty-state">
              <h3>{t('news.no_news')}</h3>
            </div>
          ) : (
            <>
              {featured && (
                <AnimatedSection className="featured-news card">
                  <Link to={`/news/${featured.slug || featured.id}`} className="featured-news-link">
                    {featured.featured_image ? (
                      <img src={featured.featured_image} alt={localized(featured.title, i18n.language)} className="featured-news-image" loading="eager" onError={handleImageError} />
                    ) : (
                      <div className="featured-news-placeholder" />
                    )}
                    <div className="featured-news-body">
                      <span className="featured-news-badge">{t('news.featured')}</span>
                      <h2>{localized(featured.title, i18n.language)}</h2>
                      <p>
                        {localized(featured.content, i18n.language)?.replace(/<[^>]*>/g, '').substring(0, 220)}
                      </p>
                    </div>
                  </Link>
                </AnimatedSection>
              )}
              {rest.length > 0 && (
                <div className="news-grid" style={{ marginTop: '2rem' }}>
                  {rest.map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              )}
              {hasMore && (
                <div className="load-more-wrap">
                  <button className="btn btn-outline" onClick={() => loadNews(page + 1, false)} disabled={loadingMore}>
                    {loadingMore ? <FaSpinner className="spin" /> : null}
                    {loadingMore ? t('common.loading') : t('news.load_more')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .featured-news { overflow: hidden; }
        .featured-news-link {
          display: grid;
          grid-template-columns: 2fr 3fr;
          align-items: stretch;
          color: inherit;
        }
        .featured-news-image,
        .featured-news-placeholder {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
        }
        .featured-news-placeholder {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          opacity: 0.25;
        }
        .featured-news-body { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
        .featured-news-badge {
          align-self: flex-start;
          background: var(--primary);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }
        .featured-news-body h2 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .featured-news-body p { color: var(--text-secondary); line-height: 1.7; }
        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
        }
        .spin { animation: spin 0.8s linear infinite; margin-right: 0.5rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .featured-news-link { grid-template-columns: 1fr; }
          .featured-news-image, .featured-news-placeholder { min-height: 200px; }
        }
      `}</style>
    </>
  );
}
