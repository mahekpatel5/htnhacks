import { useState, useRef, useLayoutEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function ContactTooltip({ label, children }: { label: string; children: ReactNode }) {
  const [show, setShow] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!show || !anchorRef.current) return;

    function updatePosition() {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [show]);

  const tooltip =
    show &&
    createPortal(
      <div
        role="tooltip"
        className="fixed z-[9999] pointer-events-none flex flex-col items-center"
        style={{
          top: coords.top,
          left: coords.left,
          transform: "translate(-50%, calc(-100% - 6px))",
        }}
      >
        <span className="px-2.5 py-1.5 text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-md shadow-lg whitespace-nowrap max-w-[220px] text-center leading-snug">
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
      </div>,
      document.body,
    );

  return (
    <span
      ref={anchorRef}
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {tooltip}
    </span>
  );
}
