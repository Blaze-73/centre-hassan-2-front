import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Connexion réussie');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-overlay" />

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <div className="login-brand-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.15)" />
              <path d="M20 8L28 18H12L20 8Z" fill="#C8956C" />
              <rect x="14" y="18" width="12" height="14" rx="2" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
          <h1>Centre Hassan II</h1>
          <p>{t('admin.login')}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('admin.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@centre-hassan2.ma"
            />
          </div>
          <div className="form-group">
            <label>{t('admin.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button className="btn btn-primary login-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading" />
            ) : (
              t('admin.login_btn')
            )}
          </button>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <FiArrowLeft size={14} /> Retour au site public
            </Link>
          </div>
        </form>
      </motion.div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .login-bg {
          position: absolute;
          inset: 0;
          background: url('/images/h2.jpg') center center / cover no-repeat fixed;
          z-index: 0;
        }
        .login-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,25,35,0.8) 0%, rgba(27,58,75,0.7) 100%);
          z-index: 1;
        }
        .login-card {
          position: relative;
          z-index: 2;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border-radius: var(--radius-lg);
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
        }
        .login-brand-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-header h1 {
          font-family: var(--font-heading);
          color: var(--secondary);
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }
        .login-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .login-card .form-group {
          margin-bottom: 1.25rem;
        }
        .login-card .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        .login-card .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #D1D5DB;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: rgba(255,255,255,0.8);
        }
        .login-card .form-group input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(200,149,108,0.15);
        }
        .login-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .btn-loading {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: block;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
