import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useEnquiry } from "@/components/EnquiryProvider";
import { BRAND, waLink } from "@/lib/constants";
import { preloadFrames } from "./framePreloader";
import { useResponsiveCanvas } from "./useResponsiveCanvas";
import { useFrameSequence } from "./useFrameSequence";
import { BUILDERS } from "@/data/projects";

const FRAME_COUNT = 241;
const getFramePath = (index) => `/frames/frame_${String(index).padStart(4, "0")}.webp`;

export function HeroSequence() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const { open } = useEnquiry();

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Use a ref for the render function to avoid dependency cycles in the resize hook
  const renderCurrentFrameRef = useRef(null);
  const canvasRef = useResponsiveCanvas(renderCurrentFrameRef);

  const { drawFrame } = useFrameSequence(imagesRef, canvasRef, FRAME_COUNT, containerRef, loaded);

  // Update the render ref whenever drawFrame changes or loaded changes
  useEffect(() => {
    if (loaded && drawFrame) {
      renderCurrentFrameRef.current = () => {
        // Redraw current frame on resize (approximation, GSAP playhead maintains actual frame)
        // Let's just redraw frame 0 or rely on requestAnimationFrame doing its job.
        // requestAnimationFrame is running, so we don't strictly need to force a synchronous drawFrame here
        // unless the animation loop is paused.
      };
    }
  }, [loaded, drawFrame]);

  // Preload frames
  useEffect(() => {
    let isMounted = true;

    preloadFrames(FRAME_COUNT, getFramePath, (p) => {
      if (isMounted) setProgress(p);
    }).then((images) => {
      if (!isMounted) return;
      imagesRef.current = images;
      setLoaded(true);

      // Draw first frame immediately
      if (drawFrame) drawFrame(0);
    });

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Cinematic GSAP Reveal for Text
  useEffect(() => {
    if (!loaded) return;

    let st = null;
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const textElements = containerRef.current?.querySelectorAll(".hero-text-reveal");
        if (textElements?.length) {
          st = gsap.fromTo(
            textElements,
            { y: 50, opacity: 0, filter: "blur(10px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "top 20%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    });

    return () => {
      if (st && st.scrollTrigger) {
        st.scrollTrigger.kill();
      }
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className="hero-frame-container" id="hero-cinematic">
      <div className="hero-frame-spacer">
        <div className="hero-frame-sticky">
          <canvas
            ref={canvasRef}
            className="hero-frame-canvas block w-full h-full object-cover"
            style={{ display: "block" }}
            aria-hidden="true"
          />

          <div className="hero-frame-overlay" />
          <div className="hero-frame-vignette" />

          {/* Minimal Loader */}
          {!loaded && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-navy animate-pulse">
                Loading
              </span>
            </div>
          )}

          <div
            className="hero-frame-content absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease" }}
          >
            <div className="hero-frame-content-inner text-center pointer-events-auto px-5 w-full max-w-5xl">
              <h1 className="hero-text-reveal hero-title font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.1] mb-6">
                Find Your <span className="hero-title-accent text-gold italic pr-2">Perfect</span>
                <br />
                Property in Chennai
              </h1>

              <p className="hero-text-reveal hero-subtitle text-white/70 text-lg sm:text-xl max-w-[800px] mx-auto mb-10 leading-relaxed font-light">
                Trusted channel partner for{" "}
                <span className="hero-highlight text-white font-medium">{BUILDERS.length}+ premium builders</span>{" "}
                since {BRAND.founded}. RERA-verified projects.
                <br className="hidden sm:inline" />
                Zero brokerage confusion. End-to-end support.
              </p>

              <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/projects"
                  className="hero-cta hero-cta-primary h-14 px-8 rounded-full bg-gold text-gold-foreground font-semibold flex items-center justify-center gap-2 hover:bg-white transition-colors"
                  id="hero-explore-btn"
                >
                  Explore Projects →
                </Link>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta hero-cta-whatsapp h-14 px-8 rounded-full bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition-colors"
                  id="hero-whatsapp-btn"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .03 5.34.03 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.49C18.66 23.86 24 18.52 24 11.97c0-3.2-1.25-6.21-3.48-8.49Z" />
                  </svg>
                  WhatsApp Us Now
                </a>
                <button
                  onClick={() => open({ source: "hero" })}
                  className="hero-cta hero-cta-outline h-14 px-8 rounded-full border border-white/20 text-white font-semibold flex items-center justify-center hover:bg-white/10 transition-colors"
                  id="hero-consult-btn"
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
