import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', to, href, onClick, className = '', style, disabled, type = 'button' }) {
  const cls = `btn btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={cls} style={style}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <a href={href} className={cls} style={style}>
          {children}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={disabled ? {} : { scale: 1.02 }} whileTap={disabled ? {} : { scale: 0.98 }}>
      <button type={type} className={cls} onClick={onClick} style={style} disabled={disabled}>
        {children}
      </button>
    </motion.div>
  );
}
