import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HeroSequence } from "@/components/hero/HeroSequence";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS, BUILDERS } from "@/data/projects";
import { useEnquiry } from "@/components/EnquiryProvider";
import { BRAND, waLink } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Octopus Consulting — Chennai's Leading Real Estate Consultant" },
      {
        name: "description",
        content:
          `Find your perfect property in Chennai. Trusted channel partner for ${BUILDERS.length}+ premium builders since 2009. RERA-verified projects, transparent pricing.`,
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSequence />
      <BuilderMarquee />
      <Stats />
      <WhyUs />
      <Featured />
      <HowItWorks />
      <CtaBanner />
    </>
  );
}

function BuilderMarquee() {
  const items = [...BUILDERS, ...BUILDERS];
  const priorityBuilders = ["SPR City", "Casagrand", "Ampa Taj Skyview", "Urbanrise", "Brigade Groups"];

  return (
    <section className="py-10 bg-surface border-y border-border overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
        Our Builder Partners
      </p>
      <div
        className="flex gap-12 animate-marquee whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {items.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className={
              "font-display text-xl sm:text-2xl transition-all duration-300 " +
              (priorityBuilders.includes(b)
                ? "text-royal-gold font-bold scale-105"
                : "text-navy/40 hover:text-royal-gold")
            }
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

function Counter({ to, suffix = "+" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1600;
            const tick = (t) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.floor(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Stats() {
  const items = [
    { n: BUILDERS.length, l: "Builder Partners" },
    { n: 15, l: "Years Experience" },
    { n: 1000, l: "Happy Clients" },
    { n: 500, l: "Projects Delivered" },
  ];
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-5xl sm:text-6xl text-ocean-blue mb-2 font-bold">
              <Counter to={s.n} />
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      t: "Zero brokerage confusion",
      d: "Direct builder tie-ups mean honest, transparent pricing.",
      i: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5",
    },
    {
      t: "Expert local knowledge",
      d: "15+ years navigating OMR, ECR, Anna Nagar, Velachery and beyond.",
      i: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z",
    },
    {
      t: "End-to-end support",
      d: "From site visits to home loans to registration — we handle it all.",
      i: "M9 12l2 2 4-4 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      t: "Personalised search",
      d: "We match you to projects within your exact budget and lifestyle.",
      i: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z M21 21l-4.35-4.35",
    },
    {
      t: "RERA-verified only",
      d: "Every project we recommend is RERA-registered and legally clean.",
      i: "M12 2 4 6v6c0 5 3.5 9.7 8 10 4.5-.3 8-5 8-10V6l-8-4Z",
    },
    {
      t: "Transparent pricing",
      d: "No hidden costs, no surprise charges. What you see is what you pay.",
      i: "M12 1v22 M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6",
    },
  ];
  const ref = useReveal();
  return (
    <section className="py-24 bg-background">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle
          eyebrow="Why Octopus"
          title="Built on trust. Backed by 15+ years."
          titleClassName="sm:whitespace-nowrap"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((it) => (
            <div key={it.t} className="luxe-card p-7">
              <div className="w-12 h-12 rounded-lg bg-navy text-gold flex items-center justify-center mb-5">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={it.i} />
                </svg>
              </div>
              <h3 className="font-display text-xl text-navy mb-2">{it.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const featured = PROJECTS.slice(0, 6);
  const ref = useReveal();
  return (
    <section className="py-24 bg-surface">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <SectionTitle eyebrow="Featured Projects" title="Handpicked premium homes" inline />
          <Link
            to="/projects"
            className="text-navy font-semibold underline-offset-4 hover:underline"
          >
            View all {PROJECTS.length} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Tell us your budget",
      d: "Share your requirement — budget, location, BHK, lifestyle.",
    },
    {
      n: "02",
      t: "We shortlist projects",
      d: "Get a curated list of RERA-verified options that fit you exactly.",
    },
    {
      n: "03",
      t: "Move into your dream home",
      d: "We handle visits, negotiation, loan, registration — end to end.",
    },
  ];
  const ref = useReveal();
  return (
    <section className="py-24 bg-background">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-5 sm:px-8">
        <SectionTitle eyebrow="How It Works" title="Three simple steps to home" />
        <div className="relative grid md:grid-cols-3 gap-8 mt-14">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="relative z-10 w-24 h-24 mx-auto rounded-full bg-gradient-gold text-gold-foreground flex items-center justify-center font-display text-2xl shadow-gold mb-6">
                {s.n}
              </div>
              <h3 className="font-display text-xl text-navy mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function CtaBanner() {
  const { open } = useEnquiry();
  return (
    <section className="py-24 bg-gradient-to-r from-ocean-blue to-sky-azure text-white relative overflow-hidden">
      {/* Decorative premium glass elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <h2 className="font-display text-3xl sm:text-5xl mb-6 leading-tight">
          Ready to find your dream property in Chennai?
        </h2>
        <p className="text-white/90 mb-10 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
          Schedule a free, no-obligation consultation. Our expert advisors will guide you through Chennai's premium RERA-verified projects.
        </p>
        <button
          onClick={() => open({ source: "cta-banner", title: "Schedule a Free Consultation" })}
          className="px-8 py-4 bg-white text-ocean-blue hover:bg-white/10 hover:text-white border border-transparent hover:border-white rounded-md font-semibold uppercase tracking-wider text-sm shadow-xl hover:translate-y-[-2px] transition-all duration-300"
        >
          Schedule a Free Consultation
        </button>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, white, inline, titleClassName }) {
  return (
    <div className={inline ? "" : "text-center max-w-3xl mx-auto"}>
      <div
        className={"text-xs uppercase tracking-[0.3em] mb-3 " + (white ? "text-gold" : "text-gold")}
      >
        {eyebrow}
      </div>
      <h2
        className={
          "font-display text-3xl sm:text-5xl leading-tight " +
          (white ? "text-white" : "text-navy") +
          " " +
          (titleClassName || "")
        }
      >
        {title}
      </h2>
      <div className={(inline ? "" : "mx-auto ") + "gold-divider w-16 mt-5"} />
    </div>
  );
}

export { Route };
