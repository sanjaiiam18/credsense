"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDemoMode } from "@/components/providers/DemoModeProvider";
import { generateSMECreditAnalysis, DEMO_DATA } from "@/lib/sme-logic";
import { useRouter } from "next/navigation";
import {
  ShieldOff, TrendingDown, Clock, XCircle, Zap, RefreshCw,
  Building2, BarChart3, CreditCard, CheckCircle2, ArrowRight,
  TriangleAlert
} from "lucide-react";

const PROBLEMS = [
  { icon: ShieldOff, title: "No Formal Credit History", desc: "67% of SMEs lack bureau records, making them invisible to traditional lenders.", accent: "#0ea5e9" },
  { icon: TrendingDown, title: "Bureau-Only Scoring", desc: "Traditional models ignore cash flow, utility payments, and business behavior data.", accent: "#0ea5e9" },
  { icon: Clock, title: "Slow Manual Underwriting", desc: "Bank loan decisions take 3–6 weeks, causing SMEs to miss critical growth windows.", accent: "#10b981" },
  { icon: XCircle, title: "High Rejection Rates", desc: "Over 40% of creditworthy SMEs get rejected due to outdated scoring methods.", accent: "#10b981" },
];

export default function ProblemInputPage() {
  const [form, setForm] = useState({ monthlyRevenue: "", numTransactions: "", utilityConsistency: 60, businessAge: "", hasCreditHistory: false });
  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isDemoMode, setInputData, setCreditResult } = useDemoMode();
  const router = useRouter();
  const demoRef = useRef(false);

  useEffect(() => {
    if (!isDemoMode || demoRef.current) return;
    demoRef.current = true;
    const fillTimer = setTimeout(() => setForm({ ...DEMO_DATA }), 1500);
    const submitTimer = setTimeout(() => handleSubmit(null, DEMO_DATA), 4000);
    return () => { clearTimeout(fillTimer); clearTimeout(submitTimer); };
  }, [isDemoMode]);

  useEffect(() => { if (!isDemoMode) demoRef.current = false; }, [isDemoMode]);

  function validate(data) {
    const e = {};
    if (!data.monthlyRevenue || data.monthlyRevenue < 1000) e.monthlyRevenue = "Required (min ₹1,000)";
    if (!data.numTransactions || data.numTransactions < 1) e.numTransactions = "Required";
    if (!data.businessAge || data.businessAge < 0) e.businessAge = "Required";
    return e;
  }

  function handleSubmit(e, overrideData) {
    if (e) e.preventDefault();
    const data = overrideData || form;
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsAnalyzing(true);
    const result = generateSMECreditAnalysis({
      monthlyRevenue: Number(data.monthlyRevenue), numTransactions: Number(data.numTransactions),
      utilityConsistency: Number(data.utilityConsistency), businessAge: Number(data.businessAge),
      hasCreditHistory: Boolean(data.hasCreditHistory),
    });
    setInputData(data);
    setCreditResult(result);
    setTimeout(() => router.push("/processing"), 500);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Problem Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <div className="badge-sky mb-5">
              <TriangleAlert className="w-3.5 h-3.5" /> The Problem We Solve
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              SMEs Are Underserved by<br />
              <span className="text-sky-500">Traditional Credit Systems</span>
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">Over ₹20 trillion in SME credit demand goes unmet every year because traditional banks can't evaluate businesses without formal credit history.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {PROBLEMS.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.4 }}
                className="card card-hover p-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${p.accent}18` }}>
                  <p.icon className="w-5 h-5" style={{ color: p.accent }} />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1 leading-snug">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Rejected pill */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center gap-3 max-w-sm mx-auto bg-red-50 border border-red-100 rounded-2xl px-5 py-3">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full pulse-ring" />
            </div>
            <div>
              <p className="font-bold text-red-700 text-sm">LOAN REJECTED</p>
              <p className="text-red-500 text-xs">₹3L/month SME denied — "insufficient credit history"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-5">
        <div className="flex-1 max-w-24 h-px bg-slate-100 mx-4" />
        <span className="text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full">CredSense AI Solution</span>
        <div className="flex-1 max-w-24 h-px bg-slate-100 mx-4" />
      </div>

      {/* Input Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-8">
          <div className="flex items-start justify-between mb-7 gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>SME Credit Application</h2>
              <p className="text-slate-400 text-sm mt-1">Enter business data to generate your AI credit score</p>
            </div>
            <button onClick={() => { setForm({ ...DEMO_DATA }); setErrors({}); }}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 hover:bg-sky-100 transition-colors">
              <Zap className="w-3.5 h-3.5" /> Auto-Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Revenue */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <Building2 className="w-4 h-4 text-sky-500" /> Monthly Revenue (₹)
                </label>
                <input type="number" placeholder="e.g. 250000" value={form.monthlyRevenue}
                  onChange={e => setForm(p => ({ ...p, monthlyRevenue: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all placeholder:text-slate-300 ${errors.monthlyRevenue ? "border-red-300" : "border-slate-200"}`} />
                {errors.monthlyRevenue && <p className="text-xs text-red-500 mt-1">{errors.monthlyRevenue}</p>}
              </div>
              {/* Transactions */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <BarChart3 className="w-4 h-4 text-emerald-500" /> Monthly Transactions
                </label>
                <input type="number" placeholder="e.g. 120" value={form.numTransactions}
                  onChange={e => setForm(p => ({ ...p, numTransactions: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all placeholder:text-slate-300 ${errors.numTransactions ? "border-red-300" : "border-slate-200"}`} />
                {errors.numTransactions && <p className="text-xs text-red-500 mt-1">{errors.numTransactions}</p>}
              </div>
              {/* Business Age */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <Clock className="w-4 h-4 text-sky-500" /> Business Age (years)
                </label>
                <input type="number" placeholder="e.g. 4" value={form.businessAge}
                  onChange={e => setForm(p => ({ ...p, businessAge: e.target.value }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all placeholder:text-slate-300 ${errors.businessAge ? "border-red-300" : "border-slate-200"}`} />
                {errors.businessAge && <p className="text-xs text-red-500 mt-1">{errors.businessAge}</p>}
              </div>
              {/* Credit History */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  <CreditCard className="w-4 h-4 text-emerald-500" /> Existing Credit History
                </label>
                <div className="flex gap-3">
                  {[true, false].map(val => (
                    <button key={String(val)} type="button" onClick={() => setForm(p => ({ ...p, hasCreditHistory: val }))}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.hasCreditHistory === val ? "bg-sky-50 border-sky-300 text-sky-700" : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"}`}>
                      {val ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Utility Slider */}
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Utility Payment Consistency</span>
                <span className="text-sky-600 font-bold">{form.utilityConsistency}%</span>
              </label>
              <input type="range" min="0" max="100" step="1" value={form.utilityConsistency}
                onChange={e => setForm(p => ({ ...p, utilityConsistency: Number(e.target.value) }))}
                className="w-full accent-sky-500 cursor-pointer" />
              <div className="flex justify-between text-xs text-slate-300 mt-1">
                <span>0% Irregular</span><span>100% Perfect</span>
              </div>
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${form.utilityConsistency}%` }} transition={{ duration: 0.2 }}
                  className={`h-full rounded-full ${form.utilityConsistency > 70 ? "bg-emerald-400" : form.utilityConsistency > 40 ? "bg-sky-400" : "bg-red-400"}`} />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isAnalyzing}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl mt-2">
              {isAnalyzing
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating Score...</>
                : <><Zap className="w-4 h-4" /> Generate AI Credit Score <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
