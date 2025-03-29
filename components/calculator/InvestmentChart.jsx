"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function InvestmentChart({ results }) {
  const resultsByYear = results
    .filter((_, index) => index % 12 === 0)
    .map((result, index) => ({
      ...result,
      month: index,
    }));

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Investment Growth</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={resultsByYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="contributions" 
              stroke="#333" 
              name="Contributions"
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#cead00" 
              name="Profit"
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#419400" 
              name="Total Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 