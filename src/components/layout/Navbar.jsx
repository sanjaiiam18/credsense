"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoMode } from "@/components/providers/DemoModeProvider";
import { Play, Square, BarChart2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { href: "/", label: "Problem" },
  { href: "/processing", label: "AI Engine" },
  { href: "/results", label: "Results" },
  { href: "/explainability", label: "Explain AI" },
  { href: "/simulator", label: "Simulator" },
  { href: "/architecture", label: "How It Works" },
  { href: "/impact", label: "Impact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDemoMode, startDemo, stopDemo, countdown, demoFlow, demoStep } = useDemoMode();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
            <BarChart2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight" style={{fontFamily:"'Poppins',sans-serif"}}>
            Cred<span className="text-amber-500">Sense</span>
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400 border border-slate-200 rounded-full px-2 py-0.5 ml-1">SME</span>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${ pathname === item.href ? "bg-amber-50 text-amber-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Demo mode controls */}
        <div className="flex items-center gap-2">
          {isDemoMode && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-full px-3 py-1 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Demo · {demoFlow[demoStep]?.label}</span>
              <span className="font-mono text-amber-600 font-semibold">{countdown}s</span>
            </div>
          )}
          {isDemoMode ? (
            <button
              onClick={stopDemo}
              className="flex items-center gap-1.5 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 rounded-full px-4 py-1.5 hover:bg-red-100 transition-all"
            >
              <Square className="w-3 h-3" /> Stop
            </button>
          ) : (
            <button
              onClick={startDemo}
              className="flex items-center gap-1.5 text-xs font-semibold bg-amber-500 text-white rounded-full px-4 py-1.5 hover:bg-amber-600 transition-all shadow-sm"
            >
              <Play className="w-3 h-3" /> Demo Mode
            </button>
          )}
        </div>
      </div>

      {/* Demo progress bar */}
      <AnimatePresence>
        {isDemoMode && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 - countdown / (demoFlow[demoStep]?.duration / 1000 || 1) }}
            style={{ transformOrigin: "left" }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-blue-400"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
