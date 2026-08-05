import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';
import { FaCalendarAlt } from 'react-icons/fa';
import AnimatedSection from '../../components/common/AnimatedSection';
import RichText from '../../components/common/RichText';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import useFetch from '../../hooks/useFetch';
import { localized } from '../../utils/localize';
import Skeleton from '../../components/common/Skeleton';

const locales = { fr, en: enUS, ar };

function buildShareLinks(url, title) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return [
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'WhatsApp', url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ];
}

export default function NewsDetailPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const { data: article, loading, error } = useFetch(`/news/${slug}`);

  const lang = i18n.language;
  const locale = locales[lang] || fr;
  const title = article ? localized(article.title, lang) : '';
  const content = article ? localized(article.content, lang) : '';

  useDocumentTitle(title || t('news.title'), {
    description: content ? content.replace(/<[^>]*>/g, '').substring(0, 155) : t('news.meta_description'),
  });

  const shareLinks = article ? buildShareLinks(window.location.href, title) : [];

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Skeleton height={40} width="70%" />
          <Skeleton height={18} style={{ marginTop: '1.5rem' }} />
          <Skeleton height={18} style={{ marginTop: 8 }} />
          <Skeleton height={300} style={{ marginTop: '2rem' }} />
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div className="empty-state">
            <h3>{t('news.load_error')}</h3>
            <Link to="/news" className="btn btn-primary">{t('common.back')}</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero-bg" />
        <div className="container">
          <div className="container-breadcrumbs">
            <Breadcrumbs items={[{ label: t('news.title'), to: '/news' }, { label: title }]} />
          </div>
          <AnimatedSection>
            <h1>{title}</h1>
            <div className="detail-meta">
              {article.created_at && (
                <span><FaCalendarAlt /> {format(new Date(article.created_at), 'dd MMM yyyy', { locale })}</span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-content">
              {article.featured_image && (
                <img src={article.featured_image} alt={title} className="detail-image" loading="eager" />
              )}
              <AnimatedSection>
                <RichText html={content} />
              </AnimatedSection>
            </div>
            <aside className="detail-sidebar">
              <AnimatedSection delay={0.2}>
                <div className="sidebar-card">
                  <h3>{t('news.share')}</h3>
                  <div className="share-buttons">
                    {shareLinks.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-btn"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .detail-hero {
          position: relative;
          padding: 9rem 0 4rem;
          background: var(--secondary);
          color: #fff;
        }
        .detail-hero h1 { font-size: 2.5rem; max-width: 700px; }
        .container-breadcrumbs { margin-bottom: 1.5rem; }
        .container-breadcrumbs .breadcrumbs { margin-bottom: 0; }
        .container-breadcrumbs .breadcrumbs a,
        .container-breadcrumbs .breadcrumbs svg { color: rgba(255,255,255,0.65); }
        .container-breadcrumbs .breadcrumb-current { color: #fff; }
        .detail-meta {
          display: flex;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .detail-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
        }
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 3rem;
        }
        .detail-content p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem; }
        .detail-image {
          width: 100%;
          max-height: 420px;
          object-fit: cover;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .sidebar-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          margin-bottom: 1.5rem;
        }
        .sidebar-card h3 { font-family: var(--font-body); font-size: 1rem; margin-bottom: 1rem; }
        .share-buttons { display: flex; flex-direction: column; gap: 0.5rem; }
        .share-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #D1D5DB;
          border-radius: var(--radius-sm);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
          text-align: center;
          color: var(--text-primary);
        }
        .share-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
        @media (max-width: 768px) {
          .detail-layout { grid-template-columns: 1fr; }
          .detail-hero h1 { font-size: 1.75rem; }
        }
      `}</style>
    </>
  );
}
