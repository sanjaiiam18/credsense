"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Globe, ArrowRight, CheckCircle2, BarChart3, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let val = 0;
    const step = Math.max(1, Math.ceil(target / 70));
    const t = setInterval(() => {
      val = Math.min(val + step, target);
      setCount(val);
      if (val >= target) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [target]);
  return <span>{count}{suffix}</span>;
}

const STATS = [
  { icon: TrendingUp, label: "More SME Approvals", value: 65, suffix: "%", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  { icon: Users, label: "Previously Rejected SMEs Now Eligible", value: 32, suffix: "L+", color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
  { icon: Zap, label: "Faster Credit Decisions", value: 99, suffix: "%", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
  { icon: ShieldCheck, label: "Default Rate Reduction", value: 40, suffix: "%", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
];

const OUTCOMES = [
  { icon: TrendingUp, title: "Increase SME Loan Approvals", desc: "By using alternative data, we unlock lending for SMEs previously invisible to banks, increasing approval rates by 60–70%.", color: "text-sky-600", bg: "bg-sky-50" },
  { icon: BarChart3, title: "Reduce Default Risk", desc: "Smarter multi-dimensional risk prediction reduces portfolio defaults through better calibrated loan decisions.", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Zap, title: "Real-Time Decisions", desc: "AI reduces underwriting time from 3–6 weeks to under 60 seconds — enabling businesses to move faster.", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: Globe, title: "Expand Financial Inclusion", desc: "Enable millions of micro and small businesses in Tier 2–3 cities to access formal credit for the first time.", color: "text-sky-600", bg: "bg-sky-50" },
];

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="badge-green mb-4 inline-flex"><CheckCircle2 className="w-3.5 h-3.5" /> Real-World Impact</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Real-World Impact</h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">CredSense is a financial inclusion engine that reshapes how credit works for millions of underserved SMEs.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} className={`card card-hover p-5 text-center border ${s.bg}`}>
              <s.icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
              <div className={`text-3xl font-black ${s.color} mb-1`}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {OUTCOMES.map((o, i) => (
            <motion.div key={o.title} initial={{ opacity: 0, x: i % 2 === 0 ? -14 : 14 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }} className="card card-hover p-5 flex gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${o.bg}`}>
                <o.icon className={`w-5 h-5 ${o.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{o.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            From Data to Decisions —<br />Smarter Credit for Everyone
          </h2>
          <p className="text-sky-100 text-sm mb-6 max-w-md mx-auto">
            CredSense proves that creditworthy SMEs don't need a bureau score to access capital. They need a smarter system.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="bg-white text-sky-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-sky-50 transition-all text-sm inline-flex items-center gap-2 justify-center">
              Try the Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/architecture" className="border border-white/40 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-all text-sm inline-flex items-center gap-2 justify-center">
              See How It Works
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
