import { Slack, Mail, FileText, Briefcase } from "lucide-react";
import type { Sponsor, SponsorStatus, Tier } from "../types";

export const SPONSORS: Sponsor[] = [
  {
    id: "s1", company: "Stripe", domain: "stripe.com",
    contact: { name: "Maya Patel", email: "maya.patel@stripe.com", title: "University Programs Manager" },
    currentDri: "Alex Chen",
    years: [
      { year: 2024, tier: "gold", addOns: ["Recruiting Booth", "API Workshop"], dri: "Alex Chen", reps: ["Jordan Lee", "Sam Wu"] },
      { year: 2023, tier: "gold", addOns: ["Recruiting Booth"], dri: "Priya Singh", reps: ["Jordan Lee"] },
      { year: 2022, tier: "silver", addOns: [], dri: "Marcus Green", reps: ["Taylor Kim"] },
    ],
    historyKeyword: "2025 Target Renewal", status: "Negotiating",
    notes: "Very responsive team. Maya mentioned Q1 budget opens Feb. Push for gold again + API workshop add-on.",
    lastBumpDate: "2025-05-01",
    aiSummary: "Stripe has been a consistent gold-tier sponsor since 2023. Their team is highly engaged and specifically values the API workshop as a talent funnel. Maya Patel is the primary champion internally. Key leverage: Stripe hired 3 engineers from last year's event.",
    recruiterFeedback: "Top-tier candidates. Students who use Stripe APIs are highly motivated.",
    resources: [
      { id: "r1", label: "#sponsors-stripe Slack thread", url: "#", summary: "Discussed 2025 renewal timeline. Maya confirmed interest in gold again pending Q1 budget sign-off.", type: "slack", date: "2025-05-01" },
      { id: "r2", label: "Discovery call notes – Mar 2025", url: "#", summary: "30-min call with Maya. Key asks: dedicated recruiting table, 2 API workshop slots, logo on main stage.", type: "meeting", date: "2025-03-15" },
      { id: "r3", label: "2024 Contract", url: "#", summary: "Gold tier, $25K. Includes recruiting booth and API workshop.", type: "contract", date: "2024-01-10" },
      { id: "r4", label: "Email thread – outreach Jan 2025", url: "#", summary: "Initial 2025 outreach. Maya responded within 24h, flagged she needs exec approval for amounts over $20K.", type: "email", date: "2025-01-12" },
    ],
  },
  {
    id: "s2", company: "Notion", domain: "notion.so",
    contact: { name: "Chris Yamamoto", email: "chris.y@notion.so", title: "Developer Relations Lead" },
    currentDri: "Priya Singh",
    years: [
      { year: 2024, tier: "silver", addOns: ["Workshop"], dri: "Priya Singh", reps: ["Avery Torres"] },
      { year: 2023, tier: "bronze", addOns: [], dri: "Priya Singh", reps: ["Avery Torres"] },
    ],
    historyKeyword: "2025 Sponsor – Warm", status: "Discovery Call",
    notes: "Chris wants to upsell to gold in 2025. Likes the idea of a Notion-sponsored prize track.",
    lastBumpDate: "2025-05-10",
    aiSummary: "Notion has been growing year over year from bronze to silver. Chris is highly enthusiastic and proposed a custom prize track. Strong candidate for gold upsell.",
    recruiterFeedback: "Candidates showed high product intuition. Expressed interest in early-career hiring.",
    resources: [
      { id: "r5", label: "#sponsors-notion thread", url: "#", summary: "Chris pitched the prize track idea. Team discussed feasibility – leaning yes.", type: "slack", date: "2025-05-10" },
      { id: "r6", label: "Discovery call – Apr 2025", url: "#", summary: "45-min call. Chris confirmed Notion wants prize track as centerpiece. Budget ~$15K internally approved.", type: "meeting", date: "2025-04-20" },
    ],
  },
  {
    id: "s3", company: "Figma", domain: "figma.com",
    contact: { name: "Dana Osei", email: "dana.osei@figma.com", title: "Community Partnerships" },
    currentDri: "Sam Rivera",
    years: [
      { year: 2022, tier: "gold", addOns: ["Design Workshop", "Swag Drop"], dri: "Alex Chen", reps: ["Lee Park", "Morgan Chu"] },
    ],
    historyKeyword: "Cold – Lapsed 2023/24", status: "Contacted",
    notes: "No response to our 2023/24 outreach. New contact found via LinkedIn – Dana Osei replaced previous contact.",
    lastBumpDate: "2025-04-10",
    aiSummary: "Figma was a major gold sponsor in 2022 but went dark in 2023 and 2024. Internal restructuring likely caused the lapse. A new contact has been identified.",
    recruiterFeedback: "2022: design candidates were excellent. Swag was a huge hit.",
    resources: [
      { id: "r7", label: "LinkedIn message to Dana – Apr 2025", url: "#", summary: "Cold outreach via LinkedIn. Mentioned 2022 gold partnership. Dana viewed but no reply yet.", type: "email", date: "2025-04-10" },
      { id: "r8", label: "2022 Contract", url: "#", summary: "Gold tier. Design workshop + swag. $28K total.", type: "contract", date: "2022-11-15" },
    ],
  },
  {
    id: "s4", company: "OpenAI", domain: "openai.com",
    contact: { name: "Riley Chen", email: "riley.chen@openai.com", title: "Campus Partnerships" },
    currentDri: "Marcus Green", years: [],
    historyKeyword: "Interested in 2025", status: "Warm Intro",
    notes: "Riley reached out cold after seeing a tweet. Warm intro from Priya who knows Riley from a conference.",
    lastBumpDate: "2025-05-18",
    aiSummary: "OpenAI is a net-new potential sponsor with strong inbound interest. Specifically interested in sponsoring an AI-focused track and potentially providing API credits.",
    recruiterFeedback: "N/A – first-time sponsor candidate.",
    resources: [
      { id: "r9", label: "Warm intro email from Priya", url: "#", summary: "Priya introduced Marcus to Riley. Riley expressed strong interest in AI track sponsorship.", type: "email", date: "2025-05-18" },
    ],
  },
  {
    id: "s5", company: "Vercel", domain: "vercel.com",
    contact: { name: "Jamie Kowalski", email: "j.kowalski@vercel.com", title: "Developer Advocacy" },
    currentDri: "Alex Chen",
    years: [{ year: 2024, tier: "startup", addOns: [], dri: "Alex Chen", reps: ["Blake Ryan"] }],
    historyKeyword: "2025 Renewal – Upsell Bronze", status: "Verbal Yes",
    notes: "Jamie verbally confirmed bronze for 2025 on a call last week. Waiting on contract. Push for deployment credits as add-on.",
    lastBumpDate: "2025-05-15",
    aiSummary: "Vercel came in as startup-tier in 2024 and had a positive experience. They've given a verbal yes for bronze in 2025 and are open to deployment credits as an add-on prize.",
    recruiterFeedback: "Blake Ryan from Vercel was very engaged at the event.",
    resources: [
      { id: "r10", label: "Call notes – May 12", url: "#", summary: "Jamie confirmed verbal yes for bronze. Mentioned deployment credits as possible add-on.", type: "meeting", date: "2025-05-12" },
    ],
  },
  {
    id: "s6", company: "Jane Street", domain: "janestreet.com",
    contact: { name: "Felix Huang", email: "fhuang@janestreet.com", title: "University Recruiting" },
    currentDri: "Priya Singh",
    years: [
      { year: 2023, tier: "bronze", addOns: ["Recruiting Booth"], dri: "Marcus Green", reps: ["Anna Bright"] },
      { year: 2022, tier: "bronze", addOns: ["Recruiting Booth"], dri: "Marcus Green", reps: ["Anna Bright", "Tom Bell"] },
    ],
    historyKeyword: "Ghosted 2024 – Re-engage", status: "Ghosted",
    notes: "No response to 3 bumps in 2024. Felix still at company per LinkedIn.",
    lastBumpDate: "2024-09-01",
    aiSummary: "Jane Street sponsored for two consecutive years but went silent in 2024 despite three follow-up attempts. A fresh approach through their university recruiting team may be effective.",
    recruiterFeedback: "2023: extremely selective. Mostly focused on quant/CS candidates.",
    resources: [
      { id: "r11", label: "Bump email #3 – Sep 2024", url: "#", summary: "Third follow-up with no response. Delivered, not replied.", type: "email", date: "2024-09-01" },
    ],
  },
  {
    id: "s7", company: "Shopify", domain: "shopify.com",
    contact: { name: "Nina Castillo", email: "n.castillo@shopify.com", title: "Developer Education" },
    currentDri: "Sam Rivera",
    years: [
      { year: 2024, tier: "silver", addOns: ["Commerce API Workshop"], dri: "Sam Rivera", reps: ["Dev Patel", "Cora M."] },
      { year: 2023, tier: "silver", addOns: [], dri: "Sam Rivera", reps: ["Dev Patel"] },
      { year: 2022, tier: "startup", addOns: [], dri: "Alex Chen", reps: ["Dev Patel"] },
    ],
    historyKeyword: "3-Year Partner", status: "Confirmed Sponsor",
    notes: "Nina confirmed silver again for 2025 with the Commerce API workshop. Contract signed.",
    lastBumpDate: "2025-05-05",
    aiSummary: "Shopify is a multi-year silver sponsor and one of the most reliable partners. Contract is already signed for 2025.",
    recruiterFeedback: "High engagement. Shopify reps were some of the most prepared at the booth.",
    resources: [
      { id: "r12", label: "2025 Contract – signed", url: "#", summary: "Silver tier, $18K. Commerce API workshop included. Signed by both parties on May 3.", type: "contract", date: "2025-05-03" },
      { id: "r13", label: "#sponsors-shopify thread", url: "#", summary: "Logo assets delivered. Nina confirmed booth dimensions and setup time.", type: "slack", date: "2025-05-05" },
    ],
  },
  {
    id: "s8", company: "Palantir", domain: "palantir.com",
    contact: { name: "Quinn Adebayo", email: "q.adebayo@palantir.com", title: "University Programs" },
    currentDri: "Marcus Green",
    years: [
      { year: 2023, tier: "gold", addOns: ["Recruiting Booth", "Office Hours"], dri: "Priya Singh", reps: ["Sam T.", "Iris X."] },
    ],
    historyKeyword: "Interested 2025 – Budget TBD", status: "Contract Sent",
    notes: "Contract sent May 14. Quinn said legal review takes ~3 weeks. Follow up by June 5.",
    lastBumpDate: "2025-05-14",
    aiSummary: "Palantir was a gold sponsor in 2023 and skipped 2024 due to internal hiring freeze. A contract has been sent for gold tier with target confirmation in early June.",
    recruiterFeedback: "2023: very secretive about roles but attracted strong candidates. Office hours slot was oversubscribed.",
    resources: [
      { id: "r14", label: "Contract sent – May 14", url: "#", summary: "Gold tier contract sent to Quinn. $26K. Includes recruiting booth and 2 office hours slots.", type: "contract", date: "2025-05-14" },
      { id: "r15", label: "Email thread – Apr 2025", url: "#", summary: "Quinn confirmed interest after hiring freeze lifted. Requested gold package with office hours.", type: "email", date: "2025-04-28" },
    ],
  },
];

export const STATUS_ORDER: SponsorStatus[] = [
  "Confirmed Sponsor", "Verbal Yes", "Contract Sent", "Negotiating",
  "Discovery Call", "Contacted", "Warm Intro", "Prospect", "Rejected", "Ghosted",
];

export const ALL_DRIS = ["Alex Chen", "Priya Singh", "Marcus Green", "Sam Rivera"];

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
