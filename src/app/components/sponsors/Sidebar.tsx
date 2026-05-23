import { LayoutGrid, Building2, Inbox, Users, Settings, LogOut, MoreHorizontal } from "lucide-react";

const NAV_ITEMS = [
  { id: "quests", label: "Quests", icon: LayoutGrid },
  { id: "sponsors", label: "Sponsors", icon: Building2 },
  { id: "store", label: "Store", icon: Inbox },
  { id: "hackers", label: "Hackers", icon: Users },
];

export function Sidebar({ activeNav, onNav }: { activeNav: string; onNav: (id: string) => void }) {
  return (
    <div className="w-[220px] shrink-0 bg-[#f3f4f6] border-r border-gray-200 flex flex-col h-full">
      <div className="px-4 pt-5 pb-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Goose Games</p>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = activeNav === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              className={"w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors " + (active ? "bg-[#43afde] text-white shadow-sm" : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-800")}>
              <Icon size={16} />{item.label}
            </button>
          );
        })}
      </nav>
      <div className="px-3 pb-4 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200/70 transition-colors">
          <Settings size={15} />Settings
        </button>
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200/70 transition-colors">
          <LogOut size={15} />Sign out
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1 border-t border-gray-200">
          <div className="w-7 h-7 rounded-full bg-[#43afde] flex items-center justify-center text-white text-xs font-bold">J</div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">Jessica Zhang</p>
            <p className="text-[10px] text-gray-400">Organizer</p>
          </div>
          <MoreHorizontal size={14} className="text-gray-400 ml-auto" />
        </div>
      </div>
    </div>
  );
}
