"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useDemoMode } from "../providers/DemoModeProvider";
import { cn } from "@/lib/utils";
import { Play, Square, Activity } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { isDemoMode, setIsDemoMode } = useDemoMode();

  const links = [
    { name: "Home", href: "/" },
    { name: "Input", href: "/input" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Simulator", href: "/simulator" },
    { name: "Explain AI", href: "/explainability" },
    { name: "Alerts", href: "/alerts" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-slate-300/40 rounded-none bg-slate-50/80 backdrop-blur-xl transition-all h-16 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Activity className="text-primary w-5 h-5" />
          </div>
          <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
            CredSense <span className="text-slate-500 font-normal text-sm border border-slate-200 px-2 py-0.5 rounded-full bg-slate-50">AI</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900",
                  isActive ? "text-slate-900" : "text-slate-500"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-slate-100 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Demo Mode Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all border",
              isDemoMode
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-transparent border-slate-200 text-slate-500 hover:text-slate-900 hover:border-gray-500"
            )}
            title="Toggle Auto-Navigation Demo Mode"
          >
            {isDemoMode ? (
              <>
                <Square className="w-3 h-3 fill-current" /> Demo Off
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" /> Demo Mode
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
