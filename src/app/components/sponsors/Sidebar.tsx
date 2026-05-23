import {
  Building2,
  Clock,
  Calendar,
  Ticket,
  Users,
  Share2,
  Home,
  ClipboardList,
  ClipboardCheck,
  UserCircle,
  Settings,
  LogOut,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

type NavItem = { id: string; label: string; icon: LucideIcon };

const TOP_NAV: NavItem[] = [
  { id: "sponsors", label: "Sponsors", icon: Building2 },
  { id: "live-status", label: "Live Status", icon: Clock },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "ticket", label: "Ticket", icon: Ticket },
  { id: "mentorship", label: "Mentorship", icon: Users },
  { id: "networking", label: "Networking", icon: Share2 },
];

const MENTORSHIP_NAV: NavItem[] = [
  { id: "mentor-home", label: "Mentor Home", icon: Home },
  { id: "open-requests", label: "Open Requests", icon: ClipboardList },
  { id: "claimed-requests", label: "Claimed Requests", icon: ClipboardCheck },
  { id: "shifts", label: "Shifts", icon: ClipboardList },
  { id: "mentor-shift-schedule", label: "Shift Schedule", icon: Calendar },
  { id: "my-profile", label: "My Profile", icon: UserCircle },
];

const HTN_LOGO_URL = "https://my.hackthenorth.com/static/media/logo.35e1c612.svg";

const VOLUNTEER_NAV: NavItem[] = [
  { id: "volunteer-home", label: "Volunteer Home", icon: Home },
  { id: "volunteer-shift-schedule", label: "Shift Schedule", icon: Calendar },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="px-3 pt-4 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
      {children}
    </p>
  );
}

function NavButton({
  item,
  active,
  onNav,
}: {
  item: NavItem;
  active: boolean;
  onNav: (id: string) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onNav(item.id)}
      className={
        "w-full relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors " +
        (active ? "text-white" : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-800")
      }
    >
      {active && (
        <motion.div
          layoutId="sidebar-active-bg"
          className="absolute inset-0 bg-[#43afde] rounded-lg shadow-sm"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        <Icon size={16} />
        {item.label}
      </span>
    </button>
  );
}

export function Sidebar({ activeNav, onNav }: { activeNav: string; onNav: (id: string) => void }) {
  return (
    <div className="w-[220px] shrink-0 bg-[#f3f4f6] border-r border-gray-200 flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <img
          src={HTN_LOGO_URL}
          alt="Hack the North"
          className="w-8 h-8 shrink-0 object-contain"
        />
        <p className="text-sm font-bold text-gray-800 leading-tight">Organizer Dashboard</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {TOP_NAV.map(item => (
          <NavButton key={item.id} item={item} active={activeNav === item.id} onNav={onNav} />
        ))}

        <SectionLabel>MENTORSHIP</SectionLabel>
        {MENTORSHIP_NAV.map(item => (
          <NavButton key={item.id} item={item} active={activeNav === item.id} onNav={onNav} />
        ))}

        <SectionLabel>VOLUNTEER</SectionLabel>
        {VOLUNTEER_NAV.map(item => (
          <NavButton key={item.id} item={item} active={activeNav === item.id} onNav={onNav} />
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-0.5 shrink-0">
        <button
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200/70 transition-colors"
        >
          <Settings size={15} />
          Settings
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200/70 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1 border-t border-gray-200">
          <div className="w-7 h-7 rounded-full bg-[#43afde] flex items-center justify-center text-white text-xs font-bold shrink-0">
            AA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-700 truncate">Aaryn Xie</p>
            <p className="text-[10px] text-gray-400">Organizer</p>
          </div>
          <MoreHorizontal size={14} className="text-gray-400 shrink-0" />
        </div>
      </div>
    </div>
  );
}
