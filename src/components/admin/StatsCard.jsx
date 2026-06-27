import { motion } from 'framer-motion';

export default function StatsCard({ icon, value, label, color }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="icon" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
      <div className="info">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </motion.div>
  );
}
