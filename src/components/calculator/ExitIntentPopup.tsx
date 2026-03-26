import { useState, useEffect, useCallback } from "react";
import { X, FileDown, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExitIntentPopupProps {
  onRequestPdf?: () => void;
}

export function ExitIntentPopup({ onRequestPdf }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem("daktent-exit-shown", "true");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("daktent-exit-shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem("daktent-exit-shown")) {
        setIsOpen(true);
      }
    };

    // Only on desktop
    if (window.innerWidth > 768) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In production, send to backend
      setTimeout(handleClose, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="bg-hero-gradient p-6 text-center">
              <p className="text-3xl mb-2">🏕️</p>
              <h3 className="text-xl font-bold text-primary-foreground">
                Wacht! Bewaar je berekening
              </h3>
              <p className="text-sm text-primary-foreground/80 mt-1">
                + ontvang 5 tips om €500 extra te besparen
              </p>
            </div>

            <div className="p-6 space-y-5">
              {submitted ? (
                <div className="text-center py-4 space-y-3">
                  <span className="text-5xl">✅</span>
                  <p className="font-bold text-lg text-foreground">Bedankt!</p>
                  <p className="text-sm text-muted-foreground">
                    Check je inbox voor je persoonlijke besparingsrapport.
                  </p>
                </div>
              ) : (
                <>
                  {/* Benefits */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <FileDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">PDF Rapport</p>
                        <p className="text-muted-foreground">Je volledige berekening als download</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Gratis Daktent Koop Gids</p>
                        <p className="text-muted-foreground">20 pagina's met tips, vergelijkingen & checklist</p>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="je@email.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md"
                    >
                      📧 Stuur Mij Het Rapport →
                    </button>
                  </form>

                  {/* Download PDF without email */}
                  {onRequestPdf && (
                    <button
                      onClick={() => {
                        onRequestPdf();
                        handleClose();
                      }}
                      className="w-full py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    >
                      Of download direct als PDF (zonder email)
                    </button>
                  )}

                  <p className="text-xs text-muted-foreground text-center">
                    We spammen niet. Afmelden altijd mogelijk.
                  </p>
                </>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
