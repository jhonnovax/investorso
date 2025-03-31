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
import { useTheme } from "@/hooks/use-theme";
import useBreakpoint from "@/hooks/use-breakpoint";

export default function InvestmentChart({ results, years }) {
  const [hoverData, setHoverData] = useState(null);
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const period = years > 1 ? "Year" : "Month";

  const lineColors = {
    contributions: theme === "dark" ? "#b3cbd6" : "#737373",
    simpleInterest: theme === "dark" ? "#ffd900" : "#8f7800",
    compoundInterest: theme === "dark" ? "#4ade80" : "#419400",
    grid: theme === "dark" ? "#555" : "#ccc"
  }

  // Initialize with last data point only on mount or when results change
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
            onTouchMove={(data) => {
              if (data && data.activePayload) {
                setHoverData(data.activePayload[0].payload);
              }
            }}
          >
            <defs>
              <linearGradient id="compoundGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme === "dark" ? "#86efac" : "#007B00"} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={theme === "dark" ? "#86efac" : "#007B00"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={lineColors.grid}
            />
            <XAxis 
              dataKey="period"
              stroke={lineColors.contributions}
              fontSize={12}
              tickFormatter={(value) => `${period} ${value}`}
              angle={-50}
              textAnchor="end"
              height={70}
              interval={['sm', 'xs'].includes(breakpoint) ? years / 5 : 1}
            />
            <YAxis 
              tickFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
              }).format(value)}
              stroke={lineColors.contributions}
              fontSize={12}
              angle={['sm', 'xs'].includes(breakpoint) ? -50 : 0}
              width={['sm', 'xs'].includes(breakpoint) ? 35 : 60}
            />
            <Line 
              key="contributions"
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
              key="simpleInterest"
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
      <div className="grid grid-cols-3 gap-2 md:gap-4 text-xs sm:text-sm md:text-base">
        <div className="flex flex-col items-center">
          <span className="text-gray-600" style={{ color: lineColors.contributions }}>
            <svg className="inline-block mr-1" width="14" height="14" viewBox="0 0 32 32">
              <path strokeWidth="4" fill="none" stroke="currentColor" d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
            </svg>
            <span className="hidden md:inline">Net</span> Deposits
          </span>
          <span className="font-semibold">
            {hoverData ? formatCurrency(hoverData.contributions) : '-'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600" style={{ color: lineColors.simpleInterest }}>
            <svg className="inline-block mr-1" width="14" height="14" viewBox="0 0 32 32">
              <path strokeWidth="4" fill="none" stroke="currentColor" d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
            </svg>
            Simple <span className="hidden md:inline">Interest</span><span className="inline md:hidden">%</span>
          </span>
          <span className="font-semibold">
            {hoverData ? formatCurrency(hoverData.simpleInterest) : '-'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-600" style={{ color: lineColors.compoundInterest }}>
            <svg className="inline-block mr-1" width="14" height="14" viewBox="0 0 32 32">
              <path strokeWidth="4" fill="none" stroke="currentColor" d="M0,16h10.666666666666666A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16H32M21.333333333333332,16A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"></path>
            </svg>
            Compound <span className="hidden md:inline">Interest</span><span className="inline md:hidden">%</span>
          </span>
          <span className="font-semibold">
            {hoverData ? formatCurrency(hoverData.compoundInterest) : '-'}
          </span>
        </div>
      </div>
    </div>
  );
} 