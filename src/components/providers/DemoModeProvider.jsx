"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const DemoContext = createContext();

export function useDemoMode() {
  return useContext(DemoContext);
}

// Pages in order with their dwell times (ms) — total: 185s = 3 min 5 sec
const DEMO_FLOW = [
  { path: "/",              duration: 27000, label: "Problem & Input" },
  { path: "/processing",   duration: 22000, label: "AI Processing" },
  { path: "/results",      duration: 32000, label: "Results" },
  { path: "/explainability", duration: 27000, label: "Explainability" },
  { path: "/simulator",    duration: 22000, label: "Simulator" },
  { path: "/architecture", duration: 22000, label: "Architecture" },
  { path: "/impact",       duration: 33000, label: "Impact" },
];

export function DemoModeProvider({ children }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [inputData, setInputData] = useState(null);
  const [creditResult, setCreditResult] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const stopDemo = useCallback(() => {
    setIsDemoMode(false);
    clearTimeout(timerRef.current);
    clearInterval(countdownRef.current);
  }, []);

  const navigateToStep = useCallback((stepIndex) => {
    const step = DEMO_FLOW[stepIndex];
    setDemoStep(stepIndex);
    setCountdown(Math.round(step.duration / 1000));
    router.push(step.path);
  }, [router]);

  useEffect(() => {
    if (!isDemoMode) {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
      return;
    }

    const currentIdx = DEMO_FLOW.findIndex(s => s.path === pathname);
    if (currentIdx === -1) return;

    const step = DEMO_FLOW[currentIdx];

    // Start countdown
    setCountdown(Math.round(step.duration / 1000));
    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    // Schedule next navigation
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextIdx = (currentIdx + 1) % DEMO_FLOW.length;
      navigateToStep(nextIdx);
    }, step.duration);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [isDemoMode, pathname, navigateToStep]);

  const startDemo = useCallback(() => {
    setIsDemoMode(true);
    navigateToStep(0);
  }, [navigateToStep]);

  return (
    <DemoContext.Provider value={{
      isDemoMode,
      setIsDemoMode,
      startDemo,
      stopDemo,
      demoStep,
      demoFlow: DEMO_FLOW,
      inputData,
      setInputData,
      creditResult,
      setCreditResult,
      countdown,
    }}>
      {children}
    </DemoContext.Provider>
  );
}
