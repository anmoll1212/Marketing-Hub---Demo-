/**
 * Types representing Marketing campaign and analytics structures.
 */

export interface MarketingCampaign {
  id: string;
  name: string;
  description: string;
  targetAudience: string;
  goal: "engagement" | "conversions" | "awareness" | "lead-generation";
  tone: "professional" | "energetic" | "friendly" | "humorous" | "thought-provoking";
  brandName: string;
  hashtags: string[];
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  createdAt: string;
  posts: SocialPost[];
}

export interface SocialPost {
  id: string;
  campaignId: string;
  platform: "Twitter/X" | "LinkedIn" | "Instagram" | "Facebook";
  content: string;
  scheduledTime: string;
  status: "draft" | "scheduled" | "posted";
  imagePrompt: string;
  imageUrl?: string;
  toneScore?: number;
  
  // Simulated Analytics per post
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  impressions: number;
}

export interface RealtimeMetric {
  timestamp: string;
  impressions: number;
  clicks: number;
  engagement: number;
  conversions: number;
}

export interface PlatformMetric {
  platform: "Twitter/X" | "LinkedIn" | "Instagram" | "Facebook";
  impressions: number;
  engagement: number;
  clicks: number;
  conversions: number;
  postsCount: number;
}

export interface MarketingAnalytics {
  totals: {
    impressions: number;
    clicks: number;
    engagement: number;
    conversions: number;
    engagementRate: number;
    conversionRate: number;
  };
  byPlatform: PlatformMetric[];
  timeline: RealtimeMetric[];
}
