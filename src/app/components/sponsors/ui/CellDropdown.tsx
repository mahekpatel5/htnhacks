import { useState, useEffect, useRef } from "react";
import { Edit3, CheckCircle } from "lucide-react";

export function CellDropdown<T extends string>({
  value, options, onSelect, renderOption, renderValue,
}: {
  value: T;
  options: T[];
  onSelect: (v: T) => void;
  renderOption?: (v: T) => React.ReactNode;
  renderValue?: (v: T) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
    >
      <div className="flex items-center gap-1 cursor-pointer group">
        {renderValue ? renderValue(value) : <span className="text-xs text-gray-600">{value}</span>}
        <Edit3 size={10} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[160px] py-1 max-h-64 overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt}
              onClick={e => { e.stopPropagation(); onSelect(opt); setOpen(false); }}
              className={"w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50 " + (opt === value ? "bg-[#43afde]/5" : "")}
            >
              {renderOption ? renderOption(opt) : <span className="text-gray-700">{opt}</span>}
              {opt === value && <CheckCircle size={12} className="text-[#43afde] shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
