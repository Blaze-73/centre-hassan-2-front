import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmModal({ open, title, message, confirmLabel, cancelLabel, variant = 'danger', onConfirm, onCancel }) {
  if (!open) return null;

  const colors = {
    danger: { bg: '#FEE2E2', text: '#991B1B', btn: '#EF4444', btnHover: '#DC2625', icon: '#EF4444' },
    warning: { bg: '#FEF3C7', text: '#92400E', btn: '#F59E0B', btnHover: '#D97706', icon: '#F59E0B' },
    info: { bg: '#DBEAFE', text: '#1E40AF', btn: '#3B82F6', btnHover: '#2563EB', icon: '#3B82F6' },
  };

  const c = colors[variant] || colors.danger;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: 420 }}
        >
          <button className="modal-close" onClick={onCancel}><FiX size={18} /></button>

          <div className="modal-icon-wrap" style={{ background: c.bg, color: c.icon }}>
            <FiAlertTriangle size={28} />
          </div>

          <h3 className="modal-title">{title}</h3>
          <p className="modal-message">{message}</p>

          <div className="modal-actions">
            <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
              {cancelLabel || 'Annuler'}
            </button>
            <button
              className="modal-btn modal-btn-confirm"
              onClick={onConfirm}
              style={{ background: c.btn, '--btn-hover': c.btnHover }}
            >
              {confirmLabel || 'Confirmer'}
            </button>
          </div>

          <style>{`
            .modal-overlay {
              position: fixed; inset: 0; z-index: 9999;
              background: rgba(0,0,0,0.5);
              backdrop-filter: blur(4px);
              display: flex; align-items: center; justify-content: center;
              padding: 1rem;
            }
            .modal-card {
              background: #fff; border-radius: 16px; padding: 2rem;
              width: 100%; position: relative;
              box-shadow: 0 20px 60px rgba(0,0,0,0.2);
              text-align: center;
            }
            .modal-close {
              position: absolute; top: 12px; right: 12px;
              background: #F3F4F6; border: none; border-radius: 50%;
              width: 32px; height: 32px; display: flex;
              align-items: center; justify-content: center;
              cursor: pointer; color: #6B7280; transition: all 0.2s;
            }
            .modal-close:hover { background: #E5E7EB; color: #111; }
            .modal-icon-wrap {
              width: 56px; height: 56px; border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              margin: 0 auto 1rem;
            }
            .modal-title {
              font-size: 1.2rem; font-weight: 700; color: #1A1A2E;
              margin: 0 0 0.5rem;
            }
            .modal-message {
              font-size: 0.9rem; color: #6B7280; margin: 0 0 1.5rem;
              line-height: 1.5;
            }
            .modal-actions {
              display: flex; gap: 0.75rem;
            }
            .modal-btn {
              flex: 1; padding: 0.75rem 1rem; border-radius: 10px;
              font-weight: 600; font-size: 0.9rem; cursor: pointer;
              transition: all 0.2s; border: none; font-family: inherit;
            }
            .modal-btn-cancel {
              background: #F3F4F6; color: #374151;
            }
            .modal-btn-cancel:hover { background: #E5E7EB; }
            .modal-btn-confirm {
              color: #fff;
            }
            .modal-btn-confirm:hover {
              background: var(--btn-hover, #DC2625) !important;
            }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
