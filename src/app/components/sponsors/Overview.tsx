import React, { useMemo } from "react";
import { CompanyLogo } from "./ui/CompanyLogo";
import type { Sponsor } from "../../types";

function LineChart({ actuals, target, labels }: { actuals: number[]; target: number[]; labels: string[] }) {
  // SVG line chart with simple X (months) and Y (amount) axes
  const all = [...actuals, ...target];
  const max = Math.max(...all, 1);
  const w = 720; const h = 180; const pad = 40;

  const total = labels.length;

  const xFor = (index: number) => pad + (index * (w - pad * 2) / Math.max(1, total - 1));
  const yFor = (v: number) => h - pad - (v / max) * (h - pad * 2);

  const points = actuals.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");
  const targetPoints = target.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");

  // Y ticks (including 0 and max rounded)
  const maxTick = Math.ceil(max / 100000) * 100000;
  const yTicks = [0, maxTick * 0.25, maxTick * 0.5, maxTick * 0.75, maxTick];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[180px] rounded-lg bg-white p-2">
      {/* Y grid & ticks */}
      {yTicks.map((t, i) => {
        const y = yFor(t);
        return (
          <g key={i}>
            <line x1={pad} x2={w - pad} y1={y} y2={y} stroke="#e6e6e6" strokeWidth={1} />
            <text x={pad - 8} y={y + 4} fontSize={10} textAnchor="end" fill="#374151">${t.toLocaleString()}</text>
          </g>
        );
      })}

      {/* X axis line */}
      <line x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} stroke="#9ca3af" strokeWidth={1} />
      {/* X ticks and labels */}
      {labels.map((lab, i) => {
        const x = xFor(i);
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={h - pad} y2={h - pad + 6} stroke="#9ca3af" strokeWidth={1} />
            <text x={x} y={h - pad + 18} fontSize={10} textAnchor="middle" fill="#374151">{lab}</text>
          </g>
        );
      })}

      {/* Y axis line */}
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
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative w-[168px] h-[168px]">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#eef2f6"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#43afde"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-4xl font-bold text-[#43afde] leading-none">
          ${(raised / 1000).toFixed(0)}K
        </div>
        <div className="mt-2 text-xs font-semibold text-gray-500">
          {Math.round(progress * 100)}% of $1M
        </div>
      </div>
    </div>
  );
}

export function Overview({ sponsors, onDraft }: { sponsors: Sponsor[]; onDraft: (id: string) => void }) {
  // Mock actuals Feb-May
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const actuals = useMemo(() => [100000, 200000, 350000, 420000], []);
  const raisedTotal = actuals[actuals.length - 1];
  const raisedGoal = 1000000;
  const target = useMemo(() => {
    // linear target from Feb to Sep (covers full months array)
    const start = actuals[0];
    const end = 1000000;
    const steps = months.length - 1; // Feb->Sep
    const vals = [] as number[];
    for (let i = 0; i <= steps; i++) {
      vals.push(Math.round(start + (end - start) * (i / steps)));
    }
    return vals;
  }, [actuals]);

  const statusGroups = useMemo(() => {
    const map = new Map<string, Sponsor[]>();
    for (const s of sponsors) {
      const k = s.status;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(s);
    }
    return map;
  }, [sponsors]);

  const myNotifications = useMemo(() => {
    return sponsors
      .filter(s => s.currentDri === "me")
      .flatMap(s => s.resources.map(r => ({ sponsor: s, resource: r })));
  }, [sponsors]);

  const goldAddOns = useMemo(() => {
    const map = new Map<string, Set<Sponsor>>();
    const excludedAddOns = new Set(["Recruiting Booth"]);
    for (const s of sponsors) {
      for (const y of s.years || []) {
        if (y.tier === "gold" && Array.isArray(y.addOns)) {
          for (const a of y.addOns) {
            if (excludedAddOns.has(a)) continue;
            if (!map.has(a)) map.set(a, new Set());
            map.get(a)!.add(s);
          }
        }
      }
    }
    const arr = [...map.entries()].map(([name, set]) => ({ name, sponsors: Array.from(set) }));
    const order = ["Lightning Round", "Sponsor a Snack", "Sponsor a Meetup", "Sponsor an Activity"];
    arr.sort((a, b) => (order.indexOf(a.name) - order.indexOf(b.name)) || a.name.localeCompare(b.name));
    return arr;
  }, [sponsors]);

  const addOnCapacities: Record<string, number> = {
    "Lightning Round": 4,
    "Sponsor a Snack": 4,
    "Sponsor a Meetup": 4,
    "Sponsor an Activity": 3,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-[220px_minmax(0,1fr)_minmax(220px,320px)] gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-center items-center">
          <div className="text-xs text-gray-500 mb-4">Total Raised (as of May)</div>
          <RaisedDonut raised={raisedTotal} goal={raisedGoal} />
          <div className="text-xs text-gray-500 mt-4">
            ${(raisedGoal - raisedTotal).toLocaleString()} remaining
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Funds Raised (Feb–May) and Projection to Sep</h3>
          <LineChart actuals={actuals} target={target} labels={months} />
          <div className="text-xs text-gray-500 mt-2">Actuals shown solid dark; projection dashed blue to 1,000,000 by Sep.</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Confirmed Sponsors</h3>
          <div className="space-y-3">
            {statusGroups.get("Confirmed Sponsor") ? (
              <div className="flex items-start gap-3">
                <div className="flex flex-wrap gap-2 items-center">
                  {statusGroups.get("Confirmed Sponsor")!.map(s => <div key={s.id} title={s.company}><CompanyLogo domain={s.domain} company={s.company} size={28} /></div>)}
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500">No confirmed sponsors yet.</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Notifications — Companies You're DRI of</h3>
        {myNotifications.length === 0 ? (
          <div className="text-xs text-gray-500">No recent activity for your companies.</div>
        ) : (
          <ul className="space-y-2">
            {myNotifications.map(({ sponsor, resource }, i) => (
              <li key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={28} />
                  <div>
                    <div className="text-sm font-medium">{sponsor.company}</div>
                    <div className="text-xs text-gray-500">{resource.label} — {resource.summary}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={resource.url} className="text-xs text-[#43afde] hover:underline">Open</a>
                  <button onClick={() => onDraft(sponsor.id)} className="text-xs bg-[#43afde] text-white px-2 py-1 rounded">Draft message</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-6">Gold Add-ons — Capacity & Taken Spots</h3>
        {goldAddOns.length === 0 ? (
          <div className="text-xs text-gray-500">No gold add-ons recorded.</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {goldAddOns.map(a => {
              const cap = addOnCapacities[a.name] ?? Math.max(1, a.sponsors.length);
              const taken = a.sponsors.length;
              return (
                <div key={a.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium text-sm">{a.name}</div>
                    <div className="text-xs text-gray-500 font-semibold">{taken}/{cap}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: cap }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-colors ${
                          i < taken
                            ? "bg-[#43afde] border-[#43afde] text-white"
                            : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                      >
                        {i < taken ? "✓" : ""}
                      </div>
                    ))}
                  </div>
                  {a.sponsors.length > 0 && (
                    <div className="flex flex-col gap-2 text-xs">
                      {a.sponsors.map(s => (
                        <div key={s.id} className="flex items-center gap-2 text-gray-700">
                          <CompanyLogo domain={s.domain} company={s.company} size={20} />
                          <span>{s.company}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Other Visualizations</h3>
        <div className="text-sm text-gray-600">Sponsors by tier:</div>
        <div className="flex gap-4 mt-3">
          {['gold','silver','bronze','startup'].map(t => (
            <div key={t} className="text-xs text-gray-700">
              <div className="font-semibold">{t.charAt(0).toUpperCase()+t.slice(1)}</div>
              <div className="mt-1">{sponsors.filter(s => s.years.some(y => y.tier === t)).length} current</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
