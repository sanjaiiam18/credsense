"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, FastForward, PlayCircle, Settings2 } from "lucide-react";

export default function SimulatorPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(36);
  const [baseScore, setBaseScore] = useState(720);
  
  // What-if parameters
  const [simIncome, setSimIncome] = useState(0); // percentage increase
  const [simDebt, setSimDebt] = useState(0); // percentage reduction

  // Calculated values
  const [simulatedScore, setSimulatedScore] = useState(baseScore);
  const [approvalProb, setApprovalProb] = useState(85);
  const [interestRate, setInterestRate] = useState(6.5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    // Dynamic recalculation simulation
    const newScore = baseScore + (simIncome * 1.5) + (simDebt * 2);
    setSimulatedScore(Math.min(900, Math.floor(newScore)));
    
    // Approval Probability
    let prob = 50 + ((newScore - 600) / 300) * 45;
    if (loanAmount > 2500000) prob -= 10;
    if (tenure > 60) prob -= 5;
    setApprovalProb(Math.min(99, Math.max(5, Math.floor(prob))));

    // Interest Rate
    let rate = 12.5 - ((newScore - 500) / 400) * 8;
    setInterestRate(Math.max(4.5, rate));

    // EMI Calculation
    const principal = loanAmount;
    const ratePerMonth = (rate / 100) / 12;
    const noOfMonths = tenure;
    const emiValue = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, noOfMonths)) / (Math.pow(1 + ratePerMonth, noOfMonths) - 1);
    setEmi(Math.round(emiValue));

  }, [loanAmount, tenure, simIncome, simDebt, baseScore]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
          <Calculator className="w-7 h-7 text-slate-500" /> Loan Eligibility Simulator
        </h1>
        <p className="text-slate-500 mt-2 font-light">Interact with parameters to see real-time AI approval probability and dynamic pricing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-6">Loan Requirements</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Loan Amount</span>
                  <span className="text-slate-900 font-medium">₹{loanAmount.toLocaleString("en-IN")}</span>
                </div>
                <input 
                  type="range" min="50000" max="5000000" step="50000" 
                  value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-primary bg-slate-200 rounded-lg h-1.5" 
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹50k</span><span>₹50L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Tenure (Months)</span>
                  <span className="text-slate-900 font-medium">{tenure} months</span>
                </div>
                <input 
                  type="range" min="12" max="84" step="12" 
                  value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-primary bg-slate-200 rounded-lg h-1.5" 
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>12m</span><span>84m</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
            <h2 className="text-lg font-medium text-slate-900 mb-2 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-slate-500" /> "What-If" Analysis
            </h2>
            <p className="text-sm text-slate-400 mb-6 font-light">Simulate behavioral changes to see impact.</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Increase Income</span>
                  <span className="text-slate-600 font-medium">+{simIncome}%</span>
                </div>
                <input 
                  type="range" min="0" max="50" step="5" 
                  value={simIncome} onChange={(e) => setSimIncome(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-200 rounded-lg h-1.5" 
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Reduce Debt/Credit Card</span>
                  <span className="text-slate-600 font-medium">-{simDebt}%</span>
                </div>
                <input 
                  type="range" min="0" max="50" step="5" 
                  value={simDebt} onChange={(e) => setSimDebt(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-200 rounded-lg h-1.5" 
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 text-center h-full flex flex-col justify-center">

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-sm text-slate-500 mb-1">Approval Probability</p>
                <div className="text-5xl font-semibold" style={{ color: approvalProb > 75 ? '#34d399' : approvalProb > 50 ? '#fbbf24' : '#ef4444' }}>
                  {approvalProb}%
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Projected Credit Score</p>
                <div className="text-5xl font-semibold text-slate-900">
                  {simulatedScore}
                  {simulatedScore > baseScore && <span className="text-base text-emerald-400 ml-2 align-top">↑{simulatedScore - baseScore}</span>}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-sm text-slate-500">Dynamic Interest Rate</p>
                <p className="text-2xl font-semibold text-slate-900">{interestRate.toFixed(2)}% <span className="text-sm font-normal text-slate-400">APR</span></p>
              </div>
              <div className="text-left border-l border-slate-200 pl-6">
                <p className="text-sm text-slate-500">Estimated EMI</p>
                <p className="text-2xl font-semibold text-slate-900">₹{emi.toLocaleString("en-IN")} <span className="text-sm font-normal text-slate-400">/mo</span></p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-slate-100 hover:bg-white/15 text-slate-900 border border-slate-200 px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors text-sm">
                <FastForward className="w-4 h-4" /> Export Pre-Approval
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
