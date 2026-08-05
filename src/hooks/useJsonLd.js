import { useEffect } from 'react';

export function useJsonLd(data) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'page-jsonld';
    script.text = JSON.stringify(data);
    const existing = document.getElementById('page-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
}
