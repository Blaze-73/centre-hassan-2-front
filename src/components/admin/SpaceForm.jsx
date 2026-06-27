import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const languages = ['fr', 'ar', 'en'];

export default function SpaceForm({ space, onSave, onCancel }) {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState('fr');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: space?.name || { fr: '', ar: '', en: '' },
    description: space?.description || { fr: '', ar: '', en: '' },
    capacity: space?.capacity || '',
    amenities: space?.amenities?.join(', ') || '',
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: { ...form[field], [activeLang]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...form,
      amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{space ? t('admin.edit') : t('admin.create')} — {t('admin.spaces')}</h2>
        </div>

        <div className="lang-tabs">
          {languages.map((l) => (
            <button key={l} type="button" className={`lang-tab ${activeLang === l ? 'active' : ''}`} onClick={() => setActiveLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label>{t('events.title')} *</label>
          <input value={form.name[activeLang]} onChange={(e) => updateField('name', e.target.value)} required placeholder={`Nom en ${activeLang}`} />
        </div>

        <div className="form-group">
          <label>{t('contact.message')}</label>
          <textarea rows={4} value={form.description[activeLang]} onChange={(e) => updateField('description', e.target.value)} placeholder={`Description en ${activeLang}`} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('spaces.capacity')} *</label>
            <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required min={1} placeholder="Ex: 500" />
          </div>
          <div className="form-group">
            <label>{t('spaces.amenities')}</label>
            <input value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="Projecteur, Sonorisation, Wi-Fi" />
          </div>
        </div>

        <div className="form-actions">
          <Button variant="primary" disabled={saving}>{saving ? '...' : t('admin.save')}</Button>
          <Button variant="secondary" onClick={onCancel} type="button">{t('admin.cancel')}</Button>
        </div>
      </form>
    </motion.div>
  );
}
