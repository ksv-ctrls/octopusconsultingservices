import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BRAND, mailLink, telLink, waLink } from "@/lib/constants";
const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Octopus Consulting \u2014 Chennai Real Estate" },
      {
        name: "description",
        content:
          "Visit our Anna Nagar office or reach us via phone, WhatsApp, or email. Free consultation. We respond within 2 hours.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});
function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-luxe text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Get in Touch</div>
          <h1 className="font-display text-4xl sm:text-5xl mb-3">
            Let&rsquo;s find your perfect property
          </h1>
          <p className="text-white/70 max-w-2xl">
            Tell us what you&rsquo;re looking for — we&rsquo;ll call you within 2 hours with curated
            options that match.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-navy mb-2">Visit our office</h2>
            <div className="gold-divider w-12 mb-6" />
            <div className="space-y-5 text-foreground/85">
              <Row icon="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" label="Office">
                {BRAND.address}
              </Row>
              <Row
                icon="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
                label="Phone"
              >
                <a href={telLink} className="hover:text-gold transition">
                  {BRAND.phone}
                </a>
              </Row>
              <Row
                icon="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z M22 6 12 13 2 6"
                label="Email"
              >
                <a href={mailLink} className="hover:text-gold transition">
                  {BRAND.email}
                </a>
              </Row>
              <Row icon="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z M12 6v6l4 2" label="Hours">
                {BRAND.hours}
              </Row>
            </div>

            <div className="mt-8 flex flex-row flex-nowrap gap-2 sm:gap-3 w-full">
              {/* WhatsApp - official brand green */}
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-0 px-2 sm:px-4 py-3 bg-[#25D366] text-white rounded-md font-semibold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#1EBE5D] hover:shadow-lg hover:shadow-[#25D366]/25 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .03 5.34.03 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.49C18.66 23.86 24 18.52 24 11.97c0-3.2-1.25-6.21-3.48-8.49Z" />
                </svg>
                WhatsApp
              </a>

              {/* Facebook */}
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-0 px-2 sm:px-4 py-3 bg-[#1877F2] text-white rounded-md font-semibold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#1565D8] hover:shadow-lg hover:shadow-[#1877F2]/25 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
                Facebook
              </a>

              {/* Instagram */}
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-0 px-2 sm:px-4 py-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-md font-semibold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-90 hover:shadow-lg transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>

              {/* Email */}
              <a
                href={mailLink}
                className="flex-1 min-w-0 px-2 sm:px-4 py-3 bg-navy text-white rounded-md font-semibold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-90 hover:shadow-lg transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                Email
              </a>
            </div>
          </div>

          <div className="luxe-card p-8 sm:p-10 shadow-luxe">
            <h2 className="font-display text-2xl text-navy mb-1">Send us a message</h2>
            <div className="gold-divider w-12 mb-5" />
            <EnquiryForm source="contact-page" showWhatLookingFor />
          </div>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="rounded-xl overflow-hidden shadow-luxe border border-border">
            <iframe
              title="Octopus Consulting — Anna Nagar office map"
              src="https://www.google.com/maps?q=Anna+Nagar+2nd+Avenue+Chennai+600040&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
function Row({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 shrink-0 rounded-md bg-navy text-gold flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
          {label}
        </div>
        <div className="text-foreground">{children}</div>
      </div>
    </div>
  );
}
export { Route };
