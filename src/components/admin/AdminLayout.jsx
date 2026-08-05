import { useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiBell, FiChevronLeft } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import ConfirmModal from './ConfirmModal';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed(!collapsed)}
        onMobileClose={() => setMobileOpen(false)}
        onLogout={() => setShowLogoutModal(true)}
      />
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="topbar-toggle" onClick={() => setMobileOpen(true)} aria-label={t('nav.open_menu')}>
              <FiMenu size={20} />
            </button>
            <button className="topbar-collapse" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Déplier le panneau' : 'Replier le panneau'}>
              <FiChevronLeft size={18} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
          </div>
          <div className="topbar-right">
            <button className="topbar-icon-btn" aria-label="Notifications">
              <FiBell size={18} />
            </button>
            <div className="topbar-user">
              <div className="topbar-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">{user?.name || 'Admin'}</span>
                <span className="topbar-user-role">{user?.role || 'admin'}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <ConfirmModal
        open={showLogoutModal}
        title="Déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmLabel="Se déconnecter"
        cancelLabel="Annuler"
        variant="warning"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
