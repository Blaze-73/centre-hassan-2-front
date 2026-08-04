import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaClock, FaCar, FaWheelchair, FaHotel, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../../components/common/AnimatedSection';

const faqs = [
  { q: 'Quels sont les horaires d\'ouverture ?', a: 'Lun-Ven: 9h00-18h00, Sam: 10h00-16h00, Dim: Fermé' },
  { q: 'Comment puis-je réserver un espace ?', a: 'Contactez-nous via le formulaire de contact ou par téléphone.' },
  { q: 'L\'entrée est-elle payante ?', a: 'L\'entrée aux expositions permanentes est gratuite.' },
  { q: 'Y a-t-il un parking ?', a: 'Oui, un parking gratuit est disponible sur place.' },
];

export default function PracticalInfoPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <h1>{t('practical.title')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="practical-grid">
            <AnimatedSection className="practical-card">
              <FaClock className="practical-icon" />
              <h3>{t('practical.hours')}</h3>
              <p>{t('practical.hours_week')}</p>
              <p>{t('practical.hours_sat')}</p>
              <p>{t('practical.hours_sun')}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="practical-card">
              <FaCar className="practical-icon" />
              <h3>{t('practical.getting_there')}</h3>
              <p>{t('practical.from_tangier')}</p>
              <p>{t('practical.from_rabat')}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="practical-card">
              <FaWheelchair className="practical-icon" />
              <h3>{t('practical.accessibility')}</h3>
              <p>{t('practical.accessibility_text')}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="practical-card">
              <FaHotel className="practical-icon" />
              <h3>{t('practical.accommodation')}</h3>
              <p>{t('practical.accommodation_text')}</p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="faq-section">
            <h2 className="section-title"><FaQuestionCircle /> {t('practical.faq')}</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <span className={`faq-arrow ${openFaq === i ? 'open' : ''}`}>▼</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </AnimatedSection>
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
        .practical-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .practical-card {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        .practical-icon {
          font-size: 2rem;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .practical-card h3 { font-size: 1.2rem; margin-bottom: 0.75rem; }
        .practical-card p { color: var(--text-secondary); margin-bottom: 0.25rem; }
        .faq-section { margin-top: 4rem; }
        .faq-list { max-width: 700px; margin: 0 auto; }
        .faq-item {
          border-bottom: 1px solid #E5E7EB;
        }
        .faq-question {
          width: 100%;
          padding: 1.25rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          color: var(--text-primary);
        }
        .faq-arrow { transition: transform 0.3s; font-size: 0.8rem; }
        .faq-arrow.open { transform: rotate(180deg); }
        .faq-answer { overflow: hidden; }
        .faq-answer p {
          padding: 0 0 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .practical-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
