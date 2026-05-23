import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, GripVertical, Sparkles, Star, Plus, Trash2 } from "lucide-react";
import { STATUS_ORDER, TIER_ORDER, ALL_DRIS } from "../../constants";
import { getContactAttentionState, formatDate } from "../../utils/sponsors";
import { getSponsorshipYearRecord, updateSponsorshipYear } from "../../utils/sponsorYear";
import { normalizeAddOns } from "../../utils/addOns";
import { StatusBadge, TierBadge, ContactAttentionPill } from "./ui/Badges";
import { CompanyLogo } from "./ui/CompanyLogo";
import { CellDropdown } from "./ui/CellDropdown";
import { AddOnMultiselect } from "./ui/AddOnMultiselect";
import { ActivityFeed } from "./ActivityFeed";
import { EmailDrafterSection } from "./EmailDrafterSection";
import type { Sponsor, SponsorStatus, Tier, Contact, DetailPanelSection } from "../../types";

export function CompanyDetailPanel({ sponsor, onClose, onUpdate, initialSection = "overview" }: {
  sponsor: Sponsor;
  onClose: () => void;
  onUpdate: (updated: Sponsor) => void;
  initialSection?: DetailPanelSection;
}) {
  const [activeSection, setActiveSection] = useState<DetailPanelSection>(initialSection);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(sponsor.notes);
  const [editingContactIdx, setEditingContactIdx] = useState<number | null>(null);
  const [contactDraft, setContactDraft] = useState<Contact>({ name: "", email: "", title: "" });
  const [panelWidth, setPanelWidth] = useState(640);
  const currentYear = new Date().getFullYear();
  const sponsorshipYr = getSponsorshipYearRecord(sponsor);
  const currentYr = sponsor.years.find(y => y.year === currentYear);
  const [addOnsText, setAddOnsText] = useState(normalizeAddOns(currentYr?.addOns ?? []).join(", "));
  const [repsText, setRepsText] = useState(currentYr?.reps.join(", ") ?? "");
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const attention = getContactAttentionState(sponsor);

  useEffect(() => {
    setActiveSection(initialSection);
    const yr = sponsor.years.find(y => y.year === currentYear);
    setAddOnsText(normalizeAddOns(yr?.addOns ?? []).join(", "));
    setRepsText(yr?.reps.join(", ") ?? "");
  }, [sponsor.id, initialSection]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = panelWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [panelWidth]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current) return;
      const delta = startX.current - e.clientX;
      const newW = Math.max(420, Math.min(900, startW.current + delta));
      setPanelWidth(newW);
    }
    function onUp() {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
  }, []);

  function saveNotes() { onUpdate({ ...sponsor, notes }); setEditingNotes(false); }

  const sections = [
    { key: "overview", label: "Overview" },
    { key: "history", label: "History" },
    { key: "activity", label: "Activity" },
    { key: "email", label: "Draft Email" },
  ] as const;

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-stretch justify-end"
    >
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
        animate={{ backdropFilter: "blur(4px)", opacity: 1 }}
        exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={onClose}
      />
      <motion.div
        className="relative flex items-stretch"
        style={{ width: panelWidth }}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
      >
        <div
          onMouseDown={onMouseDown}
          className="absolute left-0 top-0 bottom-0 w-4 flex items-center justify-center cursor-col-resize z-10 group"
        >
          <div className="w-1 h-16 rounded-full bg-gray-200 group-hover:bg-[#43afde] transition-colors" />
          <GripVertical size={14} className="absolute text-gray-300 group-hover:text-[#43afde] transition-colors" />
        </div>

        <div className="flex-1 bg-white shadow-2xl flex flex-col overflow-hidden ml-4">
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
            <div className="flex items-start gap-3 min-w-0">
              <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={40} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl font-bold text-[#1f2937]">{sponsor.company}</h2>
                  {attention && <ContactAttentionPill state={attention} />}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={sponsor.status} />
                  <span className="text-xs text-gray-400">DRI: <strong className="text-gray-600">{sponsor.currentDri}</strong></span>
                  <span className="text-xs text-gray-400">Last contact: <strong className="text-gray-600">{formatDate(sponsor.lastBumpDate)}</strong></span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors shrink-0">
              <X size={18} />
            </button>
          </div>

          <div className="flex border-b border-gray-100 px-6 shrink-0">
            {sections.map(s => (
              <button key={s.key} onClick={() => setActiveSection(s.key)}
                className={"px-3 py-3 text-sm font-medium border-b-2 transition-colors " + (activeSection === s.key ? "border-[#43afde] text-[#43afde]" : "border-transparent text-gray-500 hover:text-gray-700")}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
            {activeSection === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-br from-[#43afde]/10 to-purple-50 rounded-xl p-4 border border-[#43afde]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[#43afde]" />
                    <span className="text-xs font-semibold text-[#43afde] uppercase tracking-wide">AI Relationship Summary</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{sponsor.aiSummary}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Contacts</h3>
                    <button
                      onClick={() => {
                        const draft: Contact = { name: "", email: "", title: "" };
                        const newContacts = [...sponsor.contacts, draft];
                        onUpdate({ ...sponsor, contacts: newContacts });
                        setContactDraft(draft);
                        setEditingContactIdx(newContacts.length - 1);
                      }}
                      className="flex items-center gap-1 text-xs text-[#43afde] hover:underline"
                    >
                      <Plus size={11} />Add contact
                    </button>
                  </div>
                  <div className="space-y-2">
                    {sponsor.contacts.map((c, idx) => (
                      <div key={idx} className={"rounded-xl p-3 " + (idx === 0 ? "bg-[#43afde]/8 border border-[#43afde]/20" : "bg-gray-50")}>
                        {editingContactIdx === idx ? (
                          <div className="space-y-2">
                            <input
                              value={contactDraft.name}
                              onChange={e => setContactDraft(d => ({ ...d, name: e.target.value }))}
                              placeholder="Full name"
                              className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#43afde] bg-white"
                            />
                            <input
                              value={contactDraft.title}
                              onChange={e => setContactDraft(d => ({ ...d, title: e.target.value }))}
                              placeholder="Title"
                              className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#43afde] bg-white"
                            />
                            <input
                              value={contactDraft.email}
                              onChange={e => setContactDraft(d => ({ ...d, email: e.target.value }))}
                              placeholder="Email"
                              className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#43afde] bg-white"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  const newContacts = sponsor.contacts.map((ct, i) => i === idx ? contactDraft : ct);
                                  onUpdate({ ...sponsor, contacts: newContacts });
                                  setEditingContactIdx(null);
                                }}
                                className="px-3 py-1.5 bg-[#43afde] text-white text-xs rounded-lg font-medium hover:bg-[#2395c6]"
                              >Save</button>
                              <button
                                onClick={() => {
                                  if (!c.name && !c.email) {
                                    onUpdate({ ...sponsor, contacts: sponsor.contacts.filter((_, i) => i !== idx) });
                                  }
                                  setEditingContactIdx(null);
                                }}
                                className="px-3 py-1.5 text-gray-500 text-xs hover:text-gray-700"
                              >Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <div className="w-9 h-9 rounded-full bg-[#43afde]/20 flex items-center justify-center text-sm font-bold text-[#43afde]">
                                {c.name ? c.name.split(" ").map(n => n[0]).join("") : "?"}
                              </div>
                              {idx === 0 && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#43afde] rounded-full flex items-center justify-center">
                                  <Star size={8} className="text-white fill-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <div className="text-sm font-semibold text-gray-800">{c.name || <span className="text-gray-400 italic">No name</span>}</div>
                                {idx === 0 && <span className="text-[10px] font-medium text-[#43afde] bg-[#43afde]/10 px-1.5 py-0.5 rounded-full">Primary</span>}
                              </div>
                              <div className="text-xs text-gray-500">{c.title}</div>
                              {c.email && <a href={"mailto:" + c.email} className="text-xs text-[#43afde] hover:underline">{c.email}</a>}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {idx !== 0 && (
                                <button
                                  onClick={() => {
                                    const newContacts = [c, ...sponsor.contacts.filter((_, i) => i !== idx)];
                                    onUpdate({ ...sponsor, contacts: newContacts });
                                  }}
                                  className="text-xs text-gray-400 hover:text-[#43afde] transition-colors"
                                  title="Make primary"
                                ><Star size={12} /></button>
                              )}
                              <button
                                onClick={() => { setContactDraft(c); setEditingContactIdx(idx); }}
                                className="text-xs text-gray-400 hover:text-gray-600 underline"
                              >Edit</button>
                              {sponsor.contacts.length > 1 && (
                                <button
                                  onClick={() => onUpdate({ ...sponsor, contacts: sponsor.contacts.filter((_, i) => i !== idx) })}
                                  className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Pipeline Status</h3>
                    <CellDropdown<SponsorStatus>
                      value={sponsor.status}
                      options={STATUS_ORDER}
                      onSelect={status => onUpdate({ ...sponsor, status })}
                      renderValue={v => <StatusBadge status={v} />}
                      renderOption={v => <StatusBadge status={v} />}
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tier</h3>
                    <CellDropdown<Tier>
                      value={sponsorshipYr?.tier ?? "startup"}
                      options={TIER_ORDER}
                      onSelect={tier => onUpdate(updateSponsorshipYear(sponsor, { tier }))}
                      renderValue={v => <TierBadge tier={v} />}
                      renderOption={v => <TierBadge tier={v} />}
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Add-on</h3>
                    <AddOnMultiselect
                      selected={sponsorshipYr?.addOns ?? []}
                      onChange={addOns => onUpdate(updateSponsorshipYear(sponsor, { addOns }))}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Notes</h3>
                    {!editingNotes && <button onClick={() => setEditingNotes(true)} className="text-xs text-[#43afde] hover:underline">Edit</button>}
                  </div>
                  {editingNotes ? (
                    <div className="space-y-2">
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                        className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 resize-none outline-none focus:border-[#43afde]" />
                      <div className="flex gap-2">
                        <button onClick={saveNotes} className="px-3 py-1.5 bg-[#43afde] text-white text-xs rounded-lg font-medium hover:bg-[#2395c6]">Save</button>
                        <button onClick={() => { setNotes(sponsor.notes); setEditingNotes(false); }} className="px-3 py-1.5 text-gray-500 text-xs hover:text-gray-700">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">{notes || "No notes yet."}</p>
                  )}
                </div>

              </div>
              </motion.div>
            )}

            {activeSection === "history" && (
              <motion.div key="history" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                <div className="p-6 space-y-4">
                  {sponsor.years.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <Star size={28} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No prior sponsorship years on record.</p>
                    </div>
                  ) : [...sponsor.years].sort((a, b) => b.year - a.year).map(yr => {
                    const isCurrent = yr.year === currentYear;
                    const updateYear = (updatedYr: typeof sponsor.years[number]) =>
                      onUpdate({ ...sponsor, years: sponsor.years.map(y => y.year === updatedYr.year ? updatedYr : y) });
                    return (
                      <div key={yr.year} className={"rounded-xl p-4 space-y-3 " + (isCurrent ? "border border-[#43afde]/30 bg-[#43afde]/5" : "border border-gray-100")}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">{yr.year}</span>
                            {isCurrent && <span className="text-[10px] font-medium text-[#43afde] bg-[#43afde]/10 px-1.5 py-0.5 rounded-full">Current</span>}
                          </div>
                          {isCurrent ? (
                            <CellDropdown<Tier>
                              value={yr.tier}
                              options={TIER_ORDER}
                              onSelect={tier => updateYear({ ...yr, tier })}
                              renderValue={v => <TierBadge tier={v} />}
                              renderOption={v => <TierBadge tier={v} />}
                            />
                          ) : (
                            <TierBadge tier={yr.tier} />
                          )}
                        </div>

                        {isCurrent ? (
                          <>
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">Add-ons <span className="text-gray-300">(comma-separated)</span></label>
                              <input
                                value={addOnsText}
                                onChange={e => setAddOnsText(e.target.value)}
                                onBlur={e => {
                                  const parsed = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                                  const canonical = normalizeAddOns(parsed);
                                  updateYear({ ...yr, addOns: canonical });
                                  setAddOnsText(canonical.join(", "));
                                }}
                                placeholder="e.g. Recruiting Booth, API Workshop"
                                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#43afde] bg-white"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-gray-400 block mb-1">DRI</label>
                                <input
                                  list="dri-options"
                                  value={yr.dri}
                                  onChange={e => updateYear({ ...yr, dri: e.target.value })}
                                  placeholder="DRI name"
                                  className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#43afde] bg-white"
                                />
                                <datalist id="dri-options">
                                  {ALL_DRIS.map(d => <option key={d} value={d} />)}
                                </datalist>
                              </div>
                              <div>
                                <label className="text-xs text-gray-400 block mb-1">Reps <span className="text-gray-300">(comma-separated)</span></label>
                                <input
                                  value={repsText}
                                  onChange={e => setRepsText(e.target.value)}
                                  onBlur={e => updateYear({ ...yr, reps: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                                  placeholder="Rep names"
                                  className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#43afde] bg-white"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {yr.addOns.length > 0 && (
                              <div><span className="text-xs text-gray-400">Add-ons: </span><span className="text-xs text-gray-700">{yr.addOns.join(", ")}</span></div>
                            )}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>DRI: <strong className="text-gray-700">{yr.dri}</strong></span>
                              <span>Reps: <strong className="text-gray-700">{yr.reps.join(", ") || "—"}</strong></span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeSection === "activity" && (
              <motion.div key="activity" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                <ActivityFeed resources={sponsor.resources} />
              </motion.div>
            )}

            {activeSection === "email" && (
              <motion.div key="email" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                <div className="p-6">
                  <EmailDrafterSection sponsor={sponsor} compact />
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
