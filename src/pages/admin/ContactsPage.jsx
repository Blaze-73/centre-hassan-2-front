import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DataTable from '../../components/admin/DataTable';
import ConfirmModal from '../../components/admin/ConfirmModal';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ContactsPage() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/admin/contacts');
      setContacts(res.data.data || []);
    } catch {
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContacts();
  }, []);

  const columns = [
    { header: 'Nom', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Sujet', accessor: 'subject' },
    {
      header: 'Date',
      render: (row) => row.created_at ? format(new Date(row.created_at), 'dd MMM yyyy', { locale: fr }) : '-',
    },
    {
      header: 'Lu',
      render: (row) => (
        <span style={{ color: row.is_read ? 'var(--success)' : 'var(--accent)', fontWeight: 600 }}>
          {row.is_read ? t('common.yes') : t('common.no')}
        </span>
      ),
    },
  ];

  const handleRead = async (row) => {
    try {
      await api.put(`/admin/contacts/${row.id}/read`);
      toast.success('Marqué comme lu');
      fetchContacts();
    } catch {
      toast.error('Erreur');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/contacts/${deleteTarget.id}`);
      toast.success('Message supprimé');
      setDeleteTarget(null);
      fetchContacts();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <h1 className="page-title">{t('admin.contacts')}</h1>

      {selected && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h3>Message de {selected.name}</h3>
            <button className="card-link" onClick={() => setSelected(null)}>{t('common.close')}</button>
          </div>
          <div className="card-body" style={{ padding: '1.5rem' }}>
            <p><strong>Email :</strong> {selected.email}</p>
            <p><strong>Téléphone :</strong> {selected.phone || '-'}</p>
            <p><strong>Sujet :</strong> {selected.subject}</p>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#F9FAFB', borderRadius: 8 }}>
              {selected.message}
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={contacts}
        loading={loading}
        onEdit={handleRead}
        onDelete={(row) => setDeleteTarget(row)}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer le message"
        message="Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
