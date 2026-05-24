import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { BUDGET_OPTIONS } from "@/data/projects";
import { toast } from "sonner";

const PhoneRe = /^[6-9]\d{9}$/;
const Schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s\-()]/g, "").replace(/^\+?91/, ""))
    .refine((v) => PhoneRe.test(v), "Enter a valid 10-digit Indian mobile"),
  email: z.string().trim().email("Enter a valid email"),
  budget: z.string().optional(),
  location: z.string().trim().max(120).optional(),
  message: z.string().max(2e3).optional(),
});

function EnquiryForm({
  projectId,
  projectName,
  source = "website",
  showWhatLookingFor = false,
  compact = false,
  onClose,
}) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      budget: fd.get("budget") || void 0,
      location: fd.get("location") || void 0,
      message: fd.get("message") || void 0,
    };
    const parsed = Schema.safeParse(payload);
    if (!parsed.success) {
      const fe = {};
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (v && v[0]) fe[k] = v[0];
      }
      setErrors(fe);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${baseUrl}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          project_id: projectId,
          project_name: projectName,
          source,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        throw new Error("Submitting failed");
      }
      setDone(true);
      toast.success("Enquiry received successfully! We'll reach out shortly.");
    } catch (err) {
      // Show elegant user-friendly message rather than dev stack traces
      setErrors({
        form: "We are currently receiving a high volume of requests. Your details are extremely important to us — please try again or click the WhatsApp button for instant booking assistance.",
      });
      toast.error("Enquiry submission timed out. Let's try again.");
    } finally {
      setSubmitting(false);
    }
  }
  if (done) {
    return (
      <div className="flex flex-col items-center text-center py-10 px-6">
        <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mb-4 animate-[scale-in_.4s_ease-out]">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-emerald"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-navy mb-2">Thank you!</h3>
        <p className="text-muted-foreground max-w-sm">
          We&rsquo;ve received your enquiry. Our consultant will call you within 2 hours.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2.5 bg-navy text-navy-foreground rounded-md hover:opacity-90 transition"
          >
            Close
          </button>
        )}
      </div>
    );
  }
  const inputCls =
    "w-full px-4 py-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition";
  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"} noValidate>
      {projectName && (
        <div className="text-sm text-muted-foreground">
          Enquiring about <span className="text-navy font-medium">{projectName}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Full name
          </label>
          <input
            ref={firstFieldRef}
            name="name"
            required
            className={inputCls}
            placeholder="Your name"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Phone
          </label>
          <input
            name="phone"
            required
            inputMode="tel"
            className={inputCls}
            placeholder="98400 80766"
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
          Email
        </label>
        <input
          name="email"
          required
          type="email"
          className={inputCls}
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Budget
          </label>
          <select name="budget" className={inputCls} defaultValue="">
            <option value="">Select budget</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b.value} value={b.label}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Preferred area
          </label>
          <input name="location" className={inputCls} placeholder="e.g. OMR, Anna Nagar" />
        </div>
      </div>

      {showWhatLookingFor && (
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            What are you looking for?
          </label>
          <select name="message" className={inputCls} defaultValue="">
            <option value="">Select</option>
            <option>Buy a flat</option>
            <option>Buy a plot</option>
            <option>NRI investment</option>
            <option>Resale</option>
            <option>Other</option>
          </select>
        </div>
      )}

      {!showWhatLookingFor && (
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Message (optional)
          </label>
          <textarea
            name="message"
            rows={3}
            className={inputCls}
            placeholder="Tell us about your requirement…"
          />
        </div>
      )}

      {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-gold text-gold-foreground rounded-md font-semibold uppercase tracking-wider text-sm shadow-gold hover:translate-y-[-1px] hover:shadow-luxe transition disabled:opacity-60 disabled:cursor-wait"
      >
        {submitting ? "Sending\u2026" : "Submit Enquiry"}
      </button>
      <p className="text-xs text-muted-foreground">
        By submitting, you agree to be contacted by Octopus Consulting Services regarding your
        property requirement.
      </p>
    </form>
  );
}
export { EnquiryForm };
