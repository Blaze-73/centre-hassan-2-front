import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  FiGrid, FiCalendar, FiFileText, FiImage, FiMapPin, FiUsers, FiMail, FiLogOut, FiX, FiExternalLink
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { to: '/admin', label: 'dashboard', icon: FiGrid, exact: true },
  { to: '/admin/events', label: 'events', icon: FiCalendar },
  { to: '/admin/news', label: 'news', icon: FiFileText },
  { to: '/admin/gallery', label: 'gallery', icon: FiImage },
  { to: '/admin/spaces', label: 'spaces', icon: FiMapPin },
  { to: '/admin/users', label: 'users', icon: FiUsers },
  { to: '/admin/contacts', label: 'contacts', icon: FiMail },
];

export default function Sidebar({ collapsed, mobileOpen, onMobileClose, onLogout }) {
  const { t } = useTranslation();

  const sidebarContent = (
    <>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {collapsed ? (
            <span className="logo-icon">CH</span>
          ) : (
            <>
              <span className="logo-icon">CH</span>
              <span className="logo-text">Centre Hassan II</span>
            </>
          )}
        </div>
        <button className="sidebar-close-btn" onClick={onMobileClose}>
          <FiX size={20} />
        </button>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onMobileClose}
          >
            <link.icon size={20} />
            <span>{t(`admin.${link.label}`)}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a href="/" className="sidebar-link" style={{ textDecoration: 'none', display: 'flex' }}>
          <FiExternalLink size={20} />
          <span>{t('admin.back_to_site')}</span>
        </a>
        <button className="sidebar-link logout-btn" onClick={onLogout}>
          <FiLogOut size={20} />
          <span>{t('admin.logout')}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`sidebar-desktop ${collapsed ? 'collapsed' : ''}`}>
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sidebar-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          >
            <motion.aside
              className="sidebar-mobile"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
