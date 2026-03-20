"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Zap, ShieldCheck, BarChart3, TrendingUp, Key } from "lucide-react";

export default function LandingPage() {
  const [score, setScore] = useState(400);

  useEffect(() => {
    // Animate credit score on load
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= 785) {
          clearInterval(interval);
          return 785;
        }
        return prev + 5;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-slate-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pb-32 lg:flex lg:px-8 lg:py-32 items-center">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mt-8 sm:mt-12 lg:mt-0">
              <a href="#" className="inline-flex space-x-4">
                <span className="rounded-md bg-slate-50 px-3 py-1 text-sm font-medium leading-6 text-slate-600 ring-1 ring-inset ring-white/10">
                  Latest Update
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-slate-500">
                  <span>Explainable AI Engine v2.0 released</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </span>
              </a>
            </div>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              Smarter Credit Decisions with AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-500 font-light">
              CredSense AI replaces outdated scoring models. We leverage alternative data and machine learning to predict default risk with unmatched precision, providing actionable insights for consumers and banks alike.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/input"
                className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary-dark transition-all flex items-center gap-2"
              >
                Start Analysis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/simulator" className="text-sm font-medium leading-6 text-slate-600 hover:text-slate-900 transition-colors">
                Loan Simulator <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual - Dynamic Credit Score */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 w-full lg:w-auto relative justify-center flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="glass-panel p-8 relative">
              <div className="text-center relative z-10">
                <h3 className="text-slate-500 font-medium text-xs tracking-widest uppercase mb-6">AI-Generated Credit Score</h3>
                <div className="flex items-end justify-center gap-2 mb-2">
                  <motion.span 
                    key={score}
                    initial={{ scale: 1.05, color: "#fafafa" }}
                    animate={{ scale: 1, color: score > 700 ? "#3b82f6" : "#fafafa" }}
                    className="text-7xl font-semibold tracking-tighter"
                  >
                    {score}
                  </motion.span>
                </div>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-full h-2 mb-6 mt-8 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: "20%" }}
                    animate={{ width: `${(score - 300) / 6}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="bg-primary h-2 rounded-full"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>300</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span className="text-primary">Excellent</span>
                  <span>900</span>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-200 flex gap-4 text-left">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Risk Profile</p>
                    <p className="text-emerald-500 font-medium flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5"/> Low Default</p>
                  </div>
                  <div className="flex-1 border-l border-slate-200 pl-4">
                    <p className="text-xs text-slate-400 mb-1">Data Points</p>
                    <p className="text-slate-900 font-medium flex items-center gap-1.5"><Brain className="w-3.5 h-3.5"/> 400+ Signals</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Deploy faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to underwrite better</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {[
              {
                name: "Alternative Data Processing",
                description: "Ingest mobile payments, utility bills, and social trust markers to score thin-file customers invisibly.",
                icon: Zap,
              },
              {
                name: "Explainable AI (XAI)",
                description: "No more black boxes. Every score comes with a feature-importance breakdown showing exactly why a decision was made.",
                icon: Key,
              },
              {
                name: "Predictive Default Risk",
                description: "Continuous monitoring detects subtle shifts in financial behavior long before a missed payment occurs.",
                icon: TrendingUp,
              },
            ].map((feature) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={feature.name} 
                className="flex flex-col glass-panel p-8"
              >
                <dt className="flex items-center gap-x-3 text-base font-medium leading-7 text-slate-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-md bg-slate-50 ring-1 ring-white/10">
                    <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-sm leading-7 text-slate-500 font-light">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
