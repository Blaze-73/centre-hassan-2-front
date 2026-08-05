import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaUsers } from 'react-icons/fa';
import { handleImageError } from '../../utils/imageFallback';

export default function SpaceCard({ space, index = 0 }) {
  const { i18n, t } = useTranslation();
  const name = typeof space.name === 'object' ? (space.name[i18n.language] || space.name.fr) : space.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card space-card"
    >
      <div className="space-card-image">
        {space.images?.[0] ? (
          <img src={space.images[0]} alt={name} loading="lazy" onError={handleImageError} />
        ) : (
          <div className="space-card-placeholder" />
        )}
      </div>
      <div className="space-card-body">
        <h3>{name}</h3>
        <div className="space-card-capacity">
          <FaUsers /> {space.capacity} {t('spaces.capacity')}
        </div>
        {space.amenities && (
          <div className="space-card-amenities">
            {space.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="amenity-tag">{amenity}</span>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .space-card-image {
          height: 200px;
          overflow: hidden;
          background: #E5E7EB;
        }
        .space-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .space-card:hover .space-card-image img { transform: scale(1.05); }
        .space-card-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          opacity: 0.3;
        }
        .space-card-body { padding: 1.25rem; }
        .space-card-body h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .space-card-capacity {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }
        .space-card-amenities { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .amenity-tag {
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: rgba(200,149,108,0.1);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>
    </motion.div>
  );
}
