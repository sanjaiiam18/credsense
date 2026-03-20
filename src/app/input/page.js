"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileJson, CheckCircle2, ChevronRight, User, Wallet, Smartphone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InputPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("manual");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center border-b border-slate-200 pb-8"
      >
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">Provide Evaluation Data</h1>
        <p className="text-slate-500 font-light max-w-2xl mx-auto">
          CredSense AI requires holistic data covering traditional financial behavior and alternative markers. Enter details manually or upload a data payload.
        </p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <div className="glass-panel p-1 inline-flex gap-1 rounded-lg">
          <button
            onClick={() => setActiveTab("manual")}
            className={cn(
              "px-6 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === "manual" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-900"
            )}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={cn(
              "px-6 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === "upload" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-900"
            )}
          >
            Batch Upload (JSON/CSV)
          </button>
        </div>
      </div>

      {activeTab === "manual" && (
        <motion.form 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleAnalyze} 
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Age</label>
                  <input type="number" defaultValue={28} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Employment Status</label>
                  <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors">
                    <option>Full-Time Employed</option>
                    <option>Self-Employed / Freelance</option>
                    <option>Student</option>
                    <option>Unemployed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Behavior */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" /> Financial Behavior
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Monthly Income (₹)</label>
                  <input type="number" defaultValue={5200} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Savings Ratio (%)</label>
                  <input type="number" defaultValue={25} className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>

            {/* Alternative Data */}
            <div className="glass-panel p-6 md:col-span-2">
              <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" /> Alternative Risk Markers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Mobile Recharge Pattern</label>
                  <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors">
                    <option>Consistent (Postpaid/Auto)</option>
                    <option>Irregular (Prepaid/Delayed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Utility Bill Timeliness</label>
                  <select className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors">
                    <option>Always On Time</option>
                    <option>1-15 Days Late</option>
                    <option>Frequently Late</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Social Trust Score (Mock)</label>
                  <input type="number" defaultValue={85} min="0" max="100" className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-all"
            >
              {isAnalyzing ? (
                <>Analyzing Parameters... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Building2 className="w-4 h-4" /></motion.div></>
              ) : (
                <>Run AI Analysis <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </motion.form>
      )}

      {activeTab === "upload" && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-12 text-center"
        >
          {uploadSuccess ? (
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <CheckCircle2 className="w-20 h-20 text-emerald-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Data Processed Successfully</h3>
              <p className="text-slate-500 mb-8 font-light">payload_user_9921.json loaded with 450 data points.</p>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-all"
              >
                {isAnalyzing ? "Processing..." : "View Dashboard Insights"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-6">
                <FileJson className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">Upload Data Payload</h3>
              <p className="text-sm text-slate-500 mb-8 font-light">
                Drop your JSON or CSV file containing raw customer metrics, banking APIs transactions, and alternative indicators.
              </p>
              <div className="border border-dashed border-slate-300 rounded-xl p-8 bg-white mb-6">
                <p className="text-slate-400 text-sm">Drag & drop files here, or</p>
                <div className="mt-4">
                  <button 
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {isUploading ? "Uploading Data..." : "Browse Files"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
