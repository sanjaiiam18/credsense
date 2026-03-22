"use client";

import { motion } from "framer-motion";
import { Database, Zap, Cpu, BarChart2, CheckCircle2, ArrowRight, GitMerge, Globe, Clock } from "lucide-react";

const NODES = [
  { id: 1, icon: Database, label: "Data Sources", items: ["Bank Statements", "GST Records", "UPI Transactions", "Utility Bills"], color: "#0ea5e9" },
  { id: 2, icon: Zap, label: "Feature Engineering", items: ["Revenue Normalization", "Transaction Scoring", "Behavior Analysis", "Risk Signals"], color: "#0ea5e9" },
  { id: 3, icon: Cpu, label: "AI Risk Model", items: ["Weighted Scoring", "Pattern Detection", "Default Prediction", "Score 300–850"], color: "#10b981" },
  { id: 4, icon: BarChart2, label: "Decision Engine", items: ["Loan Approval", "Interest Pricing", "Limit Calculation", "Risk Grading"], color: "#10b981" },
  { id: 5, icon: CheckCircle2, label: "Dashboard", items: ["Score Display", "Explainability", "Loan Simulator", "Audit Trail"], color: "#06b6d4" },
];

const TECH = [
  { name: "Alternative Data API", cat: "Data Layer" },
  { name: "Feature Pipeline", cat: "Processing" },
  { name: "Weighted ML Model", cat: "AI Engine" },
  { name: "SHAP Explainability", cat: "Transparency" },
  { name: "Decision Rules Engine", cat: "Logic" },
  { name: "Real-time Dashboard", cat: "Output" },
];

const DIFF = [
  { icon: Clock, title: "Real-Time", desc: "Credit decisions in under 3 seconds, not 3 weeks", color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
  { icon: CheckCircle2, title: "Explainable", desc: "Every factor visible — no black box, full audit trail", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  { icon: Globe, title: "Scalable", desc: "API-first, built to process thousands of applications daily", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="badge-sky mb-4 inline-flex"><GitMerge className="w-3.5 h-3.5" /> System Architecture</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>How CredSense Works</h1>
          <p className="text-slate-400 text-sm">End-to-end intelligent pipeline: from raw data to credit decision</p>
        </motion.div>

        {/* Pipeline */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3 mb-10 overflow-x-auto pb-2">
          {NODES.map((node, i) => (
            <div key={node.id} className="flex lg:flex-col items-center flex-shrink-0 lg:flex-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="card card-hover p-5 w-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${node.color}18` }}>
                  <node.icon className="w-5 h-5" style={{ color: node.color }} />
                </div>
                <div className="mb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Step {node.id}</span>
                  <h3 className="font-bold text-slate-800 text-sm mt-0.5">{node.label}</h3>
                </div>
                <ul className="space-y-1.5">
                  {node.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: node.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {i < NODES.length - 1 && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex-shrink-0 mx-2 my-1 lg:rotate-0 rotate-90">
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="card p-6 mb-5">
          <p className="text-sm font-semibold text-slate-700 mb-4">Technical Components</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TECH.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <div className="text-xs text-sky-500 font-semibold mb-0.5">{t.cat}</div>
                <div className="text-sm font-semibold text-slate-800">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DIFF.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.07 }}
              className={`card card-hover p-5 border ${item.bg}`}>
              <item.icon className={`w-5 h-5 mb-3 ${item.color}`} />
              <div className={`font-bold text-sm mb-1 ${item.color}`}>{item.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
