import { useEffect, useRef, useCallback } from "react";

export function useFrameSequence(imagesRef, canvasRef, frameCount, triggerRef, isLoaded) {
  const currentFrameRef = useRef(0);
  const animFrameRef = useRef(0);

  const drawFrame = useCallback(
    (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      // Ensure smoothing is enabled
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [canvasRef, imagesRef],
  );

  const renderLoop = useCallback(() => {
    let displayFrame = currentFrameRef.current;

    const render = () => {
      const target = currentFrameRef.current;
      displayFrame += (target - displayFrame) * 0.12;
      const rounded = Math.round(displayFrame);
      drawFrame(rounded);
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, [drawFrame]);

  useEffect(() => {
    if (!isLoaded || !triggerRef.current || imagesRef.current.length === 0) return;

    let gsapInstance = null;
    let scrollTriggerInstance = null;
    let st = null;

    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsapInstance = gsap;
        scrollTriggerInstance = ScrollTrigger;

        const playhead = { frame: 0 };

        st = gsap.to(playhead, {
          frame: frameCount - 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            currentFrameRef.current = playhead.frame;
          },
        });

        renderLoop();
      });
    });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (st) st.kill();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.getAll().forEach((t) => t.kill());
      }
    };
  }, [isLoaded, frameCount, renderLoop, triggerRef, imagesRef]);

  return { drawFrame };
}
