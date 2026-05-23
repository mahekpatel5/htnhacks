import { useEffect, useMemo, useState } from "react";
import { Filter, ChevronDown, SortAsc } from "lucide-react";
import { STATUS_ORDER, ALL_DRIS, DEFAULT_DRI } from "../../constants";
import { getContactAttentionState, daysSince } from "../../utils/sponsors";
import { StatusBadge, ContactIndicatorDot } from "./ui/Badges";
import { CompanyLogo } from "./ui/CompanyLogo";
import { EmailDrafterSection } from "./EmailDrafterSection";
import type { Sponsor, SponsorStatus } from "../../types";

type SidebarSortKey = "status" | "company" | "lastBumpDate";

const filterSelectBase =
  "flex-1 text-[11px] border rounded-md px-2 py-1 outline-none min-w-0 transition-colors";
const filterSelectIdle = filterSelectBase + " border-gray-200 bg-white text-gray-600 focus:border-[#43afde]";
const filterSelectActive = filterSelectBase + " border-[#43afde] bg-[#43afde] text-white focus:border-[#43afde]";

export function EmailDrafterTab({
  sponsors,
  selectedId: controlledSelectedId,
  onSelectedIdChange,
}: {
  sponsors: Sponsor[];
  selectedId?: string;
  onSelectedIdChange?: (id: string) => void;
}) {
  const [filterStatus, setFilterStatus] = useState<SponsorStatus | "">("");
  const [filterDri, setFilterDri] = useState(DEFAULT_DRI);
  const [sortKey, setSortKey] = useState<SidebarSortKey>("status");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [internalSelectedId, setInternalSelectedId] = useState("");
  const selectedId = controlledSelectedId ?? internalSelectedId;
  const setSelectedId = onSelectedIdChange ?? setInternalSelectedId;

  const filtered = useMemo(() => {
    let arr = [...sponsors];
    if (filterStatus) arr = arr.filter(s => s.status === filterStatus);
    if (filterDri) arr = arr.filter(s => s.currentDri === filterDri);
    arr.sort((a, b) => {
      let av: string | number = "", bv: string | number = "";
      if (sortKey === "company") { av = a.company.toLowerCase(); bv = b.company.toLowerCase(); }
      else if (sortKey === "status") { av = STATUS_ORDER.indexOf(a.status); bv = STATUS_ORDER.indexOf(b.status); }
      else if (sortKey === "lastBumpDate") { av = new Date(a.lastBumpDate).getTime(); bv = new Date(b.lastBumpDate).getTime(); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sponsors, filterStatus, filterDri, sortKey, sortDir]);

  useEffect(() => {
    if (filtered.length === 0) return;
    if (!filtered.some(s => s.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId, setSelectedId]);

  const selectedSponsor = filtered.find(s => s.id === selectedId) ?? sponsors.find(s => s.id === selectedId) ?? null;
  const filtersActive = Boolean(filterStatus || filterDri);
  const driFilterActive = Boolean(filterDri);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-72 border-r border-gray-100 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Select Sponsor</p>
            {filtersActive && (
              <button
                onClick={() => { setFilterStatus(""); setFilterDri(""); }}
                className="text-[11px] text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <Filter size={12} className="text-gray-400 shrink-0" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as SponsorStatus | "")}
              className={filterSelectIdle}
            >
              <option value="">All Statuses</option>
              {STATUS_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <Filter size={12} className="text-gray-400 shrink-0 opacity-0" />
            <select
              value={filterDri}
              onChange={e => setFilterDri(e.target.value)}
              className={driFilterActive ? filterSelectActive : filterSelectIdle}
            >
              <option value="">All DRIs</option>
              {ALL_DRIS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <SortAsc size={12} className="text-gray-400 shrink-0" />
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SidebarSortKey)}
              className={filterSelectIdle}
            >
              <option value="status">Sort: Status</option>
              <option value="company">Sort: Company</option>
              <option value="lastBumpDate">Sort: Last Contact</option>
            </select>
            <button
              onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
              title={sortDir === "asc" ? "Ascending" : "Descending"}
              className="px-1.5 py-1 text-[11px] border border-gray-200 rounded-md bg-white text-gray-600 hover:border-gray-300 hover:text-gray-800 transition-colors shrink-0"
            >
              <ChevronDown size={12} className={sortDir === "desc" ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
          </div>
        </div>

        <div className="px-4 py-1.5 text-[11px] text-gray-400 border-b border-gray-100">
          {filtered.length} of {sponsors.length} sponsor{sponsors.length === 1 ? "" : "s"}
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {filtered.map(s => {
            const attention = getContactAttentionState(s);
            const lastContact = daysSince(s.lastBumpDate);
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={
                  "w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors " +
                  (selectedId === s.id ? "bg-[#43afde]/10 border-r-2 border-[#43afde]" : "hover:bg-gray-50")
                }
              >
                <div className="w-2 shrink-0 flex items-center justify-center self-center">
                  {attention ? (
                    <ContactIndicatorDot state={attention} className="" />
                  ) : (
                    <span className="inline-block w-2 h-2 shrink-0" aria-hidden />
                  )}
                </div>
                <CompanyLogo domain={s.domain} company={s.company} size={24} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-gray-800 truncate">{s.company}</span>
                    <span className="text-[11px] text-gray-400 shrink-0 tabular-nums">{lastContact}d ago</span>
                  </div>
                  <div className="mt-0.5">
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-xs text-gray-400">
              No sponsors match the filters.
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-[#1f2937] mb-1">
          {selectedSponsor ? "Draft Email to " + selectedSponsor.company : "Email Drafter"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">AI-assisted outreach with full sponsorship context</p>
        <EmailDrafterSection sponsor={selectedSponsor} />
      </div>
    </div>
  );
}
