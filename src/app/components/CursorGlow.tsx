import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (el) el.style.opacity = "1";
    }
    function onLeave() {
      if (el) el.style.opacity = "0";
    }
    function tick() {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      if (el) el.style.transform = "translate3d(" + (x - 110) + "px, " + (y - 110) + "px, 0)";
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] h-[220px] w-[220px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(67,175,222,0.18) 0%, rgba(67,175,222,0.08) 35%, rgba(67,175,222,0) 70%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
