import { useState, useMemo, useEffect } from "react";
import { CalculatorInputs, defaultInputs, presets, calculate } from "@/lib/calculator";
import { PresetButtons } from "@/components/calculator/PresetButtons";
import { InputSection } from "@/components/calculator/InputSection";
import { ResultsSection } from "@/components/calculator/ResultsSection";
import { ShareModal } from "@/components/calculator/ShareModal";
import { EmailCaptureModal } from "@/components/calculator/EmailCaptureModal";
import { Calculator, ChevronDown } from "lucide-react";

export default function Index() {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const saved = localStorage.getItem("daktent-calc-inputs");
    return saved ? { ...defaultInputs, ...JSON.parse(saved) } : defaultInputs;
  });
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => calculate(inputs), [inputs]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("daktent-calc-inputs", JSON.stringify(inputs));
  }, [inputs]);

  // Email popup after 45s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("daktent-email-dismissed")) {
        setEmailOpen(true);
      }
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (updates: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }));
    setActivePreset(null);
    setShowResults(true);
  };

  const handlePreset = (key: string) => {
    setActivePreset(key);
    setInputs((prev) => ({ ...prev, ...presets[key].values }));
    setShowResults(true);
  };

  const handleEmailClose = () => {
    setEmailOpen(false);
    localStorage.setItem("daktent-email-dismissed", "true");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="bg-hero-gradient py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground text-sm font-medium backdrop-blur-sm">
            <Calculator className="w-4 h-4" />
            Daktent ROI Calculator
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary-foreground leading-tight">
            Verdient Een Daktent<br />Zich Terug?
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Ontdek in 30 seconden of een daktent voor jouw situatie financieel slim is.
            Vergelijk met hotels, Airbnb's en camperverhuur.
          </p>
          <a href="#calculator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90 transition-all shadow-lg">
            Start Berekening
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Calculator */}
      <main id="calculator" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Presets */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3">⚡ Quick Start — Kies jouw profiel:</p>
          <PresetButtons onSelect={handlePreset} activePreset={activePreset} />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <InputSection inputs={inputs} onChange={handleChange} />
          </div>
          <div className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start">
            <ResultsSection results={results} inputs={inputs} onShare={() => setShareOpen(true)} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <a
            href="https://www.peter-penthouse.com/?ref=calculator"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            ⭐ Klaar voor je daktent? Bekijk Peter Penthouse →
          </a>
          <p className="text-xs text-muted-foreground">
            Deze calculator is een indicatie. Werkelijke kosten kunnen afwijken.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} results={results} inputs={inputs} />
      <EmailCaptureModal isOpen={emailOpen} onClose={handleEmailClose} />
    </div>
  );
}
