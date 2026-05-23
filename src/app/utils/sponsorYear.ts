import { SPONSORSHIP_YEAR } from "../constants";
import type { Sponsor, Tier, YearRecord } from "../types";

export function getSponsorshipYearRecord(sponsor: Sponsor): YearRecord | undefined {
  return sponsor.years.find(y => y.year === SPONSORSHIP_YEAR);
}

export function updateSponsorshipYear(
  sponsor: Sponsor,
  patch: Partial<Pick<YearRecord, "tier" | "addOns" | "dri" | "reps">>,
): Sponsor {
  const existing = getSponsorshipYearRecord(sponsor);
  if (existing) {
    return {
      ...sponsor,
      years: sponsor.years.map(y =>
        y.year === SPONSORSHIP_YEAR ? { ...y, ...patch } : y,
      ),
    };
  }
  const newRecord: YearRecord = {
    year: SPONSORSHIP_YEAR,
    tier: (patch.tier ?? "startup") as Tier,
    addOns: patch.addOns ?? [],
    dri: patch.dri ?? sponsor.currentDri,
    reps: patch.reps ?? [],
  };
  return { ...sponsor, years: [...sponsor.years, newRecord] };
}
