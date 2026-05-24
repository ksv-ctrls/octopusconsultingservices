import { Link } from "@tanstack/react-router";
import { BRAND, mailLink, telLink, waLink } from "@/lib/constants";

function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <img src="/images/logo.png" alt="Octopus Logo" className="w-11 h-11 object-contain" />
            <div>
              <div className="font-display text-xl">Octopus</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                Consulting Services
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-5">
            {BRAND.tagline}. Helping Chennai find home since {BRAND.founded}.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {/* Facebook */}
            <a
              href={BRAND.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex w-10 h-10 rounded-full bg-white/8 hover:bg-[#1877F2] items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex w-10 h-10 rounded-full bg-white/8 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex w-10 h-10 rounded-full bg-white/8 hover:bg-[#25D366] items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .03 5.34.03 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.49C18.66 23.86 24 18.52 24 11.97c0-3.2-1.25-6.21-3.48-8.49Z" />
              </svg>
            </a>

            {/* Email / Gmail */}
            <a
              href={mailLink}
              aria-label="Email us"
              className="inline-flex w-10 h-10 rounded-full bg-white/8 hover:bg-[#EA4335] items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-gold">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-gold transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-gold transition">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-gold">Reach Us</h4>
          <address className="not-italic text-sm text-white/75 leading-relaxed mb-3">
            {BRAND.address}
          </address>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={telLink} className="hover:text-gold transition">
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={mailLink} className="hover:text-gold transition break-all">
                {BRAND.email}
              </a>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#25D366] transition"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-[#25D366]">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .03 5.34.03 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.49C18.66 23.86 24 18.52 24 11.97c0-3.2-1.25-6.21-3.48-8.49Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </li>
          </ul>
          <p className="text-xs text-white/50 mt-4">{BRAND.hours}</p>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-gold">Visit Office</h4>
          <div className="rounded-md overflow-hidden ring-1 ring-white/10">
            <iframe
              title="Octopus Consulting office location"
              src="https://www.google.com/maps?q=Anna+Nagar+2nd+Avenue+Chennai+600040&output=embed"
              width="100%"
              height="170"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} Octopus Consulting Services. All Rights
            Reserved.
          </p>
          <p>RERA-verified projects · Direct builder tie-ups · Transparent pricing</p>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
