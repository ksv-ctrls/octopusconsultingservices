import { useEffect, useRef } from "react";

export function useResponsiveCanvas(renderFnRef) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimer;
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      if (renderFnRef.current) {
        renderFnRef.current();
      }
    };

    const throttledResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    handleResize(); // Initial resize
    window.addEventListener("resize", throttledResize);

    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(resizeTimer);
    };
  }, [renderFnRef]);

  return canvasRef;
}
