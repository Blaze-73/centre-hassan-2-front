import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>Une erreur est survenue</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Quelque chose s'est mal passé. Rechargez la page pour continuer.
            </p>
            <button onClick={this.handleReload} className="btn btn-primary">
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
