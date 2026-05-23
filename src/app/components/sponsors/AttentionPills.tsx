import { useEffect, useRef, useState } from "react";
import { Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { daysSince, CONTACT_INDICATOR_TOOLTIPS, sponsorsWithAttentionState } from "../../utils/sponsors";
import { CompanyLogo } from "./ui/CompanyLogo";
import type { ContactAttentionState, Sponsor } from "../../types";

const PILL_CONFIG: Record<ContactAttentionState, {
  dotClass: string;
  pillClass: string;
  countLabel: (n: number) => string;
}> = {
  unread: {
    dotClass: "bg-blue-500",
    pillClass: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100/80",
    countLabel: n => n + " unread email" + (n === 1 ? "" : "s"),
  },
  read_unanswered: {
    dotClass: "bg-yellow-200 ring-1 ring-yellow-300/80",
    pillClass: "bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100/80",
    countLabel: n => n + " awaiting repl" + (n === 1 ? "y" : "ies"),
  },
  overdue: {
    dotClass: "bg-red-500",
    pillClass: "bg-red-50 border-red-200 text-red-600 hover:bg-red-100/80",
    countLabel: n => n + " overdue contact" + (n === 1 ? "" : "s"),
  },
};

function AttentionDropdown({
  state,
  sponsors,
  onSelectCompany,
  onDraftEmail,
  onClose,
}: {
  state: ContactAttentionState;
  sponsors: Sponsor[];
  onSelectCompany: (id: string) => void;
  onDraftEmail: (id: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const items = sponsorsWithAttentionState(sponsors, state);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-1.5 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
        <p className="text-xs font-semibold text-gray-600">{CONTACT_INDICATOR_TOOLTIPS[state]}</p>
      </div>
      {items.length === 0 ? (
        <p className="px-4 py-6 text-center text-xs text-gray-400">None right now</p>
      ) : (
        <ul className="max-h-72 overflow-y-auto py-1">
          {items.map(s => (
            <AttentionListItem
              key={s.id}
              sponsor={s}
              onSelect={() => { onSelectCompany(s.id); onClose(); }}
              onDraftEmail={() => { onDraftEmail(s.id); onClose(); }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function AttentionListItem({
  sponsor,
  onSelect,
  onDraftEmail,
}: {
  sponsor: Sponsor;
  onSelect: () => void;
  onDraftEmail: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={onSelect}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors pr-28"
      >
        <CompanyLogo domain={sponsor.domain} company={sponsor.company} size={28} />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-800 truncate group-hover:underline">{sponsor.company}</div>
          <div className="text-xs text-gray-400 mt-0.5">Last contact {daysSince(sponsor.lastBumpDate)}d ago</div>
        </div>
      </button>
      {hovered && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onDraftEmail(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#43afde] bg-[#43afde]/10 border border-[#43afde]/30 rounded-md hover:bg-[#43afde]/20 transition-colors shrink-0"
        >
          <Mail size={11} />
          Draft email
        </button>
      )}
    </li>
  );
}

function AttentionPill({
  state,
  count,
  sponsors,
  isOpen,
  onToggle,
  onClose,
  onSelectCompany,
  onDraftEmail,
}: {
  state: ContactAttentionState;
  count: number;
  sponsors: Sponsor[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelectCompany: (id: string) => void;
  onDraftEmail: (id: string) => void;
}) {
  const config = PILL_CONFIG[state];
  if (count === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={"flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-xs font-medium transition-colors " + config.pillClass + (isOpen ? " ring-2 ring-offset-1 ring-gray-300/60" : "")}
      >
        <span className={"inline-block w-2 h-2 rounded-full shrink-0 " + config.dotClass} />
        {config.countLabel(count)}
        <ChevronDown size={12} className={"opacity-60 transition-transform " + (isOpen ? "rotate-180" : "")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ type: "spring", stiffness: 420, damping: 38 }}
          >
            <AttentionDropdown
              state={state}
              sponsors={sponsors}
              onSelectCompany={onSelectCompany}
              onDraftEmail={onDraftEmail}
              onClose={onClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AttentionPills({
  sponsors,
  openState,
  onToggle,
  onClose,
  onSelectCompany,
  onDraftEmail,
}: {
  sponsors: Sponsor[];
  openState: ContactAttentionState | null;
  onToggle: (state: ContactAttentionState) => void;
  onClose: () => void;
  onSelectCompany: (id: string) => void;
  onDraftEmail: (id: string) => void;
}) {
  const states: ContactAttentionState[] = ["unread", "read_unanswered", "overdue"];

  return (
    <div className="flex items-center gap-2">
      {states.map(state => (
        <AttentionPill
          key={state}
          state={state}
          count={sponsorsWithAttentionState(sponsors, state).length}
          sponsors={sponsors}
          isOpen={openState === state}
          onToggle={() => onToggle(state)}
          onClose={onClose}
          onSelectCompany={onSelectCompany}
          onDraftEmail={onDraftEmail}
        />
      ))}
    </div>
  );
}
