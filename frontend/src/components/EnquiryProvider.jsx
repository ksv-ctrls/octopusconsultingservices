import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Modal } from "@/components/Modal";
import { EnquiryForm } from "@/components/EnquiryForm";
const EnquiryCtx = createContext(null);
function EnquiryProvider({ children }) {
  const [state, setState] = useState({ open: false });
  const open = useCallback((args) => setState({ open: true, ...args }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ open, close }), [open, close]);
  return (
    <EnquiryCtx.Provider value={value}>
      {children}
      <Modal
        open={state.open}
        onClose={close}
        title={state.title ?? (state.projectName ? "Enquire Now" : "Schedule a Free Consultation")}
      >
        <EnquiryForm
          projectId={state.projectId}
          projectName={state.projectName}
          source={state.source ?? "modal"}
          onClose={close}
        />
      </Modal>
    </EnquiryCtx.Provider>
  );
}
function useEnquiry() {
  const ctx = useContext(EnquiryCtx);
  if (!ctx) throw new Error("useEnquiry must be used inside EnquiryProvider");
  return ctx;
}
export { EnquiryProvider, useEnquiry };
