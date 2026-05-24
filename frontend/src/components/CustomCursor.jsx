import { useEffect, useRef } from "react";
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const enter = (e) => {
      const t = e.target;
      if (t.closest('a,button,[role="button"],input,select,textarea,[data-cursor-hover]')) {
        ring.classList.add("is-active");
      }
    };
    const leave = (e) => {
      const t = e.target;
      if (t.closest('a,button,[role="button"],input,select,textarea,[data-cursor-hover]')) {
        ring.classList.remove("is-active");
      }
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", enter, true);
    document.addEventListener("mouseout", leave, true);
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", enter, true);
      document.removeEventListener("mouseout", leave, true);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);
  return (
    <>
      <style>{`
        html.has-custom-cursor, html.has-custom-cursor * { cursor: none !important; }
        @media (pointer: coarse) { html.has-custom-cursor, html.has-custom-cursor * { cursor: auto !important; } }
        .oc-cursor-ring { transition: width .2s ease, height .2s ease, background-color .2s ease, border-color .2s ease; }
        .oc-cursor-ring.is-active { background-color: color-mix(in oklab, var(--gold) 18%, transparent); border-color: var(--gold); }
      `}</style>
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 z-[400] w-1.5 h-1.5 rounded-full bg-gold pointer-events-none"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="oc-cursor-ring hidden md:block fixed top-0 left-0 z-[400] w-8 h-8 rounded-full border border-navy/40 pointer-events-none"
        aria-hidden
      />
    </>
  );
}
export { CustomCursor };
