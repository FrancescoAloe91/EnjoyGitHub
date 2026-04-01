/**
 * Converte un array di valori in punti con asse temporale (ultimi N giorni, un punto al giorno).
 * Usato per assi X/Y coerenti nei grafici dashboard.
 */
export function buildDailySeries(points) {
  if (!points?.length) return [];
  const now = new Date();
  return points.map((value, i) => {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - (points.length - 1 - i));
    return {
      t: d.getTime(),
      value: Number(value),
      label: d.toLocaleDateString('it-IT', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    };
  });
}

export function formatYTick(v) {
  if (v == null || Number.isNaN(v)) return '';
  const n = Number(v);
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1)}k`;
  if (Math.abs(n) > 0 && Math.abs(n) < 0.01) return n.toExponential(1);
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2);
}
