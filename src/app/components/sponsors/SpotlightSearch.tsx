import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Building2, Users, PenLine, FileText, ArrowRight, Plus } from "lucide-react";
import type { Sponsor, SearchResult } from "../../types";

function buildSearchIndex(sponsors: Sponsor[]): SearchResult[] {
  const results: SearchResult[] = [];
  for (const s of sponsors) {
    results.push({ sponsorId: s.id, company: s.company, label: s.company, detail: s.status, type: "status" });
    for (const c of s.contacts) {
      results.push({ sponsorId: s.id, company: s.company, label: c.name, detail: c.email, type: "contact" });
    }
    if (s.notes) results.push({ sponsorId: s.id, company: s.company, label: "Note", detail: s.notes.slice(0, 80), type: "note" });
    for (const r of s.resources) {
      results.push({ sponsorId: s.id, company: s.company, label: r.label, detail: r.summary.slice(0, 80), type: "resource" });
    }
  }
  return results;
}

const TYPE_ICON: Record<string, typeof Search> = {
  status: Building2, contact: Users, note: PenLine, resource: FileText,
};

export function SpotlightSearch({ sponsors, onSelect, onClose, onCreateSponsor }: {
  sponsors: Sponsor[];
  onSelect: (id: string) => void;
  onClose: () => void;
  onCreateSponsor?: (companyName: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildSearchIndex(sponsors), [sponsors]);
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.filter(r =>
      r.label.toLowerCase().includes(q) || r.detail.toLowerCase().includes(q) || r.company.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, index]);

  const trimmedQuery = query.trim();
  const showCreate = Boolean(trimmedQuery && results.length === 0 && onCreateSponsor);
  const itemCount = results.length + (showCreate ? 1 : 0);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setCursor(0); }, [results, showCreate]);

  function handleCreate() {
    if (!onCreateSponsor || !trimmedQuery) return;
    onCreateSponsor(trimmedQuery);
    onClose();
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor(c => Math.min(c + 1, itemCount - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === "Enter") {
      if (showCreate && cursor === results.length) handleCreate();
      else if (results[cursor]) { onSelect(results[cursor].sponsorId); onClose(); }
    }
    if (e.key === "Escape") onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} onKeyDown={handleKey}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search sponsors, contacts, notes, resources..."
            className="flex-1 text-base outline-none text-gray-800 placeholder:text-gray-400 bg-transparent"
          />
          <kbd className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">ESC</kbd>
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((r, i) => {
              const Icon = TYPE_ICON[r.type] || FileText;
              return (
                <button key={i} className={"w-full flex items-start gap-3 px-5 py-3 text-left transition-colors " + (i === cursor ? "bg-[#43afde]/10" : "hover:bg-gray-50")}
                  onClick={() => { onSelect(r.sponsorId); onClose(); }} onMouseEnter={() => setCursor(i)}>
                  <Icon size={15} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#43afde]">{r.company}</span>
                      <span className="text-sm text-gray-800 truncate">{r.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{r.detail}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 shrink-0 mt-1 ml-auto" />
                </button>
              );
            })}
          </div>
        )}
        {showCreate && (
          <div className="py-2 border-t border-gray-100">
            <p className="px-5 pt-2 pb-1 text-center text-gray-400 text-sm">No results for &ldquo;{trimmedQuery}&rdquo;</p>
            <button
              type="button"
              className={"w-full flex items-center gap-3 px-5 py-3 text-left transition-colors " + (cursor === results.length ? "bg-[#43afde]/10" : "hover:bg-gray-50")}
              onClick={handleCreate}
              onMouseEnter={() => setCursor(results.length)}
            >
              <Plus size={15} className="text-[#43afde] shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-sm text-gray-800">
                  Create <span className="font-semibold text-[#43afde]">{trimmedQuery}</span> as a new sponsor
                </span>
                <p className="text-xs text-gray-400 mt-0.5">Add a new entry to the database</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 shrink-0" />
            </button>
          </div>
        )}
        {!query && <div className="px-5 py-6 text-center text-gray-400 text-sm">Start typing to search across all sponsors, contacts, and conversations</div>}
      </div>
    </div>
  );
}
