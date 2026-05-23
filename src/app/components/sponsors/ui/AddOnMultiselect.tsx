import { useState, useEffect, useRef, useMemo } from "react";
import { Edit3, Check } from "lucide-react";
import { ADD_ON_OPTIONS } from "../../../constants";
import { normalizeAddOns, type AddOnOption } from "../../../utils/addOns";

export function AddOnMultiselect({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (addOns: AddOnOption[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const canonicalSelected = useMemo(() => normalizeAddOns(selected), [selected]);
  const selectedSet = new Set(canonicalSelected);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function toggle(option: AddOnOption) {
    if (selectedSet.has(option)) {
      onChange(canonicalSelected.filter(a => a !== option));
    } else {
      onChange([...canonicalSelected, option]);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-start gap-1 cursor-pointer group text-left w-full"
      >
        <div className="flex flex-wrap gap-1 min-h-[1.25rem] flex-1">
          {canonicalSelected.length > 0 ? (
            canonicalSelected.map(a => (
              <span key={a} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {a}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">None</span>
          )}
        </div>
        <Edit3 size={10} className="text-gray-300 group-hover:text-gray-500 transition-colors mt-0.5 shrink-0" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[220px] py-1">
          {ADD_ON_OPTIONS.map(option => {
            const checked = selectedSet.has(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className={"w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 " + (checked ? "bg-[#43afde]/5" : "")}
              >
                <div
                  className={
                    "w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 " +
                    (checked ? "bg-[#43afde] border-[#43afde]" : "border-gray-300")
                  }
                >
                  {checked && <Check size={9} className="text-white" />}
                </div>
                <span className="text-xs text-gray-700">{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
