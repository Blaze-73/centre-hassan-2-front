import { useEffect } from 'react';

const SITE_NAME = 'Centre Hassan II';

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useDocumentTitle(title, options = {}) {
  const { description } = options;

  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    if (description) {
      setMeta('description', description);
    }
  }, [title, description]);
}
