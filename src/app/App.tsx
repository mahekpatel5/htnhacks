import { useState } from "react";
import { Hash } from "lucide-react";
import { Sidebar } from "./components/sponsors/Sidebar";
import { SponsorsView } from "./components/sponsors/SponsorsView";
import { CursorGlow } from "./components/CursorGlow";

export default function App() {
  const [activeNav, setActiveNav] = useState("sponsors");
  return (
    <div className="flex h-screen bg-white font-[Plus_Jakarta_Sans,sans-serif]">
      <CursorGlow />
      <Sidebar activeNav={activeNav} onNav={setActiveNav} />
      <main className="flex-1 overflow-hidden">
        {activeNav === "sponsors" ? (
          <SponsorsView />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Hash size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm capitalize">{activeNav.replace(/-/g, " ")}</p>
              <p className="text-xs mt-1 text-gray-300">Coming soon</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
