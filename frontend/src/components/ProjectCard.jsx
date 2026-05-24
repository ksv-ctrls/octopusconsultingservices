import { useState } from "react";
import { formatBhk, formatPriceRange } from "@/data/projects";
import { useEnquiry } from "./EnquiryProvider";

function ProjectCard({ p }) {
  const { open } = useEnquiry();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isPriority = [
    "SPR City",
    "Casagrand",
    "Ampa Taj",
    "Urbanrise",
    "Brigade"
  ].some(b => p.builder.startsWith(b));

  return (
    <article className={`luxe-card shimmer-border overflow-hidden flex flex-col group bg-card shadow-md hover:translate-y-[-6px] transition-all duration-500 rounded-xl border ${
      isPriority 
        ? "border-gold/45 hover:border-gold hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.25)]" 
        : "border-border hover:shadow-luxe"
    }`}>
      {/* Premium Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        
        {/* Shimmering Skeleton Loader */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-slate-100 to-surface animate-shimmer" 
               style={{ backgroundSize: "200% 100%" }} />
        )}

        {/* Real Image with Lazy Loading & Transition */}
        {!error ? (
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        ) : (
          /* Graceful Fallback Placeholder */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-slate-800 text-white p-6 overflow-hidden">
            <div className="absolute inset-0 opacity-25" style={{
              backgroundImage: "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.3), transparent 60%), radial-gradient(circle at 80% 80%, rgba(86,204,242,0.15), transparent 60%)"
            }} />
            <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen" preserveAspectRatio="none">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x={10 + i * 15}
                  y={40 + (i % 4) * 8}
                  width="12"
                  height={80 - (i % 4) * 8}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
            <div className="relative text-center z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-royal-gold font-medium block">Octopus Showcase</span>
              <span className="font-display text-sm font-light text-white/80">{p.builder}</span>
            </div>
          </div>
        )}

        {/* Glassmorphic Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

        {/* Glassmorphic Builder Badge */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#1F2937] text-[10px] uppercase tracking-[0.15em] font-semibold px-3 py-1.5 rounded-md border border-white/20 shadow-sm z-10">
          {p.builder}
        </div>

        {/* Signature Gold Badge */}
        {isPriority && (
          <div className="absolute top-4 right-4 bg-gradient-gold text-white text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1.5 rounded-md shadow-md shadow-gold/25 z-10">
            ★ Signature
          </div>
        )}

        {/* Premium Gold Price Badge */}
        <div className="absolute bottom-4 right-4 bg-gradient-gold text-white text-xs font-semibold px-3.5 py-2 rounded-md shadow-md shadow-gold/20 z-10">
          {formatPriceRange(p)}
        </div>
      </div>

      {/* Info Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="font-display text-lg text-navy font-semibold leading-snug group-hover:text-ocean-blue transition-colors duration-300">
            {p.name}
          </h3>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-sans font-light">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="text-royal-gold shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {p.location}
          </p>
          
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-surface border border-border text-navy/70 font-medium">
              {formatBhk(p.bhk)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() =>
            open({
              projectId: p.id,
              projectName: p.name,
              source: `project-${p.id}`,
              title: "Enquire Now",
            })
          }
          className={`mt-6 w-full py-3 font-semibold uppercase tracking-wider text-xs rounded-lg transition-all duration-300 block text-center border ${
            isPriority 
              ? "bg-gradient-gold text-gold-foreground border-transparent hover:shadow-lg hover:shadow-gold/20 hover:scale-[1.01]"
              : "border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white hover:shadow-lg hover:shadow-ocean-blue/15"
          }`}
        >
          Enquire Now
        </button>
      </div>
    </article>
  );
}

export { ProjectCard };
