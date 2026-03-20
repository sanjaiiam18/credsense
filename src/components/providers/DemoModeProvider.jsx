"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const DemoModeContext = createContext();

export function useDemoMode() {
  return useContext(DemoModeContext);
}

export function DemoModeProvider({ children }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const flow = [
    "/",
    "/input",
    "/dashboard",
    "/simulator",
    "/explainability",
    "/admin",
    "/alerts"
  ];

  useEffect(() => {
    let timer;
    if (isDemoMode) {
      timer = setInterval(() => {
        const currentIndex = flow.indexOf(pathname);
        const nextIndex = (currentIndex + 1) % flow.length;
        router.push(flow[nextIndex]);
      }, 25000); // Navigate every 25 seconds
    }

    return () => clearInterval(timer);
  }, [isDemoMode, pathname, router]);

  return (
    <DemoModeContext.Provider value={{ isDemoMode, setIsDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
}
