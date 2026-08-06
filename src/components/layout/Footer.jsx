import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">Centre Hassan II</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.5rem' }}>
              {t('home.about_text')}
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaTwitter /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('footer.quick_links')}</h4>
            <ul>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/events">{t('nav.events')}</Link></li>
              <li><Link to="/spaces">{t('nav.spaces')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/news">{t('nav.news')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('contact.info_title')}</h4>
            <ul className="footer-contact">
              <li><FaMapMarkerAlt /> {t('contact.address_value')}</li>
              <li><FaPhone /> {t('contact.phone_value')}</li>
              <li><FaEnvelope /> {t('contact.email_value')}</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.language')}</h4>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Centre Hassan II des Rencontres Internationales. {t('footer.rights')}.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--secondary);
          color: #fff;
          padding: 4rem 0 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 3rem;
        }
        .footer-brand {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--primary);
        }
        .footer-col h4 {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--accent);
        }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 0.6rem; }
        .footer-col ul li a { color: rgba(255,255,255,0.7); transition: color 0.2s; }
        .footer-col ul li a:hover { color: var(--primary); }
        .footer-contact li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
        }
        .footer-social { display: flex; gap: 0.75rem; margin-top: 1rem; }
        .footer-social a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: background 0.2s, transform 0.2s;
        }
        .footer-social a:hover { background: var(--primary); transform: translateY(-2px); }
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  );
}
