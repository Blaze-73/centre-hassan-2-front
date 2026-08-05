import { useEffect } from 'react';

const SITE_NAME = 'Centre Hassan II';

function setMeta(selector, attr, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, content);
    document.head.appendChild(el);
  } else {
    el.setAttribute(attr, content);
  }
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentTitle(title, options = {}) {
  const { description } = options;

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    setMeta('meta[property="og:title"]', 'property', fullTitle);
    setMeta('meta[name="twitter:title"]', 'name', fullTitle);

    if (description) {
      setMeta('meta[name="description"]', 'name', description);
      setMeta('meta[property="og:description"]', 'property', description);
      setMeta('meta[name="twitter:description"]', 'name', description);
    }

    setMeta('meta[property="og:url"]', 'property', window.location.href);
    setCanonical(window.location.origin + window.location.pathname);
  }, [title, description]);
}
