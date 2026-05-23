import { STATUS_STYLES, TIER_STYLES } from "../../../constants";
import type { SponsorStatus, Tier } from "../../../types";

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

export function OverdueDot() {
  return <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5 shrink-0" title="Overdue – no bump in 2+ weeks" />;
}
