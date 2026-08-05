import { Component } from 'react';
import { useTranslation } from 'react-i18next';

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ onReset }) {
  const { t } = useTranslation();

  return (
    <section className="error-boundary-section">
      <div className="error-boundary-card">
        <span className="notfound-code">!</span>
        <h1>{t('error.title')}</h1>
        <p>{t('error.message')}</p>
        <div className="notfound-actions">
          <button type="button" className="btn btn-primary" onClick={() => { onReset(); window.location.href = '/'; }}>
            {t('notFound.home')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function ErrorBoundary({ children }) {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>;
}
