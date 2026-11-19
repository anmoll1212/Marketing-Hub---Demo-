import React, { useState } from "react";
import { PlusCircle, Info, Sparkles, Hash } from "lucide-react";
import { MarketingCampaign } from "../types";

interface Props {
  onCampaignCreated: (campaign: MarketingCampaign) => void;
  onCancel: () => void;
}

export default function CampaignCreator({ onCampaignCreated, onCancel }: Props) {
  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goal, setGoal] = useState<MarketingCampaign["goal"]>("engagement");
  const [tone, setTone] = useState<MarketingCampaign["tone"]>("professional");
  const [rawHashtags, setRawHashtags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brandName || !description) {
      setError("Please complete all required fields (Name, Brand, and Core Description).");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Parse hashtags
    const hashtags = rawHashtags
      .split(",")
      .map((h) => h.trim().replace(/^#/, ""))
      .filter((h) => h.length > 0);

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          brandName,
          description,
          targetAudience,
          goal,
          tone,
          hashtags,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to catalog campaign brief.");
      }

      const createdObj = await response.json();
      onCampaignCreated(createdObj);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 max-w-3xl mx-auto shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-slate-800 text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            Establish New Campaign Brief
          </h2>
          <p className="text-slate-450 text-slate-400 text-xs mt-1">
            Feed strategic criteria to the AI content engine to automatically construct platform posts.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 hover:bg-slate-100 rounded transition-all font-semibold"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-xs text-rose-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Title */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-455 text-slate-400 uppercase tracking-widest">
              Campaign Name <span className="text-rose-550 text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Launch Promo"
              className="w-full bg-white border border-slate-200 rounded px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-sans"
            />
          </div>

          {/* Brand/Product Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Brand/Product Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. BioBottles"
              className="w-full bg-white border border-slate-200 rounded px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Business Context Profile */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Context Briefing Guidelines <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">FEEDS AI CONTEXT</span>
          </div>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Introduce the value proposal. Describe features, core benefits, competitive advantages, or summer event details."
            className="w-full bg-white border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Demographics */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Target Audience Demographics
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Outdoor hikers, eco-conscious college youth"
              className="w-full bg-white border border-slate-200 rounded px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-sans"
            />
          </div>

          {/* Seed Hashtags */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              Primary Social Hashtags <span className="text-slate-450 text-slate-400 text-[10px] font-normal font-sans">(comma separated)</span>
            </label>
            <input
              type="text"
              value={rawHashtags}
              onChange={(e) => setRawHashtags(e.target.value)}
              placeholder="e.g. hydration, sustainability, ecofriendly"
              className="w-full bg-white border border-slate-200 rounded px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Select Tone */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Tone of Voice Guidelines
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "professional", label: "Professional", desc: "Sleek & authoritative" },
                { id: "energetic", label: "Energetic", desc: "Punchy & high-vibes" },
                { id: "friendly", label: "Friendly", desc: "Warm & conversational" },
                { id: "humorous", label: "Humorous", desc: "Clever & witty style" },
                { id: "thought-provoking", label: "Thoughtful", desc: "Philosophical & deep" },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTone(t.id as any)}
                  className={`flex flex-col text-left p-3 rounded border text-xs transition-all duration-300 hover:bg-slate-50 relative overflow-hidden ${
                    tone === t.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  <span className="font-bold block">{t.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Core Campaign Objectives */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Marketing Campaign Goal
            </label>
            <div className="space-y-2">
              {[
                { id: "engagement", title: "Maximize Social Engagement", detail: "Grow likes, shares, discussions, and brand impressions" },
                { id: "conversions", title: "Direct Lead Conversions", detail: "Drive direct traffic transfers to checkout pages and signups" },
                { id: "awareness", title: "Widespread Brand Awareness", detail: "Broaden corporate identity reach in saturated markets" },
                { id: "lead-generation", title: "B2B Lead Acquisition", detail: "Target strategic decision makers for newsletter opt-ins" },
              ].map((g) => (
                <label
                  key={g.id}
                  onClick={() => setGoal(g.id as any)}
                  className={`flex items-start gap-3 p-3 rounded border text-xs cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                    goal === g.id
                      ? "border-indigo-600 bg-indigo-50/40 text-indigo-950"
                      : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="campaign_goal"
                    checked={goal === g.id}
                    onChange={() => {}}
                    className="mt-0.5 accent-indigo-600 text-indigo-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-800">{g.title}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{g.detail}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-all"
          >
            Go Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            {isSubmitting ? "Saving guidelines..." : "Save Campaign brief"}
          </button>
        </div>
      </form>
    </div>
  );
}
