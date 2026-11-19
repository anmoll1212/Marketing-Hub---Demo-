import { useState } from "react";
import { 
  Sparkles, 
  Send, 
  Check, 
  Copy, 
  Image as ImageIcon, 
  RefreshCw, 
  Calendar, 
  Clock, 
  Settings,
  Tv,
  CheckCircle2,
  Trash2,
  Eye,
  ChevronRight
} from "lucide-react";
import { MarketingCampaign, SocialPost } from "../types";

interface Props {
  campaign: MarketingCampaign;
  onCampaignUpdated: (updatedCampaign: MarketingCampaign) => void;
  onBack: () => void;
}

export default function ContentForge({ campaign, onCampaignUpdated, onBack }: Props) {
  const [channels, setChannels] = useState<string[]>(["Twitter/X", "LinkedIn", "Instagram"]);
  const [tonePreset, setTonePreset] = useState<string>(campaign.tone);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isGeneratingImageId, setIsGeneratingImageId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Local state to allow live in-place edits to copy!
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  // Generate Copy from our Server Proxied Gemini Endpoint (3.5-flash)
  const generateCampaignContent = async () => {
    if (channels.length === 0) {
      setError("Please check at least one target social media channel.");
      return;
    }

    setIsGeneratingCopy(true);
    setError(null);

    try {
      const res = await fetch(`/api/campaigns/${campaign.id}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platforms: channels,
          requestedTone: tonePreset,
        }),
      });

      if (!res.ok) {
        const errObj = await res.json();
        throw new Error(errObj.error || "Failed to trigger AI content generation.");
      }

      await res.json();
      
      // Re-fetch latest campaigns to align updates
      const fetchNew = await fetch("/api/campaigns");
      const list: MarketingCampaign[] = await fetchNew.json();
      const match = list.find((c) => c.id === campaign.id);
      if (match) {
        onCampaignUpdated(match);
      }
    } catch (err: any) {
      console.warn("AI copy synthesis failed:", err);
      setError(err.message || "Failed to contact copywriting engine.");
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  // Generate Image from our Server Proxied Gemini Image model (2.5-flash-image)
  const generateAIArtwork = async (postId: string, imagePrompt: string) => {
    setIsGeneratingImageId(postId);
    setError(null);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      let finalUrl = "";
      if (!res.ok) {
        // Fallback handler if image capabilities of the standard API key are limited
        const data = await res.json();
        if (data.fallbackUrl) {
          finalUrl = data.fallbackUrl;
        } else {
          throw new Error("Unable to synthesize AI art visual.");
        }
      } else {
        const data = await res.json();
        finalUrl = data.imageUrl;
      }

      // Update campaigns memory state with the generated url for this post
      const updatedPosts = campaign.posts.map((p) => {
        if (p.id === postId) {
          return { ...p, imageUrl: finalUrl };
        }
        return p;
      });

      const patchRes = await fetch(`/api/campaigns/${campaign.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: updatedPosts }),
      });

      if (patchRes.ok) {
        const responseData = await patchRes.json();
        onCampaignUpdated(responseData);
      }
    } catch (err: any) {
      console.error(err);
      setError("AI artwork generation failed: " + err.message);
    } finally {
      setIsGeneratingImageId(null);
    }
  };

  // Inline patch content text edit
  const startEditing = (p: SocialPost) => {
    setEditingPostId(p.id);
    setEditingContent(p.content);
  };

  const saveContentEdit = async (pId: string) => {
    const updatedPosts = campaign.posts.map((p) => {
      if (p.id === pId) {
        return { ...p, content: editingContent };
      }
      return p;
    });

    try {
      const patchRes = await fetch(`/api/campaigns/${campaign.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: updatedPosts }),
      });

      if (patchRes.ok) {
        const data = await patchRes.json();
        onCampaignUpdated(data);
        setEditingPostId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger simulated automation publish now!
  const publishToFeedNow = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/publish`, {
        method: "POST",
      });

      if (res.ok) {
        // Refresh campaign state
        const fetchNew = await fetch("/api/campaigns");
        const list: MarketingCampaign[] = await fetchNew.json();
        const match = list.find((c) => c.id === campaign.id);
        if (match) {
          onCampaignUpdated(match);
        }
      }
    } catch (err) {
      console.error("Simulation trigger failed:", err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Twitter/X":
        return <span className="font-bold text-slate-800">𝕏</span>;
      case "LinkedIn":
        return <span className="font-extrabold text-indigo-700">In</span>;
      case "Instagram":
        return <span className="font-bold text-rose-600">📷</span>;
      default:
        return <span className="font-bold text-blue-600">f</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Campaign Metadata Header Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100">
              Active Brief: {campaign.brandName}
            </span>
            <span className="text-slate-400 font-mono text-[10px] font-semibold">{campaign.id}</span>
          </div>
          <h2 className="text-slate-800 text-xl font-bold">{campaign.name}</h2>
          <p className="text-slate-450 text-slate-400 text-xs line-clamp-1 max-w-2xl">{campaign.description}</p>
        </div>

        <button
          onClick={onBack}
          className="text-xs text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded transition-all self-start md:self-center font-bold"
        >
          Back To Campaigns
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-xs text-rose-700 flex items-start gap-2.5">
          <Clock className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Campaign Tuning Criteria & Gen Parameters */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 h-fit space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-slate-500 animate-spin" />
              Generator Workspace
            </h3>
            <p className="text-slate-400 text-[11px] mt-0.5">Control social platform templates and custom AI parameters.</p>
          </div>

          {/* Social Platforms checklist */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">
              Target Networks
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Twitter/X", "LinkedIn", "Instagram", "Facebook"].map((platform) => {
                const isActive = channels.includes(platform);
                return (
                  <button
                    type="button"
                    key={platform}
                    onClick={() => toggleChannel(platform)}
                    className={`flex items-center gap-2 p-2.5 rounded border text-xs text-left transition-all ${
                      isActive
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold"
                        : "border-slate-200 bg-white text-slate-400 hover:bg-slate-550/10"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                      isActive ? "bg-indigo-650 border-indigo-600 text-white" : "border-slate-200 bg-white"
                    }`}>
                      {isActive && <Check className="w-2.5 h-2.5 text-indigo-600" />}
                    </div>
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copywriting Tone refinement Override */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">
              Optimize Tone of Voice
            </label>
            <select
              value={tonePreset}
              onChange={(e) => setTonePreset(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-600"
            >
              <option value="professional">Professional (Sleek, Authoritative)</option>
              <option value="energetic">Energetic (Punchy, Passionate)</option>
              <option value="friendly">Friendly (Warm, Engaging)</option>
              <option value="humorous">Humorous (Witty, Relatable)</option>
              <option value="thought-provoking">Thought-Provoking (Insightful)</option>
            </select>
          </div>

          {/* Prompt guide notes */}
          <div className="bg-indigo-50/40 border border-indigo-100 rounded p-4 text-[11px] text-indigo-900 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-950">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Gemini Optimization Model
            </div>
            <p>
              This utility automatically configures post constraints, hashtags, and layout flow specifically calculated for optimal reach parameters.
            </p>
          </div>

          <button
            id="draft-ai-posts-btn"
            onClick={generateCampaignContent}
            disabled={isGeneratingCopy}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGeneratingCopy ? 'animate-spin' : ''}`} />
            {isGeneratingCopy ? "Drafting Content..." : "Generate AI Posts"}
          </button>
        </div>

        {/* Right Side: Generated Posts & Automated Schedulers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
              <Tv className="w-4 h-4 text-slate-400" />
              Post Draft Deliverability ({campaign.posts.length} drafts)
            </h3>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Campaign Queue
            </span>
          </div>

          {campaign.posts.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-xl py-16 px-6 text-center space-y-3.5 shadow-sm">
              <Sparkles className="w-10 h-10 text-indigo-400 mx-auto animate-bounce" />
              <div className="space-y-1">
                <p className="text-slate-800 text-sm font-bold">No Post Drafts Generated Yet</p>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Click &quot;Generate AI Posts&quot; on the left Workspace. Gemini will outline multi-channel creative content tailored to {campaign.brandName}.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {campaign.posts.map((post) => {
                const isWriting = editingPostId === post.id;
                
                return (
                  <div 
                    key={post.id} 
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:border-slate-350"
                  >
                    {/* Card Top bar */}
                    <div className="border-b border-slate-100 px-4 py-3.5 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 bg-white border border-slate-200 rounded flex items-center justify-center text-xs">
                          {getPlatformIcon(post.platform)}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-800">{post.platform}</span>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">ID: {post.id.substring(post.id.length - 6)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Label */}
                        {post.status === "posted" ? (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-0.5 rounded border border-emerald-100 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Live Feed
                          </span>
                        ) : post.status === "scheduled" ? (
                          <span className="bg-amber-50 text-amber-700 text-[10px] px-2.5 py-0.5 rounded border border-amber-100 font-bold">
                            Scheduled
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-2.5 py-0.5 rounded font-bold font-mono uppercase">
                            Draft
                          </span>
                        )}

                        {/* Tone Consistency Badge */}
                        {post.toneScore && (
                          <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-750 text-indigo-700 px-2 py-0.5 rounded font-bold">
                            Tone Score: {post.toneScore}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Copy editing/display block */}
                    <div className="p-4 space-y-4">
                      {isWriting ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            rows={4}
                            className="w-full bg-white border border-slate-200 p-3 rounded text-xs text-slate-800 focus:outline-none focus:border-indigo-650 focus:border-indigo-600 resize-none font-sans"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingPostId(null)}
                              className="text-[10px] font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveContentEdit(post.id)}
                              className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white rounded px-3 py-1 font-bold"
                            >
                              Save Draft
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-slate-700 text-xs whitespace-pre-line leading-relaxed font-sans select-all">
                            {post.content}
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => startEditing(post)}
                              className="text-[11px] text-indigo-600 hover:text-indigo-700 font-bold"
                            >
                              Edit copy text
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Display Image Block */}
                      {post.imageUrl ? (
                        <div className="relative rounded overflow-hidden border border-slate-200 bg-slate-50">
                          <img 
                            src={post.imageUrl} 
                            alt="AI Social Ad Mockup" 
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-cover max-h-60"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-2">
                            <button
                              onClick={() => generateAIArtwork(post.id, post.imagePrompt)}
                              disabled={isGeneratingImageId !== null}
                              className="p-1.5 rounded bg-white shadow-sm hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 border border-slate-200 disabled:opacity-50"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Regenerate Art
                            </button>
                          </div>
                          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 font-mono leading-tight">
                            <span className="text-indigo-600 font-bold block text-[9px] uppercase tracking-wider mb-1">IMAGE PROMPT GUIDELINE:</span>
                            {post.imagePrompt}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded p-4 flex flex-col md:flex-row items-center justify-between gap-3">
                          <div className="text-[11px] text-slate-500 text-left space-y-1 max-w-sm md:max-w-[70%]">
                            <span className="font-bold text-indigo-605 text-indigo-600 block mb-0.5">Recommended Ad Illustration:</span>
                            <span className="text-slate-400 font-sans italic line-clamp-1">{post.imagePrompt}</span>
                          </div>
                          
                          <button
                            onClick={() => generateAIArtwork(post.id, post.imagePrompt)}
                            disabled={isGeneratingImageId !== null}
                            className="px-4 py-2 font-bold text-[10px] bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded flex items-center gap-1.5 transition-all self-end md:self-center disabled:opacity-50"
                          >
                            {isGeneratingImageId === post.id ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" /> Cooking...
                              </>
                            ) : (
                              <>
                                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" /> Generate Ad graphic
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Display Post Stats if Posted */}
                      {post.status === "posted" && (
                        <div className="grid grid-cols-4 gap-2 bg-slate-50 border border-slate-200 rounded p-3 text-center text-xs">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">Impressions</span>
                            <span className="font-mono text-slate-800 font-bold">{post.impressions.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">Likes</span>
                            <span className="font-mono text-emerald-600 font-bold">{post.likes.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">Comments</span>
                            <span className="font-mono text-indigo-600 font-bold">{post.comments.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase tracking-widest font-bold">Clicks</span>
                            <span className="font-mono text-amber-600 font-bold">{post.clicks.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Scheduling details */}
                    <div className="bg-slate-50/50 border-t border-slate-100 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between text-[11px] text-slate-500 gap-2.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-slate-400 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Optimal Schedule: 
                        </span>
                        <span className="font-mono text-indigo-700 font-bold">{post.scheduledTime}</span>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                        <button
                          onClick={() => copyToClipboard(post.content, post.id)}
                          className="flex items-center gap-1 hover:text-slate-700 font-bold py-1 px-2 hover:bg-slate-100 rounded text-slate-500"
                        >
                          {copiedId === post.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Text
                            </>
                          )}
                        </button>

                        {post.status !== "posted" && (
                          <button
                            onClick={() => publishToFeedNow(post.id)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-1 font-bold tracking-tight transition-all text-xs shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" /> Publish Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
