import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const flags = { fr: 'FR', en: 'EN', ar: 'AR' };

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { setLang } = useContext(ThemeContext);

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <div className="language-switcher" role="group" aria-label={t('common.language')}>
      {Object.entries(flags).map(([code, label]) => (
        <button
          key={code}
          onClick={() => handleChange(code)}
          className={`lang-btn ${i18n.language === code ? 'active' : ''}`}
          aria-pressed={i18n.language === code}
          aria-label={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
