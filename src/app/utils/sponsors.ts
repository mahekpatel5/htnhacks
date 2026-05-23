import type { ContactAttentionState, Sponsor, SponsorStatus } from "../types";

const PIPELINE_STATUSES: SponsorStatus[] = [
  "Prospect", "Warm Intro", "Contacted", "Discovery Call",
  "Negotiating", "Verbal Yes", "Contract Sent",
];

export function isOverdue(dateStr: string): boolean {
  return Date.now() - new Date(dateStr).getTime() > 14 * 24 * 60 * 60 * 1000;
}

export function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (24 * 60 * 60 * 1000));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function isPipelineStatus(status: SponsorStatus): boolean {
  return PIPELINE_STATUSES.includes(status);
}

export const CONTACT_INDICATOR_TOOLTIPS: Record<ContactAttentionState, string> = {
  unread: "New unread email from sponsor",
  read_unanswered: "Email read — reply pending",
  overdue: "Overdue — no contact in 2+ weeks",
};

export function getContactAttentionState(sponsor: Sponsor): ContactAttentionState | null {
  if (sponsor.inboundEmailStatus === "unread") return "unread";
  if (sponsor.inboundEmailStatus === "read_unanswered") return "read_unanswered";
  if (isPipelineStatus(sponsor.status) && isOverdue(sponsor.lastBumpDate)) return "overdue";
  return null;
}

export function sponsorsWithAttentionState(sponsors: Sponsor[], state: ContactAttentionState): Sponsor[] {
  return sponsors.filter(s => getContactAttentionState(s) === state);
}

export function countByAttentionState(sponsors: Sponsor[], state: ContactAttentionState): number {
  return sponsorsWithAttentionState(sponsors, state).length;
}
