import { Plus, Trash2, Calendar, Target, Globe, Volume2, ArrowRight } from "lucide-react";
import { MarketingCampaign } from "../types";

interface Props {
  campaigns: MarketingCampaign[];
  onSelectCampaign: (campaign: MarketingCampaign) => void;
  onDeleteCampaign: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: MarketingCampaign["status"]) => void;
  onCreateNewClick: () => void;
}

export default function CampaignsList({
  campaigns,
  onSelectCampaign,
  onDeleteCampaign,
  onToggleStatus,
  onCreateNewClick,
}: Props) {
  const getGoalLabel = (goal: string) => {
    switch (goal) {
      case "engagement":
        return "Social Engagement";
      case "conversions":
        return "Direct Conversions";
      case "awareness":
        return "Brand Awareness";
      case "lead-generation":
        return "Lead Acquisition";
      default:
        return goal;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase font-bold text-[10px] px-2 py-0.5 rounded";
      case "paused":
        return "bg-amber-50 text-amber-700 border border-amber-100 uppercase font-bold text-[10px] px-2 py-0.5 rounded";
      case "draft":
        return "bg-slate-100 text-slate-600 border border-slate-200 uppercase font-bold text-[10px] px-2 py-0.5 rounded";
      default:
        return "bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase font-bold text-[10px] px-2 py-0.5 rounded";
    }
  };

  const getLeftStrokeColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-l-4 border-emerald-500";
      case "paused":
        return "border-l-4 border-amber-500";
      default:
        return "border-l-4 border-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* List Header control row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold">Active Campaign Automations</h2>
          <p className="text-slate-400 text-xs mt-0.5">Configure targeted criteria copyboards and track live publication queues.</p>
        </div>

        <button
          id="create-new-campaign-btn"
          onClick={onCreateNewClick}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded transition-all active:scale-95 self-start sm:self-center shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Brief
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl py-16 px-6 text-center space-y-4 shadow-sm">
          <Globe className="w-10 h-10 text-slate-300 mx-auto animate-pulse" />
          <div className="space-y-1">
            <p className="text-slate-800 text-sm font-bold">No active social media campaigns cataloged</p>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Launch a new targeted social strategy to generate copy blueprints, post mockups, and simulate metrics.
            </p>
          </div>
          <button
            onClick={onCreateNewClick}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded border border-indigo-100"
          >
            Create New Campaign Brief
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => {
            const postedCount = camp.posts.filter((p) => p.status === "posted").length;
            const draftCount = camp.posts.filter((p) => p.status === "draft" || p.status === "scheduled").length;

            return (
              <div
                key={camp.id}
                className={`bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${getLeftStrokeColor(camp.status)}`}
              >
                {/* Upper container */}
                <div className="p-5 space-y-4">
                  {/* Status row */}
                  <div className="flex items-center justify-between">
                    <span className={getStatusBadge(camp.status)}>
                      {camp.status}
                    </span>
                    
                    <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">
                      Created: {new Date(camp.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div className="space-y-1.5">
                    <h3 className="text-slate-800 text-sm font-bold tracking-tight">{camp.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-650 font-semibold">
                      <span>Brand: {camp.brandName}</span>
                    </div>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>
                  </div>

                  {/* Metadata labels */}
                  <div className="grid grid-cols-2 gap-4 text-xs border-y border-slate-100 py-3 mt-3">
                    <div className="space-y-1">
                      <span className="text-slate-400 text-[9px] uppercase tracking-widest block font-bold">Objective Target</span>
                      <span className="text-slate-700 font-bold flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        {getGoalLabel(camp.goal)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 text-[9px] uppercase tracking-widest block font-bold">Voice Tone</span>
                      <span className="text-slate-700 font-bold capitalize flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                        {camp.tone}
                      </span>
                    </div>
                  </div>

                  {/* Generated statistics tags */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-semibold">
                    <div className="flex gap-4">
                      <span>
                        <strong className="text-slate-700">{postedCount}</strong> Active Posts
                      </span>
                      <span>
                        <strong className="text-slate-700">{draftCount}</strong> Copy Drafts
                      </span>
                    </div>

                    {camp.hashtags.length > 0 && (
                      <span className="text-indigo-600 font-mono text-[10px] truncate max-w-[45%] font-bold">
                        #{camp.hashtags[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom interactive action bar */}
                <div className="bg-slate-50 border-t border-slate-100 px-5 py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleStatus(camp.id, camp.status)}
                      className="text-xs px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-800 border border-slate-200 rounded transition-all font-bold"
                    >
                      {camp.status === "active" ? "Pause" : "Resume"}
                    </button>

                    <button
                      onClick={() => onDeleteCampaign(camp.id)}
                      className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded transition-colors"
                      title="Delete Campaign"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectCampaign(camp)}
                    className="text-xs text-indigo-600 hover:text-white hover:bg-indigo-600 font-bold tracking-tight px-3 py-1.5 border border-indigo-200 hover:border-indigo-600 rounded flex items-center gap-1 transition-all shadow-xs"
                  >
                    Open AI Writer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
