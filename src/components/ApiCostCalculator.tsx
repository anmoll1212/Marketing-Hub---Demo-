import { useState } from "react";
import { Coins, Sliders, Calculator, Sparkles, TrendingUp, HelpCircle, ShieldCheck } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function ApiCostCalculator() {
  const [users, setUsers] = useState(15000);
  const [generations, setGenerations] = useState(8000);
  const [scans, setScans] = useState(4000);

  // Cost calculation constants (per unit metrics)
  const costPerUser = 0.005; // $0.005 per active user (auth & telemetry pixel)
  const costPerGeneration = 0.015; // $0.015 per LLM generation
  const costPerScan = 0.02; // $0.02 per compliance model call

  const userCost = users * costPerUser;
  const generationCost = generations * costPerGeneration;
  const scanCost = scans * costPerScan;
  const baseHostCost = 150; // Flat monthly hardware storage and container fees

  const totalCost = parseFloat((userCost + generationCost + scanCost + baseHostCost).toFixed(2));

  // Pie chart datasets
  const pieData = [
    { name: "MAU Telemetry", value: Math.round(userCost), color: "#3b82f6" },
    { name: "Gemini LLM Tokens", value: Math.round(generationCost), color: "#4f46e5" },
    { name: "Compliance Scanners", value: Math.round(scanCost), color: "#f59e0b" },
    { name: "Flat Core Infrastructure", value: baseHostCost, color: "#94a3b8" }
  ];

  // Bar chart datasets comparing volume vs cost ratios
  const barData = [
    { name: "Active Users", TargetVolume: users, ProjectedCost: Math.round(userCost) },
    { name: "Generations", TargetVolume: generations * 1.5, ProjectedCost: Math.round(generationCost) },
    { name: "Compliance Scans", TargetVolume: scans * 2, ProjectedCost: Math.round(scanCost) }
  ];

  // Area growth charts simulating targets at 1x, 2x, 3x scale volumes
  const areaData = [
    { scale: "1x Base", MAUTelemetry: Math.round(userCost), LLMTokens: Math.round(generationCost), FlatHosting: baseHostCost },
    { scale: "2.5x Growth", MAUTelemetry: Math.round(userCost * 2.5), LLMTokens: Math.round(generationCost * 2.5), FlatHosting: baseHostCost },
    { scale: "5x HyperScale", MAUTelemetry: Math.round(userCost * 5), LLMTokens: Math.round(generationCost * 5), FlatHosting: baseHostCost }
  ];

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-205 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold flex items-center gap-1.5">
            <Calculator className="w-5 h-5 text-indigo-600" />
            API & Compute running Cost Calculator
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">Project monthly Google Cloud workspace and LLM API costs interactively based on operational volume.</p>
        </div>

        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded inline-flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-indigo-600 animate-pulse" />
          Projected Total: ${totalCost.toLocaleString()} USD / month
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column interactive sliders */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-slate-500" />
              Volume Adjuster
            </h3>
            <p className="text-[11px] text-slate-450 text-slate-400 mt-0.5 font-medium">Configure scale variables to recalculate compute cost breakouts.</p>
          </div>

          <div className="space-y-5 font-sans text-xs">
            {/* User telemetry count slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Monthly Active Users (Telemetry)</span>
                <span className="font-mono text-indigo-650 text-indigo-650 font-bold">{users.toLocaleString()} MAUs</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={users}
                onChange={(e) => setUsers(parseInt(e.target.value))}
                className="w-full h-1.5 accent-indigo-600 bg-slate-100 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-450 text-slate-400 block font-normal">Tracking pixel events logged in BigQuery: ${userCost.toLocaleString()}</span>
            </div>

            {/* Content generations slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Generative Copy blocks (Gemini)</span>
                <span className="font-mono text-indigo-650 text-indigo-650 font-bold">{generations.toLocaleString()} blocks</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={generations}
                onChange={(e) => setGenerations(parseInt(e.target.value))}
                className="w-full h-1.5 accent-indigo-600 bg-slate-100 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-455 text-slate-400 block font-normal">Gemini tokens processed on servers: ${generationCost.toLocaleString()}</span>
            </div>

            {/* Compliance scans slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Compliance policy scans (Screener)</span>
                <span className="font-mono text-indigo-650 text-indigo-650 font-bold">{scans.toLocaleString()} scans</span>
              </div>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={scans}
                onChange={(e) => setScans(parseInt(e.target.value))}
                className="w-full h-1.5 accent-indigo-600 bg-slate-100 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-455 text-slate-400 block font-normal">FTC / brand restriction checker passes: ${scanCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-20 border-slate-200 rounded p-4 text-[11px] text-slate-650 leading-relaxed font-sans space-y-1">
            <span className="font-bold block text-slate-800 uppercase text-[10px] tracking-wider">Storage & compute base limits</span>
            <p className="text-[11px] font-sans">
              Flat infrastructure cost covers a dedicated Cloud SQL instance, security firewalls, and stateless Node server instances.
            </p>
          </div>
        </div>

        {/* Right Columns beautiful recharts splits */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm lg:col-span-2 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-805 text-slate-850 block">Analytical Expense Forecast Split</span>
            <p className="text-slate-400 text-xs">Breakouts represent real-time distributions in absolute dollar parameters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pie Chart display */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-450 text-slate-400 block uppercase tracking-wider mb-2 font-mono self-start">Expense Distribution Ratio</span>
              
              <div className="h-44 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" startAngle={90} endAngle={450}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `$${v}`} />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Total label overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Total Cost</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">${totalCost}</span>
                </div>
              </div>

              {/* Pie Legends */}
              <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center text-[10px] text-slate-600 font-medium font-sans pt-2">
                {pieData.map((d, i) => (
                  <span key={i} className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                    {d.name} (${d.value})
                  </span>
                ))}
              </div>
            </div>

            {/* Area Chart: Scaled prediction bounds */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col">
              <span className="text-[10px] font-bold text-slate-450 text-slate-400 block uppercase tracking-wider mb-2 font-mono">Scale growth cost curves</span>
              
              <div className="h-44 w-full text-[9px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis dataKey="scale" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ fontSize: "10px" }} />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Area type="monotone" dataKey="LLMTokens" stroke="#4f46e5" fill="#c7d2fe" stackId="1" />
                    <Area type="monotone" dataKey="MAUTelemetry" stroke="#3b82f6" fill="#bfdbfe" stackId="1" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Zero Egress Note */}
          <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-lg text-xs text-emerald-800 flex items-start gap-2.5 leading-relaxed font-sans">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-950">Snowflake Cortex AI Cost Reduction active:</span>
              By utilizing native Snowflake Cortex compute models, data scientists avoid moving records out of Snowflake, reducing standard network egress fees to <strong className="font-semibold text-emerald-950">$0.00 USD securely</strong>.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
