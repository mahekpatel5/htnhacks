import { useState, useEffect, useRef, useCallback } from "react";
import { X, GripVertical, Sparkles, AlertTriangle, CheckCircle, Star } from "lucide-react";
import { STATUS_ORDER } from "../../constants";
import { isPipelineStatus, isOverdue, formatDate } from "../../utils/sponsors";
import { StatusBadge, TierBadge } from "./ui/Badges";
import { CompanyLogo } from "./ui/CompanyLogo";
import { ActivityFeed } from "./ActivityFeed";
import { EmailDrafterSection } from "./EmailDrafterSection";
import type { Sponsor, SponsorStatus } from "../../types";

export function CompanyDetailPanel({ sponsor, onClose, onUpdate }: {
  sponsor: Sponsor;
  onClose: () => void;
  onUpdate: (updated: Sponsor) => void;
}) {
  const [activeSection, setActiveSection] = useState<"overview" | "history" | "activity" | "email">("overview");
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(sponsor.notes);
  const [panelWidth, setPanelWidth] = useState(640);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const overdue = isPipelineStatus(sponsor.status) && isOverdue(sponsor.lastBumpDate);

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

  function setStatus(s: SponsorStatus) { onUpdate({ ...sponsor, status: s }); setEditingStatus(false); }
  function saveNotes() { onUpdate({ ...sponsor, notes }); setEditingNotes(false); }

  const sections = [
    { key: "overview", label: "Overview" },
    { key: "history", label: "History" },
    { key: "activity", label: "Activity" },
    { key: "email", label: "Draft Email" },
  ] as const;

  return (
    <div className="fixed inset-0 z-40 flex items-stretch justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex items-stretch" style={{ width: panelWidth }}>
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
                  {overdue && (
                    <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">
                      <AlertTriangle size={11} />Overdue bump
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={sponsor.status} />
                  <span className="text-xs text-gray-400">DRI: <strong className="text-gray-600">{sponsor.currentDri}</strong></span>
                  <span className="text-xs text-gray-400">Last bump: <strong className="text-gray-600">{formatDate(sponsor.lastBumpDate)}</strong></span>
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
            {activeSection === "overview" && (
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-br from-[#43afde]/10 to-purple-50 rounded-xl p-4 border border-[#43afde]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[#43afde]" />
                    <span className="text-xs font-semibold text-[#43afde] uppercase tracking-wide">AI Relationship Summary</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{sponsor.aiSummary}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Point of Contact</h3>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-[#43afde]/20 flex items-center justify-center text-sm font-bold text-[#43afde]">
                      {sponsor.contact.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{sponsor.contact.name}</div>
                      <div className="text-xs text-gray-500">{sponsor.contact.title}</div>
                      <a href={"mailto:" + sponsor.contact.email} className="text-xs text-[#43afde] hover:underline">{sponsor.contact.email}</a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Pipeline Status</h3>
                  {!editingStatus ? (
                    <div className="flex items-center gap-2">
                      <StatusBadge status={sponsor.status} />
                      <button onClick={() => setEditingStatus(true)} className="text-xs text-gray-400 hover:text-gray-600 underline">Change</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {STATUS_ORDER.map(s => (
                        <button key={s} onClick={() => setStatus(s)}
                          className={"flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all " + (sponsor.status === s ? "border-[#43afde] bg-[#43afde]/10" : "border-gray-200 hover:border-gray-300")}>
                          <span className="text-gray-700 text-xs">{s}</span>
                          {sponsor.status === s && <CheckCircle size={12} className="text-[#43afde]" />}
                        </button>
                      ))}
                      <button onClick={() => setEditingStatus(false)} className="col-span-2 text-xs text-gray-400 text-center py-1 hover:text-gray-600">Cancel</button>
                    </div>
                  )}
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

                {sponsor.recruiterFeedback && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Recruiter Feedback</h3>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">{sponsor.recruiterFeedback}</p>
                  </div>
                )}
              </div>
            )}

            {activeSection === "history" && (
              <div className="p-6 space-y-4">
                {sponsor.years.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Star size={28} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No prior sponsorship years on record.</p>
                  </div>
                ) : [...sponsor.years].sort((a, b) => b.year - a.year).map(yr => (
                  <div key={yr.year} className="border border-gray-100 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">{yr.year}</span>
                      <TierBadge tier={yr.tier} />
                    </div>
                    {yr.addOns.length > 0 && (
                      <div><span className="text-xs text-gray-400">Add-ons: </span><span className="text-xs text-gray-700">{yr.addOns.join(", ")}</span></div>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>DRI: <strong className="text-gray-700">{yr.dri}</strong></span>
                      <span>Reps: <strong className="text-gray-700">{yr.reps.join(", ")}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "activity" && (
              <ActivityFeed resources={sponsor.resources} />
            )}

            {activeSection === "email" && (
              <div className="p-6">
                <EmailDrafterSection sponsor={sponsor} compact />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
