import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import api from '../../services/api';

const languages = ['fr', 'ar', 'en'];

export default function EventForm({ event, onSave, onCancel }) {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState('fr');
  const [saving, setSaving] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [form, setForm] = useState({
    title: event?.title || { fr: '', ar: '', en: '' },
    description: event?.description || { fr: '', ar: '', en: '' },
    category: event?.category || 'conference',
    start_date: event?.start_date || '',
    end_date: event?.end_date || '',
    status: event?.status || 'draft',
    is_featured: event?.is_featured || false,
    space_id: event?.space_id || '',
  });

  useEffect(() => {
    api.get('/spaces').then(res => setSpaces(res.data.data || [])).catch(() => {});
  }, []);

  const updateLangField = (field, value) => {
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
          <h2>{event ? t('admin.edit') : t('admin.create')} — {t('admin.events')}</h2>
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
          <input value={form.title[activeLang]} onChange={(e) => updateLangField('title', e.target.value)} required placeholder={t('form.title_in', { lang: t(`form.lang_${activeLang}`) })} />
        </div>

        <div className="form-group">
          <label>{t('contact.message')}</label>
          <textarea rows={4} value={form.description[activeLang]} onChange={(e) => updateLangField('description', e.target.value)} placeholder={t('form.description_in', { lang: t(`form.lang_${activeLang}`) })} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('events.category')}</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {['conference', 'exhibition', 'workshop', 'concert', 'festival', 'literary', 'ceremony'].map((c) => (
                <option key={c} value={c}>{t(`events.category_${c}`)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>{t('form.space')}</label>
            <select value={form.space_id} onChange={(e) => setForm({ ...form, space_id: e.target.value })}>
              <option value="">{t('form.select_space')}</option>
              {spaces.map((s) => (
                <option key={s.id} value={s.id}>{s.name?.fr || s.name?.en || s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('form.status')}</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">{t('admin.status_draft')}</option>
              <option value="published">{t('admin.status_published')}</option>
              <option value="cancelled">{t('admin.status_cancelled')}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('form.featured')}</label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              <span>{t('form.event_featured')}</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('form.start_date')} *</label>
            <input type="datetime-local" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>{t('form.end_date')}</label>
            <input type="datetime-local" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
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
