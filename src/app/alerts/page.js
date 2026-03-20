"use client";

import { motion } from "framer-motion";
import { Bell, ArrowUpRight, ArrowDownRight, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  { id: 1, type: "warning", title: "Unusual Spending Detected", message: "Your dining expenses increased by 45% compared to last month. This might temporarily impact your predictive savings score.", time: "2 hours ago", icon: AlertCircle },
  { id: 2, type: "danger", title: "Payment Delay Risk", message: "Your account balance is lower than your typical upcoming utility auto-pay schedule.", time: "1 day ago", icon: ArrowDownRight },
  { id: 3, type: "success", title: "Credit Utilization Improved", message: "Great job! You maintained a utilization ratio below 30% for 3 consecutive months.", time: "3 days ago", icon: ArrowUpRight },
  { id: 4, type: "insight", title: "Smart Suggestion", message: "Converting your ₹1,50,000 credit card debt into a personal loan could save you ₹3,500/mo in interest and boost your AI score by 15 pts.", time: "1 week ago", icon: Zap },
];

export default function AlertsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="mb-10 flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
            <Bell className="w-7 h-7 text-slate-500" /> Smart Alerts & Recommendations
          </h1>
          <p className="text-slate-500 mt-2 font-light">Personalized insights based on your financial behavior and predictive AI.</p>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, idx) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "glass-panel p-6 border-l-2 relative overflow-hidden",
              alert.type === "warning" ? "border-l-amber-500" :
              alert.type === "danger" ? "border-l-rose-500" :
              alert.type === "success" ? "border-l-emerald-500" :
              "border-l-blue-500"
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "p-2 rounded-lg border",
                alert.type === "warning" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                alert.type === "danger" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" :
                alert.type === "success" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                "bg-blue-500/10 text-blue-500 border-blue-500/20"
              )}>
                <alert.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 mt-0.5">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium text-slate-900">{alert.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">{alert.time}</span>
                </div>
                <p className="text-slate-500 mt-1 leading-relaxed text-sm font-light">{alert.message}</p>
                
                {alert.type === "insight" && (
                  <button className="mt-4 px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium transition-colors hover:bg-blue-600">
                    View Loan Options
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
