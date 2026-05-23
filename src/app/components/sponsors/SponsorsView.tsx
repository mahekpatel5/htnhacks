import { useState, useEffect } from "react";
import { Search, TrendingUp, Mail, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SPONSORS } from "../../constants";
import { isPipelineStatus } from "../../utils/sponsors";
import { SponsorsTable } from "./SponsorsTable";
import { CompanyDetailPanel } from "./CompanyDetailPanel";
import { SpotlightSearch } from "./SpotlightSearch";
import { EmailDrafterTab } from "./EmailDrafterTab";
import Overview from "./Overview";
import { AddSponsorModal } from "./AddSponsorModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { AttentionPills } from "./AttentionPills";
import type { Sponsor, DetailPanelSection, ContactAttentionState } from "../../types";

export function SponsorsView() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(SPONSORS);
  const [tab, setTab] = useState<"overview" | "pipeline" | "email">("overview");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailSection, setDetailSection] = useState<DetailPanelSection>("overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addInitialCompany, setAddInitialCompany] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Sponsor | null>(null);
  const [openAttentionPill, setOpenAttentionPill] = useState<ContactAttentionState | null>(null);

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
    setDetailSection("overview");
    setTab("pipeline");
  }

  function handleSelectSponsor(id: string) {
    setSelectedId(id);
    setDetailSection("overview");
  }

  function handleOpenActivity(id: string) {
    setSelectedId(id);
    setDetailSection("activity");
    setTab("pipeline");
    setOpenAttentionPill(null);
  }

  function handleOpenDraftEmail(id: string) {
    setSelectedId(id);
    setDetailSection("email");
    setTab("pipeline");
    setOpenAttentionPill(null);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#f3f4f6] border-b border-gray-200 px-8 pt-6 pb-0 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[26px] font-extrabold text-[#374151] leading-tight tracking-tight">Sponsor Pipeline</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Hack the North 2026 · {sponsors.filter(s => s.status === "Confirmed Sponsor").length} confirmed · {sponsors.filter(s => isPipelineStatus(s.status)).length} in pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AttentionPills
              sponsors={sponsors}
              openState={openAttentionPill}
              onToggle={state => setOpenAttentionPill(prev => prev === state ? null : state)}
              onClose={() => setOpenAttentionPill(null)}
              onSelectCompany={handleOpenActivity}
              onDraftEmail={handleOpenDraftEmail}
            />
            <button onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg text-sm hover:border-gray-300 hover:text-gray-700 transition-colors shadow-sm">
              <Search size={14} /><span>Search</span>
              <kbd className="ml-1 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>
            <button onClick={() => { setAddInitialCompany(""); setAddOpen(true); }}
              className="flex items-center gap-1.5 bg-[#43afde] hover:bg-[#3a9bc4] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Plus size={14} />Add sponsor
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          {[{ key: "overview", label: "Overview" }, { key: "pipeline", label: "Pipeline", icon: TrendingUp }, { key: "email", label: "Email Drafter", icon: Mail }].map(t => {
            const Icon = (t as any).icon;
            return (
              <button key={(t as any).key} onClick={() => setTab((t as any).key as any)}
                className={"flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors " + (tab === (t as any).key ? "border-[#43afde] text-[#43afde]" : "border-transparent text-gray-500 hover:text-gray-700")}>
                {Icon && <Icon size={14} />}{t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div key="overview" className="h-full overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <Overview sponsors={sponsors} onDraft={(id: string) => { setSelectedId(id); setTab("email"); }} />
            </motion.div>
          )}
          {tab === "pipeline" && (
            <motion.div key="pipeline" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <SponsorsTable
                sponsors={sponsors}
                onSelectSponsor={handleSelectSponsor}
                onUpdate={handleUpdate}
                onRequestDelete={setPendingDelete}
              />
            </motion.div>
          )}
          {tab === "email" && (
            <motion.div key="email" className="h-full overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <EmailDrafterTab sponsors={sponsors} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedSponsor && (
          <CompanyDetailPanel
            key={selectedSponsor.id}
            sponsor={selectedSponsor}
            initialSection={detailSection}
            onClose={() => setSelectedId(null)}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {searchOpen && (
          <SpotlightSearch
            sponsors={sponsors}
            onSelect={handleSelectFromSearch}
            onClose={() => setSearchOpen(false)}
            onCreateSponsor={company => {
              setSearchOpen(false);
              setAddInitialCompany(company);
              setAddOpen(true);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {addOpen && (
          <AddSponsorModal
            initialCompany={addInitialCompany}
            onAdd={handleAdd}
            onClose={() => { setAddOpen(false); setAddInitialCompany(""); }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
}
