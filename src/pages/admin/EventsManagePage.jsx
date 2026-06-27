import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DataTable from '../../components/admin/DataTable';
import EventForm from '../../components/admin/EventForm';
import ConfirmModal from '../../components/admin/ConfirmModal';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function EventsManagePage() {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/admin/events');
      setEvents(res.data.data || []);
    } catch (err) {
      toast.error('Erreur lors du chargement des événements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const columns = [
    { header: 'ID', accessor: 'id' },
    {
      header: t('events.title'),
      render: (row) => row.title?.[i18n.language] || row.title?.fr || '',
    },
    {
      header: t('events.category'),
      render: (row) => <span className="badge badge-{row.category}">{row.category}</span>,
    },
    {
      header: t('events.date'),
      render: (row) => row.start_date ? format(new Date(row.start_date), 'dd MMM yyyy', { locale: fr }) : '-',
    },
    {
      header: t('admin.status_draft'),
      render: (row) => (
        <span style={{ color: row.status === 'published' ? 'var(--success)' : row.status === 'cancelled' ? 'var(--error)' : 'var(--accent)', fontWeight: 600 }}>
          {row.status}
        </span>
      ),
    },
  ];

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/admin/events/${editing.id}`, data);
        toast.success('Événement modifié');
      } else {
        await api.post('/admin/events', data);
        toast.success('Événement créé');
      }
      setShowForm(false);
      setEditing(null);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/events/${deleteTarget.id}`);
      toast.success('Événement supprimé');
      setDeleteTarget(null);
      fetchEvents();
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <EventForm
        event={editing}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <h1 className="page-title">{t('admin.events')}</h1>
      <DataTable
        columns={columns}
        data={events}
        loading={loading}
        onCreate={() => { setEditing(null); setShowForm(true); }}
        onEdit={handleEdit}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer l'événement"
        message="Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
