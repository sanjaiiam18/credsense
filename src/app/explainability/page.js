"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useDemoMode } from "@/components/providers/DemoModeProvider";
import { generateSMECreditAnalysis, DEMO_DATA } from "@/lib/sme-logic";
import { Eye, ShieldCheck, Award, DollarSign, RefreshCcw, Clock, Brain } from "lucide-react";

const FACTORS = [
  { key: "revenue", label: "Revenue", weight: "25%", icon: DollarSign, color: "#0ea5e9", desc: "Monthly revenue normalized against SME benchmarks" },
  { key: "transactions", label: "Transactions", weight: "20%", icon: RefreshCcw, color: "#0284c7", desc: "Volume and regularity of business transactions" },
  { key: "utility", label: "Utility Score", weight: "20%", icon: ShieldCheck, color: "#10b981", desc: "Consistency of utility and recurring payments" },
  { key: "businessAge", label: "Business Age", weight: "15%", icon: Clock, color: "#059669", desc: "Track record and operational maturity" },
  { key: "behavior", label: "Behavioral", weight: "20%", icon: Brain, color: "#06b6d4", desc: "Composite behavioral risk signals and patterns" },
];

export default function ExplainabilityPage() {
  const { creditResult, setCreditResult } = useDemoMode();
  useEffect(() => { if (!creditResult) setCreditResult(generateSMECreditAnalysis(DEMO_DATA)); }, [creditResult, setCreditResult]);
  if (!creditResult) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" /></div>;

  const { contributions, componentScores } = creditResult;
  const chartData = FACTORS.map(f => ({ name: f.label, contribution: contributions[f.key], score: componentScores[f.key], color: f.color }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-9">
          <div className="badge-sky mb-4 inline-flex"><Eye className="w-3.5 h-3.5" /> Explainable AI</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Why This Score?</h1>
          <p className="text-slate-400 text-sm">Every factor contributing to this decision — fully transparent</p>
          <p className="text-sky-600 text-xs font-semibold mt-2">"Transparent, Explainable, Trustworthy AI"</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {/* Bar chart */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-6">
            <p className="text-sm font-semibold text-slate-700 mb-0.5">Feature Impact Analysis</p>
            <p className="text-xs text-slate-400 mb-5">Score point contribution by each factor</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }} barSize={28}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(val) => [`+${val} pts`, "Contribution"]}
                    contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 12, boxShadow: "0 2px 8px rgb(0 0 0/0.08)" }}
                    cursor={{ fill: "#f8fafc" }}
                  />
                  <Bar dataKey="contribution" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Factor list */}
          <div className="space-y-2.5">
            {FACTORS.map((factor, i) => (
              <motion.div key={factor.key}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="card card-hover px-4 py-3.5 flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${factor.color}18` }}>
                  <factor.icon className="w-4.5 h-4.5" style={{ color: factor.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800 text-sm">{factor.label}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-slate-400">{factor.weight}</span>
                      <span className="text-sm font-bold text-emerald-600">+{contributions[factor.key]}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${componentScores[factor.key]}%` }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ backgroundColor: factor.color }} />
                  </div>
                  <p className="text-xs text-slate-400 truncate">{factor.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance badges */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: "Fair Lending", desc: "No demographic data used in scoring", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
            { icon: Eye, title: "Full Transparency", desc: "Every decision factor is logged and auditable", color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
            { icon: Award, title: "RBI Compliant", desc: "Complies with RBI alternative data guidelines", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
          ].map(item => (
            <div key={item.title} className={`border rounded-xl p-4 flex items-start gap-3 ${item.bg}`}>
              <item.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.color}`} />
              <div>
                <div className={`font-semibold text-sm ${item.color}`}>{item.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
