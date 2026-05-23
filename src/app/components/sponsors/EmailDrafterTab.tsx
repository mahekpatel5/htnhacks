import { useState } from "react";
import { isPipelineStatus, isOverdue } from "../../utils/sponsors";
import { StatusBadge, OverdueDot } from "./ui/Badges";
import { CompanyLogo } from "./ui/CompanyLogo";
import { EmailDrafterSection } from "./EmailDrafterSection";
import type { Sponsor } from "../../types";

export function EmailDrafterTab({ sponsors }: { sponsors: Sponsor[] }) {
  const [selectedId, setSelectedId] = useState<string>(sponsors[0]?.id ?? "");
  const selectedSponsor = sponsors.find(s => s.id === selectedId) ?? null;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-60 border-r border-gray-100 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Select Sponsor</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {sponsors.map(s => {
            const overdue = isPipelineStatus(s.status) && isOverdue(s.lastBumpDate);
            return (
              <button key={s.id} onClick={() => setSelectedId(s.id)}
                className={"w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors " + (selectedId === s.id ? "bg-[#43afde]/10 border-r-2 border-[#43afde]" : "hover:bg-gray-50")}>
                <CompanyLogo domain={s.domain} company={s.company} size={24} />
                {overdue && <OverdueDot />}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{s.company}</div>
                  <div className="mt-0.5"><StatusBadge status={s.status} /></div>
                </div>
              </button>
            );
          })}
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
