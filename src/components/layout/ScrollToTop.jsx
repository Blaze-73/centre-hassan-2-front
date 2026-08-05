import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useReducedMotion } from 'framer-motion';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [pathname, reduceMotion]);

  return null;
}
