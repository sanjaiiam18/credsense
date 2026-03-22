"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDemoMode } from "@/components/providers/DemoModeProvider";
import { generateSMECreditAnalysis, DEMO_DATA } from "@/lib/sme-logic";
import { CheckCircle2, XCircle, ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight, TrendingDown } from "lucide-react";
import Link from "next/link";

function ScoreGauge({ score }) {
  const [display, setDisplay] = useState(300);
  const pct = Math.min(100, Math.max(0, ((score - 300) / 550) * 100));
  const color = score >= 750 ? "#10b981" : score >= 650 ? "#0ea5e9" : "#ef4444";

  useEffect(() => {
    let val = 300;
    const step = Math.max(1, Math.ceil((score - val) / 60));
    const t = setInterval(() => {
      val = Math.min(val + step, score);
      setDisplay(val);
      if (val >= score) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-24">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
            strokeDasharray="251"
            initial={{ strokeDashoffset: 251 }}
            animate={{ strokeDashoffset: 251 - (251 * pct / 100) }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="text-4xl font-black leading-none" style={{ color }}>{display}</span>
          <span className="text-slate-400 text-xs mt-0.5">/ 850</span>
        </div>
      </div>
      <div className="flex justify-between w-44 text-xs text-slate-300 font-mono px-1">
        <span>300</span><span>Fair</span><span>Good</span><span>850</span>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const { creditResult, setCreditResult } = useDemoMode();
  useEffect(() => { if (!creditResult) setCreditResult(generateSMECreditAnalysis(DEMO_DATA)); }, [creditResult, setCreditResult]);
  if (!creditResult) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" /></div>;

  const { creditScore, isApproved, riskLevel, riskPercent, componentScores } = creditResult;
  const RiskIcon = riskLevel === "Low" ? ShieldCheck : riskLevel === "Medium" ? AlertTriangle : ShieldAlert;
  const riskColorClass = riskLevel === "Low" ? "text-emerald-600" : riskLevel === "Medium" ? "text-sky-600" : "text-red-600";
  const riskBg = riskLevel === "Low" ? "bg-emerald-50 border-emerald-100" : riskLevel === "Medium" ? "bg-sky-50 border-sky-100" : "bg-red-50 border-red-100";

  const components = [
    { label: "Revenue", value: componentScores.revenue, color: "#0ea5e9" },
    { label: "Transactions", value: componentScores.transactions, color: "#0ea5e9" },
    { label: "Utility", value: componentScores.utility, color: "#10b981" },
    { label: "Business Age", value: componentScores.businessAge, color: "#10b981" },
    { label: "Behavior", value: componentScores.behavior, color: "#06b6d4" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-9">
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>AI Credit Decision</h1>
          <p className="text-slate-400 text-sm">Powered by alternative data across 5 financial dimensions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">
          {/* Score */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
            className="card p-6 flex flex-col items-center text-center">
            <p className="text-sm font-medium text-slate-500 mb-4">Credit Score</p>
            <ScoreGauge score={creditScore} />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: "spring" }} className="mt-5">
              {isApproved
                ? <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold text-sm"><CheckCircle2 className="w-4 h-4" /> APPROVED</span>
                : <span className="inline-flex items-center gap-1.5 bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-sm"><XCircle className="w-4 h-4" /> REJECTED</span>}
            </motion.div>
          </motion.div>

          {/* Risk */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card p-6 flex flex-col">
            <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
              <RiskIcon className={`w-4 h-4 ${riskColorClass}`} /> Default Risk Prediction
            </p>
            <div className={`border rounded-xl p-4 mb-4 flex-1 flex flex-col justify-center ${riskBg}`}>
              <div className="text-4xl font-black text-slate-900 mb-0.5">{riskPercent}<span className="text-lg text-slate-400">%</span></div>
              <div className={`font-semibold text-sm ${riskColorClass}`}>{riskLevel} Risk</div>
              <div className="text-slate-400 text-xs mt-1">12-month default probability</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Calculated using 450+ alternative data signals including payment behavior and revenue consistency.</p>
          </motion.div>

          {/* Components */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="card p-6 flex flex-col">
            <p className="text-sm font-medium text-slate-500 mb-4">Score Components</p>
            <div className="space-y-3 flex-1">
              {components.map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="text-slate-400 font-mono">{item.value}/100</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${item.value}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <Link href="/explainability" className="btn-primary inline-flex items-center gap-2 text-sm">
            See Why This Score? <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
