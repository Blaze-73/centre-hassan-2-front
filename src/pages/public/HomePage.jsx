import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import AnimatedSection from '../../components/common/AnimatedSection';
import Button from '../../components/common/Button';
import api from '../../services/api';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const staticStats = [
  { value: 38, suffix: '+', key: 'stats_years' },
  { value: 500, suffix: '+', key: 'stats_events' },
  { value: 60, suffix: '+', key: 'stats_countries' },
  { value: 1000, suffix: '+', key: 'stats_artists' },
];

export default function HomePage() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(t('hero.title'));
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    try {
      await api.post('/newsletter/subscribe', { email: newsletterEmail });
      toast.success(t('home.newsletter_success'));
      setNewsletterEmail('');
    } catch {
      toast.error(t('home.newsletter_error'));
    } finally {
      setSubscribing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, spacesRes, galleryRes] = await Promise.all([
          api.get('/events/upcoming'),
          api.get('/spaces'),
          api.get('/gallery'),
        ]);
        setUpcomingEvents(eventsRes.data?.data || []);
        setSpaces(spacesRes.data?.data || []);
        setGallery(galleryRes.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const lang = i18n.language;

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button to="/events" variant="accent">
              {t('hero.cta')} <FaArrowRight />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AnimatedSection className="split-section">
            <div className="split-image">
              <div className="about-placeholder" />
            </div>
            <div className="split-content">
              <h2 className="section-title" style={{ textAlign: 'left' }}>{t('home.about_title')}</h2>
              <p>{t('home.about_text')}</p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                {t('home.about_cta')} <FaArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">{t('home.upcoming_events')}</h2>
            <p className="section-subtitle">{t('events.title')}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <div className="spinner" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>{t('home.no_upcoming_events')}</p>
            ) : (
              <div className="events-scroll">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} to={`/events/${event.slug}`} className="card event-card" style={{ minWidth: '300px', flexShrink: 0, textDecoration: 'none', color: 'inherit' }}>
                    <div className="event-card-img">
                      {event.featured_image ? (
                        <img src={event.featured_image} alt="" />
                      ) : (
                        <div className="event-card-img-placeholder" />
                      )}
                    </div>
                    <div className="event-card-body">
                      <div className="event-card-date">
                        {event.start_date ? format(new Date(event.start_date), 'dd MMM yyyy', { locale: fr }) : ''}
                      </div>
                      <h3>{event.title?.[lang] || event.title?.fr || event.title?.en || ''}</h3>
                      <p className="event-card-desc">
                        {event.description?.[lang] || event.description?.fr || ''}
                      </p>
                      <span className="event-card-category">{event.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/events" className="btn btn-secondary">
                {t('events.title')} <FaArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {spaces.length > 0 && (
        <section className="section">
          <div className="container">
            <AnimatedSection>
              <h2 className="section-title">{t('spaces.title')}</h2>
              <p className="section-subtitle">{t('spaces.title')}</p>
            </AnimatedSection>
            <div className="spaces-grid">
              {spaces.slice(0, 3).map((space, i) => (
                <AnimatedSection key={space.id} delay={i * 0.1} className="card space-card">
                  <div className="space-card-body">
                    <h3>{space.name?.[lang] || space.name?.fr || ''}</h3>
                    <p>{space.description?.[lang] || space.description?.fr || ''}</p>
                    <div className="space-card-meta">
                      <span><strong>{space.capacity}</strong> personnes</span>
                      {space.amenities?.slice(0, 3).map((a, j) => (
                        <span key={j} className="badge-amenity">{a}</span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/spaces" className="btn btn-primary">{t('spaces.title')} <FaArrowRight /></Link>
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="section" style={{ background: '#fff' }}>
          <div className="container">
            <AnimatedSection>
              <h2 className="section-title">{t('gallery.title')}</h2>
              <p className="section-subtitle">{t('gallery.title')}</p>
            </AnimatedSection>
            <div className="gallery-preview">
              {gallery.slice(0, 6).map((item, i) => (
                <AnimatedSection key={item.id} delay={i * 0.05} className="gallery-preview-item">
                  {item.image_path ? (
                    <img src={item.image_path} alt="" />
                  ) : (
                    <div className="gallery-placeholder" />
                  )}
                </AnimatedSection>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/gallery" className="btn btn-primary">{t('gallery.title')} <FaArrowRight /></Link>
            </div>
          </div>
        </section>
      )}

      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid-home">
            {staticStats.map((stat, i) => (
              <AnimatedSection key={stat.key} delay={i * 0.15} className="stat-item">
                <Counter value={stat.value} suffix={stat.suffix} />
                <p>{t(`home.${stat.key}`)}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section newsletter-section">
        <div className="container">
          <AnimatedSection className="newsletter-box">
            <h2>{t('home.newsletter_title')}</h2>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder={t('home.newsletter_placeholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-accent" disabled={subscribing}>
                {subscribing ? '...' : t('home.newsletter_cta')}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: url('/images/h2.jpg') center center / cover no-repeat;
          animation: ken-burns 12s ease-out forwards;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,25,35,0.75) 0%, rgba(27,58,75,0.6) 100%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #fff;
          max-width: 800px;
          padding: 0 1.5rem;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          text-shadow: 0 2px 30px rgba(0,0,0,0.4);
        }
        .hero-content p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }
        @keyframes ken-burns {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .split-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .about-placeholder {
          width: 100%;
          height: 400px;
          background: url('/images/h2.jpg') center center / cover no-repeat;
          border-radius: var(--radius-md);
        }
        .split-content p {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1.05rem;
        }
        .events-scroll {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-snap-type: x mandatory;
        }
        .events-scroll > * { scroll-snap-align: start; }
        .event-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .event-card-img { height: 180px; overflow: hidden; }
        .event-card-img img { width: 100%; height: 100%; object-fit: cover; }
        .event-card-img-placeholder {
          height: 180px;
          background: url('/images/h2.jpg') center center / cover no-repeat;
        }
        .event-card-body { padding: 1.25rem; }
        .event-card-date {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .event-card-body h3 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }
        .event-card-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .event-card-category {
          display: inline-block;
          margin-top: 0.75rem;
          padding: 0.2rem 0.6rem;
          background: rgba(200,149,108,0.1);
          color: var(--primary);
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .spaces-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .space-card { padding: 1.5rem; transition: transform 0.2s, box-shadow 0.2s; }
        .space-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .space-card h3 { font-family: var(--font-heading); margin-bottom: 0.75rem; font-size: 1.2rem; }
        .space-card p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }
        .space-card-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
        .space-card-meta span { font-size: 0.85rem; color: #374151; }
        .badge-amenity {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          background: #F3F4F6;
          border-radius: 9999px;
          color: #6B7280;
        }
        .gallery-preview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .gallery-preview-item {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 1;
        }
        .gallery-preview-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .gallery-preview-item:hover img { transform: scale(1.05); }
        .gallery-placeholder { width: 100%; height: 100%; background: #E5E7EB; }

        .stats-section {
          background: var(--secondary);
          color: #fff;
        }
        .stats-grid-home {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .stat-item { padding: 1rem; border-left: 1px solid rgba(255,255,255,0.2); }
        .stat-item:first-child { border-left: none; }
        .stat-item h2 {
          font-size: 3rem;
          font-family: var(--font-heading);
          color: var(--accent);
        }
        .stat-item p { font-size: 1rem; opacity: 0.8; margin-top: 0.5rem; }
        .newsletter-section { background: var(--secondary); }
        .newsletter-box {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: 3rem;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: var(--shadow-lg);
        }
        .newsletter-box h2 { font-family: var(--font-heading); margin-bottom: 1.5rem; }
        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          max-width: 450px;
          margin: 0 auto;
        }
        .newsletter-form input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #D1D5DB;
          border-radius: 9999px;
          font-family: var(--font-body);
        }
        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #E5E7EB;
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2rem; }
          .split-section { grid-template-columns: 1fr; gap: 2rem; }
          .stats-grid-home { grid-template-columns: repeat(2, 1fr); }
          .spaces-grid { grid-template-columns: 1fr; }
          .gallery-preview { grid-template-columns: repeat(2, 1fr); }
          .newsletter-box { padding: 2rem; }
          .newsletter-form { flex-direction: column; }
        }
      `}</style>
    </>
  );
}

function Counter({ value, suffix }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <h2 ref={ref}>{display}{suffix}</h2>;
}
