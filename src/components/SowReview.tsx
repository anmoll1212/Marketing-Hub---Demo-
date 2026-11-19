import { useState } from "react";
import { 
  Hammer, ChevronDown, ChevronUp, FileCode, Clock, Coins, ShieldCheck, 
  AlertTriangle, CheckCircle2, HelpCircle, Calendar, Users, Info, Search, ListFilter
} from "lucide-react";

interface SowModule {
  id: string;
  name: string;
  complexity: "High" | "Medium" | "Low";
  devDays: number;
  sowCategory: "Core Platform Feature" | "AI Orchestration" | "Third-Party Syncer" | "Security & Validation";
  details: string;
}

interface Milestone {
  id: string;
  date: string;
  dimension: string;
  name: string;
  criteria: string;
  owner: string;
}

interface RiskItem {
  id: string;
  dimension: string;
  desc: string;
  impactDesc: string;
  probability: "High" | "Med" | "Low";
  impact: "High" | "Med" | "Low";
  mitigation: string;
  owner: string;
  status: "Open" | "Monitor" | "Resolved";
  date: string;
}

interface OpenQuestion {
  id: number;
  category: string;
  question: string;
  why: string;
  priority: "Critical" | "High" | "Medium" | "Low";
}

export default function SowReview() {
  const [activeTab, setActiveTab] = useState<"scope" | "milestones" | "risks" | "questions">("scope");
  
  // Tab 1: Scope catalog
  const [modules] = useState<SowModule[]>([
    {
      id: "sow-1",
      name: "SaaS Brand DNA & Tone Parameters Matrix",
      complexity: "Medium",
      devDays: 4,
      sowCategory: "Core Platform Feature",
      details: "Configuration layer enabling dynamic hex colors, blocker vocabulary indexes, and slider guidelines to instruct LLM system prompts."
    },
    {
      id: "sow-2",
      name: "Brief Builder - Chat Architect Assistant",
      complexity: "High",
      devDays: 8,
      sowCategory: "AI Orchestration",
      details: "State manager linking sequential text dialogues with a Completeness circular index scoring engine. Formulates structured campaigns in real-time."
    },
    {
      id: "sow-3",
      name: "Planning Intelligence & Cross-Cloud Analytics",
      complexity: "High",
      devDays: 12,
      sowCategory: "AI Orchestration",
      details: "Translates natural language to ANSI SQL commands. Zero-Egress integration designed specifically for Google BigQuery and Snowflake Cortex AI."
    },
    {
      id: "sow-4",
      name: "Multichannel Asset Adaptive Converter",
      complexity: "Medium",
      devDays: 5,
      sowCategory: "Third-Party Syncer",
      details: "Drag-drop file processor converting graphical formats into designated platform ratios (16:9 widescreen, 4:3 mailing list, 9:16 reels)."
    },
    {
      id: "sow-5",
      name: "Automated Compliance & Pre-Screen Checker",
      complexity: "High",
      devDays: 9,
      sowCategory: "Security & Validation",
      details: "Regulatory rules engine screening social copywriting assets for FTC breaches, financial stock solicitations, and warning indicators."
    },
    {
      id: "sow-6",
      name: "Trafficking UTM placement validator",
      complexity: "Low",
      devDays: 3,
      sowCategory: "Core Platform Feature",
      details: "URL tag generator capturing medium and source attributes. Monitors link pings and validates GA conversion identifiers."
    }
  ]);

  // Tab 2: Delivery Milestones (Page 3 of PDP)
  const [milestones] = useState<Milestone[]>([
    { id: "M-A", date: "May 15 (Pre-W1)", dimension: "Operations", name: "Prerequisites complete", criteria: "GCP project ready, IAM provisioned, Searce idP emails issued, Brand DNA workshop conducted, KPI framework aligned, 8 clarity confirmations resolved.", owner: "Anant + Aaron G." },
    { id: "M-B", date: "May 22 (W1)", dimension: "Content", name: "WS1 discovery complete", criteria: "Current brief process documented, field dictionary V1 drafted from 4 samples, architecture diagram drafted, intake flow strawman ready, historical corpus formally requested from client.", owner: "Anant" },
    { id: "M-C", date: "May 29 (W2)", dimension: "Content", name: "WS1 alignment locked", criteria: "Field dictionary v2 approved by Aaron G.; Brand DNA artifact v1 locked; auth pattern (idP OAuth) confirmed; Social/Paid + OLV schemas drafted from new samples; pre-engagement baselines captured.", owner: "Anant" },
    { id: "M-C1", date: "May 26 (W2)", dimension: "Intelligence", name: "Brand DNA artifact v1 locked", criteria: "Structured JSON artifact reviewed and approved by Doug P. and brand team; available in Cloud Storage for agent grounding.", owner: "Doug P. + Monark" },
    { id: "M-C2", date: "May 29 (W2)", dimension: "Content", name: "Field dictionary v2 locked", criteria: "All M/O/C designations confirmed, validation rules locked, naming convention defined, brief quality scoring rubric documented.", owner: "Aaron G." },
    { id: "M-C3", date: "May 29 (W2)", dimension: "Architecture", name: "Auth pattern locked", criteria: "Upbound idP OAuth 2.0 confirmed; test credentials available; API gateway authentication path documented.", owner: "Monark + Upbound IT" },
    { id: "M-D", date: "Jun 5 (W3)", dimension: "Intelligence", name: "Core agent functional", criteria: "End-to-end happy path works on test data: intake → drafted brief → completeness score. Tested internally by Searce team with stub frontend.", owner: "Abhi" },
    { id: "M-D1", date: "Jun 3 (W3)", dimension: "Intelligence", name: "Corpus + persona integration complete", criteria: "20+ historical briefs indexed in vector store; personas structured and queryable; RAG retrieval validated against sample queries.", owner: "Abhi + Krishna" },
    { id: "M-D2", date: "Jun 4 (W3)", dimension: "Experience", name: "Approval routing matrix locked", criteria: "Per-brief-type approver matrix documented and integrated into brief submission flow.", owner: "Aaron G. + Mike R." },
    { id: "M-E", date: "Jun 12 (W4)", dimension: "Operations", name: "WS1 UAT complete", criteria: "Brief Builder deployed on Cloud Run with all six APIs exposed; UAT scenarios executed successfully with Marketing team; defects resolved; steady-state owner named; ready for handover.", owner: "Anant + Aaron G." },
  ]);

  // Tab 3: Risk Registry & Assumptions (Page 24, 25 of PDP)
  const [risks] = useState<RiskItem[]>([
    { id: "R-01", dimension: "Intelligence", desc: "Brand DNA artifact may not be ready in structured form by end of Week 2, blocking grounded suggestions.", impactDesc: "Agent ships with generic tone; WS4 and WS6 also delayed.", probability: "High", impact: "High", mitigation: "Pre-kickoff Brand DNA workshop scheduled. Searce to provide JSON schema template by May 22 so client team can populate. Fallback: ship V1 agent with brand rules embedded in prompts.", owner: "Doug P. + Monark", status: "Resolved", date: "May 28" },
    { id: "R-02", dimension: "Content", desc: "Three sample briefs use three different formats. If canonical brief structure per type is not locked, conversational intake cannot be standardized.", impactDesc: "Intake flow rebuilt mid-engagement; Week 4 UAT slips.", probability: "High", impact: "High", mitigation: "Field dictionary V1 drafted; Week 2 review session with Leyla M. to lock canonical schemas. Anant to escalate to Aaron G. if not closed by May 29.", owner: "Leyla M. + Anant", status: "Resolved", date: "May 29" },
    { id: "R-03", dimension: "Content", desc: "Social/Paid and OLV child brief sample briefs not yet provided by client.", impactDesc: "V1 ships supporting only CRM and Web briefs; Social/Paid and OLV deferred to Phase 2.", probability: "Med", impact: "High", mitigation: "Formal request to Leyla M. and Doug P. for 2 samples each. If not received by end of Week 2, propose scope reduction to Aaron G.", owner: "Anant", status: "Resolved", date: "May 28" },
    { id: "R-04", dimension: "Content", desc: "Naming convention (flagged by Aaron in original hierarchy diagram) remains unresolved. Blocks structured brief output usable by downstream.", impactDesc: "WS2-WS7 cannot programmatically consume brief outputs; manual reformatting needed.", probability: "Med", impact: "High", mitigation: "Anant to drive resolution in Week 2 working session with Aaron G. Propose Searce drafted convention based on examples for client approval.", owner: "Aaron G. + Anant", status: "Resolved", date: "May 29" },
    { id: "R-05", dimension: "Architecture", desc: "Client-owned frontend may not be ready for API integration by end of Week 4, delaying UAT.", impactDesc: "WS1 UAT slips; downstream workstream timelines compress.", probability: "High", impact: "High", mitigation: "Yves H. to confirm frontend resourcing and sprint plan by May 22. Searce to provide API mock server so frontend can develop in parallel.", owner: "Yves H.", status: "Resolved", date: "May 22" },
    { id: "R-06", dimension: "Architecture", desc: "Brief output schema for WS2-WS7 handoff not yet aligned across workstream leads.", impactDesc: "Concept Generator and Production Accelerator receive non-consumable inputs.", probability: "Med", impact: "High", mitigation: "Week 4 cross-workstream design session to lock handoff schema before WS1 build completes.", owner: "Monark", status: "Open", date: "Jun 08" },
    { id: "R-07", dimension: "Intelligence", desc: "Historical brief corpus may be too small (3 samples today) to ground RAG retrieval effectively.", impactDesc: "Agent suggestions feel generic; 'reference past briefs' feature underperforms.", probability: "High", impact: "Med", mitigation: "Formal ask to client for 20+ briefs by end of Week 2. Abhi to test corpus sufficiency at 10/15/20 sizes and report.", owner: "Leyla M. + Abhi", status: "Monitor", date: "May 29" },
    { id: "R-08", dimension: "Intelligence", desc: "Legal phrase library (WS6 deliverable) not available until Weeks 7-8.", impactDesc: "Agent does not surface required legal language; compliance burden falls fully on WS6 pre-screening.", probability: "High", impact: "Med", mitigation: "Mike R. + Jordan L. to provide a V1 stub of required phrases by offer type by end of Week 4. WS1 reads from stub.", owner: "Mike R. + Abhi", status: "Monitor", date: "Jun 12" },
    { id: "R-09", dimension: "Experience", desc: "Approval workflow / routing matrix not documented. Brief submission cannot be routed without it.", impactDesc: "Brief submission feature ships with hardcoded routing; rework needed.", probability: "Med", impact: "Med", mitigation: "Week 3 session with Aaron G. + Mike R. to define approver matrix. Searce to draft strawman from Web Brief references.", owner: "Aaron G.", status: "Resolved", date: "Jun 05" },
    { id: "R-12", dimension: "Operations", desc: "Vertex AI consumption costs may exceed client expectations.", impactDesc: "Surprise cloud bill; client erodes trust in scalability.", probability: "Med", impact: "Med", mitigation: "Set per-service budgets, daily alerts, quotas on Veo/Imagen. Searce to share consumption estimation sheet.", owner: "Krishna + Upbound", status: "Monitor", date: "Jun 22" },
  ]);

  const [assumptions] = useState([
    { id: "A-01", desc: "Marketing Hub frontend will be ready for API integration by end of Week 4 per SOW.", fallback: "WS1 UAT delayed; cascading impacts.", owner: "Yves H.", date: "May 22", status: "Pending" },
    { id: "A-02", desc: "Upbound idP supports OAuth 2.0 for federated authentication with Cloud Run.", fallback: "Alternative auth pattern needed (API keys + IP allowlist).", owner: "Upbound IT + Monark", date: "May 25", status: "Pending" },
    { id: "A-04", desc: "The five segments in the hierarchy diagram are the complete stable set.", fallback: "Schema design needs custom segments expansion layout.", owner: "Aaron G.", date: "May 29", status: "Pending" },
    { id: "A-06", desc: "Acima brand guidelines can be transformed into a structured Brand DNA artifact.", fallback: "Brand DNA work extends into Weeks 1-3; grounding delayed.", owner: "Doug P. + Monark", date: "May 15", status: "Pending" },
  ]);

  // Tab 4: Open Questions for Leyla & Aaron (Page 5, 6 of PDP)
  const [openQuestions] = useState<OpenQuestion[]>([
    { id: 1, category: "Architecture", question: "Are the 4 child brief types (CRM, Web, Social/Paid, OLV) the complete set, or are there others (e.g. Direct Mail, In-Store, Influencer)?", why: "Determines total schema bounds", priority: "High" },
    { id: 2, category: "Architecture", question: "For Adhoc/BAU campaigns, the diagram shows only CRM briefs. Are other channels never used for BAU?", why: "Conditional logic in intake flow validation rules", priority: "High" },
    { id: 3, category: "Naming", question: "What is the naming convention? Aaron flagged 'Campaign + Audience + Child + Asset Dimension'. Please specify format.", why: "Every downstream workstream depends on this taxonomy", priority: "Critical" },
    { id: 4, category: "Analytics", question: "What are the brief quality scoring criteria? (Need analytics scope and criteria.)", why: "Powers the completeness scoring engine in WS1", priority: "Critical" },
    { id: 5, category: "Approval Workflow", question: "Who approves what, in what order, with what triggers? Web Brief references approvals but no full matrix exists.", why: "Cannot route approvals dynamically without this", priority: "Critical" },
    { id: 7, category: "Field Schema", question: "The 3 sample briefs use 3 different formats. Is there ONE canonical brief structure per type?", why: "Cannot build standardized intake without one canonical structure", priority: "Critical" },
    { id: 12, category: "Brand DNA", question: "When will the Brand DNA structured artifact be ready? Multiple briefs reference guideline links.", why: "Foundational core input for RAG model grounding contexts", priority: "Critical" },
    { id: 13, category: "Legal/Compliance", question: "Should the agent surface mandatory legal phrases automatically based on offer type? Does library exist?", why: "Affects brief completeness scoring validations", priority: "High" },
    { id: 18, category: "Email Components", question: "Please confirm final modular component library for email. Is Header, Hero, Transition, Value Prop, Category the complete list?", why: "Provides checkboxes inside CRM child builder", priority: "Medium" },
    { id: 22, category: "Validation", question: "Confirm validation: Round 1 Due Date must be >= 2 weeks from kickoff (per Web SLA guidelines). Any other hard rules?", why: "Rules enforcement inside intake chat constraints", priority: "Medium" }
  ]);

  const [expandedSowId, setExpandedSowId] = useState<string | null>("sow-2");
  const [qSearch, setQSearch] = useState("");
  const [qFilter, setQFilter] = useState<string>("All");

  const totalDevDays = modules.reduce((acc, m) => acc + m.devDays, 0);

  const filteredQuestions = openQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(qSearch.toLowerCase()) || q.category.toLowerCase().includes(qSearch.toLowerCase());
    if (qFilter === "All") return matchesSearch;
    return matchesSearch && q.priority === qFilter;
  });

  return (
    <div className="space-y-6">
      {/* SOW TOP BRAND BAR */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white font-mono text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-widest">
              WS1 JOINT SOW
            </span>
            <span className="text-slate-400 font-bold font-mono text-xs">• RAC Upbound Searce Alliance</span>
          </div>
          <h2 className="text-white text-base md:text-lg font-bold flex items-center gap-1.5 font-sans">
            <Hammer className="w-5 h-5 text-indigo-400 animate-pulse" />
            Project Delivery Board (Statement of Work Review)
          </h2>
          <p className="text-slate-400 text-xs">
            Coordinates project scope, delivery Gantt milestones, risk mitigation steps, and active open questions.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0 text-xs">
          <span className="bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-slate-300 font-bold">
            <Clock className="w-3.5 h-3.5 text-indigo-400" /> Standard Scope: {totalDevDays} Days
          </span>
          <span className="bg-indigo-650 bg-indigo-600 text-white px-3.5 py-1.5 rounded-lg font-bold font-mono shadow-sm">
            STATUS: ACTIVE UAT PHASE
          </span>
        </div>

        {/* Backdrop visual gradient accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-indigo-900/10 to-transparent pointer-events-none" />
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1 bg-white p-1 rounded-xl shadow-xs border">
        {[
          { id: "scope", label: "SOW Scope Catalog", badge: `${modules.length} Modules` },
          { id: "milestones", label: "Delivery Milestones (UAT)", badge: `${milestones.length} Milestones` },
          { id: "risks", label: "Risk Matrix & Assumptions", badge: `${risks.length} Risks` },
          { id: "questions", label: "Clarification Forum (Questions)", badge: `${openQuestions.length} Open` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === t.id
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {t.label}
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${activeTab === t.id ? "bg-indigo-805 bg-indigo-700 text-white" : "bg-slate-105 bg-slate-100 text-slate-500"}`}>
              {t.badge}
            </span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT OUTLET */}

      {/* 1. SOW SCOPE CATALOG */}
      {activeTab === "scope" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Collapse column */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-800 text-sm font-bold">Standard SOW Core Deliverable List</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Click on module to view details and structural compliance specs.</p>
            </div>

            <div className="border border-slate-200 rounded-xl divide-y divide-slate-150 overflow-hidden text-xs">
              {modules.map((m) => {
                const isExpanded = expandedSowId === m.id;
                return (
                  <div key={m.id} className="bg-white">
                    <button
                      onClick={() => setExpandedSowId(isExpanded ? null : m.id)}
                      className="w-full text-left p-3.5 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition font-sans"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 bg-slate-100 border border-slate-200 rounded flex items-center justify-center font-bold text-slate-500 text-[10px] shrink-0 font-mono">
                          {m.id.split("-")[1]}
                        </span>
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">{m.name}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{m.sowCategory}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[10px]">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${
                          m.complexity === "High" ? "bg-rose-50 text-rose-700" : m.complexity === "Medium" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {m.complexity}
                        </span>
                        <span className="bg-slate-100 border px-1.5 py-0.5 rounded font-bold text-slate-600 shrink-0">
                          {m.devDays} dev-days
                        </span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2.5 leading-relaxed text-slate-600 text-xs text-[11px]">
                        <p>{m.details}</p>
                        <div className="pt-2 border-t border-slate-150 flex items-center justify-between font-medium">
                          <span className="text-indigo-600 font-bold flex items-center gap-1 shrink-0">
                            <Info className="w-3.5 h-3.5" /> Direct GCS Schema mapping: YES
                          </span>
                          <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" /> Standard Rate Applied
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core SOW Stats Card */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Effort Distribution</span>
              
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                    <span>AI Model Orchestration</span>
                    <span>20 days (48%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: "48%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                    <span>Core Hub Front/Back features</span>
                    <span>7 days (17%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "17%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                    <span>Compliance & Safety Checking</span>
                    <span>9 days (22%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: "22%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                    <span>Third-Party Conversions Syncer</span>
                    <span>5 days (13%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "13%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* In house sync Active signifier */}
            <div className="bg-indigo-55 bg-indigo-50 border border-indigo-150 p-4.5 rounded-xl space-y-2 leading-relaxed text-xs text-indigo-900 border-indigo-100">
              <span className="font-bold flex items-center gap-1 text-[12px]">
                🛡️ Operational SLA Disclaimers
              </span>
              <p className="text-[11px]">
                Under the current contract, the client-side resourcing is owned by <strong className="font-bold">Yves H.</strong> All API endpoints operate directly on Google BigQuery logs to minimize translation failure risk.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. UAT MILESTONES & ROADMAP */}
      {activeTab === "milestones" && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5 animate-fade-in">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              SOW Mini-Milestones Roadmap & Progress Checks (Page 3 PDP Spec)
            </h3>
            <p className="text-slate-405 text-slate-400 text-[11px] mt-0.5 font-medium">Tracks mini-milestones mapped to specific delivery dates and validation criteria.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-150 font-sans">
              <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">ID & Date</th>
                  <th className="p-3">Dimension</th>
                  <th className="p-3">Milestone Name</th>
                  <th className="p-3">SOW Core Acceptance Criteria</th>
                  <th className="p-3">Owner</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-slate-700 leading-relaxed font-sans">
                {milestones.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 bg-white">
                    <td className="p-3 font-mono font-bold shrink-0">
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold px-1.5 py-0.5 rounded mr-1.5 text-[9px]">
                        {m.id}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 block sm:inline">{m.date}</span>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-medium text-slate-600 capitalize">
                        {m.dimension}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800">{m.name}</td>
                    <td className="p-3 text-[11px] text-slate-500 max-w-sm font-light leading-relaxed">{m.criteria}</td>
                    <td className="p-3 font-medium text-[11px]">{m.owner}</td>
                    <td className="p-3">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[9px] flex items-center gap-1 w-max font-mono uppercase tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> PASSED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. RISK MATRIX & ASSUMPTIONS */}
      {activeTab === "risks" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
          
          {/* Left Columns - Risks list */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-800 text-sm font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                SOW Strategic Risk & Mitigation Registry (Page 24 PDP Spec)
              </h3>
              <p className="text-slate-405 text-slate-400 text-[11px] mt-0.5 font-medium">Critical items affecting the timeline and prompt system grounding parameters.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-150 font-sans">
                <thead className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">ID & Owner</th>
                    <th className="p-3">Risk Scenario</th>
                    <th className="p-3">Unmitigated Impact</th>
                    <th className="p-3">P / I</th>
                    <th className="p-3">Mitigation Design Actions</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 text-[11px] text-slate-700 leading-normal font-sans">
                  {risks.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 bg-white">
                      <td className="p-3 font-mono">
                        <strong className="text-rose-700 bg-rose-50 border border-rose-100 text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {r.id}
                        </strong>
                        <span className="block text-[10px] text-slate-400 font-medium mt-1 truncate max-w-24">{r.owner}</span>
                      </td>
                      <td className="p-3 text-[11px] max-w-56 leading-relaxed">
                        <span className="font-bold text-slate-800 block text-xs">{r.dimension}</span>
                        {r.desc}
                      </td>
                      <td className="p-3 text-rose-800 italic text-[11px] max-w-40 font-light">{r.impactDesc}</td>
                      <td className="p-3 font-mono font-bold text-[10px]">
                        <span className={`block ${r.probability === "High" ? "text-rose-600" : "text-amber-500"}`}>P: {r.probability}</span>
                        <span className={`block ${r.impact === "High" ? "text-rose-600" : "text-amber-500"}`}>I: {r.impact}</span>
                      </td>
                      <td className="p-3 text-[11px] text-slate-500 max-w-64 leading-normal">{r.mitigation}</td>
                      <td className="p-3 font-mono font-semibold">
                        <span className={`px-2 py-0.5 rounded text-[9px] block text-center uppercase tracking-wider ${
                          r.status === "Resolved" ? "bg-emerald-50 text-emerald-700" : r.status === "Monitor" ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Project Assumptions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Declared Assumptions Matrix (Page 25 PDP Spec)
              </h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Assumptions vetted by Monark and Yves to bound scope creep.</p>
            </div>

            <div className="space-y-4 text-xs">
              {assumptions.map((a) => (
                <div key={a.id} className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-55 bg-indigo-100 text-indigo-700 font-mono text-[9px] px-2 py-0.5 rounded font-extrabold border border-indigo-200">
                      {a.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{a.date}</span>
                  </div>

                  <p className="font-bold text-slate-800 leading-relaxed text-xs">"{a.desc}"</p>
                  
                  <div className="text-[11px] text-slate-500 font-medium font-sans border-t pt-1.5 border-slate-200 mt-1.5 space-y-1">
                    <span className="text-rose-700 block"><strong>If False:</strong> {a.fallback}</span>
                    <span className="text-slate-405 text-slate-400 text-[10px] block">Owner: {a.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 4. CLARIFICATION FORUM */}
      {activeTab === "questions" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Top filter section */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 font-sans">
              <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-505 text-indigo-500" />
                24 Open Clarifications Ledger for Leyla & Aaron (Pages 5, 6 Specification Docs)
              </h3>
              <p className="text-slate-400 text-[11px] font-medium">Bridges architectural and field schema alignment bottlenecks with priority flags.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Search bar */}
              <div className="relative shrink-0 w-44 font-sans">
                <input
                  type="text"
                  value={qSearch}
                  onChange={(e) => setQSearch(e.target.value)}
                  placeholder="Query taxonomies..."
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 w-full pl-7 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                />
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Priority Filter toggle */}
              <div className="flex bg-slate-100 p-1 rounded border border-slate-200 text-[11px] font-bold">
                {["All", "Critical", "High", "Medium"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setQFilter(p)}
                    className={`px-2 py-0.5 rounded transition ${qFilter === p ? "bg-white text-indigo-600 shadow-xs" : "text-slate-400"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="bg-white border border-slate-200 p-4.5 p-4 rounded-xl shadow-xs space-y-3 flex flex-col justify-between font-sans relative hover:border-indigo-150 transition group">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase tracking-wider block">
                      #{q.id} • {q.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider ${
                      q.priority === "Critical" ? "bg-rose-50 text-rose-700" : q.priority === "High" ? "bg-orange-50 text-orange-700" : "bg-indigo-50 text-indigo-700"
                    }`}>
                      {q.priority} PRIORITY
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-800 leading-relaxed text-xs">
                    {q.question}
                  </h4>
                </div>

                <div className="border-t border-slate-100 pt-2 text-[10.5px] leading-relaxed text-slate-500 font-light italic">
                  <strong>Why it matters:</strong> {q.why}
                </div>
              </div>
            ))}
          </div>

          {/* Issue Log Section matching OCR Page 26 */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-850 block flex items-center gap-1.5 font-bold">
              <Users className="w-4 h-4 text-slate-500 animate-pulse" />
              Active Issue Log Dashboard (Page 26 PDF Spec)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-1.5">
                <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase block w-max tracking-wide">
                  I-01 • HIGH SEVERITY
                </span>
                <span className="font-bold text-slate-800 block">Open Sticky Notes on Hierarchy</span>
                <span className="text-[11px] text-zinc-500 text-slate-500 block">Open inputs: naming schema rules, flow finalization, and analytics scoring values are unassigned. Escalated to Aaron G.</span>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-1.5">
                <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase block w-max tracking-wide">
                  I-02 • HIGH SEVERITY
                </span>
                <span className="font-bold text-slate-800 block">Missing Social Support Child Brief Samples</span>
                <span className="text-[11px] text-zinc-500 text-slate-500 block">Web and CRM samples are received; Social/OLV references aren't provided. Formulated robust surrogate schema structure.</span>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-1.5">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-150 border-indigo-100 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase block w-max tracking-wide">
                  I-03 • MED SEVERITY
                </span>
                <span className="font-bold text-slate-800 block">RAG Corpus Scale Constraint</span>
                <span className="text-[11px] text-zinc-500 text-slate-500 block">RAG system requires at least 20 sample briefs for precise semantic vector checks. Scheduled Abhi to test with different scales.</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
