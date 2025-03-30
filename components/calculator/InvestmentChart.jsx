"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceLine
} from "recharts";
import { useState, useEffect } from "react";

const lineColors = {
  contributions: "#333",
  simpleInterest: "#8f7800",
  compoundInterest: "#419400"
}

export default function InvestmentChart({ results }) {
  const [hoverData, setHoverData] = useState(null);

  // Initialize with last data point
  useEffect(() => {
    if (results && results.length > 0) {
      setHoverData(results[results.length - 1]);
    }
  }, [results]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Investment Growth</h2>
      <div className="h-[400px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={results}
            onMouseMove={(data) => {
              if (data && data.activePayload) {
                setHoverData(data.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => {
              // Reset to last data point when mouse leaves
              if (results && results.length > 0) {
                setHoverData(results[results.length - 1]);
              }
            }}
          >
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
            <Line 
              type="monotone" 
              dataKey="contributions" 
              stroke={lineColors.contributions} 
              name="Net deposits"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={(props) => {
                if (hoverData && props.payload.period === hoverData.period) {
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r="4" 
                      fill="white" 
                      stroke="#333" 
                      strokeWidth="1.5" 
                    />
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="simpleInterest" 
              stroke={lineColors.simpleInterest} 
              name="Simple Interest"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={(props) => {
                if (hoverData && props.payload.period === hoverData.period) {
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r="4" 
                      fill="white" 
                      stroke="#8f7800" 
                      strokeWidth="1.5" 
                    />
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="compoundInterest"
              name="Compound Interest"
              stroke={lineColors.compoundInterest}
              strokeWidth={2}
              fill="url(#compoundGradient)"
              dot={(props) => {
                if (hoverData && props.payload.period === hoverData.period) {
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r="4" 
                      fill="white" 
                      stroke="#419400" 
                      strokeWidth="1.5" 
                    />
                  );
                }
                return null;
              }}
            />

            {/* Reference line with date */}
            {hoverData && (
              <ReferenceLine
                x={hoverData.period}
                stroke="#666"
                strokeWidth={1}
                label={{
                  value: hoverData.period,
                  position: 'top',
                  fill: '#666',
                  fontSize: 12
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Value display section below chart */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600" style={{ color: lineColors.contributions }}>
            <svg className="inline-block mr-1" width="14" height="14" viewBox="0 0 32 32">
              <path stroke-width="4" fill="none" stroke="currentColor" d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
            </svg>
            Net deposits
          </span>
          <span className="text-lg font-semibold">
            {hoverData ? formatCurrency(hoverData.contributions) : '-'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600" style={{ color: lineColors.simpleInterest }}>
            <svg className="inline-block mr-1" width="14" height="14" viewBox="0 0 32 32">
              <path stroke-width="4" fill="none" stroke="currentColor" d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
            </svg>
            Simple Interest
          </span>
          <span className="text-lg font-semibold">
            {hoverData ? formatCurrency(hoverData.simpleInterest) : '-'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600" style={{ color: lineColors.compoundInterest }}>
            <svg className="inline-block mr-1" width="14" height="14" viewBox="0 0 32 32">
              <path stroke-width="4" fill="none" stroke="currentColor" d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
            </svg>
            Compound Interest
          </span>
          <span className="text-lg font-semibold">
            {hoverData ? formatCurrency(hoverData.compoundInterest) : '-'}
          </span>
        </div>
      </div>
    </div>
  );
} 