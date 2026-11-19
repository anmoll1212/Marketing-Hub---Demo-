import { useState } from "react";
import { Search, Database, RefreshCw, Cpu, Check, HelpCircle, Info, Sliders, TrendingUp, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function PlanningIntelligence() {
  const [nlQuery, setNlQuery] = useState("Summarize ROAS metrics for US campaigns using the physical partitioned Google Ads statistics");
  const [sqlTranslation, setSqlTranslation] = useState<string>(
    "SELECT event_date, SUM(conversions) AS conversions, SUM(spend_usd) AS spend, SUM(revenue_usd)/SUM(spend_usd) AS ROAS FROM `marketing_intelligence.ws3_flattened_campaign_intel` WHERE event_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 14 DAY) GROUP BY 1 ORDER BY 1 DESC;"
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [agentType, setAgentType] = useState<"gcp" | "snowflake">("snowflake");

  // Budget Sliders for Rent-A-Center Brands & Channels
  const [budgets, setBudgets] = useState({
    email: 1800,
    web: 4200,
    social: 9500,
    sms: 1200,
  });

  const [selectedBrand, setSelectedBrand] = useState<"RAC" | "GIN" | "HC" | "PL">("RAC");

  const totalSpend = budgets.email + budgets.web + budgets.social + budgets.sms;

  const calculatedImpressions = Math.floor(
    (budgets.email * 7.5) + (budgets.web * 16.2) + (budgets.social * 28.5) + (budgets.sms * 4.2)
  );
  const calculatedClicks = Math.floor(
    (budgets.email * 0.38) + (budgets.web * 1.35) + (budgets.social * 3.42) + (budgets.sms * 0.85)
  );
  const predictedRoas = (
    ((budgets.email * 3.4) + (budgets.web * 5.6) + (budgets.social * 5.1) + (budgets.sms * 1.95)) /
    (totalSpend || 1)
  ).toFixed(2);

  const translateQuery = () => {
    setIsTranslating(true);
    setTimeout(() => {
      const q = nlQuery.toLowerCase();
      if (q.includes("roas") || q.includes("return") || q.includes("revenue")) {
        setSqlTranslation(
          "SELECT BRAND, SUM(revenue_usd) / SUM(spend_usd) as ROAS \nFROM `marketing_intelligence.ws3_flattened_campaign_intel` \nWHERE event_date >= '2026-05-01' \nGROUP BY 1 \nORDER BY ROAS DESC;"
        );
      } else if (q.includes("google") || q.includes("ads") || q.includes("stats")) {
        setSqlTranslation(
          "SELECT keyword, SUM(clicks) as clicks, SUM(spend_usd) as cost \nFROM `google_ads_RAC.p_ads_BasicStats` \nWHERE event_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) \nGROUP BY 1 \nHAVING clicks > 100 \nORDER BY cost DESC;"
        );
      } else if (q.includes("doubleclick") || q.includes("dcm") || q.includes("rich_media")) {
        setSqlTranslation(
          "SELECT campaign_name, SUM(clicks) as total_clicks \nFROM `rac_dcm_rpt_ext.rac_prfm_rpt_bq` \nGROUP BY 1 \nORDER BY 2 DESC;"
        );
      } else {
        setSqlTranslation(
          "SELECT event_date, region, brand, SUM(conversions) as total_conv \nFROM `marketing_intelligence.ws3_flattened_campaign_intel` \nGROUP BY 1, 2, 3 \nORDER BY 1 DESC \nLIMIT 50;"
        );
      }
      setIsTranslating(false);
    }, 850);
  };

  const predictiveChartData = [
    { name: "Week 1", email: budgets.email * 0.22, web: budgets.web * 0.18, social: budgets.social * 0.19, sms: budgets.sms * 0.22 },
    { name: "Week 2", email: budgets.email * 0.24, web: budgets.web * 0.22, social: budgets.social * 0.26, sms: budgets.sms * 0.25 },
    { name: "Week 3", email: budgets.email * 0.26, web: budgets.web * 0.28, social: budgets.social * 0.27, sms: budgets.sms * 0.28 },
    { name: "Week 4", email: budgets.email * 0.28, web: budgets.web * 0.32, social: budgets.social * 0.28, sms: budgets.sms * 0.25 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold flex items-center gap-1.5 font-sans">
            <Cpu className="w-5 h-5 text-indigo-650 text-indigo-600" />
            WS3 Planning Intelligence & Cross-Cloud Warehousing
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Synchronizes active GA4 queries, direct Google Ads transfer partitions, and physical DoubleClick logs.
          </p>
        </div>

        {/* Brand & Cloud Agent Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Brand select */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs text-slate-850 font-bold">
            <button
              onClick={() => setSelectedBrand("RAC")}
              className={`px-2 py-1 rounded transition ${selectedBrand === "RAC" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"}`}
            >
              RAC
            </button>
            <button
              onClick={() => setSelectedBrand("GIN")}
              className={`px-2 py-1 rounded transition ${selectedBrand === "GIN" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"}`}
            >
              GIN
            </button>
            <button
              onClick={() => setSelectedBrand("HC")}
              className={`px-2 py-1 rounded transition ${selectedBrand === "HC" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"}`}
            >
              HC
            </button>
            <button
              onClick={() => setSelectedBrand("PL")}
              className={`px-2 py-1 rounded transition ${selectedBrand === "PL" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500"}`}
            >
              PL
            </button>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setAgentType("snowflake")}
              className={`px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition ${
                agentType === "snowflake" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              ❄️ Snowflake Cortex (Agent)
            </button>
            <button
              onClick={() => setAgentType("gcp")}
              className={`px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition ${
                agentType === "gcp" ? "bg-white text-slate-800 shadow-xs" : "text-slate-550 text-slate-500 hover:text-slate-800"
              }`}
            >
              ☁️ GCP BigQuery (Agent)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Natural Language SQL Translator */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5 lg:col-span-1">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-slate-500" />
              NL Database Query Engine
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">Compile raw English queries directly down to matching database models.</p>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <label className="text-xs font-bold text-slate-700 block">Natural Language Prompt</label>
            <div className="relative">
              <textarea
                value={nlQuery}
                onChange={(e) => setNlQuery(e.target.value)}
                placeholder="Ask about competitor share, roas anomalies, or BasicStats click history..."
                rows={3}
                className="w-full bg-white border border-slate-200 p-3 pr-8 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-650 resize-none font-sans"
              />
              <button
                onClick={translateQuery}
                disabled={isTranslating}
                className="absolute right-2.5 bottom-3 p-1.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-right">
              <button
                onClick={translateQuery}
                disabled={isTranslating}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-805 cursor-pointer"
              >
                Generate SQL Translation
              </button>
            </div>

            {/* Compiled SQL Output */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block tracking-wider">
                SQL AST ({agentType === "snowflake" ? "Snowflake SQL" : "BigQuery Partition SQL"})
              </span>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[10px] leading-relaxed break-all font-medium border border-slate-950 relative">
                {isTranslating ? (
                  <span className="flex items-center gap-1.5 text-slate-400 italic font-sans animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" /> Compiling schema attributes...
                  </span>
                ) : (
                  sqlTranslation
                )}
              </div>
            </div>

            {/* Zero Egress Safety Warning Banner */}
            <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-lg space-y-1.5 text-[11px] text-indigo-850 leading-relaxed font-sans mt-3">
              <span className="text-indigo-950 font-bold flex items-center gap-1">
                🛡️ Zero-Egress Safety Network Active
              </span>
              {agentType === "snowflake" ? (
                <p className="text-indigo-800 text-xs">
                  Snowflake Cortex queries run within the security perimeter. This avoids data-egress weight and enforces fuzzy matching on normalized campaign dimensions.
                </p>
              ) : (
                <p className="text-indigo-800 text-xs">
                  Utilizes GCP Data Science Agents executing partitioned BigQuery operations over Rent-A-Center datasets.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Scenario budget planner with charts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-500" />
                Scenario Budget Allocator ({selectedBrand === "RAC" ? "Rent-A-Center" : selectedBrand})
              </h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Drag individual channel parameters around to simulate model forecast metrics.</p>
            </div>

            <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded font-bold font-mono">
              Total Flight Budget: ${totalSpend.toLocaleString()} USD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Control Sliders */}
            <div className="space-y-4 text-xs">
              {/* Email */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Custom CRM / Email Outreach</span>
                  <span className="font-mono text-slate-500 font-bold">${budgets.email}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="12000"
                  step="100"
                  value={budgets.email}
                  onChange={(e) => setBudgets({ ...budgets, email: parseInt(e.target.value) })}
                  className="w-full h-1.5 accent-indigo-655 rounded bg-slate-100 cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Web */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Web Landing promotional conversions</span>
                  <span className="font-mono text-slate-500 font-bold">${budgets.web}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="100"
                  value={budgets.web}
                  onChange={(e) => setBudgets({ ...budgets, web: parseInt(e.target.value) })}
                  className="w-full h-1.5 accent-indigo-655 rounded bg-slate-100 cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Social */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Paid Social amplification matches</span>
                  <span className="font-mono text-slate-500 font-bold">${budgets.social}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="35000"
                  step="200"
                  value={budgets.social}
                  onChange={(e) => setBudgets({ ...budgets, social: parseInt(e.target.value) })}
                  className="w-full h-1.5 accent-indigo-655 rounded bg-slate-100 cursor-pointer accent-indigo-600"
                />
              </div>

              {/* SMS */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">SMS Direct Promotions</span>
                  <span className="font-mono text-slate-500 font-bold">${budgets.sms}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={budgets.sms}
                  onChange={(e) => setBudgets({ ...budgets, sms: parseInt(e.target.value) })}
                  className="w-full h-1.5 accent-indigo-655 rounded bg-slate-100 cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Calculations Grid & Recharts Preview Area */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-150 p-4 rounded-xl text-center text-[10px]">
                <div>
                  <span className="text-slate-400 uppercase font-bold block">Model Impressions</span>
                  <span className="font-mono text-slate-800 font-bold text-xs">{calculatedImpressions.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold block">Model clicks</span>
                  <span className="font-mono text-emerald-600 font-bold text-xs">{calculatedClicks.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold block">Model ROAS</span>
                  <span className="font-mono text-indigo-600 font-bold text-xs">{predictedRoas}x</span>
                </div>
              </div>

              {/* Small Area Chart predicting growth weeks */}
              <div className="h-32 w-full font-mono text-[9px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={predictiveChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={9} />
                    <YAxis stroke="#94A3B8" fontSize={9} />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Area type="monotone" dataKey="social" stackId="1" stroke="#4f46e5" fill="#c7d2fe" />
                    <Area type="monotone" dataKey="web" stackId="1" stroke="#10b981" fill="#a7f3d0" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Structured RAC Data Origins Breakdown */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner space-y-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-500" />
            Rent-A-Center (RAC) Physical Datasets & Pipeline Origins
          </h4>
          <p className="text-slate-400 text-xs mt-0.5">
            Understand exactly which tables are being queried by the AI agent during downstream reporting and planning cycles:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans leading-relaxed">
          {/* GA4 Core */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="bg-blue-50 text-blue-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-blue-105 block w-max">
              GA4 raw logging streams
            </span>
            <span className="font-bold text-slate-800 block">GA4 Event Datasets</span>
            <p className="text-slate-500 text-xs">
              Queries target physical table <strong className="font-mono text-slate-900">Analytics_267956618</strong> (rent-a-center events). Custom sub-brand configurations parse corresponding properties for GIN (get-it-now) and HC (home-choice).
            </p>
          </div>

          {/* DoubleClick logs */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="bg-purple-50 text-purple-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-purple-105 block w-max">
              rac_dcm_rpt_ext
            </span>
            <span className="font-bold text-slate-800 block">DoubleClick Campaign Logs</span>
            <p className="text-slate-500 text-xs">
              Nightly summary aggregates compile thousands of rows from <strong className="font-mono text-slate-900">rich_media_510001</strong> into clean user action matrices via the <strong className="font-mono text-slate-900">rac_prfm_rpt_bq</strong> pipeline table.
            </p>
          </div>

          {/* Google Ads */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-105 block w-max">
              google_ads_RAC
            </span>
            <span className="font-bold text-slate-800 block">Google Ads Transfer Views</span>
            <p className="text-slate-500 text-xs">
              Optimized using physical partitioned <strong className="font-mono text-slate-900">p_ads_</strong> tables categorized by suffix types: BasicStats (cost/clicks), ConversionStats (revenue), and NonClickStats (impressions).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
