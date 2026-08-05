import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GalleryGrid({ images = [] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="empty-state">
        <h3>{t('gallery.no_images')}</h3>
        <p>{t('gallery.empty_hint')}</p>
      </div>
    );
  }

  const slides = images.map((img) => ({
    src: typeof img === 'string' ? img : img.image_path,
    alt: img.caption || '',
  }));

  return (
    <>
      <div className="gallery-masonry">
        {images.map((img, i) => {
          const src = typeof img === 'string' ? img : img.image_path;
          return (
            <motion.div
              key={i}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => { setIndex(i); setOpen(true); }}
            >
              <img src={src} alt={typeof img === 'object' && img.caption ? img.caption : ''} loading="lazy" />
            </motion.div>
          );
        })}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={slides} />
      <style>{`
        .gallery-masonry {
          column-count: 3;
          column-gap: 1rem;
        }
        .gallery-item {
          break-inside: avoid;
          margin-bottom: 1rem;
          cursor: pointer;
          overflow: hidden;
          border-radius: var(--radius-sm);
          transition: transform 0.3s;
        }
        .gallery-item:hover { transform: scale(1.02); }
        .gallery-item img {
          width: 100%;
          display: block;
          border-radius: var(--radius-sm);
        }
        @media (max-width: 768px) { .gallery-masonry { column-count: 2; } }
        @media (max-width: 480px) { .gallery-masonry { column-count: 1; } }
      `}</style>
    </>
  );
}
