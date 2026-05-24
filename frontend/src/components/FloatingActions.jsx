import { BRAND, telLink, waLink } from "@/lib/constants";
import { useEnquiry } from "./EnquiryProvider";

function FloatingActions() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-20 sm:bottom-6 z-40 flex flex-col gap-3">
      {/* Call Button */}
      <a
        href={telLink}
        aria-label={`Call ${BRAND.phone}`}
        className="w-[52px] h-[52px] rounded-full bg-navy text-white flex items-center justify-center shadow-luxe hover:scale-110 transition-all duration-300"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      </a>

      {/* WhatsApp Button - Official Green */}
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-[56px] h-[56px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-luxe hover:scale-110 hover:bg-[#1EBE5D] transition-all duration-300 animate-pulse-ring"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .03 5.34.03 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.49h.01c6.62 0 11.97-5.34 11.97-11.97 0-3.2-1.25-6.21-3.46-8.42ZM12 21.82h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-3.67.96.98-3.58-.23-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.43 4.42-9.85 9.85-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.89 6.96c-.01 5.43-4.43 9.85-9.88 9.85Zm5.4-7.38c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </div>
  );
}

function MobileStickyBar() {
  const { open } = useEnquiry();
  return (
    <div className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-navy text-white grid grid-cols-3 shadow-[0_-8px_30px_-12px_rgba(10,31,68,.4)]">
      {/* Call */}
      <a
        href={telLink}
        className="flex flex-col items-center justify-center py-2.5 hover:bg-white/5"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
        <span className="text-[10px] uppercase tracking-wider mt-1">Call</span>
      </a>

      {/* WhatsApp - Official Green */}
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center py-2.5 bg-[#25D366] hover:bg-[#1EBE5D]"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .03 5.34.03 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62a11.94 11.94 0 0 0 5.82 1.49h.01c6.62 0 11.97-5.34 11.97-11.97 0-3.2-1.25-6.21-3.46-8.42Z" />
        </svg>
        <span className="text-[10px] uppercase tracking-wider mt-1">WhatsApp</span>
      </a>

      {/* Enquire */}
      <button
        onClick={() => open({ source: "mobile-bar" })}
        className="flex flex-col items-center justify-center py-2.5 bg-gold text-gold-foreground hover:opacity-95"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16v12H5l-1 4Z" />
        </svg>
        <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Enquire</span>
      </button>
    </div>
  );
}

export { FloatingActions, MobileStickyBar };
