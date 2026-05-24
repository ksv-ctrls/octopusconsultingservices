import { useEffect, useRef } from "react";
function useReveal(opts) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            if (opts?.once !== false) io.unobserve(e.target);
          }
        }
      },
      { threshold: opts?.threshold ?? 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts?.threshold, opts?.once]);
  return ref;
}
export { useReveal };
