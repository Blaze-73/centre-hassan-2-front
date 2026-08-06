import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/admin/DataTable';
import ConfirmModal from '../../components/admin/ConfirmModal';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function UsersManagePage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.data || []);
    } catch {
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nom', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Rôle',
      render: (row) => (
        <span className="badge" style={{ background: row.role === 'admin' ? '#FEE2E2' : '#DBEAFE', color: row.role === 'admin' ? '#991B1B' : '#1E40AF', padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600 }}>
          {t(`admin.role_${row.role}`, { defaultValue: row.role })}
        </span>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/users/${deleteTarget.id}`);
      toast.success('Utilisateur supprimé');
      setDeleteTarget(null);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <h1 className="page-title">{t('admin.users')}</h1>
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
