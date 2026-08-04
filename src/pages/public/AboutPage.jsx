import { useTranslation } from 'react-i18next';
import AnimatedSection from '../../components/common/AnimatedSection';
import { FaAward, FaHandshake, FaHistory } from 'react-icons/fa';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const timeline = [
  { year: '1978', event: 'Foundation of the Asilah Moussem' },
  { year: '1988', event: 'Inauguration of Centre Hassan II' },
  { year: '2024', event: 'Present — Cultural hub of Morocco' },
];

const figures = [
  { name: 'Mohamed Benaïssa', role: 'Founder & Former Minister' },
  { name: 'Mohammed Melehi', role: 'Renowned Artist' },
  { name: 'King Mohammed VI', role: 'Royal Patron' },
];

export default function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('about.title'));

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <h1>{t('about.title')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AnimatedSection className="about-intro">
            <div className="about-intro-text">
              <h2>{t('about.mission')}</h2>
              <p>{t('about.mission_text')}</p>
              <p style={{ marginTop: '1rem' }}>{t('home.about_text')}</p>
            </div>
            <div className="about-intro-image">
              <div style={{ width: '100%', height: '350px', background: 'var(--primary)', opacity: 0.15, borderRadius: 'var(--radius-md)' }} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Timeline</h2>
          </AnimatedSection>
          <div className="timeline">
            {timeline.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.2} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <p>{item.event}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">{t('about.figures')}</h2>
          </AnimatedSection>
          <div className="figures-grid">
            {figures.map((figure, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="card figure-card">
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.2, margin: '0 auto 1rem' }} />
                <h3>{figure.name}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{figure.role}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">{t('about.awards')}</h2>
          </AnimatedSection>
          <div className="awards-list">
            {['Tchicaya U Tam\'si Prize', 'Al-Mu\'tamid Ibn Abbad Open University'].map((award, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="award-card">
                <FaAward style={{ color: 'var(--accent)', fontSize: '2rem' }} />
                <div>
                  <h4>{award}</h4>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .page-hero {
          position: relative;
          padding: 10rem 0 5rem;
          background: var(--secondary);
          color: #fff;
          text-align: center;
        }
        .page-hero h1 { font-size: 3rem; }
        .about-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .about-intro-text h2 { font-size: 2rem; margin-bottom: 1rem; }
        .about-intro-text p { color: var(--text-secondary); line-height: 1.8; }
        .timeline {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          padding-left: 2rem;
          border-left: 2px solid var(--primary);
        }
        .timeline-item { position: relative; padding: 1.5rem 0; }
        .timeline-dot {
          position: absolute;
          left: -2.6rem;
          top: 2rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--primary);
          border: 3px solid var(--bg);
        }
        .timeline-year { font-weight: 700; color: var(--primary); font-size: 1.1rem; }
        .timeline-content p { color: var(--text-secondary); margin-top: 0.25rem; }
        .figures-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .figure-card { padding: 2rem; }
        .awards-list { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .award-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 768px) {
          .about-intro { grid-template-columns: 1fr; }
          .figures-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
