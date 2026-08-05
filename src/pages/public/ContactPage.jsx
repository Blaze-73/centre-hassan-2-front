import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AnimatedSection from '../../components/common/AnimatedSection';
import Button from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PageHero from '../../components/common/PageHero';
import api from '../../services/api';

export default function ContactPage() {
  const { t } = useTranslation();
  useDocumentTitle(t('contact.title'), { description: t('contact.meta_description') });
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/contact', form);
      toast.success(t('contact.success'));
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || t('contact.error'));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero titleKey="contact.title" />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <AnimatedSection className="contact-form-wrapper">
              <h2>{t('contact.form_title')}</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">{t('contact.name')}</label>
                    <input id="contact-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">{t('contact.email')}</label>
                    <input id="contact-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone">{t('contact.phone')}</label>
                    <input id="contact-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">{t('contact.subject')}</label>
                    <input id="contact-subject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">{t('contact.message')}</label>
                  <textarea id="contact-message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" variant="primary" disabled={sending}>
                  {sending ? '...' : t('contact.submit')}
                </Button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="contact-info-wrapper">
              <h2>{t('contact.info_title')}</h2>
              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <FaMapMarkerAlt className="contact-icon" />
                  <div>
                    <h4>{t('contact.address')}</h4>
                    <p>{t('contact.address_value')}</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <FaPhone className="contact-icon" />
                  <div>
                    <h4>{t('contact.phone')}</h4>
                    <p>{t('contact.phone_value')}</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h4>{t('contact.email')}</h4>
                    <p>{t('contact.email_value')}</p>
                  </div>
                </div>
              </div>
              <iframe
                title={t('contact.map')}
                src="https://www.google.com/maps?q=Centre+Hassan+II,+Asilah,+Morocco&output=embed"
                className="contact-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        .contact-form-wrapper h2,
        .contact-info-wrapper h2 {
          font-family: var(--font-heading);
          margin-bottom: 2rem;
        }
        .contact-form .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.9rem;
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(200,149,108,0.15);
        }
        .contact-info-cards { display: flex; flex-direction: column; gap: 1.5rem; }
        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .contact-icon {
          font-size: 1.5rem;
          color: var(--primary);
          min-width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(200,149,108,0.1);
          border-radius: 50%;
        }
        .contact-map {
          width: 100%;
          height: 250px;
          border: 0;
          border-radius: var(--radius-md);
          margin-top: 2rem;
        }
        .contact-info-card h4 { font-size: 1rem; font-family: var(--font-body); }
        .contact-info-card p { color: var(--text-secondary); font-size: 0.9rem; }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; }
          .contact-form .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
