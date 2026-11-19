import { useState } from "react";
import { Sliders, Sparkles, User, ShieldCheck, ShieldAlert, Plus, Check } from "lucide-react";

interface Persona {
  name: string;
  age: string;
  occupation: string;
  motivation: string;
  channels: string[];
  bio: string;
}

interface BrandProfile {
  id: string;
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  toneSliders: {
    formality: number; // 0 is casual, 100 formal
    enthusiasm: number; // 0 is technical/dry, 100 high energy
    humor: number; // 0 serious/dry, 100 witty
  };
  allowedKeywords: string[];
  blockedKeywords: string[];
  personas: Persona[];
}

export default function BrandDNA() {
  const [brands, setBrands] = useState<BrandProfile[]>([
    {
      id: "brand-1",
      name: "CodeRefine",
      tagline: "Unify pull requests with AI automated code quality monitors.",
      primaryColor: "#4f46e5",
      secondaryColor: "#06b6d4",
      toneSliders: { formality: 75, enthusiasm: 40, humor: 15 },
      allowedKeywords: ["clean code", "security audit", "logical bugs", "zero-egress", "code quality"],
      blockedKeywords: ["cheap review", "noob developers", "hackerproof", "guaranteed flawless"],
      personas: [
        {
          name: "DevOps Dev Dan",
          age: "34",
          occupation: "Principal Infrastructure Lead",
          motivation: "Eliminating brittle CI builds and ensuring secure dependency tracking.",
          channels: ["LinkedIn", "Twitter/X"],
          bio: "Dan spends half his day fixing pipelines. He reads technical documentation and values high accuracy and dry, direct utility explanations."
        },
        {
          name: "Engineering Manager Sarah",
          age: "42",
          occupation: "VP of Product Engineering",
          motivation: "Improving unit velocity while preventing core architectural regression.",
          channels: ["LinkedIn", "Medium"],
          bio: "Sarah is metric-driven. She cares deeply about security certifications, team burndown charts, and cost optimizations."
        }
      ]
    },
    {
      id: "brand-2",
      name: "BioBottles",
      tagline: "Eco-friendly self-purifying thermals crafted in organic bamboo grips.",
      primaryColor: "#10b981",
      secondaryColor: "#f59e0b",
      toneSliders: { formality: 20, enthusiasm: 85, humor: 65 },
      allowedKeywords: ["sustainable hydration", "bamboo grips", "UV sterilizer", "biodegradable", "adventure-ready"],
      blockedKeywords: ["plastic bottle", "chemical filtration", "cheap lifestyle", "toxic alloy"],
      personas: [
        {
          name: "Eco Camper Clara",
          age: "26",
          occupation: "Adventure blogger & educator",
          motivation: "Protecting national parks while staying active with high-end, eye-catching gear.",
          channels: ["Instagram", "Pinterest", "TikTok"],
          bio: "Clara travels light. She buys from sustainable certified B-Corps. Visual layout and warm environmental messaging resonate strongly with her."
        },
        {
          name: "Active Yoga Marcus",
          age: "31",
          occupation: "Wellness coach",
          motivation: "Optimizing personal hydration schedules with high-tech, chemical-free filtration.",
          channels: ["Instagram", "Facebook"],
          bio: "Marcus maintains a clean diet. He is fascinated by smart gadgets that track biometric benchmarks and values bold, energetic slogans."
        }
      ]
    },
    {
      id: "brand-3",
      name: "QuantumFintech",
      tagline: "High-performance asset ledgers powered by distributed state machines.",
      primaryColor: "#0f172a",
      secondaryColor: "#3b82f6",
      toneSliders: { formality: 90, enthusiasm: 25, humor: 5 },
      allowedKeywords: ["deterministic consensus", "zero-knowledge protocol", "sub-millisecond clearing", "institutional ledger"],
      blockedKeywords: ["quick riches", "crypto hype", "moon gains", "unregulated coin", "meme asset"],
      personas: [
        {
          name: "Quant Officer Alex",
          age: "45",
          occupation: "Chief Compliance Officer",
          motivation: "Guaranteeing zero-trust clearance across high-throughput cross-border corridors.",
          channels: ["LinkedIn", "Bloomberg Terminal"],
          bio: "Alex is risk-averse. He ignores buzzwords. Only peer-reviewed cryptographic models and formal validation proofs hold his attention."
        }
      ]
    }
  ]);

  const [activeBrandId, setActiveBrandId] = useState<string>("brand-1");
  const [newAllowedKeyword, setNewAllowedKeyword] = useState("");
  const [newBlockedKeyword, setNewBlockedKeyword] = useState("");

  const activeBrand = brands.find((b) => b.id === activeBrandId) || brands[0];

  const handleSliderChange = (key: "formality" | "enthusiasm" | "humor", value: number) => {
    setBrands((prev) =>
      prev.map((b) => {
        if (b.id === activeBrandId) {
          return {
            ...b,
            toneSliders: {
              ...b.toneSliders,
              [key]: value,
            },
          };
        }
        return b;
      })
    );
  };

  const addAllowedKeyword = () => {
    if (!newAllowedKeyword.trim()) return;
    setBrands((prev) =>
      prev.map((b) => {
        if (b.id === activeBrandId && !b.allowedKeywords.includes(newAllowedKeyword.trim())) {
          return {
            ...b,
            allowedKeywords: [...b.allowedKeywords, newAllowedKeyword.trim()],
          };
        }
        return b;
      })
    );
    setNewAllowedKeyword("");
  };

  const addBlockedKeyword = () => {
    if (!newBlockedKeyword.trim()) return;
    setBrands((prev) =>
      prev.map((b) => {
        if (b.id === activeBrandId && !b.blockedKeywords.includes(newBlockedKeyword.trim())) {
          return {
            ...b,
            blockedKeywords: [...b.blockedKeywords, newBlockedKeyword.trim()],
          };
        }
        return b;
      })
    );
    setNewBlockedKeyword("");
  };

  const removeAllowedKeyword = (kw: string) => {
    setBrands((prev) =>
      prev.map((b) => {
        if (b.id === activeBrandId) {
          return {
            ...b,
            allowedKeywords: b.allowedKeywords.filter((k) => k !== kw),
          };
        }
        return b;
      })
    );
  };

  const removeBlockedKeyword = (kw: string) => {
    setBrands((prev) =>
      prev.map((b) => {
        if (b.id === activeBrandId) {
          return {
            ...b,
            blockedKeywords: b.blockedKeywords.filter((k) => k !== kw),
          };
        }
        return b;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Brand Selection Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-205 pb-4 gap-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold">Dynamic Brand DNA & Persona Models</h2>
          <p className="text-slate-400 text-xs mt-0.5">Configure style parameters, approved vocabularies, and AI guidelines.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              id={`brand-switcher-${b.id}`}
              key={b.id}
              onClick={() => setActiveBrandId(b.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeBrand.id === b.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Style & Tone Guidelines */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 lg:col-span-1">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-500" />
              Voice Tone Parameters
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">Enforces guidelines for natural copy creations.</p>
          </div>

          {/* Quick Info */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase">Brand Profile tagline</span>
            <p className="text-xs text-slate-700 italic">&ldquo;{activeBrand.tagline}&rdquo;</p>
            <div className="flex gap-2 items-center mt-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-450 text-slate-405">Palette Identifiers:</span>
              <span className="w-4 h-4 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: activeBrand.primaryColor }} />
              <span className="w-4 h-4 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: activeBrand.secondaryColor }} />
            </div>
          </div>

          {/* Formality Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Formality Index</span>
              <span className="font-mono text-indigo-600 font-bold">{activeBrand.toneSliders.formality}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={activeBrand.toneSliders.formality}
              onChange={(e) => handleSliderChange("formality", parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
              <span>Casual & Conversational</span>
              <span>Formal & Regulatory</span>
            </div>
          </div>

          {/* Enthusiasm Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Enthusiasm Level</span>
              <span className="font-mono text-indigo-600 font-bold">{activeBrand.toneSliders.enthusiasm}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={activeBrand.toneSliders.enthusiasm}
              onChange={(e) => handleSliderChange("enthusiasm", parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
              <span>Matter-of-fact / Stoic</span>
              <span>High-Vibe / Passionate</span>
            </div>
          </div>

          {/* Humor Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Humor Quotient</span>
              <span className="font-mono text-indigo-600 font-bold">{activeBrand.toneSliders.humor}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={activeBrand.toneSliders.humor}
              onChange={(e) => handleSliderChange("humor", parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
              <span>Earnest & Direct</span>
              <span>Witty & Humorous</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded text-[11px] text-indigo-900 leading-relaxed">
            <span className="font-bold block mb-0.5">How this feeds Gemini:</span>
            Instructs model constraints dynamically: &quot;Set tone strictly to formality={activeBrand.toneSliders.formality}%, enthusiasm={activeBrand.toneSliders.enthusiasm}%&quot; on every run.
          </div>
        </div>

        {/* Messaging Approval & Safety Vocabularies */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Compliance Approved & Blocked Vocabularies
              </h3>
              <p className="text-slate-450 text-slate-400 text-[11px] mt-0.5">
                Define mandatory guidelines and prohibited terms to bypass legal risk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Approved/Mandatory Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Approved Industry Keywords
                </label>
                <p className="text-[11px] text-slate-405 text-slate-400">Copy engine is encouraged to match these exact phrases to establish optimal SEO indexing.</p>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAllowedKeyword}
                    onChange={(e) => setNewAllowedKeyword(e.target.value)}
                    placeholder="e.g. cloud-native"
                    className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    onClick={addAllowedKeyword}
                    className="p-1 px-3 bg-slate-900 text-white rounded font-bold text-xs hover:bg-slate-850 active:scale-95"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeBrand.allowedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-1 border border-emerald-100 rounded inline-flex items-center gap-1.5"
                    >
                      {kw}
                      <button onClick={() => removeAllowedKeyword(kw)} className="text-emerald-400 hover:text-emerald-700 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Blocked Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Prohibited / Flagged Keywords
                </label>
                <p className="text-[11px] text-slate-405 text-slate-400">Copy generator MUST bypass these. Compliance scans will issue red warnings if detected.</p>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBlockedKeyword}
                    onChange={(e) => setNewBlockedKeyword(e.target.value)}
                    placeholder="e.g. guaranteed profit"
                    className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    onClick={addBlockedKeyword}
                    className="p-1 px-3 bg-slate-900 text-white rounded font-bold text-xs hover:bg-slate-850 active:scale-95"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeBrand.blockedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-1 border border-rose-100 rounded inline-flex items-center gap-1.5"
                    >
                      {kw}
                      <button onClick={() => removeBlockedKeyword(kw)} className="text-rose-400 hover:text-rose-700 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Persona Demographics Grid */}
          <div className="border-t border-slate-100 pt-5 mt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              Target Customer Personas ({activeBrand.personas.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBrand.personas.map((p, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2 text-xs relative overflow-hidden">
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-bold bg-white text-slate-450 text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded uppercase">
                    {p.age} Yrs old
                  </span>
                  
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 text-xs block">{p.name}</span>
                    <span className="text-[10px] font-semibold text-indigo-650 text-indigo-600 block">{p.occupation}</span>
                  </div>

                  <p className="text-slate-500 leading-relaxed text-[11px]">&ldquo;{p.bio}&rdquo;</p>

                  <div className="border-t border-slate-100 pt-2 mt-1 space-y-1 text-[10px]">
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Core Motivations:</span>
                    <p className="text-slate-700 font-medium">{p.motivation}</p>
                    <div className="flex gap-1 items-center mt-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider mr-1">Preferred Channels:</span>
                      {p.channels.map((chan) => (
                        <span key={chan} className="bg-slate-200 border border-slate-300 text-slate-600 text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                          {chan}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
