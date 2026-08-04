import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaTh, FaList, FaCalendarDay } from 'react-icons/fa';
import EventCard from '../../components/common/EventCard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';

const categories = ['all', 'conference', 'exhibition', 'workshop', 'concert', 'festival', 'literary', 'ceremony'];

const mockEvents = [
  { id: 1, slug: 'example', title: { fr: 'Conférence Internationale', en: 'International Conference', ar: 'مؤتمر دولي' }, description: { fr: 'Une conférence internationale sur le dialogue des cultures.' }, category: 'conference', start_date: '2026-09-15', featured_image: '' },
  { id: 2, slug: 'expo', title: { fr: 'Exposition d\'Art Contemporain', en: 'Contemporary Art Exhibition', ar: 'معرض الفن المعاصر' }, description: { fr: 'Découvrez les œuvres des artistes contemporains.' }, category: 'exhibition', start_date: '2026-10-01', featured_image: '' },
  { id: 3, slug: 'workshop', title: { fr: 'Atelier de Calligraphie', en: 'Calligraphy Workshop', ar: 'ورشة الخط العربي' }, description: { fr: 'Apprenez l\'art de la calligraphie arabe.' }, category: 'workshop', start_date: '2026-11-10', featured_image: '' },
];

export default function EventsPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('events.title'));
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');

  const filtered = mockEvents.filter((e) => {
    const matchCategory = activeCategory === 'all' || e.category === activeCategory;
    const matchSearch = !search || Object.values(e.title).some((v) => v.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <>
      <PageHero titleKey="events.title" />

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'all' ? t('events.all') : cat}
                </button>
              ))}
            </div>
            <div className="filter-actions">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder={t('events.search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="view-toggles">
                <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}><FaTh /></button>
                <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}><FaList /></button>
                <button className={`view-btn ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')}><FaCalendarDay /></button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <FaCalendarAlt size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3>{t('events.no_events')}</h3>
            </div>
          ) : (
            <motion.div layout className={`events-${view}`}>
              {filtered.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <style>{`
        .filter-bar {
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .filter-categories { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .filter-pill {
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          border: 1px solid #D1D5DB;
          background: transparent;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .filter-pill.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }
        .filter-actions { display: flex; align-items: center; gap: 1rem; }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid #D1D5DB;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
        }
        .search-box input {
          border: none;
          background: none;
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
          width: 180px;
        }
        .view-toggles { display: flex; gap: 2px; }
        .view-btn {
          padding: 0.4rem 0.6rem;
          border: 1px solid #D1D5DB;
          background: transparent;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .view-btn:first-child { border-radius: 4px 0 0 4px; }
        .view-btn:last-child { border-radius: 0 4px 4px 0; }
        .view-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }
        .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .events-list { display: flex; flex-direction: column; gap: 1rem; }
        @media (max-width: 768px) {
          .filter-bar { flex-direction: column; align-items: stretch; }
          .filter-actions { flex-wrap: wrap; }
          .search-box input { width: 120px; }
        }
      `}</style>
    </>
  );
}
