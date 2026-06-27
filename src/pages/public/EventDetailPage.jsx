import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaShare, FaArrowLeft } from 'react-icons/fa';
import AnimatedSection from '../../components/common/AnimatedSection';
import Button from '../../components/common/Button';

const mockEvent = {
  id: 1,
  slug: 'example',
  title: { fr: 'Conférence Internationale sur le Dialogue des Cultures' },
  description: { fr: '<p>Une conférence de renommée internationale réunissant des experts du monde entier pour discuter du dialogue interculturel.</p><p>Au programme: conférences plénières, ateliers et tables rondes.</p>' },
  category: 'conference',
  start_date: '2026-09-15T09:00:00',
  end_date: '2026-09-17T18:00:00',
  space: { name: { fr: 'Grande Salle' } },
  featured_image: '',
};

export default function EventDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const event = mockEvent;

  const title = typeof event.title === 'object' ? (event.title[i18n.language] || event.title.fr) : event.title;

  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero-bg" />
        <div className="container">
          <Link to="/events" className="back-link"><FaArrowLeft /> {t('events.title')}</Link>
          <AnimatedSection>
            <h1>{title}</h1>
            <div className="detail-meta">
              <span><FaCalendarAlt /> {event.start_date && format(new Date(event.start_date), 'dd MMM yyyy', { locale: fr })}</span>
              <span><FaClock /> {event.start_date && format(new Date(event.start_date), 'HH:mm')}</span>
              {event.space && <span><FaMapMarkerAlt /> {event.space.name?.fr}</span>}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-content">
              <AnimatedSection>
                <div dangerouslySetInnerHTML={{ __html: typeof event.description === 'object' ? (event.description[i18n.language] || event.description.fr) : event.description }} />
              </AnimatedSection>
            </div>
            <aside className="detail-sidebar">
              <AnimatedSection delay={0.2}>
                <div className="sidebar-card">
                  <h3>{t('events.register')}</h3>
                  <Button variant="accent" style={{ width: '100%', justifyContent: 'center' }}>{t('events.register')}</Button>
                </div>
                <div className="sidebar-card">
                  <h3>{t('events.share')}</h3>
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
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2rem;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: #fff; }
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
