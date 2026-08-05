import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/events', label: t('nav.events') },
    { to: '/spaces', label: t('nav.spaces') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/news', label: t('nav.news') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/practical-info', label: t('nav.practical') },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          Centre Hassan II
        </Link>

        <div className="navbar-right">
          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mobile-lang">
              <LanguageSwitcher />
            </li>
          </ul>

          <div className="navbar-actions">
            <LanguageSwitcher />
            <Link to="/admin" className="btn btn-accent" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              {t('nav.admin')}
            </Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('nav.close_menu') : t('nav.open_menu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul>
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="mobile-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="mobile-nav-link admin-link">
                  {t('nav.admin')}
                </Link>
              </li>
            </ul>
            <div className="mobile-menu-lang">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          transition: all 0.3s ease;
          background: rgba(15,25,35,0.7);
          backdrop-filter: blur(6px);
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 10px rgba(0,0,0,0.1);
          padding: 0.5rem 0;
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-logo {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
        }
        .navbar.scrolled .navbar-logo { color: var(--primary-dark); }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .navbar-links {
          display: flex;
          list-style: none;
          gap: 0.25rem;
        }
        .nav-link {
          padding: 0.5rem 0.85rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          border-radius: var(--radius-sm);
          transition: all 0.2s;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #fff;
          background: rgba(255,255,255,0.15);
        }
        .navbar.scrolled .nav-link {
          color: var(--text-secondary);
        }
        .navbar.scrolled .nav-link:hover,
        .navbar.scrolled .nav-link.active {
          color: var(--primary);
          background: rgba(200,149,108,0.1);
        }
        .navbar-actions { display: flex; align-items: center; gap: 0.75rem; }
        .language-switcher { display: flex; gap: 2px; }
        .lang-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.4);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
          color: rgba(255,255,255,0.85);
        }
        .lang-btn:first-child { border-radius: 4px 0 0 4px; }
        .lang-btn:last-child { border-radius: 0 4px 4px 0; }
        .lang-btn.active {
          background: rgba(255,255,255,0.2);
          color: #fff;
          border-color: rgba(255,255,255,0.6);
        }
        .navbar.scrolled .lang-btn {
          border-color: #D1D5DB;
          color: var(--text-secondary);
        }
        .navbar.scrolled .lang-btn.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }
        .menu-toggle {
          display: none; background: none; border: none; cursor: pointer; color: #fff;
        }
        .navbar.scrolled .menu-toggle {
          color: var(--text-primary);
        }
        .mobile-lang { display: none; }

        .mobile-menu {
          background: var(--surface);
          border-top: 1px solid #E5E7EB;
          overflow: hidden;
        }
        .mobile-menu ul { list-style: none; padding: 0.5rem 0; }
        .mobile-nav-link {
          display: block;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .mobile-nav-link:hover { background: rgba(200,149,108,0.1); color: var(--primary); }
        .mobile-menu-lang {
          padding: 0.75rem 1.5rem;
          border-top: 1px solid #E5E7EB;
          margin-top: 0.5rem;
        }
        .mobile-menu .lang-btn {
          color: var(--text-secondary);
          border-color: #D1D5DB;
        }
        .mobile-menu .lang-btn.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }
        .admin-link { color: var(--accent); font-weight: 600; }

        @media (max-width: 900px) {
          .navbar-links { display: none; }
          .navbar-actions { display: none; }
          .menu-toggle { display: block; }
          .mobile-lang { display: block; }
        }
      `}</style>
    </nav>
  );
}
