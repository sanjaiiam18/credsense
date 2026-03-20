"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine } from "recharts";
import { Eye, ShieldX, CheckSquare, Target, Scale } from "lucide-react";

const shapData = [
  { feature: "Payment History", impact: 85, category: "Positive" },
  { feature: "Income Stability", impact: 42, category: "Positive" },
  { feature: "Savings Ratio", impact: 30, category: "Positive" },
  { feature: "Utlity Bill History", impact: 15, category: "Positive" },
  { feature: "Recent Inquiries", impact: -10, category: "Negative" },
  { feature: "Thin-File Penalty", impact: -15, category: "Negative" },
  { feature: "Credit Utilization", impact: -25, category: "Negative" },
];

export default function ExplainabilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
            <Eye className="w-7 h-7 text-slate-500" /> Explainable AI (XAI)
          </h1>
          <p className="text-slate-500 mt-2 font-light">Transparent insights into why the AI algorithm assigned the current score.</p>
        </div>
        <div className="hidden sm:block">
          <div className="glass-panel px-4 py-2 flex items-center gap-2 border-slate-200 text-slate-600">
            <Scale className="w-4 h-4" />
            <span className="text-sm font-medium text-slate-900">Algorithm Transparency: 98%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Reasons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 lg:col-span-1">
          <h2 className="text-lg font-medium text-slate-900 mb-6">Top 3 Driving Factors</h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-400 font-medium">1. Payment History</span>
                <span className="text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded text-xs">+85 pts</span>
              </div>
              <p className="text-sm text-slate-500 font-light">Consistent, on-time payments for the last 48 months heavily boosted the score.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-400 font-medium">2. Income Stability</span>
                <span className="text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded text-xs">+42 pts</span>
              </div>
              <p className="text-sm text-slate-500 font-light">Predictable inflows over 2 years establish strong financial resilience.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-rose-400 font-medium">3. Credit Utilization</span>
                <span className="text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded text-xs">-25 pts</span>
              </div>
              <p className="text-sm text-slate-500 font-light">Current utilization sits at 45%, negatively impacting the overall credit health.</p>
            </div>
          </div>
        </motion.div>

        {/* SHAP Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-slate-900 mb-2 text-center">Feature Impact Analysis (SHAP Values)</h2>
          <p className="text-center text-sm text-slate-500 mb-6">How specific alternative data points shifted the baseline score</p>
          
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={shapData}
                margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b' }} />
                <YAxis dataKey="feature" type="category" stroke="#64748b" tick={{ fill: '#ccc', fontSize: 13 }} width={120} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#fff' }} 
                />
                <ReferenceLine x={0} stroke="#cbd5e1" />
                <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                  {shapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.impact > 0 ? '#00f0ff' : '#ff007f'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Fair Lending & Bias Detection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 border-emerald-500/20">
        <h2 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-emerald-400" /> Fair Lending Compliance Check
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-slate-500">Demographic Bias</p>
            <p className="text-emerald-400 font-bold flex items-center gap-1"><Target className="w-4 h-4" /> None Detected</p>
          </div>
          <div className="flex flex-col gap-2 border-l border-slate-300 pl-6">
            <p className="text-sm text-slate-500">Geographic Penalty</p>
            <p className="text-emerald-400 font-bold flex items-center gap-1"><Target className="w-4 h-4" /> Passed (Neutral Weight)</p>
          </div>
          <div className="flex flex-col gap-2 border-l border-slate-300 pl-6">
            <p className="text-sm text-slate-500">Model Stability Score</p>
            <p className="text-emerald-400 font-bold flex items-center gap-1"><Target className="w-4 h-4" /> 99.4% (A+ Grade)</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
