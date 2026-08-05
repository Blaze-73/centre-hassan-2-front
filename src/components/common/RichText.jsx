import DOMPurify from 'dompurify';

export default function RichText({ html, className = '' }) {
  if (!html) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}
