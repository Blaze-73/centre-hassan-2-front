import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryGrid from '../../components/common/GalleryGrid';
import AnimatedSection from '../../components/common/AnimatedSection';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';

const categories = ['all', 'conference', 'exhibition', 'workshop', 'cultural'];

const mockImages = [
  { image_path: '', caption: { fr: 'Conférence 2025' }, category: 'conference' },
  { image_path: '', caption: { fr: 'Exposition d\'Art' }, category: 'exhibition' },
];

export default function GalleryPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('gallery.title'));
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? mockImages
    : mockImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHero titleKey="gallery.title" />

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
