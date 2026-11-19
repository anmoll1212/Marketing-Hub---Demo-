import { useState } from "react";
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Info, 
  UploadCloud, 
  Search, 
  Check, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Heart, 
  Cpu, 
  Layers, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Database,
  ArrowRight,
  ExternalLink
} from "lucide-react";

// Robust Personas Data representing WS2 Personas Template
const personasList = [
  {
    id: "P-001",
    name: "The Budget-Stretched Parent",
    archetype: "Primary Caregiver",
    priority: "Tier 1 – High Priority",
    updated: "2025-01-15",
    age: "28–42",
    gender: "Skews Female (62%)",
    income: "$25,000–$45,000",
    employment: "Part-time / Gig Worker",
    education: "High School / Some College",
    marketType: "Urban / Suburban",
    composition: "Single parent or 2-parent, 1–3 kids",
    motivation: "Provide a stable, furnished home for family without upfront cash",
    lifeGoal: "Achieve financial stability; build credit",
    attitude: "Cautious – avoids debt, pays weekly to feel in control",
    values: "Reliability, No-judgment, Family-first",
    lifestyle: "Budget-conscious, resourceful, community-oriented",
    aspirational: "Middle-class comfort without middle-class income",
    products: "Furniture, Appliances (washer/dryer, refrigerator)",
    duration: "3–12 months",
    intent: "Lease-to-own (ownership goal)",
    sensitivity: "Very High – weekly payment framing critical",
    painPoints: "Large upfront costs; credit checks; fear of repossession",
    triggers: "Child starts school / new apartment / seasonal need",
    dealBreakers: "Fear of hidden fees; complicated contracts; being judged for financial situation",
    digitalChannels: "Facebook, TikTok, YouTube",
    offlineChannels: "In-store, Community flyers",
    socialPlatforms: "Facebook Groups, TikTok",
    keywords: "rent furniture no credit check, weekly furniture payment",
    contentFormat: "Short video, testimonial posts",
    messagingTone: "Warm, empathetic, no-judgment",
    heroMessage: "Get what your family needs today — no credit needed, no big down payment.",
    proofPoints: "Real customer stories; flexible return policy; easy same-day delivery",
    cta: "Start Today / Get It Now",
    vocQuote: "I didn't think I could afford a couch until I found this. They treated me like a real customer.",
    researchNotes: "Pull latest single-parent household statistics; search Reddit r/povertyfinance for pain points; scrape Google Trends for 'rent furniture no credit'"
  },
  {
    id: "P-002",
    name: "The Credit-Building Young Adult",
    archetype: "Credit Builder",
    priority: "Tier 1 – High Priority",
    updated: "2025-01-15",
    age: "21–32",
    gender: "Skews Male (55%)",
    income: "$20,000–$38,000",
    employment: "Full-time Entry-level / Service Industry",
    education: "High School / Trade School",
    marketType: "Urban",
    composition: "Single or with roommate",
    motivation: "Establish independence; build credit history to qualify for traditional financing",
    lifeGoal: "Own first apartment; buy a car; improve credit score",
    attitude: "Optimistic but uninformed about credit; open to RTO as credit-building tool",
    values: "Transparency, Hustle, Self-improvement",
    lifestyle: "Digitally native, social media-driven, peer-influenced",
    aspirational: "Someone who has their stuff together financially",
    products: "Electronics (gaming, TV, laptop), Furniture",
    duration: "1–6 months",
    intent: "Mix of short-term rental and ownership",
    sensitivity: "Medium – values perceived value over raw price",
    painPoints: "Lack of transparency on total cost; fear of being locked in",
    triggers: "First apartment, new job, tax refund season",
    dealBreakers: "Complex paperwork; no online management of account; being talked down to",
    digitalChannels: "Instagram, TikTok, Snapchat, YouTube",
    offlineChannels: "None (digital-first)",
    socialPlatforms: "Instagram, Discord, Reddit",
    keywords: "no credit check electronics rent, rent Xbox monthly",
    contentFormat: "Reels, memes, influencer reviews",
    messagingTone: "Direct, peer-to-peer, aspirational",
    heroMessage: "Level up your setup. No credit? No problem. Start renting today and own it faster than you think.",
    proofPoints: "Credit-reporting benefit callout; app-based account management; trade-in/upgrade options",
    cta: "Upgrade Now / Build My Credit",
    vocQuote: "I needed a laptop for my new job and had zero credit. This was literally the only option that made sense.",
    researchNotes: "Search TikTok trends for 'no credit check'; pull CFPB data on credit invisibles aged 18–30; monitor Reddit r/FirstTimeHomeBuyer for RTO sentiment"
  },
  {
    id: "P-003",
    name: "The Temporary Relocator",
    archetype: "Transient Renter",
    priority: "Tier 2 – Medium Priority",
    updated: "2025-01-15",
    age: "30–50",
    gender: "Balanced (50/50)",
    income: "$35,000–$65,000",
    employment: "Employed – Contract / Military / Transfer",
    education: "Some College / Bachelor's",
    marketType: "Suburban / Small City",
    composition: "Couple or family in transition",
    motivation: "Furnish a temporary space quickly without the burden of ownership",
    lifeGoal: "Get settled fast; avoid storage costs; maintain normalcy during transition",
    attitude: "Pragmatic – cost vs. convenience trade-off mindset",
    values: "Efficiency, Simplicity, Flexibility",
    lifestyle: "Organised, time-pressured, practical",
    aspirational: "Capable professional managing life transitions",
    products: "Full room packages (furniture + appliances)",
    duration: "1–6 months",
    intent: "Short-term rental (no ownership intent)",
    sensitivity: "Medium – willing to pay premium for convenience",
    painPoints: "Long contract lock-ins; poor pickup/return logistics; damage fees",
    triggers: "PCS military orders, job relocation, post-divorce move",
    dealBreakers: "Slow delivery; no bundle options; rigid contract terms",
    digitalChannels: "Google Search, Company website, Yelp reviews",
    offlineChannels: "None",
    socialPlatforms: "LinkedIn, Nextdoor",
    keywords: "furnished apartment rental, temporary furniture rental military",
    contentFormat: "Comparison articles, FAQ pages, Google reviews",
    messagingTone: "Professional, efficient, solution-focused",
    heroMessage: "Everything you need in one delivery. Rent by the room, return when you're done.",
    proofPoints: "Free delivery / pickup; 30-day flex terms; military discount callout",
    cta: "Get a Quote / Schedule Delivery",
    vocQuote: "We got stationed here for 8 months. Renting furniture was the only smart move — they delivered everything in one shot.",
    researchNotes: "Pull military relocation statistics; monitor Nextdoor community boards for temp housing needs; search Google Trends for 'temporary furniture rental' by state"
  }
];

// Competitors Data representing WS2 Competitor Audit Template
const competitorsList = [
  {
    id: "C-001",
    name: "Aaron's",
    type: "Public",
    hq: "Atlanta, GA",
    auditDate: "2025-01-15",
    tier: "Tier 1 – Primary",
    valueProp: "Customer-first RTO with strong digital experience and credit-building focus",
    personas: "P-001, P-002, P-003",
    marketShare: "28%",
    footprint: "National – 1,300+ stores + e-commerce",
    growth: "Growing digital / flat store count",
    categories: "Furniture, Electronics, Appliances",
    path: "Lease-to-own; Aaron's YES program (credit-building)",
    priceAnchor: "$17.99/week (entry sofa)",
    promo: "Refer-a-friend; Military discount; online-only deals",
    creditCheck: "No",
    uniqueFeature: "Credit-building reporting; strong mobile app; virtual showroom",
    promoFocus: "Digital-first push; app downloads; credit-building positioning",
    pillars: "Credit-building, Technology, Convenience",
    tagline: "'More ways to own.'",
    style: "Clean, modern, digital-forward; lifestyle imagery",
    tone: "Aspirational, empowering, modern",
    formats: "Digital video, SEM, App store ads, influencer micro-campaigns",
    digitalChannels: "Google Search, Facebook, Instagram, App Stores",
    socialActive: "Instagram, TikTok, Facebook",
    seo: "no credit check furniture, build credit rent to own",
    mediaSpend: "High – $25–35M estimated",
    influencers: "Micro-influencers in personal finance / home décor space",
    appRating: "4.2 / 4.4",
    reviews: "Generally positive; app praised; contract clarity improving",
    complaints: "Early termination fees; delivery windows",
    nps: "Est. 38 NPS",
    threat: "High",
    monitorNotes: "Track app update logs and new feature releases; monitor influencer partnerships; watch for geographic expansion announcements; compare weekly pricing monthly"
  },
  {
    id: "C-002",
    name: "FlexShopper",
    type: "Public – Online Only",
    hq: "Boca Raton, FL",
    auditDate: "2025-01-15",
    tier: "Tier 2 – Digital Disruptor",
    valueProp: "100% online lease-to-own marketplace with instant approval and wide product range",
    personas: "P-002, P-003",
    marketShare: "8%",
    footprint: "National – Digital only",
    growth: "High growth – YoY +22%",
    categories: "Electronics, Appliances, Furniture, Sporting Goods, Jewelry",
    path: "Online lease-to-own; buy-out options",
    priceAnchor: "Variable – product-dependent",
    promo: "Flash sales; holiday promos; cart abandonment retargeting",
    creditCheck: "Soft check only",
    uniqueFeature: "Open marketplace model; 500,000+ products; API partner integrations",
    promoFocus: "Convenience of online; no store visit needed; instant approval",
    pillars: "Speed, Selection, No hassle",
    tagline: "'Shop. Lease. Own.'",
    style: "Minimal / e-commerce clean; product-focused",
    tone: "Tech-forward, transactional, low-friction",
    formats: "Google Shopping, Retargeting, Email, Affiliate",
    digitalChannels: "Google Shopping, Email, Affiliate networks, Retargeting",
    socialActive: "None significant",
    seo: "online rent to own, instant approval furniture, no credit check electronics",
    mediaSpend: "Medium – $8–12M estimated",
    influencers: "None – performance marketing focused",
    appRating: "3.7 / 3.9",
    reviews: "Mixed – approval speed praised; total cost a common complaint",
    complaints: "High total payment vs retail price",
    nps: "Est. 22 NPS",
    threat: "Medium – Growing",
    monitorNotes: "Scrape product catalogue quarterly; monitor affiliate partnerships; track Google Shopping ad presence; watch for brick-and-mortar expansion signals"
  },
  {
    id: "C-003",
    name: "SNAP Finance",
    type: "Private – Fintech",
    hq: "Salt Lake City, UT",
    auditDate: "2025-01-15",
    tier: "Tier 2 – B2B Enabler",
    valueProp: "Lease-to-own financing platform embedded in third-party retailers",
    personas: "P-001, P-002",
    marketShare: "6%",
    footprint: "National – embedded in 4,500+ retail partners",
    growth: "High growth via B2B partnerships",
    categories: "Furniture, Electronics, Appliances (via partner retailers)",
    path: "Lease financing; 100-day payoff option",
    priceAnchor: "N/A – partner-set pricing",
    promo: "Partner co-branded promotions",
    creditCheck: "No – alternative underwriting",
    uniqueFeature: "Embedded finance model; white-label; AI underwriting",
    promoFocus: "B2B retail partnerships; brand invisible to end consumer",
    pillars: "Speed of approval, Partner enablement",
    tagline: "N/A – white-label model",
    style: "N/A – white-label",
    tone: "N/A – partner-dependent",
    formats: "Co-branded in-store POS, partner digital assets",
    digitalChannels: "B2B – partner channels",
    socialActive: "LinkedIn (B2B), partner co-branded",
    seo: "lease to own financing, instant approval point of sale",
    mediaSpend: "Low direct – partner-funded",
    influencers: "N/A",
    appRating: "N/A",
    reviews: "Mostly via partner retailer reviews",
    complaints: "Confusion about who to contact for issues",
    nps: "Est. N/A – B2B",
    threat: "Medium – Indirect",
    monitorNotes: "Track new retail partner announcements; monitor fintech press for funding rounds; watch for direct-to-consumer pivot signals"
  }
];

// Market Trends Tracker represented securely
const trendsList = [
  {
    id: "T-001",
    name: "Rising Consumer Credit Stress & Subprime Squeeze",
    category: "Macroeconomic",
    identified: "2025-01-01",
    source: "CFPB Consumer Credit Report; Federal Reserve G.19",
    confidence: "High",
    description: "Credit card delinquency rates among subprime cardholders with incomes below $50K have reached their highest level since 2011. Subprime auto loans are declining, pushing consumers toward alternative finance channels including RTO.",
    momentum: "Accelerating",
    statistics: "CFPB 2024: 30+ day delinquency rate on subprime cards at 8.2% (up from 5.4%).",
    timeHorizon: "Near-term (12–24 months)",
    affectedPersonas: "P-001, P-002",
    affectedCompetitors: "C-001, C-002, C-003",
    demandImpact: "Significant positive demand driver – target audience expands as credit access narrows.",
    opportunityThreat: "Opportunity",
    severity: "9/10",
    response: "Amplify 'no credit needed' and 'all-access for everyone' messaging; develop credit-building feature content; partner with financial counseling organizations.",
    department: "Marketing / Product",
    status: "In Progress",
    priorityScore: 9,
    notes: "[AI: Pull latest CFPB Quarterly Consumer Credit statistics; search Reddit r/povertyfinance for pain points; scrape Google Trends for 'rent furniture no credit']",
    nextReview: "2025-04-01"
  },
  {
    id: "T-002",
    name: "BNPL Fatigue & Regulatory Backlash",
    category: "Fintech / Regulatory",
    identified: "2025-01-01",
    source: "CFPB BNPL Report 2024; Bloomberg; Reuters",
    confidence: "High",
    description: "CFPB issued guidance classifying BNPL products as credit cards, introducing regulatory friction for players like Affirm and Klarna. Backlash against BNPL hidden fees and debt stacking is growing, creating an opportunity for transparent RTO models.",
    momentum: "Accelerating",
    statistics: "CFPB 2024 BNPL report: 13% of BNPL users missed a payment in last 12 months.",
    timeHorizon: "Near-term (6–18 months)",
    affectedPersonas: "P-002",
    affectedCompetitors: "C-001, C-002, C-003",
    demandImpact: "Moderate positive – positions RTO as more transparent alternative to BNPL for electronics/furniture.",
    opportunityThreat: "Opportunity",
    severity: "7/10",
    response: "Launch 'Total Cost Transparency' tool and directly compare RTO vs BNPL terms on site; update website FAQ to address BNPL concerns.",
    department: "Marketing / Legal / Product",
    status: "Planned",
    priorityScore: 7,
    notes: "[AI: Monitor CFPB press releases; Affirm/Klarna earnings call sentiment; track search terms 'BNPL regulation 2025']",
    nextReview: "2025-04-01"
  },
  {
    id: "T-003",
    name: "Digital-First Leasing Expectations",
    category: "Consumer Behaviour / Digital",
    identified: "2025-01-01",
    source: "Forrester CX Report 2024; App Store Review Analysis; Google Consumer Surveys",
    confidence: "High",
    description: "Post-pandemic consumers expect fully digital leasing journeys: online application, real-time delivery scheduling, and self-service account management via mobile app. Store-only operators face high drops.",
    momentum: "Steady Growth",
    statistics: "Forrester 2024: 67% of under-35 consideration starts online; Aaron's app 4.4★ vs RAC 3.9★ correlates with under-35 acquisition.",
    timeHorizon: "Near-term to Mid-term (12–36 months)",
    affectedPersonas: "P-002, P-003",
    affectedCompetitors: "C-002, C-003",
    demandImpact: "Significant – operators without strong app/web experience losing share among younger demos.",
    opportunityThreat: "Threat (if not addressed)",
    severity: "8/10",
    response: "Prioritise mobile app UX investments; ensure fully online application-to-delivery flow; enhance app-based account management; A/B test digital-first customer acquisition funnels.",
    department: "Product / Digital / Marketing",
    status: "Ongoing",
    priorityScore: 8,
    notes: "[AI: Quarterly app store review sentiment analysis vs FlexShopper; monitor Forrester/Gartner RTO research]",
    nextReview: "2025-04-01"
  },
  {
    id: "T-004",
    name: "Home Furnishing Demand Shift Post-Inflation",
    category: "Consumer Spending",
    identified: "2025-01-01",
    source: "U.S. Census Retail Sales; Furniture Today Industry Report 2024",
    confidence: "Medium",
    description: "Inflation-adjusted home furnishings spending down 4.7% in 2024. However, 'necessity' categories (refrigerators, washers) are showing resilience compared to discretionary furniture.",
    momentum: "Stabilising",
    statistics: "Furniture Today 2024: necessity category +6% volume, discretionary furniture -3% volume.",
    timeHorizon: "Near-term (12–18 months)",
    affectedPersonas: "P-001, P-003",
    affectedCompetitors: "C-001, C-002",
    demandImpact: "Mixed – opportunity in appliances / necessity; headwind in discretionary furniture.",
    opportunityThreat: "Mixed",
    severity: "6/10",
    response: "Shift promotional emphasis toward home packages and necessity bundles; launch 'Essential Home' bundle SKU; adjust discretionary inventory.",
    department: "Product / Marketing",
    status: "Planned",
    priorityScore: 6,
    notes: "[AI: Pull monthly Census retail sales; inspect Google Trends for 'rent washer dryer' vs 'rent couch']",
    nextReview: "2025-04-01"
  },
  {
    id: "T-005",
    name: "Gig Economy Growth & Income Volatility",
    category: "Workforce / Economic",
    identified: "2025-01-01",
    source: "BLS Contingent Worker Survey 2024; Pew Research Gig Economy Report",
    confidence: "High",
    description: "Approximately 36% of US workers engaged in gig or contingent work. Income volatility for this group makes standard monthly structures hard to sustain, making weekly payment structures highly attractive.",
    momentum: "Accelerating",
    statistics: "BLS 2024: 36% gig participation; 45% of gig workers report monthly income swings.",
    timeHorizon: "Mid-term (24–48 months)",
    affectedPersonas: "P-001, P-002",
    affectedCompetitors: "C-001, C-002, C-003",
    demandImpact: "Strong positive – directly expands core RTO target audience; validates flexible weekly payment model.",
    opportunityThreat: "Opportunity",
    severity: "8/10",
    response: "Develop gig-worker specific messaging ('pay how you actually get paid'); explore flexible schedule options; partner with gig platforms (DoorDash, Uber) for co-branded deals.",
    department: "Marketing / Product / Partnerships",
    status: "Exploration",
    priorityScore: 8,
    notes: "[AI: Track BLS contingent worker monthly reports; monitor Uber/DoorDash forums for temporary housing needs]",
    nextReview: "2025-07-01"
  }
];

// Audience Behaviour Signals (Pages 225-256)
const signalsList = [
  {
    id: "BS-001",
    date: "2025-01-08",
    personaId: "P-001",
    category: "Search Behaviour",
    trendId: "T-001",
    platform: "Google Trends / SEMrush",
    method: "Keyword trend analysis",
    geo: "National (US)",
    sampleSize: "10,000+ monthly searches",
    credibility: "High – verified platform data",
    observed: "Spike in searches for 'no credit check furniture delivery' and 'rent furniture weekly payments' among users in ZIP codes with median income <$45K. Peak search volume correlates with first week of month (post-bill payment anxiety).",
    verbatim: "'rent furniture no credit check near me' – 22,400 monthly searches, up 34% YoY",
    emotionalDriver: "Financial anxiety; urgency around a life event (new apartment, child needs bedroom)",
    barrier: "Perceived complexity of rental agreements; fear of hidden costs",
    frequency: "Recurring monthly spike – budget cycle driven",
    linkedCompetitor: "C-001, C-002",
    insight: "High-intent search behaviour confirms P-001 segment is actively looking for RTO solutions at key life moments; timing's impact suggests SEM campaigns should bid heavier in first week of month.",
    action: "Increase SEM bid strategy during weeks 1–2 of month; create dedicated landing page for 'no credit check furniture' keywords; A/B test urgency vs. reassurance messaging",
    owner: "Paid Media / SEO Team"
  },
  {
    id: "BS-002",
    date: "2025-01-10",
    personaId: "P-002",
    category: "Social Media Sentiment",
    trendId: "T-002",
    platform: "TikTok / Reddit (r/personalfinance)",
    method: "Social listening scrape",
    geo: "National (US)",
    sampleSize: "~2,400 TikTok posts; 340 Reddit threads",
    credibility: "Medium – organic UGC, potential bias",
    observed: "Under-30 users increasingly posting content comparing RTO vs BNPL total costs. Sentiment toward BNPL is shifting negative ('BNPL trap', 'Klarna debt') while curiosity around RTO is rising, though total cost concern remains a friction point for RTO as well.",
    verbatim: "TikTok: 'POV: you find out your BNPL charges more than just paying weekly at Aaron's' – 180K views; Reddit: 'Is rent-to-own actually worth it vs Afterpay?' – 340 upvotes",
    emotionalDriver: "Financial self-improvement; fear of debt traps; desire for transparency",
    barrier: "Still uncertain about RTO total cost vs retail — perceive RTO as 'expensive but accessible'",
    frequency: "Emerging – growing rapidly over Q4 2024",
    linkedCompetitor: "C-002, C-003",
    insight: "BNPL disillusionment is creating an organic entry point for RTO among P-002 personas. The opportunity is to position RTO as the 'honest alternative' with transparent total cost calculator content.",
    action: "Create TikTok/Reel content series: 'RTO vs BNPL – the real numbers'; build interactive total-cost calculator for web; brief influencer partners on BNPL comparison angle",
    owner: "Social Media / Content / Influencer Team"
  },
  {
    id: "BS-003",
    date: "2025-01-12",
    personaId: "P-001",
    category: "Customer Service Theme",
    trendId: "T-001",
    platform: "Internal Call Centre Transcripts (sample: 200 calls)",
    method: "Thematic analysis of inbound call reasons",
    geo: "National (US)",
    sampleSize: "200 call sample – Q4 2024",
    credibility: "High – first-party data",
    observed: "28% of inbound calls in Q4 2024 were from customers experiencing payment difficulty requesting deferral options. Second most common theme (19%) was confusion about total remaining payments to ownership. Both themes spike in November–January.",
    verbatim: "Customer verbatim: 'I just need to push my payment one week, I'm between paychecks and I don't want to lose the TV' – Call centre transcript #4471",
    emotionalDriver: "Fear of repossession; shame around financial difficulty; desire to maintain agreement",
    barrier: "Unclear total-to-own calculation; rigid payment deferral policy perceived as unsympathetic",
    frequency: "High frequency – recurs monthly, spikes seasonal",
    linkedCompetitor: "C-001",
    insight: "High-value rent preservation insight: payment flexibility and transparent total-cost communication are critical for reducing churn among P-001. Competitors (Aaron's) offering digital payment tools are gaining advantage here.",
    action: "Develop proactive 'Payment Flex' option communicated at point-of-sale; add 'total remaining to own' display prominently in app/web account portal; train CS staff on empathetic deferral scripts",
    owner: "Product / CS / App Team"
  },
  {
    id: "BS-004",
    date: "2025-01-14",
    personaId: "P-002, P-003",
    category: "App Store Review Analysis",
    trendId: "T-003",
    platform: "Apple App Store / Google Play – Aaron's & RAC apps",
    method: "App review scrape & sentiment analysis",
    geo: "National (US)",
    sampleSize: "1,200 reviews – last 90 days",
    credibility: "High – verified platform data",
    observed: "Aaron's app consistently praised for 'easy account management', 'can see what I owe', and 'delivered what I needed'. RAC app criticised for 'crashes', 'can't make payments online', 'hard to reach someone'. Under-35 reviewers rate digital experience 40% of their overall brand sentiment.",
    verbatim: "Aaron's 5★ review: 'Love that I can manage everything on the app – can see exactly how many payments left and change my payment date myself.' RAC 2★: 'App keeps crashing when I try to pay. Have to call the store every time.'",
    emotionalDriver: "Desire for control and autonomy; frustration with friction",
    barrier: "Poor app reliability erodes trust and increases churn intent",
    frequency: "Consistent pattern across 3 consecutive quarters",
    linkedCompetitor: "C-001, C-002",
    insight: "App quality is becoming a key competitive battleground for P-002 audience. RAC's app weakness is a direct opportunity to gain digital-native customers. P-003 also values self-service for account management during relocations.",
    action: "Conduct app UX audit vs Aaron's feature set; prioritise app stability fixes and 'payments remaining to own' feature; develop app-based account management roadmap for next 2 quarters",
    owner: "Product / App / Digital Team"
  }
];

// Active Research Queue Tasks (Pages 258-272)
const tasksList = [
  {
    id: "RQ-001",
    question: "What are the top 10 pain points expressed by RTO customers on social media and review platforms in the last 90 days?",
    sources: "Reddit (r/personalfinance, r/povertyfinance), TikTok comments, Google Play/App Store reviews, Trustpilot",
    crossRefs: "P-001, P-002, C-001, C-002",
    format: "Ranked list with verbatim examples and frequency count",
    frequency: "Monthly",
    priority: "High",
    agent: "Research Agent Alpha",
    lastRun: "2025-01-01",
    outputLocation: "Audience Behaviour Signals – Column K",
    status: "Active"
  },
  {
    id: "RQ-002",
    question: "How are Rent-A-Center and Aaron's currently messaging their no-credit-check value proposition across digital channels?",
    sources: "Meta Ad Library, Google Ads Transparency, Competitor websites, YouTube ad search",
    crossRefs: "C-001, C-002, T-001",
    format: "Side-by-side messaging matrix with screenshots and copy analysis",
    frequency: "Monthly",
    priority: "High",
    agent: "Research Agent Alpha",
    lastRun: "2025-01-01",
    outputLocation: "Competitor Audit – Columns R-W",
    status: "Active"
  },
  {
    id: "RQ-003",
    question: "What macroeconomic indicators most strongly correlate with RTO demand spikes in the US market?",
    sources: "Federal Reserve Economic Data (FRED), BLS Consumer Expenditure Survey, CFPB Consumer Credit Reports",
    crossRefs: "T-001, T-005, P-001",
    format: "Correlation analysis with 3 leading indicators and 2-quarter forecast",
    frequency: "Quarterly",
    priority: "High",
    agent: "Research Agent Beta",
    lastRun: "2025-01-01",
    outputLocation: "Market Trends – Column I",
    status: "Active"
  },
  {
    id: "RQ-004",
    question: "What new RTO or alternative financing competitors have launched or raised funding in the last 6 months?",
    sources: "Crunchbase, TechCrunch, PitchBook alerts, press release monitoring",
    crossRefs: "C-003, C-004, T-002",
    format: "Competitor entry log with funding details, target market, and threat assessment",
    frequency: "Quarterly",
    priority: "Medium",
    agent: "Research Agent Beta",
    lastRun: "2025-01-01",
    outputLocation: "Competitor Audit – new rows",
    status: "Scheduled"
  },
  {
    id: "RQ-005",
    question: "What does the gig worker community say about their furniture and appliance needs and current solutions?",
    sources: "Uber/DoorDash community forums, Reddit r/UberDrivers, Facebook gig worker groups, TikTok gig content",
    crossRefs: "P-001, P-002, T-005",
    format: "Thematic insight summary with top 5 unmet needs and verbatim quotes",
    frequency: "Monthly",
    priority: "Medium",
    agent: "Research Agent Alpha",
    lastRun: "2025-01-01",
    outputLocation: "Audience Behaviour Signals – new rows",
    status: "Scheduled"
  },
  {
    id: "RQ-006",
    question: "How is consumer sentiment toward BNPL changing and what alternatives are consumers seeking?",
    sources: "Google Trends, Twitter/X sentiment, CFPB press releases, Klarna/Affirm app reviews",
    crossRefs: "P-002, T-002, C-003",
    format: "Sentiment trend chart + top 10 alternative search terms consumers use",
    frequency: "Monthly",
    priority: "High",
    agent: "Research Agent Alpha",
    lastRun: "2025-01-01",
    outputLocation: "Market Trends T-002 + Behaviour Signals",
    status: "Active"
  }
];

export default function CreativeResearch() {
  const [activeTab, setActiveTab] = useState<"audience" | "competitors" | "trends" | "signals" | "tasks" | "llm_ops">("audience");
  const [dossierUploaded, setDossierUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [trendSearch, setTrendSearch] = useState("");
  const [selectedPersonaId, setSelectedPersonaId] = useState("P-001");
  const [selectedCompetitorId, setSelectedCompetitorId] = useState("C-001");
  const [selectedTrendId, setSelectedTrendId] = useState("T-001");
  const [selectedSignalId, setSelectedSignalId] = useState("BS-001");
  const [isDebugging, setIsDebugging] = useState(false);

  // Simulated LLMOps logs centered on Gemini RAG Gap analysis over BQ
  const [customPrompt, setCustomPrompt] = useState("How do retrieve 'Budget-Stretched Parent' core motivations to outperform Aaron's?");
  const [llmLog, setLlmLog] = useState<any>({
    execution_id: "EXEC-90512-WS2",
    model_version: "gemini-3.5-flash",
    temperature: 0.2,
    latency_ms: 312,
    tokens: { input: 1410, output: 520 },
    retrieved_persona_context: {
      id: "P-001",
      name: "The Budget-Stretched Parent",
      archetype: "Primary Caregiver",
      household_income: "$25,000–$45,000",
      pain_points: "Large upfront costs, credit checks, fear of repossession",
      deal_breakers: "Fear of hidden fees, complicated contracts, judged for financial situation"
    },
    retrieved_competitor_context: {
      id: "C-001",
      name: "Aaron's",
      tier: "Tier 1 - Primary",
      weakness: "Early termination fees, delivery windows as friction point",
      pricing_anchor: "$17.99/week (entry sofa)"
    },
    recommended_messaging_angles: [
      "Zero-Debt Flexibility: Combat Aaron's early exit pricing via RAC's direct 'Cancel-and-Return' transparency pledge.",
      "Empathetic Weekly Framing: Format offer parameters exclusively around week-by-week payments with no hidden fees.",
      "Immediate Same-Day Deliveries: Pitch extreme speed of setup to satisfy child-rearing emergencies."
    ]
  });

  const handleUploadSimulator = () => {
    setIsUploading(true);
    setTimeout(() => {
      setDossierUploaded(true);
      setIsUploading(false);
    }, 1200);
  };

  const handleTriggerGapAnalysis = () => {
    setIsDebugging(true);
    setTimeout(() => {
      const activePers = personasList.find((p) => p.id === selectedPersonaId) || personasList[0];
      const activeCompet = competitorsList.find((c) => c.id === selectedCompetitorId) || competitorsList[0];
      
      const suggestedAngles = activePers.id === "P-001" ? [
        `No-Hidden-Fees Slogan: Directly target Aaron's '${activeCompet.priceAnchor}' entry point with RAC close-out clarity.`,
        "Empathetic Payment Pause: Lead with 'Pause-Anytime with Zero Judgment' safety netting.",
        "Furniture Swap Option: Deliver immediate setups to target family-rearing milestones."
      ] : activePers.id === "P-002" ? [
        `Digitally Managed Hardware: Counter '${activeCompet.name}' software friction with direct RAC app-based payment adjustments.`,
        "Zero-Debt Tech swaps: Market premium gaming rigs with instant soft-pings only.",
        "Hustler Autonomy angles: Zero long-term credit bounds; escape traditional card traps."
      ] : [
        `Fast-Track room packages: Match relocator needs with instant room bundles shipped in 24 hours.`,
        "Flex Term commitments: Zero lock-in contracts; return immediately on next station transfer.",
        "Premium Delivery Perks: Focus heavily on 'hassle-free set up and return pickup logs'."
      ];

      setLlmLog({
        execution_id: `EXEC-${Math.floor(10000 + Math.random() * 90000)}-WS2`,
        model_version: "gemini-3.5-flash",
        temperature: 0.2,
        latency_ms: Math.floor(200 + Math.random() * 150),
        tokens: { input: Math.floor(1300 + Math.random() * 200), output: Math.floor(400 + Math.random() * 100) },
        retrieved_persona_context: {
          id: activePers.id,
          name: activePers.name,
          archetype: activePers.archetype,
          household_income: activePers.income,
          pain_points: activePers.painPoints,
          deal_breakers: activePers.dealBreakers
        },
        retrieved_competitor_context: {
          id: activeCompet.id,
          name: activeCompet.name,
          tier: activeCompet.tier,
          weakness: activeCompet.complaints,
          pricing_anchor: activeCompet.priceAnchor
        },
        recommended_messaging_angles: suggestedAngles
      });
      setIsDebugging(false);
    }, 900);
  };

  // Find currently selected detail items
  const activePersona = personasList.find(p => p.id === selectedPersonaId) || personasList[0];
  const activeCompetitor = competitorsList.find(c => c.id === selectedCompetitorId) || competitorsList[0];
  const activeTrend = trendsList.find(t => t.id === selectedTrendId) || trendsList[0];
  const activeSignal = signalsList.find(s => s.id === selectedSignalId) || signalsList[0];

  return (
    <div className="space-y-6">
      {/* Upper Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-slate-800 text-base font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600 animate-pulse" />
            Creative Research & Audience Intelligence (WS2)
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Interconnected templates tracking verified audience personas, competitor audits, and macroeconomic trend buffers.
          </p>
        </div>

        {/* Sync and ingestion panel */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Research GCS Cache:</span>
          {dossierUploaded ? (
            <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 border border-emerald-100 rounded font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> WS2 Sheets Connected
            </span>
          ) : (
            <button
              onClick={handleUploadSimulator}
              disabled={isUploading}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded text-[11px] font-bold flex items-center justify-center gap-1.5 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-600" />
              {isUploading ? "Connecting Pipeline..." : "Validate WS2 Workbook"}
            </button>
          )}
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1">
        {[
          { id: "audience", label: "Audience Persona Library", icon: <Users className="w-3.5 h-3.5" /> },
          { id: "competitors", label: "Competitor Audit", icon: <Globe className="w-3.5 h-3.5" /> },
          { id: "trends", label: "Market Trends Tracker", icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { id: "signals", label: "Audience Behaviour Signals", icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "tasks", label: "AI Research Task Queue", icon: <Clock className="w-3.5 h-3.5" /> },
          { id: "llm_ops", label: "Interactive Gap Analyzer", icon: <Terminal className="w-3.5 h-3.5 text-rose-500" /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === t.id
                ? "border-indigo-600 text-indigo-600 bg-white"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Main interactive Tab Content container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm min-h-[380px]">
        
        {/* Tab 1: Persona Library */}
        {activeTab === "audience" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-slate-800 font-sans block">Workspace Persona Library</span>
                <p className="text-slate-400 text-xs mt-0.5">Verified RTO segment archetypes and messaging constraints.</p>
              </div>
              
              {/* Persona Selector dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Select Persona Profile:</span>
                <select
                  value={selectedPersonaId}
                  onChange={(e) => setSelectedPersonaId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500"
                >
                  {personasList.map((p) => (
                    <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Persona Deep Dive bento grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Box 1: Core demographic overview */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                    {activePersona.id}
                  </span>
                  <span className="text-xs font-medium text-slate-500 font-mono">{activePersona.priority}</span>
                </div>
                
                <div>
                  <h3 className="text-slate-850 font-bold text-sm block tracking-tight font-bold">{activePersona.name}</h3>
                  <span className="text-slate-500 text-xs font-mono">{activePersona.archetype}</span>
                </div>

                <div className="space-y-2 border-t border-slate-200 pt-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Age Range</span>
                    <strong className="text-slate-700 font-mono">{activePersona.age}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Gender Skew</span>
                    <strong className="text-slate-700 font-mono">{activePersona.gender}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Income Band</span>
                    <strong className="text-slate-700 font-mono text-emerald-600">{activePersona.income}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Employment Status</span>
                    <strong className="text-slate-700 font-medium">{activePersona.employment}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Education Level</span>
                    <strong className="text-slate-700">{activePersona.education}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Geo Scope</span>
                    <strong className="text-slate-700">{activePersona.marketType}</strong>
                  </div>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-lg p-3 text-[11px] text-indigo-805">
                  <span className="font-bold text-indigo-950 block uppercase text-[8px] font-mono tracking-wider">Aspirational Identity Identity:</span>
                  {activePersona.aspirational}
                </div>
              </div>

              {/* Box 2: Psychographics & Pain points */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-xl space-y-4">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Psychographic Context
                </span>
                
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Core Motivation:</span>
                    <p className="text-slate-700 font-bold leading-relaxed">{activePersona.motivation}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Life Goal:</span>
                    <p className="text-slate-700">{activePersona.lifeGoal}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Financial Attitude:</span>
                    <p className="text-slate-700 leading-relaxed font-mono text-[11px]">{activePersona.attitude}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Core Brand Values:</span>
                    <p className="text-slate-700">{activePersona.values}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Key Pain Points:</span>
                    <p className="text-rose-600 font-bold">{activePersona.painPoints}</p>
                  </div>
                </div>
              </div>

              {/* Box 3: Actionable Messaging Strategy */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-xl space-y-4">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Ad Strategy & Channels
                </span>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Hero Message & Headline copy:</span>
                    <p className="text-emerald-700 font-bold border-l-2 border-emerald-500 pl-2 leading-relaxed italic text-[11px]">
                      "{activePersona.heroMessage}"
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Supporting Proof Points:</span>
                    <p className="text-slate-700">{activePersona.proofPoints}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
                    <div>
                      <span className="text-slate-400 font-medium block">Sensitivity</span>
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded font-sans inline-block mt-0.5">
                        {activePersona.sensitivity}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">CTA Format</span>
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded font-sans inline-block mt-0.5">
                        {activePersona.cta}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Preferred Digital Channels:</span>
                    <p className="text-slate-700 font-mono text-[11px] font-semibold">{activePersona.digitalChannels}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Customer VoC Quote:</span>
                    <p className="text-slate-500 leading-snug italic">"{activePersona.vocQuote}"</p>
                  </div>
                </div>
              </div>

            </div>

            {/* AI Research Stream Notes bar */}
            <div className="bg-indigo-900 border border-indigo-950 text-indigo-200 p-4 rounded-xl flex items-start gap-3.5">
              <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-white block uppercase text-[10px] font-mono">AI Grounding Signals Ingested (BigQuery ws2_persona_library.notes):</span>
                <p className="font-mono text-indigo-150 leading-relaxed text-[11px] bg-slate-950/40 p-2 rounded border border-indigo-800/30">
                  {activePersona.researchNotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Competitor Audit */}
        {activeTab === "competitors" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-slate-800 font-sans block">Competitor Audit & Gap Auditing</span>
                <p className="text-slate-400 text-xs mt-0.5">Competitive market positioning index scanned across 4+ months of active spend.</p>
              </div>
              
              {/* Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Select Peer Brand:</span>
                <select
                  value={selectedCompetitorId}
                  onChange={(e) => setSelectedCompetitorId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500"
                >
                  {competitorsList.map((c) => (
                    <option key={c.id} value={c.id}>{c.id} - {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick table comparison listing all competitors */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left font-sans border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 text-[11px]">
                  <tr>
                    <th className="p-3">Brand (ID)</th>
                    <th className="p-3">HQ Location</th>
                    <th className="p-3 text-center">Market Share</th>
                    <th className="p-3">Core Positioning Promise</th>
                    <th className="p-3">Target Personas</th>
                    <th className="p-3 font-semibold text-indigo-600">Exploitable Top Complaint</th>
                    <th className="p-3 text-center">Threat Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {competitorsList.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => setSelectedCompetitorId(c.id)}
                      className={`hover:bg-slate-50/50 cursor-pointer transition ${
                        selectedCompetitorId === c.id ? "bg-indigo-50/45 border-l-4 border-indigo-600 font-semibold" : ""
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-800">{c.name} ({c.id})</td>
                      <td className="p-3 text-slate-600">{c.hq}</td>
                      <td className="p-3 text-center font-mono text-slate-800 font-bold">{c.marketShare}</td>
                      <td className="p-3 text-slate-600 leading-snug">{c.valueProp}</td>
                      <td className="p-3 font-mono text-indigo-600">{c.personas}</td>
                      <td className="p-3 font-medium text-rose-600">{c.complaints}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          c.threat === "High" 
                          ? "bg-rose-50 text-rose-700 border border-rose-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {c.threat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bento Detail View of Selected Competitor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Product and Pricing Profile */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-xl space-y-4">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Product & Pricing Ingestion
                </span>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Categories Offered</span>
                    <strong className="text-slate-700 mt-0.5 block">{activeCompetitor.categories}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Ownership Mechanism</span>
                    <strong className="text-slate-700 mt-0.5 block">{activeCompetitor.path}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Weekly Price Anchor</span>
                    <strong className="text-indigo-650 text-emerald-600 font-mono mt-0.5 block">{activeCompetitor.priceAnchor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Soft Checks Policy</span>
                    <strong className="text-slate-700 mt-0.5 block">{activeCompetitor.creditCheck}</strong>
                  </div>
                  <div className="col-span-2 border-t border-slate-100 pt-2.5">
                    <span className="text-slate-400 block font-medium">Active Promotional Schemes</span>
                    <p className="text-slate-700 font-semibold leading-relaxed mt-0.5">{activeCompetitor.promo}</p>
                  </div>
                  <div className="col-span-2 border-t border-slate-100 pt-2.5">
                    <span className="text-slate-400 block font-medium">Unique Product Differentiation</span>
                    <p className="text-slate-700 leading-relaxed mt-0.5">{activeCompetitor.uniqueFeature}</p>
                  </div>
                </div>
              </div>

              {/* Messaging & Channel Audits */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-xl space-y-4">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Messaging, Tone & Creative Presence
                </span>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Hero Tagline</span>
                    <strong className="text-emerald-700 block italic mt-0.5">{activeCompetitor.tagline}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Brand Tone of Voice</span>
                    <strong className="text-slate-700 block mt-0.5">{activeCompetitor.tone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Visual Design Motif</span>
                    <strong className="text-slate-700 block leading-tight mt-0.5">{activeCompetitor.style}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Estimated Paid Media Spend</span>
                    <strong className="text-slate-700 block font-mono text-indigo-600 mt-0.5">{activeCompetitor.mediaSpend}</strong>
                  </div>
                  <div className="col-span-2 border-t border-slate-100 pt-2.5">
                    <span className="text-slate-400 block font-medium">Primary Ad Formats</span>
                    <p className="text-slate-700 leading-normal mt-0.5">{activeCompetitor.formats}</p>
                  </div>
                  <div className="col-span-2 border-t border-slate-100 pt-2.5">
                    <span className="text-slate-400 block font-medium">SEO Keywords Overlaps</span>
                    <p className="text-slate-700 font-mono text-[11px] font-semibold leading-relaxed mt-0.5">{activeCompetitor.seo}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* AI Monitor Notes Bar */}
            <div className="bg-rose-950 border border-rose-900 text-rose-200 p-4 rounded-xl flex items-start gap-3.5">
              <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-white block uppercase text-[10px] font-mono">Competitor Monitoring RAG instructions (ws2_competitor_audits.ai_monitor_notes):</span>
                <p className="font-mono text-rose-150 leading-relaxed text-[11px] bg-slate-950/40 p-2 rounded border border-rose-800/30">
                  {activeCompetitor.monitorNotes || "Track app update logs and new feature releases; monitor influencer partnerships."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Trends Tracker */}
        {activeTab === "trends" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-slate-800 font-sans block">Market Trends Tracker</span>
                <p className="text-slate-400 text-xs mt-0.5">Macroeconomic indicators and regulatory fatigue indexes.</p>
              </div>
              
              {/* Select dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Active Market Trend:</span>
                <select
                  value={selectedTrendId}
                  onChange={(e) => setSelectedTrendId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500"
                >
                  {trendsList.map((t) => (
                    <option key={t.id} value={t.id}>{t.id} - {t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid list containing trends */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {trendsList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrendId(t.id)}
                  className={`p-3.5 text-left rounded-xl border text-xs transition cursor-pointer ${
                    selectedTrendId === t.id 
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-705 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span className="font-mono block text-[10px] opacity-80">{t.id} • {t.category}</span>
                  <strong className="block font-sans mt-1.5 font-bold leading-tight">{t.name}</strong>
                  <span className="font-mono text-[9px] block mt-2 px-1.5 py-0.5 rounded bg-slate-900/10 text-center uppercase font-bold">
                    {t.momentum}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Trend Deep Analysis */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
              
              {/* Col 1: Core Trend definition */}
              <div className="space-y-3.5">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Trend Metadata
                </span>
                
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight font-bold">{activeTrend.name}</h4>
                  <span className="text-slate-450 text-[10px] font-mono block mt-1">Identified: {activeTrend.identified} via {activeTrend.source}</span>
                </div>

                <p className="text-slate-500 leading-relaxed text-[11px] border-t border-slate-200 pt-3">
                  {activeTrend.description}
                </p>

                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence Level</span>
                    <strong className="text-indigo-650 font-bold text-indigo-600">{activeTrend.confidence}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Horizon Runway</span>
                    <strong className="text-slate-700">{activeTrend.timeHorizon}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Affected Personas</span>
                    <strong className="text-rose-600 font-mono font-bold">{activeTrend.affectedPersonas}</strong>
                  </div>
                </div>
              </div>

              {/* Col 2: Ingested Statistics & Volatility */}
              <div className="space-y-4 border-t lg:border-t-0 lg:border-l lg:border-r border-slate-200 lg:px-6">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Ingested Statistics Buffer
                </span>

                <div className="space-y-3">
                  <div className="bg-indigo-50 border border-indigo-100 p-3.5 rounded-lg">
                    <span className="text-slate-400 uppercase text-[9px] font-semibold block">Authoritative Statistics:</span>
                    <p className="font-mono text-indigo-950 font-bold text-[11px] leading-relaxed mt-1">{activeTrend.statistics}</p>
                  </div>
                  
                  <div>
                    <span className="text-slate-400 block font-medium">Affected Competitors:</span>
                    <p className="text-slate-700 font-mono font-bold mt-0.5">{activeTrend.affectedCompetitors}</p>
                  </div>
                  
                  <div>
                    <span className="text-slate-400 block font-medium">Impact on RTO Category Demand:</span>
                    <p className="text-slate-705 text-slate-700 leading-normal mt-0.5">{activeTrend.demandImpact}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-medium">Impact Severity:</span>
                      <strong className="text-rose-600 block mt-0.5 font-mono font-bold text-xs">{activeTrend.severity}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Priority Score:</span>
                      <strong className="text-indigo-600 block mt-0.5 font-mono font-bold text-xs">{activeTrend.priorityScore}/10</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Recommended Response */}
              <div className="space-y-4">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Strategic AI Responses
                </span>

                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 block font-medium">Strategic Action Direction:</span>
                    <p className="text-emerald-700 font-bold border-l-2 border-emerald-500 pl-2 leading-relaxed mt-1">
                      {activeTrend.response}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Owner Department:</span>
                    <p className="text-slate-700 font-semibold mt-0.5">{activeTrend.department}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-150">
                    <div>
                      <span className="text-slate-400 block font-medium">Response Status</span>
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 border border-indigo-100 rounded inline-block mt-1">
                        {activeTrend.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Next Review Action</span>
                      <span className="text-slate-500 font-mono text-[10px] font-bold block mt-1.5">{activeTrend.nextReview}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Audience Behaviour Signals */}
        {activeTab === "signals" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-slate-800 font-sans block">Audience Behaviour Signals</span>
                <p className="text-slate-400 text-xs mt-0.5">Scraped ground anomalies compiled to validate active campaign briefs.</p>
              </div>
              
              {/* Select signal */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Select Signal row:</span>
                <select
                  value={selectedSignalId}
                  onChange={(e) => setSelectedSignalId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500"
                >
                  {signalsList.map((s) => (
                    <option key={s.id} value={s.id}>{s.id} - {s.category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List and Selector grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {signalsList.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSignalId(s.id)}
                  className={`p-4 text-left border rounded-xl transition text-xs flex flex-col justify-between ${
                    selectedSignalId === s.id 
                    ? "bg-indigo-50 border-indigo-500 shadow-sm" 
                    : "bg-slate-50 border-slate-200 hover:border-slate-350 hover:bg-slate-100"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-indigo-600 font-bold block">{s.id} • {s.date}</span>
                    <strong className="block font-sans text-slate-800 font-bold mt-1 leading-snug">{s.category}</strong>
                    <span className="text-[10px] text-slate-400 block italic leading-tight truncate mt-1">"{s.verbatim}"</span>
                  </div>
                  
                  <span className="text-[9px] font-mono mt-3 rounded bg-slate-200 px-2 py-0.5 text-slate-700 self-start">
                    {s.platform}
                  </span>
                </button>
              ))}
            </div>

            {/* Signal Details Deep Dive */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Observed details card */}
              <div className="space-y-3">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Observed Behaviour details
                </span>
                
                <div>
                  <strong className="text-slate-800 font-sans block text-sm font-bold">Signal: {activeSignal.category}</strong>
                  <span className="text-slate-400 text-[10px] font-mono mt-1 block">Compiled: {activeSignal.date} via {activeSignal.method}</span>
                </div>

                <p className="text-slate-500 leading-relaxed text-[11px] border-t border-slate-205 pt-2.5">
                  {activeSignal.observed}
                </p>

                <div className="bg-indigo-50 border border-indigo-150 rounded-lg p-3 italic">
                  <span className="text-indigo-900 font-bold block font-mono text-[8px] uppercase tracking-wider">VERBATIM EXAMPLE:</span>
                  <p className="text-indigo-950 font-medium leading-relaxed font-mono text-[10px] mt-1">"{activeSignal.verbatim}"</p>
                </div>
              </div>

              {/* Drivers and barriers */}
              <div className="space-y-4 border-t lg:border-t-0 lg:border-l lg:border-r border-slate-200 lg:px-6">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Emotional Drivers & Barriers
                </span>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-slate-400 block font-medium">Emotional Driver Motif:</span>
                    <p className="text-slate-700 font-bold leading-normal mt-0.5">{activeSignal.emotionalDriver}</p>
                  </div>
                  
                  <div>
                    <span className="text-slate-400 block font-medium">Identified Barrier Flag:</span>
                    <p className="text-rose-600 font-semibold leading-normal mt-0.5">{activeSignal.barrier}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-150">
                    <div>
                      <span className="text-slate-400 block font-medium">Frequency Signal:</span>
                      <strong className="text-slate-700 block mt-0.5 font-mono">{activeSignal.frequency}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Source Credibility</span>
                      <strong className="text-indigo-600 block mt-0.5 text-[10px]">{activeSignal.credibility}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Insights */}
              <div className="space-y-4">
                <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                  Strategic Action Outlay
                </span>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-slate-400 block font-medium">Linked Schema Keys:</span>
                    <p className="text-purple-700 font-mono text-[11px] font-bold mt-0.5">
                      Persona ID: {activeSignal.personaId} • Trend ID: {activeSignal.trendId}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Consolidated Insight:</span>
                    <p className="text-slate-705 text-slate-700 leading-relaxed mt-0.5">{activeSignal.insight}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Consolidated Slogan Plan:</span>
                    <p className="text-emerald-700 font-bold border-l-2 border-emerald-500 pl-2 leading-relaxed mt-0.5">
                      {activeSignal.action}
                    </p>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-400">Action Action Owner</span>
                    <strong className="text-slate-700 font-sans">{activeSignal.owner}</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 5: Tasks Tracker */}
        {activeTab === "tasks" && (
          <div className="space-y-4 text-xs font-sans">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-800 font-sans block">AI Research Task Queue (Section A & B)</span>
              <p className="text-slate-400 text-xs mt-0.5">Tracks autonomous background scrapers populated into BigQuery tables.</p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 text-[11px]">
                  <tr>
                    <th className="p-3">Task ID</th>
                    <th className="p-3">Target Research Question</th>
                    <th className="p-3">Scraped Sources</th>
                    <th className="p-3">Foreign Key Jointure</th>
                    <th className="p-3">Frequency</th>
                    <th className="p-3">Output Location</th>
                    <th className="p-3">Assigned Bot</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tasksList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-indigo-600">{t.id}</td>
                      <td className="p-3 font-semibold leading-normal max-w-[280px]">{t.question}</td>
                      <td className="p-3 text-[11px] text-slate-500 max-w-[200px] leading-snug">{t.sources}</td>
                      <td className="p-3 font-mono text-purple-600">{t.crossRefs}</td>
                      <td className="p-3 font-sans text-slate-550">{t.frequency}</td>
                      <td className="p-3 text-[11px] font-sans font-medium text-slate-800">{t.outputLocation}</td>
                      <td className="p-3 font-mono text-[10px] text-slate-400">{t.agent}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                          t.status === "Active" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cross-Sheet Synthesis instructions card (representing slide section B) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <span className="text-[10px] text-indigo-600 font-mono uppercase bg-indigo-50 px-2 py-0.5 rounded font-bold tracking-wider">
                Cross-Sheet Synthesis Instructions (Section B)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white border border-slate-150 p-4 rounded-lg space-y-2">
                  <span className="font-mono text-indigo-600 font-bold block text-[10px]">STEP 1: PERSONA × TREND MAPPING</span>
                  <p className="text-slate-650 leading-relaxed text-[11px]">
                    For each Persona_ID, find affected trend rows and compile how the macroDelinquency stress changing financing access levels.
                  </p>
                  <strong className="text-[11px] text-emerald-700 block font-mono">Expected: 'Persona Trend Impact Card' output row</strong>
                </div>

                <div className="bg-white border border-slate-150 p-4 rounded-lg space-y-2">
                  <span className="font-mono text-indigo-600 font-bold block text-[10px]">STEP 2: COMPETITOR × PERSONA GAP ANALYSIS</span>
                  <p className="text-slate-650 leading-relaxed text-[11px]">
                    Contrast active Core_Motivation indicators against Peer brand messaging. Spot whitespace opportunities RAC can own.
                  </p>
                  <strong className="text-[11px] text-emerald-700 block font-mono">Expected: 'Whitespace Opportunity' row in Competitor Audit</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Interactive Gap-Analysis LLMOps RAG Live Logs */}
        {activeTab === "llm_ops" && (
          <div className="space-y-6 font-sans text-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-850 block flex items-center gap-1.5 text-rose-600 font-bold">
                <Terminal className="w-4 h-4 text-rose-500" />
                Interactions & Campaign RAG Execution Logs
              </span>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Audit the deep prompt variables, retrieved context payloads, token latency weights, and Gemini system outputs mapping to physical tables.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left query adjustment */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block tracking-wider">Gap-Analysis Query Configurer</span>
                
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Target Persona (GCS Cache)</label>
                    <select
                      value={selectedPersonaId}
                      onChange={(e) => setSelectedPersonaId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-rose-500"
                    >
                      {personasList.map((p) => (
                        <option key={p.id} value={p.id}>{p.id} ({p.name})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Target Competitor (Audit Table)</label>
                    <select
                      value={selectedCompetitorId}
                      onChange={(e) => setSelectedCompetitorId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-rose-500"
                    >
                      {competitorsList.map((c) => (
                        <option key={c.id} value={c.id}>{c.id} ({c.name})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Custom Planner Prompt</label>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-slate-200 p-2.5 rounded text-xs focus:outline-none focus:border-rose-500 font-sans"
                    />
                  </div>

                  <button
                    onClick={handleTriggerGapAnalysis}
                    disabled={isDebugging}
                    className="w-full py-2 bg-rose-600 text-white font-bold rounded hover:bg-rose-700 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                    {isDebugging ? "Executing BQ RAG Search..." : "Simulate Gap RAG Query"}
                  </button>
                </div>
              </div>

              {/* Right JSON & Log variables display */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center font-mono">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Execution ID</span>
                    <strong className="text-slate-800 text-xs block truncate mt-0.5 font-bold">{llmLog.execution_id}</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center font-mono">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Latency</span>
                    <strong className="text-emerald-600 text-xs block mt-0.5 font-bold">{llmLog.latency_ms} ms</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center font-mono">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Tokens RAG Weight</span>
                    <strong className="text-slate-700 text-xs block mt-0.5 font-bold">{llmLog.tokens.input} In / {llmLog.tokens.output} Out</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center font-mono">
                    <span className="text-[9px] text-rose-505 text-rose-600 block uppercase font-bold">LLM Model</span>
                    <strong className="text-rose-600 text-xs block mt-0.5 font-bold">{llmLog.model_version}</strong>
                  </div>
                </div>

                {/* Simulated log file output console styling */}
                <div className="bg-slate-900 border border-slate-950 rounded-xl p-5 text-slate-300 font-mono text-[10px] space-y-4 max-h-[300px] overflow-y-auto shadow-inner">
                  <span className="text-[9px] font-bold text-rose-400 block uppercase tracking-wide border-b border-rose-500/20 pb-1">
                    [Debug Stream: Creative_Research.marketing_os.ws2_gap_analysis_llm_logs]
                  </span>
                  
                  {isDebugging ? (
                    <div className="text-slate-450 italic animate-pulse py-8 text-center text-slate-400">
                      // Establishing semantic embedding connection to BigQuery schemas...
                      <br />// Performing Cosine Similarity distance calculations...
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="text-slate-550 block font-semibold text-slate-500">// 1. Retrieved Active Persona Cache (ws2_persona_library)</span>
                        <pre className="text-slate-200 whitespace-pre-wrap">{JSON.stringify(llmLog.retrieved_persona_context, null, 2)}</pre>
                      </div>

                      <div>
                        <span className="text-slate-550 block font-semibold text-slate-500">// 2. Retrieved Competitor Deficits (ws2_competitor_audits)</span>
                        <pre className="text-slate-200 whitespace-pre-wrap">{JSON.stringify(llmLog.retrieved_competitor_context, null, 2)}</pre>
                      </div>

                      <div>
                        <span className="text-slate-550 block font-semibold text-slate-500">// 3. Generated Slogan & Messaging Angles Output (Enforced Temp: 0.2)</span>
                        <ul className="list-disc list-inside space-y-1 text-emerald-400">
                          {llmLog.recommended_messaging_angles.map((angle: string, i: number) => (
                            <li key={i}>{angle}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-rose-50 border border-rose-100 p-3.5 rounded-lg text-[11px] text-rose-800 flex items-start gap-2.5 font-sans mt-2">
                  <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-950 block">RAG Guardrail alignment strictures:</span>
                    System temperatures enforced at <strong className="font-semibold text-rose-950">0.2</strong> within <strong className="font-semibold">{llmLog.model_version}</strong> preventing hallucinated pricing quotes. Insights are verified against physical table dimensions.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
