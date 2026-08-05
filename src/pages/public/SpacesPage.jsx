import { useTranslation } from 'react-i18next';
import SpaceCard from '../../components/common/SpaceCard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';
import { SkeletonCards } from '../../components/common/Skeleton';
import useFetch from '../../hooks/useFetch';

export default function SpacesPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('spaces.title'), { description: t('spaces.meta_description') });

  const { data: spaces, loading, error, run } = useFetch('/spaces');

  return (
    <>
      <PageHero titleKey="spaces.title" />

      <section className="section">
        <div className="container">
          {loading ? (
            <SkeletonCards count={6} />
          ) : error ? (
            <div className="empty-state" role="alert">
              <h3>{t('spaces.load_error')}</h3>
              <button className="btn btn-primary" onClick={() => run()}>{t('common.retry')}</button>
            </div>
          ) : !spaces || spaces.length === 0 ? (
            <div className="empty-state">
              <h3>{t('spaces.no_spaces')}</h3>
            </div>
          ) : (
            <div className="spaces-page-grid">
              {spaces.map((space, i) => (
                <SpaceCard key={space.id} space={space} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .spaces-page-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </>
  );
}
