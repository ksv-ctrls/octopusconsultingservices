import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useEnquiry } from "./EnquiryProvider";
import { BRAND } from "../lib/constants";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useEnquiry();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2.5 glass-nav shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Octopus Logo"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "w-9 h-9" : "w-11 h-11"
            }`}
          />
          <div className="leading-tight">
            <div
              className={
                "font-display text-lg sm:text-xl font-semibold transition-colors " +
                (scrolled ? "text-navy" : "text-white")
              }
            >
              Octopus
            </div>
            <div
              className={
                "text-[10px] uppercase tracking-[0.18em] transition-colors " +
                (scrolled ? "text-muted-foreground" : "text-white/70")
              }
            >
              Consulting Services
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className={
                "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors " +
                (scrolled ? "text-foreground/80 hover:text-navy" : "text-white/85 hover:text-white")
              }
              activeProps={{ className: "!text-gold" }}
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => open({ source: "navbar" })}
            className="ml-3 px-5 py-2.5 bg-gradient-gold text-gold-foreground rounded-md text-sm font-semibold uppercase tracking-wider shadow-gold hover:translate-y-[-1px] transition"
          >
            Enquire
          </button>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={
            "lg:hidden w-10 h-10 rounded-md flex items-center justify-center transition-colors " +
            (scrolled ? "text-navy hover:bg-muted" : "text-white hover:bg-white/10")
          }
        >
          {mobileOpen ? (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-background border-b border-border shadow-xl animate-[fade-in_.2s_ease-out]">
          <nav className="max-w-7xl mx-auto px-5 py-4 flex flex-col font-sans text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-foreground/85 hover:text-navy border-b border-border/60 last:border-0"
                activeProps={{ className: "!text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                open({ source: "mobile-nav" });
              }}
              className="mt-4 mb-2 py-3 bg-gradient-gold text-gold-foreground rounded-md font-semibold uppercase tracking-wider text-sm"
            >
              Enquire Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
export { Navbar };
