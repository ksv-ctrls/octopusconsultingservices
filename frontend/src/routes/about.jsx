import { createFileRoute } from "@tanstack/react-router";
import { BUILDERS } from "@/data/projects";
import { BRAND } from "@/lib/constants";

const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Octopus Consulting \u2014 Chennai Real Estate Since 2009" },
      {
        name: "description",
        content:
          "15+ years helping Chennai families find home. RERA-compliant, direct builder tie-ups, transparent pricing.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-gradient-luxe text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(circle at 30% 70%, var(--gold), transparent 60%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">About Us</div>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.1] max-w-4xl">
            We&rsquo;ve been helping Chennai find home since {BRAND.founded}.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side: Founder Image and Premium Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative group overflow-hidden rounded-2xl shadow-luxe border border-border">
                <img
                  src="/images/founder.jpeg"
                  alt="Mr. G. Muthu Vallavan"
                  className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Mr. G. Muthu Vallavan Premium Founder Card */}
              <div className="luxe-card p-6 border border-border bg-white/70 backdrop-blur-md shadow-luxe hover:translate-y-[-4px] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-xl text-navy font-semibold">Mr. G. Muthu Vallavan</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Founder & Managing Director</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground leading-relaxed italic">
                  "Guiding Chennai families home since 2009 with absolute transparency, integrity, and direct builder trust."
                </div>
              </div>
            </div>

            {/* Right side: Premium Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block">Founder's Vision</span>
                <h2 className="font-display text-4xl sm:text-5xl text-navy leading-tight">
                  15+ Years of Guiding Families into Chennai's Finest Homes
                </h2>
                <div className="w-16 h-0.5 bg-gold mt-2" />
              </div>

              <div className="text-lg leading-relaxed text-foreground/90 space-y-6 font-light">
                <p>
                  Octopus Consulting Services was founded with one belief: buying a home in Chennai should feel like a celebration, not a maze. Fifteen years on, we’ve guided over a thousand families into their dream homes — from first-time buyers in Tambaram to NRI investors in OMR penthouses.
                </p>
                <p>
                  What sets us apart is structural. We hold direct channel-partner agreements with every one of our 52 builder partners. That means no middlemen, no inflated brokerage, and pricing that comes straight from the developer. Add to that our team’s deep familiarity with every micro-market in Chennai — from the temple-town calm of Mylapore to the IT corridor pulse of Sholinganallur — and you have a partner who can match you to the right property in days, not months.
                </p>
                <p>
                  Every project we recommend is RERA-verified. Every transaction is documented. Every client gets one consultant, end-to-end, from the first site visit to the final registration.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="space-y-2">
                  <div className="font-display text-4xl text-gold font-semibold">52+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Builder Partners</div>
                </div>
                <div className="space-y-2">
                  <div className="font-display text-4xl text-gold font-semibold">1,000+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Happy Families</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-8">
          <div className="luxe-card p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Mission</div>
            <h3 className="font-display text-2xl text-navy mb-3">
              Make Chennai property accessible
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To make Chennai real-estate purchase transparent, honest, and effortless — so every
              family, regardless of budget, gets expert guidance and a fair deal.
            </p>
          </div>
          <div className="luxe-card p-10">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Vision</div>
            <h3 className="font-display text-2xl text-navy mb-3">
              The trusted name in Chennai real estate
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted name in Chennai real estate — known for integrity, depth of
              knowledge, and lifelong client relationships.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
              Builder Partners
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-navy">
              52 builders. One trusted partner.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BUILDERS.map((b) => (
              <div
                key={b}
                className="aspect-[3/1] border border-border bg-background flex items-center justify-center px-3 text-center font-display text-navy/55 hover:text-gold hover:border-gold/40 hover:shadow-luxe transition text-sm rounded-lg"
              >
                {b}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-10">
            All projects are RERA-registered and verified. Octopus Consulting Services operates as
            an authorised channel partner for each listed developer.
          </p>
        </div>
      </section>
    </>
  );
}

export { Route };
