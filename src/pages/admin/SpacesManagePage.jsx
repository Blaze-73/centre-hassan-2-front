import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/admin/DataTable';
import SpaceForm from '../../components/admin/SpaceForm';
import ConfirmModal from '../../components/admin/ConfirmModal';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function SpacesManagePage() {
  const { t, i18n } = useTranslation();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchSpaces = async () => {
    try {
      const res = await api.get('/admin/spaces');
      setSpaces(res.data.data || []);
    } catch {
      toast.error('Erreur lors du chargement des espaces');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSpaces();
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: t('events.title'), render: (row) => row.name?.[i18n.language] || row.name?.fr || '' },
    { header: t('spaces.capacity'), accessor: 'capacity' },
    { header: t('spaces.amenities'), render: (row) => row.amenities?.join(', ') || '-' },
  ];

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/admin/spaces/${editing.id}`, data);
        toast.success('Espace modifié');
      } else {
        await api.post('/admin/spaces', data);
        toast.success('Espace créé');
      }
      setShowForm(false);
      setEditing(null);
      fetchSpaces();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/spaces/${deleteTarget.id}`);
      toast.success('Espace supprimé');
      setDeleteTarget(null);
      fetchSpaces();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (showForm) {
    return (
      <SpaceForm
        space={editing}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
      />
    );
  }

  return (
    <div>
      <h1 className="page-title">{t('admin.spaces')}</h1>
      <DataTable
        columns={columns}
        data={spaces}
        loading={loading}
        onCreate={() => { setEditing(null); setShowForm(true); }}
        onEdit={(row) => { setEditing(row); setShowForm(true); }}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer l'espace"
        message="Êtes-vous sûr de vouloir supprimer cet espace ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
