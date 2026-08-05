export default function Skeleton({ width = '100%', height = 20, radius = 6, style = {}, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`.trim()}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCards({ count = 3, height = 260 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <Skeleton height={height} radius={0} />
          <div style={{ padding: '1.25rem' }}>
            <Skeleton width="60%" height={16} />
            <Skeleton width="90%" height={12} style={{ marginTop: 12 }} />
            <Skeleton width="75%" height={12} style={{ marginTop: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
