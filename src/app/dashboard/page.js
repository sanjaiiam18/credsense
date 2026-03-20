"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import { generateCreditAnalysis } from "@/lib/ai-logic";
import { Info, AlertTriangle, TrendingUp, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock spending and cashflow data
const spendingData = [
  { name: "Housing", value: 35 },
  { name: "Food", value: 20 },
  { name: "Transport", value: 15 },
  { name: "Entertainment", value: 10 },
  { name: "Savings", value: 20 },
];
const COLORS = ["#00f0ff", "#ff007f", "#8b5cf6", "#f59e0b", "#10b981"];

const cashflowData = [
  { month: "Jan", in: 5200, out: 3800 },
  { month: "Feb", in: 5200, out: 4100 },
  { month: "Mar", in: 5500, out: 3900 },
  { month: "Apr", in: 5200, out: 4500 },
  { month: "May", in: 6100, out: 4000 },
  { month: "Jun", in: 5200, out: 3500 },
];

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(400);

  useEffect(() => {
    // Simulate fetching data and running model
    const result = generateCreditAnalysis({ income: 5500, savingsRatio: 22, socialTrust: 80 });
    setAnalysis(result);

    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= result.score) {
          clearInterval(interval);
          return result.score;
        }
        return prev + Math.ceil((result.score - prev) / 10);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!analysis) return <div className="p-12 text-center text-slate-900">Loading Analysis...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Credit Analytics Overview</h1>
        <div className="text-sm text-slate-500">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Score Gauge Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4"><Info className="w-4 h-4 text-slate-500" /></div>
          <h2 className="text-lg font-medium text-slate-900 mb-6 w-full text-left">AI Credit Score</h2>
          
          <div className="relative w-full max-w-[240px] mt-8 aspect-[2/1] flex flex-col items-center justify-end">
            {/* SVG Gauge Mock */}
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible absolute top-0 left-0">
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="url(#gauge-gradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * ((animatedScore - 300) / 600))}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff007f" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center relative z-10 translate-y-6">
              <span className="text-5xl font-semibold text-slate-900 leading-none">{animatedScore}</span>
              <p className="text-sm text-slate-500 mt-1">Excellent Range</p>
            </div>
          </div>
          <div className="w-full max-w-[240px] flex justify-between text-xs text-slate-400 mt-8 px-2 font-mono">
            <span>300</span><span>900</span>
          </div>
        </motion.div>

        {/* Risk Prediction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-panel p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-medium text-slate-900">Default Risk Prediction</h2>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1",
              analysis.riskLevel === "Low" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
              analysis.riskLevel === "Medium" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
              "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            )}>
              {analysis.riskLevel === "Low" ? <CheckCircle className="w-3 h-3"/> : <AlertTriangle className="w-3 h-3"/>}
              {analysis.riskLevel} Risk
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="text-6xl font-black text-slate-900">{analysis.defaultRiskPercentage}<span className="text-2xl text-slate-400">%</span></div>
            <p className="text-slate-500 text-sm mt-2 text-center">Probability of default within 12 months, calculated using 450+ alternative data points.</p>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-panel p-6 flex flex-col"
        >
          <h2 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-slate-500" /> AI Insights
          </h2>
          <div className="space-y-4 flex-1">
            {analysis.insights.map((insight, idx) => (
              <div key={idx} className="bg-panel border border-slate-200 rounded-md p-3 text-sm text-slate-600 flex items-start gap-3">
                <div className="mt-0.5"><TrendingUp className="w-4 h-4 text-slate-400" /></div>
                <p>{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Breakdown (SHAP-like) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-medium text-slate-900">Score Explainability</h2>
              <p className="text-sm text-slate-500">Feature importance values (SHAP output)</p>
            </div>
            <a href="/explainability" className="text-xs text-primary hover:underline">View Full Analysis &rarr;</a>
          </div>
          
          <div className="space-y-4">
            {analysis.shapFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <div className="w-32 text-slate-500 truncate">{feature.feature}</div>
                <div className="flex-1 px-4 flex items-center">
                  <div className="w-1/2 flex justify-end pr-1">
                    {feature.impact === "negative" && (
                      <div className="h-3 bg-red-500/80 rounded-l-sm" style={{ width: feature.width }}></div>
                    )}
                  </div>
                  <div className="w-px h-3 bg-slate-100 mx-1"></div>
                  <div className="w-1/2 flex justify-start pl-1">
                    {feature.impact === "positive" && (
                      <div className="h-3 bg-blue-500/80 rounded-r-sm" style={{ width: feature.width }}></div>
                    )}
                  </div>
                </div>
                <div className={cn("w-12 text-right font-mono text-xs", feature.impact === "positive" ? "text-emerald-400": "text-rose-400")}>
                  {feature.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transaction Analysis / Cash Flow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h2 className="text-lg font-medium text-slate-900 mb-1">Cash Flow Trends</h2>
          <p className="text-sm text-slate-500 mb-6">6-month comparative analysis</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashflowData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                  itemStyle={{ fontSize: 13 }}
                />
                <Line type="monotone" dataKey="in" name="Income" stroke="#00f0ff" strokeWidth={3} dot={{ r: 4, fill: '#00f0ff', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="out" name="Expenses" stroke="#ff007f" strokeWidth={3} dot={{ r: 4, fill: '#ff007f', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
