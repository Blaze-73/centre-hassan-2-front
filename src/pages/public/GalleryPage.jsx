import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryGrid from '../../components/common/GalleryGrid';
import AnimatedSection from '../../components/common/AnimatedSection';

const categories = ['all', 'conference', 'exhibition', 'workshop', 'cultural'];

const mockImages = [
  { image_path: '', caption: { fr: 'Conférence 2025' }, category: 'conference' },
  { image_path: '', caption: { fr: 'Exposition d\'Art' }, category: 'exhibition' },
];

export default function GalleryPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? mockImages
    : mockImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <h1>{t('gallery.title')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? t('gallery.all') : cat}
              </button>
            ))}
          </div>
          <AnimatedSection>
            <GalleryGrid images={filtered} />
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
        .gallery-filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}
