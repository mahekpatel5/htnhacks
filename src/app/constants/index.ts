import { Slack, Mail, FileText, Briefcase } from "lucide-react";
import type { Sponsor, SponsorStatus, Tier } from "../types";

export const SPONSORS: Sponsor[] = [
  {
    id: "s1", company: "Stripe", domain: "stripe.com",
    contacts: [{ name: "Maya Patel", email: "maya.patel@stripe.com", title: "University Programs Manager" }],
    currentDri: "Julia Ilioukhina",
    years: [
      { year: 2026, tier: "gold", addOns: ["Recruiting Booth", "API Workshop"], dri: "Julia Ilioukhina", reps: [] },
      { year: 2024, tier: "gold", addOns: ["Recruiting Booth", "API Workshop"], dri: "Julia Ilioukhina", reps: ["Jordan Lee", "Sam Wu"] },
      { year: 2023, tier: "gold", addOns: ["Recruiting Booth"], dri: "Anunya Kapur", reps: ["Jordan Lee"] },
      { year: 2022, tier: "silver", addOns: [], dri: "Liza Mehta", reps: ["Taylor Kim"] },
    ],
    historyKeyword: "2026 Target Renewal", status: "Negotiating",
    notes: "Very responsive team. Maya mentioned Q1 budget opens Feb. Push for gold again + API workshop add-on.",
    lastBumpDate: "2026-05-10",
    inboundEmailStatus: "unread",
    aiSummary: "Stripe has been a consistent gold-tier sponsor since 2023. Their team is highly engaged and specifically values the API workshop as a talent funnel. Maya Patel is the primary champion internally. Key leverage: Stripe hired 3 engineers from last year's event.",
    recruiterFeedback: "Top-tier candidates. Students who use Stripe APIs are highly motivated.",
    resources: [
      { id: "r1", label: "#sponsors-stripe Slack thread", url: "#", summary: "Discussed 2026 renewal timeline. Maya confirmed interest in gold again pending Q1 budget sign-off.", type: "slack", date: "2026-05-10" },
      { id: "r2", label: "Discovery call notes – Mar 2026", url: "#", summary: "30-min call with Maya. Key asks: dedicated recruiting table, 2 API workshop slots, logo on main stage.", type: "meeting", date: "2026-03-15" },
      { id: "r3", label: "2024 Contract", url: "#", summary: "Gold tier, $25K. Includes recruiting booth and API workshop.", type: "contract", date: "2024-01-10" },
      { id: "r4", label: "Email thread – outreach Jan 2026", url: "#", summary: "Initial 2026 outreach. Maya responded within 24h, flagged she needs exec approval for amounts over $20K.", type: "email", date: "2026-01-12" },
    ],
  },
  {
    id: "s2", company: "Notion", domain: "notion.so",
    contacts: [{ name: "Chris Yamamoto", email: "chris.y@notion.so", title: "Developer Relations Lead" }],
    currentDri: "Anunya Kapur",
    years: [
      { year: 2026, tier: "gold", addOns: ["Prize Track"], dri: "Anunya Kapur", reps: [] },
      { year: 2024, tier: "silver", addOns: ["Workshop"], dri: "Anunya Kapur", reps: ["Avery Torres"] },
      { year: 2023, tier: "bronze", addOns: [], dri: "Anunya Kapur", reps: ["Avery Torres"] },
    ],
    historyKeyword: "2026 Sponsor – Gold Upsell", status: "Discovery Call",
    notes: "Chris wants to upsell to gold in 2026. Likes the idea of a Notion-sponsored prize track.",
    lastBumpDate: "2026-05-15",
    inboundEmailStatus: "read_unanswered",
    aiSummary: "Notion has been growing year over year from bronze to silver. Chris is highly enthusiastic and proposed a custom prize track. Strong candidate for gold upsell.",
    recruiterFeedback: "Candidates showed high product intuition. Expressed interest in early-career hiring.",
    resources: [
      { id: "r5", label: "#sponsors-notion thread", url: "#", summary: "Chris pitched the prize track idea. Team discussed feasibility – leaning yes.", type: "slack", date: "2026-05-15" },
      { id: "r6", label: "Discovery call – Apr 2026", url: "#", summary: "45-min call. Chris confirmed Notion wants prize track as centerpiece. Budget ~$15K internally approved.", type: "meeting", date: "2026-04-20" },
    ],
  },
  {
    id: "s3", company: "Figma", domain: "figma.com",
    contacts: [{ name: "Dana Osei", email: "dana.osei@figma.com", title: "Community Partnerships" }],
    currentDri: "Mahek Patel",
    years: [
      { year: 2022, tier: "gold", addOns: ["Sponsor an Activity", "Sponsor a Snack"], dri: "Julia Ilioukhina", reps: ["Lee Park", "Morgan Chu"] },
    ],
    historyKeyword: "Cold – Lapsed 2023/24", status: "Contacted",
    notes: "No response to our 2023/24 outreach. New contact found via LinkedIn – Dana Osei replaced previous contact.",
    lastBumpDate: "2026-05-08",
    aiSummary: "Figma was a major gold sponsor in 2022 but went dark in 2023 and 2024. Internal restructuring likely caused the lapse. A new contact has been identified.",
    recruiterFeedback: "2022: design candidates were excellent. Swag was a huge hit.",
    resources: [
      { id: "r7", label: "LinkedIn message to Dana – May 2026", url: "#", summary: "Cold outreach via LinkedIn. Mentioned 2022 gold partnership. Dana viewed but no reply yet.", type: "email", date: "2026-05-08" },
      { id: "r8", label: "2022 Contract", url: "#", summary: "Gold tier. Design workshop + swag. $28K total.", type: "contract", date: "2022-11-15" },
    ],
  },
  {
    id: "s4", company: "OpenAI", domain: "openai.com",
    contacts: [{ name: "Riley Chen", email: "riley.chen@openai.com", title: "Campus Partnerships" }],
    currentDri: "Liza Mehta",
    years: [
      { year: 2026, tier: "gold", addOns: ["AI Track"], dri: "Liza Mehta", reps: [] },
    ],
    historyKeyword: "Interested in 2026 – Net New", status: "Warm Intro",
    notes: "Riley reached out cold after seeing a tweet. Warm intro from Priya who knows Riley from a conference.",
    lastBumpDate: "2026-05-20",
    inboundEmailStatus: "read_unanswered",
    aiSummary: "OpenAI is a net-new potential sponsor with strong inbound interest. Specifically interested in sponsoring an AI-focused track and potentially providing API credits.",
    recruiterFeedback: "N/A – first-time sponsor candidate.",
    resources: [
      { id: "r9", label: "Warm intro email from Priya", url: "#", summary: "Priya introduced Marcus to Riley. Riley expressed strong interest in AI track sponsorship.", type: "email", date: "2026-05-20" },
    ],
  },
  {
    id: "s5", company: "Vercel", domain: "vercel.com",
    contacts: [{ name: "Jamie Kowalski", email: "j.kowalski@vercel.com", title: "Developer Advocacy" }],
    currentDri: "Julia Ilioukhina",
    years: [
      { year: 2026, tier: "bronze", addOns: ["Deployment Credits"], dri: "Julia Ilioukhina", reps: [] },
      { year: 2024, tier: "startup", addOns: [], dri: "Julia Ilioukhina", reps: ["Blake Ryan"] },
    ],
    historyKeyword: "2026 Renewal – Upsell Bronze", status: "Verbal Yes",
    notes: "Jamie verbally confirmed bronze for 2026 on a call last week. Waiting on contract. Push for deployment credits as add-on.",
    lastBumpDate: "2026-05-18",
    aiSummary: "Vercel came in as startup-tier in 2024 and had a positive experience. They've given a verbal yes for bronze in 2026 and are open to deployment credits as an add-on prize.",
    recruiterFeedback: "Blake Ryan from Vercel was very engaged at the event.",
    resources: [
      { id: "r10", label: "Call notes – May 15", url: "#", summary: "Jamie confirmed verbal yes for bronze. Mentioned deployment credits as possible add-on.", type: "meeting", date: "2026-05-15" },
    ],
  },
  {
    id: "s6", company: "Jane Street", domain: "janestreet.com",
    contacts: [{ name: "Felix Huang", email: "fhuang@janestreet.com", title: "University Recruiting" }],
    currentDri: "Anunya Kapur",
    years: [
      { year: 2023, tier: "bronze", addOns: ["Sponsor a Meetup"], dri: "Liza Mehta", reps: ["Anna Bright"] },
      { year: 2022, tier: "bronze", addOns: ["Sponsor a Meetup"], dri: "Liza Mehta", reps: ["Anna Bright", "Tom Bell"] },
    ],
    historyKeyword: "Ghosted 2025 – Re-engage", status: "Ghosted",
    notes: "No response to 3 bumps this cycle. Felix still at company per LinkedIn.",
    lastBumpDate: "2026-05-03",
    aiSummary: "Jane Street sponsored for two consecutive years but went silent in 2024 despite three follow-up attempts. A fresh approach through their university recruiting team may be effective.",
    recruiterFeedback: "2023: extremely selective. Mostly focused on quant/CS candidates.",
    resources: [
      { id: "r11", label: "Bump email #3 – May 2026", url: "#", summary: "Third follow-up with no response. Delivered, not replied.", type: "email", date: "2026-05-03" },
    ],
  },
  {
    id: "s7", company: "Shopify", domain: "shopify.com",
    contacts: [{ name: "Nina Castillo", email: "n.castillo@shopify.com", title: "Developer Education" }],
    currentDri: "Mahek Patel",
    years: [
      { year: 2026, tier: "silver", addOns: ["Commerce API Workshop"], dri: "Mahek Patel", reps: [] },
      { year: 2024, tier: "silver", addOns: ["Commerce API Workshop"], dri: "Mahek Patel", reps: ["Dev Patel", "Cora M."] },
      { year: 2023, tier: "silver", addOns: [], dri: "Mahek Patel", reps: ["Dev Patel"] },
      { year: 2022, tier: "startup", addOns: [], dri: "Julia Ilioukhina", reps: ["Dev Patel"] },
    ],
    historyKeyword: "4-Year Partner", status: "Confirmed Sponsor",
    notes: "Nina confirmed silver again for 2026 with the Commerce API workshop. Contract signed.",
    lastBumpDate: "2026-05-12",
    aiSummary: "Shopify is a multi-year silver sponsor and one of the most reliable partners. Contract is already signed for 2026.",
    recruiterFeedback: "High engagement. Shopify reps were some of the most prepared at the booth.",
    resources: [
      { id: "r12", label: "2026 Contract – signed", url: "#", summary: "Silver tier, $18K. Commerce API workshop included. Signed by both parties on May 10.", type: "contract", date: "2026-05-10" },
      { id: "r13", label: "#sponsors-shopify thread", url: "#", summary: "Logo assets delivered. Nina confirmed booth dimensions and setup time.", type: "slack", date: "2026-05-12" },
    ],
  },
  {
    id: "s8", company: "Google", domain: "google.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "me",
    years: [{ year: 2026, tier: "gold", addOns: ["Recruiting Booth", "Tech Talk"], dri: "me", reps: [] }],
    historyKeyword: "New – Gold Prospect", status: "Prospect",
    notes: "",
    lastBumpDate: "2026-05-23",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s9", company: "RBC", domain: "rbc.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Julia Ilioukhina",
    years: [{ year: 2026, tier: "silver", addOns: ["Finance Workshop"], dri: "Julia Ilioukhina", reps: [] }],
    historyKeyword: "New – Silver Prospect", status: "Contacted",
    notes: "",
    lastBumpDate: "2026-05-20",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s10", company: "Cerebras", domain: "cerebras.ai",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Anunya Kapur",
    years: [{ year: 2026, tier: "bronze", addOns: ["AI Talk"], dri: "Anunya Kapur", reps: [] }],
    historyKeyword: "New – Bronze Prospect", status: "Discovery Call",
    notes: "",
    lastBumpDate: "2026-05-18",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s11", company: "QNX", domain: "qnx.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Liza Mehta",
    years: [{ year: 2026, tier: "bronze", addOns: [], dri: "Liza Mehta", reps: [] }],
    historyKeyword: "New – Bronze Prospect", status: "Prospect",
    notes: "",
    lastBumpDate: "2026-05-01",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s12", company: "Sun Life", domain: "sunlife.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Jennifer Yu",
    years: [{ year: 2026, tier: "startup", addOns: [], dri: "Jennifer Yu", reps: [] }],
    historyKeyword: "New – Startup Prospect", status: "Warm Intro",
    notes: "",
    lastBumpDate: "2026-05-15",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s13", company: "Burger King", domain: "burgerking.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Diya Saxena",
    years: [{ year: 2026, tier: "startup", addOns: ["Meal Vouchers"], dri: "Diya Saxena", reps: [] }],
    historyKeyword: "New – Food Sponsor", status: "Contacted",
    notes: "",
    lastBumpDate: "2026-05-22",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s14", company: "McDonalds", domain: "mcdonalds.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Sophie Jiang",
    years: [{ year: 2026, tier: "startup", addOns: ["Meal Vouchers"], dri: "Sophie Jiang", reps: [] }],
    historyKeyword: "New – Food Sponsor", status: "Prospect",
    notes: "",
    lastBumpDate: "2026-05-23",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s15", company: "Chucky Cheese", domain: "chuckecheese.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Samantha Mac",
    years: [{ year: 2026, tier: "startup", addOns: [], dri: "Samantha Mac", reps: [] }],
    historyKeyword: "New – Startup Prospect", status: "Discovery Call",
    notes: "",
    lastBumpDate: "2026-05-21",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s16", company: "Lazeez", domain: "lazeez.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "me",
    years: [{ year: 2026, tier: "startup", addOns: ["Food Catering"], dri: "me", reps: [] }],
    historyKeyword: "New – Food Sponsor", status: "Prospect",
    notes: "",
    lastBumpDate: "2026-05-23",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
  {
    id: "s17", company: "nowtea", domain: "nowtea.com",
    contacts: [{ name: "", email: "", title: "" }],
    currentDri: "Mahek Patel",
    years: [{ year: 2026, tier: "startup", addOns: ["Drink Station"], dri: "Mahek Patel", reps: [] }],
    historyKeyword: "New – Beverage Sponsor", status: "Contacted",
    notes: "",
    lastBumpDate: "2026-05-23",
    aiSummary: "",
    recruiterFeedback: "",
    resources: [],
  },
];

export const STATUS_ORDER: SponsorStatus[] = [
  "Confirmed Sponsor", "Verbal Yes", "Contract Sent", "Negotiating",
  "Discovery Call", "Contacted", "Warm Intro", "Prospect", "Rejected", "Ghosted",
];

export const ALL_DRIS = [
  "Julia Ilioukhina",
  "Anunya Kapur",
  "Liza Mehta",
  "Mahek Patel",
  "Jennifer Yu",
  "Diya Saxena",
  "Sophie Jiang",
  "Samantha Mac",
  "me",
];

export const TIER_ORDER: Tier[] = ["gold", "silver", "bronze", "startup"];

export const PIPELINE_STATUSES: SponsorStatus[] = [
  "Prospect", "Warm Intro", "Contacted", "Discovery Call",
  "Negotiating", "Verbal Yes", "Contract Sent",
];

export const STATUS_STYLES: Record<SponsorStatus, string> = {
  "Prospect": "bg-gray-100 text-gray-600",
  "Warm Intro": "bg-amber-100 text-amber-700",
  "Contacted": "bg-blue-100 text-blue-700",
  "Discovery Call": "bg-purple-100 text-purple-700",
  "Negotiating": "bg-orange-100 text-orange-700",
  "Verbal Yes": "bg-cyan-100 text-cyan-700",
  "Contract Sent": "bg-indigo-100 text-indigo-700",
  "Confirmed Sponsor": "bg-emerald-100 text-emerald-700",
  "Rejected": "bg-red-100 text-red-600",
  "Ghosted": "bg-gray-200 text-gray-500",
};

export const TIER_STYLES: Record<Tier, string> = {
  startup: "bg-slate-100 text-slate-600",
  bronze: "bg-orange-100 text-orange-700",
  silver: "bg-gray-200 text-gray-700",
  gold: "bg-yellow-100 text-yellow-700",
};

export const RESOURCE_ICONS: Record<string, typeof Slack> = {
  slack: Slack, email: Mail, meeting: FileText, contract: Briefcase,
};

export const RESOURCE_COLORS: Record<string, string> = {
  slack: "bg-purple-50 border-purple-100",
  email: "bg-blue-50 border-blue-100",
  meeting: "bg-emerald-50 border-emerald-100",
  contract: "bg-amber-50 border-amber-100",
};

export const RESOURCE_ICON_COLORS: Record<string, string> = {
  slack: "text-purple-500", email: "text-blue-500",
  meeting: "text-emerald-500", contract: "text-amber-500",
};

export const FILE_TYPE_PREVIEW: Record<string, { bg: string; icon: typeof FileText; label: string }> = {
  contract: { bg: "bg-amber-50", icon: Briefcase, label: "Contract" },
  meeting: { bg: "bg-emerald-50", icon: FileText, label: "Meeting Notes" },
  email: { bg: "bg-blue-50", icon: Mail, label: "Email Thread" },
  slack: { bg: "bg-purple-50", icon: Slack, label: "Slack Thread" },
};
