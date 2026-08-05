const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#C8956C'/><stop offset='1' stop-color='#111E2C'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/><text x='400' y='310' font-family='Georgia, serif' font-size='34' fill='rgba(255,255,255,0.9)' text-anchor='middle'>Centre Hassan II</text><text x='400' y='352' font-family='Georgia, serif' font-size='18' fill='rgba(255,255,255,0.6)' text-anchor='middle'>Asilah — Maroc</text></svg>`;

export const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export function handleImageError(e) {
  const img = e.currentTarget;
  img.onerror = null;
  img.src = PLACEHOLDER_IMAGE;
}
