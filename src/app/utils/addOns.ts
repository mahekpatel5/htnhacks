import { ADD_ON_OPTIONS } from "../constants";

export type AddOnOption = (typeof ADD_ON_OPTIONS)[number];

const ADD_ON_ALIASES: Record<string, AddOnOption> = {
  "lightning round": "Lightning challenge",
  "lightning challenge": "Lightning challenge",
  "sponsor an activity": "Sponsor an activity",
  "sponsor a snack": "Sponsor a snack",
  "sponsor a meetup": "Sponsor a meetup",
};

export function normalizeAddOn(value: string): AddOnOption | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const alias = ADD_ON_ALIASES[trimmed.toLowerCase()];
  if (alias) return alias;
  const direct = ADD_ON_OPTIONS.find(o => o.toLowerCase() === trimmed.toLowerCase());
  return direct ?? null;
}

export function normalizeAddOns(addOns: string[]): AddOnOption[] {
  const result: AddOnOption[] = [];
  for (const raw of addOns) {
    const canonical = normalizeAddOn(raw);
    if (canonical && !result.includes(canonical)) result.push(canonical);
  }
  return result;
}
