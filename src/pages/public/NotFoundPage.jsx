import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function NotFoundPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('notFound.title'));

  return (
    <>
      <section className="notfound-section">
        <div className="notfound-bg" />
        <div className="container">
          <motion.div
            className="notfound-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="notfound-code">404</span>
            <h1>{t('notFound.title')}</h1>
            <p>{t('notFound.message')}</p>
            <div className="notfound-actions">
              <Button to="/" variant="primary">
                {t('notFound.home')} <FaArrowLeft />
              </Button>
              <Link to="/contact" className="notfound-contact">
                {t('notFound.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .notfound-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: var(--secondary);
          color: #fff;
          text-align: center;
          overflow: hidden;
          padding: 6rem 0;
        }
        .notfound-bg {
          position: absolute;
          inset: 0;
          background: url('/images/h2.jpg') center center / cover no-repeat;
          opacity: 0.12;
        }
        .notfound-card { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
        .notfound-code {
          font-family: var(--font-heading);
          font-size: 7rem;
          line-height: 1;
          color: var(--primary);
          display: block;
          margin-bottom: 1rem;
          text-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .notfound-card h1 { font-size: 2rem; margin-bottom: 1rem; }
        .notfound-card p {
          color: rgba(255,255,255,0.8);
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
        }
        .notfound-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .notfound-actions .btn { display: inline-flex; }
        .notfound-contact {
          color: rgba(255,255,255,0.85);
          font-size: 0.95rem;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .notfound-contact:hover { color: #fff; }
        @media (max-width: 768px) {
          .notfound-code { font-size: 5rem; }
        }
      `}</style>
    </>
  );
}
