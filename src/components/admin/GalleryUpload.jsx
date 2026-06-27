import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUpload, FiX } from 'react-icons/fi';
import Button from '../common/Button';

export default function GalleryUpload({ onUpload, onCancel }) {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const removeFile = (i) => {
    setFiles(files.filter((_, idx) => idx !== i));
    setPreviews(previews.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((f) => formData.append('images[]', f));
    onUpload(formData);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '1.5rem' }}>{t('admin.gallery')}</h2>

      <div className="upload-zone">
        <FiUpload size={32} />
        <p>Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
        />
      </div>

      {previews.length > 0 && (
        <div className="upload-previews">
          {previews.map((src, i) => (
            <div key={i} className="upload-preview-item">
              <img src={src} alt="" />
              <button type="button" className="remove-btn" onClick={() => removeFile(i)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Button variant="primary" disabled={files.length === 0}>{t('admin.save')}</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel} type="button">{t('admin.cancel')}</Button>}
      </div>

      <style>{`
        .upload-zone {
          position: relative;
          border: 2px dashed #D1D5DB;
          border-radius: var(--radius-md);
          padding: 3rem;
          text-align: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .upload-zone:hover { border-color: var(--primary); }
        .upload-zone p { margin-top: 1rem; }
        .upload-previews {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .upload-preview-item {
          position: relative;
          border-radius: var(--radius-sm);
          overflow: hidden;
          aspect-ratio: 1;
        }
        .upload-preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.6);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </form>
  );
}
