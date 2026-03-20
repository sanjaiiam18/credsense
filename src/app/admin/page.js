"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Search, MoreHorizontal, CheckCircle2, AlertTriangle, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "USR-001", name: "Alex Chen", score: 785, risk: "Low", defaultProb: "2.1%", status: "Approved" },
  { id: "USR-002", name: "Sarah Jenkins", score: 620, risk: "Medium", defaultProb: "12.4%", status: "Review" },
  { id: "USR-003", name: "Marcus Rossi", score: 480, risk: "High", defaultProb: "28.9%", status: "Declined" },
  { id: "USR-004", name: "Priya Patel", score: 810, risk: "Low", defaultProb: "0.8%", status: "Approved" },
  { id: "USR-005", name: "James Wilson", score: 550, risk: "High", defaultProb: "18.2%", status: "Fraud Risk" },
];

export default function AdminPage() {
  const [filter, setFilter] = useState("All");

  const filteredUsers = filter === "All" 
    ? mockUsers 
    : mockUsers.filter(u => u.risk === filter || u.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
            Admin View
          </h1>
          <p className="text-slate-500 mt-2 font-light">Batch risk analysis and fraud detection monitoring.</p>
        </div>
        <div className="glass-panel p-2 flex items-center gap-2">
          {["All", "Low", "High", "Fraud Risk"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm transition-all",
                filter === f ? "bg-slate-100 text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-slate-400">Total Analyzed</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-2">1,248</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-slate-400">High Risk Profiles</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-2">142 <TrendingDown className="inline w-4 h-4 text-emerald-500 ml-1"/> </p>
        </div>
        <div className="glass-panel p-6 relative overflow-hidden">
          <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-900/5" />
          <h3 className="text-sm font-medium text-slate-400">Fraud Alerts</h3>
          <p className="text-3xl font-semibold text-slate-900 mt-2">14</p>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
          <h2 className="text-lg font-medium text-slate-900">Application Queue</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" placeholder="Search profiles..." className="bg-slate-50 border border-slate-200 rounded-md pl-9 pr-4 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs tracking-wider text-slate-400 bg-white">
                <th className="p-4 font-medium">User / ID</th>
                <th className="p-4 font-medium">Credit Score</th>
                <th className="p-4 font-medium">Default Prob</th>
                <th className="p-4 font-medium">Risk Tier</th>
                <th className="p-4 font-medium">System Action</th>
                <th className="p-4 font-medium text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((user, idx) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-300/50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.id}</div>
                    </td>
                    <td className="p-4 font-mono">
                      <span className={user.score > 700 ? "text-blue-400" : user.score < 600 ? "text-rose-400" : "text-amber-500"}>
                        {user.score}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-500 text-sm">{user.defaultProb}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 w-max border",
                        user.risk === "Low" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        user.risk === "Medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      )}>
                        {user.risk === "Low" ? <CheckCircle2 className="w-3.5 h-3.5"/> : <AlertTriangle className="w-3.5 h-3.5"/>}
                        {user.risk}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.status === "Fraud Risk" ? (
                        <span className="flex items-center gap-1.5 text-xs text-rose-500 font-medium bg-rose-500/10 px-2.5 py-1 rounded-md w-max border border-rose-500/20">
                          <ShieldAlert className="w-3.5 h-3.5"/> Needs AML Review
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">{user.status}</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
