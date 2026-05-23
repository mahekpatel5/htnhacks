import React, { useMemo, useState } from "react";
import { CompanyLogo } from "./ui/CompanyLogo";
import { isCurrentUserDri } from "../../constants";
import type { Sponsor } from "../../types";

function formatMoney(n: number) {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return "$" + (Number.isInteger(m) ? m.toString() : m.toFixed(1)) + "M";
  }
  if (n >= 1_000) return "$" + Math.round(n / 1_000) + "K";
  return "$" + n;
}

function LineChart({ actuals, target, labels }: { actuals: number[]; target: number[]; labels: string[] }) {
  const all = [...actuals, ...target];
  const max = Math.max(...all, 1);
  const w = 720;
  const h = 180;
  const pad = 48;
  const xFor = (index: number) => pad + (index * (w - pad * 2)) / Math.max(1, labels.length - 1);
  const yFor = (value: number) => h - pad - (value / max) * (h - pad * 2);
  const points = actuals.map((value, index) => `${xFor(index)},${yFor(value)}`).join(" ");
  const targetPoints = target.map((value, index) => `${xFor(index)},${yFor(value)}`).join(" ");
  const maxTick = Math.ceil(max / 100_000) * 100_000;
  const yTicks = [0, maxTick * 0.25, maxTick * 0.5, maxTick * 0.75, maxTick];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[180px] rounded-lg bg-white p-2">
      {yTicks.map((tick, index) => {
        const y = yFor(tick);
        return (
          <g key={index}>
            <line x1={pad} x2={w - pad} y1={y} y2={y} stroke="#e6e6e6" strokeWidth={1} />
            <text x={pad - 8} y={y + 4} fontSize={10} textAnchor="end" fill="#374151">{formatMoney(tick)}</text>
          </g>
        );
      })}
      <line x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} stroke="#9ca3af" strokeWidth={1} />
      {labels.map((label, index) => {
        const x = xFor(index);
        return (
          <g key={label}>
            <line x1={x} x2={x} y1={h - pad} y2={h - pad + 6} stroke="#9ca3af" strokeWidth={1} />
            <text x={x} y={h - pad + 18} fontSize={10} textAnchor="middle" fill="#374151">{label}</text>
          </g>
        );
      })}
      <line x1={pad} x2={pad} y1={pad} y2={h - pad} stroke="#9ca3af" strokeWidth={1} />
      <polyline points={points} fill="none" stroke="#1f2937" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={targetPoints} fill="none" stroke="#43afde" strokeWidth={2} strokeDasharray="6 4" />
    </svg>
  );
}

function RaisedDonut({ raised, goal }: { raised: number; goal: number }) {
  const size = 168;
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, raised / goal));

  return (
    <div className="relative w-[168px] h-[168px]">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#eef2f6" strokeWidth={stroke} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#43afde"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-4xl font-bold text-[#43afde] leading-none">{formatMoney(raised)}</div>
        <div className="mt-2 text-xs font-semibold text-gray-500">{Math.round(progress * 100)}% of {formatMoney(goal)}</div>
      </div>
    </div>
  );
}

const TIER_PRICES: Record<"gold" | "silver" | "bronze" | "startup", number> = {
  gold: 75_000,
  silver: 30_000,
  bronze: 10_000,
  startup: 3_000,
};

export function Overview({ sponsors, onDraft }: { sponsors: Sponsor[]; onDraft: (id: string) => void }) {
  const [openNotificationIds, setOpenNotificationIds] = useState<Set<string>>(() => new Set());
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const raisedGoal = 1_000_000;

  const raisedTotal = useMemo(() => {
    return sponsors.reduce((sum, s) => {
      if (s.status !== "Confirmed Sponsor") return sum;
      const yr = s.years.find(y => y.year === 2026) ?? s.years[0];
      if (!yr) return sum;
      return sum + (TIER_PRICES[yr.tier] ?? 0);
    }, 0);
  }, [sponsors]);

  const actuals = useMemo(() => {
    const ramp = [0.25, 0.5, 0.8, 1.0];
    return ramp.map(p => Math.round(raisedTotal * p));
  }, [raisedTotal]);

  const target = useMemo(() => {
    const start = actuals[0];
    const end = raisedGoal;
    return months.map((_, index) => Math.round(start + (end - start) * (index / (months.length - 1))));
  }, [actuals, raisedGoal]);

  const statusGroups = useMemo(() => {
    const map = new Map<string, Sponsor[]>();
    for (const sponsor of sponsors) {
      if (!map.has(sponsor.status)) map.set(sponsor.status, []);
      map.get(sponsor.status)!.push(sponsor);
    }
    return map;
  }, [sponsors]);

  const myNotificationGroups = useMemo(() => {
    return sponsors
      .filter(sponsor => isCurrentUserDri(sponsor.currentDri))
      .map(sponsor => ({
        sponsor,
        resources: [...sponsor.resources].sort((a, b) => b.date.localeCompare(a.date)),
      }))
      .sort((a, b) => {
        const aDate = a.resources[0]?.date ?? "";
        const bDate = b.resources[0]?.date ?? "";
        return bDate.localeCompare(aDate);
      });
  }, [sponsors]);

  const notificationCount = myNotificationGroups.reduce((sum, group) => sum + group.resources.length, 0);

  const goldAddOns = useMemo(() => {
    const map = new Map<string, Set<Sponsor>>();
    for (const sponsor of sponsors) {
      for (const year of sponsor.years || []) {
        if (year.tier !== "gold" || !Array.isArray(year.addOns)) continue;
        for (const addOn of year.addOns) {
          if (!map.has(addOn)) map.set(addOn, new Set());
          map.get(addOn)!.add(sponsor);
        }
      }
    }
    const order = ["Lightning Round", "Sponsor a Snack", "Sponsor a Meetup", "Sponsor an Activity"];
    return [...map.entries()]
      .filter(([name]) => order.includes(name))
      .map(([name, set]) => ({ name, sponsors: Array.from(set) }))
      .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  }, [sponsors]);

  const addOnCapacities: Record<string, number> = {
    "Lightning Round": 4,
    "Sponsor a Snack": 4,
    "Sponsor a Meetup": 4,
    "Sponsor an Activity": 4,
  };

  const tierCapacities: { tier: "gold" | "silver" | "bronze" | "startup"; cap: number; bar: string; pill: string }[] = [
    { tier: "gold",    cap: 4,  bar: "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400", pill: "text-amber-900 bg-amber-100" },
    { tier: "silver",  cap: 15, bar: "bg-gradient-to-r from-slate-200 to-indigo-300",                pill: "text-slate-800 bg-slate-200" },
    { tier: "bronze",  cap: 27, bar: "bg-gradient-to-r from-orange-300 to-rose-400",                 pill: "text-orange-900 bg-orange-100" },
    { tier: "startup", cap: 6,  bar: "bg-gradient-to-r from-teal-300 to-cyan-400",                   pill: "text-cyan-900 bg-cyan-100" },
  ];

  const confirmedByTier = (tier: string) =>
    sponsors.filter(s => s.status === "Confirmed Sponsor" && s.years.some(y => y.tier === tier)).length;

  function toggleNotificationGroup(id: string) {
    setOpenNotificationIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-[220px_minmax(0,1fr)_minmax(220px,320px)] gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-center items-center">
          <div className="text-xs text-gray-500 mb-4">Total Raised (as of May)</div>
          <RaisedDonut raised={raisedTotal} goal={raisedGoal} />
          <div className="text-xs text-gray-500 mt-4">{formatMoney(Math.max(0, raisedGoal - raisedTotal))} remaining</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Funds Raised (Feb-May) and Projection to Sep</h3>
          <LineChart actuals={actuals} target={target} labels={months} />
          <div className="text-xs text-gray-500 mt-2">Actuals shown solid dark; projection dashed blue to {formatMoney(raisedGoal)} by Sep.</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Confirmed Sponsors</h3>
          {statusGroups.get("Confirmed Sponsor") ? (
            <div className="flex flex-wrap gap-2 items-center">
              {statusGroups.get("Confirmed Sponsor")!.map(sponsor => (
                <div key={sponsor.id} title={sponsor.company}>
                  <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={28} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500">No confirmed sponsors yet.</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Notifications — Companies you&apos;re DRI of</h3>
          <div className="text-xs font-semibold text-gray-500">{notificationCount} update{notificationCount === 1 ? "" : "s"}</div>
        </div>
        {myNotificationGroups.length === 0 ? (
          <div className="text-xs text-gray-500">No recent activity for your companies.</div>
        ) : (
          <ul className="space-y-2">
            {myNotificationGroups.map(({ sponsor, resources }) => {
              const isOpen = openNotificationIds.has(sponsor.id);
              return (
                <li key={sponsor.id} className="border border-gray-100 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleNotificationGroup(sponsor.id)}
                    className="w-full flex items-center justify-between gap-4 p-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={30} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium truncate">{sponsor.company}</div>
                          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{resources.length}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {resources[0] ? `${resources[0].label} - ${resources[0].summary}` : "No recent activity yet."}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:block text-xs text-gray-500">{sponsor.status}</div>
                      <div className="text-lg leading-none text-gray-400">{isOpen ? "^" : "v"}</div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/60 px-3 py-2 space-y-2">
                      {resources.length === 0 && (
                        <div className="text-xs text-gray-500 px-3 py-2">No emails, Slack threads, or meetings logged for {sponsor.company} yet.</div>
                      )}
                      {resources.map(resource => (
                        <div key={resource.id} className="flex items-start justify-between gap-3 rounded-md bg-white border border-gray-100 p-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-semibold uppercase text-[#43afde]">{resource.type}</span>
                              <span className="text-[11px] text-gray-400">{resource.date}</span>
                            </div>
                            <div className="text-sm font-medium text-gray-800">{resource.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{resource.summary}</div>
                          </div>
                          <a href={resource.url} className="text-xs text-[#43afde] hover:underline shrink-0">Open</a>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button onClick={() => onDraft(sponsor.id)} className="text-xs bg-[#43afde] text-white px-3 py-1.5 rounded">Draft message</button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-6">Gold Add-ons - Capacity & Taken Spots</h3>
        {goldAddOns.length === 0 ? (
          <div className="text-xs text-gray-500">No gold add-ons recorded.</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {goldAddOns.map(addOn => {
              const cap = addOnCapacities[addOn.name] ?? 4;
              const visibleSponsors = addOn.sponsors.slice(0, cap);
              const taken = visibleSponsors.length;
              const overflow = Math.max(0, addOn.sponsors.length - cap);
              return (
                <div key={addOn.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium text-sm">{addOn.name}</div>
                    <div className="text-xs text-gray-500 font-semibold">{taken}/{cap}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: cap }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-colors ${
                          index < taken ? "bg-[#43afde] border-[#43afde] text-white" : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                      >
                        {index < taken ? "x" : ""}
                      </div>
                    ))}
                  </div>
                  {visibleSponsors.length > 0 && (
                    <div className="flex flex-col gap-2 text-xs">
                      {visibleSponsors.map(sponsor => (
                        <div key={sponsor.id} className="flex items-center gap-2 text-gray-700">
                          <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={20} />
                          <span>{sponsor.company}</span>
                        </div>
                      ))}
                      {overflow > 0 && (
                        <div className="text-[11px] text-gray-400 italic">+{overflow} over capacity (not shown)</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-sm font-semibold">Sponsor Capacity by Tier</h3>
          <span className="text-xs text-gray-500">Confirmed sponsors against per-tier quotas</span>
        </div>
        <div className="space-y-4">
          {tierCapacities.map(({ tier, cap, bar, pill }) => {
            const filled = confirmedByTier(tier);
            const pct = Math.min(100, (filled / cap) * 100);
            const complete = filled >= cap;
            return (
              <div key={tier}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className={"text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded " + pill}>
                    {tier}
                  </span>
                  <span className="text-xs text-gray-500">
                    <strong className="text-gray-800">{filled}</strong> of {cap} confirmed
                    {complete && <span className="ml-2 text-emerald-600 font-semibold">✓ full</span>}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={"h-full rounded-full transition-all duration-500 " + bar}
                    style={{ width: pct + "%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Overview;
