"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from "recharts";

// Custom tooltip component
function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="bg-base-100 p-3 rounded-lg shadow-lg border border-base-300">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 py-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
          <span className="font-medium">{entry.name}:</span>
          <span>{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function InvestmentChart({ results }) {

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Investment Growth</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={results}>
            <defs>
              <linearGradient id="compoundGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#419400" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#419400" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis 
              tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
              }).format(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="contributions" 
              stroke="#333" 
              name="Net deposits"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="simpleInterest" 
              stroke="#8f7800" 
              name="Simple Interest"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="compoundInterest"
              name="Compound Interest"
              stroke="#419400"
              strokeWidth={2}
              fill="url(#compoundGradient)"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 