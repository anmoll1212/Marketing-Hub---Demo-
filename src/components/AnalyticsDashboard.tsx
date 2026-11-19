import { useState, useEffect } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  MousePointer, 
  Award, 
  Activity, 
  RefreshCw,
  Share2
} from "lucide-react";
import { MarketingAnalytics } from "../types";

interface Props {
  analytics: MarketingAnalytics | null;
  loading: boolean;
  onRefresh: () => void;
}

export default function AnalyticsDashboard({ analytics, loading, onRefresh }: Props) {
  const [lastTickMessage, setLastTickMessage] = useState<string>("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (analytics && analytics.timeline.length > 0) {
      // Set blinking pulse to show real-time tick received
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 800);
      
      const lastPoint = analytics.timeline[analytics.timeline.length - 1];
      setLastTickMessage(`Live Traffic detected at ${lastPoint.timestamp}`);
      return () => clearTimeout(timer);
    }
  }, [analytics]);

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
        <Activity className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 text-sm font-semibold">Powering up real-time telemetry analytics...</p>
      </div>
    );
  }

  const totals = analytics.totals;
  const platformColors = {
    "Twitter/X": "#0F172A", // brand black / slate
    "LinkedIn": "#0A66C2", // LinkedIn blue
    "Instagram": "#E1306C", // Instagram rose
    "Facebook": "#1877F2", // FB blue
  };

  return (
    <div className="space-y-6">
      {/* Realtime Stream Info Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${pulse ? 'scale-150 duration-300' : ''}`}></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="text-sm">
            <span className="font-bold text-slate-800">Real-Time Data Feed:</span>{" "}
            <span className="text-slate-500 font-mono text-xs">{lastTickMessage || "Monitoring social platform relays..."}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-slate-400 font-mono">Interval: 4s</span>
          <button 
            id="reload-analytics-btn"
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-705 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Impressions */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all duration-300 hover:border-indigo-505 hover:border-indigo-500/50">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">Total Reach</span>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-0.5 border border-emerald-100">
              <TrendingUp className="w-2.5 h-2.5" /> +8.4%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight font-sans transition-all duration-300">
              {totals.impressions.toLocaleString()}
            </span>
            <span className="text-slate-400 text-xs font-mono">views</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-2">Live aggregated impressions across channels</p>
        </div>

        {/* Total Link Clicks */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all duration-300 hover:border-indigo-505 hover:border-indigo-500/50">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">AI Efficiency</span>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-0.5 border border-emerald-100">
              <TrendingUp className="w-2.5 h-2.5" /> +12.1%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight font-sans animate-fade-in">
              {totals.clicks.toLocaleString()}
            </span>
            <span className="text-slate-400 text-xs font-mono">clicks</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-2">Direct referral traffic to target assets</p>
        </div>

        {/* Engagement Rate */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all duration-300 hover:border-indigo-505 hover:border-indigo-500/50">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">Engagement</span>
            <span className="text-indigo-650 text-indigo-600 text-[10px] font-mono font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              ER: {totals.engagementRate}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {totals.engagement.toLocaleString()}
            </span>
            <span className="text-slate-400 text-xs font-mono">actions</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-2">Likes, shares, and campaign responses</p>
        </div>

        {/* Goal Conversions */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden transition-all duration-300 hover:border-indigo-505 hover:border-indigo-500/50">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">Conv. Rate</span>
            <span className="bg-amber-50 text-amber-600 text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-amber-100">
              CR: {totals.conversionRate}%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {totals.conversions.toLocaleString()}
            </span>
            <span className="text-slate-400 text-xs font-mono">leads</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-2">Signups and platform conversions sparked</p>
        </div>
      </div>

      {/* Main Charts Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Multi-Line Area Timeline Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-slate-800 text-sm font-bold">Temporal Performance Timeline</h3>
              <p className="text-slate-400 text-xs mt-0.5">Real-time fluctuations in reach and clicking milestones</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> Impressions
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Clickthroughs
              </span>
            </div>
          </div>

          <div className="h-68 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.timeline}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="timestamp" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FFFFFF", 
                    borderColor: "#E2E8F0",
                    borderRadius: "6px",
                    color: "#0F172A",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorImpressions)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorClicks)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Share Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-slate-800 text-sm font-bold">Share Weight by Network</h3>
            <p className="text-slate-450 text-slate-400 text-xs mt-0.5">Comparing relative impressions and reach volumes across connected networks</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center font-mono text-xs pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.byPlatform} margin={{ left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F8FAFC" />
                <XAxis dataKey="platform" stroke="#94A3B8" fontSize={9} />
                <YAxis stroke="#94A3B8" fontSize={9} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", color: "#0F172A" }}
                />
                <Bar dataKey="impressions" radius={[3, 3, 0, 0]}>
                  {analytics.byPlatform.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={platformColors[entry.platform] || "#4f46e5"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Miniature List of details */}
          <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
            {analytics.byPlatform.map((plat) => (
              <div key={plat.platform} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <span 
                    className="w-2.5 h-2.5 rounded-sm" 
                    style={{ backgroundColor: platformColors[plat.platform] || "#4f46e5" }}
                  ></span>
                  {plat.platform}
                </span>
                <span className="font-mono text-slate-500">
                  {plat.impressions.toLocaleString()} views <span className="text-slate-450 text-[10px] text-slate-400">({plat.postsCount} posts)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
