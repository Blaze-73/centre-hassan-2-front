import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DataTable from '../../components/admin/DataTable';
import NewsForm from '../../components/admin/NewsForm';
import ConfirmModal from '../../components/admin/ConfirmModal';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function NewsManagePage() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchNews = async () => {
    try {
      const res = await api.get('/admin/news');
      setArticles(res.data.data || []);
    } catch {
      toast.error('Erreur lors du chargement des actualités');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews();
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id' },
    {
      header: t('events.title'),
      render: (row) => row.title?.[i18n.language] || row.title?.fr || '',
    },
    {
      header: 'Date',
      render: (row) => row.created_at ? format(new Date(row.created_at), 'dd MMM yyyy', { locale: fr }) : '-',
    },
    {
      header: t('admin.status_draft'),
      render: (row) => (
        <span style={{ color: row.status === 'published' ? 'var(--success)' : 'var(--accent)', fontWeight: 600 }}>
          {t(`admin.status_${row.status}`, { defaultValue: row.status })}
        </span>
      ),
    },
  ];

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/admin/news/${editing.id}`, data);
        toast.success('Article modifié');
      } else {
        await api.post('/admin/news', data);
        toast.success('Article créé');
      }
      setShowForm(false);
      setEditing(null);
      fetchNews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/news/${deleteTarget.id}`);
      toast.success('Article supprimé');
      setDeleteTarget(null);
      fetchNews();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (showForm) {
    return (
      <NewsForm
        article={editing}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <h1 className="page-title">{t('admin.news')}</h1>
      <DataTable
        columns={columns}
        data={articles}
        loading={loading}
        onCreate={() => { setEditing(null); setShowForm(true); }}
        onEdit={(row) => { setEditing(row); setShowForm(true); }}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer l'article"
        message="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
