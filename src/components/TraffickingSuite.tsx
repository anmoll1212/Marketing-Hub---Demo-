import { useState } from "react";
import { Link, Copy, Check, CheckCircle2, RefreshCw, Layers, ShieldCheck } from "lucide-react";

export default function TraffickingSuite() {
  const [targetUrl, setTargetUrl] = useState("https://coderefine.io/start");
  const [utmSource, setUtmSource] = useState("linkedin");
  const [utmMedium, setUtmMedium] = useState("post-sponsored");
  const [utmCampaign, setUtmCampaign] = useState("saas_reviewer_launch");
  const [utmContent, setUtmContent] = useState("code_leaks_visual");
  const [copied, setCopied] = useState(false);

  // QA checklists state
  const [validations, setValidations] = useState([
    { id: "qa-1", checkName: "Verify Destination Link Live (Ping 200 OK)", details: "Validates website landing page load speed and SSL certificates.", passed: true, loading: false },
    { id: "qa-2", checkName: "Confirm Tracking Pixel Registration", details: "Ensures Google Analytics and Snowflake telemetry scripts respond to page views.", passed: true, loading: false },
    { id: "qa-3", checkName: "Image Specifications Fit Channel Criteria", details: "Assets fit constraints: e.g. PNG files max 4MB, precise ratios.", passed: false, loading: false },
    { id: "qa-4", checkName: "Confirm compliance disclosures match", details: "Verified FTC required labels and zero SEC flagged terms.", passed: true, loading: false }
  ]);

  const compiledUtm = `${targetUrl}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}${utmContent ? `&utm_content=${encodeURIComponent(utmContent)}` : ""}`;

  const triggerLinkValidation = (id: string) => {
    setValidations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, loading: true } : v))
    );

    setTimeout(() => {
      setValidations((prev) =>
        prev.map((v) => (v.id === id ? { ...v, loading: false, passed: !v.passed } : v))
      );
    }, 800);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(compiledUtm);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-205 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold">UTM Link Placement & Campaign QA Review</h2>
          <p className="text-slate-400 text-xs mt-0.5">Build trackable trafficking references and register campaign parameters securely.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column Dynamic UTM URL Builder */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Link className="w-4 h-4 text-indigo-500" />
              Automated UTM Generator
            </h3>
            <p className="text-[11px] text-slate-450 text-slate-400 mt-0.5">Assign custom tracking variables to monitor traffic returns.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-xs">
            {/* Target URL */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider">Destination Landing Page URL</label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://yourbrand.com/launch"
                className="w-full bg-slate-50 border border-slate-150 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Source */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider">Campaign Source</label>
                <input
                  type="text"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  placeholder="e.g. linkedin, twitter"
                  className="w-full bg-slate-50 border border-slate-150 rounded px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider">Campaign Medium</label>
                <input
                  type="text"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="e.g. sponsored_post, newsletter"
                  className="w-full bg-slate-50 border border-slate-150 rounded px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider">Campaign name</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="e.g. launch_june"
                  className="w-full bg-slate-50 border border-slate-150 rounded px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider">Campaign Content (Optional)</label>
                <input
                  type="text"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="e.g. code_leaks_visual"
                  className="w-full bg-slate-50 border border-slate-150 rounded px-3 py-2 text-xs focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Compiled code Block */}
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[10.5px] leading-relaxed break-all font-medium border border-slate-950 relative mt-4">
              <span className="text-indigo-400 font-bold block text-[8px] uppercase tracking-wider mb-1 font-sans">Compiled Campaign Link:</span>
              {compiledUtm}
            </div>

            <button
              onClick={copyUrl}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded shadow-sm hover:bg-slate-800 transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-450 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied Campaign Link" : "Copy Compiled Link"}
            </button>
          </form>
        </div>

        {/* Right Column Validation Checklist */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-500 animate-pulse" />
              Trafficking QA Checklist
            </h3>
            <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded font-mono uppercase font-bold">
              SYSTEM VALIDATOR
            </span>
          </div>

          <div className="space-y-3">
            {validations.map((v) => (
              <div key={v.id} className="bg-slate-50 border border-slate-150 p-3.5 rounded-lg flex items-center justify-between gap-4 text-xs">
                <div className="space-y-1 max-w-[80%]">
                  <span className="font-bold text-slate-800 text-xs block">{v.checkName}</span>
                  <p className="text-[11px] text-slate-505 text-slate-500 leading-normal font-sans">{v.details}</p>
                </div>

                <button
                  onClick={() => triggerLinkValidation(v.id)}
                  disabled={v.loading}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold border transition ${
                    v.loading
                      ? "bg-slate-105 border-slate-200 text-slate-500 cursor-wait"
                      : v.passed
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                      : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-emerald-50"
                  }`}
                >
                  {v.loading ? "Testing..." : v.passed ? "✔ Passed" : "⚠ Review"}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3.5 text-xs text-indigo-900 leading-relaxed font-sans mt-3">
            <span className="font-bold block text-indigo-950 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-indigo-650" /> UTM Registration Sync Details:
            </span>
            Once validations have cleared and URLs are trafficked to active feeds, our telemetry services log user clicks and conversions in real-time, matching traffic signals to their designated source attributes.
          </div>
        </div>
      </div>
    </div>
  );
}
