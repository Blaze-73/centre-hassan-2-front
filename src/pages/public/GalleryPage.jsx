import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryGrid from '../../components/common/GalleryGrid';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';
import { SkeletonCards } from '../../components/common/Skeleton';
import api from '../../services/api';

const categories = ['all', 'conference', 'exhibition', 'workshop', 'cultural'];

export default function GalleryPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('gallery.title'), { description: t('gallery.meta_description') });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    api
      .get('/gallery', { params: activeCategory === 'all' ? {} : { category: activeCategory } })
      .then((res) => {
        if (!ignore) setImages(res.data?.data ?? res.data);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [activeCategory, reloadKey]);

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
                aria-pressed={activeCategory === cat}
              >
                {cat === 'all' ? t('gallery.all') : cat}
              </button>
            ))}
          </div>

          {loading ? (
            <SkeletonCards count={6} height={200} />
          ) : error ? (
            <div className="empty-state" role="alert">
              <h3>{t('gallery.load_error')}</h3>
              <button className="btn btn-primary" onClick={() => setReloadKey((k) => k + 1)}>{t('common.retry')}</button>
            </div>
          ) : (
            <GalleryGrid images={images} />
          )}
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
