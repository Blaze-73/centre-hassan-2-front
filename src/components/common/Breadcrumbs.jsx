import { Link } from 'react-router';
import { FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Breadcrumbs({ items }) {
  const { t } = useTranslation();

  return (
    <nav className="breadcrumbs" aria-label={t('common.breadcrumb')}>
      <Link to="/">{t('nav.home')}</Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.label}>
            <FaChevronRight size={10} />
            {last ? (
              <span aria-current="page" className="breadcrumb-current">{item.label}</span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
