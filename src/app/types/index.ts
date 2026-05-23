export type SponsorStatus =
  | "Prospect" | "Warm Intro" | "Contacted" | "Discovery Call"
  | "Negotiating" | "Verbal Yes" | "Contract Sent" | "Confirmed Sponsor"
  | "Rejected" | "Ghosted";

export type Tier = "startup" | "bronze" | "silver" | "gold";

export interface YearRecord {
  year: number;
  tier: Tier;
  addOns: string[];
  dri: string;
  reps: string[];
}

export interface LinkedResource {
  id: string;
  label: string;
  url: string;
  summary: string;
  type: "slack" | "email" | "meeting" | "contract";
  date: string;
}

export interface Contact {
  name: string;
  email: string;
  title: string;
}

export type InboundEmailStatus = "unread" | "read_unanswered";

export type ContactAttentionState = "unread" | "read_unanswered" | "overdue";

export type DetailPanelSection = "overview" | "history" | "activity" | "email";

export interface Sponsor {
  id: string;
  company: string;
  domain: string;
  contacts: Contact[];
  years: YearRecord[];
  historyKeyword: string;
  status: SponsorStatus;
  notes: string;
  lastBumpDate: string;
  inboundEmailStatus?: InboundEmailStatus;
  resources: LinkedResource[];
  aiSummary: string;
  recruiterFeedback: string;
  currentDri: string;
}

export interface SearchResult {
  sponsorId: string;
  company: string;
  label: string;
  detail: string;
  type: "status" | "contact" | "note" | "resource";
}

export type SortKey = "company" | "status" | "lastBumpDate" | "currentDri" | "years";
