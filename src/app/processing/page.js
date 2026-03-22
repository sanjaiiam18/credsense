"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Activity, Cpu, GitBranch, Star, CheckCircle2 } from "lucide-react";

const STEPS = [
  { id: 1, icon: Database, label: "Data Ingestion", desc: "Bank transactions, utility bills, GST records, UPI payment history", color: "#0ea5e9", duration: 1400 },
  { id: 2, icon: Activity, label: "Feature Engineering", desc: "Normalizing revenue patterns, scoring transaction regularity and utility consistency", color: "#0ea5e9", duration: 1300 },
  { id: 3, icon: Cpu, label: "AI Risk Model", desc: "Weighted multi-factor scoring: Revenue (25%), Transactions (20%), Utility (20%)", color: "#10b981", duration: 1500 },
  { id: 4, icon: GitBranch, label: "Pattern Detection", desc: "Detecting seasonality, cash flow cycles and behavioral risk signals", color: "#10b981", duration: 1000 },
  { id: 5, icon: Star, label: "Score Generation", desc: "Generating final credit score (300–850) with full explainability metadata", color: "#0ea5e9", duration: 800 },
];

const SIGNALS = [
  "Bank Statement Analysis", "UPI Transaction History", "GST Filing Compliance",
  "Utility Payment Records", "Cash Flow Patterns", "Digital Footprint",
  "Seasonal Revenue Trends", "Customer Payment Frequency",
];

export default function ProcessingPage() {
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [signalIdx, setSignalIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Signal ticker
    const signalTimer = setInterval(() => setSignalIdx(p => (p + 1) % SIGNALS.length), 500);

    // Step sequencer — no overlap: each step completes before next starts
    let stepIdx = 0;
    let accumulated = 0;

    function runStep() {
      if (stepIdx >= STEPS.length) {
        setDone(true);
        clearInterval(signalTimer);
        return;
      }
      const step = STEPS[stepIdx];
      setActiveStep(stepIdx);
      setProgress(Math.round((stepIdx / STEPS.length) * 95));

      const timer = setTimeout(() => {
        setCompletedSteps(p => [...p, stepIdx]);
        stepIdx++;
        runStep();
      }, step.duration);

      return timer;
    }

    const startTimer = setTimeout(() => { runStep(); }, 300);

    return () => {
      clearInterval(signalTimer);
      clearTimeout(startTimer);
    };
  }, []);

  useEffect(() => {
    if (done) setProgress(100);
  }, [done]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="badge-sky mb-4 inline-flex">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            AI Engine Running
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Analyzing Alternative Data with AI
          </h1>
          <p className="text-slate-400 text-sm">Processing {SIGNALS.length} alternative data signals in real-time</p>
        </div>

        {/* Terminal */}
        <div className="bg-slate-900 rounded-xl px-5 py-3 mb-6 min-h-[44px] flex items-center gap-3">
          <span className="text-sky-400 font-mono text-xs opacity-70 flex-shrink-0">[AI]</span>
          <AnimatePresence mode="wait">
            <motion.span key={signalIdx}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs text-emerald-400 flex-1 truncate">
              Processing: <span className="text-white">{SIGNALS[signalIdx]}</span>...
            </motion.span>
          </AnimatePresence>
          <span className="text-slate-500 font-mono text-xs flex-shrink-0">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-100 rounded-full h-1.5 mb-7 overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full" />
        </div>

        {/* Steps — fixed height rows, no overlap */}
        <div className="space-y-2.5">
          {STEPS.map((step, i) => {
            const isActive = activeStep === i && !completedSteps.includes(i);
            const isDone = completedSteps.includes(i);
            const isPending = !isActive && !isDone;
            return (
              <div key={step.id}
                className={`card flex items-center gap-4 px-5 py-4 transition-all duration-300 ${isActive ? "ring-2 ring-sky-200 shadow-sm" : ""} ${isPending ? "opacity-40" : "opacity-100"}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${step.color}18` }}>
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-slate-800 text-sm">{step.label}</span>
                    {isActive && <span className="text-xs text-sky-500 font-medium">Processing...</span>}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{step.desc}</p>
                  {/* Step progress bar — only shown while active */}
                  {isActive && (
                    <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }} animate={{ width: "100%" }}
                        transition={{ duration: step.duration / 1000, ease: "linear" }}
                        className="h-full rounded-full"
                        style={{ background: step.color }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isDone
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    : isActive
                      ? <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                      : <div className="w-4 h-4 border-2 border-slate-200 rounded-full" />}
                </div>
              </div>
            );
          })}
        </div>

        {done && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <p className="font-semibold text-emerald-700 text-sm">Analysis Complete — Loading Results...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
