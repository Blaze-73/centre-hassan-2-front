import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCalendarAlt, FaTh, FaList, FaCalendarDay, FaSpinner } from 'react-icons/fa';
import EventCard from '../../components/common/EventCard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';
import { SkeletonCards } from '../../components/common/Skeleton';
import api from '../../services/api';

const categories = ['all', 'conference', 'exhibition', 'workshop', 'concert', 'festival', 'literary', 'ceremony'];

export default function EventsPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('events.title'), { description: t('events.meta_description') });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const debounceRef = useRef(null);

  const loadEvents = useCallback(async (pageNum, params, reset = true) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);
    setError(null);
    try {
      const res = await api.get('/events', {
        params: { page: pageNum, category: params.category, search: params.search },
      });
      const payload = res.data;
      const items = payload.data ?? payload;
      setEvents((prev) => (reset ? items : [...prev, ...items]));
      setPage(pageNum);
      setHasMore(Boolean(payload.meta && pageNum < payload.meta.last_page));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const currentParams = { category: activeCategory === 'all' ? undefined : activeCategory, search: search.trim() || undefined };

  const reload = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => loadEvents(1, currentParams, true), 250);
  };

  useEffect(() => {
    reload();
    return () => debounceRef.current && clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, search]);

  const handleLoadMore = () => {
    loadEvents(page + 1, currentParams, false);
  };

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
                  aria-pressed={activeCategory === cat}
                >
                  {cat === 'all' ? t('events.all') : cat}
                </button>
              ))}
            </div>
            <div className="filter-actions">
              <div className="search-box">
                <FaSearch aria-hidden="true" />
                <input
                  type="text"
                  placeholder={t('events.search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label={t('events.search')}
                />
              </div>
              <div className="view-toggles" role="group" aria-label={t('events.view')}>
                <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} aria-label={t('events.grid_view')} aria-pressed={view === 'grid'}><FaTh /></button>
                <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} aria-label={t('events.list_view')} aria-pressed={view === 'list'}><FaList /></button>
                <button className={`view-btn ${view === 'calendar' ? 'active' : ''}`} onClick={() => setView('calendar')} aria-label={t('events.calendar_view')} aria-pressed={view === 'calendar'}><FaCalendarDay /></button>
              </div>
            </div>
          </div>

          {loading ? (
            <SkeletonCards count={6} />
          ) : error ? (
            <div className="empty-state" role="alert">
              <FaCalendarAlt size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3>{t('events.load_error')}</h3>
              <button className="btn btn-primary" onClick={() => reload()}>{t('common.retry')}</button>
            </div>
          ) : events.length === 0 ? (
            <div className="empty-state">
              <FaCalendarAlt size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3>{t('events.no_events')}</h3>
            </div>
          ) : (
            <>
              <div className={`events-${view}`}>
                {events.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
              {hasMore && (
                <div className="load-more-wrap">
                  <button className="btn btn-outline" onClick={handleLoadMore} disabled={loadingMore}>
                    {loadingMore ? <FaSpinner className="spin" /> : null}
                    {loadingMore ? t('common.loading') : t('events.load_more')}
                  </button>
                </div>
              )}
            </>
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
        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
        }
        .spin { animation: spin 0.8s linear infinite; margin-right: 0.5rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .filter-bar { flex-direction: column; align-items: stretch; }
          .filter-actions { flex-wrap: wrap; }
          .search-box input { width: 120px; }
        }
      `}</style>
    </>
  );
}
