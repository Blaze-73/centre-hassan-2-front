import { useTranslation } from 'react-i18next';

export default function PageHero({ titleKey }) {
  const { t } = useTranslation();

  return (
    <section className="page-hero">
      <div className="page-hero-bg" />
      <div className="container">
        <h1>{t(titleKey)}</h1>
      </div>
      <style>{`
        .page-hero {
          position: relative;
          padding: 10rem 0 5rem;
          background: var(--secondary);
          color: #fff;
          text-align: center;
          overflow: hidden;
        }
        .page-hero-bg {
          position: absolute;
          inset: 0;
          background: url('/images/h2.jpg') center center / cover no-repeat;
          opacity: 0.15;
        }
        .page-hero h1 { position: relative; z-index: 1; font-size: 3rem; }
        @media (max-width: 768px) {
          .page-hero { padding: 7rem 0 3rem; }
          .page-hero h1 { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
}
