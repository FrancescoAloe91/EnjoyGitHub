import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { buildDailySeries, formatYTick } from './timeSeriesData';

export default function TimeSeriesChart({ points, color = '#67e8f9', compact = false, showCaption = true }) {
  const data = useMemo(() => buildDailySeries(points), [points]);
  const height = compact ? 76 : 132;

  if (!data.length) return null;

  return (
    <div className={`time-series-chart ${compact ? 'time-series-chart--compact' : ''}`}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 6, right: 6, left: compact ? 0 : 2, bottom: compact ? 2 : 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: compact ? 8 : 9, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(148, 163, 184, 0.35)' }}
            interval={compact ? 'preserveStartEnd' : 0}
            height={compact ? 28 : 34}
          />
          <YAxis
            tick={{ fontSize: compact ? 8 : 9, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: 'rgba(148, 163, 184, 0.35)' }}
            domain={['auto', 'auto']}
            width={compact ? 36 : 44}
            tickFormatter={formatYTick}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(148, 163, 184, 0.35)',
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(val) => [
              typeof val === 'number' ? val.toLocaleString('it-IT', { maximumFractionDigits: 4 }) : val,
              'Valore',
            ]}
            labelFormatter={(label) => (label ? `Data: ${label}` : '')}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={color}
            fillOpacity={0.12}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      {showCaption ? (
        <p className="time-series-chart-caption">Asse X: ultimi {data.length} giorni · Asse Y: valore</p>
      ) : null}
    </div>
  );
}
