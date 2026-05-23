import { useState, useMemo, useRef, useEffect } from "react";
import { Filter, ChevronDown, SortAsc, ChevronRight, AlertTriangle, Edit3, Check, Trash2 } from "lucide-react";
import { STATUS_ORDER, ALL_DRIS, TIER_ORDER } from "../../constants";
import { isPipelineStatus, isOverdue, daysSince } from "../../utils/sponsors";
import { StatusBadge, TierBadge, OverdueDot } from "./ui/Badges";
import { CompanyLogo } from "./ui/CompanyLogo";
import { CellDropdown } from "./ui/CellDropdown";
import type { Sponsor, SponsorStatus, Tier, SortKey } from "../../types";

const CURRENT_YEAR = 2026;
const AVAILABLE_YEARS = [2022, 2023, 2024, 2025, 2026];

function YearsMultiselect({ sponsor, onUpdate }: { sponsor: Sponsor; onUpdate: (s: Sponsor) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedYears = new Set(sponsor.years.map(y => y.year));
  const sorted = [...sponsor.years].sort((a, b) => b.year - a.year);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function toggle(year: number) {
    if (selectedYears.has(year)) {
      onUpdate({ ...sponsor, years: sponsor.years.filter(y => y.year !== year) });
    } else {
      onUpdate({
        ...sponsor,
        years: [...sponsor.years, { year, tier: "startup", addOns: [], dri: sponsor.currentDri, reps: [] }],
      });
    }
  }

  return (
    <div ref={ref} className="relative" onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>
      <div className="flex items-start gap-1 cursor-pointer group">
        <div className="grid grid-cols-2 gap-1">
          {sorted.map(y => (
            <span key={y.year} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{y.year}</span>
          ))}
          {sorted.length === 0 && <span className="text-xs text-gray-400">None</span>}
        </div>
        <Edit3 size={10} className="text-gray-300 group-hover:text-gray-500 transition-colors mt-0.5 shrink-0" />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[120px] py-1">
          {AVAILABLE_YEARS.map(year => {
            const checked = selectedYears.has(year);
            return (
              <button
                key={year}
                onClick={e => { e.stopPropagation(); toggle(year); }}
                className={"w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 " + (checked ? "bg-[#43afde]/5" : "")}
              >
                <div className={"w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 " + (checked ? "bg-[#43afde] border-[#43afde]" : "border-gray-300")}>
                  {checked && <Check size={9} className="text-white" />}
                </div>
                <span className="text-xs text-gray-700">{year}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SponsorsTable({ sponsors, onSelectSponsor, onUpdate, onRequestDelete }: {
  sponsors: Sponsor[];
  onSelectSponsor: (id: string) => void;
  onUpdate: (updated: Sponsor) => void;
  onRequestDelete: (sponsor: Sponsor) => void;
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
              <th className="text-left px-4 py-3 hidden lg:table-cell"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{CURRENT_YEAR} Tier</span></th>
              <th className="text-left px-4 py-3 hidden xl:table-cell"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</span></th>
              <th className="text-left px-4 py-3"><SortHeader label="Last Bump" col="lastBumpDate" /></th>
              <th className="text-left px-4 py-3 hidden lg:table-cell"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">History</span></th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const overdue = isPipelineStatus(s.status) && isOverdue(s.lastBumpDate);
              const currentYearRecord = s.years.find(y => y.year === CURRENT_YEAR);
              return (
                <tr key={s.id} onClick={() => onSelectSponsor(s.id)}
                  className={
                    "border-b border-gray-100 cursor-pointer transition-colors " +
                    (s.status === "Rejected" ? "bg-red-50 hover:bg-red-100/60"
                      : s.status === "Confirmed Sponsor" ? "bg-emerald-50 hover:bg-emerald-100/60"
                      : "hover:bg-gray-50")
                  }>
                  <td className="px-4 py-3">{overdue && <OverdueDot />}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo domain={s.domain} company={s.company} size={28} />
                      <span className="font-semibold text-gray-800">{s.company}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <CellDropdown<SponsorStatus>
                      value={s.status}
                      options={STATUS_ORDER}
                      onSelect={v => onUpdate({ ...s, status: v })}
                      renderValue={v => <StatusBadge status={v} />}
                      renderOption={v => <StatusBadge status={v} />}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <CellDropdown<string>
                      value={s.currentDri}
                      options={ALL_DRIS}
                      onSelect={v => onUpdate({ ...s, currentDri: v })}
                      renderValue={v => <span className="text-xs text-gray-700 font-medium">{v}</span>}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <YearsMultiselect sponsor={s} onUpdate={onUpdate} />
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell" onClick={e => e.stopPropagation()}>
                    {currentYearRecord ? (
                      <CellDropdown<Tier>
                        value={currentYearRecord.tier}
                        options={TIER_ORDER}
                        onSelect={tier => {
                          const newYears = s.years.map(y => y.year === CURRENT_YEAR ? { ...y, tier } : y);
                          onUpdate({ ...s, years: newYears });
                        }}
                        renderValue={v => <TierBadge tier={v} />}
                        renderOption={v => <TierBadge tier={v} />}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
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
                    <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => onRequestDelete(s)}
                        title={"Delete " + s.company}
                        aria-label={"Delete " + s.company}
                        className="p-1 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
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
