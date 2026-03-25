import { useState } from "react";
import { X } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailCaptureModal({ isOpen, onClose }: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In production, this would send to a backend
      setTimeout(onClose, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">📧 Bewaar Je Berekening</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <span className="text-4xl">✅</span>
            <p className="font-semibold text-foreground">Bedankt!</p>
            <p className="text-sm text-muted-foreground">Je ontvangt de gids binnenkort in je inbox.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Ontvang je resultaten + <strong>GRATIS Daktent Koop Gids</strong> (PDF, 20 pagina's) in je inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email" required placeholder="je@email.nl" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
                Stuur Mij de Gids →
              </button>
            </form>
            <p className="text-xs text-muted-foreground text-center">We spammen niet. Afmelden altijd mogelijk.</p>
          </>
        )}
      </div>
    </div>
  );
}
