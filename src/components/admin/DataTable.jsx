import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Button from '../common/Button';
import { motion } from 'framer-motion';

export default function DataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onCreate,
  searchPlaceholder = 'admin.search',
  loading = false,
}) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const safeRender = (val) => {
    if (val === null || val === undefined) return '-';
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (typeof val === 'object') return val.fr || val.en || val.ar || JSON.stringify(val);
    return String(val);
  };

  const filtered = data.filter((row) =>
    columns.some((col) => {
      const val = col.accessor ? row[col.accessor] : '';
      return String(val).toLowerCase().includes(search.toLowerCase());
    })
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="table-toolbar">
        {onCreate && (
          <Button variant="primary" onClick={onCreate}>
            <FiPlus /> {t('admin.create')}
          </Button>
        )}
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder={t(searchPlaceholder)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="data-table-desktop">
        <div className="data-table">
          <table>
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i}>{col.header}</th>
                ))}
                {(onEdit || onDelete) && <th style={{ width: '100px' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    {t('admin.search')}
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {columns.map((col, j) => (
                      <td key={j}>
                        {col.render ? col.render(row) : safeRender(row[col.accessor])}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td>
                        <div className="table-actions">
                          {onEdit && (
                            <button className="table-action-btn edit" onClick={() => onEdit(row)} title="Modifier">
                              <FiEdit2 />
                            </button>
                          )}
                          {onDelete && (
                            <button className="table-action-btn delete" onClick={() => onDelete(row)} title="Supprimer">
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="data-table-mobile">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            {t('admin.search')}
          </div>
        ) : (
          filtered.map((row, i) => (
            <motion.div
              key={row.id || i}
              className="mobile-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {columns.map((col, j) => (
                <div key={j} className="mobile-card-field">
                  <span className="mobile-card-label">{col.header}</span>
                  <span className="mobile-card-value">
                    {col.render ? col.render(row) : safeRender(row[col.accessor])}
                  </span>
                </div>
              ))}
              {(onEdit || onDelete) && (
                <div className="mobile-card-actions">
                  {onEdit && (
                    <button className="mobile-action-btn edit" onClick={() => onEdit(row)}>
                      <FiEdit2 /> Modifier
                    </button>
                  )}
                  {onDelete && (
                    <button className="mobile-action-btn delete" onClick={() => onDelete(row)}>
                      <FiTrash2 /> Supprimer
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      <style>{`
        .table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .table-toolbar .search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 0.5rem 1rem;
          min-width: 220px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .table-toolbar .search-box:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(200,149,108,0.1);
        }
        .table-toolbar .search-box input {
          border: none; background: none; font-family: var(--font-body);
          font-size: 0.9rem; outline: none; width: 100%;
        }
        .table-toolbar .search-box svg { color: #9CA3AF; flex-shrink: 0; }
        .data-table {
          background: var(--surface);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          border: 1px solid #F3F4F6;
        }
        .data-table table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td {
          padding: 0.875rem 1rem;
          text-align: left;
          border-bottom: 1px solid #F3F4F6;
        }
        .data-table th {
          background: #FAFAFB;
          font-weight: 600;
          color: #6B7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .data-table tr:last-child td { border-bottom: none; }
        .data-table tr:hover td { background: #FAFAFB; }
        .table-actions { display: flex; gap: 0.5rem; }
        .table-action-btn {
          padding: 0.4rem 0.6rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }
        .table-action-btn.edit { background: #EFF6FF; color: #2563EB; }
        .table-action-btn.edit:hover { background: #2563EB; color: #fff; }
        .table-action-btn.delete { background: #FEF2F2; color: #DC2625; }
        .table-action-btn.delete:hover { background: #DC2625; color: #fff; }

        /* Mobile card view */
        .data-table-mobile { display: none; }
        .mobile-card {
          background: var(--surface);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: 0.75rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          border: 1px solid #F3F4F6;
        }
        .mobile-card-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #F9FAFB;
        }
        .mobile-card-field:last-of-type { border-bottom: none; }
        .mobile-card-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .mobile-card-value {
          font-size: 0.9rem;
          color: #1A1A2E;
          text-align: right;
        }
        .mobile-card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid #F3F4F6;
        }
        .mobile-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.6rem;
          border-radius: 8px;
          border: none;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .mobile-action-btn.edit { background: #EFF6FF; color: #2563EB; }
        .mobile-action-btn.edit:hover { background: #2563EB; color: #fff; }
        .mobile-action-btn.delete { background: #FEF2F2; color: #DC2625; }
        .mobile-action-btn.delete:hover { background: #DC2625; color: #fff; }

        @media (max-width: 768px) {
          .data-table-desktop { display: none; }
          .data-table-mobile { display: block; }
          .table-toolbar .search-box { min-width: 100%; }
        }
      `}</style>
    </div>
  );
}
