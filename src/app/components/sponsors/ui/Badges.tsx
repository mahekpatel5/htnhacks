import { STATUS_STYLES, TIER_STYLES } from "../../../constants";
import { CONTACT_INDICATOR_TOOLTIPS, daysSince } from "../../../utils/sponsors";
import { ContactTooltip } from "./ContactTooltip";
import type { ContactAttentionState, Sponsor, SponsorStatus, Tier } from "../../../types";

const CONTACT_DOT_CLASSES: Record<ContactAttentionState, string> = {
  unread: "bg-blue-500",
  read_unanswered: "bg-yellow-200 ring-1 ring-yellow-300/80",
  overdue: "bg-red-500",
};

const CONTACT_TEXT_CLASSES: Record<ContactAttentionState, string> = {
  unread: "text-blue-600 font-medium",
  read_unanswered: "text-yellow-700 font-medium",
  overdue: "text-red-600 font-medium",
};

export function StatusBadge({ status }: { status: SponsorStatus }) {
  return (
    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap " + STATUS_STYLES[status]}>
      {status}
    </span>
  );
}

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize " + TIER_STYLES[tier]}>
      {tier}
    </span>
  );
}

export function contactAttentionTextClass(state: ContactAttentionState | null): string {
  if (!state) return "text-gray-500";
  return CONTACT_TEXT_CLASSES[state];
}

export function ContactIndicatorDot({ state }: { state: ContactAttentionState }) {
  return (
    <ContactTooltip label={CONTACT_INDICATOR_TOOLTIPS[state]}>
      <span className={"inline-block w-2 h-2 rounded-full mr-1.5 shrink-0 cursor-default " + CONTACT_DOT_CLASSES[state]} />
    </ContactTooltip>
  );
}

export function LastContactText({ sponsor, state }: { sponsor: Sponsor; state: ContactAttentionState | null }) {
  const text = daysSince(sponsor.lastBumpDate) + "d ago";
  const className = "text-xs cursor-default " + contactAttentionTextClass(state);

  if (!state) {
    return <span className={className}>{text}</span>;
  }

  return (
    <ContactTooltip label={CONTACT_INDICATOR_TOOLTIPS[state]}>
      <span className={className}>{text}</span>
    </ContactTooltip>
  );
}

const ATTENTION_PILL_CONFIG: Record<ContactAttentionState, { className: string; label: string }> = {
  unread: { className: "text-blue-600 bg-blue-50", label: "Unread email" },
  read_unanswered: { className: "text-yellow-800 bg-yellow-50", label: "Reply pending" },
  overdue: { className: "text-red-600 bg-red-50", label: "Overdue contact" },
};

export function ContactAttentionPill({ state, compact = false }: { state: ContactAttentionState; compact?: boolean }) {
  const config = ATTENTION_PILL_CONFIG[state];
  if (compact) {
    return (
      <span className={"inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap " + config.className}>
        <span className={"inline-block w-1.5 h-1.5 rounded-full shrink-0 " + CONTACT_DOT_CLASSES[state]} />
        {config.label}
      </span>
    );
  }
  return (
    <span className={"flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium " + config.className}>
      <span className={"inline-block w-1.5 h-1.5 rounded-full shrink-0 " + CONTACT_DOT_CLASSES[state]} />
      {config.label}
    </span>
  );
}
