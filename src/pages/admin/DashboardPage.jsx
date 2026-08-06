import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { FiCalendar, FiTrendingUp, FiMail, FiImage, FiArrowRight } from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatsCard from '../../components/admin/StatsCard';
import AnimatedSection from '../../components/common/AnimatedSection';
import api from '../../services/api';

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        const d = res.data;
        setStats([
          { icon: <FiCalendar />, value: d.total_events, label: t('admin.total_events'), color: '#C8956C' },
          { icon: <FiTrendingUp />, value: d.upcoming_events, label: t('admin.upcoming_events'), color: '#10B981' },
          { icon: <FiMail />, value: d.unread_contacts, label: t('admin.unread_contacts'), color: '#EF4444' },
          { icon: <FiImage />, value: d.gallery_items, label: t('admin.gallery_items'), color: '#1B3A4B' },
        ]);
        setRecentEvents(d.recent_events || []);
        setRecentContacts(d.recent_contacts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [t]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner" /></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>{t('admin.dashboard')}</h1>
          <p className="page-subtitle">Bienvenue sur le tableau de bord d'administration</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats?.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="dashboard-grid">
        <AnimatedSection className="card">
          <div className="card-header">
            <h3>Événements récents</h3>
            <button className="card-link" onClick={() => navigate('/admin/events')}>
              Voir tout <FiArrowRight size={14} />
            </button>
          </div>
          <div className="card-body">
            {recentEvents.length === 0 ? (
              <p className="empty-text">Aucun événement récent</p>
            ) : (
              <div className="mini-table">
                {recentEvents.map((ev) => (
                  <div key={ev.id} className="mini-row">
                    <div className="mini-info">
                      <span className="mini-title">{ev.title?.fr || ev.title?.en || 'Sans titre'}</span>
                      <span className="mini-date">{ev.start_date ? format(new Date(ev.start_date), 'dd MMM yyyy', { locale: fr }) : '-'}</span>
                    </div>
                    <span className={`badge badge-${ev.status}`}>{t(`admin.status_${ev.status}`, { defaultValue: ev.status })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="card">
          <div className="card-header">
            <h3>Messages récents</h3>
            <button className="card-link" onClick={() => navigate('/admin/contacts')}>
              Voir tout <FiArrowRight size={14} />
            </button>
          </div>
          <div className="card-body">
            {recentContacts.length === 0 ? (
              <p className="empty-text">Aucun message récent</p>
            ) : (
              <div className="mini-table">
                {recentContacts.map((c) => (
                  <div key={c.id} className="mini-row">
                    <div className="mini-info">
                      <span className="mini-title">{c.name}</span>
                      <span className="mini-date">{c.subject}</span>
                    </div>
                    <span className={`badge ${c.is_read ? 'badge-published' : 'badge-draft'}`}>
                      {c.is_read ? t('common.read') : t('common.unread')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      <div className="quick-actions">
        <button className="quick-action-btn primary" onClick={() => navigate('/admin/events')}>
          <FiCalendar size={20} />
          <span>Créer un événement</span>
        </button>
        <button className="quick-action-btn secondary" onClick={() => navigate('/admin/news')}>
          <FiTrendingUp size={20} />
          <span>Publier une actualité</span>
        </button>
      </div>

      <style>{`
        .dashboard-page { max-width: 1200px; }
        .page-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 2rem;
        }
        .page-header h1 { margin: 0; font-size: 1.5rem; }
        .page-subtitle { color: #6B7280; margin: 0.25rem 0 0; font-size: 0.9rem; }
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .card {
          background: var(--surface); border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          border: 1px solid #F3F4F6; overflow: hidden;
        }
        .card-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem; border-bottom: 1px solid #F3F4F6;
        }
        .card-header h3 { margin: 0; font-size: 0.95rem; font-family: var(--font-body); }
        .card-link {
          display: flex; align-items: center; gap: 0.3rem;
          background: none; border: none; color: var(--primary); font-size: 0.8rem;
          font-weight: 600; cursor: pointer; font-family: inherit;
          transition: gap 0.2s;
        }
        .card-link:hover { gap: 0.5rem; }
        .card-body { padding: 0.5rem 0; }
        .empty-text { text-align: center; color: #9CA3AF; padding: 2rem; font-size: 0.9rem; }
        .mini-table { }
        .mini-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.75rem 1.5rem; border-bottom: 1px solid #F9FAFB;
          transition: background 0.2s;
        }
        .mini-row:hover { background: #FAFAFB; }
        .mini-row:last-child { border-bottom: none; }
        .mini-info { display: flex; flex-direction: column; gap: 0.15rem; }
        .mini-title { font-size: 0.85rem; font-weight: 500; color: #1A1A2E; }
        .mini-date { font-size: 0.75rem; color: #6B7280; }
        .badge {
          font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem;
          border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .badge-published, .badge-draft { font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; }
        .badge-published { background: #D1FAE5; color: #065F46; }
        .badge-draft { background: #FEF3C7; color: #92400E; }
        .badge-conference { background: #DBEAFE; color: #1E40AF; }
        .badge-workshop { background: #EDE9FE; color: #5B21B6; }
        .badge-exhibition { background: #FCE7F3; color: #9D174D; }
        .quick-actions {
          display: flex; gap: 1rem;
        }
        .quick-action-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.75rem;
          padding: 1.25rem; border: none; border-radius: 12px; font-size: 1rem;
          font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .quick-action-btn.primary { background: var(--primary); color: #fff; }
        .quick-action-btn.primary:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(200,149,108,0.3); }
        .quick-action-btn.secondary { background: var(--secondary); color: #fff; }
        .quick-action-btn.secondary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(27,58,75,0.3); }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .quick-actions { flex-direction: column; }
          .mini-row { padding: 0.75rem 1rem; }
          .card-header { padding: 1rem 1.25rem; }
        }
      `}</style>
    </div>
  );
}
