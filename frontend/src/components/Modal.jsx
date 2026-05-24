import { useEffect } from "react";
import { createPortal } from "react-dom";
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-navy/60 backdrop-blur-sm animate-[fade-in_.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg bg-background rounded-t-2xl sm:rounded-xl shadow-luxe overflow-hidden animate-[scale-in_.25s_cubic-bezier(.22,1,.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-gradient-gold" />
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-navy transition"
        >
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
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {title && <h2 className="font-display text-2xl sm:text-3xl text-navy mb-1">{title}</h2>}
          <div className="gold-divider w-12 mb-5" />
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
export { Modal };
