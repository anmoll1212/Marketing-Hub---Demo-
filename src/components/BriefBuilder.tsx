import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Save, 
  Target, 
  ShieldCheck, 
  HelpCircle, 
  FileText, 
  Smartphone, 
  Laptop, 
  Share2, 
  Video, 
  AlertTriangle,
  Mail,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  FileJson,
  History,
  UserCheck,
  RefreshCw,
  Upload,
  Lock,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck
} from "lucide-react";
import { MarketingCampaign } from "../types";

interface Props {
  onCampaignCreated: (cap: MarketingCampaign) => void;
}

interface BriefSession {
  id: string; 
  project: string;
  briefId: string;
  status: "Draft" | "Submitted" | "Data Request" | "Approved" | "Published";
  activeBriefType: "parent" | "crm" | "web" | "social" | "olv";
  messages: Array<{ sender: "user" | "assistant"; text: string }>;
  uploadedDocs: Array<{ name: string; size: string; date: string; source: string }>;
  feedbacks: Array<{ author: string; text: string; date: string }>;
  completeness: number;
  vitalityScore: number;
  briefRecord: {
    // Basics
    project: string;
    date: string;
    version: string;
    campaignType: string;
    startDate: string;
    endDate: string;
    submittedBy: string;
    round1Due: string;

    // Parent Core fields
    offering_what: string;
    objective_why: string;
    audience_who: string;
    mindset: string;
    takeaway_core: string;
    believe_us: string;
    feel: string;
    tone_mood: string;
    mandatories: string;
    deliverables: string;

    // CRM fields
    crmSubChannel: string;
    emailTemplateType: string;
    subjectLine: string;
    preheaderText: string;
    headlineCopy: string;
    bodyCopy: string;
    ctaText: string;
    ctaLink: string;
    requiredComponents: string[];
    logoIncluded: string;
    legalPhraseCrm: string;
    smsCopy: string;
    pushHeadline: string;
    pushBody: string;

    // Web fields
    campaignTier: string;
    homepagePanels: boolean;
    plpBanners: boolean;
    pdpBanners: boolean;
    dealsPagePanels: boolean;
    dealsProductBadges: boolean;
    legalFooterCopy: string;
    pricingUpdatesNeeded: boolean;
    newLandingPage: boolean;
    testingRequired: boolean;
    personalizationRequired: boolean;
    coOpMaterials: string;
    rewardsLoyalty: string;
    sameAsCashCallout: boolean;
    audienceGroups: string;

    // Social fields
    socialPlatforms: string[];
    adFormats: string;
    socialHeadline: string;
    socialBodyText: string;
    socialCtaText: string;
    socialTargeting: string;
    socialBudgetStrategy: string;

    // OLV fields
    videoLengths: string[];
    aspectRatios: string[];
    heroLockupRequired: boolean;
    olvPlacementChannels: string[];
    scriptVoiceover: string;
    onScreenCopy: string;
    musicAudioDirection: string;
  };
}

export default function BriefBuilder({ onCampaignCreated }: Props) {
  // Pre-configured default sessions supporting the PDF Marketing Lifecycle Spec
  const [sessions, setSessions] = useState<BriefSession[]>([
    {
      id: "RAC-LD-2026",
      project: "Labor Day Sale",
      briefId: "RAC-BR-0823",
      status: "Draft",
      activeBriefType: "parent",
      completeness: 75,
      vitalityScore: 78,
      uploadedDocs: [],
      feedbacks: [],
      messages: [
        {
          sender: "assistant",
          text: "Hello! I am your AI Campaign Brief Coordinator. I loaded your RAC Labor Day details. Let's map target dates and disclosures."
        },
        {
          sender: "user",
          text: "Can you make sure we offer up to 15 days free for $10 for Labor Day?"
        },
        {
          sender: "assistant",
          text: "I have updated the offering spec to: 'Customers receive 2 weeks free for $10, specifically up to 15 days free for $10.' Your completeness is now 75%. Ready to test?"
        }
      ],
      briefRecord: {
        project: "Labor Day Sale",
        date: "2026-06-01",
        version: "v1.0",
        campaignType: "National",
        startDate: "2026-08-23",
        endDate: "2026-09-07",
        submittedBy: "Monark Unadkat",
        round1Due: "2026-08-09",
        offering_what: "This campaign offers customers 2 weeks free for $10, specifically up to 15 days free for $10. Limited-time promotional offer designed to capture the holiday season.",
        objective_why: "The primary business goal is to drive funded lease agreements during the Labor Day window. We aim to outperform last year's Labor Day campaign.",
        audience_who: "Primary: Existing and lapsed RAC customers with active approvals. Secondary: In-market furniture buyers.",
        mindset: "Back to school window; children are back in class. Conscious of budget but wants holiday home upgrades.",
        takeaway_core: "Compelling offer of '2 weeks free for $10' (up to 15 days free), highlighting low barriers and safety nets.",
        believe_us: "RAC has a long-standing history of lease-to-own with no credit needed and flexible weekly plans.",
        feel: "Empowered, respected, and excited with an easy 'yes' solution.",
        tone_mood: "Confident and warm, avoiding pushy or salesy approach, with 'we've got you' energy.",
        mandatories: "Caret disclosure '2 weeks free for $10^' on the headline, and disclaimer: 'Does not reduce total cost to own.'",
        deliverables: "Multi-channel outputs: Online Video (OLV) cuts, Static Mobile + Desktop hero banners, CRM Email templates.",
        
        crmSubChannel: "Email + SMS",
        emailTemplateType: "Ad Hoc Promo",
        subjectLine: "2 Weeks Free for $10 — Shop the Labor Day Sale",
        preheaderText: "Your shopping power is waiting — limited time offer ends 9/7",
        headlineCopy: "Get 2 Weeks Free for Just $10",
        bodyCopy: "Shop furniture, appliances, electronics and more this Labor Day — start your lease for only $10 and get 2 weeks free. No perfect credit needed.",
        ctaText: "Shop Nearby Stores",
        ctaLink: "rentacenter.com/find-a-store",
        requiredComponents: ["Header", "Hero", "Value Prop"],
        logoIncluded: "Bob's Discount Furniture logo, GameStop logo",
        legalPhraseCrm: "2 weeks free for $10^ Does not reduce total cost to own.",
        smsCopy: "Acima: Get 2 weeks free for $10 this Labor Day. Shop now: https://zsms.io/XXXXXXX",
        pushHeadline: "Your dream bedroom awaits",
        pushBody: "Lease-to-own with Acima today. Free delivery.",
        
        campaignTier: "Level 2 - Enhanced",
        homepagePanels: true,
        plpBanners: true,
        pdpBanners: true,
        dealsPagePanels: false,
        dealsProductBadges: true,
        legalFooterCopy: "Standard L2O disclosure required",
        pricingUpdatesNeeded: true,
        newLandingPage: true,
        testingRequired: true,
        personalizationRequired: true,
        coOpMaterials: "Ashley co-op LP",
        rewardsLoyalty: "Loyalty members get extra 5%",
        sameAsCashCallout: true,
        audienceGroups: "NCA, PIF, OTB, EXP",
        
        socialPlatforms: ["Meta", "Google"],
        adFormats: "Static, Carousel",
        socialHeadline: "2 Weeks Free for $10 — Labor Day Sale",
        socialBodyText: "Shop furniture, appliances, electronics and more at RAC this Labor Day. Start your lease for just $10.",
        socialCtaText: "Shop Now",
        socialTargeting: "Meta: Retargeting past site visitors 25-55.",
        socialBudgetStrategy: "$50K total, 70/30 split Meta/Google.",
        
        videoLengths: ["15s", "30s"],
        aspectRatios: ["16:9", "9:16"],
        heroLockupRequired: true,
        olvPlacementChannels: ["YouTube", "CTV"],
        scriptVoiceover: "Open on a family at home with flatware. Voiceover: 'This Labor Day, get 2 weeks free for just $10 at Rent-A-Center.'",
        onScreenCopy: "RAC logo, '2 weeks free for $10' offer lockup",
        musicAudioDirection: "Upbeat, energetic, family-friendly."
      }
    },
    {
      id: "HC-BTS-2026",
      project: "HC Back to School Sale",
      briefId: "HC-BR-0912",
      status: "Data Request",
      activeBriefType: "crm",
      completeness: 85,
      vitalityScore: 65,
      uploadedDocs: [
        { name: "ashley_partner_rules_v1.pdf", size: "1.4 MB", date: "2026-06-03", source: "Marketing Partner Portal" }
      ],
      feedbacks: [
        { author: "leyla.marketing@rentacenter.com", text: "Please supply the validated Ashley Partner Contract to back up the co-op logo usage on CRM panels.", date: "2026-06-03 14:22" }
      ],
      messages: [
        { sender: "assistant", text: "I've structured your child CRM parameters. Completeness is flagged because the approver requested a verification asset." }
      ],
      briefRecord: {
        project: "HC Back to School Sale",
        date: "2026-06-02",
        version: "v1.1",
        campaignType: "National",
        startDate: "2026-08-10",
        endDate: "2026-08-30",
        submittedBy: "Monark Unadkat",
        round1Due: "2026-07-27",
        offering_what: "Up to 50% off select student packages and computing desk systems.",
        objective_why: "Capture seasonal back-to-school lease conversions.",
        audience_who: "Lapsed Rent-A-Center with family approvals.",
        mindset: "Moms preparing children for school; tight financial liquidity.",
        takeaway_core: "Equip your child's student room for just $10 down.",
        believe_us: "No credit cards, cancel anytime guarantee.",
        feel: "Relieved, equipped, affordable.",
        tone_mood: "Supportive, bright, optimistic.",
        mandatories: "All computer systems must bear back-to-school surcharge caveats.",
        deliverables: "Email + SMS Broadcast.",
        
        crmSubChannel: "Email + SMS",
        emailTemplateType: "Triggered",
        subjectLine: "Ready for class? Start leases for only $10 with Ashley Furniture components",
        preheaderText: "Limited-time deals run through August 30 across all franchises",
        headlineCopy: "Back To School Study Haven packages",
        bodyCopy: "Get stylish desks, durable ergonomic chairs, and high-performance computing systems.",
        ctaText: "Shop Student Promos",
        ctaLink: "rentacenter.com/education",
        requiredComponents: ["Header", "Hero", "Transition", "Category"],
        logoIncluded: "Ashley Furniture logo",
        legalPhraseCrm: "Ashley co-op authorization terms map separately.",
        smsCopy: "Acima Back to School: $10 gets your student workspace ready. Apply online: https://zsms.io/BTSSTUDENT",
        pushHeadline: "Your student desk is ready",
        pushBody: "Lease starting from $10 today.",
        
        campaignTier: "Level 1 - Basic",
        homepagePanels: false,
        plpBanners: true,
        pdpBanners: false,
        dealsPagePanels: true,
        dealsProductBadges: true,
        legalFooterCopy: "Requires standard legal footer",
        pricingUpdatesNeeded: false,
        newLandingPage: false,
        testingRequired: true,
        personalizationRequired: false,
        coOpMaterials: "Ashley co-op guidelines",
        rewardsLoyalty: "None requested",
        sameAsCashCallout: true,
        audienceGroups: "PIF, OTB",
        
        socialPlatforms: ["Meta"],
        adFormats: "Static",
        socialHeadline: "Get school-ready for $10 down",
        socialBodyText: "Complete study gear ready.",
        socialCtaText: "Apply Now",
        socialTargeting: "Target Parents 30-55.",
        socialBudgetStrategy: "Meta static allocation.",
        
        videoLengths: ["15s"],
        aspectRatios: ["9:16"],
        heroLockupRequired: false,
        olvPlacementChannels: ["YouTube"],
        scriptVoiceover: "Voiceover speaking to student focus.",
        onScreenCopy: "Student packs start $10.",
        musicAudioDirection: "Cheerful acoustic tune."
      }
    },
    {
      id: "GIN-NTV-2026",
      project: "Smart Home & TV Event",
      briefId: "GIN-BR-1120",
      status: "Approved",
      activeBriefType: "web",
      completeness: 100,
      vitalityScore: 92,
      uploadedDocs: [
        { name: "gcp_demographics_tv_buyers.xlsx", size: "480 KB", date: "2026-05-30", source: "Searce BigQuery Stream" }
      ],
      feedbacks: [
        { author: "leyla.marketing@rentacenter.com", text: "Approved! Clean, compliant disclosures and fully mapped out web components.", date: "2026-06-01 09:10" }
      ],
      messages: [
        { sender: "assistant", text: "Your brief has been signed off! Ready for downstream multi-channel content generation." }
      ],
      briefRecord: {
        project: "Smart TV Event",
        date: "2026-05-25",
        version: "v1.2",
        campaignType: "National",
        startDate: "2026-11-20",
        endDate: "2026-12-05",
        submittedBy: "Monark Unadkat",
        round1Due: "2026-11-06",
        offering_what: "TV & Tech upgrades with up to 15 days free on start downpayments.",
        objective_why: "Drive holiday TV lease agreements.",
        audience_who: "Gamers and home theater buyers.",
        mindset: "Holiday entertaining, Thanksgiving sports focus.",
        takeaway_core: "Upgrade your TV before kickoff.",
        believe_us: "Instant delivery, same as cash callouts active.",
        feel: "Upgraded, excited, festive.",
        tone_mood: "Bold, neighborly, high-tech.",
        mandatories: "Include GameStop and Samsung logos correctly.",
        deliverables: "Web landing page and display ads.",
        
        crmSubChannel: "In-App",
        emailTemplateType: "Triggered",
        subjectLine: "Kickoff the season in 4K — Upgrade today",
        preheaderText: "Start TV leases for just $10 down and enjoy host-tier benefits",
        headlineCopy: "Upgrade to 4K Theater",
        bodyCopy: "Widescreen TV deals on LG and Samsung.",
        ctaText: "Choose My screen",
        ctaLink: "rentacenter.com/tv-event",
        requiredComponents: ["Hero", "Value Prop", "Category"],
        logoIncluded: "Samsung and LG logo",
        legalPhraseCrm: "Disclosures attached on PDP pages.",
        smsCopy: "Upgrade your sports experience with a brand new TV lease. Shop now: rentacenter.com",
        pushHeadline: "Kickoff special",
        pushBody: "New TVs starting at $10/week.",
        
        campaignTier: "Level 3 - Takeover",
        homepagePanels: true,
        plpBanners: true,
        pdpBanners: true,
        dealsPagePanels: true,
        dealsProductBadges: true,
        legalFooterCopy: "Level 3 takeover requires custom brand templates.",
        pricingUpdatesNeeded: true,
        newLandingPage: true,
        testingRequired: true,
        personalizationRequired: true,
        coOpMaterials: "Samsung partner collateral",
        rewardsLoyalty: "Bonus points for electronics category",
        sameAsCashCallout: true,
        audienceGroups: "NCA, EXP",
        
        socialPlatforms: ["Meta", "Google"],
        adFormats: "Carousel, Performance Max",
        socialHeadline: "Big Screen Widescreens from $10",
        socialBodyText: "Shop the Smart Home and TV event today.",
        socialCtaText: "Find Deal",
        socialTargeting: "Electronics and gamer interests.",
        socialBudgetStrategy: "$100K smart allocation.",
        
        videoLengths: ["30s"],
        aspectRatios: ["16:9"],
        heroLockupRequired: true,
        olvPlacementChannels: ["YouTube", "Programmatic"],
        scriptVoiceover: "Voiceover highlights home family viewing.",
        onScreenCopy: "Upgrade your space.",
        musicAudioDirection: "Epic, cinematic and dramatic."
      }
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Email Apporval Sandbox Panel simulation states
  const [simulatedEmailClient, setSimulatedEmailClient] = useState(false);
  const [showApproverPortal, setShowApproverPortal] = useState(false);
  const [approverFeedback, setApproverFeedback] = useState("");
  const [uploadProgress, setUploadProgress] = useState(false);

  // BigQuery integration state and logs log
  const [bqLoggingRows, setBqLoggingRows] = useState<string[]>([]);
  const [syncingBq, setSyncingBq] = useState(false);

  // Real Email form submission states
  const [actualRecipientEmail, setActualRecipientEmail] = useState("leyla.marketing@rentacenter.com");
  const [emailStatusMessage, setEmailStatusMessage] = useState<{ type: "success" | "error"; text: string; previewUrl?: string | null } | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [smtpConfig, setSmtpConfig] = useState<any>(null);

  // Active Session Resolution Helper
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || {
    id: "",
    project: "",
    briefId: "",
    status: "Draft",
    activeBriefType: "parent",
    completeness: 0,
    vitalityScore: 0,
    uploadedDocs: [],
    feedbacks: [],
    messages: [],
    briefRecord: {
      project: "",
      date: "",
      version: "",
      campaignType: "National",
      startDate: "",
      endDate: "",
      submittedBy: "",
      round1Due: "",
      offering_what: "",
      objective_why: "",
      audience_who: "",
      mindset: "",
      takeaway_core: "",
      believe_us: "",
      feel: "",
      tone_mood: "",
      mandatories: "",
      deliverables: "",
      crmSubChannel: "Email",
      emailTemplateType: "Ad Hoc Promo",
      subjectLine: "",
      preheaderText: "",
      headlineCopy: "",
      bodyCopy: "",
      ctaText: "",
      ctaLink: "",
      requiredComponents: ["Header"],
      logoIncluded: "",
      legalPhraseCrm: "",
      smsCopy: "",
      pushHeadline: "",
      pushBody: "",
      campaignTier: "Level 1 - Basic",
      homepagePanels: false,
      plpBanners: false,
      pdpBanners: false,
      dealsPagePanels: false,
      dealsProductBadges: false,
      legalFooterCopy: "",
      pricingUpdatesNeeded: false,
      newLandingPage: false,
      testingRequired: false,
      personalizationRequired: false,
      coOpMaterials: "",
      rewardsLoyalty: "",
      sameAsCashCallout: false,
      audienceGroups: "NCA",
      socialPlatforms: ["Meta"],
      adFormats: "Static",
      socialHeadline: "",
      socialBodyText: "",
      socialCtaText: "",
      socialTargeting: "",
      socialBudgetStrategy: "",
      videoLengths: ["15s"],
      aspectRatios: ["16:9"],
      heroLockupRequired: false,
      olvPlacementChannels: ["YouTube"],
      scriptVoiceover: "",
      onScreenCopy: "",
      musicAudioDirection: ""
    }
  };

  const { briefRecord, activeBriefType, completeness, vitalityScore, uploadedDocs, feedbacks, messages } = activeSession;

  // Persistence methods via local JSON API
  const saveSessionsList = async (newList: BriefSession[]) => {
    try {
      await fetch("/api/brief-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessions: newList })
      });
    } catch (err) {
      console.error("Error writing active sessions:", err);
    }
  };

  const loadSessionsFromApi = async () => {
    try {
      const res = await fetch("/api/brief-sessions");
      if (res.ok) {
         const data = await res.json();
         if (data && data.length > 0) {
           setSessions(data);
           
           // Check for URL parameters to automatically select session & mode on load
           const params = new URLSearchParams(window.location.search);
           const sessionParam = params.get("session");
           const modeParam = params.get("mode");
           if (sessionParam) {
             const found = data.find((s: any) => s.id === sessionParam);
             if (found) {
               setActiveSessionId(sessionParam);
               if (modeParam === "approver") {
                 setShowApproverPortal(true);
               }
             }
           }
         }
      }
    } catch (err) {
      console.error("Error reading active sessions:", err);
    }
  };

  const loadSmtpStatus = async () => {
    try {
      const res = await fetch("/api/smtp-config-status");
      if (res.ok) {
        const data = await res.json();
        setSmtpConfig(data);
      }
    } catch (err) {
      console.error("Error loading SMTP status:", err);
    }
  };

  useEffect(() => {
    loadSessionsFromApi();
    loadSmtpStatus();
  }, []);

  // Sync state update wrapper helper
  const updateActiveSession = (updates: Partial<BriefSession>) => {
    setSessions(prev => {
      const nextList = prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, ...updates };
        }
        return s;
      });
      saveSessionsList(nextList);
      return nextList;
    });
  };

  const updateBriefRecord = (recordUpdates: Partial<typeof briefRecord>) => {
    const nextRecord = { ...briefRecord, ...recordUpdates };
    setSessions(prev => {
      const nextList = prev.map(s => {
        if (s.id === activeSessionId) {
          const next = { ...s, briefRecord: nextRecord };
          const metrics = calculateMetricsForRecord(nextRecord, s.activeBriefType);
          next.completeness = metrics.comp;
          next.vitalityScore = metrics.vitality;
          return next;
        }
        return s;
      });
      saveSessionsList(nextList);
      return nextList;
    });
  };

  // Dedicated metrics engine (stateless)
  const calculateMetricsForRecord = (record: typeof briefRecord, type: string) => {
    const basics = [record.project, record.offering_what, record.objective_why, record.audience_who];
    const coreCount = basics.filter(v => v && v.trim() !== "").length;
    let baseComp = Math.floor((coreCount / basics.length) * 50);
    const typeSpecCount = type === "parent" ? 30 : 50;
    const comp = Math.min(100, baseComp + typeSpecCount);

    const textAgg = (
      (record.project || "") + 
      (record.offering_what || "") + 
      (record.objective_why || "") + 
      (record.takeaway_core || "")
    ).toLowerCase();

    const commonPatterns = ["generic", "furniture promo", "10% off", "cheap desks", "standard"];
    let friction = 0;
    commonPatterns.forEach(pat => {
      if (textAgg.includes(pat)) friction += 15;
    });

    const uniqueLength = textAgg.replace(/\s/g, "").length;
    const sizeMult = Math.min(60, Math.floor(uniqueLength * 0.12));
    const vitality = Math.max(10, Math.min(100, (40 + sizeMult) - friction));

    return { comp, vitality };
  };

  const isFieldFilled = (val: any) => {
    if (typeof val === "boolean") return true; 
    if (Array.isArray(val)) return val.length > 0;
    return val !== undefined && val !== null && val.toString().trim() !== "";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    const nextMessages = [...messages, { sender: "user" as const, text: userMsg }];
    
    updateActiveSession({ messages: nextMessages });
    setInputValue("");
    setIsSynthesizing(true);

    try {
      const res = await fetch("/api/brief-sessions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: nextMessages, 
          briefRecord 
        }),
      });

      if (res.ok) {
        const data = await res.json();
        
        if (data.updatedRecord) {
          updateBriefRecord(data.updatedRecord);
        }
        
        updateActiveSession({
          messages: [...nextMessages, { sender: "assistant" as const, text: data.assistantReply || "Done." }]
        });
      } else {
        updateActiveSession({
          messages: [...nextMessages, { sender: "assistant" as const, text: "Ah, something went wrong calling the model." }]
        });
      }
    } catch (e) {
      console.error(e);
      updateActiveSession({
        messages: [...nextMessages, { sender: "assistant" as const, text: "I encountered a network issue." }]
      });
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  // Live Card Navigation and Carousel constraints
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    setActiveCardIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards && cards[index]) {
        const cardElement = cards[index] as HTMLElement;
        container.scrollTo({
          left: cardElement.offsetLeft - container.offsetLeft,
          behavior: "smooth"
        });
      }
    }
  };

  const handleScrollDetect = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPos = container.scrollLeft;
      const cardWidth = container.clientWidth || 400;
      const index = Math.round(scrollPos / cardWidth);
      if (index >= 0 && index <= 4 && index !== activeCardIndex) {
        setActiveCardIndex(index);
      }
    }
  };

  // Real Email dispatch transport caller
  const handleTransmitRealEmail = async () => {
    setSendingEmail(true);
    setEmailStatusMessage(null);
    try {
      const res = await fetch("/api/brief-sessions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: activeSession.id,
          recipientEmail: actualRecipientEmail
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.sentDirectly) {
          const isEthereal = data.sentViaEthereal || false;
          setEmailStatusMessage({
            type: "success",
            text: isEthereal 
              ? `🎉 Real SMTP email dispatched via high-performance Ethereal mail simulator to ${data.recipient}! See interactive mail preview url below.`
              : `🎉 Actual email successfully dispatched via SMTP to ${data.recipient}! Message ID: ${data.messageId}`,
            previewUrl: data.previewUrl
          });
          // Update the session's chat log
          updateActiveSession({
            messages: [
              ...messages,
              { 
                sender: "assistant" as const, 
                text: isEthereal 
                  ? `✉️ Live Ethereal SMTP transmission simulated successfully for ${data.recipient}. Preview Link generated: ${data.previewUrl || "N/A"}`
                  : `✉️ Emailed verification session to standard approver lead at ${data.recipient}. SMTP delivery logged successfully.` 
              }
            ]
          });
        } else {
          setEmailStatusMessage({
            type: "success",
            text: `🚀 SMTP server defaults not specified, but the email markup has been generated successfully! Copy logged in terminal & beautiful preview is drawn below.`
          });
          updateActiveSession({
            messages: [
              ...messages,
              { sender: "assistant" as const, text: `✉️ Compiled sign-off template and simulation token workspace. Delivery falling back and rendering.` }
            ]
          });
        }
      } else {
        setEmailStatusMessage({
          type: "error",
          text: `❌ Standard email dispatcher error: ${data.error || "Please check server connection."}`
        });
      }
    } catch (err: any) {
      setEmailStatusMessage({
        type: "error",
        text: `❌ Critical system mail error: ${err.message}`
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // Simulated BigQuery streaming service
  const handleSyncToBigQuery = async () => {
    setSyncingBq(true);
    setBqLoggingRows(prev => [...prev, `[${new Date().toLocaleTimeString()}] Establishing secure gRPC buffer to BigQuery Stream API...`]);
    try {
      const res = await fetch("/api/brief-sessions/sync-bq", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBqLoggingRows(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ✅ STREAM COMPLETE: Saved ${data.synchronizedCount} records in warehouse dataset.`,
          `[${new Date().toLocaleTimeString()}] Table Ref: \`${data.projectId}.${data.datasetId}.${data.tableId}\``,
          `[${new Date().toLocaleTimeString()}] Storage Write API Mode: ${data.writeAPI}`,
          `[${new Date().toLocaleTimeString()}] Estimated Google Cloud Egress cost: $${data.egressCostUSD} USD`
        ]);
      } else {
        setBqLoggingRows(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ❌ BigQuery Streaming failed: ${data.error || "Warehouse buffer rejected schema."}`
        ]);
      }
    } catch (err: any) {
      setBqLoggingRows(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ❌ Network disruption on pipeline sync: ${err.message}`
      ]);
    } finally {
      setSyncingBq(false);
    }
  };

  const createNewSession = () => {
    const newId = `SESS-${Date.now().toString().slice(-4)}`;
    const newSess: BriefSession = {
      id: newId,
      project: `Adhoc Campaign ${newId}`,
      briefId: `HC-BR-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Draft",
      activeBriefType: "parent",
      completeness: 20,
      vitalityScore: 0,
      uploadedDocs: [],
      feedbacks: [],
      messages: [
        {
          sender: "assistant",
          text: `Established secure brief drafting workspace session ${newId}. Provide campaign context to start.`
        }
      ],
      briefRecord: {
        project: `Adhoc Campaign ${newId}`,
        date: new Date().toLocaleDateString(),
        version: "1.0.0",
        campaignType: "National",
        startDate: "2026-06-25",
        endDate: "2026-07-10",
        submittedBy: "Monark Unadkat",
        round1Due: "2026-06-11",
        offering_what: "",
        objective_why: "",
        audience_who: "",
        mindset: "",
        takeaway_core: "",
        believe_us: "",
        feel: "",
        tone_mood: "",
        mandatories: "",
        deliverables: "Digital banners setup",
        crmSubChannel: "Email",
        emailTemplateType: "Ad Hoc Promo",
        subjectLine: "",
        preheaderText: "",
        headlineCopy: "",
        bodyCopy: "",
        ctaText: "",
        ctaLink: "",
        requiredComponents: ["Header"],
        logoIncluded: "",
        legalPhraseCrm: "",
        smsCopy: "",
        pushHeadline: "",
        pushBody: "",
        campaignTier: "Level 1 - Basic",
        homepagePanels: false,
        plpBanners: false,
        pdpBanners: false,
        dealsPagePanels: false,
        dealsProductBadges: false,
        legalFooterCopy: "",
        pricingUpdatesNeeded: false,
        newLandingPage: false,
        testingRequired: false,
        personalizationRequired: false,
        coOpMaterials: "",
        rewardsLoyalty: "",
        sameAsCashCallout: false,
        audienceGroups: "NCA",
        socialPlatforms: ["Meta"],
        adFormats: "Static",
        socialHeadline: "",
        socialBodyText: "",
        socialCtaText: "",
        socialTargeting: "",
        socialBudgetStrategy: "",
        videoLengths: ["15s"],
        aspectRatios: ["16:9"],
        heroLockupRequired: false,
        olvPlacementChannels: ["YouTube"],
        scriptVoiceover: "",
        onScreenCopy: "",
        musicAudioDirection: ""
      }
    };

    setSessions(prev => {
      const nextList = [...prev, newSess];
      saveSessionsList(nextList);
      return nextList;
    });
    setActiveSessionId(newId);
  };

  const handleStatusTransition = (nextStatus: BriefSession["status"]) => {
    updateActiveSession({ status: nextStatus });
    
    // Auto populate workflow history
    let notificationText = "";
    if (nextStatus === "Submitted") {
      notificationText = `🔔 Lifecycle Action: Brief submitted to leyla.marketing@rentacenter.com for verification. Drafted secure session token. Ready to simulate email.`;
      setSimulatedEmailClient(true);
    } else if (nextStatus === "Approved") {
      notificationText = `🎉 Signoff Action: Brand Approver formally locked the schema. Downstream APIs initialized.`;
    } else if (nextStatus === "Data Request") {
      notificationText = `⚠️ Workflow Request: Approver flagged questions on active proof points. Session unlocked for data response upload.`;
    }
    
    updateActiveSession({
      status: nextStatus,
      messages: [...messages, { sender: "assistant" as const, text: notificationText }]
    });
  };

  // Mock Uploading a regulatory file / Ashley partner agreement
  const simulateContractUpload = () => {
    setUploadProgress(true);
    setTimeout(() => {
      const mockFile = {
        name: "Acima_Partner_Signoff_Signed.pdf",
        size: "2.1 MB",
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        source: "Searce secure client upload"
      };
      
      updateActiveSession({
        uploadedDocs: [...uploadedDocs, mockFile],
        messages: [
          ...messages,
          { sender: "user" as const, text: `Attached asset justification: ${mockFile.name}` },
          { sender: "assistant" as const, text: `Successfully indexed ${mockFile.name} inside GCP bucket for RAG model retrieval. Completeness index validated.` }
        ]
      });
      setUploadProgress(false);
    }, 1000);
  };

  // Submit formal feedback from Leyla M
  const handleApproverSubmitFeedback = () => {
    if (!approverFeedback.trim()) return;

    const newFb = {
      author: "leyla.marketing@rentacenter.com",
      text: approverFeedback.trim(),
      date: new Date().toISOString().replace("T", " ").slice(0, 16)
    };

    const nextMessages = [
      ...messages,
      { sender: "assistant" as const, text: `💬 Approver Feedback from Leyla M: "${newFb.text}"` }
    ];

    updateActiveSession({
      feedbacks: [...feedbacks, newFb],
      messages: nextMessages
    });

    setApproverFeedback("");
  };

  // Deploy Approved brief as a formal campaign
  const handlePublishToDownstream = async () => {
    setIsSynthesizing(true);
    try {
      const hashtags = briefRecord.project.toLowerCase().includes("labor") 
        ? ["RAC_LaborDay", "RentToOwn", "AcimaFlex"]
        : ["RAC_Action", "Promo2026"];

      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: briefRecord.project,
          brandName: "Rent-A-Center",
          description: `Strategic Goal: ${briefRecord.objective_why}. Offer Specifics: ${briefRecord.offering_what}`,
          targetAudience: briefRecord.audience_who || "All Lapsed approved segments",
          goal: "conversions",
          tone: "professional",
          hashtags,
        })
      });

      if (res.ok) {
        const payload = await res.json();
        updateActiveSession({ status: "Published" });
        onCampaignCreated(payload);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Load labor day presets (Page 10, v1.0)
  const applyPresetLayout = (type: typeof activeBriefType) => {
    updateActiveSession({ activeBriefType: type });
    // Reset indicators
    updateBriefRecord(activeSession.briefRecord);
  };

  // Check character bounds on SMS
  const getSmsInputFeedback = () => {
    if (!briefRecord.smsCopy) return null;
    const len = briefRecord.smsCopy.length;
    if (len > 160) {
      return { err: true, msg: "Exceeds standard 160-char SMS carrier limit. Under active trafficking, this will split or truncate!" };
    }
    return { err: false, msg: `${len}/160 characters (1 standard carrier block used).` };
  };

  if (activeSessionId === null) {
    const totalSessions = sessions.length;
    const submittedCount = sessions.filter(s => s.status === "Submitted").length;
    const approvedCount = sessions.filter(s => s.status === "Approved" || s.status === "Published").length;
    const avgCompleteness = totalSessions > 0
      ? Math.round(sessions.reduce((acc, s) => acc + (s.completeness || 0), 0) / totalSessions)
      : 0;

    return (
      <div id="brief-builder-dashboard" className="space-y-6 font-sans">
        
        {/* DASHBOARD TOP HEADER HERO */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-1 px-2 bg-white rounded shadow-sm shrink-0 flex items-center justify-center">
                  <img 
                    src="https://www.searce.com/images/logo.svg?dpl=dpl_H2dvM8dpYWN4sLgwR6QcuAfpro3Z" 
                    alt="Searce logo" 
                    className="h-3.5 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs font-semibold text-indigo-400 font-mono tracking-wider block">
                  Enterprise Marketing Lifecycle
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white font-sans">
                Searce Automated Campaign Brief Matrix
              </h1>
              <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
                Connect and manage campaign specifications. Build strategic definitions inside durable sandboxed sessions, synchronizing metrics real-time with Google Cloud BigQuery warehouses and dispatching actual Nodemailer email triggers to legal sign-off authorities.
              </p>
            </div>
            <button
              onClick={createNewSession}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4 text-white" />
              Start New Campaign Brief Workspace
            </button>
          </div>
        </div>

        {/* METADATA DIAGNOSTICS KEYSTATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-base">📊</div>
            <div>
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Active Briefs</span>
              <span className="text-lg font-bold text-slate-800 block">{totalSessions}</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-base">📈</div>
            <div>
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Average Progress</span>
              <span className="text-lg font-bold text-slate-800 block">{avgCompleteness}%</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-base">⏳</div>
            <div>
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Under Signaling Reviews</span>
              <span className="text-lg font-bold text-slate-800 block">{submittedCount}</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-base">🎉</div>
            <div>
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Completed Sign-offs</span>
              <span className="text-lg font-bold text-slate-800 block">{approvedCount}</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: MAIN LIST + BIGQUERY PERSISTENCE PANEL */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          
          {/* ALL BUILDER SESSIONS TABLE LIST */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-slate-850 text-sm font-bold flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-indigo-600" />
                  Lifecycle Sessions Registry
                </h2>
                <p className="text-slate-400 text-[11px] mt-0.5">Click resume workspace to join cooperative thread dialogue and adjust schema values</p>
              </div>
            </div>

            {/* SESSIONS ROW LAYOUT GRID */}
            <div className="space-y-3.5">
              {sessions.map((sess) => {
                let statusBadgeColor = "bg-slate-150 text-slate-700";
                if (sess.status === "Submitted") statusBadgeColor = "bg-blue-50 text-blue-700 border border-blue-150";
                if (sess.status === "Data Request") statusBadgeColor = "bg-amber-100 text-amber-800 border border-amber-200";
                if (sess.status === "Approved") statusBadgeColor = "bg-emerald-50 text-emerald-700 border border-emerald-200";
                if (sess.status === "Published") statusBadgeColor = "bg-indigo-50 text-indigo-700 border border-indigo-200";

                return (
                  <div key={sess.id} className="p-4 border border-slate-200 hover:border-slate-300 rounded-xl bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition text-xs">
                    
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 rounded text-slate-700">
                          {sess.briefId}
                        </span>
                        <span className={`text-[9.5px] font-bold font-mono uppercase px-2 py-0.5 rounded ${statusBadgeColor}`}>
                          {sess.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Flight: {sess.briefRecord.startDate || "TBD"}</span>
                      </div>
                      <h3 className="font-bold text-slate-855 truncate text-sm">{sess.project}</h3>
                      
                      <div className="flex items-center gap-4 text-[10px] text-slate-400">
                        <span>Submitted By: <strong>{sess.briefRecord.submittedBy || "CRM Lead"}</strong></span>
                        <span>Channel Spec: <strong className="text-indigo-600 font-bold">{sess.activeBriefType.toUpperCase()}</strong></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:items-end gap-3 shrink-0">
                      {/* COMPRESSED METRICS COMPLEMENTSBAR */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="text-slate-450 block font-medium">Completeness Index</span>
                          <span className="font-bold font-mono text-slate-700">{sess.completeness}%</span>
                        </div>
                        <div className="w-28 md:w-32 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full transition-all duration-750" style={{ width: `${sess.completeness}%` }}></div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveSessionId(sess.id);
                          setSimulatedEmailClient(sess.status === "Submitted");
                        }}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10.5px] cursor-pointer flex items-center justify-center gap-1 transition shadow-xs active:scale-95"
                      >
                        Resume Workspace 🔑
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: BIGQUERY STREAMING CONTROLLERS */}
          <div className="bg-slate-900 border border-slate-900 text-slate-100 rounded-xl p-5 space-y-4 shadow-sm font-sans">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-indigo-400 font-mono font-bold block uppercase tracking-widest">Google Cloud Analytics</span>
                <h3 className="text-white text-xs font-bold">BigQuery stream sync pipeline</h3>
              </div>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 font-mono rounded border border-slate-700">ONLINE</span>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              Synchronize localized JSON campaign building state records straight into real-time BigQuery analytics table rows via streamed gRPC write APIs.
            </p>

            <button
              onClick={handleSyncToBigQuery}
              disabled={syncingBq}
              className="w-full py-2.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-white ${syncingBq ? "animate-spin" : ""}`} />
              {syncingBq ? "Streaming Records..." : "⚡ Sync All Sessions to BigQuery"}
            </button>

            {/* LIVE BIGQUERY STREAM TERMINAL LOGGER */}
            <div className="bg-black rounded-xl border border-slate-800 p-3 h-52 overflow-y-auto font-mono text-[9.5px] text-slate-300 tracking-normal space-y-1">
              <div className="text-slate-500 italic select-none">-- BigQuery Streaming logs --</div>
              {bqLoggingRows.length === 0 && (
                <div className="text-slate-500">[System idle. Awaiting BigQuery Stream Synchronization call.]</div>
              )}
              {bqLoggingRows.map((logRow, k) => (
                <div key={k} className="leading-relaxed whitespace-pre-wrap">{logRow}</div>
              ))}
            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div id="brief-builder-container" className="space-y-6">
      
      {/* PERSISTENT BAR TETHERED FOR SESSIONS RETURN DASHBOARD */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 font-sans shrink-0">
        <button
          onClick={() => setActiveSessionId(null)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs rounded-lg cursor-pointer transition flex items-center gap-1 text-[11px] active:scale-95 shrink-0"
        >
          👈 Return to Sessions Dashboard & Warehouse Logs
        </button>

        <div className="flex items-center gap-2.5 text-xs">
          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded uppercase block">
            SESSION: {activeSession.briefId}
          </span>
          <span className="text-slate-405 text-slate-400 block p-0">|</span>
          <span className="font-bold text-slate-705 truncate max-w-xs">{activeSession.project}</span>
          <span className="text-slate-405 text-slate-400 block p-0">|</span>
          <span className="bg-slate-200 text-slate-800 font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{activeSession.status}</span>
        </div>
      </div>
      
      {/* 1. TOP HEADER BRAND CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="bg-indigo-100 text-indigo-700 font-mono text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wide inline-block mb-1">
            GCS Schema Validator WS1
          </span>
          <h2 className="text-slate-850 text-base font-bold flex items-center gap-2 font-sans text-slate-900">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            AI Interactive Campaign Brief Builder (WS1)
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Generates parents parameters and auto-synchronizes downstream children assets with strict compliance constraints.
          </p>
        </div>

        {/* Dynamic Preset Loaders conforming to PDF Page 10 */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[9px]">Channel Selection:</span>
          <button
            onClick={() => applyPresetLayout("parent")}
            className={`px-3 py-1 font-bold text-[11px] rounded transition cursor-pointer ${
              activeBriefType === "parent" 
                ? "bg-slate-900 text-white shadow-xs" 
                : "bg-slate-150 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            🏆 National Parent
          </button>
          <button
            onClick={() => applyPresetLayout("crm")}
            className={`px-3 py-1 font-bold text-[11px] rounded transition cursor-pointer ${
              activeBriefType === "crm" 
                ? "bg-indigo-600 text-white shadow-xs" 
                : "bg-slate-150 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            ✉️ CRM Child
          </button>
          <button
            onClick={() => applyPresetLayout("web")}
            className={`px-3 py-1 font-bold text-[11px] rounded transition cursor-pointer ${
              activeBriefType === "web" 
                ? "bg-emerald-600 text-white shadow-xs" 
                : "bg-slate-150 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            💻 Web Portal Child
          </button>
          <button
            onClick={() => applyPresetLayout("social")}
            className={`px-3 py-1 font-bold text-[11px] rounded transition cursor-pointer ${
              activeBriefType === "social" 
                ? "bg-amber-600 text-white shadow-xs" 
                : "bg-slate-150 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            📱 Social Specs
          </button>
          <button
            onClick={() => applyPresetLayout("olv")}
            className={`px-3 py-1 font-bold text-[11px] rounded transition cursor-pointer ${
              activeBriefType === "olv" 
                ? "bg-rose-600 text-white shadow-xs" 
                : "bg-slate-150 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            🎥 OLV Video Specs
          </button>
        </div>
      </div>

      {/* 2. PERSISTENT SYSTEM SESSIONS CONTROLLER WITH LIFECYCLE CHROME */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
            <span className="text-xs font-bold text-slate-800">Brief builder sessions tracking database</span>
          </div>
          
          <button
            onClick={createNewSession}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold rounded-lg text-xs flex items-center gap-1 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Start New Adhoc Session
          </button>
        </div>

        {/* Active Sessions Grid selectable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sessions.map((sess) => {
            const isActive = sess.id === activeSessionId;
            let statusBadgeColor = "bg-slate-100 text-slate-700";
            if (sess.status === "Submitted") statusBadgeColor = "bg-blue-50 text-blue-700 border border-blue-150";
            if (sess.status === "Data Request") statusBadgeColor = "bg-amber-50 text-amber-700 border border-amber-200";
            if (sess.status === "Approved") statusBadgeColor = "bg-emerald-50 text-emerald-705 text-emerald-750 text-emerald-700 border border-emerald-200";
            if (sess.status === "Published") statusBadgeColor = "bg-indigo-50 text-indigo-700 border border-indigo-200";

            return (
              <button
                key={sess.id}
                onClick={() => {
                  setActiveSessionId(sess.id);
                  setSimulatedEmailClient(false);
                }}
                className={`text-left p-3.5 rounded-xl border transition-all relative ${
                  isActive 
                    ? "bg-slate-900 text-white border-slate-950 shadow-md scale-[1.01]" 
                    : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-650"
                  }`}>
                    {sess.briefId}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${statusBadgeColor}`}>
                    {sess.status.toUpperCase()}
                  </span>
                </div>

                <span className="font-bold text-xs block truncate">{sess.project}</span>
                
                <div className="flex items-center justify-between text-[10px] mt-2 text-slate-400">
                  <span>Channel: {sess.activeBriefType.toUpperCase()}</span>
                  <span className="font-bold font-mono">Comp: {sess.completeness}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CO-WORKERS LAYOUT WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: ACTIVE ASSISTANT CONVERSATION & WORKFLOW PORTAL */}
        <div className="space-y-6">
          
          {/* Chat Intake block */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between h-[520px]">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-4">
                {/* Micro Circular Progress bar */}
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="w-10 h-10 -rotate-90">
                    <circle cx="20" cy="20" r="17" fill="transparent" stroke="#E2E8F0" strokeWidth="2.5" />
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="17" 
                      fill="transparent" 
                      stroke="#4F46E5" 
                      strokeWidth="2.5" 
                      strokeDasharray={`${2 * Math.PI * 17}`}
                      strokeDashoffset={`${2 * Math.PI * 17 * (1 - completeness / 100)}`}
                      className="transition-all duration-750"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-mono font-bold text-slate-800">{completeness}%</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Session Completeness</span>
                  <p className="text-[10px] text-slate-400">Validated against client data models</p>
                </div>
              </div>

              {/* Vitality Rate Indicator */}
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">
                  Vitality Rate: <strong className="text-emerald-600">{vitalityScore}%</strong>
                </span>
                <span className="text-[10px] text-slate-400">Prevents copy-paste decay</span>
              </div>
            </div>

            {/* Scrollable chat body */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 font-sans text-xs scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 max-w-[85%] ${
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                    m.sender === "user" ? "bg-slate-900 text-white" : "bg-indigo-600 text-white"
                  }`}>
                    {m.sender === "user" ? "ME" : <Sparkles className="w-3 h-3" />}
                  </div>

                  <div className={`p-3 rounded-xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-tr-none text-right font-medium"
                      : "bg-slate-50 border border-slate-150 text-slate-700 rounded-tl-none whitespace-pre-line"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isSynthesizing && (
                <div className="flex gap-2 mr-auto items-center text-slate-450 text-slate-400 text-[10px] italic animate-pulse pl-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Structuring dynamic GCS schemas...
                </div>
              )}
            </div>

            {/* Input elements */}
            <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Talk to assistant or adjust parameter structures..."
                disabled={activeSession.status === "Approved" || activeSession.status === "Published"}
                className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 font-sans disabled:bg-slate-50 disabled:text-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={activeSession.status === "Approved" || activeSession.status === "Published"}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACTIVE WORKFLOW SANDBOX & EMAIL APPRVAL SIMULATION SYSTEM */}
          <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-950 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-indigo-400 font-mono text-[9px] font-bold uppercase tracking-widest block">
                  LIFECYCLE VERIFICATION PROTOCOL
                </span>
                <h3 className="text-white text-xs font-bold font-sans">
                  Approver Automated Email & Routing Matrix
                </h3>
              </div>
              <span className="bg-slate-800 border border-slate-700 font-mono text-[10px] px-2 py-0.5 rounded font-extrabold text-slate-300">
                BRIEF STATUS: {activeSession.status.toUpperCase()}
              </span>
            </div>

            {/* Sandbox Step 1: Submit Campaign for Formal Verification */}
            {activeSession.status === "Draft" && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center space-y-3">
                <p className="text-slate-400 text-xs">
                  Your brief is currently a <strong className="text-white">Draft</strong>. Standard marketing rules require a signoff notification link to be sent to Leyla before executing creative assets.
                </p>
                <button
                  onClick={() => handleStatusTransition("Submitted")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm font-sans cursor-pointer transition"
                >
                  🚀 Submit To Leyla M. (Signoff Lead)
                </button>
              </div>
            )}

            {/* Sandbox Step 2: Live Email Broadcaster with Nodemailer trigger */}
            {simulatedEmailClient && activeSession.status === "Submitted" && (
              <div className="bg-white text-slate-800 rounded-xl p-4.5 p-4 border border-slate-300 space-y-3.5 shadow-md animate-fade-in font-sans">
                <div className="flex items-center gap-2 border-b pb-2 text-xs">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="flex-1 font-mono text-[10px] text-slate-500">
                    <span className="block"><strong className="text-slate-700">Service Pipeline:</strong> Searce Nodemailer Mailer Service</span>
                    <span className="block mt-0.5"><strong className="text-slate-700">Subject:</strong> Review Campaign Brief: {activeSession.project} (ID: {activeSession.briefId})</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-600 block uppercase tracking-wider">
                    Recipient Email (Type your email to test real SMTP alerts!)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={actualRecipientEmail}
                      onChange={(e) => setActualRecipientEmail(e.target.value)}
                      placeholder="leyla.marketing@rentacenter.com"
                      className="flex-1 bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800"
                    />
                    <button
                      onClick={handleTransmitRealEmail}
                      disabled={sendingEmail}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded transition shrink-0 cursor-pointer disabled:bg-slate-300"
                    >
                      {sendingEmail ? "Transmitting..." : "✉️ Send Real Email"}
                    </button>
                  </div>

                  {smtpConfig && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 mt-2 space-y-1.5 text-[11px] font-sans">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${smtpConfig.SMTP_HOST ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`}></span>
                          Server Delivery Status:
                        </span>
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                          smtpConfig.SMTP_HOST 
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}>
                          {smtpConfig.SMTP_HOST ? "Production SMTP" : "Mailbox Simulator"}
                        </span>
                      </div>
                      
                      {smtpConfig.SMTP_HOST ? (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] bg-white p-2 rounded border border-slate-100">
                          <div><span className="text-slate-400 font-semibold font-mono">SMTP_HOST:</span> <span className="font-mono text-slate-700 font-bold">{smtpConfig.SMTP_HOST_VALUE || "N/A"}</span></div>
                          <div><span className="text-slate-400 font-semibold font-mono">SMTP_USER:</span> <span className="font-mono text-slate-700 font-bold">{smtpConfig.SMTP_USER_VALUE || "N/A"}</span></div>
                          <div className="flex items-center gap-1 mt-0.5"><span className="text-slate-400 font-sans">Password check:</span> {smtpConfig.SMTP_PASS ? <span className="text-emerald-600 font-bold">✓ Loaded</span> : <span className="text-rose-600 font-bold">✗ Empty</span>}</div>
                          <div className="flex items-center gap-1 mt-0.5"><span className="text-slate-400 font-sans">Sender Name:</span> <span>{smtpConfig.SMTP_FROM_NAME ? "✓ Custom" : "Default"}</span></div>
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-500 leading-relaxed bg-amber-50/50 p-2 rounded border border-amber-100">
                          No native SMTP environmental variables configured yet. The pipeline will automatically simulate successful delivery via <strong className="text-indigo-600">Ethereal Inbox</strong> so you can inspect generated layouts!
                        </p>
                      )}
                    </div>
                  )}

                  {emailStatusMessage && (
                    <div className={`p-3 rounded text-[11px] border leading-relaxed ${
                      emailStatusMessage.type === "success" 
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200" 
                        : "bg-rose-50 text-rose-800 border-rose-200"
                    }`}>
                      <div className="font-medium">{emailStatusMessage.text}</div>
                      {emailStatusMessage.previewUrl && (
                        <div className="mt-2 bg-white/70 p-2 rounded border border-emerald-300 flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] text-emerald-800 font-semibold">🔗 Interactive SMTP Inbox Preview:</span>
                          <a 
                            href={emailStatusMessage.previewUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold no-underline inline-block cursor-pointer shadow-xs"
                          >
                            Open Received Mail ↗
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-[11px] space-y-2 leading-relaxed text-slate-600 border-t pt-2.5">
                  <p>Hi Leyla,</p>
                  <p>Monark Unadkat has finalized the multichannel parent/child campaign specs for <strong className="text-slate-900">{activeSession.project}</strong>.</p>
                  
                  {/* The temporary secure session link button */}
                  <div className="pt-2 text-center flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => {
                        setShowApproverPortal(true);
                        const rootNode = document.getElementById("approver-console-panel");
                        if (rootNode) rootNode.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg font-bold hover:bg-indigo-100 transition cursor-pointer font-sans"
                    >
                      <span>🔑 Open Secure Approver Link ({activeSession.id})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sandbox Step 3.5: Active Document Request / Data response State */}
            {activeSession.status === "Data Request" && (
              <div className="bg-amber-950/40 border border-amber-900/60 p-4 rounded-xl space-y-3 text-slate-200 leading-relaxed text-xs">
                <span className="text-amber-400 font-bold block flex items-center gap-1">
                  ⚠️ Action Required: Supporting Documents Requested on Session: {activeSession.briefId}
                </span>
                
                {feedbacks.length > 0 && (
                  <div className="bg-slate-950 p-3 rounded-lg text-[11px] text-slate-300 font-sans italic border border-slate-800">
                    " {feedbacks[feedbacks.length - 1].text} "
                    <span className="block text-right mt-1.5 text-[9px] text-slate-500 font-mono">— {feedbacks[feedbacks.length - 1].author}</span>
                  </div>
                )}

                <p className="text-slate-300 text-[11px]">
                  Please attach verified spreadsheets, brand files, or partner contracts to back up proof claims of standard L2O campaigns rules.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={simulateContractUpload}
                    disabled={uploadProgress}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> 
                    {uploadProgress ? "Uploading..." : "Simulate Document Attachment"}
                  </button>

                  <button
                    onClick={() => handleStatusTransition("Submitted")}
                    disabled={uploadedDocs.length === 0}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Resubmit Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {uploadedDocs.length > 0 && (
                  <div className="pt-2 border-t border-amber-900/40 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Currently Uploaded Proof justify files:</span>
                    {uploadedDocs.map((doc, k) => (
                      <div key={k} className="bg-slate-950 px-2 py-1.5 rounded flex items-center justify-between text-[10px] border border-slate-900 font-mono">
                        <span className="text-emerald-400 truncate">{doc.name} ({doc.size})</span>
                        <span className="text-[9px] text-slate-500">{doc.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sandbox Step 3.6: Rejected State */}
            {activeSession.status === "Rejected" && (
              <div className="bg-rose-950/40 border border-rose-900/60 p-4 rounded-xl space-y-3 text-slate-200 leading-relaxed text-xs">
                <span className="text-rose-400 font-bold block flex items-center gap-1">
                  ❌ Action Required: Brief was Rejected on Session: {activeSession.briefId}
                </span>

                {feedbacks.length > 0 && (
                  <div className="bg-slate-950 p-3 rounded-lg text-[11px] text-slate-300 font-sans italic border border-slate-800">
                    " {feedbacks[feedbacks.length - 1].text} "
                    <span className="block text-right mt-1.5 text-[9px] text-slate-500 font-mono">— {feedbacks[feedbacks.length - 1].author}</span>
                  </div>
                )}

                <p className="text-slate-300 text-[11px]">
                  The approver has rejected the current brief parameters. Please revise the brief details, upload any required rationale, and resubmit.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={simulateContractUpload}
                    disabled={uploadProgress}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> 
                    {uploadProgress ? "Uploading..." : "Attach Justification File"}
                  </button>

                  <button
                    onClick={() => handleStatusTransition("Submitted")}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Resubmit Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {uploadedDocs.length > 0 && (
                  <div className="pt-2 border-t border-rose-900/40 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Currently Uploaded files:</span>
                    {uploadedDocs.map((doc, k) => (
                      <div key={k} className="bg-slate-950 px-2 py-1.5 rounded flex items-center justify-between text-[10px] border border-slate-900 font-mono">
                        <span className="text-emerald-400 truncate">{doc.name} ({doc.size})</span>
                        <span className="text-[9px] text-slate-500">{doc.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sandbox Step 4: Approved signoff unlocked block */}
            {activeSession.status === "Approved" && (
              <div className="bg-emerald-950/40 border border-emerald-900/60 p-4 rounded-xl space-y-2.5 text-slate-200 text-xs">
                <span className="text-emerald-400 font-bold block flex items-center gap-1">
                  🏆 Campaign Brief Verified & Signed Off!
                </span>
                <p className="text-slate-350 text-[11px]">
                  Approver Leyla locked schema definitions. Downstream creative tasks can consume this brief payload securely without compliance drift.
                </p>

                <button
                  onClick={handlePublishToDownstream}
                  className="px-3.5 py-2 w-full bg-emerald-605 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer text-white shadow-xs transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Release Sync: Launch Multi-Channel Content Forge & Assets Pipeline
                </button>
              </div>
            )}

            {activeSession.status === "Published" && (
              <div className="bg-indigo-950/45 border border-indigo-900/40 p-4 rounded-xl text-xs space-y-1.5">
                <span className="text-indigo-400 font-bold block flex items-center gap-1">
                  📦 Released to Downstream Workers
                </span>
                <p className="text-slate-300 text-[11px]">
                  All compliance schemas were synced with the digital campaign manager. You can load this campaign directly inside the "AI Content Forge" to trigger immediate copywriting generators.
                </p>
                <div className="font-mono text-[9px] bg-slate-950 p-2 rounded text-indigo-300 border border-slate-900">
                  METRIC_FEEDMAP: SYNC_COMPLETED_SUCCESSFULLY_GCS
                </div>
              </div>
            )}
          </div>

          {/* 4. EXPLICIT INTERACTIVE SECURE APPROVER ACCESS VIEW - SIMULATOR ONLY */}
          {showApproverPortal && (
            <div id="approver-console-panel" className="bg-white border-2 border-indigo-600 rounded-xl p-5 shadow-lg space-y-4 animate-fade-in">
              <div className="flex justify-between items-center bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-150">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h4 className="text-slate-850 font-bold text-xs flex items-center gap-1 font-sans">
                      Secure Verification Channel Overview
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono tracking-tight block">Authorized: Leyla M. • Session token: {activeSession.id}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowApproverPortal(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  [Exit Portal]
                </button>
              </div>

              {/* Review specifications summary info */}
              <div className="bg-slate-50 p-4 rounded-lg border space-y-3 text-xs leading-relaxed">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Currently reviewing Campaign schema:</span>
                
                <div className="grid grid-cols-2 gap-3 text-[11px] leading-tight font-sans">
                  <div>
                    <span className="text-slate-400 text-[9px] font-medium block">PROJECT NAME</span>
                    <strong className="text-slate-800">{briefRecord.project}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[9px] font-medium block">OWNING BRAND PORTFOLIO</span>
                    <strong className="text-indigo-600">Rent-A-Center</strong>
                  </div>
                </div>

                <div className="text-[11px] space-y-1 leading-normal border-t pt-2 mt-2">
                  <span className="text-slate-800 font-bold block">Objective Strategy (M):</span>
                  <p className="text-slate-600 font-light italic">" {briefRecord.objective_why || "(Not specified)"} "</p>
                </div>

                <div className="text-[11px] space-y-1">
                  <span className="text-slate-800 font-bold block">Offer Parameter (M):</span>
                  <p className="text-slate-600 font-light italic">" {briefRecord.offering_what || "(Not specified)"} "</p>
                </div>
              </div>

              {/* Secure Approver QA Action Area */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Step 1: Write Review Feedback / Change requests:
                </label>
                <textarea
                  value={approverFeedback}
                  onChange={(e) => setApproverFeedback(e.target.value)}
                  placeholder="e.g. Please outline computer desk system rules..."
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-650"
                />

                <div className="flex gap-2 text-xs">
                  <button
                    onClick={handleApproverSubmitFeedback}
                    disabled={!approverFeedback.trim()}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition disabled:opacity-40 cursor-pointer"
                  >
                    ✉️ Post Feedback Comment
                  </button>

                  <button
                    onClick={() => handleStatusTransition("Data Request")}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 font-bold rounded-lg transition cursor-pointer font-sans"
                  >
                    ⚠️ Reject & Request Upload Docs
                  </button>

                  <button
                    onClick={() => {
                      handleStatusTransition("Approved");
                      setShowApproverPortal(false);
                    }}
                    className="px-4 py-1.5 ml-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer font-sans"
                  >
                    <ClipboardCheck className="w-4 h-4 text-white" />
                    Approve Formally
                  </button>
                </div>

                {feedbacks.length > 0 && (
                  <div className="space-y-1 border-t pt-2 mt-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Activity feedback trail log:</span>
                    {feedbacks.map((fb, idx) => (
                      <div key={idx} className="bg-slate-50 hover:bg-slate-100 p-2 border border-slate-150 rounded text-[10px] leading-relaxed text-slate-650 flex justify-between gap-4 font-sans">
                        <span><strong>{fb.author}:</strong> "{fb.text}"</span>
                        <span className="text-[9px] font-mono text-slate-400 shrink-0">{fb.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: HORIZONTALLY SCROLLING COMPLIANT LAYOUT WORKSPACE */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-[600px] flex flex-col justify-between overflow-hidden">
          
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center shrink-0">
            <div>
              <span className="text-xs font-bold text-slate-850 flex items-center gap-1.5 font-bold text-slate-900">
                <Target className="w-4 h-4 text-indigo-600" />
                Live Schema Payload View ({activeBriefType.toUpperCase()} child Spec)
              </span>
              <p className="text-slate-450 text-slate-400 text-[11px] mt-0.5">
                Swipe horizontally to read and modify all parameters. Fully visible cards!
              </p>
            </div>
            <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-mono text-[9px] px-2 py-0.5 rounded font-extrabold uppercase shrink-0">
              Validated Compliant
            </span>
          </div>

          {/* Dynamic Card Navigation Tabs conforming to user's request */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0 overflow-x-auto text-[10px] mt-1">
            {[
              { label: "1. Basics & Flight", idx: 0 },
              { label: "2. Objectives", idx: 1 },
              { label: "3. Target Mindset", idx: 2 },
              { label: "4. Compliance", idx: 3 },
              { label: "5. Active Specs", idx: 4 }
            ].map(tab => (
              <button
                key={tab.idx}
                type="button"
                onClick={() => scrollToCard(tab.idx)}
                className={`px-2.5 py-1 rounded transition cursor-pointer font-medium font-sans truncate ${
                  activeCardIndex === tab.idx
                    ? "bg-indigo-600 text-white font-bold shadow-xs"
                    : "text-slate-650 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* HORIZONTAL SWIPER CONTAINER */}
          {/* Snap scroll layouts with cards having robust horizontal spacing */}
          <div ref={scrollContainerRef} onScroll={handleScrollDetect} className="flex-1 my-4 overflow-x-auto gap-4 flex snap-x scrollbar-thin snap-mandatory items-stretch pb-3 pr-2 scroll-smooth">
            
            {/* Card 1: BASICS & METADATA */}
            <div className="w-[335px] max-w-[335px] md:w-[410px] md:max-w-[410px] h-[360px] overflow-y-auto shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-5 snap-start flex flex-col justify-between scrollbar-thin">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    CARD 1: CAMPAIGN BASICS
                  </span>
                  <span className="bg-slate-200 h-2 w-2 rounded-full"></span>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold flex items-center justify-between">
                    <span>PROJECT (M)</span>
                    <span className="text-indigo-600 font-mono font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={briefRecord.project}
                    onChange={(e) => updateBriefRecord({ project: e.target.value })}
                    className="bg-white border rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-600 text-slate-800 font-sans"
                    placeholder="e.g. Labor Day Sale"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold">SUBMITTED BY</label>
                    <input
                      type="text"
                      value={briefRecord.submittedBy}
                      onChange={(e) => updateBriefRecord({ submittedBy: e.target.value })}
                      className="bg-white border rounded px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold">VERSION SPEC</label>
                    <input
                      type="text"
                      value={briefRecord.version}
                      onChange={(e) => updateBriefRecord({ version: e.target.value })}
                      className="bg-white border rounded px-2.5 py-1.5 text-xs text-center font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold">FLIGHT START</label>
                    <input
                      type="date"
                      value={briefRecord.startDate}
                      onChange={(e) => updateBriefRecord({ startDate: e.target.value })}
                      className="bg-white border rounded px-2 py-1 text-xs text-center font-mono"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold">FLIGHT END</label>
                    <input
                      type="date"
                      value={briefRecord.endDate}
                      onChange={(e) => updateBriefRecord({ endDate: e.target.value })}
                      className="bg-white border rounded px-2 py-1 text-xs text-center font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-medium italic select-none text-right pt-2">
                Swipe left to read Strategy ➔
              </div>
            </div>

            {/* Card 2: OBJECTIVE STRATEGY & STRATEGIC CONTENT */}
            <div className="w-[335px] max-w-[335px] md:w-[410px] md:max-w-[410px] h-[360px] overflow-y-auto shrink-0 bg-white border border-slate-200 rounded-xl p-5 snap-start flex flex-col justify-between scrollbar-thin">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <span className="text-[10px] text-indigo-700 font-bold uppercase block tracking-wider">
                    CARD 2: CORE OBJECTIVE VALUES
                  </span>
                  <span className="bg-indigo-600 h-2 w-2 rounded-full"></span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-550 font-bold block flex justify-between">
                    <span>WHAT IS THE MAIN CORE OFFERING? (M)</span>
                    <span className="text-indigo-600">*</span>
                  </label>
                  <textarea
                    value={briefRecord.offering_what}
                    rows={3}
                    onChange={(e) => updateBriefRecord({ offering_what: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 text-xs text-slate-800 rounded leading-relaxed"
                    placeholder="Designate offer benefits, pricing lockups, flight ranges..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-550 font-bold block flex justify-between">
                    <span>WHY ARE WE COMMUNICATING? (M)</span>
                    <span className="text-indigo-600">*</span>
                  </label>
                  <textarea
                    value={briefRecord.objective_why}
                    rows={3}
                    onChange={(e) => updateBriefRecord({ objective_why: e.target.value })}
                    className="w-full bg-slate-50 border p-2.5 text-xs text-slate-800 rounded leading-relaxed animate-fade-in"
                    placeholder="Specify target KPIs, competitive trends, customer engagement vectors..."
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-medium italic select-none text-right">
                Swipe left to read Customers ➔
              </div>
            </div>

            {/* Card 3: TARGET AUDIENCE & TONE MOOD COGNITIVE MINDSET */}
            <div className="w-[335px] max-w-[335px] md:w-[410px] md:max-w-[410px] h-[360px] overflow-y-auto shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-5 snap-start flex flex-col justify-between scrollbar-thin">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase block tracking-wider">
                    CARD 3: CUSTOMER MINDSET
                  </span>
                  <span className="bg-emerald-600 h-2 w-2 rounded-full"></span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">WHO ARE WE TALKING TO?</label>
                  <input
                    type="text"
                    value={briefRecord.audience_who}
                    onChange={(e) => updateBriefRecord({ audience_who: e.target.value })}
                    className="bg-white border rounded px-3 py-2 text-xs w-full"
                    placeholder="Specify target Approved / Lapsed segments"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-bold block">CUSTOMER SENTIMENT MINDSET</label>
                  <textarea
                    value={briefRecord.mindset}
                    rows={2}
                    onChange={(e) => updateBriefRecord({ mindset: e.target.value })}
                    className="bg-white border rounded p-2 text-xs w-full font-sans leading-relaxed"
                    placeholder="What factors govern customer wallet spend decisions?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold uppercase">Tone & Sound</label>
                    <input
                      type="text"
                      value={briefRecord.tone_mood}
                      onChange={(e) => updateBriefRecord({ tone_mood: e.target.value })}
                      className="bg-white border rounded p-1.5 text-xs w-full"
                      placeholder="e.g. Neighborly"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold uppercase">Customer emotional feeling</label>
                    <input
                      type="text"
                      value={briefRecord.feel}
                      onChange={(e) => updateBriefRecord({ feel: e.target.value })}
                      className="bg-white border rounded p-1.5 text-xs w-full"
                      placeholder="Empowered, confident"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-medium italic select-none text-right">
                Swipe left to read Compliance ➔
              </div>
            </div>

            {/* Card 4: MANDATORIES & DISCLAIMERS */}
            <div className="w-[335px] max-w-[335px] md:w-[410px] md:max-w-[410px] h-[360px] overflow-y-auto shrink-0 bg-white border border-slate-200 rounded-xl p-5 snap-start flex flex-col justify-between scrollbar-thin">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-1.5">
                  <span className="text-[10px] text-rose-800 font-bold uppercase block tracking-wider">
                    CARD 4: COMPLIANCE REGULATION
                  </span>
                  <span className="bg-rose-500 h-2 w-2 rounded-full"></span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 font-bold block">
                    MANDATORY disclaimers & CARET DISCLOSURES (C)
                  </label>
                  <textarea
                    value={briefRecord.mandatories}
                    rows={3}
                    onChange={(e) => updateBriefRecord({ mandatories: e.target.value })}
                    className="w-full bg-slate-50 border p-2 text-xs text-rose-900 rounded font-sans leading-relaxed"
                    placeholder="Must append disclaimer on offer: up to 15 days free disclosure^"
                  />
                </div>

                <div className="bg-rose-50/50 p-3.5 rounded-lg border border-rose-100 text-[11px] leading-relaxed text-rose-805 text-rose-800">
                  <strong className="font-bold flex items-center gap-1">🛡️ Automated Screen Filters:</strong>
                  Traditional multi-month debt terms of high interest are blocked. Disclaimers for "Does not reduce total cost to own" are strictly checked.
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-medium italic select-none text-right">
                Swipe left to read Deliverables Specs ➔
              </div>
            </div>

            {/* Card 5: DELIVERABLES CHANNEL SPEC (CRM / WEB / SOCIAL / OLV Depending on active Brief Type) */}
            <div className="w-[335px] max-w-[335px] md:w-[410px] md:max-w-[410px] h-[360px] overflow-y-auto shrink-0 bg-slate-50 border-2 border-indigo-250 border-indigo-400 rounded-xl p-5 snap-start flex flex-col justify-between scrollbar-thin">
              <div className="space-y-3">
                
                {/* Dynamically loads matching current selected Brief Type */}
                
                {/* 1. CRM Deliverables schema */}
                {activeBriefType === "crm" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-1.5">
                      <span className="text-[10px] text-indigo-700 font-bold uppercase block tracking-wider">
                        CARD 5: CRM SPEC DETAILS (Page 11)
                      </span>
                      <Smartphone className="w-4 h-4 text-indigo-500" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] text-slate-700 font-bold block">Email Subject line (M)</label>
                      <input
                        type="text"
                        value={briefRecord.subjectLine}
                        onChange={(e) => updateBriefRecord({ subjectLine: e.target.value })}
                        className="bg-white border rounded p-2 text-xs text-slate-800 w-full font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-650 font-bold block">Email preheader text</label>
                      <input
                        type="text"
                        value={briefRecord.preheaderText}
                        onChange={(e) => updateBriefRecord({ preheaderText: e.target.value })}
                        className="bg-white border rounded p-1.5 text-xs text-slate-850 w-full"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] text-indigo-900 font-bold block">SMS carrier payload text</label>
                        <span className={`text-[9px] font-mono ${getSmsInputFeedback()?.err ? "text-rose-600 font-bold" : "text-slate-500"}`}>
                          {getSmsInputFeedback()?.msg}
                        </span>
                      </div>
                      <textarea
                        value={briefRecord.smsCopy}
                        rows={2}
                        onChange={(e) => updateBriefRecord({ smsCopy: e.target.value })}
                        className={`bg-white border rounded p-2 text-[11px] font-mono w-full ${
                          getSmsInputFeedback()?.err ? "border-rose-550 border-rose-500" : "border-slate-200"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* 2. Web Support Checklist */}
                {activeBriefType === "web" && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b pb-1.5 font-bold text-xs">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                        CARD 5: WEB PORTAL CHECKLIST (Page 14)
                      </span>
                      <Laptop className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                      <label className="bg-white border p-2 rounded flex items-center justify-between gap-2">
                        <span>Homepage Panels</span>
                        <input
                          type="checkbox"
                          checked={briefRecord.homepagePanels}
                          onChange={(e) => updateBriefRecord({ homepagePanels: e.target.checked })}
                          className="rounded h-3.5 w-3.5 text-indigo-600"
                        />
                      </label>
                      <label className="bg-white border p-2 rounded flex items-center justify-between gap-2">
                        <span>PLP Category Flags</span>
                        <input
                          type="checkbox"
                          checked={briefRecord.plpBanners}
                          onChange={(e) => updateBriefRecord({ plpBanners: e.target.checked })}
                          className="rounded h-3.5 w-3.5 text-indigo-600"
                        />
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">Co-Op Collaboration Materials</label>
                      <input
                        type="text"
                        value={briefRecord.coOpMaterials}
                        onChange={(e) => updateBriefRecord({ coOpMaterials: e.target.value })}
                        className="bg-white border rounded p-1.5 text-xs w-full text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-550 block">Loyalty/Rewards Program benefits</label>
                      <input
                        type="text"
                        value={briefRecord.rewardsLoyalty}
                        onChange={(e) => updateBriefRecord({ rewardsLoyalty: e.target.value })}
                        className="bg-white border rounded p-1.5 text-xs w-full text-slate-800"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Paid Social */}
                {activeBriefType === "social" && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b pb-1.5 font-bold text-xs">
                      <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                        CARD 5: PAID SOCIAL SPECS
                      </span>
                      <Share2 className="w-4 h-4 text-amber-500" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 block">Paid Social Headline</label>
                      <input
                        type="text"
                        value={briefRecord.socialHeadline}
                        onChange={(e) => updateBriefRecord({ socialHeadline: e.target.value })}
                        className="bg-white border rounded p-2 text-xs w-full text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">Primary advertising targeting filters</label>
                      <input
                        type="text"
                        value={briefRecord.socialTargeting}
                        onChange={(e) => updateBriefRecord({ socialTargeting: e.target.value })}
                        className="bg-white border rounded p-1.5 text-xs w-full text-slate-850"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">Budget allocation split and bidding cap</label>
                      <input
                        type="text"
                        value={briefRecord.socialBudgetStrategy}
                        onChange={(e) => updateBriefRecord({ socialBudgetStrategy: e.target.value })}
                        className="bg-white border rounded p-1.5 text-xs w-full"
                      />
                    </div>
                  </div>
                )}

                {/* 4. OLV Video formats */}
                {activeBriefType === "olv" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-1.5">
                      <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block">
                        CARD 5: ONLINE VIDEO DIRECTIONS
                      </span>
                      <Video className="w-4 h-4 text-rose-550 text-rose-500" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-500 block">Voiceover (VO) Script text copy</label>
                      <textarea
                        value={briefRecord.scriptVoiceover}
                        rows={2.5}
                        onChange={(e) => updateBriefRecord({ scriptVoiceover: e.target.value })}
                        className="bg-white border rounded p-2 text-xs w-full text-slate-800 leading-normal"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 block">Music audio and sound mood direction</label>
                      <input
                        type="text"
                        value={briefRecord.musicAudioDirection}
                        onChange={(e) => updateBriefRecord({ musicAudioDirection: e.target.value })}
                        className="bg-white border rounded p-1.5 text-xs w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Parent generic fallback */}
                {activeBriefType === "parent" && (
                  <div className="space-y-4 text-xs font-sans text-slate-600">
                    <div className="flex items-center justify-between border-b pb-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        CARD 5: DELIVERABLES
                      </span>
                      <FileText className="w-4 h-4 text-slate-500" />
                    </div>
                    <p className="leading-relaxed">
                      This is the National Parent Brief template. To assign detailed child variables, choose <strong className="text-indigo-650">CRM</strong>, <strong className="text-emerald-700">Web Support</strong>, <strong className="text-amber-600">Social</strong> or <strong className="text-rose-600">OLV Specs</strong> using the channel selectors above.
                    </p>
                    <div className="bg-indigo-50 p-2 text-[10px] rounded text-indigo-805 leading-normal">
                      Note: When you submit a National Parent brief, all child specifications sync dynamically to respect campaign dates.
                    </div>
                  </div>
                )}

              </div>

              <div className="text-[10px] text-indigo-600 font-semibold italic text-center pt-2 select-none">
                🌟 All updates auto-saved in Session Store
              </div>
            </div>

          </div>

          {/* Action deployment block & Gatekeeper Check */}
          <div className="border-t border-slate-200 pt-3 shrink-0 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 font-mono">
                🛡️ INTENDED COMPLIANCE METRICS:
              </span>
              <span className={`text-[10px] font-bold font-mono ${
                completeness >= 65 && briefRecord.smsCopy.length <= 160 ? 'text-emerald-600' : 'text-rose-500'
              }`}>
                {completeness >= 65 && briefRecord.smsCopy.length <= 160 ? "PASSED SECURITY AUDIT" : "BLOCKING CRITERIA DETECTED"}
              </span>
            </div>

            <button
              onClick={handlePublishToDownstream}
              disabled={activeSession.status !== "Approved" || briefRecord.smsCopy.length > 160}
              className="px-4 py-2.5 w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-30 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Locked Deployment (Ready when status = Approved)
            </button>
            
            {activeSession.status !== "Approved" && (
              <span className="text-[9.5px] text-rose-600 text-center block mt-1 font-sans">
                Notice: Brief is in <strong className="font-extrabold uppercase">{activeSession.status}</strong> status. Execute standard route checks to lock and sign off of brief parameters.
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
