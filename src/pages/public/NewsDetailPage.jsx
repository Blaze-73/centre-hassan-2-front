import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaArrowLeft, FaShare, FaUser } from 'react-icons/fa';
import AnimatedSection from '../../components/common/AnimatedSection';

const mockArticle = {
  id: 1,
  title: { fr: 'Inauguration de la nouvelle exposition' },
  content: { fr: '<p>Le Centre Hassan II des Rencontres Internationales a le plaisir d\'annoncer l\'inauguration de sa nouvelle exposition d\'art contemporain.</p><p>Cette exposition réunit des artistes de renommée internationale et met en lumière la richesse de la création artistique contemporaine.</p><p>Vernissage le 15 septembre 2026 à 18h00. Entrée libre.</p>' },
  created_at: '2026-05-15',
  author: { name: 'Admin' },
  featured_image: '',
};

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const article = mockArticle;

  const title = typeof article.title === 'object' ? (article.title[i18n.language] || article.title.fr) : article.title;

  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero-bg" />
        <div className="container">
          <Link to="/news" className="back-link"><FaArrowLeft /> {t('news.title')}</Link>
          <AnimatedSection>
            <h1>{title}</h1>
            <div className="detail-meta">
              <span><FaUser /> {article.author?.name}</span>
              <span>{article.created_at && format(new Date(article.created_at), 'dd MMM yyyy', { locale: fr })}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-content">
              <AnimatedSection>
                <div style={{ height: '400px', background: '#E5E7EB', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }} />
                <div dangerouslySetInnerHTML={{ __html: typeof article.content === 'object' ? (article.content[i18n.language] || article.content.fr) : article.content }} />
              </AnimatedSection>
            </div>
            <aside className="detail-sidebar">
              <AnimatedSection delay={0.2}>
                <div className="sidebar-card">
                  <h3>{t('news.share')}</h3>
                  <div className="share-buttons">
                    {['Facebook', 'Twitter', 'WhatsApp'].map((s) => (
                      <button key={s} className="share-btn">{s}</button>
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
          padding: 10rem 0 4rem;
          background: var(--secondary);
          color: #fff;
        }
        .detail-hero h1 { font-size: 2.5rem; max-width: 700px; }
        .detail-content p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem; }
      `}</style>
    </>
  );
}
