import { X } from "lucide-react";
import { CalculatorResults, CalculatorInputs } from "@/lib/calculator";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: CalculatorResults;
  inputs: CalculatorInputs;
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(amount);
}

export function ShareModal({ isOpen, onClose, results, inputs }: ShareModalProps) {
  if (!isOpen) return null;

  const text = results.totalSavings > 0
    ? `🎉 Mijn daktent verdient zichzelf terug in ${results.breakEvenTrips} nachten! ${inputs.years}-jaar besparing: ${formatEuro(results.totalSavings)}. Bereken jouw ROI →`
    : `Ik heb berekend of een daktent voor mij de moeite waard is. Bereken jouw ROI →`;

  const url = window.location.href;

  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, "_blank");
  const shareEmail = () => window.open(`mailto:?subject=${encodeURIComponent("Daktent ROI Calculator")}&body=${encodeURIComponent(text + "\n\n" + url)}`, "_blank");
  const copyLink = () => {
    navigator.clipboard.writeText(text + " " + url);
    alert("Link gekopieerd!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">📤 Deel Je Resultaten</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Preview card */}
        <div className="bg-hero-gradient rounded-xl p-5 text-center space-y-2">
          <p className="text-sm font-medium text-primary-foreground/80">Mijn Daktent Verdient Zichzelf Terug in</p>
          <p className="text-4xl font-black text-primary-foreground">{results.breakEvenTrips > 200 ? "200+" : results.breakEvenTrips} NACHTEN 🎉</p>
          <p className="text-lg font-bold text-primary-foreground">{inputs.years}-Jaar Besparing: {formatEuro(results.totalSavings)}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={shareWhatsApp} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all">
            💬 WhatsApp
          </button>
          <button onClick={shareFacebook} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
            📘 Facebook
          </button>
          <button onClick={shareEmail} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all">
            ✉️ Email
          </button>
          <button onClick={copyLink} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all">
            🔗 Kopieer Link
          </button>
        </div>
      </div>
    </div>
  );
}
