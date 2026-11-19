import { useState } from "react";
import { ShieldAlert, Check, Copy, RefreshCw, Sparkles, HelpCircle, AlertTriangle } from "lucide-react";

interface FlagedRule {
  id: string;
  ruleCategory: string;
  prohibitedTerm: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  reason: string;
}

export default function ComplianceTester() {
  const [inputText, setInputText] = useState(
    "🚨 CodeRefine represents a cheap, hackerproof companion guaranteeing a flawless staging integration with zero bugs! Buy our certified stock options now for high moon profits."
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [violations, setViolations] = useState<FlagedRule[]>([]);
  const [rewriteSuggestion, setRewriteSuggestion] = useState("");
  const [copied, setCopied] = useState(false);

  // Hardcoded screening rules
  const scanContentRules = () => {
    setIsScanning(true);
    setScanned(false);
    setTimeout(() => {
      const detected: FlagedRule[] = [];
      const lower = inputText.toLowerCase();

      if (lower.includes("guarantee") || lower.includes("guaranteeing")) {
        detected.push({
          id: "rule-1",
          ruleCategory: "FTC Standards - Substantiated Claims",
          prohibitedTerm: "guaranteeing / flawless",
          severity: "High",
          reason: "Marketing copy cannot claim bulletproof certainty or guarantees of flawless code integration without extensive audited datasets."
        });
      }
      if (lower.includes("cheap")) {
        detected.push({
          id: "rule-2",
          ruleCategory: "Brand Identity - Wordblock guideline",
          prohibitedTerm: "cheap",
          severity: "Low",
          reason: "The word 'cheap' degrades the enterprise-tier profile values configured in the Brand DNA guides."
        });
      }
      if (lower.includes("hackerproof")) {
        detected.push({
          id: "rule-3",
          ruleCategory: "Information Security compliance",
          prohibitedTerm: "hackerproof",
          severity: "Critical",
          reason: "Infosec regulations dictate warning statements against using terms claiming absolute protection from external systems."
        });
      }
      if (lower.includes("stock options") || lower.includes("profits") || lower.includes("moon")) {
        detected.push({
          id: "rule-4",
          ruleCategory: "SEC Regulations - Financial Solicitations",
          prohibitedTerm: "stock options / moon profits",
          severity: "Critical",
          reason: "Prohibited solicitation of speculative assets or investment options within unvetted marketing copy."
        });
      }

      setViolations(detected);

      // Create a nice compliant rewrite suggestion
      let rewrite = inputText;
      rewrite = rewrite.replace(/cheap/gi, "cost-effective");
      rewrite = rewrite.replace(/hackerproof/gi, "robust, zero-trust and highly audit-compliant");
      rewrite = rewrite.replace(/guaranteeing a flawless staging integration with zero bugs/gi, "designed to significantly minimize staging regressions and streamline code integration speed");
      rewrite = rewrite.replace(/Buy our certified stock options now for high moon profits\./gi, "Schedule a professional consultation with our security architects today.");
      setRewriteSuggestion(rewrite);

      setIsScanning(false);
      setScanned(true);
    }, 1100);
  };

  const copyRewrite = () => {
    navigator.clipboard.writeText(rewriteSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const getSeverityBadge = (sev: "Low" | "Medium" | "High" | "Critical") => {
    switch (sev) {
      case "Critical":
        return "bg-rose-100 text-rose-800 border border-rose-300 uppercase px-2 py-0.5 rounded text-[10px] font-bold";
      case "High":
        return "bg-orange-100 text-orange-850 border border-orange-300 uppercase px-2 py-0.5 rounded text-[10px] font-bold";
      case "Medium":
        return "bg-amber-100 text-amber-800 border border-amber-300 uppercase px-2 py-0.5 rounded text-[10px] font-bold";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-300 uppercase px-2 py-0.5 rounded text-[10px] font-bold";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold">Automated Copy Compliance Pre-Screening</h2>
          <p className="text-slate-400 text-xs mt-0.5">Scans generated social layouts against FTC disclaimers, brand keyword blocks, and regulatory restrictions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column Input Textbox & violations list */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">Ad Content Screen Tester</label>
              <span className="text-slate-400 font-mono text-[10px] font-semibold">{inputText.length} chars</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Paste social copy mockups or marketing text details here to test..."
              className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white resize-none font-sans"
            />

            <div className="text-right">
              <button
                onClick={scanContentRules}
                disabled={isScanning || !inputText.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-1.5 ml-auto transition active:scale-95 disabled:opacity-50"
              >
                <ShieldAlert className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? "Evaluating Policy Rules..." : "Scan Ad Content Compliance"}
              </button>
            </div>
          </div>

          {/* Evaluation findings feed */}
          {scanned && (
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Compliance Risks Identified ({violations.length})
              </h3>

              {violations.length === 0 ? (
                <div className="py-6 text-center text-emerald-650 text-emerald-600 text-xs font-bold flex flex-col items-center gap-2">
                  <Check className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 p-1.5" />
                  Conforms with configured SEC, FTC and corporate policies!
                </div>
              ) : (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {violations.map((v) => (
                    <div key={v.id} className="bg-slate-50 border border-slate-150 p-3.5 rounded-lg space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-850 text-slate-800 block text-xs truncate max-w-[60%]">{v.ruleCategory}</span>
                        {getSeverityBadge(v.severity)}
                      </div>
                      <p className="text-slate-505 text-slate-500 leading-relaxed font-sans font-medium">
                        Prohibited Term: <strong className="text-rose-600 font-mono text-[11px]">&ldquo;{v.prohibitedTerm}&rdquo;</strong>. {v.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column Compliance Rewriter suggestions */}
        <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 shadow-sm min-h-[380px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Compliant Rewrite Suggestion
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-mono font-bold px-1.5 rounded">FTC APPROVED STYLE</span>
            </div>

            {scanned ? (
              <div className="space-y-4">
                <p className="bg-white border border-slate-202 bg-white rounded-lg p-3.5 text-xs text-slate-700 font-normal leading-relaxed whitespace-pre-line border-slate-200">
                  {rewriteSuggestion}
                </p>
                <div className="bg-indigo-50/40 border border-indigo-100 p-3 rounded-lg text-[11px] text-indigo-900 leading-relaxed">
                  <span className="font-bold block text-indigo-950">Substituted keywords:</span>
                  1. &ldquo;Hackerproof&rdquo; converted to &ldquo;robust and highly audit-compliant&rdquo; to protect product guarantee integrity. <br />
                  2. Financial solicitations regarding &ldquo;stock options&rdquo; translated to consultation schedule.
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 text-xs font-semibold leading-relaxed max-w-sm mx-auto">
                Trigger a scan on the left pane. Our automated rewriter will instantly rewrite policy violations to keep brand safety tags perfectly validated.
              </div>
            )}
          </div>

          {scanned && (
            <div className="pt-4 border-t border-slate-200 text-right mt-4">
              <button
                onClick={copyRewrite}
                className="w-full px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied compliant text" : "Copy Compliant Alternative"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
