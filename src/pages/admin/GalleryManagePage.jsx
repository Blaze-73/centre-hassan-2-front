import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from '../../components/admin/DataTable';
import GalleryUpload from '../../components/admin/GalleryUpload';
import ConfirmModal from '../../components/admin/ConfirmModal';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function GalleryManagePage() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/admin/gallery');
      setImages(res.data.data || []);
    } catch (err) {
      toast.error('Erreur lors du chargement de la galerie');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  const renderCaption = (caption) => {
    if (!caption) return '-';
    if (typeof caption === 'string') return caption;
    if (typeof caption === 'object') return caption.fr || caption.en || caption.ar || JSON.stringify(caption);
    return '-';
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Image', render: (row) => row.image_path ? <img src={row.image_path} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} /> : '-' },
    { header: t('gallery.title'), render: (row) => renderCaption(row.caption) },
    { header: 'Catégorie', accessor: 'category' },
  ];

  const handleUpload = async (formData) => {
    try {
      await api.post('/admin/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Images uploadées avec succès');
      setShowUpload(false);
      fetchGallery();
    } catch (err) {
      toast.error('Erreur lors de l\'upload');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/gallery/${deleteTarget.id}`);
      toast.success('Image supprimée');
      setDeleteTarget(null);
      fetchGallery();
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (showUpload) {
    return (
      <GalleryUpload
        onUpload={handleUpload}
        onCancel={() => setShowUpload(false)}
      />
    );
  }

  return (
    <div>
      <h1 className="page-title">{t('admin.gallery')}</h1>
      <DataTable
        columns={columns}
        data={images}
        loading={loading}
        onCreate={() => setShowUpload(true)}
        onDelete={(row) => setDeleteTarget(row)}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Supprimer l'image"
        message="Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible."
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
