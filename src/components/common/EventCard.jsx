import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { PLACEHOLDER_IMAGE, handleImageError } from '../../utils/imageFallback';

const locales = { fr, en: enUS, ar };

export default function EventCard({ event, index = 0 }) {
  const { i18n } = useTranslation();
  const locale = locales[i18n.language] || fr;

  const category = event.category || 'conference';
  const title = typeof event.title === 'object' ? (event.title[i18n.language] || event.title.fr) : event.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/events/${event.slug || event.id}`} className="card event-card">
        <div className="event-card-image">
          <img
            src={event.featured_image || PLACEHOLDER_IMAGE}
            alt={title}
            loading="lazy"
            onError={handleImageError}
          />
          <span className={`badge badge-${category}`}>{category}</span>
        </div>
        <div className="event-card-body">
          <div className="event-card-date">
            {event.start_date && format(new Date(event.start_date), 'MMM d, yyyy', { locale })}
          </div>
          <h3>{title}</h3>
          {event.description && (
            <p className="event-card-desc">
              {typeof event.description === 'object'
                ? (event.description[i18n.language] || event.description.fr)?.substring(0, 120)
                : event.description?.substring(0, 120)}
            </p>
          )}
        </div>
      </Link>
      <style>{`
        .event-card { display: block; }
        .event-card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .event-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .event-card:hover .event-card-image img { transform: scale(1.05); }
        .event-card-image .badge {
          position: absolute;
          top: 12px;
          left: 12px;
        }
        .event-card-body { padding: 1.25rem; }
        .event-card-date {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .event-card-body h3 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }
        .event-card-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }
      `}</style>
    </motion.div>
  );
}
