import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { HiHome, HiCalendar, HiPhotograph, HiMail } from 'react-icons/hi';

const bottomItems = [
  { to: '/', key: 'nav.home', icon: HiHome },
  { to: '/events', key: 'nav.events', icon: HiCalendar },
  { to: '/gallery', key: 'nav.gallery', icon: HiPhotograph },
  { to: '/contact', key: 'nav.contact', icon: HiMail },
];

export default function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <>
      <nav className="bottom-nav" aria-label={t('nav.bottom_nav')}>
        {bottomItems.map(({ to, key, icon: Icon }) => (
          <Link key={to} to={to} className={`bottom-nav-item ${isActive(to) ? 'active' : ''}`}>
            <Icon size={20} />
            <span>{t(key)}</span>
          </Link>
        ))}
      </nav>
      <div className="bottom-nav-spacer" aria-hidden="true" />

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          display: flex;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid #E5E7EB;
          box-shadow: 0 -2px 12px rgba(0,0,0,0.06);
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
        .bottom-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          padding: 0.6rem 0 0.5rem;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .bottom-nav-item.active {
          color: var(--primary);
          font-weight: 600;
        }
        .bottom-nav-spacer { display: none; }

        @media (max-width: 1023.98px) {
          .bottom-nav { display: flex; }
          .bottom-nav-spacer {
            display: block;
            height: calc(3.6rem + env(safe-area-inset-bottom, 0));
          }
        }
        @media (min-width: 1024px) {
          .bottom-nav { display: none; }
        }
      `}</style>
    </>
  );
}
