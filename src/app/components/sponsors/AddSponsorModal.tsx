import { useEffect, useRef, useState } from "react";
import { X, Plus } from "lucide-react";
import { motion } from "motion/react";
import { STATUS_ORDER, ALL_DRIS } from "../../constants";
import type { Sponsor, SponsorStatus } from "../../types";

export function AddSponsorModal({ onAdd, onClose, initialCompany = "" }: {
  onAdd: (sponsor: Sponsor) => void;
  onClose: () => void;
  initialCompany?: string;
}) {
  const [company, setCompany] = useState(initialCompany);
  const [domain, setDomain] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [status, setStatus] = useState<SponsorStatus>("Prospect");
  const [dri, setDri] = useState(ALL_DRIS[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstInputRef.current?.focus(); }, []);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedCompany = company.trim();
    const trimmedDomain = domain.trim();
    if (!trimmedCompany) { setError("Company name is required."); return; }
    if (!trimmedDomain) { setError("Domain is required (e.g. acme.com) — used for the logo."); return; }

    const newSponsor: Sponsor = {
      id: "s-" + Date.now(),
      company: trimmedCompany,
      domain: trimmedDomain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase(),
      contact: {
        name: contactName.trim(),
        email: contactEmail.trim(),
        title: contactTitle.trim(),
      },
      years: [],
      historyKeyword: "New — added " + new Date().toISOString().slice(0, 10),
      status,
      notes: notes.trim(),
      lastBumpDate: new Date().toISOString().slice(0, 10),
      resources: [],
      aiSummary: "",
      recruiterFeedback: "",
      currentDri: dri,
    };
    onAdd(newSponsor);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]" onClick={onClose}>
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ type: "spring", stiffness: 420, damping: 38 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-[#43afde]" />
            <h2 className="text-base font-semibold text-gray-800">Add new sponsor</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="text-xs px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Company *">
              <input ref={firstInputRef} value={company} onChange={e => setCompany(e.target.value)}
                placeholder="Acme Inc." className={inputCls} />
            </Field>
            <Field label="Domain *">
              <input value={domain} onChange={e => setDomain(e.target.value)}
                placeholder="acme.com" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <select value={status} onChange={e => setStatus(e.target.value as SponsorStatus)} className={inputCls}>
                {STATUS_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="DRI">
              <select value={dri} onChange={e => setDri(e.target.value)} className={inputCls}>
                {ALL_DRIS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">Primary contact</div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name">
                <input value={contactName} onChange={e => setContactName(e.target.value)}
                  placeholder="Jane Doe" className={inputCls} />
              </Field>
              <Field label="Title">
                <input value={contactTitle} onChange={e => setContactTitle(e.target.value)}
                  placeholder="Head of DevRel" className={inputCls} />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Email">
                <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                  placeholder="jane@acme.com" className={inputCls} />
              </Field>
            </div>
          </div>

          <Field label="Notes">
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Anything worth remembering about this lead..."
              className={inputCls + " resize-none"} />
          </Field>
        </form>

        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} type="button"
            className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit"
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-[#43afde] hover:bg-[#3a9bc4] text-white rounded-lg transition-colors shadow-sm">
            <Plus size={14} />Add sponsor
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const inputCls = "w-full px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#43afde] focus:ring-2 focus:ring-[#43afde]/15 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold block mb-1">{label}</span>
      {children}
    </label>
  );
}
