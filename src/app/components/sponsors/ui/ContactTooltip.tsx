import { useState, type ReactNode } from "react";

export function ContactTooltip({ label, children }: { label: string; children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none flex flex-col items-center"
        >
          <span className="px-2.5 py-1.5 text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-md shadow-sm whitespace-nowrap max-w-[220px] text-center leading-snug">
            {label}
          </span>
          <span
            className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-200 -mt-px"
            aria-hidden
          />
          <span
            className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-100 -mt-[7px]"
            aria-hidden
          />
        </span>
      )}
    </span>
  );
}
