import type { SponsorStatus } from "../types";

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
