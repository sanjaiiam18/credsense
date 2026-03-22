"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDemoMode } from "@/components/providers/DemoModeProvider";
import { generateSMECreditAnalysis, DEMO_DATA } from "@/lib/sme-logic";
import { Calculator, Percent, IndianRupee, TrendingUp, AlertCircle, ChevronRight } from "lucide-react";

export default function SimulatorPage() {
  const { creditResult, setCreditResult } = useDemoMode();
  const [loanAmount, setLoanAmount] = useState(500000);

  useEffect(() => { if (!creditResult) setCreditResult(generateSMECreditAnalysis(DEMO_DATA)); }, [creditResult, setCreditResult]);
  if (!creditResult) return <div className="flex items-center justify-center h-screen"><div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" /></div>;

  const { creditScore, approvalProbability, recommendedMin, recommendedMax, interestRate, isApproved, riskLevel } = creditResult;
  const overLimit = loanAmount > recommendedMax;
  const adjProb = Math.max(5, Math.min(99, approvalProbability - (overLimit ? Math.round((loanAmount - recommendedMax) / recommendedMax * 30) : 0)));
  const probColor = adjProb > 75 ? "#10b981" : adjProb > 50 ? "#0ea5e9" : "#ef4444";
  const emi = Math.round((loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, 36)) / (Math.pow(1 + interestRate / 100 / 12, 36) - 1));
  const riskTextColor = riskLevel === "Low" ? "text-emerald-600" : riskLevel === "Medium" ? "text-sky-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-9">
          <div className="badge-sky mb-4 inline-flex"><Calculator className="w-3.5 h-3.5" /> Loan Simulator</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Loan Decision Simulator</h1>
          <p className="text-slate-400 text-sm">Adjust loan parameters to see real-time AI approval prediction</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4">
            <div className="card p-6">
              <p className="text-sm font-semibold text-slate-700 mb-5">Loan Parameters</p>
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500 flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" />Loan Amount</span>
                  <span className="font-bold text-slate-900">₹{loanAmount.toLocaleString("en-IN")}</span>
                </div>
                <input type="range" min="50000" max="5000000" step="50000" value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer" />
                <div className="flex justify-between text-xs text-slate-300 mt-1"><span>₹50K</span><span>₹50L</span></div>
              </div>
              {overLimit && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Amount exceeds recommended range for this credit score</span>
                </div>
              )}
            </div>

            {/* Score card */}
            <div className="card p-5">
              <p className="text-xs text-slate-400 mb-2">AI Credit Score</p>
              <div className="text-3xl font-black text-slate-900 mb-1">{creditScore}</div>
              <div className={`text-xs font-semibold ${isApproved ? "text-emerald-600" : "text-red-500"}`}>
                {isApproved ? "✓ Score qualifies for loan" : "✗ Below threshold of 700"}
              </div>
            </div>

            {/* Recommended range */}
            <div className="card p-5 bg-sky-50 border-sky-100">
              <p className="text-xs text-slate-400 mb-1 flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 text-sky-400" />Recommended Range</p>
              <p className="font-bold text-sky-700 text-sm">₹{recommendedMin.toLocaleString("en-IN")} — ₹{recommendedMax.toLocaleString("en-IN")}</p>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-3 space-y-4">
            <div className="card p-7 text-center">
              <p className="text-sm text-slate-400 mb-2">Approval Probability</p>
              <motion.div key={adjProb} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-7xl font-black mb-3" style={{ color: probColor }}>
                {Math.round(adjProb)}%
              </motion.div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
                <motion.div animate={{ width: `${adjProb}%` }} transition={{ duration: 0.4 }}
                  className="h-full rounded-full" style={{ backgroundColor: probColor }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Interest Rate", value: `${interestRate}%`, sub: "per annum", icon: Percent, color: "text-sky-600", bg: "border-sky-100 bg-sky-50" },
                { label: "Risk Level", value: riskLevel, sub: "default risk", icon: TrendingUp, color: riskTextColor, bg: "border-slate-100" },
                { label: "EMI / month", value: `₹${emi.toLocaleString("en-IN")}`, sub: "36 months", icon: IndianRupee, color: "text-emerald-600", bg: "border-emerald-100 bg-emerald-50" },
              ].map(item => (
                <div key={item.label} className={`card p-4 text-center ${item.bg}`}>
                  <item.icon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                  <div className={`text-base font-bold ${item.color} leading-tight`}>{item.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.label}</div>
                  <div className="text-xs text-slate-300">{item.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-300 text-center px-4">
              Simulation based on AI credit score of {creditScore}. Actual terms subject to lender policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
