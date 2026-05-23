import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Search, X, ChevronRight, ChevronDown, Mail, Slack, FileText, ExternalLink,
  Clock, AlertTriangle, CheckCircle, TrendingUp, Users, Building2, Filter,
  SortAsc, Send, Sparkles, PenLine, LayoutGrid, Inbox, Settings, LogOut,
  Star, MoreHorizontal, ArrowRight, Hash, Briefcase, GripVertical,
  List, LayoutGrid as GridIcon, Plus, Trash2, Edit3
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type SponsorStatus =
  | "Prospect" | "Warm Intro" | "Contacted" | "Discovery Call"
  | "Negotiating" | "Verbal Yes" | "Contract Sent" | "Confirmed Sponsor"
  | "Rejected" | "Ghosted";

type Tier = "startup" | "bronze" | "silver" | "gold";

interface YearRecord {
  year: number;
  tier: Tier;
  addOns: string[];
  dri: string;
  reps: string[];
}

interface LinkedResource {
  id: string;
  label: string;
  url: string;
  summary: string;
  type: "slack" | "email" | "meeting" | "contract";
  date: string;
}

interface Sponsor {
  id: string;
  company: string;
  domain: string;
  contact: { name: string; email: string; title: string };
  years: YearRecord[];
  historyKeyword: string;
  status: SponsorStatus;
  notes: string;
  lastBumpDate: string;
  resources: LinkedResource[];
  aiSummary: string;
  recruiterFeedback: string;
  currentDri: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const SPONSORS: Sponsor[] = [
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

const STATUS_ORDER: SponsorStatus[] = [
  "Confirmed Sponsor", "Verbal Yes", "Contract Sent", "Negotiating",
  "Discovery Call", "Contacted", "Warm Intro", "Prospect", "Rejected", "Ghosted"
];

const ALL_DRIS = ["Alex Chen", "Priya Singh", "Marcus Green", "Sam Rivera"];
const TIER_ORDER: Tier[] = ["gold", "silver", "bronze", "startup"];

// ─── Utilities ────────────────────────────────────────────────────────────────

function isOverdue(dateStr: string): boolean {
  return Date.now() - new Date(dateStr).getTime() > 14 * 24 * 60 * 60 * 1000;
}
function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (24 * 60 * 60 * 1000));
}
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
const PIPELINE_STATUSES: SponsorStatus[] = [
  "Prospect", "Warm Intro", "Contacted", "Discovery Call",
  "Negotiating", "Verbal Yes", "Contract Sent"
];
function isPipelineStatus(status: SponsorStatus): boolean {
  return PIPELINE_STATUSES.includes(status);
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<SponsorStatus, string> = {
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
const TIER_STYLES: Record<Tier, string> = {
  startup: "bg-slate-100 text-slate-600",
  bronze: "bg-orange-100 text-orange-700",
  silver: "bg-gray-200 text-gray-700",
  gold: "bg-yellow-100 text-yellow-700",
};
const RESOURCE_ICONS: Record<string, typeof Slack> = {
  slack: Slack, email: Mail, meeting: FileText, contract: Briefcase,
};
const RESOURCE_COLORS: Record<string, string> = {
  slack: "bg-purple-50 border-purple-100",
  email: "bg-blue-50 border-blue-100",
  meeting: "bg-emerald-50 border-emerald-100",
  contract: "bg-amber-50 border-amber-100",
};
const RESOURCE_ICON_COLORS: Record<string, string> = {
  slack: "text-purple-500", email: "text-blue-500",
  meeting: "text-emerald-500", contract: "text-amber-500",
};

// ─── Company Logo ─────────────────────────────────────────────────────────────

function CompanyLogo({ domain, company, size = 28 }: { domain: string; company: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size };

  if (failed) {
    return (
      <div
        style={style}
        className="rounded-lg bg-[#43afde]/15 flex items-center justify-center text-xs font-bold text-[#43afde] shrink-0"
      >
        {company[0]}
      </div>
    );
  }
  return (
    <img
      src={"https://logo.clearbit.com/" + domain}
      alt={company + " logo"}
      style={style}
      className="rounded-lg object-contain shrink-0 bg-white border border-gray-100 p-0.5"
      onError={() => setFailed(true)}
    />
  );
}

// ─── Small Components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SponsorStatus }) {
  return (
    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap " + STATUS_STYLES[status]}>
      {status}
    </span>
  );
}
function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize " + TIER_STYLES[tier]}>
      {tier}
    </span>
  );
}
function OverdueDot() {
  return <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5 shrink-0" title="Overdue – no bump in 2+ weeks" />;
}

// ─── Inline Cell Dropdown ─────────────────────────────────────────────────────

function CellDropdown<T extends string>({
  value, options, onSelect, renderOption, renderValue
}: {
  value: T;
  options: T[];
  onSelect: (v: T) => void;
  renderOption?: (v: T) => React.ReactNode;
  renderValue?: (v: T) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
    >
      <div className="flex items-center gap-1 cursor-pointer group">
        {renderValue ? renderValue(value) : <span className="text-xs text-gray-600">{value}</span>}
        <Edit3 size={10} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[160px] py-1 max-h-64 overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt}
              onClick={e => { e.stopPropagation(); onSelect(opt); setOpen(false); }}
              className={"w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50 " + (opt === value ? "bg-[#43afde]/5" : "")}
            >
              {renderOption ? renderOption(opt) : <span className="text-gray-700">{opt}</span>}
              {opt === value && <CheckCircle size={12} className="text-[#43afde] shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Spotlight Search ─────────────────────────────────────────────────────────

interface SearchResult {
  sponsorId: string; company: string; label: string; detail: string;
  type: "status" | "contact" | "note" | "resource";
}

function buildSearchIndex(sponsors: Sponsor[]): SearchResult[] {
  const results: SearchResult[] = [];
  for (const s of sponsors) {
    results.push({ sponsorId: s.id, company: s.company, label: s.company, detail: s.status, type: "status" });
    results.push({ sponsorId: s.id, company: s.company, label: s.contact.name, detail: s.contact.email, type: "contact" });
    if (s.notes) results.push({ sponsorId: s.id, company: s.company, label: "Note", detail: s.notes.slice(0, 80), type: "note" });
    for (const r of s.resources) {
      results.push({ sponsorId: s.id, company: s.company, label: r.label, detail: r.summary.slice(0, 80), type: "resource" });
    }
  }
  return results;
}

function SpotlightSearch({ sponsors, onSelect, onClose }: {
  sponsors: Sponsor[]; onSelect: (id: string) => void; onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildSearchIndex(sponsors), [sponsors]);
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.filter(r =>
      r.label.toLowerCase().includes(q) || r.detail.toLowerCase().includes(q) || r.company.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, index]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setCursor(0); }, [results]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === "Enter" && results[cursor]) { onSelect(results[cursor].sponsorId); onClose(); }
    if (e.key === "Escape") onClose();
  }

  const TYPE_ICON: Record<string, typeof Search> = { status: Building2, contact: Users, note: PenLine, resource: FileText };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} onKeyDown={handleKey}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search sponsors, contacts, notes, resources..."
            className="flex-1 text-base outline-none text-gray-800 placeholder:text-gray-400 bg-transparent"
          />
          <kbd className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">ESC</kbd>
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((r, i) => {
              const Icon = TYPE_ICON[r.type] || FileText;
              return (
                <button key={i} className={"w-full flex items-start gap-3 px-5 py-3 text-left transition-colors " + (i === cursor ? "bg-[#43afde]/10" : "hover:bg-gray-50")}
                  onClick={() => { onSelect(r.sponsorId); onClose(); }} onMouseEnter={() => setCursor(i)}>
                  <Icon size={15} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#43afde]">{r.company}</span>
                      <span className="text-sm text-gray-800 truncate">{r.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{r.detail}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 shrink-0 mt-1 ml-auto" />
                </button>
              );
            })}
          </div>
        )}
        {query && results.length === 0 && <div className="px-5 py-10 text-center text-gray-400 text-sm">No results for "{query}"</div>}
        {!query && <div className="px-5 py-6 text-center text-gray-400 text-sm">Start typing to search across all sponsors, contacts, and conversations</div>}
      </div>
    </div>
  );
}

// ─── Activity Feed (dual view) ────────────────────────────────────────────────

const FILE_TYPE_PREVIEW: Record<string, { bg: string; icon: typeof FileText; label: string }> = {
  contract: { bg: "bg-amber-50", icon: Briefcase, label: "Contract" },
  meeting: { bg: "bg-emerald-50", icon: FileText, label: "Meeting Notes" },
  email: { bg: "bg-blue-50", icon: Mail, label: "Email Thread" },
  slack: { bg: "bg-purple-50", icon: Slack, label: "Slack Thread" },
};

function ActivityFeed({ resources }: { resources: LinkedResource[] }) {
  const [view, setView] = useState<"timeline" | "files">("timeline");
  const sorted = [...resources].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* View toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {resources.length} item{resources.length !== 1 ? "s" : ""}
        </h3>
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => setView("timeline")}
            className={"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors " + (view === "timeline" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <List size={12} /> Timeline
          </button>
          <button
            onClick={() => setView("files")}
            className={"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors " + (view === "files" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <GridIcon size={12} /> Files
          </button>
        </div>
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <FileText size={28} className="mx-auto mb-2 opacity-20" />
          <p className="text-sm">No activity yet.</p>
        </div>
      )}

      {/* Timeline view */}
      {view === "timeline" && resources.length > 0 && (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" />
          <div className="space-y-1">
            {sorted.map(r => {
              const Icon = RESOURCE_ICONS[r.type] || FileText;
              const iconColor = RESOURCE_ICON_COLORS[r.type] || "text-gray-400";
              return (
                <div key={r.id} className="relative flex gap-4 pl-10 pb-5">
                  <div className={"absolute left-2 top-1 w-5 h-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center"}>
                    <Icon size={9} className={iconColor} />
                  </div>
                  <div className={"flex-1 rounded-xl p-3 border " + (RESOURCE_COLORS[r.type] || "bg-gray-50 border-gray-100")}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <a href={r.url} className="text-sm font-medium text-[#43afde] hover:underline flex items-center gap-1">
                        {r.label}<ExternalLink size={11} />
                      </a>
                      <span className="text-xs text-gray-400 shrink-0">{formatDate(r.date)}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Files grid view */}
      {view === "files" && resources.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {sorted.map(r => {
            const meta = FILE_TYPE_PREVIEW[r.type] || FILE_TYPE_PREVIEW.meeting;
            const Icon = meta.icon;
            const iconColor = RESOURCE_ICON_COLORS[r.type] || "text-gray-400";
            return (
              <a key={r.id} href={r.url} className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-[#43afde]/40 hover:shadow-md transition-all">
                {/* Thumbnail area */}
                <div className={"h-24 " + meta.bg + " flex flex-col items-center justify-center gap-2 relative"}>
                  <div className={"w-10 h-10 rounded-xl bg-white/80 shadow-sm flex items-center justify-center"}>
                    <Icon size={20} className={iconColor} />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{meta.label}</span>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-lg p-1 shadow-sm">
                      <ExternalLink size={11} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                {/* File info */}
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-1 mb-1">{r.label}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{r.summary}</p>
                  <p className="text-xs text-gray-300 mt-1.5">{formatDate(r.date)}</p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Company Detail Panel (resizable) ─────────────────────────────────────────

function CompanyDetailPanel({ sponsor, onClose, onUpdate }: {
  sponsor: Sponsor; onClose: () => void; onUpdate: (updated: Sponsor) => void;
}) {
  const [activeSection, setActiveSection] = useState<"overview" | "history" | "activity" | "email">("overview");
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(sponsor.notes);
  const [panelWidth, setPanelWidth] = useState(640);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const overdue = isPipelineStatus(sponsor.status) && isOverdue(sponsor.lastBumpDate);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = panelWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [panelWidth]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current) return;
      const delta = startX.current - e.clientX;
      const newW = Math.max(420, Math.min(900, startW.current + delta));
      setPanelWidth(newW);
    }
    function onUp() {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, []);

  function setStatus(s: SponsorStatus) { onUpdate({ ...sponsor, status: s }); setEditingStatus(false); }
  function saveNotes() { onUpdate({ ...sponsor, notes }); setEditingNotes(false); }

  const sections = [
    { key: "overview", label: "Overview" },
    { key: "history", label: "History" },
    { key: "activity", label: "Activity" },
    { key: "email", label: "Draft Email" },
  ] as const;

  return (
    <div className="fixed inset-0 z-40 flex items-stretch justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex items-stretch" style={{ width: panelWidth }}>
        {/* Resize handle */}
        <div
          onMouseDown={onMouseDown}
          className="absolute left-0 top-0 bottom-0 w-4 flex items-center justify-center cursor-col-resize z-10 group"
        >
          <div className="w-1 h-16 rounded-full bg-gray-200 group-hover:bg-[#43afde] transition-colors" />
          <GripVertical size={14} className="absolute text-gray-300 group-hover:text-[#43afde] transition-colors" />
        </div>

        <div className="flex-1 bg-white shadow-2xl flex flex-col overflow-hidden ml-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <div className="flex items-start gap-3 min-w-0">
              <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={40} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl font-bold text-[#1f2937]">{sponsor.company}</h2>
                  {overdue && (
                    <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">
                      <AlertTriangle size={11} />Overdue bump
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={sponsor.status} />
                  <span className="text-xs text-gray-400">DRI: <strong className="text-gray-600">{sponsor.currentDri}</strong></span>
                  <span className="text-xs text-gray-400">Last bump: <strong className="text-gray-600">{formatDate(sponsor.lastBumpDate)}</strong></span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors shrink-0">
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-6 shrink-0">
            {sections.map(s => (
              <button key={s.key} onClick={() => setActiveSection(s.key)}
                className={"px-3 py-3 text-sm font-medium border-b-2 transition-colors " + (activeSection === s.key ? "border-[#43afde] text-[#43afde]" : "border-transparent text-gray-500 hover:text-gray-700")}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === "overview" && (
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-br from-[#43afde]/10 to-purple-50 rounded-xl p-4 border border-[#43afde]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[#43afde]" />
                    <span className="text-xs font-semibold text-[#43afde] uppercase tracking-wide">AI Relationship Summary</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{sponsor.aiSummary}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Point of Contact</h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-[#43afde]/20 flex items-center justify-center text-sm font-bold text-[#43afde]">
                      {sponsor.contact.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{sponsor.contact.name}</div>
                      <div className="text-xs text-gray-500">{sponsor.contact.title}</div>
                      <a href={"mailto:" + sponsor.contact.email} className="text-xs text-[#43afde] hover:underline">{sponsor.contact.email}</a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Pipeline Status</h3>
                  {!editingStatus ? (
                    <div className="flex items-center gap-2">
                      <StatusBadge status={sponsor.status} />
                      <button onClick={() => setEditingStatus(true)} className="text-xs text-gray-400 hover:text-gray-600 underline">Change</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {STATUS_ORDER.map(s => (
                        <button key={s} onClick={() => setStatus(s)}
                          className={"flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all " + (sponsor.status === s ? "border-[#43afde] bg-[#43afde]/10" : "border-gray-200 hover:border-gray-300")}>
                          <span className="text-gray-700 text-xs">{s}</span>
                          {sponsor.status === s && <CheckCircle size={12} className="text-[#43afde]" />}
                        </button>
                      ))}
                      <button onClick={() => setEditingStatus(false)} className="col-span-2 text-xs text-gray-400 text-center py-1 hover:text-gray-600">Cancel</button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Notes</h3>
                    {!editingNotes && <button onClick={() => setEditingNotes(true)} className="text-xs text-[#43afde] hover:underline">Edit</button>}
                  </div>
                  {editingNotes ? (
                    <div className="space-y-2">
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                        className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 resize-none outline-none focus:border-[#43afde]" />
                      <div className="flex gap-2">
                        <button onClick={saveNotes} className="px-3 py-1.5 bg-[#43afde] text-white text-xs rounded-lg font-medium hover:bg-[#2395c6]">Save</button>
                        <button onClick={() => { setNotes(sponsor.notes); setEditingNotes(false); }} className="px-3 py-1.5 text-gray-500 text-xs hover:text-gray-700">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">{notes || "No notes yet."}</p>
                  )}
                </div>

                {sponsor.recruiterFeedback && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Recruiter Feedback</h3>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">{sponsor.recruiterFeedback}</p>
                  </div>
                )}
              </div>
            )}

            {activeSection === "history" && (
              <div className="p-6 space-y-4">
                {sponsor.years.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Star size={28} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No prior sponsorship years on record.</p>
                  </div>
                ) : [...sponsor.years].sort((a, b) => b.year - a.year).map(yr => (
                  <div key={yr.year} className="border border-gray-100 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">{yr.year}</span>
                      <TierBadge tier={yr.tier} />
                    </div>
                    {yr.addOns.length > 0 && (
                      <div><span className="text-xs text-gray-400">Add-ons: </span><span className="text-xs text-gray-700">{yr.addOns.join(", ")}</span></div>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>DRI: <strong className="text-gray-700">{yr.dri}</strong></span>
                      <span>Reps: <strong className="text-gray-700">{yr.reps.join(", ")}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "activity" && (
              <ActivityFeed resources={sponsor.resources} />
            )}

            {activeSection === "email" && (
              <div className="p-6">
                <EmailDrafterSection sponsor={sponsor} compact />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Email Drafter ────────────────────────────────────────────────────────────

function EmailDrafterSection({ sponsor, compact = false }: { sponsor: Sponsor | null; compact?: boolean }) {
  const [emailType, setEmailType] = useState<"initial" | "bump" | "renewal" | "followup">("bump");
  const [customPrompt, setCustomPrompt] = useState("");
  const [draftText, setDraftText] = useState("");
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const EMAIL_TEMPLATES: Record<string, (s: Sponsor) => string> = {
    initial: (s) => "Subject: HackNorth 2025 – Sponsorship Opportunity for " + s.company + "\n\n" +
      "Hi " + s.contact.name.split(" ")[0] + ",\n\n" +
      "Hope this finds you well! I'm " + s.currentDri + ", a sponsorship coordinator at HackNorth – our annual hackathon bringing together 800+ students from across North America.\n\n" +
      "I'd love to explore a partnership with " + s.company + " for HackNorth 2025. We have several tiers available (Startup, Bronze, Silver, Gold) with options for recruiting booths, workshops, and API challenges.\n\n" +
      "Would you have 20 minutes for a quick call this week or next?\n\n" +
      "Best,\n" + s.currentDri + "\nHackNorth Sponsorship Team",

    bump: (s) => {
      const bumps = s.resources.filter(r => r.type === "email" && r.label.includes("bump")).length;
      const ordinal = s.years.length === 1 ? "nd" : "th";
      const yearClause = s.years.length > 0 ? (s.years.length + 1) + ordinal + " year" : "first year";
      const experienceLine = s.years.length > 0 ? " – we had a great experience in " + s.years[s.years.length - 1].year : "";
      return "Subject: Re: HackNorth 2025 Sponsorship – Following Up\n\n" +
        "Hi " + s.contact.name.split(" ")[0] + ",\n\n" +
        "Just circling back on my previous note about HackNorth 2025 sponsorship. This would be our " + yearClause + " partnering together" + experienceLine + ".\n\n" +
        "We're finalizing our sponsor lineup and would love to include " + s.company + ". Happy to send over our full sponsorship package if helpful.\n\n" +
        "Do you have 15 minutes this week?\n\n" +
        "Best,\n" + s.currentDri + "\nHackNorth Sponsorship Team\n\n" +
        "---\nThis is follow-up #" + (bumps + 1) + ". Last contact: " + formatDate(s.lastBumpDate) + ".";
    },

    renewal: (s) => {
      const lastYear = [...s.years].sort((a, b) => b.year - a.year)[0];
      const tierCap = lastYear?.tier ? lastYear.tier.charAt(0).toUpperCase() + lastYear.tier.slice(1) : "Sponsorship";
      const tierLine = lastYear?.tier === "gold" ? "maintaining your gold tier" : "an upgrade to the next tier";
      const addOnLine = lastYear?.addOns.length ? "\n\nWe can include the same add-ons as last year (" + lastYear.addOns.join(", ") + ") plus some new options." : "";
      const historyLine = lastYear ? " as a " + lastYear.tier + " sponsor" : "";
      return "Subject: HackNorth 2025 Renewal – " + tierCap + " Tier\n\n" +
        "Hi " + s.contact.name.split(" ")[0] + ",\n\n" +
        "Thank you again for " + s.company + "'s support at HackNorth " + (lastYear?.year ?? "last year") + historyLine + ". It was fantastic having you there.\n\n" +
        "We're excited to invite " + s.company + " back for HackNorth 2025. Based on our previous partnership, I think " + tierLine + " would be a great fit." + addOnLine + "\n\n" +
        "Would you be open to a quick renewal call?\n\n" +
        "Best,\n" + s.currentDri + "\nHackNorth Sponsorship Team";
    },

    followup: (s) => {
      const notesBlock = s.notes ? "Key points from our conversation:\n" + s.notes + "\n\n" : "";
      const reconnect = s.status === "Negotiating" ? "once you've had a chance to review the contract" : "next week to discuss next steps";
      return "Subject: HackNorth 2025 – Post-Meeting Follow-Up\n\n" +
        "Hi " + s.contact.name.split(" ")[0] + ",\n\n" +
        "Great speaking with you! As discussed, I'm sending over the details we covered.\n\n" +
        notesBlock +
        "Next steps:\n• I'll send over the full sponsorship package by end of week\n• Please loop in anyone else on your team who should be part of the decision\n• Let's plan to reconnect " + reconnect + "\n\n" +
        "Thanks again – excited about the potential partnership!\n\n" +
        "Best,\n" + s.currentDri + "\nHackNorth Sponsorship Team";
    },
  };

  function generateDraft() {
    if (!sponsor) return;
    let base = EMAIL_TEMPLATES[emailType](sponsor);
    if (customPrompt.trim()) {
      base += "\n\n---\n[Custom context: " + customPrompt.trim() + "]";
    }
    setDraftText(base);
    setGenerated(true);
    setSent(false);
  }

  function handleSend() {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  }

  return (
    <div className="space-y-4">
      {sponsor && (
        <div className="bg-gradient-to-br from-[#43afde]/10 to-purple-50 rounded-xl p-3 border border-[#43afde]/20">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={12} className="text-[#43afde]" />
            <span className="text-xs font-semibold text-[#43afde]">Context</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-0.5 leading-relaxed">
            <li>• Status: <strong>{sponsor.status}</strong></li>
            <li>• Last bump: <strong>{formatDate(sponsor.lastBumpDate)}</strong> ({daysSince(sponsor.lastBumpDate)} days ago)</li>
            {sponsor.years.length > 0 && <li>• Sponsored {sponsor.years.length}x – last at <strong>{[...sponsor.years].sort((a, b) => b.year - a.year)[0].tier}</strong> tier</li>}
            <li>• Contact: <strong>{sponsor.contact.name}</strong> ({sponsor.contact.email})</li>
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Email Type</h3>
        <div className="grid grid-cols-2 gap-2">
          {(["initial", "bump", "renewal", "followup"] as const).map(t => (
            <button key={t} onClick={() => { setEmailType(t); setGenerated(false); }}
              className={"px-3 py-2 rounded-lg text-sm border transition-all " + (emailType === t ? "border-[#43afde] bg-[#43afde]/10 text-[#43afde] font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300")}>
              {t === "followup" ? "Follow-up" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Additional Instructions</h3>
        <textarea
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          rows={3}
          placeholder="e.g. Mention the new AI track. Keep it under 150 words. Reference our 2023 partnership metrics."
          className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 resize-none outline-none focus:border-[#43afde] placeholder:text-gray-300 leading-relaxed"
        />
      </div>

      <button onClick={generateDraft} disabled={!sponsor}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#43afde] text-white rounded-xl text-sm font-semibold hover:bg-[#2395c6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
        <Sparkles size={15} />
        Generate Draft with AI
      </button>

      {generated && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Draft</h3>
          <textarea value={draftText} onChange={e => setDraftText(e.target.value)} rows={14}
            className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4 resize-none outline-none focus:border-[#43afde] font-mono leading-relaxed" />
          {sent ? (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-4 py-3 rounded-xl">
              <CheckCircle size={16} />Email sent to {sponsor?.contact.email}
            </div>
          ) : (
            <button onClick={handleSend} disabled={sending}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1f2937] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors">
              {sending ? <><Clock size={15} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Email</>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sponsors Table ───────────────────────────────────────────────────────────

type SortKey = "company" | "status" | "lastBumpDate" | "currentDri" | "years";

function SponsorsTable({ sponsors, onSelectSponsor, onUpdate }: {
  sponsors: Sponsor[];
  onSelectSponsor: (id: string) => void;
  onUpdate: (updated: Sponsor) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<SponsorStatus | "">("");
  const [filterDri, setFilterDri] = useState("");

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  }

  const filtered = useMemo(() => {
    let arr = [...sponsors];
    if (filterStatus) arr = arr.filter(s => s.status === filterStatus);
    if (filterDri) arr = arr.filter(s => s.currentDri === filterDri);
    arr.sort((a, b) => {
      let av: string | number = "", bv: string | number = "";
      if (sortKey === "company") { av = a.company; bv = b.company; }
      else if (sortKey === "status") { av = STATUS_ORDER.indexOf(a.status); bv = STATUS_ORDER.indexOf(b.status); }
      else if (sortKey === "lastBumpDate") { av = new Date(a.lastBumpDate).getTime(); bv = new Date(b.lastBumpDate).getTime(); }
      else if (sortKey === "currentDri") { av = a.currentDri; bv = b.currentDri; }
      else if (sortKey === "years") { av = a.years.length; bv = b.years.length; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sponsors, filterStatus, filterDri, sortKey, sortDir]);

  function SortHeader({ label, col }: { label: string; col: SortKey }) {
    return (
      <button onClick={() => toggleSort(col)} className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-800 transition-colors">
        {label}
        {sortKey === col ? <ChevronDown size={12} className={sortDir === "desc" ? "rotate-180" : ""} /> : <SortAsc size={12} className="opacity-30" />}
      </button>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-100 bg-white shrink-0">
        <Filter size={14} className="text-gray-400" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as SponsorStatus | "")}
          className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600 outline-none focus:border-[#43afde]">
          <option value="">All Statuses</option>
          {STATUS_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterDri} onChange={e => setFilterDri(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600 outline-none focus:border-[#43afde]">
          <option value="">All DRIs</option>
          {ALL_DRIS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {(filterStatus || filterDri) && (
          <button onClick={() => { setFilterStatus(""); setFilterDri(""); }} className="text-xs text-red-500 hover:text-red-700">Clear</button>
        )}
        <span className="ml-auto text-xs text-gray-400">{filtered.length} companies</span>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm min-w-[960px]">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-3 w-6" />
              <th className="text-left px-4 py-3"><SortHeader label="Company" col="company" /></th>
              <th className="text-left px-4 py-3"><SortHeader label="Status" col="status" /></th>
              <th className="text-left px-4 py-3"><SortHeader label="DRI" col="currentDri" /></th>
              <th className="text-left px-4 py-3"><SortHeader label="Years" col="years" /></th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">Best Tier</th>
              <th className="text-left px-4 py-3 hidden xl:table-cell">Contact</th>
              <th className="text-left px-4 py-3"><SortHeader label="Last Bump" col="lastBumpDate" /></th>
              <th className="text-left px-4 py-3 hidden lg:table-cell">History</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const overdue = isPipelineStatus(s.status) && isOverdue(s.lastBumpDate);
              const bestTier = TIER_ORDER.find(t => s.years.some(y => y.tier === t));
              const mostRecentYear = [...s.years].sort((a, b) => b.year - a.year)[0];
              const yearsSorted = [...s.years].sort((a, b) => b.year - a.year);
              return (
                <tr key={s.id} onClick={() => onSelectSponsor(s.id)}
                  className={"border-b border-gray-100 cursor-pointer transition-colors " + (overdue ? "bg-red-50 hover:bg-red-100/60" : "hover:bg-gray-50")}>
                  <td className="px-4 py-3">{overdue && <OverdueDot />}</td>

                  {/* Company w/ logo */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo domain={s.domain} company={s.company} size={28} />
                      <span className="font-semibold text-gray-800">{s.company}</span>
                    </div>
                  </td>

                  {/* Status – inline editable */}
                  <td className="px-4 py-3">
                    <CellDropdown<SponsorStatus>
                      value={s.status}
                      options={STATUS_ORDER}
                      onSelect={v => onUpdate({ ...s, status: v })}
                      renderValue={v => <StatusBadge status={v} />}
                      renderOption={v => <StatusBadge status={v} />}
                    />
                  </td>

                  {/* DRI – inline editable */}
                  <td className="px-4 py-3">
                    <CellDropdown<string>
                      value={s.currentDri}
                      options={ALL_DRIS}
                      onSelect={v => onUpdate({ ...s, currentDri: v })}
                      renderValue={v => <span className="text-xs text-gray-700 font-medium">{v}</span>}
                    />
                  </td>

                  {/* Years w/ tier inline edit on most recent */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap items-center" onClick={e => e.stopPropagation()}>
                      {yearsSorted.slice(0, 3).map((y, i) => (
                        i === 0 && mostRecentYear ? (
                          <CellDropdown<Tier>
                            key={y.year}
                            value={y.tier}
                            options={TIER_ORDER}
                            onSelect={tier => {
                              const newYears = s.years.map(yr => yr.year === y.year ? { ...yr, tier } : yr);
                              onUpdate({ ...s, years: newYears });
                            }}
                            renderValue={v => (
                              <span className="flex items-center gap-1">
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{y.year}</span>
                                <TierBadge tier={v} />
                              </span>
                            )}
                            renderOption={v => <TierBadge tier={v} />}
                          />
                        ) : (
                          <span key={y.year} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{y.year}</span>
                        )
                      ))}
                      {yearsSorted.length === 0 && <span className="text-xs text-gray-400">New</span>}
                    </div>
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell">
                    {bestTier ? <TierBadge tier={bestTier} /> : <span className="text-xs text-gray-400">—</span>}
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <div className="text-xs text-gray-600">{s.contact.name}</div>
                    <div className="text-xs text-gray-400">{s.contact.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {overdue && <AlertTriangle size={12} className="text-red-500" />}
                      <span className={"text-xs " + (overdue ? "text-red-600 font-medium" : "text-gray-500")}>
                        {daysSince(s.lastBumpDate)}d ago
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-gray-500 italic">{s.historyKeyword}</span>
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight size={16} className="text-gray-300" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Email Drafter Full Tab ───────────────────────────────────────────────────

function EmailDrafterTab({ sponsors }: { sponsors: Sponsor[] }) {
  const [selectedId, setSelectedId] = useState<string>(sponsors[0]?.id ?? "");
  const selectedSponsor = sponsors.find(s => s.id === selectedId) ?? null;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-60 border-r border-gray-100 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Select Sponsor</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {sponsors.map(s => {
            const overdue = isPipelineStatus(s.status) && isOverdue(s.lastBumpDate);
            return (
              <button key={s.id} onClick={() => setSelectedId(s.id)}
                className={"w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors " + (selectedId === s.id ? "bg-[#43afde]/10 border-r-2 border-[#43afde]" : "hover:bg-gray-50")}>
                <CompanyLogo domain={s.domain} company={s.company} size={24} />
                {overdue && <OverdueDot />}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{s.company}</div>
                  <div className="mt-0.5"><StatusBadge status={s.status} /></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-[#1f2937] mb-1">
          {selectedSponsor ? "Draft Email to " + selectedSponsor.company : "Email Drafter"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">AI-assisted outreach with full sponsorship context</p>
        <EmailDrafterSection sponsor={selectedSponsor} />
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "quests", label: "Quests", icon: LayoutGrid },
  { id: "sponsors", label: "Sponsors", icon: Building2 },
  { id: "store", label: "Store", icon: Inbox },
  { id: "hackers", label: "Hackers", icon: Users },
];

function Sidebar({ activeNav, onNav }: { activeNav: string; onNav: (id: string) => void }) {
  return (
    <div className="w-[220px] shrink-0 bg-[#f3f4f6] border-r border-gray-200 flex flex-col h-full">
      <div className="px-4 pt-5 pb-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Goose Games</p>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = activeNav === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={"w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors " + (active ? "bg-[#43afde] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-800")}>
              <Icon size={16} />{item.label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-4 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200/70 transition-colors">
          <Settings size={15} />Settings
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200/70 transition-colors">
          <LogOut size={15} />Sign out
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1 border-t border-gray-200">
          <div className="w-7 h-7 rounded-full bg-[#43afde] flex items-center justify-center text-white text-xs font-bold">J</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">Jessica Zhang</p>
            <p className="text-[10px] text-gray-400">Organizer</p>
          </div>
          <MoreHorizontal size={14} className="text-gray-400 ml-auto" />
        </div>
      </div>
    </div>
  );
}

// ─── Sponsors View ────────────────────────────────────────────────────────────

function SponsorsView() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(SPONSORS);
  const [tab, setTab] = useState<"pipeline" | "email">("pipeline");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const selectedSponsor = sponsors.find(s => s.id === selectedId) ?? null;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleUpdate(updated: Sponsor) {
    setSponsors(prev => prev.map(s => s.id === updated.id ? updated : s));
  }

  function handleSelectFromSearch(id: string) {
    setSelectedId(id);
    setTab("pipeline");
  }

  const overdueCount = sponsors.filter(s => isPipelineStatus(s.status) && isOverdue(s.lastBumpDate)).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#f3f4f6] border-b border-gray-200 px-8 pt-6 pb-0 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[26px] font-extrabold text-[#374151] leading-tight tracking-tight">Sponsor Pipeline</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              HackNorth 2025 · {sponsors.filter(s => s.status === "Confirmed Sponsor").length} confirmed · {sponsors.filter(s => isPipelineStatus(s.status)).length} in pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            {overdueCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                <AlertTriangle size={13} />{overdueCount} overdue bump{overdueCount > 1 ? "s" : ""}
              </div>
            )}
            <button onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg text-sm hover:border-gray-300 hover:text-gray-700 transition-colors shadow-sm">
              <Search size={14} /><span>Search</span>
              <kbd className="ml-1 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          {[{ key: "pipeline", label: "Pipeline", icon: TrendingUp }, { key: "email", label: "Email Drafter", icon: Mail }].map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setTab(t.key as "pipeline" | "email")}
                className={"flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors " + (tab === t.key ? "border-[#43afde] text-[#43afde]" : "border-transparent text-gray-500 hover:text-gray-700")}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {tab === "pipeline" && <SponsorsTable sponsors={sponsors} onSelectSponsor={setSelectedId} onUpdate={handleUpdate} />}
        {tab === "email" && <EmailDrafterTab sponsors={sponsors} />}
      </div>

      {selectedSponsor && (
        <CompanyDetailPanel sponsor={selectedSponsor} onClose={() => setSelectedId(null)} onUpdate={handleUpdate} />
      )}
      {searchOpen && (
        <SpotlightSearch sponsors={sponsors} onSelect={handleSelectFromSearch} onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("sponsors");
  return (
    <div className="flex h-screen bg-white font-[Plus_Jakarta_Sans,sans-serif]">
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />
      <main className="flex-1 overflow-hidden">
        {activeNav === "sponsors" ? (
          <SponsorsView />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Hash size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Select Sponsors to view the dashboard</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
