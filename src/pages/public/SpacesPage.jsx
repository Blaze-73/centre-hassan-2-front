import { useTranslation } from 'react-i18next';
import SpaceCard from '../../components/common/SpaceCard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';

const mockSpaces = [
  { id: 1, name: { fr: 'Grande Salle de Conférence', en: 'Main Conference Hall', ar: 'قاعة المؤتمرات الكبرى' }, capacity: 500, amenities: ['Projecteur', 'Sonorisation', 'Climatisation'], images: [] },
  { id: 2, name: { fr: 'Galerie d\'Exposition', en: 'Exhibition Gallery', ar: 'صالة العرض' }, capacity: 200, amenities: ['Éclairage', 'Cimaises', 'Sécurité'], images: [] },
  { id: 3, name: { fr: 'Salle d\'Atelier', en: 'Workshop Room', ar: 'قاعة الورشات' }, capacity: 50, amenities: ['Tables', 'Wi-Fi', 'Matériel'], images: [] },
];

export default function SpacesPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('spaces.title'));

  return (
    <>
      <PageHero titleKey="spaces.title" />

      <section className="section">
        <div className="container">
          {mockSpaces.length === 0 ? (
            <div className="empty-state">
              <h3>{t('spaces.no_spaces')}</h3>
            </div>
          ) : (
            <div className="spaces-page-grid">
              {mockSpaces.map((space, i) => (
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
