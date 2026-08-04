import { useTranslation } from 'react-i18next';
import AnimatedSection from '../../components/common/AnimatedSection';
import NewsCard from '../../components/common/NewsCard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const mockNews = [
  { id: 1, slug: 'article-1', title: { fr: 'Inauguration de la nouvelle exposition' }, content: { fr: 'Le Centre Hassan II a inauguré une nouvelle exposition...' }, created_at: '2026-05-15', featured_image: '' },
  { id: 2, slug: 'article-2', title: { fr: 'Appel à candidatures — Résidence d\'artistes' }, content: { fr: 'Le Centre lance un appel à candidatures pour sa résidence d\'artistes 2026...' }, created_at: '2026-04-20', featured_image: '' },
  { id: 3, slug: 'article-3', title: { fr: 'Conférence sur le patrimoine immatériel' }, content: { fr: 'Une conférence internationale sur la préservation du patrimoine...' }, created_at: '2026-03-10', featured_image: '' },
];

export default function NewsPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('news.title'));

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <h1>{t('news.title')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {mockNews.length === 0 ? (
            <div className="empty-state">
              <h3>{t('news.no_news')}</h3>
            </div>
          ) : (
            <>
              {mockNews[0] && (
                <AnimatedSection className="featured-news card">
                  <div style={{ height: '300px', background: '#E5E7EB', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />
                  <div style={{ padding: '2rem' }}>
                    <h2>{typeof mockNews[0].title === 'object' ? mockNews[0].title.fr : mockNews[0].title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      {typeof mockNews[0].content === 'object' ? mockNews[0].content.fr?.substring(0, 200) : mockNews[0].content?.substring(0, 200)}
                    </p>
                  </div>
                </AnimatedSection>
              )}
              <div className="news-grid" style={{ marginTop: '2rem' }}>
                {mockNews.slice(1).map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`
        .page-hero {
          padding: 10rem 0 5rem;
          background: var(--secondary);
          color: #fff;
          text-align: center;
        }
        .page-hero h1 { font-size: 3rem; }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </>
  );
}
