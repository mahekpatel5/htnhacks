import { useState, useEffect } from "react";
import { Search, TrendingUp, Mail, AlertTriangle, Plus } from "lucide-react";
import { SPONSORS } from "../../constants";
import { isPipelineStatus, isOverdue } from "../../utils/sponsors";
import { SponsorsTable } from "./SponsorsTable";
import { CompanyDetailPanel } from "./CompanyDetailPanel";
import { SpotlightSearch } from "./SpotlightSearch";
import { EmailDrafterTab } from "./EmailDrafterTab";
import { AddSponsorModal } from "./AddSponsorModal";
import { ConfirmDialog } from "./ConfirmDialog";
import type { Sponsor } from "../../types";

export function SponsorsView() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(SPONSORS);
  const [tab, setTab] = useState<"pipeline" | "email">("pipeline");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Sponsor | null>(null);

  const selectedSponsor = sponsors.find(s => s.id === selectedId) ?? null;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleUpdate(updated: Sponsor) {
    setSponsors(prev => prev.map(s => s.id === updated.id ? updated : s));
  }

  function handleAdd(sponsor: Sponsor) {
    setSponsors(prev => [sponsor, ...prev]);
  }

  function handleConfirmDelete() {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setSponsors(prev => prev.filter(s => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function handleSelectFromSearch(id: string) {
    setSelectedId(id);
    setTab("pipeline");
  }

  const overdueCount = sponsors.filter(s => isPipelineStatus(s.status) && isOverdue(s.lastBumpDate)).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#f3f4f6] border-b border-gray-200 px-8 pt-6 pb-0 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[26px] font-extrabold text-[#374151] leading-tight tracking-tight">Sponsor Pipeline</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              HackNorth 2025 · {sponsors.filter(s => s.status === "Confirmed Sponsor").length} confirmed · {sponsors.filter(s => isPipelineStatus(s.status)).length} in pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            {overdueCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                <AlertTriangle size={13} />{overdueCount} overdue bump{overdueCount > 1 ? "s" : ""}
              </div>
            )}
            <button onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg text-sm hover:border-gray-300 hover:text-gray-700 transition-colors shadow-sm">
              <Search size={14} /><span>Search</span>
              <kbd className="ml-1 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>
            <button onClick={() => setAddOpen(true)}
              className="flex items-center gap-1.5 bg-[#43afde] hover:bg-[#3a9bc4] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Plus size={14} />Add sponsor
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          {[{ key: "pipeline", label: "Pipeline", icon: TrendingUp }, { key: "email", label: "Email Drafter", icon: Mail }].map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setTab(t.key as "pipeline" | "email")}
                className={"flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors " + (tab === t.key ? "border-[#43afde] text-[#43afde]" : "border-transparent text-gray-500 hover:text-gray-700")}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {tab === "pipeline" && <SponsorsTable sponsors={sponsors} onSelectSponsor={setSelectedId} onUpdate={handleUpdate} onRequestDelete={setPendingDelete} />}
        {tab === "email" && <EmailDrafterTab sponsors={sponsors} />}
      </div>

      {selectedSponsor && (
        <CompanyDetailPanel sponsor={selectedSponsor} onClose={() => setSelectedId(null)} onUpdate={handleUpdate} />
      )}
      {searchOpen && (
        <SpotlightSearch sponsors={sponsors} onSelect={handleSelectFromSearch} onClose={() => setSearchOpen(false)} />
      )}
      {addOpen && (
        <AddSponsorModal onAdd={handleAdd} onClose={() => setAddOpen(false)} />
      )}
      {pendingDelete && (
        <ConfirmDialog
          title={"Delete " + pendingDelete.company + "?"}
          message={
            <>
              This will remove <span className="font-semibold text-gray-900">{pendingDelete.company}</span> from your pipeline,
              along with {pendingDelete.resources.length} linked resource{pendingDelete.resources.length === 1 ? "" : "s"} and {pendingDelete.years.length} year{pendingDelete.years.length === 1 ? "" : "s"} of history. This action cannot be undone.
            </>
          }
          confirmLabel="Delete sponsor"
          onConfirm={handleConfirmDelete}
          onClose={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
