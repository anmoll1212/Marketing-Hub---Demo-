import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Megaphone, 
  Sparkles, 
  Layers, 
  Activity, 
  Info,
  Sliders,
  Calendar,
  Cpu,
  FolderHeart,
  ShieldCheck,
  Link,
  Hammer,
  Calculator,
  User,
  ExternalLink,
  Plus,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import CampaignsList from "./components/CampaignsList";
import ContentForge from "./components/ContentForge";
import BrandDNA from "./components/BrandDNA";
import CampaignCalendar from "./components/CampaignCalendar";
import BriefBuilder from "./components/BriefBuilder";
import CreativeResearch from "./components/CreativeResearch";
import PlanningIntelligence from "./components/PlanningIntelligence";
import AssetManager from "./components/AssetManager";
import ComplianceTester from "./components/ComplianceTester";
import TraffickingSuite from "./components/TraffickingSuite";
import SowReview from "./components/SowReview";
import ApiCostCalculator from "./components/ApiCostCalculator";
import ApproverWorkspace from "./components/ApproverWorkspace";
import { MarketingCampaign, MarketingAnalytics } from "./types";

type TabId = 
  | "dashboard"
  | "brand_dna"
  | "calendar"
  | "brief_builder"
  | "creative_research"
  | "planning_intelligence"
  | "campaigns"
  | "assets"
  | "content_generation"
  | "compliance"
  | "trafficking"
  | "sow_review"
  | "cost_calculator";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [analytics, setAnalytics] = useState<MarketingAnalytics | null>(null);
  const [selectedCampaignForForge, setSelectedCampaignForForge] = useState<MarketingCampaign | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [brandSelection, setBrandSelection] = useState<string>("All Brands");

  const [workspaceRole, setWorkspaceRole] = useState<"creator" | "approver">("creator");
  const [approverSessions, setApproverSessions] = useState<any[]>([]);
  const [initialApproverSessionId, setInitialApproverSessionId] = useState<string | null>(null);

  // Fetch initial datasets
  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
        
        // Keep selected forge synchronized
        if (selectedCampaignForForge) {
          const freshSub = data.find((c: any) => c.id === selectedCampaignForForge.id);
          if (freshSub) {
            setSelectedCampaignForForge(freshSub);
          }
        }
      }
    } catch (err) {
      console.error("Failed to read social campaigns:", err);
    }
  };

  const fetchApproverSessions = async () => {
    try {
      const res = await fetch("/api/brief-sessions");
      if (res.ok) {
        const data = await res.json();
        setApproverSessions(data);
      }
    } catch (err) {
      console.error("Failed to fetch sessions for approver:", err);
    }
  };

  const handleApproveSession = async (id: string) => {
    const session = approverSessions.find(s => s.id === id);
    if (!session) return;
    const nextSessions = approverSessions.map(s => s.id === id ? { ...s, status: "Approved" } : s);
    setApproverSessions(nextSessions);
    try {
      await fetch("/api/brief-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessions: nextSessions })
      });
    } catch (e) { console.error(e); }
  };

  const handleProvideInfo = async (id: string, feedback: string) => {
    const session = approverSessions.find(s => s.id === id);
    if (!session) return;
    
    // Check if the feedback text contains our simulated "Attached: <filename>" string
    let attachedDoc: any = null;
    const match = feedback.match(/Attached: (.+)$/);
    if (match) {
        attachedDoc = {
            name: match[1],
            size: "1.2 MB",
            date: new Date().toISOString().split("T")[0],
            source: "Approver Upload"
        };
    }
    
    const nextSessions = approverSessions.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          status: "Draft",
          uploadedDocs: attachedDoc ? [...(s.uploadedDocs || []), attachedDoc] : (s.uploadedDocs || []),
          messages: [...(s.messages || []), {
            sender: "user",
            text: `Information provided: ${feedback}`
          }]
        };
      }
      return s;
    });
    
    setApproverSessions(nextSessions);
    try {
      await fetch("/api/brief-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessions: nextSessions })
      });
    } catch (e) { console.error(e); }
  };

  const handleRejectSession = async (id: string, feedback: string) => {
    const session = approverSessions.find(s => s.id === id);
    if (!session) return;
    
    const nextSessions = approverSessions.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          status: "Rejected",
          feedbacks: [...(s.feedbacks || []), {
            id: "fb_" + Date.now(),
            author: "Approver",
            text: feedback,
            createdAt: new Date().toISOString()
          }]
        };
      }
      return s;
    });
    
    setApproverSessions(nextSessions);
    try {
      await fetch("/api/brief-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessions: nextSessions })
      });
    } catch (e) { console.error(e); }
  };

  const fetchAnalytics = async (silent = false) => {
    if (!silent) setAnalyticsLoading(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Failed to fetch analytical feed:", err);
    } finally {
      if (!silent) setAnalyticsLoading(false);
    }
  };

  // Poll server for live tracking analytics
  useEffect(() => {
    fetchCampaigns();
    fetchAnalytics();
    fetchApproverSessions();

    const interval = setInterval(() => {
      fetchAnalytics(true);
      if (workspaceRole === "approver") {
        fetchApproverSessions();
      }
    }, 4000);

    // Read URL query parameters to load secure sign-off sessions directly
    const params = new URLSearchParams(window.location.search);
    const sessionParam = params.get("session");
    const modeParam = params.get("mode");
    
    if (modeParam === "approver") {
      setWorkspaceRole("approver");
      if (sessionParam) {
        setInitialApproverSessionId(sessionParam);
      }
    } else if (sessionParam) {
      setActiveTab("brief_builder");
    }

    return () => clearInterval(interval);
  }, []);

  const handleCampaignCreated = (newCamp: MarketingCampaign) => {
    setCampaigns((prev) => [newCamp, ...prev]);
    // Redirect to automated generation tab to start copywriting immediately!
    setSelectedCampaignForForge(newCamp);
    setActiveTab("content_generation");
  };

  const handleCampaignDeleted = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign brief? This cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCampaigns((p) => p.filter((c) => c.id !== id));
        if (selectedCampaignForForge?.id === id) {
          setSelectedCampaignForForge(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCampaignStatus = async (id: string, currentStatus: MarketingCampaign["status"]) => {
    const nextStatus = currentStatus === "active" ? "paused" : "active";
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCampaigns((p) => p.map((c) => (c.id === id ? updated : c)));
        if (selectedCampaignForForge?.id === id) {
          setSelectedCampaignForForge(updated);
        }
      }
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  // Quick Action callbacks
  const triggerQuickBuilder = () => {
    setActiveTab("brief_builder");
    setSelectedCampaignForForge(null);
  };

  const triggerQuickBrand = () => {
    setActiveTab("brand_dna");
    setSelectedCampaignForForge(null);
  };

  const triggerQuickCopy = () => {
    setActiveTab("content_generation");
  };

  const triggerQuickCompliance = () => {
    setActiveTab("compliance");
    setSelectedCampaignForForge(null);
  };

  // Filter campaigns depending on selected brand filtering state
  const filteredCampaigns = campaigns.filter((c) => {
    if (brandSelection === "All Brands") return true;
    return c.brandName.toLowerCase().includes(brandSelection.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex selection:bg-indigo-600/15 selection:text-indigo-900">
      
      {/* PERSISTENT SIDEBAR NAVIGATION PANEL */}
      {workspaceRole !== "approver" && (
        <aside className={`bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 border-r border-slate-950 z-40 hidden md:flex h-screen sticky top-0 overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}>
        <div className="space-y-5">
          {/* Logo & Headline with Searce branding */}
          <div className={`border-b border-slate-800 shrink-0 bg-slate-950 transition-all duration-300 ${
            sidebarCollapsed ? "p-2 py-4 flex flex-col items-center gap-3" : "p-4 flex items-center justify-between gap-2"
          }`}>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div id="searce-nav-logo-box" className="p-1 px-2.5 bg-white rounded shadow-sm shrink-0 flex items-center justify-center">
                  <img 
                    id="searce-sidebar-logo"
                    src="https://www.searce.com/images/logo.svg?dpl=dpl_H2dvM8dpYWN4sLgwR6QcuAfpro3Z" 
                    alt="Searce logo" 
                    className="h-4.5 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="leading-tight">
                  <h1 className="text-xs font-bold tracking-tight text-white block">
                    OmniChannel Hub
                  </h1>
                  <span className="text-[9px] text-slate-400 font-mono tracking-wide uppercase block">Searce Portal</span>
                </div>
              </div>
            )}

            {sidebarCollapsed && (
              <div className="bg-white p-1 rounded shrink-0 flex items-center justify-center w-8 h-8 shadow-sm">
                <img 
                  src="https://www.searce.com/images/logo.svg?dpl=dpl_H2dvM8dpYWN4sLgwR6QcuAfpro3Z" 
                  alt="Searce" 
                  className="h-5 w-5 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={sidebarCollapsed 
                ? "w-8 h-8 flex items-center justify-center bg-indigo-950/80 border border-indigo-700/65 hover:border-indigo-500 text-indigo-400 hover:text-white hover:bg-indigo-600 rounded-lg transition-all cursor-pointer shadow-md mt-1 animate-pulse"
                : "p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition cursor-pointer"
              }
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4 font-bold" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* AI Workers indicator */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-slate-800 shrink-0">
              <div className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-medium">AI Agent Workers</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-wider font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                  Active
                </span>
              </div>
            </div>
          )}

          {/* Navigation Items list */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[420px] scrollbar-thin text-xs">
            {!sidebarCollapsed && <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 pb-1 block">Automation Workflows</span>}
            
            {[
              { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
              { id: "brand_dna", label: "Brand DNA Setup", icon: <Sliders className="w-4 h-4" /> },
              { id: "calendar", label: "Channel Calendar", icon: <Calendar className="w-4 h-4" /> },
              { id: "brief_builder", label: "Brief Builder Builder", icon: <Sparkles className="w-4 h-4" /> },
              { id: "creative_research", label: "Creative Research", icon: <ActivitiesIcon className="w-4 h-4" /> },
              { id: "planning_intelligence", label: "Planning Intelligence", icon: <Cpu className="w-4 h-4" /> },
              { id: "campaigns", label: "Campaign Automator", icon: <Megaphone className="w-4 h-4" /> },
              { id: "assets", label: "Asset Management", icon: <FolderHeart className="w-4 h-4" /> },
              { id: "content_generation", label: "AI Content Forge", icon: <Layers className="w-4 h-4" /> },
              { id: "compliance", label: "Compliance Screen", icon: <ShieldCheck className="w-4 h-4" /> },
              { id: "trafficking", label: "Trafficking Suite", icon: <Link className="w-4 h-4" /> },
              { id: "sow_review", label: "Project SOW Review", icon: <Hammer className="w-4 h-4" /> },
              { id: "cost_calculator", label: "Compute cost Estimator", icon: <Calculator className="w-4 h-4" /> },
            ].map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabId);
                    if (item.id !== "content_generation") {
                      setSelectedCampaignForForge(null);
                    }
                  }}
                  className={`w-full flex items-center rounded-lg transition-all text-left font-sans ${
                    sidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
                  } ${
                    active
                      ? "bg-indigo-600 text-white font-bold"
                      : "text-slate-350 hover:text-white hover:bg-slate-800"
                  }`}
                  title={item.label}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* QUICK ACTIONS MENU IN SIDEBAR FOOTER */}
        <div className={`p-4 border-t border-slate-800 space-y-3 font-sans text-xs bg-slate-950 shrink-0 ${sidebarCollapsed ? "text-center px-1" : ""}`}>
          {!sidebarCollapsed && <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Quick Actions</span>}
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={triggerQuickBuilder}
              className={`w-full text-left bg-slate-850 hover:bg-slate-800 text-[10.5px] border border-slate-800 text-slate-100 rounded py-1.5 transition font-medium truncate shrink-0 cursor-pointer ${
                sidebarCollapsed ? "px-1 text-center font-bold text-sm" : "px-2.5"
              }`}
              title="New Campaign Brief"
            >
              {sidebarCollapsed ? "📝" : "📝 New Campaign Brief"}
            </button>
            <button
              onClick={triggerQuickBrand}
              className={`w-full text-left bg-slate-850 hover:bg-slate-800 text-[10.5px] border border-slate-800 text-slate-100 rounded py-1.5 transition font-medium truncate shrink-0 cursor-pointer ${
                sidebarCollapsed ? "px-1 text-center font-bold text-sm" : "px-2.5"
              }`}
              title="Configure New Brand"
            >
              {sidebarCollapsed ? "🎨" : "🎨 Configure New Brand"}
            </button>
            <button
              onClick={triggerQuickCopy}
              className={`w-full text-left bg-slate-850 hover:bg-slate-800 text-[10.5px] border border-slate-800 text-slate-100 rounded py-1.5 transition font-medium truncate shrink-0 cursor-pointer ${
                sidebarCollapsed ? "px-1 text-center font-bold text-sm" : "px-2.5"
              }`}
              title="Generate Copy"
            >
              {sidebarCollapsed ? "⚡" : "⚡ Generate Copy"}
            </button>
            <button
              onClick={triggerQuickCompliance}
              className={`w-full text-left bg-slate-850 hover:bg-slate-800 text-[10.5px] border border-slate-800 text-slate-100 rounded py-1.5 transition font-medium truncate shrink-0 cursor-pointer ${
                sidebarCollapsed ? "px-1 text-center font-bold text-sm" : "px-2.5"
              }`}
              title="Run Compliance Scan"
            >
              {sidebarCollapsed ? "🛡️" : "🛡️ Run Compliance Scan"}
            </button>
          </div>
        </div>
      </aside>
      )}

      {/* MAIN WORKSPACE CONTENT PANE */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* UPPER APP HEADER WITH SYSTEM STATUS */}
        <header className="h-20 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu logo backup */}
            <div className="md:hidden bg-white p-1 px-2 border border-slate-200 rounded shrink-0 flex items-center justify-center">
              <img 
                id="searce-mobile-logo"
                src="https://www.searce.com/images/logo.svg?dpl=dpl_H2dvM8dpYWN4sLgwR6QcuAfpro3Z" 
                alt="Searce logo" 
                className="h-4 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h2 className="text-slate-800 text-sm font-bold capitalize flex items-center gap-2">
                {workspaceRole === "approver" ? "Approver Dashboard" : activeTab.replace("_", " ")}
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-[11px] text-slate-400 font-medium">
                  Workspace:
                </p>
                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => {
                      setWorkspaceRole("creator");
                      // sync URL 
                      const p = new URLSearchParams(window.location.search);
                      p.delete("mode");
                      window.history.replaceState(null, "", "?" + p.toString());
                    }}
                    className={`px-3 py-1 text-[10px] font-bold rounded transition ${
                      workspaceRole === "creator" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Creator Studio
                  </button>
                  <button
                    onClick={() => {
                      setWorkspaceRole("approver");
                      // sync URL
                      const p = new URLSearchParams(window.location.search);
                      p.set("mode", "approver");
                      window.history.replaceState(null, "", "?" + p.toString());
                    }}
                    className={`px-3 py-1 text-[10px] font-bold rounded transition ${
                      workspaceRole === "approver" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Approver Portal
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Brand filter pill on header */}
            {activeTab === "dashboard" && (
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                {["All Brands", "CodeRefine", "BioBottles"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrandSelection(b)}
                    className={`px-3 py-1 text-xs font-bold rounded transition ${
                      brandSelection === b ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}

            {/* Quick telemetry user tags */}
            <div className="hidden lg:flex flex-col items-end text-right text-[11px] font-mono leading-none border-l border-slate-200 pl-4 space-y-1">
              <span className="text-slate-400">
                Operator: <span className="text-slate-800 font-bold">anmol.jain@searce.com</span>
              </span>
              <span className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
                GCP-BIGQUERY DIRECT STREAM ACTIVE
              </span>
            </div>

          </div>
        </header>

        {/* CONTAINER FOR ACTIVE SCENE TAB */}
        <main className={`flex-1 p-6 overflow-y-auto w-full mx-auto space-y-6 ${workspaceRole === "approver" ? "max-w-none" : "max-w-7xl"}`}>
          
          {workspaceRole === "approver" ? (
            <ApproverWorkspace 
              sessions={approverSessions} 
              onApprove={handleApproveSession} 
              onReject={handleRejectSession}
              onProvideInfo={handleProvideInfo}
              initialSessionId={initialApproverSessionId}
            />
          ) : (
            <>
              {/* Real-time System Integration warnings */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
              <Info className="w-5 h-5 animate-bounce" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                Multi-Platform Analytics Data Origin Verification
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Telemetry streams are aggregated via <span className="font-semibold text-slate-705 text-slate-700">GCP BigQuery Data Science Agents</span> and <span className="font-semibold text-slate-705 text-slate-700">Snowflake Cortex Platform API</span> without local data replication. This enables real-time conversions updates with zero egress cost overheads.
              </p>
            </div>
          </div>

          {/* TAB DETECTIONS */}
          
          {/* 1. Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* Telemetry data source context badge panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-250 p-5 rounded-xl border-slate-200 shadow-sm text-xs justify-between leading-relaxed">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-indigo-600 font-mono font-bold block uppercase tracking-wide">Data Source: GCP BigQuery</span>
                  <p className="text-slate-505 text-slate-500 text-[11px]">
                    Continuous tracking pixel payloads and conversion logs are captured directly inside GCP BigQuery buckets, with automated analytics summaries calculated asynchronously.
                  </p>
                </div>
                <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-150 pt-3 md:pt-0 md:pl-4">
                  <span className="text-[10px] text-blue-600 font-mono font-bold block uppercase tracking-wide">Data Source: Snowflake Cortex AI</span>
                  <p className="text-slate-505 text-slate-500 text-[11px]">
                    Social demographic trends and competitor ad spends are analyzed locally inside Snowflake Cortex platform caches to prevent egress fees, pushing processed statistics seamlessly.
                  </p>
                </div>
              </div>

              {/* Progress Stepper for Campaigns */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase tracking-wider">Automated Workflow Pipeline Status</span>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs pt-2">
                  {[
                    { step: "01", name: "Brand DNA Check", desc: "Slilders & rules loaded", active: true },
                    { step: "02", name: "SOW Brief Architect", desc: "Interactive wizard chat", active: true },
                    { step: "03", name: "AI Content Creation", desc: "Copywriting & assets", active: true },
                    { step: "04", name: "Compliance Pre-screen", desc: "FTC policies verified", active: true },
                    { step: "05", name: "Live Traffic Stream", desc: "GA pixel tracking", active: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        s.active ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
                      }`}>
                        {s.step}
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 text-xs block">{s.name}</span>
                        <span className="text-[10px] text-slate-400 block">{s.desc}</span>
                      </div>

                      {i < 4 && <div className="hidden lg:block h-[1px] bg-slate-200 flex-1 ml-2" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Dash */}
              <AnalyticsDashboard
                analytics={analytics}
                loading={analyticsLoading}
                onRefresh={() => fetchAnalytics(false)}
              />
            </div>
          )}

          {/* 2. Brand DNA Tab */}
          {activeTab === "brand_dna" && <BrandDNA />}

          {/* 3. Campaign calendar tab */}
          {activeTab === "calendar" && <CampaignCalendar />}

          {/* 4. Brief Builder Tab */}
          {activeTab === "brief_builder" && (
            <BriefBuilder onCampaignCreated={handleCampaignCreated} />
          )}

          {/* 5. Creative Research Tab */}
          {activeTab === "creative_research" && <CreativeResearch />}

          {/* 6. Planning Intelligence */}
          {activeTab === "planning_intelligence" && <PlanningIntelligence />}

          {/* 7. Campaign Automator List Tab */}
          {activeTab === "campaigns" && (
            <CampaignsList
              campaigns={filteredCampaigns}
              onSelectCampaign={(c) => {
                setSelectedCampaignForForge(c);
                setActiveTab("content_generation");
              }}
              onDeleteCampaign={handleCampaignDeleted}
              onToggleStatus={handleToggleCampaignStatus}
              onCreateNewClick={() => setActiveTab("brief_builder")}
            />
          )}

          {/* 8. Asset Management Tab */}
          {activeTab === "assets" && <AssetManager />}

          {/* 9. AI Content Forge Tab */}
          {activeTab === "content_generation" && (
            <div className="space-y-4">
              {selectedCampaignForForge ? (
                <ContentForge
                  campaign={selectedCampaignForForge}
                  onCampaignUpdated={(updated) => {
                    setSelectedCampaignForForge(updated);
                    fetchCampaigns();
                  }}
                  onBack={() => setSelectedCampaignForForge(null)}
                />
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-6 shadow-xs max-w-xl mx-auto">
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-650 text-indigo-600 mx-auto animate-bounce">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-800 text-sm block">Choose a Campaign Brief to launch AI content generator</span>
                    <p className="text-slate-455 text-slate-400 font-medium">
                      Select any active campaign or draft created via Brief Builder to automatically generate compliance-vetted platforms copy and assets.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto w-full text-left bg-slate-50 border border-slate-150 p-4 rounded-lg">
                    {campaigns.length === 0 ? (
                      <p className="text-slate-405 text-slate-400 text-xs italic text-center py-2">No campaign briefs available. Create one in the Brief Builder.</p>
                    ) : (
                      campaigns.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCampaignForForge(c)}
                          className="w-full flex items-center justify-between p-3.5 hover:bg-white hover:shadow-xs transition rounded-lg text-xs leading-none bg-slate-10 px-4 group py-2.5 my-1"
                        >
                          <div className="text-left">
                            <span className="font-bold text-slate-800 block">{c.name}</span>
                            <span className="text-[10px] text-slate-450 text-slate-400 block mt-0.5">{c.brandName} • {c.goal}</span>
                          </div>
                          <span className="text-indigo-600 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-all text-[11px]">
                            Open Writer <Activity className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 10. Compliance Pre-Screen Tab */}
          {activeTab === "compliance" && <ComplianceTester />}

          {/* 11. Trafficking Suite Tab */}
          {activeTab === "trafficking" && <TraffickingSuite />}

          {/* 12. Project SOW Table Tab */}
          {activeTab === "sow_review" && <SowReview />}

          {/* 13. API/MAUs Cost Calculator Tab */}
          {activeTab === "cost_calculator" && <ApiCostCalculator />}
          </>
          )}

        </main>

        {/* PERSISTENT FOOTER */}
        <footer className="h-16 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[11px] text-slate-400 font-medium shrink-0">
          <p>© 2026 Searce Hub • Autopilot Marketing Platform & Multi-Warehousing Relays.</p>
          <p className="font-mono text-[10px] hidden sm:block">
            Database Engines: <span className="text-indigo-650 text-indigo-600 font-semibold font-mono">GCP BigQuery + Snowflake Cortex</span>
          </p>
        </footer>

      </div>
    </div>
  );
}

// Inline fallback helpers to prevent dependency bugs
function ActivitiesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" />
      <path d="M14 2v6h6" />
      <path d="M8 13h4" />
      <path d="M8 17h6" />
    </svg>
  );
}
