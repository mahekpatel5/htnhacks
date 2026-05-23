import { useState } from "react";
import { List, LayoutGrid as GridIcon, FileText, ExternalLink } from "lucide-react";
import { RESOURCE_ICONS, RESOURCE_COLORS, RESOURCE_ICON_COLORS, FILE_TYPE_PREVIEW } from "../../constants";
import { formatDate } from "../../utils/sponsors";
import type { LinkedResource } from "../../types";

export function ActivityFeed({ resources }: { resources: LinkedResource[] }) {
  const [view, setView] = useState<"timeline" | "files">("timeline");
  const sorted = [...resources].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {resources.length} item{resources.length !== 1 ? "s" : ""}
        </h3>
        <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => setView("timeline")}
            className={"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors " + (view === "timeline" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <List size={12} /> Timeline
          </button>
          <button
            onClick={() => setView("files")}
            className={"flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors " + (view === "files" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <GridIcon size={12} /> Files
          </button>
        </div>
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <FileText size={28} className="mx-auto mb-2 opacity-20" />
          <p className="text-sm">No activity yet.</p>
        </div>
      )}

      {view === "timeline" && resources.length > 0 && (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-100" />
          <div className="space-y-1">
            {sorted.map(r => {
              const Icon = RESOURCE_ICONS[r.type] || FileText;
              const iconColor = RESOURCE_ICON_COLORS[r.type] || "text-gray-400";
              return (
                <div key={r.id} className="relative flex gap-4 pl-10 pb-5">
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    <Icon size={9} className={iconColor} />
                  </div>
                  <div className={"flex-1 rounded-xl p-3 border " + (RESOURCE_COLORS[r.type] || "bg-gray-50 border-gray-100")}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <a href={r.url} className="text-sm font-medium text-[#43afde] hover:underline flex items-center gap-1">
                        {r.label}<ExternalLink size={11} />
                      </a>
                      <span className="text-xs text-gray-400 shrink-0">{formatDate(r.date)}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "files" && resources.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {sorted.map(r => {
            const meta = FILE_TYPE_PREVIEW[r.type] || FILE_TYPE_PREVIEW.meeting;
            const Icon = meta.icon;
            const iconColor = RESOURCE_ICON_COLORS[r.type] || "text-gray-400";
            return (
              <a key={r.id} href={r.url} className="group block border border-gray-200 rounded-xl overflow-hidden hover:border-[#43afde]/40 hover:shadow-md transition-all">
                <div className={"h-24 " + meta.bg + " flex flex-col items-center justify-center gap-2 relative"}>
                  <div className="w-10 h-10 rounded-xl bg-white/80 shadow-sm flex items-center justify-center">
                    <Icon size={20} className={iconColor} />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{meta.label}</span>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-lg p-1 shadow-sm">
                      <ExternalLink size={11} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-1 mb-1">{r.label}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{r.summary}</p>
                  <p className="text-xs text-gray-300 mt-1.5">{formatDate(r.date)}</p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
