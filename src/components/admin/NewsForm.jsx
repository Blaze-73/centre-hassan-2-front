import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const languages = ['fr', 'ar', 'en'];

export default function NewsForm({ article, onSave, onCancel }) {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState('fr');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: article?.title || { fr: '', ar: '', en: '' },
    content: article?.content || { fr: '', ar: '', en: '' },
    status: article?.status || 'draft',
    is_featured: article?.is_featured || false,
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: { ...form[field], [activeLang]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{article ? t('admin.edit') : t('admin.create')} — {t('admin.news')}</h2>
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
          <input value={form.title[activeLang]} onChange={(e) => updateField('title', e.target.value)} required placeholder={`Titre en ${activeLang}`} />
        </div>

        <div className="form-group">
          <label>Contenu *</label>
          <textarea rows={10} value={form.content[activeLang]} onChange={(e) => updateField('content', e.target.value)} required placeholder={`Contenu en ${activeLang}`} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Statut</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">{t('admin.status_draft')}</option>
              <option value="published">{t('admin.status_published')}</option>
            </select>
          </div>
          <div className="form-group">
            <label>À la une</label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              <span>Article à la une</span>
            </label>
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
